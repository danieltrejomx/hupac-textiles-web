import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paymentData, orderData } = body;

    if (!paymentData || !orderData) {
      return NextResponse.json(
        { success: false, error: 'Datos de pago u orden incompletos.' },
        { status: 400 }
      );
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.warn('MERCADOPAGO_ACCESS_TOKEN no está configurado en las variables de entorno.');
      return NextResponse.json(
        {
          success: false,
          error: 'Credenciales de Mercado Pago no configuradas en el servidor. Por favor define MERCADOPAGO_ACCESS_TOKEN.',
        },
        { status: 500 }
      );
    }

    // Inicializar cliente de Mercado Pago
    const client = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 10000 },
    });

    const payment = new Payment(client);

    // Extraer datos del formulario de pago (soporta Payment Brick y CardPayment Brick)
    const rawForm = paymentData.formData || paymentData;
    const token = rawForm.token || paymentData.token;
    const paymentMethodId = rawForm.payment_method_id || paymentData.payment_method_id || paymentData.paymentType;
    const installments = rawForm.installments || paymentData.installments ? Number(rawForm.installments || paymentData.installments) : 1;
    const issuerId = rawForm.issuer_id || paymentData.issuer_id ? String(rawForm.issuer_id || paymentData.issuer_id) : undefined;
    const transactionAmount = Number(orderData.total || rawForm.transaction_amount || paymentData.transaction_amount);

    const payerEmail = rawForm.payer?.email || orderData.cliente?.email || 'cliente@hupactextiles.com';
    const payerFirstName = orderData.cliente?.nombre?.split(' ')[0] || rawForm.payer?.first_name || 'Cliente';
    const payerLastName = orderData.cliente?.nombre?.split(' ').slice(1).join(' ') || rawForm.payer?.last_name || 'HUPAC';

    // Construir payload de pago para Mercado Pago API
    const paymentPayload: any = {
      transaction_amount: transactionAmount,
      description: `Pedido HUPAC Textiles (${orderData.totalItems || 1} pzs) - ${orderData.cliente?.nombre || 'Cliente'}`,
      payment_method_id: paymentMethodId,
      payer: {
        email: payerEmail,
        first_name: payerFirstName,
        last_name: payerLastName,
        identification: rawForm.payer?.identification || undefined,
        address: {
          zip_code: orderData.cliente?.cp || '',
          street_name: orderData.cliente?.direccion || '',
          city: orderData.cliente?.ciudad || '',
          federal_unit: orderData.cliente?.estado || '',
        },
      },
      additional_info: {
        items: (orderData.items || []).map((item: any) => ({
          id: String(item.id || item.estilo || 'PROD'),
          title: `${item.nombre} - ${item.color} (${item.talla})`,
          description: `Estilo ${item.estilo} · Talla ${item.talla} · Color ${item.color}`,
          quantity: Number(item.cantidad || 1),
          unit_price: Number(item.precioUnitario || 0),
          picture_url: item.imagen ? (item.imagen.startsWith('http') ? item.imagen : `https://hupactextiles.com${item.imagen}`) : undefined,
        })),
        payer: {
          first_name: payerFirstName,
          last_name: payerLastName,
          phone: orderData.cliente?.telefono ? {
            number: orderData.cliente.telefono.replace(/\D/g, ''),
          } : undefined,
          address: {
            street_name: orderData.cliente?.direccion || '',
            zip_code: orderData.cliente?.cp || '',
          }
        },
        shipments: {
          receiver_address: {
            zip_code: orderData.cliente?.cp || '',
            state_name: orderData.cliente?.estado || '',
            city_name: orderData.cliente?.ciudad || '',
            street_name: orderData.cliente?.direccion || '',
          }
        }
      },
    };

    if (token) {
      paymentPayload.token = token;
      paymentPayload.installments = installments;
      if (issuerId) {
        paymentPayload.issuer_id = issuerId;
      }
    }

    // Ejecutar cobro en Mercado Pago
    const response = await payment.create({ body: paymentPayload });

    // Determinar estado legible
    let estadoPago = 'Pendiente';
    if (response.status === 'approved') {
      estadoPago = 'Aprobado';
    } else if (response.status === 'in_process' || response.status === 'pending') {
      estadoPago = 'En Proceso / Pendiente';
    } else if (response.status === 'rejected') {
      estadoPago = 'Rechazado';
    }

    // Registrar pedido en Firestore (orders collection)
    let orderId = '';
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        tipo: 'Venta E-Commerce (Mercado Pago)',
        cliente: {
          nombre: orderData.cliente?.nombre || '',
          email: orderData.cliente?.email || '',
          telefono: orderData.cliente?.telefono || '',
          direccion: `${orderData.cliente?.direccion || ''}, Col. ${orderData.cliente?.colonia || ''}, ${orderData.cliente?.ciudad || ''}, ${orderData.cliente?.estado || ''}, C.P. ${orderData.cliente?.cp || ''}`,
        },
        items: (orderData.items || []).map((i: any) => ({
          id: i.id || '',
          nombre: i.nombre || '',
          estilo: i.estilo || '',
          color: i.color || '',
          talla: i.talla || '',
          cantidad: i.cantidad || 1,
          precioUnitario: i.precioUnitario || 0,
          subtotal: (i.precioUnitario || 0) * (i.cantidad || 1),
        })),
        totalItems: orderData.totalItems || 0,
        subtotal: orderData.subtotal || 0,
        iva: orderData.iva || 0,
        envio: orderData.envio || 0,
        total: orderData.total || 0,
        metodoPago: `Mercado Pago (${response.payment_method_id || 'Tarjeta'})`,
        estadoPago,
        mercadopago: {
          paymentId: response.id,
          status: response.status,
          statusDetail: response.status_detail,
          paymentMethodId: response.payment_method_id,
          paymentTypeId: response.payment_type_id,
          currencyId: response.currency_id,
          dateApproved: response.date_approved || null,
          dateCreated: response.date_created || null,
          ticketUrl: (response.transaction_details as any)?.external_resource_url || null,
        },
        fecha: serverTimestamp(),
      });
      orderId = docRef.id;
    } catch (dbError) {
      console.error('Error guardando orden en Firestore:', dbError);
    }

    return NextResponse.json({
      success: true,
      status: response.status,
      status_detail: response.status_detail,
      id: response.id,
      orderId: orderId || `MP-${response.id}`,
      paymentMethodId: response.payment_method_id,
      ticketUrl: (response.transaction_details as any)?.external_resource_url || null,
    });
  } catch (error: any) {
    console.error('Error en proceso de pago Mercado Pago:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error procesando el pago en Mercado Pago.',
        cause: error.cause || null,
      },
      { status: 500 }
    );
  }
}

import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || '';
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Credenciales de Mercado Pago no configuradas (MERCADOPAGO_ACCESS_TOKEN requerido).' },
        { status: 500 }
      );
    }

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const body = await request.json();
    const { items, cliente, orderId, envio } = body;

    const host = request.headers.get('host') || 'hupac-textiles-web.vercel.app';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const mpItems = items.map((item: any) => ({
      id: String(item.estilo || item.id || 'PRENDA'),
      title: `${item.nombre}${item.talla ? ` (Talla ${item.talla})` : ''}`,
      unit_price: Number(item.precioUnitario),
      quantity: Number(item.cantidad),
      currency_id: 'MXN'
    }));

    if (envio && Number(envio) > 0) {
      mpItems.push({
        id: 'ENVIO',
        title: 'Envío Asegurado a Domicilio',
        unit_price: Number(envio),
        quantity: 1,
        currency_id: 'MXN'
      });
    }

    const response = await preference.create({
      body: {
        items: mpItems,
        payer: {
          name: cliente.nombre || 'Cliente HUPAC',
          email: cliente.email || 'cliente@hupac.com',
          phone: {
            number: cliente.telefono || ''
          },
          address: {
            street_name: cliente.direccion || ''
          }
        },
        back_urls: {
          success: `${baseUrl}/checkout?status=success&order_id=${orderId || ''}`,
          failure: `${baseUrl}/checkout?status=failure&order_id=${orderId || ''}`,
          pending: `${baseUrl}/checkout?status=pending&order_id=${orderId || ''}`
        },
        auto_return: 'approved',
        external_reference: orderId || '',
        statement_descriptor: 'HUPAC TEXTILES'
      }
    });

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point
    });
  } catch (error: any) {
    console.error('Error creando preferencia en Mercado Pago:', error);
    return NextResponse.json(
      { error: error?.message || 'Error al conectar con Mercado Pago' },
      { status: 500 }
    );
  }
}

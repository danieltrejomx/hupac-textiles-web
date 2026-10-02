import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, cliente, items, total, metodoPago, fecha } = body;

    if (!cliente || !cliente.email || !items) {
      return NextResponse.json(
        { success: false, error: 'Datos de la orden o cliente incompletos.' },
        { status: 400 }
      );
    }

    // Configurar transporte SMTP
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

    // Si hay credenciales SMTP configuradas, enviar el correo por Nodemailer
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const itemsHtml = items.map((item: any) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; font-weight: bold; color: #132a52;">${item.nombre}</td>
          <td style="padding: 12px; color: #64748b;">${item.color || 'Estándar'} / ${item.talla || 'Única'}</td>
          <td style="padding: 12px; text-align: center; color: #132a52;">${item.cantidad} pzs</td>
          <td style="padding: 12px; text-align: right; font-weight: bold; color: #2456c4;">$${((item.precioUnitario || 0) * (item.cantidad || 1)).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</td>
        </tr>
      `).join('');

      const mailOptions = {
        from: `"HUPAC Textiles" <${smtpUser}>`,
        to: cliente.email,
        bcc: 'diviciontextiles@grupohupac.com',
        subject: `¡Confirmación de Pedido #${orderId}! — HUPAC Textiles`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <div style="background-color: #132a52; padding: 32px 24px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">HUPAC TEXTILES</h1>
                <p style="margin: 6px 0 0 0; font-size: 14px; color: #94a3b8;">Uniformes Empresariales e Industriales</p>
              </div>

              <!-- Body -->
              <div style="padding: 32px 24px;">
                <div style="background-color: #dcfce7; border: 1px solid #86efac; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 24px;">
                  <h2 style="margin: 0; color: #15803d; font-size: 18px;">¡Gracias por tu compra, ${cliente.nombre}!</h2>
                  <p style="margin: 4px 0 0 0; color: #166534; font-size: 14px;">Hemos recibido tu pedido correctamente. Número de Orden: <strong>#${orderId}</strong></p>
                </div>

                <h3 style="font-size: 16px; color: #132a52; margin-top: 0; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Detalles del Pedido:</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                  <thead>
                    <tr style="background-color: #f1f5f9; color: #132a52; text-align: left;">
                      <th style="padding: 10px;">Producto</th>
                      <th style="padding: 10px;">Detalles</th>
                      <th style="padding: 10px; text-align: center;">Cantidad</th>
                      <th style="padding: 10px; text-align: right;">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>

                <div style="text-align: right; margin-bottom: 28px; font-size: 18px; color: #132a52;">
                  <strong>Total Pagado: <span style="color: #2456c4;">$${Number(total || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span></strong>
                  <br/>
                  <span style="font-size: 12px; color: #64748b;">Método: ${metodoPago || 'Mercado Pago'}</span>
                </div>

                <h3 style="font-size: 16px; color: #132a52; margin-top: 0; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Dirección de Envío:</h3>
                <div style="background-color: #f8fafc; padding: 16px; border-radius: 12px; font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 28px;">
                  <strong>${cliente.nombre}</strong><br/>
                  ${cliente.direccion}<br/>
                  Teléfono: ${cliente.telefono}<br/>
                  Correo: ${cliente.email}
                </div>

                <div style="text-align: center; border-top: 1px solid #e2e8f0; paddingTop: 20px;">
                  <p style="font-size: 14px; color: #64748b; margin-bottom: 12px;">¿Tienes alguna duda sobre tu pedido?</p>
                  <a href="https://wa.me/525516257933?text=Hola,%20quiero%20consultar%20el%20estatus%20de%20mi%20pedido%20%23${orderId}" style="display: inline-block; background-color: #25d366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 999px; font-weight: bold; font-size: 14px;">Contactar por WhatsApp</a>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                HUPAC TEXTILES — Tlalnepantla de Baz, Estado de México.<br/>
                Tel: 55 1625 7933 · diviciontextiles@grupohupac.com
              </div>

            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`Correo de confirmación enviado exitosamente a ${cliente.email}`);
    } else {
      console.log(`Paso el envío por correo SMTP ya que no hay credenciales SMTP_USER en .env.local (Notificación de orden #${orderId} registrada).`);
    }

    return NextResponse.json({ success: true, message: 'Notificación procesada' });
  } catch (error: any) {
    console.error('Error enviando correo de confirmación:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

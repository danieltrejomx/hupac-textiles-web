'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

export default function CheckoutPage() {
  const { cart, subtotal, totalItems, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    colonia: '',
    ciudad: '',
    estado: 'Estado de México',
    cp: '',
  });

  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderComplete, setOrderComplete] = useState<{
    id: string;
    paymentId?: string;
    status: 'approved' | 'pending' | 'rejected';
    method?: string;
    ticketUrl?: string | null;
  } | null>(null);

  const enviosGratis = subtotal >= 1500 || cart.length === 0;
  const costoEnvio = enviosGratis ? 0 : 180;
  const iva = subtotal * 0.16;
  const total = subtotal + iva + costoEnvio;

  const mpPublicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;

  useEffect(() => {
    setMounted(true);
    if (mpPublicKey) {
      initMercadoPago(mpPublicKey, { locale: 'es-MX' });
    }
  }, [mpPublicKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (paymentError) setPaymentError(null);
  };

  const getFriendlyErrorMessage = (statusDetail?: string) => {
    switch (statusDetail) {
      case 'cc_rejected_bad_filled_card_number':
        return 'El número de tarjeta es incorrecto. Por favor verifícalo.';
      case 'cc_rejected_bad_filled_date':
        return 'La fecha de vencimiento es incorrecta.';
      case 'cc_rejected_bad_filled_security_code':
        return 'El código de seguridad (CVV) es incorrecto.';
      case 'cc_rejected_insufficient_amount':
        return 'Fondos insuficientes en la tarjeta.';
      case 'cc_rejected_call_for_authorize':
        return 'Debes llamar a tu banco para autorizar este pago.';
      case 'cc_rejected_card_disabled':
        return 'Tu tarjeta está desactivada. Llama a tu banco o prueba con otra tarjeta.';
      case 'cc_rejected_duplicated_payment':
        return 'Ya realizaste un pago con este valor. Por favor revisa tus transacciones.';
      case 'cc_rejected_high_risk':
        return 'El pago fue rechazado por medidas de seguridad. Elige otro medio de pago.';
      case 'cc_rejected_max_attempts':
        return 'Llegaste al límite de intentos permitidos. Usa otra tarjeta.';
      default:
        return 'Tu pago no pudo ser procesado. Por favor intenta con otra tarjeta o medio de pago.';
    }
  };

  const handleBrickSubmit = async (param: any) => {
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.telefono.trim() || !formData.direccion.trim() || !formData.cp.trim()) {
      alert('Por favor completa todos los campos obligatorios (*) de los Datos de Envío antes de proceder con el pago.');
      throw new Error('Faltan datos de envío.');
    }

    setLoading(true);
    setPaymentError(null);

    try {
      const res = await fetch('/api/mercadopago/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentData: param,
          orderData: {
            cliente: formData,
            items: cart,
            subtotal,
            iva,
            envio: costoEnvio,
            total,
            totalItems,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Error al procesar el pago en el servidor.');
      }

      if (data.status === 'approved') {
        setOrderComplete({
          id: data.orderId,
          paymentId: data.id,
          status: 'approved',
          method: data.paymentMethodId,
        });
        clearCart();
      } else if (data.status === 'in_process' || data.status === 'pending') {
        setOrderComplete({
          id: data.orderId,
          paymentId: data.id,
          status: 'pending',
          method: data.paymentMethodId,
          ticketUrl: data.ticketUrl,
        });
        clearCart();
      } else {
        setPaymentError(getFriendlyErrorMessage(data.status_detail));
      }
    } catch (err: any) {
      console.error('Error durante el pago:', err);
      setPaymentError(err.message || 'Ocurrió un problema de conexión al procesar el pago.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  if (orderComplete) {
    const isApproved = orderComplete.status === 'approved';
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: '120px', paddingBottom: '100px', backgroundColor: '#f8fafc', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px', backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: isApproved ? '#dcfce7' : '#fef9c3',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isApproved ? '#16a34a' : '#ca8a04',
              fontSize: '2.5rem',
              marginBottom: '20px'
            }}>
              {isApproved ? '✓' : '⏳'}
            </div>
            
            <h1 style={{ fontFamily: 'var(--fuente-titulos)', color: 'var(--marino)', fontSize: '2rem', marginBottom: '12px' }}>
              {isApproved ? '¡Pago Aprobado y Confirmado!' : '¡Orden Registrada! (Pago Pendiente)'}
            </h1>
            
            <p style={{ color: 'var(--texto-2)', lineHeight: 1.6, marginBottom: '20px' }}>
              {isApproved
                ? `Tu compra por $${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN ha sido procesada exitosamente mediante Mercado Pago.`
                : `Tu orden ha sido registrada. Por favor completa tu pago para procesar el despacho de tu pedido.`
              }
            </p>

            {orderComplete.ticketUrl && (
              <div style={{ marginBottom: '24px' }}>
                <a
                  href={orderComplete.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ backgroundColor: '#009ee3', color: '#ffffff', padding: '12px 24px', textDecoration: 'none', display: 'inline-block', borderRadius: '10px' }}
                >
                  📄 Ver / Imprimir Ticket de Pago
                </a>
              </div>
            )}

            <div style={{ backgroundColor: '#f1f5f9', padding: '18px', borderRadius: '14px', marginBottom: '28px', border: '1px dashed #cbd5e1', textAlign: 'left', display: 'grid', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--texto-2)' }}>Número de Pedido:</span>
                <strong style={{ fontFamily: 'var(--fuente-mono)', color: 'var(--rey)' }}>#{orderComplete.id}</strong>
              </div>
              {orderComplete.paymentId && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--texto-2)' }}>ID de Transacción Mercado Pago:</span>
                  <span style={{ fontFamily: 'var(--fuente-mono)', color: 'var(--marino)' }}>{orderComplete.paymentId}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--texto-2)' }}>Destinatario:</span>
                <span style={{ fontWeight: 600, color: 'var(--marino)' }}>{formData.nombre}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--texto-2)' }}>Correo de Notificación:</span>
                <span style={{ fontWeight: 600, color: 'var(--marino)' }}>{formData.email}</span>
              </div>
            </div>

            <Link href="/" className="btn" style={{ padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}>
              Volver a la Tienda
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '32px', paddingBottom: '80px', backgroundColor: '#f8fafc', minHeight: '85vh' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px' }}>
          
          <h1 style={{ fontFamily: 'var(--fuente-titulos)', color: 'var(--marino)', fontSize: '2.2rem', marginBottom: '8px' }}>
            Finalizar Compra
          </h1>
          <p style={{ color: 'var(--texto-2)', marginBottom: '32px' }}>
            Completa tus datos de entrega y realiza tu pago de forma segura con la pasarela oficial de <strong>Mercado Pago</strong>.
          </p>

          {cart.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', padding: '60px 20px', textAlign: 'center', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h2>Tu carrito está vacío</h2>
              <p style={{ color: 'var(--texto-2)', marginBottom: '20px' }}>Agrega productos al carrito antes de proceder al pago.</p>
              <Link href="/catalogo" className="btn" style={{ textDecoration: 'none' }}>Ver Catálogo de Productos</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              
              {/* Columna Izquierda: Envío y Mercado Pago Brick */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* 1. Datos de Envío */}
                <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--marino)', marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '28px', height: '28px', backgroundColor: 'var(--marino)', color: '#ffffff', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>1</span>
                    Datos de Envío y Facturación
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)', marginBottom: '6px' }}>Nombre completo *</label>
                      <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} placeholder="Ej. Carlos Mendoza" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)', marginBottom: '6px' }}>Correo electrónico *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="carlos@empresa.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)', marginBottom: '6px' }}>Teléfono de contacto *</label>
                        <input type="tel" name="telefono" required value={formData.telefono} onChange={handleChange} placeholder="55 1234 5678" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)', marginBottom: '6px' }}>Calle y número exterior / interior *</label>
                      <input type="text" name="direccion" required value={formData.direccion} onChange={handleChange} placeholder="Av. Insurgentes Sur 123, Int 4" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)', marginBottom: '6px' }}>Colonia *</label>
                        <input type="text" name="colonia" required value={formData.colonia} onChange={handleChange} placeholder="Roma Norte" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)', marginBottom: '6px' }}>Ciudad / Alcaldía *</label>
                        <input type="text" name="ciudad" required value={formData.ciudad} onChange={handleChange} placeholder="CDMX" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)', marginBottom: '6px' }}>Código Postal *</label>
                        <input type="text" name="cp" required value={formData.cp} onChange={handleChange} placeholder="06700" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Pasarela Oficial Mercado Pago */}
                <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--marino)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '28px', height: '28px', backgroundColor: 'var(--marino)', color: '#ffffff', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>2</span>
                      Método de Pago Seguro
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#009ee3', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                      MERCADO PAGO
                    </div>
                  </div>

                  {paymentError && (
                    <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '14px 16px', borderRadius: '10px', fontSize: '0.9rem', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span>⚠️</span>
                      <div style={{ flex: 1 }}>{paymentError}</div>
                    </div>
                  )}

                  {mpPublicKey ? (
                    <div style={{ minHeight: '300px' }}>
                      <Payment
                        initialization={{
                          amount: total,
                          payer: {
                            email: formData.email || undefined,
                          },
                        }}
                        customization={{
                          paymentMethods: {
                            creditCard: 'all',
                            debitCard: 'all',
                            ticket: 'all',
                            bankTransfer: 'all',
                            mercadoPago: 'all',
                          },
                          visual: {
                            style: {
                              theme: 'default',
                              customVariables: {
                                baseColor: '#0a192f',
                              },
                            },
                          },
                        }}
                        onSubmit={handleBrickSubmit}
                        onError={(error) => {
                          console.error('Mercado Pago Brick error:', error);
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💳</div>
                      <h4 style={{ color: '#0369a1', margin: '0 0 8px 0', fontSize: '1.05rem' }}>
                        Integración con Mercado Pago Lista
                      </h4>
                      <p style={{ color: '#0284c7', fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                        Para habilitar el procesador de tarjetas y pagos en tiempo real, añade tus credenciales en el archivo <code>.env.local</code> del proyecto:
                      </p>
                      <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '12px 16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.8rem', textAlign: 'left', overflowX: 'auto', marginBottom: '16px' }}>
                        NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-xxxxxxxx-xxxx<br />
                        MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxx-xxxx
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                        Puedes obtener tus credenciales de prueba o producción en tu panel de Mercado Pago Developers.
                      </p>
                    </div>
                  )}

                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#64748b', fontSize: '0.75rem' }}>
                    <span>🔒 Encriptación SSL 256 bits</span>
                    <span>•</span>
                    <span>🛡️ Protección al Comprador</span>
                    <span>•</span>
                    <span>⚡ Aprobación Inmediata</span>
                  </div>
                </div>

              </div>

              {/* Columna Derecha: Resumen de Pedido */}
              <div>
                <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', position: 'sticky', top: '100px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--marino)', marginTop: 0, marginBottom: '20px' }}>
                    Resumen del Pedido ({totalItems} piezas)
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px', maxHeight: '340px', overflowY: 'auto', paddingRight: '4px' }}>
                    {cart.map((item) => (
                      <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.85rem' }}>
                        <img src={item.imagen} alt={item.nombre} style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                        <div style={{ flex: 1 }}>
                          <span style={{ fontWeight: 700, color: 'var(--marino)', display: 'block' }}>{item.nombre}</span>
                          <span style={{ color: 'var(--texto-2)' }}>{item.color} · Talla {item.talla} ({item.cantidad} pzs)</span>
                        </div>
                        <span style={{ fontWeight: 700, color: 'var(--marino)' }}>
                          ${(item.precioUnitario * item.cantidad).toLocaleString('es-MX')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--texto-2)' }}>
                      <span>Subtotal (sin IVA):</span>
                      <span>${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--texto-2)' }}>
                      <span>IVA (16%):</span>
                      <span>${iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--texto-2)' }}>
                      <span>Envío:</span>
                      <span>{costoEnvio === 0 ? <strong style={{ color: '#16a34a' }}>¡Gratis!</strong> : `$${costoEnvio} MXN`}</span>
                    </div>

                    <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '12px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--marino)' }}>
                      <span>Total (con IVA):</span>
                      <span style={{ color: 'var(--rey)' }}>${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}

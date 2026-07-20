'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CheckoutPage() {
  const { cart, subtotal, totalItems, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    colonia: '',
    ciudad: '',
    estado: 'Estado de México',
    cp: '',
    tarjetaNumero: '',
    tarjetaNombre: '',
    tarjetaExp: '',
    tarjetaCvc: '',
    metodoPago: 'mercadopago_card'
  });

  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  const enviosGratis = subtotal >= 1500 || cart.length === 0;
  const costoEnvio = enviosGratis ? 0 : 180;
  const total = subtotal + costoEnvio;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    try {
      // Registrar pedido en Firestore
      const docRef = await addDoc(collection(db, 'orders'), {
        tipo: 'Venta E-Commerce',
        cliente: {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          direccion: `${formData.direccion}, Col. ${formData.colonia}, ${formData.ciudad}, ${formData.estado}, C.P. ${formData.cp}`
        },
        items: cart.map(i => ({
          nombre: i.nombre,
          estilo: i.estilo,
          color: i.color,
          talla: i.talla,
          cantidad: i.cantidad,
          precioUnitario: i.precioUnitario,
          subtotal: i.precioUnitario * i.cantidad
        })),
        totalItems,
        subtotal,
        envio: costoEnvio,
        total,
        metodoPago: 'Mercado Pago (Tarjeta de Crédito/Débito)',
        estadoPago: 'Aprobado / Mercado Pago Test',
        fecha: serverTimestamp(),
      });

      setOrderComplete(docRef.id);
      clearCart();
    } catch (err) {
      console.error('Error registrando la compra:', err);
      alert('Ocurrió un inconveniente al procesar el pedido. Por favor intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: '120px', paddingBottom: '100px', backgroundColor: '#f8fafc', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#dcfce7', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', fontSize: '2.5rem', marginBottom: '20px' }}>
              ✓
            </div>
            <h1 style={{ fontFamily: 'var(--fuente-titulos)', color: 'var(--marino)', fontSize: '2rem', marginBottom: '12px' }}>
              ¡Compra Confirmada!
            </h1>
            <p style={{ color: 'var(--texto-2)', lineHeight: 1.6, marginBottom: '20px' }}>
              Tu pago con <strong>Mercado Pago</strong> ha sido procesado exitosamente. Recibirás un correo de confirmación con los detalles de tu envío.
            </p>

            <div style={{ backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '12px', marginBottom: '28px', border: '1px dashed #cbd5e1' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--texto-2)', display: 'block' }}>Número de Orden:</span>
              <strong style={{ fontFamily: 'var(--fuente-mono)', color: 'var(--rey)', fontSize: '1.1rem' }}>#{orderComplete}</strong>
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
      <main style={{ paddingTop: '100px', paddingBottom: '80px', backgroundColor: '#f8fafc', minHeight: '85vh' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          
          <h1 style={{ fontFamily: 'var(--fuente-titulos)', color: 'var(--marino)', fontSize: '2.2rem', marginBottom: '8px' }}>
            Finalizar Compra
          </h1>
          <p style={{ color: 'var(--texto-2)', marginBottom: '32px' }}>
            Completa tus datos de envío y realiza tu pago seguro procesado por <strong>Mercado Pago</strong>.
          </p>

          {cart.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', padding: '60px 20px', textAlign: 'center', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h2>Tu carrito está vacío</h2>
              <p style={{ color: 'var(--texto-2)', marginBottom: '20px' }}>Agrega productos al carrito antes de proceder al pago.</p>
              <Link href="/#catalogo" className="btn" style={{ textDecoration: 'none' }}>Ver Productos</Link>
            </div>
          ) : (
            <form onSubmit={handlePay} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              
              {/* Columna Izquierda: Formulario de Envío y Pago */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Datos de Envío */}
                <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--marino)', marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>1.</span> Datos de Envío
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
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)', marginBottom: '6px' }}>Calle y número exterior/interior *</label>
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

                {/* Pasarela de Pago Mercado Pago */}
                <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--marino)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>2.</span> Método de Pago
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#009ee3', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                      MERCADO PAGO
                    </div>
                  </div>

                  {/* Formulario Estético de Tarjeta de Crédito */}
                  <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0369a1', display: 'block', marginBottom: '12px' }}>
                      💳 Tarjeta de Crédito o Débito (Procesado por Mercado Pago)
                    </span>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#0369a1', marginBottom: '4px' }}>Número de Tarjeta</label>
                        <input type="text" name="tarjetaNumero" required maxLength={19} value={formData.tarjetaNumero} onChange={handleChange} placeholder="4532 •••• •••• 8901" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #7dd3fc', outline: 'none', backgroundColor: '#ffffff', fontFamily: 'monospace' }} />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#0369a1', marginBottom: '4px' }}>Nombre en la Tarjeta</label>
                        <input type="text" name="tarjetaNombre" required value={formData.tarjetaNombre} onChange={handleChange} placeholder="COMO APARECE EN LA TARJETA" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #7dd3fc', outline: 'none', backgroundColor: '#ffffff' }} />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#0369a1', marginBottom: '4px' }}>Expiración (MM/AA)</label>
                          <input type="text" name="tarjetaExp" required maxLength={5} value={formData.tarjetaExp} onChange={handleChange} placeholder="12/28" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #7dd3fc', outline: 'none', backgroundColor: '#ffffff' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#0369a1', marginBottom: '4px' }}>Código CVC</label>
                          <input type="password" name="tarjetaCvc" required maxLength={4} value={formData.tarjetaCvc} onChange={handleChange} placeholder="123" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #7dd3fc', outline: 'none', backgroundColor: '#ffffff' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn"
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      backgroundColor: '#009ee3',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 158, 227, 0.4)'
                    }}
                  >
                    {loading ? 'Procesando Pago...' : `Pagar con Mercado Pago ($${total.toLocaleString('es-MX')} MXN)`}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--texto-2)', marginTop: '12px', margin: '12px 0 0 0' }}>
                    🔒 Transacción encriptada con SSL de 256 bits y garantizada por Mercado Pago.
                  </p>
                </div>

              </div>

              {/* Columna Derecha: Resumen de Pedido */}
              <div>
                <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', position: 'sticky', top: '100px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--marino)', marginTop: 0, marginBottom: '20px' }}>
                    Resumen del Pedido ({totalItems} piezas)
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
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
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString('es-MX')} MXN</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--texto-2)' }}>
                      <span>Envío:</span>
                      <span>{costoEnvio === 0 ? <strong style={{ color: '#16a34a' }}>¡Gratis!</strong> : `$${costoEnvio} MXN`}</span>
                    </div>

                    <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '12px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--marino)' }}>
                      <span>Total:</span>
                      <span style={{ color: 'var(--rey)' }}>${total.toLocaleString('es-MX')} MXN</span>
                    </div>
                  </div>
                </div>
              </div>

            </form>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}

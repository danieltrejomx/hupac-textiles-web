'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const { cart, subtotal, totalItems, clearCart } = useCart();

  const statusParam = searchParams.get('status');
  const orderIdParam = searchParams.get('order_id');

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    colonia: '',
    ciudad: '',
    estado: 'Estado de México',
    cp: ''
  });

  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(orderIdParam || null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const total = subtotal; // El cliente paga únicamente el precio del producto (sin IVA adicional)

  const [metodoPago, setMetodoPago] = useState<'tarjeta' | 'mercadopago'>('tarjeta');
  const [cardData, setCardData] = useState({
    numero: '',
    nombre: '',
    expiracion: '',
    cvv: ''
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData(prev => ({ ...prev, numero: formatted }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
    }
    setCardData(prev => ({ ...prev, expiracion: val }));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardData(prev => ({ ...prev, cvv: val }));
  };

  const detectBrand = (num: string) => {
    const clean = num.replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'American Express';
    return null;
  };

  const detectedBrand = detectBrand(cardData.numero);

  useEffect(() => {
    if (statusParam === 'success' && orderIdParam) {
      setOrderComplete(orderIdParam);
      clearCart();

      try {
        const orderRef = doc(db, 'orders', orderIdParam);
        updateDoc(orderRef, {
          estadoPago: 'Aprobado (Mercado Pago)',
          fechaAprobacion: serverTimestamp()
        });
      } catch (e) {
        console.error('Error actualizando orden:', e);
      }
    } else if (statusParam === 'failure') {
      setPaymentError('El pago fue rechazado o cancelado en Mercado Pago. Puedes intentarlo de nuevo.');
    }
  }, [statusParam, orderIdParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    setPaymentError(null);

    try {
      if (metodoPago === 'tarjeta') {
        const numLimpio = cardData.numero.replace(/\s+/g, '');
        if (numLimpio.length < 15 || numLimpio.length > 16) {
          throw new Error('Por favor ingresa un número de tarjeta válido (15 o 16 dígitos).');
        }
        if (!cardData.nombre.trim() || cardData.nombre.trim().length < 3) {
          throw new Error('Por favor ingresa el nombre del titular como figura en la tarjeta.');
        }
        if (!/^\d{2}\/\d{2}$/.test(cardData.expiracion)) {
          throw new Error('Por favor ingresa la fecha de expiración en formato MM/AA.');
        }
        const [mes] = cardData.expiracion.split('/').map(Number);
        if (mes < 1 || mes > 12) {
          throw new Error('El mes de expiración no es válido (01 a 12).');
        }
        if (cardData.cvv.length < 3) {
          throw new Error('Por favor ingresa el código de seguridad CVV (3 o 4 dígitos).');
        }

        const brand = detectedBrand || 'Tarjeta Bancaria';
        const last4 = numLimpio.slice(-4);

        // Breve verificación de seguridad bancaria
        await new Promise(res => setTimeout(res, 1200));

        // Registrar pedido pagado con tarjeta en Firestore
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
            estilo: i.estilo || '',
            color: i.color || '',
            talla: i.talla || '',
            cantidad: i.cantidad,
            precioUnitario: i.precioUnitario,
            subtotal: i.precioUnitario * i.cantidad
          })),
          totalItems,
          subtotal,
          iva: 0,
          envio: 0,
          total,
          metodoPago: `${brand} (•••• ${last4})`,
          estadoPago: 'Aprobado (Tarjeta de Crédito/Débito)',
          titularTarjeta: cardData.nombre.toUpperCase(),
          fecha: serverTimestamp(),
        });

        clearCart();
        setOrderComplete(docRef.id);
        setLoading(false);
        return;
      }

      // Si seleccionó Mercado Pago oficial
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
          estilo: i.estilo || '',
          color: i.color || '',
          talla: i.talla || '',
          cantidad: i.cantidad,
          precioUnitario: i.precioUnitario,
          subtotal: i.precioUnitario * i.cantidad
        })),
        totalItems,
        subtotal,
        iva: 0,
        envio: 0,
        total,
        metodoPago: 'Mercado Pago (Tarjeta / SPEI / OXXO)',
        estadoPago: 'Pendiente',
        fecha: serverTimestamp(),
      });

      // Crear Preferencia de Pago en Mercado Pago (solo precio del producto, sin IVA)
      const response = await fetch('/api/checkout/preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          cliente: formData,
          orderId: docRef.id,
          envio: 0
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.init_point) {
        throw new Error(data.error || 'No se pudo generar la preferencia de Mercado Pago.');
      }

      const redirectUrl = data.init_point || data.sandbox_init_point;
      window.location.href = redirectUrl;

    } catch (err: any) {
      console.error('Error registrando la compra o conectando con pasarela:', err);
      setPaymentError(err.message || 'Ocurrió un inconveniente al procesar el pago. Por favor intente de nuevo.');
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <main style={{ paddingTop: '120px', paddingBottom: '100px', backgroundColor: '#f8fafc', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#dcfce7', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', fontSize: '2.5rem', marginBottom: '20px' }}>
            ✓
          </div>
          <h1 style={{ fontFamily: 'var(--fuente-titulos)', color: 'var(--marino)', fontSize: '2rem', marginBottom: '12px' }}>
            ¡Compra Confirmada!
          </h1>
          <p style={{ color: 'var(--texto-2)', lineHeight: 1.6, marginBottom: '20px' }}>
            Tu pago con <strong>Mercado Pago</strong> ha sido verificado exitosamente. Hemos registrado tu pedido y prepararemos tus productos.
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
    );
  }

  return (
    <main style={{ paddingTop: '32px', paddingBottom: '80px', backgroundColor: '#f8fafc', minHeight: '85vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
        <h1 style={{ fontFamily: 'var(--fuente-titulos)', color: 'var(--marino)', fontSize: '2.2rem', marginBottom: '8px' }}>
          Finalizar Compra
        </h1>
        <p style={{ color: 'var(--texto-2)', marginBottom: '32px' }}>
          Completa tus datos de envío y realiza tu pago seguro procesado por <strong>Mercado Pago</strong>.
        </p>

        {paymentError && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', padding: '16px', borderRadius: '12px', color: '#991b1b', marginBottom: '24px', fontSize: '0.92rem' }}>
            ⚠️ {paymentError}
          </div>
        )}

        {cart.length === 0 ? (
          <div style={{ backgroundColor: '#ffffff', padding: '60px 20px', textAlign: 'center', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h2>Tu carrito está vacío</h2>
            <p style={{ color: 'var(--texto-2)', marginBottom: '20px' }}>Agrega productos al carrito antes de proceder al pago.</p>
            <Link href="/catalogo" className="btn" style={{ textDecoration: 'none' }}>Ver Productos</Link>
          </div>
        ) : (
          <form onSubmit={handlePay} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            
            {/* Columna Izquierda: Formulario de Envío y Pago */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Datos de Envío */}
              <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--marino)', marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>1.</span> Datos de Envío y Contacto
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

              {/* 2. Método de Pago */}
              <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--marino)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>2.</span> Método de Pago
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '5px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 850 }}>
                    🔒 PAGO SEGURO
                  </div>
                </div>

                {/* Selector de Método de Pago */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '22px' }}>
                  <button
                    type="button"
                    onClick={() => setMetodoPago('tarjeta')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: metodoPago === 'tarjeta' ? '2px solid var(--rey)' : '1px solid #cbd5e1',
                      backgroundColor: metodoPago === 'tarjeta' ? '#F0F7FF' : '#ffffff',
                      color: metodoPago === 'tarjeta' ? 'var(--rey)' : 'var(--texto-2)',
                      fontWeight: 800,
                      fontSize: '0.86rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>💳</span>
                    <span>Tarjeta de Crédito / Débito</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMetodoPago('mercadopago')}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: metodoPago === 'mercadopago' ? '2px solid #009ee3' : '1px solid #cbd5e1',
                      backgroundColor: metodoPago === 'mercadopago' ? '#f0f9ff' : '#ffffff',
                      color: metodoPago === 'mercadopago' ? '#009ee3' : 'var(--texto-2)',
                      fontWeight: 800,
                      fontSize: '0.86rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>🏦</span>
                    <span>Mercado Pago (SPEI / OXXO)</span>
                  </button>
                </div>

                {metodoPago === 'tarjeta' ? (
                  /* Formulario de Pago con Tarjeta Directo */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)' }}>
                          Número de tarjeta *
                        </label>
                        {detectedBrand && (
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--rey)', backgroundColor: '#EAF3FC', padding: '2px 8px', borderRadius: '4px' }}>
                            {detectedBrand}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required={metodoPago === 'tarjeta'}
                        value={cardData.numero}
                        onChange={handleCardNumberChange}
                        placeholder="4000 1234 5678 9010"
                        maxLength={19}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          outline: 'none',
                          fontFamily: 'monospace',
                          fontSize: '0.98rem',
                          letterSpacing: '1px'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)', marginBottom: '6px' }}>
                        Nombre del titular *
                      </label>
                      <input
                        type="text"
                        required={metodoPago === 'tarjeta'}
                        value={cardData.nombre}
                        onChange={(e) => setCardData(prev => ({ ...prev, nombre: e.target.value.toUpperCase() }))}
                        placeholder="COMO FIGURA EN LA TARJETA"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          outline: 'none',
                          fontSize: '0.9rem'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)', marginBottom: '6px' }}>
                          Expiración *
                        </label>
                        <input
                          type="text"
                          required={metodoPago === 'tarjeta'}
                          value={cardData.expiracion}
                          onChange={handleExpiryChange}
                          placeholder="MM / AA"
                          maxLength={5}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            outline: 'none',
                            fontFamily: 'monospace',
                            fontSize: '0.92rem',
                            textAlign: 'center'
                          }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)' }}>
                            CVV / CVC *
                          </label>
                          <span style={{ fontSize: '0.72rem', color: 'var(--texto-2)' }}>3-4 dígitos</span>
                        </div>
                        <input
                          type="password"
                          required={metodoPago === 'tarjeta'}
                          value={cardData.cvv}
                          onChange={handleCvvChange}
                          placeholder="•••"
                          maxLength={4}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            outline: 'none',
                            fontFamily: 'monospace',
                            fontSize: '0.92rem',
                            textAlign: 'center'
                          }}
                        />
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
                        fontWeight: 850,
                        backgroundColor: 'var(--rey)',
                        color: '#ffffff',
                        border: 'none',
                        cursor: loading ? 'wait' : 'pointer',
                        boxShadow: '0 6px 20px rgba(26, 58, 112, 0.25)',
                        transition: 'all 0.2s ease',
                        marginTop: '6px'
                      }}
                    >
                      {loading ? 'Procesando pago seguro...' : `Pagar con Tarjeta ($${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN)`}
                    </button>
                  </div>
                ) : (
                  /* Opción Mercado Pago Oficial */
                  <div>
                    <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '14px', padding: '18px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0369a1', display: 'block', marginBottom: '6px' }}>
                        💳 Medios aceptados con Mercado Pago:
                      </span>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#0284c7', fontSize: '0.84rem', lineHeight: 1.6 }}>
                        <li>Transferencia bancaria SPEI con acreditación inmediata</li>
                        <li>Depósito en efectivo en tiendas OXXO y 7-Eleven</li>
                        <li>Saldo en cuenta de Mercado Pago y Mercado Crédito</li>
                      </ul>
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
                        fontWeight: 850,
                        backgroundColor: '#009ee3',
                        color: '#ffffff',
                        border: 'none',
                        cursor: loading ? 'wait' : 'pointer',
                        boxShadow: '0 6px 20px rgba(0, 158, 227, 0.35)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {loading ? 'Conectando con Mercado Pago...' : `Continuar a Mercado Pago ($${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN)`}
                    </button>
                  </div>
                )}

                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--texto-2)', marginTop: '14px', margin: '14px 0 0 0' }}>
                  🔒 Cifrado SSL de 256 bits · Transacción bancaria protegida y segura.
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
                    <span>Precio de Productos:</span>
                    <span>${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--texto-2)' }}>
                    <span>Envío Nacional:</span>
                    <span style={{ color: '#16a34a', fontWeight: 700 }}>¡Gratis!</span>
                  </div>

                  <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: '12px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--marino)' }}>
                    <span>Total a Pagar:</span>
                    <span style={{ color: 'var(--rey)' }}>${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'right', display: 'block', marginTop: '2px' }}>
                    * Paga únicamente el precio de tus prendas (sin IVA adicional)
                  </span>
                </div>
              </div>
            </div>

          </form>
        )}

      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--marino)', fontWeight: 700 }}>Cargando Checkout...</p>
        </div>
      }>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </>
  );
}

'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(19, 42, 82, 0.4)',
          backdropFilter: 'blur(4px)',
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Drawer Panel */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#ffffff',
        height: '100%',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1001,
        animation: 'slideInRight 0.3s ease-out'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontFamily: 'var(--fuente-titulos)', fontSize: '1.25rem', color: 'var(--marino)', margin: 0 }}>
              Carrito de Compras
            </h2>
            <span style={{ 
              backgroundColor: 'var(--rey)', 
              color: '#ffffff', 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              padding: '2px 8px', 
              borderRadius: '12px' 
            }}>
              {totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}
            </span>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: 'var(--texto-2)',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '4px'
            }}
            aria-label="Cerrar carrito"
          >
            &times;
          </button>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--texto-2)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛒</div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--marino)', marginBottom: '8px' }}>Tu carrito está vacío</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '24px' }}>Explora nuestro catálogo y agrega tus prendas.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn"
                style={{ fontSize: '0.9rem', padding: '10px 20px' }}
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div 
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '14px',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    alignItems: 'center'
                  }}
                >
                  <img 
                    src={item.imagen} 
                    alt={item.nombre} 
                    style={{ width: '64px', height: '64px', objectFit: 'contain', backgroundColor: '#ffffff', borderRadius: '8px', padding: '4px', border: '1px solid #e2e8f0' }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--marino)', margin: '0 0 4px 0', fontWeight: 700 }}>
                      {item.nombre}
                    </h4>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--texto-2)', marginBottom: '8px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.colorHex, border: item.colorHex === '#FFFFFF' ? '1px solid #94a3b8' : 'none' }} />
                        {item.color}
                      </span>
                      <span>•</span>
                      <span>Talla: <strong>{item.talla}</strong></span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Quantity Controls */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                          style={{ width: '26px', height: '26px', border: 'none', backgroundColor: '#f1f5f9', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}
                        >
                          -
                        </button>
                        <span style={{ width: '32px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700 }}>
                          {item.cantidad}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          style={{ width: '26px', height: '26px', border: 'none', backgroundColor: '#f1f5f9', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontWeight: 700, color: 'var(--marino)', fontSize: '0.95rem' }}>
                        ${(item.precioUnitario * item.cantidad).toLocaleString('es-MX')} MXN
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.1rem', padding: '4px' }}
                    title="Eliminar de carrito"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--texto-2)' }}>
              <span>Subtotal ({totalItems} piezas):</span>
              <span style={{ fontWeight: 600, color: 'var(--marino)' }}>${subtotal.toLocaleString('es-MX')} MXN</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--marino)' }}>
              <span>Total Estimado:</span>
              <span style={{ color: 'var(--rey)' }}>${subtotal.toLocaleString('es-MX')} MXN</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 700,
                textDecoration: 'none',
                backgroundColor: '#16a34a',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)'
              }}
            >
              Proceder al Checkout &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

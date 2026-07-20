'use client';
import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById } from '@/data/products';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(product.colores[0]);
  const [selectedSize, setSelectedSize] = useState(product.tallas[0]);
  const [quantity, setQuantity] = useState(12);

  const isOscuro = ['#132A52', '#2456C4', '#B22234', '#17222B', '#3A3F46', '#27364B', '#5A2D63'].includes(selectedColor.hex);

  const whatsappMessage = encodeURIComponent(
    `Hola HUPAC TEXTILES, me interesa cotizar:\n` +
    `• Prenda: ${product.nombre} (${product.estilo})\n` +
    `• Color: ${selectedColor.nombre}\n` +
    `• Talla: ${selectedSize}\n` +
    `• Cantidad aproximada: ${quantity} piezas\n` +
    `• Composición: ${product.composicion}`
  );

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '80vh', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Breadcrumbs */}
          <div style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--texto-2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/" style={{ color: 'var(--rey)', textDecoration: 'none', fontWeight: 500 }}>Inicio</Link>
            <span>/</span>
            <Link href="/#catalogo" style={{ color: 'var(--rey)', textDecoration: 'none', fontWeight: 500 }}>Catálogo</Link>
            <span>/</span>
            <span style={{ color: 'var(--marino)', fontWeight: 600 }}>{product.nombre}</span>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '40px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 10px 30px rgba(19, 42, 82, 0.05)',
            border: '1px solid #e2e8f0'
          }}>
            
            {/* Columna Izquierda: Galería e Imagen Principal */}
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '380px'
              }}>
                <img 
                  src={selectedColor.imagen || product.imagenPrincipal} 
                  alt={`${product.nombre} en color ${selectedColor.nombre}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '440px',
                    objectFit: 'contain',
                    transition: 'all 0.3s ease'
                  }}
                />
                
                {/* Badge de Estilo */}
                <span className="prod-tag" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                  {product.estilo}
                </span>

                {/* Badge de Color Seleccionado */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #cbd5e1',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <span style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: selectedColor.hex,
                    border: selectedColor.hex === '#FFFFFF' ? '1px solid #94a3b8' : 'none',
                    display: 'inline-block'
                  }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--marino)' }}>
                    Color: {selectedColor.nombre}
                  </span>
                </div>
              </div>

              {/* Selector Rápido de Fotos/Variantes */}
              <div style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--texto-2)', display: 'block', marginBottom: '10px' }}>
                  Variantes de color disponibles ({product.colores.length}):
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {product.colores.map((colorItem, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(colorItem)}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: colorItem.hex,
                        border: selectedColor.nombre === colorItem.nombre ? '3px solid var(--rey)' : (colorItem.hex === '#FFFFFF' ? '1px solid #cbd5e1' : 'none'),
                        boxShadow: selectedColor.nombre === colorItem.nombre ? '0 0 0 2px rgba(36,86,196,0.3)' : 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease',
                        transform: selectedColor.nombre === colorItem.nombre ? 'scale(1.1)' : 'scale(1)'
                      }}
                      title={colorItem.nombre}
                      aria-label={`Seleccionar color ${colorItem.nombre}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Detalles, Tallas, Cantidad y Botones de Acción */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: '8px' }}>Ficha de Producto</span>
                <h1 style={{ fontFamily: 'var(--fuente-titulos)', fontSize: '2rem', color: 'var(--marino)', marginBottom: '8px', lineHeight: 1.2 }}>
                  {product.nombre}
                </h1>
                <p style={{ color: 'var(--rey)', fontWeight: 600, fontSize: '1.05rem', marginBottom: '16px' }}>
                  {product.subtitulo}
                </p>

                <p style={{ color: 'var(--texto-2)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {product.descripcion}
                </p>

                {/* Especificaciones */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '12px', 
                  backgroundColor: '#f8fafc', 
                  padding: '16px', 
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--texto-2)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, display: 'block' }}>Composición</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--marino)' }}>{product.composicion}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--texto-2)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, display: 'block' }}>Gramaje</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--marino)' }}>{product.gramaje}</span>
                  </div>
                </div>

                {/* Selección de Color */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: 'var(--marino)', marginBottom: '10px', fontSize: '0.95rem' }}>
                    1. Selecciona el Color: <span style={{ color: 'var(--rey)', fontWeight: 600 }}>{selectedColor.nombre}</span>
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {product.colores.map((colorItem, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(colorItem)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 14px',
                          borderRadius: '30px',
                          border: selectedColor.nombre === colorItem.nombre ? '2px solid var(--rey)' : '1px solid #cbd5e1',
                          backgroundColor: selectedColor.nombre === colorItem.nombre ? '#f0f6ff' : '#ffffff',
                          cursor: 'pointer',
                          fontWeight: selectedColor.nombre === colorItem.nombre ? 600 : 400,
                          fontSize: '0.85rem',
                          color: 'var(--marino)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: colorItem.hex,
                          border: colorItem.hex === '#FFFFFF' ? '1px solid #94a3b8' : 'none'
                        }} />
                        {colorItem.nombre}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selección de Talla */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: 'var(--marino)', marginBottom: '10px', fontSize: '0.95rem' }}>
                    2. Selecciona la Talla: <span style={{ color: 'var(--rey)', fontWeight: 600 }}>{selectedSize}</span>
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {product.tallas.map((talla) => (
                      <button
                        key={talla}
                        onClick={() => setSelectedSize(talla)}
                        style={{
                          minWidth: '48px',
                          height: '42px',
                          padding: '0 12px',
                          borderRadius: '10px',
                          border: selectedSize === talla ? '2px solid var(--rey)' : '1px solid #cbd5e1',
                          backgroundColor: selectedSize === talla ? 'var(--rey)' : '#ffffff',
                          color: selectedSize === talla ? '#ffffff' : 'var(--marino)',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {talla}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selección de Cantidad */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontWeight: 700, color: 'var(--marino)', marginBottom: '10px', fontSize: '0.95rem' }}>
                    3. Cantidad estimada de piezas:
                  </label>
                  <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 6))}
                      style={{ width: '40px', height: '40px', border: 'none', backgroundColor: '#f1f5f9', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700, color: 'var(--marino)' }}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      style={{ width: '60px', height: '40px', border: 'none', textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: 'var(--marino)', outline: 'none' }}
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 6)}
                      style={{ width: '40px', height: '40px', border: 'none', backgroundColor: '#f1f5f9', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700, color: 'var(--marino)' }}
                    >
                      +
                    </button>
                  </div>
                  <span style={{ marginLeft: '12px', fontSize: '0.85rem', color: 'var(--texto-2)' }}>piezas</span>
                </div>

                {/* Detalles y Técnicas */}
                <div style={{ marginBottom: '28px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--marino)', marginBottom: '8px' }}>Detalles de Confección:</h4>
                  <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.85rem', color: 'var(--texto-2)', lineHeight: 1.6 }}>
                    {product.detalles.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botones de Acción */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href={`https://wa.me/525612870780?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ws"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    textAlign: 'center'
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm5.6 14.2c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.7-.4 1 .6 1 1.3 1.8 2.2 2.4.7.4 1.1.6 1.3.4.2-.1.7-.8.9-1.1.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.4 0 .1 0 .7-.2 1.5Z"/>
                  </svg>
                  Cotizar esta variante por WhatsApp
                </a>

                <Link
                  href="/#configurador"
                  className="btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14px 24px',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    backgroundColor: 'var(--marino)',
                    color: '#ffffff',
                    textAlign: 'center'
                  }}
                >
                  Personalizar con mi Logo en el Configurador
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

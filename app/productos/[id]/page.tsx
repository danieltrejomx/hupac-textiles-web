'use client';
import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
  const router = useRouter();
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(product.colores[0]);
  const [selectedSize, setSelectedSize] = useState(product.tallas[0]);
  const [quantity, setQuantity] = useState(12);

  // Price calculation
  const unitPrice = quantity >= 50 && product.precioMayoreo ? product.precioMayoreo : product.precioUnitario;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      nombre: product.nombre,
      estilo: product.estilo,
      color: selectedColor.nombre,
      colorHex: selectedColor.hex,
      talla: selectedSize,
      cantidad: quantity,
      precioUnitario: unitPrice,
      imagen: selectedColor.imagen || product.imagenPrincipal,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      nombre: product.nombre,
      estilo: product.estilo,
      color: selectedColor.nombre,
      colorHex: selectedColor.hex,
      talla: selectedSize,
      cantidad: quantity,
      precioUnitario: unitPrice,
      imagen: selectedColor.imagen || product.imagenPrincipal,
    });
    router.push('/checkout');
  };

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

            {/* Columna Derecha: Detalles, Precios, Tallas, Cantidad y Botones de Acción */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: '8px' }}>Ficha de Producto</span>
                <h1 style={{ fontFamily: 'var(--fuente-titulos)', fontSize: '2rem', color: 'var(--marino)', marginBottom: '8px', lineHeight: 1.2 }}>
                  {product.nombre}
                </h1>
                <p style={{ color: 'var(--rey)', fontWeight: 600, fontSize: '1.05rem', marginBottom: '16px' }}>
                  {product.subtitulo}
                </p>

                {/* Bloque de Precio */}
                <div style={{ 
                  backgroundColor: '#f0f6ff', 
                  padding: '16px 20px', 
                  borderRadius: '14px', 
                  border: '1px solid #bfdbfe',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--texto-2)', display: 'block', fontWeight: 600 }}>
                      Precio por pieza:
                    </span>
                    <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--marino)' }}>
                      ${unitPrice} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--texto-2)' }}>MXN</span>
                    </span>
                    {product.precioMayoreo && quantity >= 50 && (
                      <span style={{ fontSize: '0.75rem', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700, padding: '2px 8px', borderRadius: '10px', marginLeft: '8px' }}>
                        ¡Precio Mayoreo Aplicado!
                      </span>
                    )}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--texto-2)', display: 'block', fontWeight: 600 }}>
                      Total ({quantity} pzs):
                    </span>
                    <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--rey)' }}>
                      ${totalPrice.toLocaleString('es-MX')} <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>MXN</span>
                    </span>
                  </div>
                </div>

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
                    3. Cantidad de piezas:
                  </label>
                  <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ width: '40px', height: '40px', border: 'none', backgroundColor: '#f1f5f9', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700, color: 'var(--marino)' }}
                    >
                      +
                    </button>
                  </div>
                  <span style={{ marginLeft: '12px', fontSize: '0.85rem', color: 'var(--texto-2)' }}>piezas</span>
                </div>

                {/* Detalles y Confección */}
                <div style={{ marginBottom: '28px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--marino)', marginBottom: '8px' }}>Detalles de Confección:</h4>
                  <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.85rem', color: 'var(--texto-2)', lineHeight: 1.6 }}>
                    {product.detalles.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Nuevos Botones E-Commerce: Comprar Ahora y Agregar al Carrito */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={handleBuyNow}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  ⚡ Comprar Ahora (${totalPrice.toLocaleString('es-MX')} MXN)
                </button>

                <button
                  onClick={handleAddToCart}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    backgroundColor: 'var(--marino)',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  🛒 Agregar al Carrito
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';

export default function CatalogCarousel() {
  const [filterCategory, setFilterCategory] = useState<'todos' | 'playeras' | 'polos' | 'calzado' | 'accesorios'>('todos');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filterCategory === 'playeras') return p.categoria !== 'calzado' && p.categoria !== 'accesorios' && !p.nombre.toLowerCase().includes('polo');
    if (filterCategory === 'polos') return p.nombre.toLowerCase().includes('polo');
    if (filterCategory === 'calzado') return p.categoria === 'calzado';
    if (filterCategory === 'accesorios') return p.categoria === 'accesorios';
    return true;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340 * 2;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="catalogo" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--linea)', borderBottom: '1px solid var(--linea)', padding: '60px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
        
        {/* Header con título y controles de filtro + flechas de navegación */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginBottom: '36px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <span className="eyebrow">Catálogo HUPAC Textiles & Duty Gear</span>
            <h2 style={{ marginBottom: '8px' }}>Catálogo General de Productos</h2>
            <p style={{ color: 'var(--texto-2)', margin: 0, fontSize: '1rem' }}>
              Explora nuestras líneas de confección textil y la nueva línea industrial de calzado de seguridad y accesorios.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* Selector de categoría */}
            <div style={{ display: 'inline-flex', backgroundColor: 'var(--nube)', padding: '4px', borderRadius: '12px', border: '1px solid var(--linea)', flexWrap: 'wrap', gap: '4px' }}>
              <button
                onClick={() => setFilterCategory('todos')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: filterCategory === 'todos' ? '#ffffff' : 'transparent',
                  color: filterCategory === 'todos' ? 'var(--marino)' : 'var(--texto-2)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: filterCategory === 'todos' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                Todos ({PRODUCTS.length})
              </button>
              <button
                onClick={() => setFilterCategory('playeras')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: filterCategory === 'playeras' ? '#ffffff' : 'transparent',
                  color: filterCategory === 'playeras' ? 'var(--marino)' : 'var(--texto-2)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: filterCategory === 'playeras' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                Playeras
              </button>
              <button
                onClick={() => setFilterCategory('polos')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: filterCategory === 'polos' ? '#ffffff' : 'transparent',
                  color: filterCategory === 'polos' ? 'var(--marino)' : 'var(--texto-2)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: filterCategory === 'polos' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                Polos
              </button>
              <button
                onClick={() => setFilterCategory('calzado')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: filterCategory === 'calzado' ? 'var(--rey)' : 'transparent',
                  color: filterCategory === 'calzado' ? '#ffffff' : 'var(--marino)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: filterCategory === 'calzado' ? '0 2px 8px rgba(36,86,196,0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                🥾 Calzado de Seguridad
              </button>
              <button
                onClick={() => setFilterCategory('accesorios')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: filterCategory === 'accesorios' ? '#ffffff' : 'transparent',
                  color: filterCategory === 'accesorios' ? 'var(--marino)' : 'var(--texto-2)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: filterCategory === 'accesorios' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                Accesorios
              </button>
            </div>

            {/* Flechas del carrusel */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => scroll('left')}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid var(--linea)',
                  backgroundColor: '#ffffff',
                  color: 'var(--marino)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Deslizar a la izquierda"
              >
                ‹
              </button>
              <button
                onClick={() => scroll('right')}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid var(--linea)',
                  backgroundColor: '#ffffff',
                  color: 'var(--marino)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Deslizar a la derecha"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Carrusel Deslizable Horizontalmente */}
        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '24px',
            scrollbarWidth: 'thin',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              style={{
                flex: '0 0 320px',
                scrollSnapAlign: 'start',
                width: '320px',
                minWidth: '320px'
              }}
            >
              <Link
                href={`/productos/${prod.id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
              >
                <article
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--linea)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(19, 42, 82, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    backgroundColor: 'var(--nube)',
                    height: '240px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px'
                  }}>
                    <img
                      src={prod.imagenPrincipal}
                      alt={prod.nombre}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      fontFamily: 'var(--mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid var(--linea)',
                      color: 'var(--marino)',
                      borderRadius: '6px',
                      padding: '4px 10px'
                    }}>
                      ESTILO {prod.sku}
                    </span>
                  </div>

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--marino)', margin: '0 0 6px 0' }}>
                        {prod.nombre}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--texto-2)', fontFamily: 'var(--mono)', display: 'block', marginBottom: '8px' }}>
                        {prod.composicion} · {prod.gramaje}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--rey)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
                        Ver tallas y variantes &rarr;
                      </span>

                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {prod.colores.slice(0, 8).map((c, i) => (
                          <span
                            key={i}
                            style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              backgroundColor: c.hex,
                              border: c.hex === '#FFFFFF' ? '1px solid #cbd5e1' : 'none',
                              display: 'inline-block'
                            }}
                            title={c.nombre}
                          />
                        ))}
                        {prod.colores.length > 8 && (
                          <span style={{ fontSize: '0.7rem', color: 'var(--texto-2)', fontWeight: 600, alignSelf: 'center' }}>
                            +{prod.colores.length - 8}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

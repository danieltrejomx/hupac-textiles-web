'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';

function CarouselProductCard({ prod }: { prod: Product }) {
  const [selectedColor, setSelectedColor] = useState(prod.colores?.[0]);
  const activeImg = selectedColor?.imagen || prod.imagenPrincipal;

  return (
    <div
      style={{
        flex: '0 0 300px',
        scrollSnapAlign: 'start',
        width: '300px',
        minWidth: '300px'
      }}
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
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(19, 42, 82, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <Link
          href={`/productos/${prod.id}`}
          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
          <div style={{
            backgroundColor: '#ffffff',
            height: '240px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            borderBottom: '1px solid var(--linea)'
          }}>
            <img
              src={activeImg}
              alt={`${prod.nombre} - ${selectedColor?.nombre || ''}`}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply', transition: 'all 0.2s ease' }}
            />
            <span style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              fontWeight: 700,
              backgroundColor: 'rgba(255,255,255,0.94)',
              backdropFilter: 'blur(4px)',
              border: '1px solid var(--linea)',
              color: 'var(--marino)',
              borderRadius: '6px',
              padding: '3px 8px'
            }}>
              ESTILO {prod.sku}
            </span>
          </div>
        </Link>

        <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <Link
            href={`/productos/${prod.id}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--marino)', margin: '0 0 4px 0', lineHeight: 1.25 }}>
                {prod.nombre}
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--texto-2)', fontFamily: 'var(--mono)', display: 'block', marginBottom: '8px' }}>
                {prod.composicion} · {prod.gramaje}
              </span>
            </div>
          </Link>

          <div>
            {prod.precioDirecto ? (
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--texto-2)', display: 'block' }}>Desde (sin IVA):</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--marino)' }}>
                  ${prod.precioDirecto.toFixed(2)} <span style={{ fontSize: '0.8rem', color: 'var(--texto-2)' }}>MXN</span>
                </span>
              </div>
            ) : null}

            <Link
              href={`/productos/${prod.id}`}
              style={{ textDecoration: 'none', fontSize: '0.8rem', color: 'var(--rey)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}
            >
              Ver detalles &rarr;
            </Link>

            {prod.colores && prod.colores.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                {prod.colores.slice(0, 7).map((c, i) => {
                  const isSelected = selectedColor?.nombre === c.nombre;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColor(c);
                      }}
                      onMouseEnter={() => {
                        if (c.imagen) setSelectedColor(c);
                      }}
                      style={{
                        width: isSelected ? '17px' : '13px',
                        height: isSelected ? '17px' : '13px',
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: isSelected ? '2px solid var(--rey)' : (c.hex === '#FFFFFF' ? '1px solid #cbd5e1' : '1px solid rgba(0,0,0,0.12)'),
                        boxShadow: isSelected ? '0 0 0 2px rgba(36,86,196,0.25)' : 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.15s ease',
                        outline: 'none'
                      }}
                      title={c.nombre}
                      aria-label={`Seleccionar color ${c.nombre}`}
                    />
                  );
                })}
                {prod.colores.length > 7 && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--texto-2)', fontWeight: 600, alignSelf: 'center' }}>
                    +{prod.colores.length - 7}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default function CatalogCarousel() {
  const textilesScrollRef = useRef<HTMLDivElement>(null);
  const footwearScrollRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const textilesProducts = PRODUCTS.filter((p) => !p.categoria || p.categoria === 'textiles');
  const footwearProducts = PRODUCTS.filter((p) => p.categoria === 'calzado' || p.categoria === 'accesorios');

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.nombre.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.composicion?.toLowerCase().includes(q) ||
          p.gramaje?.toLowerCase().includes(q) ||
          p.categoria?.toLowerCase().includes(q)
        );
      })
    : [];

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 320 * 2;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="catalogo" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--linea)', borderBottom: '1px solid var(--linea)', padding: '56px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
        
        {/* ================= BUSCADOR CON LUPA & BOTONES RÁPIDOS DE CATEGORÍAS ================= */}
        <div style={{ marginBottom: '36px', paddingBottom: '24px', borderBottom: '1px solid var(--linea)' }}>
          
          {/* Campo de Búsqueda con Lupa */}
          <div style={{ position: 'relative', maxWidth: '560px', marginBottom: '20px' }}>
            <div style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.1rem',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              userSelect: 'none'
            }}>
              🔍
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos por nombre, código SKU o tipo..."
              style={{
                width: '100%',
                padding: '12px 42px 12px 46px',
                borderRadius: '12px',
                border: searchQuery ? '2px solid var(--rey)' : '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                backgroundColor: '#ffffff',
                boxShadow: searchQuery ? '0 0 0 4px rgba(36,86,196,0.12)' : '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease',
                color: 'var(--marino)',
                fontWeight: 600
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#e2e8f0',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800
                }}
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {/* Categorías Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--marino)', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '4px', fontFamily: 'var(--mono)' }}>
              Categorías:
            </span>
            {[
              { slug: 'playeras', emoji: '👕', label: 'Playeras y Polos', count: textilesProducts.length, bg: '#f8fafc', border: '#cbd5e1', color: 'var(--marino)' },
              { slug: 'calzado', emoji: '🥾', label: 'Calzado Duty Gear', count: footwearProducts.length, bg: '#f8fafc', border: '#cbd5e1', color: 'var(--marino)' },
              { slug: 'cabeza', emoji: '⛑️', label: 'Protección Cabeza', count: PRODUCTS.filter(p => p.categoria === 'cabeza').length, bg: '#fef3c7', border: '#fde68a', color: '#92400e' },
              { slug: 'visual', emoji: '🥽', label: 'Protección Visual', count: PRODUCTS.filter(p => p.categoria === 'visual').length, bg: '#e0f2fe', border: '#bae6fd', color: '#0369a1' },
              { slug: 'manos', emoji: '🧤', label: 'Protección Manos', count: PRODUCTS.filter(p => p.categoria === 'manos').length, bg: '#fce7f3', border: '#fbcfe8', color: '#9d174d' },
              { slug: 'ropa-trabajo', emoji: '🦺', label: 'Ropa de Trabajo', count: PRODUCTS.filter(p => p.categoria === 'ropa-trabajo').length, bg: '#dcfce7', border: '#bbf7d0', color: '#166534' },
              { slug: 'alturas', emoji: '🔗', label: 'Protección Alturas', count: PRODUCTS.filter(p => p.categoria === 'alturas').length, bg: '#ede9fe', border: '#ddd6fe', color: '#5b21b6' },
              { slug: 'vial', emoji: '🚧', label: 'Limitación Vial', count: PRODUCTS.filter(p => p.categoria === 'vial').length, bg: '#fee2e2', border: '#fecaca', color: '#991b1b' },
            ].map(btn => (
              <Link
                key={btn.slug}
                href={`/categoria/${btn.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  backgroundColor: btn.bg,
                  border: `1.5px solid ${btn.border}`,
                  color: btn.color,
                  textDecoration: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  padding: '7px 14px',
                  borderRadius: '999px',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
                }}
              >
                <span>{btn.emoji}</span>
                <span>{btn.label}</span>
                <span style={{
                  fontSize: '0.72rem',
                  backgroundColor: 'rgba(0,0,0,0.06)',
                  padding: '2px 7px',
                  borderRadius: '10px',
                  fontWeight: 800
                }}>
                  {btn.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ================= RESULTADOS DE BÚSQUEDA EN TIEMPO REAL ================= */}
        {searchQuery.trim() ? (
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--marino)', margin: 0 }}>
                  🔍 Resultados de Búsqueda ({searchResults.length})
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                  Mostrando productos coincidentes con &quot;<b style={{ color: 'var(--rey)' }}>{searchQuery}</b>&quot;
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--marino)',
                  cursor: 'pointer'
                }}
              >
                ✕ Limpiar Búsqueda
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {searchResults.map((prod) => (
                  <article
                    key={prod.id}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid var(--linea)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                    }}
                  >
                    <Link href={`/productos/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div style={{
                        backgroundColor: '#ffffff',
                        height: '220px',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '12px',
                        borderBottom: '1px solid var(--linea)'
                      }}>
                        <img
                          src={prod.imagenPrincipal}
                          alt={prod.nombre}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                        />
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          fontFamily: 'var(--mono)',
                          fontSize: '10px',
                          fontWeight: 700,
                          backgroundColor: 'rgba(255,255,255,0.94)',
                          border: '1px solid var(--linea)',
                          color: 'var(--marino)',
                          borderRadius: '6px',
                          padding: '3px 8px'
                        }}>
                          ESTILO {prod.sku}
                        </span>
                      </div>
                    </Link>
                    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 750, color: 'var(--marino)', margin: '0 0 4px 0' }}>
                          {prod.nombre}
                        </h4>
                        <span style={{ fontSize: '0.78rem', color: 'var(--texto-2)', fontFamily: 'var(--mono)', display: 'block', marginBottom: '8px' }}>
                          {prod.composicion} · {prod.gramaje}
                        </span>
                      </div>
                      <Link
                        href={`/productos/${prod.id}`}
                        style={{ textDecoration: 'none', fontSize: '0.85rem', color: 'var(--rey)', fontWeight: 700 }}
                      >
                        Ver detalles &rarr;
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '48px 20px',
                backgroundColor: '#f8fafc',
                borderRadius: '16px',
                border: '1px dashed #cbd5e1'
              }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>🔍</span>
                <h4 style={{ color: 'var(--marino)', fontSize: '1.2rem', margin: '0 0 8px' }}>
                  No encontramos productos con &quot;{searchQuery}&quot;
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                  Intenta buscar por palabras clave como &quot;polo&quot;, &quot;bota&quot;, &quot;casco&quot;, &quot;chaleco&quot; o explora por categoría arriba.
                </p>
              </div>
            )}
          </div>
        ) : null}

        {/* ================= CARRUSEL 1: PLAYERAS Y TEXTILES ================= */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span className="eyebrow">Catálogo Confección Textil</span>
              <h2 style={{ marginBottom: '6px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link href="/categoria/playeras" style={{ color: 'var(--marino)', textDecoration: 'none' }}>
                  Playeras y Polos de Línea
                </Link>
                <Link href="/categoria/playeras" style={{ fontSize: '0.85rem', color: 'var(--rey)', fontWeight: 700, textDecoration: 'none' }}>
                  Ver todo ({textilesProducts.length}) &rarr;
                </Link>
              </h2>
              <p style={{ color: 'var(--texto-2)', margin: 0, fontSize: '0.95rem' }}>
                Modelos corporativos en peso completo, cuello redondo, cuello V y polos piqué.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => scroll(textilesScrollRef, 'left')}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--linea)',
                  backgroundColor: '#ffffff', color: 'var(--marino)', fontSize: '1.2rem', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}
                aria-label="Deslizar textiles a la izquierda"
              >
                ‹
              </button>
              <button
                onClick={() => scroll(textilesScrollRef, 'right')}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--linea)',
                  backgroundColor: '#ffffff', color: 'var(--marino)', fontSize: '1.2rem', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}
                aria-label="Deslizar textiles a la derecha"
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={textilesScrollRef}
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '16px',
              scrollbarWidth: 'thin',
              scrollBehavior: 'smooth'
            }}
          >
            {textilesProducts.map((p) => (
              <CarouselProductCard key={p.id} prod={p} />
            ))}
          </div>
        </div>


        {/* ================= CARRUSEL 2: CALZADO DE SEGURIDAD Y ACCESORIOS ================= */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span className="eyebrow" style={{ color: '#0369a1' }}>Línea de Protección Industrial · Duty Gear</span>
              <h2 style={{ marginBottom: '6px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link href="/categoria/calzado" style={{ color: 'var(--marino)', textDecoration: 'none' }}>
                  🥾 Calzado de Seguridad y Accesorios
                </Link>
                <Link href="/categoria/calzado" style={{ fontSize: '0.85rem', color: 'var(--rey)', fontWeight: 700, textDecoration: 'none' }}>
                  Ver todo ({footwearProducts.length}) &rarr;
                </Link>
              </h2>
              <p style={{ color: 'var(--texto-2)', margin: 0, fontSize: '0.95rem' }}>
                Botas dieléctricas, tenis antiderrapantes, protección metatarsal y plantillas antifatiga.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => scroll(footwearScrollRef, 'left')}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--linea)',
                  backgroundColor: '#ffffff', color: 'var(--marino)', fontSize: '1.2rem', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}
                aria-label="Deslizar calzado a la izquierda"
              >
                ‹
              </button>
              <button
                onClick={() => scroll(footwearScrollRef, 'right')}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--linea)',
                  backgroundColor: '#ffffff', color: 'var(--marino)', fontSize: '1.2rem', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}
                aria-label="Deslizar calzado a la derecha"
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={footwearScrollRef}
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '16px',
              scrollbarWidth: 'thin',
              scrollBehavior: 'smooth'
            }}
          >
            {footwearProducts.map((p) => (
              <CarouselProductCard key={p.id} prod={p} />
            ))}
          </div>
        </div>

        {/* ================= SECCIÓN EPC: GRID DE CATEGORÍAS ================= */}
        <div style={{ marginTop: '72px' }}>
          <div style={{ marginBottom: '28px' }}>
            <span className="eyebrow" style={{ color: '#b45309' }}>Equipo de Protección y Trabajo</span>
            <h2 style={{ marginBottom: '6px', fontSize: '1.8rem' }}>🛡️ Catálogo EPC Completo</h2>
            <p style={{ color: 'var(--texto-2)', margin: 0, fontSize: '0.95rem' }}>
              Equipo de protección colectiva e individual certificado: cascos, lentes, guantes, ropa industrial, arneses y señalización vial.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px'
          }}>
            {[
              { slug: 'cabeza', emoji: '⛑️', titulo: 'Protección para la Cabeza', desc: 'Cascos, protectores faciales, orejeras, tapones, cofias', color: '#fef3c7', accent: '#d97706', count: PRODUCTS.filter(p => p.categoria === 'cabeza').length },
              { slug: 'visual', emoji: '🥽', titulo: 'Protección Visual', desc: 'Lentes de seguridad, goggles, sobre lentes', color: '#e0f2fe', accent: '#0284c7', count: PRODUCTS.filter(p => p.categoria === 'visual').length },
              { slug: 'manos', emoji: '🧤', titulo: 'Protección para Manos', desc: 'Guantes nitrilo, carnaza, anticorte, soldador', color: '#fce7f3', accent: '#db2777', count: PRODUCTS.filter(p => p.categoria === 'manos').length },
              { slug: 'ropa-trabajo', emoji: '🦺', titulo: 'Ropa de Trabajo', desc: 'Chalecos, overoles, mezclilla, mandiles, impermeables', color: '#dcfce7', accent: '#16a34a', count: PRODUCTS.filter(p => p.categoria === 'ropa-trabajo').length },
              { slug: 'alturas', emoji: '🔗', titulo: 'Protección a las Alturas', desc: 'Arneses, líneas de vida, puntos de anclaje', color: '#ede9fe', accent: '#7c3aed', count: PRODUCTS.filter(p => p.categoria === 'alturas').length },
              { slug: 'vial', emoji: '🚧', titulo: 'Limitación Vial', desc: 'Conos, trafitambos, mallas, cintas, postes', color: '#fee2e2', accent: '#dc2626', count: PRODUCTS.filter(p => p.categoria === 'vial').length }
            ].map(cat => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div
                  style={{
                    backgroundColor: cat.color,
                    border: `1.5px solid ${cat.accent}22`,
                    borderRadius: '16px',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 20px ${cat.accent}22`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>{cat.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a', marginBottom: '4px' }}>{cat.titulo}</div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>{cat.desc}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: cat.accent }}>Ver {cat.count} productos →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

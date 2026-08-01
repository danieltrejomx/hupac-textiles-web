'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';

export default function CatalogCarousel() {
  const textilesScrollRef = useRef<HTMLDivElement>(null);
  const footwearScrollRef = useRef<HTMLDivElement>(null);

  const textilesProducts = PRODUCTS.filter((p) => !p.categoria || p.categoria === 'textiles');
  const footwearProducts = PRODUCTS.filter((p) => p.categoria === 'calzado' || p.categoria === 'accesorios');

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 320 * 2;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const renderProductCard = (prod: Product) => (
    <div
      key={prod.id}
      style={{
        flex: '0 0 300px',
        scrollSnapAlign: 'start',
        width: '300px',
        minWidth: '300px'
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
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(19, 42, 82, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{
            backgroundColor: 'var(--nube)',
            height: '220px',
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

          <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--marino)', margin: '0 0 4px 0', lineHeight: 1.25 }}>
                {prod.nombre}
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--texto-2)', fontFamily: 'var(--mono)', display: 'block', marginBottom: '8px' }}>
                {prod.composicion} · {prod.gramaje}
              </span>
            </div>

            <div>
              {prod.precioDirecto ? (
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--texto-2)', display: 'block' }}>Desde (sin IVA):</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--marino)' }}>
                    ${prod.precioDirecto.toFixed(2)} <span style={{ fontSize: '0.8rem', color: 'var(--texto-2)' }}>MXN</span>
                  </span>
                </div>
              ) : null}

              <span style={{ fontSize: '0.8rem', color: 'var(--rey)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                Ver detalles &rarr;
              </span>

              {prod.colores && prod.colores.length > 0 && (
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {prod.colores.slice(0, 7).map((c, i) => (
                    <span
                      key={i}
                      style={{
                        width: '13px',
                        height: '13px',
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: c.hex === '#FFFFFF' ? '1px solid #cbd5e1' : 'none',
                        display: 'inline-block'
                      }}
                      title={c.nombre}
                    />
                  ))}
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
      </Link>
    </div>
  );

  return (
    <section id="catalogo" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--linea)', borderBottom: '1px solid var(--linea)', padding: '64px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
        
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
            {textilesProducts.map(renderProductCard)}
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
            {footwearProducts.map(renderProductCard)}
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

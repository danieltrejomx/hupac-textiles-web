'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import { 
  IconPlayeras, 
  IconCalzado, 
  IconCabeza, 
  IconVisual, 
  IconManos, 
  IconRopaTrabajo, 
  IconAlturas, 
  IconVial, 
  IconSearch,
  IconShield,
  IconCatalog
} from '@/components/Icons';

function CarouselScrollBar({ containerRef, stepAmount = 320 }: { containerRef: React.RefObject<HTMLDivElement>; stepAmount?: number }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(25);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll > 0) {
        const ratio = el.clientWidth / el.scrollWidth;
        setThumbWidth(Math.max(15, Math.min(60, ratio * 100)));
        setScrollProgress((el.scrollLeft / maxScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    el.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  const scrollStep = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === 'left' ? -stepAmount : stepAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({
      left: percentage * maxScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '12px',
      width: '100%',
      padding: '0 2px'
    }}>
      <button
        type="button"
        onClick={() => scrollStep('left')}
        style={{
          background: '#f1f5f9',
          border: '1px solid #cbd5e1',
          borderRadius: '6px',
          cursor: 'pointer',
          color: 'var(--marino)',
          fontSize: '0.7rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          padding: 0,
          fontWeight: 800,
          transition: 'all 0.15s ease',
          flexShrink: 0
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'var(--rey)';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = '#f1f5f9';
          e.currentTarget.style.color = 'var(--marino)';
        }}
        title="Deslizar producto anterior"
        aria-label="Deslizar producto anterior"
      >
        ◀
      </button>

      <div
        onClick={handleTrackClick}
        style={{
          flex: 1,
          height: '7px',
          backgroundColor: '#e2e8f0',
          borderRadius: '999px',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: `${thumbWidth}%`,
            left: `${scrollProgress * (100 - thumbWidth) / 100}%`,
            backgroundColor: 'var(--marino)',
            borderRadius: '999px',
            transition: 'left 0.1s ease-out'
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => scrollStep('right')}
        style={{
          background: '#f1f5f9',
          border: '1px solid #cbd5e1',
          borderRadius: '6px',
          cursor: 'pointer',
          color: 'var(--marino)',
          fontSize: '0.7rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          padding: 0,
          fontWeight: 800,
          transition: 'all 0.15s ease',
          flexShrink: 0
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'var(--rey)';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = '#f1f5f9';
          e.currentTarget.style.color = 'var(--marino)';
        }}
        title="Deslizar siguiente producto"
        aria-label="Deslizar siguiente producto"
      >
        ▶
      </button>
    </div>
  );
}

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
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'all 0.2s ease' }}
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
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const textilesScrollRef = useRef<HTMLDivElement>(null);
  const footwearScrollRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const textilesProducts = PRODUCTS.filter((p) => !p.categoria || p.categoria === 'textiles');
  const footwearProducts = PRODUCTS.filter((p) => p.categoria === 'calzado' || p.categoria === 'accesorios');

  const filteredCategoryProducts = selectedCategory !== 'todos'
    ? PRODUCTS.filter((p) => {
        if (selectedCategory === 'playeras') return !p.categoria || p.categoria === 'textiles';
        if (selectedCategory === 'calzado') return p.categoria === 'calzado' || p.categoria === 'accesorios';
        return p.categoria === selectedCategory;
      })
    : [];

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
        
        {/* ================= BOTONES RÁPIDOS DE CATEGORÍAS & LUPA ================= */}
        <div style={{ marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid var(--linea)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--marino)', textTransform: 'uppercase', letterSpacing: '0.5px', marginRight: '4px', fontFamily: 'var(--mono)', flexShrink: 0 }}>
              Categorías:
            </span>

            {/* Contenedor Deslizable de Botones de Categorías */}
            <div
              ref={categoriesScrollRef}
              className="custom-scroll-container"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '6px',
                flex: 1,
                scrollBehavior: 'smooth'
              }}
            >
              {[
                { slug: 'playeras', icon: IconPlayeras, label: 'Playeras y Polos', count: textilesProducts.length },
                { slug: 'calzado', icon: IconCalzado, label: 'Calzado Duty Gear', count: footwearProducts.length },
                { slug: 'cabeza', icon: IconCabeza, label: 'Protección Cabeza', count: PRODUCTS.filter(p => p.categoria === 'cabeza').length },
                { slug: 'visual', icon: IconVisual, label: 'Protección Visual', count: PRODUCTS.filter(p => p.categoria === 'visual').length },
                { slug: 'manos', icon: IconManos, label: 'Protección Manos', count: PRODUCTS.filter(p => p.categoria === 'manos').length },
                { slug: 'ropa-trabajo', icon: IconRopaTrabajo, label: 'Ropa de Trabajo', count: PRODUCTS.filter(p => p.categoria === 'ropa-trabajo').length },
                { slug: 'alturas', icon: IconAlturas, label: 'Protección Alturas', count: PRODUCTS.filter(p => p.categoria === 'alturas').length },
                { slug: 'vial', icon: IconVial, label: 'Limitación Vial', count: PRODUCTS.filter(p => p.categoria === 'vial').length },
              ].map(btn => {
                const IconComp = btn.icon;
                const isSelected = selectedCategory === btn.slug;
                return (
                  <button
                    key={btn.slug}
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(isSelected ? 'todos' : btn.slug);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      backgroundColor: isSelected ? 'var(--marino)' : '#ffffff',
                      border: isSelected ? '1.5px solid var(--rey)' : '1.5px solid #cbd5e1',
                      color: isSelected ? '#ffffff' : 'var(--marino)',
                      fontSize: '0.84rem',
                      fontWeight: isSelected ? 800 : 700,
                      padding: '7px 14px',
                      borderRadius: '999px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(19, 42, 82, 0.2)' : '0 1px 3px rgba(0,0,0,0.03)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    <IconComp size={16} color={isSelected ? '#ffffff' : 'var(--marino)'} />
                    <span>{btn.label}</span>
                    <span style={{
                      fontSize: '0.72rem',
                      backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : 'var(--marino)',
                      padding: '2px 7px',
                      borderRadius: '10px',
                      fontWeight: 800
                    }}>
                      {btn.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lupa de Búsqueda a lado de Limitación Vial */}
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar producto..."
                style={{
                  backgroundColor: searchQuery ? '#eff6ff' : '#ffffff',
                  border: searchQuery ? '2px solid var(--rey)' : '1.5px solid #cbd5e1',
                  color: 'var(--marino)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  padding: '7px 14px 7px 34px',
                  borderRadius: '999px',
                  outline: 'none',
                  width: searchQuery ? '230px' : '150px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
                onFocus={(e) => {
                  if (!searchQuery) e.target.style.width = '200px';
                }}
                onBlur={(e) => {
                  if (!searchQuery) e.target.style.width = '150px';
                }}
              />
              <span style={{
                position: 'absolute',
                left: '12px',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                color: '#64748b'
              }}>
                <IconSearch size={15} />
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: '#e2e8f0',
                    border: 'none',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                    color: '#475569',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Barrita Deslizable para Categorías */}
          <CarouselScrollBar containerRef={categoriesScrollRef} stepAmount={200} />
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

        {/* ================= VISTA FILTRADA POR CATEGORÍA EN TIEMPO REAL ================= */}
        {selectedCategory !== 'todos' && !searchQuery.trim() ? (
          <div style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="eyebrow" style={{ color: 'var(--rey)' }}>Catálogo en Vivo</span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--marino)', margin: '0 0 4px 0' }}>
                  {selectedCategory === 'playeras' ? 'Playeras y Polos de Línea' :
                   selectedCategory === 'calzado' ? 'Calzado Duty Gear y Accesorios' :
                   selectedCategory === 'cabeza' ? 'Protección para la Cabeza' :
                   selectedCategory === 'visual' ? 'Protección Visual' :
                   selectedCategory === 'manos' ? 'Protección para Manos' :
                   selectedCategory === 'ropa-trabajo' ? 'Ropa de Trabajo y Uniformes' :
                   selectedCategory === 'alturas' ? 'Protección a las Alturas' :
                   selectedCategory === 'vial' ? 'Limitación Vial' : selectedCategory} ({filteredCategoryProducts.length})
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748b' }}>
                  Desliza o navega producto por producto de esta categoría.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCategory('todos')}
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
                ✕ Ver Todas las Categorías
              </button>
            </div>

            <div
              ref={categoryScrollRef}
              className="custom-scroll-container"
              style={{
                display: 'flex',
                gap: '20px',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                paddingBottom: '16px',
                scrollBehavior: 'smooth'
              }}
            >
              {filteredCategoryProducts.map((p) => (
                <CarouselProductCard key={p.id} prod={p} />
              ))}
            </div>
            <CarouselScrollBar containerRef={categoryScrollRef} stepAmount={320} />
          </div>
        ) : null}

        {/* ================= CARRUSELES Estándar (Solo cuando no hay filtro o búsqueda activos) ================= */}
        {selectedCategory === 'todos' && !searchQuery.trim() ? (
          <>
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
            className="custom-scroll-container"
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '16px',
              scrollBehavior: 'smooth'
            }}
          >
            {textilesProducts.map((p) => (
              <CarouselProductCard key={p.id} prod={p} />
            ))}
          </div>
          <CarouselScrollBar containerRef={textilesScrollRef} stepAmount={320} />
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
                  Calzado de Seguridad y Accesorios
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
            className="custom-scroll-container"
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: '16px',
              scrollBehavior: 'smooth'
            }}
          >
            {footwearProducts.map((p) => (
              <CarouselProductCard key={p.id} prod={p} />
            ))}
          </div>
          <CarouselScrollBar containerRef={footwearScrollRef} stepAmount={320} />
        </div>

        {/* ================= SECCIÓN EPC: TARJETA INSTITUCIONAL (Estilo Refacciones/EPC) ================= */}
        <div style={{ marginTop: '64px' }}>
          <div style={{
            backgroundColor: 'var(--marino)',
            borderRadius: '24px',
            padding: '48px 36px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 50px rgba(19, 42, 82, 0.25)',
            textAlign: 'center',
            color: '#ffffff'
          }}>
            {/* Ícono Superior Centrado */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(36, 86, 196, 0.25)',
              border: '1.5px solid var(--rey)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              boxShadow: '0 0 20px rgba(36, 86, 196, 0.3)'
            }}>
              <IconShield size={30} color="#38bdf8" />
            </div>

            {/* Título y Descripción Centrados */}
            <h2 style={{
              color: '#ffffff',
              fontSize: '1.8rem',
              fontWeight: 850,
              letterSpacing: '0.5px',
              margin: '0 0 12px 0',
              textTransform: 'uppercase'
            }}>
              Catálogo EPC y Equipo de Protección
            </h2>
            <p style={{
              color: '#cbd5e1',
              fontSize: '0.96rem',
              maxWidth: '720px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6
            }}>
              Contamos con disponibilidad permanente y certificación en nuestro almacén de equipo de protección personal (EPP), cascos, lentes, guantes, uniformes industriales, arneses y señalización vial.
            </p>

            {/* Grid de 6 Categorías EPC en Pills Elegantes */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '14px',
              maxWidth: '960px',
              margin: '0 auto 36px auto'
            }}>
              {[
                { slug: 'cabeza', icon: IconCabeza, titulo: 'Protección para la Cabeza', count: PRODUCTS.filter(p => p.categoria === 'cabeza').length },
                { slug: 'visual', icon: IconVisual, titulo: 'Protección Visual', count: PRODUCTS.filter(p => p.categoria === 'visual').length },
                { slug: 'manos', icon: IconManos, titulo: 'Protección para Manos', count: PRODUCTS.filter(p => p.categoria === 'manos').length },
                { slug: 'ropa-trabajo', icon: IconRopaTrabajo, titulo: 'Ropa de Trabajo', count: PRODUCTS.filter(p => p.categoria === 'ropa-trabajo').length },
                { slug: 'alturas', icon: IconAlturas, titulo: 'Protección a las Alturas', count: PRODUCTS.filter(p => p.categoria === 'alturas').length },
                { slug: 'vial', icon: IconVial, titulo: 'Limitación Vial', count: PRODUCTS.filter(p => p.categoria === 'vial').length }
              ].map(cat => {
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                      color: '#ffffff'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.borderColor = '#38bdf8';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComp size={16} color="#38bdf8" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 750, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {cat.titulo}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                        {cat.count} productos disponibles
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Botón Principal Inferior estilo PDF/Catálogo */}
            <div>
              <a
                href="/catalogo-hupac.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Catalogo_HUPAC_Textiles.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#2456C4',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '16px 36px',
                  fontSize: '0.98rem',
                  fontWeight: 850,
                  letterSpacing: '0.5px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(36, 86, 196, 0.4)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#2456C4';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <IconCatalog size={20} color="#ffffff" />
                DESCARGAR CATÁLOGO EN PDF
              </a>
            </div>
          </div>
        </div>
        </>
        ) : null}

      </div>
    </section>
  );
}

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
        aria-label="Deslizar 1 producto a la izquierda"
        title="Deslizar a la izquierda"
      >
        ◀
      </button>

      <div
        onClick={handleTrackClick}
        style={{
          flex: 1,
          height: '6px',
          backgroundColor: '#e2e8f0',
          borderRadius: '999px',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden'
        }}
        title="Arrastra o haz clic para desplazar el catálogo"
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${scrollProgress * (1 - thumbWidth / 100)}%`,
            width: `${thumbWidth}%`,
            backgroundColor: 'var(--rey)',
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
        aria-label="Deslizar 1 producto a la derecha"
        title="Deslizar a la derecha"
      >
        ▶
      </button>
    </div>
  );
}

function CarouselProductCard({ prod }: { prod: Product }) {
  const [colorIndex, setColorIndex] = useState(0);
  const currentColor = prod.colores[colorIndex] || prod.colores[0];
  const displayImage = currentColor?.imagen || prod.imagenPrincipal;
  const rawPrice = prod.precioDirecto || (prod.precios && Object.values(prod.precios)[0] ? Object.values(prod.precios)[0] : undefined);
  const minPriceNum = typeof rawPrice === 'number' ? rawPrice : (typeof rawPrice === 'string' ? parseFloat(rawPrice) : undefined);

  return (
    <div style={{ flex: '0 0 auto', width: '280px', scrollSnapAlign: 'start' }}>
      <article
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--linea)',
          borderRadius: '18px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: '0 2px 10px rgba(19, 42, 82, 0.04)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(19, 42, 82, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 10px rgba(19, 42, 82, 0.04)';
        }}
      >
        <Link href={`/productos/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
            backgroundColor: '#ffffff',
            height: '240px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            borderBottom: '1px solid var(--linea)'
          }}>
            {prod.sku && (
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                fontFamily: 'var(--mono)',
                fontSize: '0.7rem',
                fontWeight: 700,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid var(--linea)',
                color: 'var(--marino)',
                borderRadius: '6px',
                padding: '3px 8px',
                zIndex: 2,
                textTransform: 'uppercase'
              }}>
                ESTILO {prod.sku}
              </span>
            )}

            <img
              src={displayImage}
              alt={prod.nombre}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                transition: 'opacity 0.25s ease'
              }}
            />
          </div>

          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--marino)', margin: '0 0 6px 0', lineHeight: 1.25 }}>
                {prod.nombre}
              </h3>

              <p style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--mono)',
                color: 'var(--texto-2)',
                margin: '0 0 10px 0',
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {prod.composicion || prod.gramaje || prod.descripcion}
              </p>
            </div>

            <div>
              {minPriceNum !== undefined && !isNaN(minPriceNum) && (
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--texto-2)', display: 'block', fontWeight: 600 }}>Desde (sin IVA):</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 850, color: 'var(--marino)' }}>
                    ${minPriceNum.toFixed(2)} <span style={{ fontSize: '0.72rem', color: 'var(--texto-2)', fontWeight: 600 }}>MXN</span>
                  </span>
                </div>
              )}

              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--rey)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                <span>Ver detalles</span>
                <span>—</span>
              </div>

              {prod.colores && prod.colores.length > 0 && (
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {prod.colores.slice(0, 7).map((c, idx) => {
                    const isSelected = idx === colorIndex;
                    return (
                      <button
                        key={c.nombre}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setColorIndex(idx);
                        }}
                        style={{
                          width: isSelected ? '14px' : '11px',
                          height: isSelected ? '14px' : '11px',
                          borderRadius: '50%',
                          backgroundColor: c.hex,
                          border: isSelected ? '2px solid var(--rey)' : (c.hex === '#FFFFFF' ? '1px solid #cbd5e1' : '1px solid rgba(0,0,0,0.12)'),
                          boxShadow: isSelected ? '0 0 0 2px rgba(36,86,196,0.2)' : 'none',
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
        </Link>
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

  const categories = [
    { slug: 'playeras', icon: IconPlayeras, label: 'Playeras y Polos', count: textilesProducts.length },
    { slug: 'calzado', icon: IconCalzado, label: 'Calzado Duty Gear', count: footwearProducts.length },
    { slug: 'cabeza', icon: IconCabeza, label: 'Protección Cabeza', count: PRODUCTS.filter(p => p.categoria === 'cabeza').length },
    { slug: 'visual', icon: IconVisual, label: 'Protección Visual', count: PRODUCTS.filter(p => p.categoria === 'visual').length },
    { slug: 'manos', icon: IconManos, label: 'Protección Manos', count: PRODUCTS.filter(p => p.categoria === 'manos').length },
    { slug: 'ropa-trabajo', icon: IconRopaTrabajo, label: 'Ropa de Trabajo', count: PRODUCTS.filter(p => p.categoria === 'ropa-trabajo').length },
    { slug: 'alturas', icon: IconAlturas, label: 'Alturas', count: PRODUCTS.filter(p => p.categoria === 'alturas').length },
    { slug: 'vial', icon: IconVial, label: 'Señalización Vial', count: PRODUCTS.filter(p => p.categoria === 'vial').length }
  ];

  return (
    <section id="catalogo" style={{ backgroundColor: 'transparent', padding: '56px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
        
        {/* ================= 1. BOTONES RÁPIDOS DE CATEGORÍAS & LUPA EN EL INICIO ================= */}
        <div style={{ marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid var(--linea)' }}>
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
                scrollSnapType: 'x mandatory',
                paddingBottom: '4px',
                flex: 1
              }}
            >
              {categories.map((c) => {
                const IconComp = c.icon;
                const isSelected = selectedCategory === c.slug;

                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCategory('todos');
                      } else {
                        setSelectedCategory(c.slug);
                      }
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '999px',
                      border: isSelected ? '1.5px solid var(--marino)' : '1.5px solid #cbd5e1',
                      backgroundColor: isSelected ? 'var(--marino)' : '#ffffff',
                      color: isSelected ? '#ffffff' : 'var(--marino)',
                      fontSize: '0.85rem',
                      fontWeight: isSelected ? 800 : 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      scrollSnapAlign: 'start',
                      boxShadow: isSelected ? '0 4px 14px rgba(19, 42, 82, 0.15)' : '0 1px 3px rgba(0,0,0,0.03)'
                    }}
                  >
                    <IconComp size={16} color={isSelected ? '#ffffff' : 'var(--marino)'} />
                    <span>{c.label}</span>
                    <span style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--mono)',
                      fontWeight: 800,
                      backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : 'var(--marino)',
                      padding: '2px 7px',
                      borderRadius: '999px'
                    }}>
                      {c.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lupa / Buscador Integrado en la Barra */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <IconSearch size={16} color="var(--texto-2)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar producto..."
                style={{
                  padding: '8px 14px 8px 34px',
                  borderRadius: '999px',
                  border: '1.5px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.82rem',
                  color: 'var(--marino)',
                  fontWeight: 600,
                  outline: 'none',
                  width: '180px',
                  transition: 'all 0.2s ease'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--texto-2)',
                    fontSize: '0.8rem',
                    fontWeight: 800
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <CarouselScrollBar containerRef={categoriesScrollRef} stepAmount={280} />
        </div>

        {/* ================= SI HAY BÚSQUEDA ACTIVA ================= */}
        {searchQuery.trim() !== '' ? (
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 850, color: 'var(--marino)', margin: '0 0 4px 0' }}>
                  Resultados de búsqueda ({searchResults.length})
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--texto-2)', margin: 0 }}>
                  Mostrando coincidencias para &quot;<strong>{searchQuery}</strong>&quot;
                </p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="btn sec"
                style={{ fontSize: '0.82rem', padding: '8px 16px' }}
              >
                Limpiar búsqueda
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div style={{ padding: '48px', backgroundColor: '#ffffff', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--linea)' }}>
                <p style={{ color: 'var(--texto-2)', fontSize: '1rem', margin: 0 }}>
                  No se encontraron productos que coincidan con tu búsqueda.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {searchResults.map((p) => (
                  <CarouselProductCard key={p.id} prod={p} />
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* ================= SI HAY CATEGORÍA SELECCIONADA EN EL INICIO ================= */}
        {selectedCategory !== 'todos' && searchQuery.trim() === '' ? (
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="eyebrow" style={{ color: 'var(--rey)', marginBottom: '4px', display: 'inline-block' }}>Categoría Filtrada</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 850, color: 'var(--marino)', margin: '0 0 4px 0', textTransform: 'capitalize' }}>
                  {categories.find(c => c.slug === selectedCategory)?.label || selectedCategory} ({filteredCategoryProducts.length})
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--texto-2)', margin: 0 }}>
                  Mostrando productos de la línea seleccionada en el inicio.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('todos')}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid var(--linea)',
                    color: 'var(--marino)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    padding: '8px 16px',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  ✕ Ver Todas las Categorías
                </button>
                <Link href={`/catalogo?categoria=${selectedCategory}`} className="btn sec" style={{ fontSize: '0.85rem', padding: '8px 18px' }}>
                  Ver en Catálogo Completo →
                </Link>
              </div>
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

        {/* ================= SI NO HAY FILTRO (VISTA DEFAULT DEL INICIO CON DOS SECCIONES) ================= */}
        {selectedCategory === 'todos' && searchQuery.trim() === '' ? (
          <>
            {/* 1. SECCIÓN: PLAYERAS Y POLOS DE LÍNEA */}
            <div style={{ marginBottom: '56px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <span className="eyebrow" style={{ color: 'var(--rey)', marginBottom: '4px', display: 'inline-block' }}>Catálogo Confección Textil</span>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 850, color: 'var(--marino)', margin: '0 0 4px 0', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                    Playeras y Polos de Línea
                    <Link href="/catalogo?categoria=textiles" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--rey)', textDecoration: 'none' }}>
                      Ver todo ({textilesProducts.length}) →
                    </Link>
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--texto-2)', margin: 0 }}>
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

            {/* 2. SECCIÓN: CALZADO DE SEGURIDAD Y ACCESORIOS */}
            <div style={{ marginBottom: '56px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <span className="eyebrow" style={{ color: 'var(--rey)', marginBottom: '4px', display: 'inline-block' }}>Línea de Protección Industrial · Duty Gear</span>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 850, color: 'var(--marino)', margin: '0 0 4px 0', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                    Calzado de Seguridad y Accesorios
                    <Link href="/catalogo?categoria=calzado" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--rey)', textDecoration: 'none' }}>
                      Ver todo ({footwearProducts.length}) →
                    </Link>
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--texto-2)', margin: 0 }}>
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

            {/* 3. SECCIÓN: TARJETA INSTITUCIONAL EPC Y EQUIPO DE PROTECCIÓN (DEBAJO DE LOS CARRUSELES) */}
            <div style={{ marginTop: '56px' }}>
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
                  CATÁLOGO EPC Y EQUIPO DE PROTECCIÓN
                </h2>
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '0.96rem',
                  maxWidth: '740px',
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

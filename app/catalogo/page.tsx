'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterTitle from '@/components/TypewriterTitle';
import { PRODUCTS, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import {
  IconTodos,
  IconPlayeras,
  IconCalzado,
  IconCabeza,
  IconVisual,
  IconManos,
  IconRopaTrabajo,
  IconAlturas,
  IconVial,
  IconSearch
} from '@/components/Icons';

const CATEGORIAS_FILTRO = [
  { id: 'todos', label: 'Todos los productos', icon: IconTodos },
  { id: 'textiles', label: 'Playeras y Polos', icon: IconPlayeras },
  { id: 'calzado', label: 'Calzado y Accesorios', icon: IconCalzado },
  { id: 'cabeza', label: 'Protección Cabeza', icon: IconCabeza },
  { id: 'visual', label: 'Protección Visual', icon: IconVisual },
  { id: 'manos', label: 'Protección Manos', icon: IconManos },
  { id: 'ropa-trabajo', label: 'Ropa de Trabajo', icon: IconRopaTrabajo },
  { id: 'alturas', label: 'Alturas', icon: IconAlturas },
  { id: 'vial', label: 'Limitación Vial', icon: IconVial },
];

function ProductCatalogCard({ prod, handleQuickAdd }: { prod: Product; handleQuickAdd: (e: React.MouseEvent, p: Product) => void }) {
  const [selectedColor, setSelectedColor] = useState(prod.colores?.[0]);
  const activeImg = selectedColor?.imagen || prod.imagenPrincipal;

  return (
    <article
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--linea)',
        borderRadius: '18px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
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
      <Link href={`/productos/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{
          backgroundColor: '#ffffff',
          height: '260px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          borderBottom: '1px solid var(--linea)'
        }}>
          <img
            src={activeImg}
            alt={`${prod.nombre} - ${selectedColor?.nombre || ''}`}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply', transition: 'all 0.2s ease' }}
          />
          <span style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(4px)',
            border: '1px solid var(--linea)',
            color: 'var(--marino)',
            borderRadius: '6px',
            padding: '4px 10px'
          }}>
            ESTILO {prod.sku}
          </span>
        </div>
      </Link>

      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <Link href={`/productos/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 750, color: 'var(--marino)', margin: '0 0 6px 0', lineHeight: 1.3 }}>
              {prod.nombre}
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--texto-2)', fontFamily: 'var(--mono)', display: 'block', marginBottom: '10px' }}>
              {prod.composicion} · {prod.gramaje}
            </span>
          </Link>

          {/* Color swatches */}
          {prod.colores && prod.colores.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
              {prod.colores.slice(0, 8).map((c, i) => {
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
                      width: isSelected ? '18px' : '14px',
                      height: isSelected ? '18px' : '14px',
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
              {prod.colores.length > 8 && (
                <span style={{ fontSize: '0.72rem', color: 'var(--texto-2)', fontWeight: 600 }}>
                  +{prod.colores.length - 8}
                </span>
              )}
            </div>
          )}
        </div>

        <div>
          {/* Precio */}
          {prod.precioDirecto ? (
            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--texto-2)', display: 'block', fontWeight: 600 }}>Precio unitario (sin IVA):</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 850, color: 'var(--marino)' }}>
                ${prod.precioDirecto.toFixed(2)} <span style={{ fontSize: '0.85rem', color: 'var(--texto-2)', fontWeight: 600 }}>MXN</span>
              </span>
            </div>
          ) : (
            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--texto-2)', display: 'block', fontWeight: 600 }}>Precios por volumen (sin IVA):</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--rey)' }}>
                Desde 1 pza · Mayoreo 72+ y 504+
              </span>
            </div>
          )}

          {/* Botones de acción */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
            <Link
              href={`/productos/${prod.id}`}
              style={{
                textDecoration: 'none',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid var(--linea)',
                backgroundColor: '#ffffff',
                color: 'var(--marino)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textAlign: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              Ver Ficha
            </Link>

            <button
              onClick={(e) => handleQuickAdd(e, prod)}
              style={{
                padding: '10px 12px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: 'var(--rey)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(36,86,196,0.2)',
                transition: 'all 0.15s ease'
              }}
            >
              + Carrito
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CatalogoPage() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent, prod: Product) => {
    e.preventDefault();
    e.stopPropagation();

    const color = prod.colores[0];
    const talla = prod.tallas[0] || 'UNICA';
    const unitPrice = prod.precioDirecto || (prod.precios && Object.values(prod.precios)[0] ? 50 : 100);

    addToCart({
      productId: prod.id,
      nombre: prod.nombre,
      estilo: prod.estilo || prod.sku || '',
      color: color ? color.nombre : 'Único',
      colorHex: color ? color.hex : '#17222B',
      talla,
      cantidad: 1,
      precioUnitario: unitPrice,
      imagen: color?.imagen || prod.imagenPrincipal
    });
  };

  const productosFiltrados = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Filtro por categoría
      if (categoriaActiva === 'textiles') {
        if (p.categoria && p.categoria !== 'textiles') return false;
      } else if (categoriaActiva === 'calzado') {
        if (p.categoria !== 'calzado' && p.categoria !== 'accesorios') return false;
      } else if (categoriaActiva !== 'todos') {
        if (p.categoria !== categoriaActiva) return false;
      }

      // Filtro por búsqueda
      if (busqueda.trim()) {
        const q = busqueda.toLowerCase().trim();
        const matchNombre = p.nombre.toLowerCase().includes(q);
        const matchSku = (p.sku || '').toLowerCase().includes(q);
        const matchEstilo = (p.estilo || '').toLowerCase().includes(q);
        const matchDesc = (p.descripcion || '').toLowerCase().includes(q);
        return matchNombre || matchSku || matchEstilo || matchDesc;
      }

      return true;
    });
  }, [categoriaActiva, busqueda]);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '80px' }}>
        {/* Hero */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: '52px 28px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '14px', fontSize: '0.88rem', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>Inicio</Link>
              <span>/</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Catálogo</span>
            </div>

            <span className="eyebrow" style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: '14px' }}>
              Catálogo General HUPAC
            </span>
            <TypewriterTitle
              text="Confección Textil, Calzado y Seguridad Industrial"
              as="h1"
              style={{ fontSize: '2.3rem', fontWeight: 850, margin: '0 0 14px 0', lineHeight: 1.2, color: '#ffffff' }}
            />
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '740px', margin: '0 auto', lineHeight: 1.55 }}>
              Explora nuestra línea completa de uniformes corporativos, playeras peso completo, polos piqué, botas dieléctricas Duty Gear y equipo de protección certificada (EPC).
            </p>
          </div>
        </section>

        <div style={{ maxWidth: '1280px', margin: '-32px auto 0 auto', padding: '0 24px' }}>
          
          {/* Barra de Filtros y Búsqueda */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(19, 42, 82, 0.05)',
            border: '1px solid var(--linea)',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Input de Búsqueda */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="🔍 Buscar por nombre de modelo, estilo (ej. 1427, 8606, polo, bota)..."
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--linea)',
                    fontSize: '0.98rem',
                    outline: 'none'
                  }}
                />
                {busqueda && (
                  <button
                    onClick={() => setBusqueda('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      color: 'var(--texto-2)'
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div style={{
                backgroundColor: 'var(--cielo)',
                color: 'var(--marino)',
                fontWeight: 700,
                fontSize: '0.9rem',
                padding: '10px 18px',
                borderRadius: '12px',
                border: '1px solid var(--cielo-2)',
                whiteSpace: 'nowrap'
              }}>
                {productosFiltrados.length} modelo{productosFiltrados.length !== 1 ? 's' : ''} disponible{productosFiltrados.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Categorías Tabs */}
            <div style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '6px',
              scrollbarWidth: 'thin'
            }}>
              {CATEGORIAS_FILTRO.map((cat) => {
                const isActive = categoriaActiva === cat.id;
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoriaActiva(cat.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      border: isActive ? '1.5px solid var(--rey)' : '1px solid var(--linea)',
                      backgroundColor: isActive ? 'var(--marino)' : '#ffffff',
                      color: isActive ? '#ffffff' : 'var(--marino)',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 750 : 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}>
                      <IconComp size={16} color={isActive ? '#ffffff' : 'var(--rey)'} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
          </div>

          {/* Grid de Productos */}
          {productosFiltrados.length === 0 ? (
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '64px 24px',
              textAlign: 'center',
              border: '1px solid var(--linea)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔎</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--marino)', margin: '0 0 8px 0' }}>
                No encontramos productos que coincidan con tu búsqueda
              </h3>
              <p style={{ color: 'var(--texto-2)', margin: '0 0 20px 0' }}>
                Intenta con otro término o limpia los filtros para ver todo el catálogo.
              </p>
              <button
                onClick={() => { setCategoriaActiva('todos'); setBusqueda(''); }}
                className="btn"
                style={{ backgroundColor: 'var(--rey)', color: '#ffffff' }}
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '24px'
            }}>
              {productosFiltrados.map((prod) => (
                <ProductCatalogCard key={prod.id} prod={prod} handleQuickAdd={handleQuickAdd} />
              ))}
            </div>
          )}

          {/* Categorías EPC Destacadas */}
          <div style={{ marginTop: '72px' }}>
            <div style={{ marginBottom: '28px' }}>
              <span className="eyebrow" style={{ color: '#b45309' }}>Equipo de Protección y Trabajo</span>
              <h2 style={{ marginBottom: '6px', fontSize: '1.8rem' }}>🛡️ Catálogo Especializado por Categoría</h2>
              <p style={{ color: 'var(--texto-2)', margin: 0, fontSize: '0.95rem' }}>
                Explora cada división técnica de protección individual y colectiva:
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px'
            }}>
              {[
                { slug: 'playeras', emoji: '👕', titulo: 'Playeras y Polos', desc: 'Peso completo, cuello redondo, cuello V y polos piqué.', color: '#eff6ff', accent: '#2563eb' },
                { slug: 'calzado', emoji: '🥾', titulo: 'Calzado Duty Gear', desc: 'Botas industriales waterproof, dieléctricas y antiderrapantes.', color: '#f0f9ff', accent: '#0284c7' },
                { slug: 'cabeza', emoji: '⛑️', titulo: 'Protección Craneal', desc: 'Cascos dieléctricos, protectores faciales y orejeras.', color: '#fef3c7', accent: '#d97706' },
                { slug: 'visual', emoji: '🥽', titulo: 'Protección Visual', desc: 'Lentes de seguridad, monogoggles y sobrelentes.', color: '#e0f2fe', accent: '#0284c7' },
                { slug: 'manos', emoji: '🧤', titulo: 'Protección de Manos', desc: 'Guantes de nitrilo, carnaza, anticorte y electricistas.', color: '#fce7f3', accent: '#db2777' },
                { slug: 'ropa-trabajo', emoji: '🦺', titulo: 'Ropa de Trabajo', desc: 'Chalecos, overoles de mezclilla y mandiles.', color: '#dcfce7', accent: '#16a34a' },
                { slug: 'alturas', emoji: '🔗', titulo: 'Trabajo en Alturas', desc: 'Arneses de cuerpo completo y líneas de vida.', color: '#ede9fe', accent: '#7c3aed' },
                { slug: 'vial', emoji: '🚧', titulo: 'Limitación Vial', desc: 'Conos, trafitambos, mallas y postes limitadores.', color: '#fee2e2', accent: '#dc2626' }
              ].map((cat) => (
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
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 20px ${cat.accent}22`;
                    }}
                    onMouseLeave={(e) => {
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
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: cat.accent }}>Ver categoría completa &rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

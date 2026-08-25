'use client';
import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterTitle from '@/components/TypewriterTitle';
import { PRODUCTS, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

const CATEGORIES_META: Record<string, { titulo: string; descripcion: string; emoji: string; filtro: (p: Product) => boolean }> = {
  'playeras': {
    titulo: 'Playeras y Polos de Línea',
    emoji: '👕',
    descripcion: 'Catálogo completo de confección textil: playeras de peso completo 100% algodón, manga corta, manga larga, cuello V y polos piqué.',
    filtro: (p) => !p.categoria || p.categoria === 'textiles'
  },
  'calzado': {
    titulo: 'Calzado de Seguridad e Industrial',
    emoji: '🥾',
    descripcion: 'Línea Duty Gear de botas industriales waterproof, dieléctricas, tenis deportivos de seguridad con casquillo y suelas antiderrapantes.',
    filtro: (p) => p.categoria === 'calzado' || p.categoria === 'accesorios'
  },
  'cabeza': {
    titulo: 'Protección para la Cabeza',
    emoji: '⛑️',
    descripcion: 'Cascos dieléctricos, protectores faciales, orejeras, tapones auditivos, cofias y capuchas antiflama para protección craneal y auditiva.',
    filtro: (p) => p.categoria === 'cabeza'
  },
  'visual': {
    titulo: 'Protección Visual',
    emoji: '🥽',
    descripcion: 'Lentes de seguridad, goggles, sobre lentes y monogoggles para protección ocular en ambientes industriales.',
    filtro: (p) => p.categoria === 'visual'
  },
  'manos': {
    titulo: 'Protección para Manos y Brazos',
    emoji: '🧤',
    descripcion: 'Guantes de nylon, nitrilo, carnaza, anticorte, electricistas, soldadores y desechables para todo tipo de trabajo.',
    filtro: (p) => p.categoria === 'manos'
  },
  'ropa-trabajo': {
    titulo: 'Ropa de Trabajo y Uniformes',
    emoji: '🦺',
    descripcion: 'Chalecos de alta visibilidad, overoles, fajas lumbares, ropa de mezclilla, mandiles, mangas de carnaza e impermeables industriales.',
    filtro: (p) => p.categoria === 'ropa-trabajo'
  },
  'alturas': {
    titulo: 'Protección a las Alturas',
    emoji: '🔗',
    descripcion: 'Arneses de cuerpo completo, líneas de vida y puntos fijos de anclaje para trabajo seguro en altura.',
    filtro: (p) => p.categoria === 'alturas'
  },
  'vial': {
    titulo: 'Limitación Vial',
    emoji: '🚧',
    descripcion: 'Trafitambos, postes limitadores, mallas delimitadoras, conos viales y cintas de precaución para señalización de zonas de obra.',
    filtro: (p) => p.categoria === 'vial'
  }
};

function CategoryProductCard({ prod, handleQuickAdd }: { prod: Product; handleQuickAdd: (e: React.MouseEvent, p: Product) => void }) {
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
          {/* Precio si es directo */}
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

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const meta = CATEGORIES_META[slug];

  if (!meta) {
    notFound();
  }

  const products = PRODUCTS.filter(meta.filtro);
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

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '32px', paddingBottom: '70px', backgroundColor: '#f8fafc', minHeight: '85vh' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
          
          {/* Breadcrumbs */}
          <div style={{ marginBottom: '20px', fontSize: '0.88rem', color: 'var(--texto-2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/" style={{ color: 'var(--rey)', textDecoration: 'none', fontWeight: 600 }}>Inicio</Link>
            <span>/</span>
            <span style={{ color: 'var(--marino)', fontWeight: 700 }}>{meta.titulo}</span>
          </div>

          {/* Banner de Categoría */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '36px',
            marginBottom: '40px',
            border: '1px solid var(--linea)',
            boxShadow: '0 4px 16px rgba(19, 42, 82, 0.04)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ maxWidth: '720px' }}>
              <span className="eyebrow" style={{ marginBottom: '8px' }}>Catálogo Especializado · EPC & Uniformes</span>
              <TypewriterTitle
                text={`${meta.emoji} ${meta.titulo}`}
                as="h1"
                speed={32}
                delay={100}
                cursorColor="var(--rey)"
                style={{ fontSize: '2.2rem', color: 'var(--marino)', margin: '0 0 10px 0', fontWeight: 800 }}
              />
              <p style={{ color: 'var(--texto-2)', fontSize: '1.05rem', margin: 0, lineHeight: 1.5 }}>
                {meta.descripcion}
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--cielo)',
              border: '1px solid var(--cielo-2)',
              padding: '12px 20px',
              borderRadius: '14px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 850, color: 'var(--rey)', display: 'block' }}>{products.length}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--marino)', fontWeight: 700 }}>Modelos Disponibles</span>
            </div>
          </div>

          {/* Grid de Todos los Productos de la Categoría */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '24px'
          }}>
            {products.map((prod) => (
              <CategoryProductCard key={prod.id} prod={prod} handleQuickAdd={handleQuickAdd} />
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

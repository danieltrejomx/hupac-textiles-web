'use client';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { 
  IconPlayeras, 
  IconCalzado, 
  IconCabeza, 
  IconVisual, 
  IconManos, 
  IconRopaTrabajo, 
  IconAlturas, 
  IconVial, 
  IconShield,
  IconCatalog
} from '@/components/Icons';

export default function CatalogCarousel() {
  return (
    <section id="catalogo" style={{ backgroundColor: 'transparent', padding: '48px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* ================= TARJETA 1: CONFECCIÓN TEXTIL Y CALZADO ================= */}
        <div style={{
          backgroundColor: 'var(--marino)',
          borderRadius: '24px',
          padding: '48px 36px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 50px rgba(19, 42, 82, 0.25)',
          textAlign: 'center',
          color: '#ffffff',
          marginBottom: '40px'
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
            <IconPlayeras size={30} color="#38bdf8" />
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
            CATÁLOGO DE CONFECCIÓN TEXTIL Y CALZADO
          </h2>
          <p style={{
            color: '#cbd5e1',
            fontSize: '0.96rem',
            maxWidth: '740px',
            margin: '0 auto 36px auto',
            lineHeight: 1.6
          }}>
            Fabricación 100% nacional en prendas empresariales, polos piqué, camisas de vestir y calzado de seguridad industrial dieléctrico de alta gama.
          </p>

          {/* Grid de Categorías de Prendas y Calzado */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
            maxWidth: '960px',
            margin: '0 auto 36px auto'
          }}>
            {[
              { slug: 'textiles', icon: IconPlayeras, titulo: 'Playeras y Polos de Línea', count: PRODUCTS.filter(p => !p.categoria || p.categoria === 'textiles').length },
              { slug: 'calzado', icon: IconCalzado, titulo: 'Calzado Duty Gear y Botas', count: PRODUCTS.filter(p => p.categoria === 'calzado' || p.categoria === 'accesorios').length },
              { slug: 'ropa-trabajo', icon: IconRopaTrabajo, titulo: 'Ropa de Trabajo e Industrial', count: PRODUCTS.filter(p => p.categoria === 'ropa-trabajo').length }
            ].map(cat => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/catalogo?categoria=${cat.slug}`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    textDecoration: 'none',
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
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComp size={18} color="#38bdf8" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 750, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cat.titulo}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600 }}>
                      {cat.count} productos disponibles
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Botón CTA Tarjeta 1 */}
          <div>
            <Link
              href="/catalogo"
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
              VER PRENDAS Y CALZADO EN LÍNEA
            </Link>
          </div>
        </div>


        {/* ================= TARJETA 2: CATÁLOGO EPC Y EQUIPO DE PROTECCIÓN (EXACTA DE LA CAPTURA) ================= */}
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

          {/* Grid de 6 Categorías EPC exacto de la captura */}
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
                <Link
                  key={cat.slug}
                  href={`/catalogo?categoria=${cat.slug}`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textDecoration: 'none',
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
                </Link>
              );
            })}
          </div>

          {/* Botón CTA Tarjeta 2 */}
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
    </section>
  );
}

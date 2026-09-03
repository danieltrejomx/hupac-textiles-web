'use client';
import Link from 'next/link';
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
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* ================= CONTENEDOR EN 1 LÍNEA (2 COLUMNAS SIDE-BY-SIDE) ================= */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}>

          {/* ================= TARJETA 1: CONFECCIÓN TEXTIL Y CALZADO ================= */}
          <div style={{
            backgroundColor: 'var(--marino)',
            borderRadius: '24px',
            padding: '40px 24px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 50px rgba(19, 42, 82, 0.25)',
            textAlign: 'center',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              {/* Ícono Superior Centrado */}
              <div style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                backgroundColor: 'rgba(36, 86, 196, 0.25)',
                border: '1.5px solid var(--rey)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 0 20px rgba(36, 86, 196, 0.3)'
              }}>
                <IconPlayeras size={28} color="#38bdf8" />
              </div>

              {/* Título y Descripción Centrados */}
              <h2 style={{
                color: '#ffffff',
                fontSize: '1.45rem',
                fontWeight: 850,
                letterSpacing: '0.5px',
                margin: '0 0 10px 0',
                textTransform: 'uppercase',
                lineHeight: 1.2
              }}>
                CATÁLOGO DE CONFECCIÓN TEXTIL Y CALZADO
              </h2>
              <p style={{
                color: '#cbd5e1',
                fontSize: '0.9rem',
                margin: '0 auto 28px auto',
                lineHeight: 1.55
              }}>
                Fabricación 100% nacional en prendas empresariales, polos piqué, camisas de vestir, ropa de trabajo y calzado dieléctrico.
              </p>

              {/* Grid Estético de Categorías (Sin enlaces ni cantidades) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                margin: '0 auto 28px auto'
              }}>
                {[
                  { slug: 'textiles', icon: IconPlayeras, titulo: 'Playeras y Polos de Línea' },
                  { slug: 'calzado', icon: IconCalzado, titulo: 'Calzado Duty Gear y Botas' },
                  { slug: 'ropa-trabajo', icon: IconRopaTrabajo, titulo: 'Ropa de Trabajo e Industrial' }
                ].map(cat => {
                  const IconComp = cat.icon;
                  return (
                    <div
                      key={cat.slug}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left',
                        color: '#ffffff',
                        cursor: 'default'
                      }}
                    >
                      <div style={{
                        width: '34px',
                        height: '34px',
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
                        <div style={{ fontSize: '0.86rem', fontWeight: 750, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {cat.titulo}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Par de Botones CTA en 1 Sola Línea Exacta */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <Link
                href="/catalogo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--rey)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '11px 12px',
                  fontSize: '0.76rem',
                  fontWeight: 850,
                  letterSpacing: '0.3px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(36, 86, 196, 0.35)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'var(--rey)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                title="Explorar Catálogo Completo en Línea"
              >
                <IconCatalog size={15} color="#ffffff" />
                <span>CATÁLOGO EN LÍNEA</span>
              </Link>

              <a
                href="/catalogo-hupac.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Catalogo_HUPAC_Textiles.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: '999px',
                  padding: '11px 12px',
                  fontSize: '0.76rem',
                  fontWeight: 850,
                  letterSpacing: '0.3px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                title="Descargar Catálogo en PDF"
              >
                <span>📄 DESCARGAR PDF</span>
              </a>
            </div>
          </div>


          {/* ================= TARJETA 2: CATÁLOGO EPC Y EQUIPO DE PROTECCIÓN ================= */}
          <div style={{
            backgroundColor: 'var(--marino)',
            borderRadius: '24px',
            padding: '40px 24px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 20px 50px rgba(19, 42, 82, 0.25)',
            textAlign: 'center',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              {/* Ícono Superior Centrado */}
              <div style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                backgroundColor: 'rgba(36, 86, 196, 0.25)',
                border: '1.5px solid var(--rey)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 0 20px rgba(36, 86, 196, 0.3)'
              }}>
                <IconShield size={28} color="#38bdf8" />
              </div>

              {/* Título y Descripción Centrados */}
              <h2 style={{
                color: '#ffffff',
                fontSize: '1.45rem',
                fontWeight: 850,
                letterSpacing: '0.5px',
                margin: '0 0 10px 0',
                textTransform: 'uppercase',
                lineHeight: 1.2
              }}>
                CATÁLOGO EPC Y EQUIPO DE PROTECCIÓN
              </h2>
              <p style={{
                color: '#cbd5e1',
                fontSize: '0.9rem',
                margin: '0 auto 28px auto',
                lineHeight: 1.55
              }}>
                Disponibilidad permanente y certificación en equipo de protección personal (EPP), cascos, lentes, guantes, arneses y señalización.
              </p>

              {/* Grid Estético de Categorías EPP (Sin enlaces ni cantidades) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                margin: '0 auto 28px auto'
              }}>
                {[
                  { slug: 'cabeza', icon: IconCabeza, titulo: 'Protección para la Cabeza' },
                  { slug: 'visual', icon: IconVisual, titulo: 'Protección Visual y Faciales' },
                  { slug: 'manos', icon: IconManos, titulo: 'Protección para Manos' },
                  { slug: 'alturas', icon: IconAlturas, titulo: 'Protección a las Alturas' },
                  { slug: 'vial', icon: IconVial, titulo: 'Limitación y Señalización' },
                  { slug: 'equipamiento', icon: IconShield, titulo: 'Protección Respiratoria y EPP' }
                ].map(cat => {
                  const IconComp = cat.icon;
                  return (
                    <div
                      key={cat.slug}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left',
                        color: '#ffffff',
                        cursor: 'default'
                      }}
                    >
                      <div style={{
                        width: '34px',
                        height: '34px',
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
                        <div style={{ fontSize: '0.86rem', fontWeight: 750, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {cat.titulo}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Par de Botones CTA en 1 Sola Línea Exacta */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <Link
                href="/catalogo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--rey)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '11px 12px',
                  fontSize: '0.76rem',
                  fontWeight: 850,
                  letterSpacing: '0.3px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(36, 86, 196, 0.35)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'var(--rey)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                title="Explorar Catálogo Completo en Línea"
              >
                <IconCatalog size={15} color="#ffffff" />
                <span>CATÁLOGO EN LÍNEA</span>
              </Link>

              <a
                href="/catalogo-hupac.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Catalogo_HUPAC_Textiles.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: '999px',
                  padding: '11px 12px',
                  fontSize: '0.76rem',
                  fontWeight: 850,
                  letterSpacing: '0.3px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                title="Descargar Catálogo en PDF"
              >
                <span>📄 DESCARGAR PDF</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterTitle from '@/components/TypewriterTitle';
import { IconAward, IconTrending, IconShield, IconTag } from '@/components/Icons';

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '80px' }}>
        {/* Hero Header */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: '52px 28px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '14px', fontSize: '0.88rem', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>Inicio</Link>
              <span>/</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Nosotros</span>
            </div>

            <span className="eyebrow" style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: '14px' }}>
              Nuestra Historia & Compromiso
            </span>
            <TypewriterTitle
              text="Más de 21 años transformando fibras en identidad"
              as="h1"
              style={{ fontSize: '2.3rem', fontWeight: 850, margin: '0 0 14px 0', lineHeight: 1.2, color: '#ffffff' }}
            />
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '740px', margin: '0 auto', lineHeight: 1.55 }}>
              Somos <strong>HUPAC TEXTILES</strong>, empresa 100% mexicana con inicio de operaciones en 2005. Confeccionamos uniformes empresariales e industriales de alto rendimiento.
            </p>
          </div>
        </section>

        <div style={{ maxWidth: '1200px', margin: '-36px auto 0 auto', padding: '0 24px' }}>
          {/* Tarjetas Principales: Misión, Visión, Valores */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {[
              { 
                tag: 'MISIÓN', 
                titulo: 'Misión', 
                desc: 'Confeccionar e innovar en uniformes empresariales e industriales de alto rendimiento, brindando a nuestros clientes prendas funcionales, duraderas y de máxima calidad textil que reflejen la identidad y solidez de su empresa.', 
                icon: IconAward,
                color: 'var(--rey)'
              },
              { 
                tag: 'VISIÓN', 
                titulo: 'Visión', 
                desc: 'Consolidarnos como el fabricante y proveedor textil líder en México y América Latina, destacando por nuestra integración vertical, innovación tecnológica constante, sustentabilidad y excelencia en el servicio.', 
                icon: IconTrending,
                color: '#0284c7'
              },
              { 
                tag: 'VALORES', 
                titulo: 'Valores', 
                desc: 'Calidad sin compromiso, integridad, innovación constante, puntualidad en entregas y trabajo en equipo para construir alianzas sólidas y duraderas con nuestros clientes y distribuidores.', 
                icon: IconShield,
                color: '#059669'
              }
            ].map((pillar, i) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={i}
                  className={`textile-tag-card tag-delay-${i + 1}`}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--linea)',
                    borderRadius: '20px',
                    padding: '32px',
                    boxShadow: '0 10px 30px rgba(19, 42, 82, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      fontWeight: 750,
                      letterSpacing: '1.2px',
                      color: pillar.color,
                      backgroundColor: 'rgba(36,86,196,0.06)',
                      border: `1px solid ${pillar.color}33`,
                      padding: '4px 12px',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      textTransform: 'uppercase'
                    }}>
                      <IconComp size={13} color={pillar.color} /> {pillar.tag}
                    </span>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 850, color: 'var(--marino)', marginBottom: '12px' }}>
                      {pillar.titulo}
                    </h2>
                    <p style={{ fontSize: '0.96rem', color: 'var(--texto-2)', lineHeight: 1.6, margin: 0 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sección Destacada: Política de Calidad */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--linea)',
            borderRadius: '24px',
            padding: '48px',
            boxShadow: '0 4px 20px rgba(19, 42, 82, 0.04)',
            marginBottom: '48px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
              <div>
                <span className="eyebrow" style={{ color: 'var(--rey)', marginBottom: '10px' }}>Compromiso Institucional</span>
                <h2 style={{ fontSize: '2.1rem', color: 'var(--marino)', margin: '0 0 16px 0', lineHeight: 1.25, fontWeight: 850 }}>
                  Política de Calidad
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--texto-2)', lineHeight: 1.7, marginBottom: '20px' }}>
                  En <strong>HUPAC TEXTILES</strong> estamos comprometidos a satisfacer y superar los requerimientos de nuestros clientes mediante la fabricación de uniformes y equipo de protección con los más altos estándares de calidad textil y normativas oficiales.
                </p>
                <p style={{ fontSize: '1.02rem', color: 'var(--texto-2)', lineHeight: 1.7, marginBottom: '24px' }}>
                  Impulsamos la <strong>mejora continua</strong> en cada etapa productiva: desde el diseño, selección del hilo, tejido, confección, bordado y estampado, hasta la entrega puntual sin intermediarios.
                </p>
                <div style={{
                  padding: '20px 24px',
                  backgroundColor: 'var(--cielo)',
                  borderLeft: '4px solid var(--rey)',
                  borderRadius: '0 12px 12px 0',
                  fontStyle: 'italic',
                  color: 'var(--marino)',
                  fontWeight: 600,
                  fontSize: '1.05rem'
                }}>
                  &ldquo;La excelencia textil no es una coincidencia, es nuestro estándar diario en cada puntada e hilo.&rdquo;
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--linea)',
                  borderRadius: '16px',
                  padding: '24px'
                }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--marino)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    🏭 Integración Vertical de Fábrica
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--texto-2)', margin: 0, lineHeight: 1.5 }}>
                    Controlamos el ciclo completo desde la selección del hilo hasta el empaque individual, garantizando precios directos y abastecimiento continuo.
                  </p>
                </div>

                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--linea)',
                  borderRadius: '16px',
                  padding: '24px'
                }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--marino)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    🛡️ Línea EPC y Calzado Industrial
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--texto-2)', margin: 0, lineHeight: 1.5 }}>
                    Complementamos la vestimenta corporativa con Equipo de Protección Colectiva y Personal certificado: botas de seguridad Duty Gear, cascos, lentes, guantes y señalización.
                  </p>
                </div>

                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--linea)',
                  borderRadius: '16px',
                  padding: '24px'
                }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--marino)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    🎨 Taller de Personalización Interno
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--texto-2)', margin: 0, lineHeight: 1.5 }}>
                    Más de 2 millones de bordados computarizados, serigrafía industrial, DTG y sublimación realizados en planta con tecnología japonesa y alemana.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Valores Corporativos */}
          <div style={{ marginBottom: '56px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span className="eyebrow">Nuestros Pilares</span>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--marino)', margin: '0 0 10px 0' }}>Valores que nos definen</h2>
              <p style={{ color: 'var(--texto-2)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                Principios rectores que guían nuestra producción diaria y la relación con cada uno de nuestros aliados comerciales.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {[
                { titulo: 'Calidad sin compromiso', desc: 'La excelencia es nuestra base fundamental, desde la fibra textil hasta el trato con el cliente.', icono: '⭐' },
                { titulo: 'Compromiso total', desc: 'Damos lo mejor en cada proyecto, cumpliendo puntualmente en tiempos y especificaciones de entrega.', icono: '🤝' },
                { titulo: 'Innovación continua', desc: 'Evolucionamos nuestros procesos textiles, patrones ergonómicos y maquinaria constantemente.', icono: '💡' },
                { titulo: 'Integridad y transparencia', desc: 'Actuamos con ética y rectitud en cada cotización, contrato y acuerdo comercial.', icono: '🛡️' },
                { titulo: 'Sinergia de equipo', desc: 'Construimos alianzas sólidas con nuestros distribuidores para crecer de forma conjunta.', icono: '🚀' },
                { titulo: 'Cumplimiento legal y ambiental', desc: 'Operamos bajo normativas oficiales mexicanas, cuidando nuestro entorno y capital humano.', icono: '🌱' }
              ].map((val, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--linea)',
                  borderRadius: '18px',
                  padding: '28px',
                  boxShadow: '0 4px 12px rgba(19, 42, 82, 0.03)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{val.icono}</div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--marino)', margin: '0 0 8px 0' }}>
                    {val.titulo}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--texto-2)', margin: 0, lineHeight: 1.5 }}>
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div style={{
            backgroundColor: 'var(--marino)',
            borderRadius: '24px',
            padding: '48px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{ maxWidth: '640px' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 8px 0', color: '#ffffff' }}>
                ¿Listo para equipar a tu empresa con la mejor calidad?
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', margin: 0, lineHeight: 1.5 }}>
                Conoce nuestro catálogo completo de productos textiles y calzado o solicita una cotización con atención directa de fábrica.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/catalogo" className="btn" style={{ backgroundColor: '#ffffff', color: 'var(--marino)', fontWeight: 800 }}>
                Ver Catálogo
              </Link>
              <Link href="/#cotizador" className="btn" style={{ backgroundColor: 'var(--rey)', color: '#ffffff', fontWeight: 800 }}>
                Cotizar Pedido
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

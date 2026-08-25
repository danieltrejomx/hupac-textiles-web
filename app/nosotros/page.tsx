'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '80px' }}>
        {/* Hero Header */}
        <section style={{
          background: 'linear-gradient(135deg, var(--marino) 0%, #1a365d 100%)',
          color: '#ffffff',
          padding: '64px 28px 72px 28px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>Inicio</Link>
              <span>/</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Nosotros</span>
            </div>

            <span className="eyebrow" style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: '16px' }}>
              Nuestra Historia & Compromiso
            </span>
            <h1 style={{ fontSize: '2.6rem', fontWeight: 850, margin: '0 0 16px 0', lineHeight: 1.2, color: '#ffffff' }}>
              Más de 21 años transformando fibras en identidad
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', maxWidth: '760px', margin: '0 auto', lineHeight: 1.6 }}>
              Somos <strong>HUPAC TEXTILES</strong>, empresa 100% mexicana con inicio de operaciones en 2005. Confeccionamos uniformes empresariales e industriales de alto rendimiento.
            </p>
          </div>
        </section>

        <div style={{ maxWidth: '1200px', margin: '-36px auto 0 auto', padding: '0 24px' }}>
          {/* Tarjetas de Estadísticas Clave Animadas como Etiquetas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {[
              { num: '2005', label: 'Año de fundación', desc: 'Más de dos décadas de experiencia textil', tag: 'TRAYECTORIA' },
              { num: '+7M', label: 'Prendas confeccionadas', desc: 'Calidad probada en millones de usuarios', tag: 'PRODUCCIÓN' },
              { num: '+43K', label: 'Clientes atendidos', desc: 'Empresas, distribuidores y gobierno', tag: 'CONFIANZA' },
              { num: '100%', label: 'Hecho en México', desc: 'Planta matriz en Cuautitlán Izcalli, Edo. Méx.', tag: 'CALIDAD' }
            ].map((stat, i) => (
              <div
                key={i}
                className={`textile-tag-card tag-delay-${i + 1}`}
              >
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'var(--mono)',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: 'var(--rey)',
                  backgroundColor: 'var(--cielo)',
                  border: '1px solid var(--cielo-2)',
                  padding: '3px 9px',
                  borderRadius: '6px',
                  marginBottom: '10px',
                  textTransform: 'uppercase'
                }}>
                  🏷️ {stat.tag}
                </span>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--rey)', marginBottom: '4px', fontFamily: 'var(--mono)' }}>
                  {stat.num}
                </div>
                <div style={{ fontWeight: 750, color: 'var(--marino)', fontSize: '1.05rem', marginBottom: '6px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--texto-2)', lineHeight: 1.4 }}>
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Grid Principal de Historia y Capacidades */}
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
                <span className="eyebrow" style={{ color: 'var(--rey)', marginBottom: '10px' }}>¿Quiénes somos?</span>
                <h2 style={{ fontSize: '2rem', color: 'var(--marino)', margin: '0 0 20px 0', lineHeight: 1.3 }}>
                  Diseñamos identidad, confeccionamos confianza
                </h2>
                <p style={{ fontSize: '1.02rem', color: 'var(--texto-2)', lineHeight: 1.7, marginBottom: '16px' }}>
                  En <strong>HUPAC TEXTILES</strong> transformamos fibras de algodón y mezclas sintéticas de alta resistencia para brindar a nuestros distribuidores y sus clientes prendas funcionales, cómodas y de máxima durabilidad.
                </p>
                <p style={{ fontSize: '1.02rem', color: 'var(--texto-2)', lineHeight: 1.7, marginBottom: '24px' }}>
                  Fabricamos hilados, tejidos, acabados y prendas completas. Nuestra mayor fortaleza es el <strong>tejido de punto</strong>, satisfaciendo la demanda de cadenas comerciales nacionales y proyectos de exportación.
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
                  &ldquo;Nuestro negocio es tu imagen corporativa: cada puntada refleja la solidez y profesionalismo de tu equipo.&rdquo;
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
                    Controlamos el ciclo completo desde la selección del hilo hasta el empaque individual, garantizando precios directos y abastecimiento continuo sin intermediarios.
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

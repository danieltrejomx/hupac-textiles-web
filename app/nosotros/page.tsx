'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  IconAward, 
  IconTarget,
  IconEye,
  IconConfigurator
} from '@/components/Icons';

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'transparent', minHeight: '85vh', position: 'relative' }}>
        {/* Header Compacto Centrado */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: '14px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          boxShadow: '0 4px 18px rgba(19, 42, 82, 0.14)'
        }}>
          <div style={{ 
            maxWidth: '1320px', 
            margin: '0 auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center'
          }}>
            <h1 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 850, 
              margin: 0, 
              color: '#ffffff',
              textAlign: 'center'
            }}>
              Política de Calidad · HUPAC Textiles
            </h1>
          </div>
        </section>

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1260px',
          margin: '-10px auto 0 auto',
          padding: '0 20px 48px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>

          {/* ================= TARJETA PRINCIPAL: POLÍTICA DE CALIDAD ================= */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--linea)',
            borderRadius: '24px',
            padding: '28px 36px 32px 36px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 12px 36px rgba(19, 42, 82, 0.07)'
          }}>
            {/* Línea superior con gradiente de luz institucional */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '8%',
              right: '8%',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #2456C4, #38bdf8, #132A52, transparent)'
            }} />

            {/* Cita Destacada con Barra Azul Royal */}
            <div style={{
              backgroundColor: '#F0F7FF',
              border: '1px solid #D0E3FF',
              borderLeft: '5px solid var(--rey)',
              borderRadius: '0 14px 14px 0',
              padding: '20px 24px',
              marginBottom: '16px'
            }}>
              <p style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: 'var(--marino)',
                margin: 0,
                letterSpacing: '-0.01em'
              }}>
                &ldquo;En <strong style={{ color: 'var(--rey)', fontWeight: 850 }}>HUPAC TEXTILES</strong> trabajamos para ofrecer uniformes y soluciones textiles que cumplan con las expectativas de nuestros clientes, mediante procesos enfocados en la calidad, el cumplimiento y la mejora continua.&rdquo;
              </p>
            </div>

            {/* Párrafo Descriptivo */}
            <p style={{
              fontSize: '0.92rem',
              lineHeight: 1.65,
              color: 'var(--texto-2)',
              margin: '0 0 26px 0',
              maxWidth: '100%'
            }}>
              Con más de 21 años de experiencia, asumimos el compromiso de brindar productos confiables, atención personalizada y soluciones que fortalezcan la imagen de cada empresa.
            </p>

            {/* ================= FILA EN UNA SOLA LÍNEA: MISIÓN, VISIÓN Y VALORES ================= */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              borderTop: '1px solid var(--linea)',
              paddingTop: '26px',
              width: '100%'
            }}>
              {/* Tarjeta 1: NUESTRA MISIÓN */}
              <div style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderTop: '3px solid var(--rey)',
                borderRadius: '16px',
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 14px rgba(19, 42, 82, 0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#EAF3FC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconTarget size={22} color="var(--rey)" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--rey)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block' }}>
                      Propósito y Dirección
                    </span>
                    <h3 style={{ fontSize: '1.12rem', fontWeight: 850, color: 'var(--marino)', margin: 0 }}>
                      Nuestra Misión
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--texto-2)', margin: 0 }}>
                  Transformamos la identidad de las empresas en uniformes y soluciones textiles de calidad, combinando diseño, funcionalidad y personalización para proyectar la mejor imagen de cada cliente.
                </p>
              </div>

              {/* Tarjeta 2: VISIÓN CORPORATIVA */}
              <div style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderTop: '3px solid var(--marino)',
                borderRadius: '16px',
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 14px rgba(19, 42, 82, 0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#EAF3FC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconEye size={22} color="var(--rey)" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--rey)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block' }}>
                      Horizonte Futuro
                    </span>
                    <h3 style={{ fontSize: '1.12rem', fontWeight: 850, color: 'var(--marino)', margin: 0 }}>
                      Visión Corporativa
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--texto-2)', margin: 0 }}>
                  Ser el aliado estratégico de las empresas en soluciones textiles, reconocidos por nuestra calidad, innovación y servicio, llevando la imagen de nuestros clientes a nuevos niveles.
                </p>
              </div>

              {/* Tarjeta 3: NUESTROS VALORES */}
              <div style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderTop: '3px solid #0284c7',
                borderRadius: '16px',
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 14px rgba(19, 42, 82, 0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#EAF3FC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconAward size={22} color="var(--rey)" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--rey)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block' }}>
                      Pilar Institucional
                    </span>
                    <h3 style={{ fontSize: '1.12rem', fontWeight: 850, color: 'var(--marino)', margin: 0 }}>
                      Nuestros Valores
                    </h3>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '0.82rem', lineHeight: 1.45, color: 'var(--texto-2)' }}>
                    <strong style={{ color: 'var(--marino)' }}>• Calidad:</strong> Cada detalle para superar expectativas.
                  </div>
                  <div style={{ fontSize: '0.82rem', lineHeight: 1.45, color: 'var(--texto-2)' }}>
                    <strong style={{ color: 'var(--marino)' }}>• Compromiso:</strong> Responsabilidad y cumplimiento.
                  </div>
                  <div style={{ fontSize: '0.82rem', lineHeight: 1.45, color: 'var(--texto-2)' }}>
                    <strong style={{ color: 'var(--marino)' }}>• Confianza:</strong> Transparencia en cada relación.
                  </div>
                  <div style={{ fontSize: '0.82rem', lineHeight: 1.45, color: 'var(--texto-2)' }}>
                    <strong style={{ color: 'var(--marino)' }}>• Innovación:</strong> Soluciones textiles que destacan.
                  </div>
                  <div style={{ fontSize: '0.82rem', lineHeight: 1.45, color: 'var(--texto-2)' }}>
                    <strong style={{ color: 'var(--marino)' }}>• Servicio:</strong> Soluciones a la medida de tu empresa.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= BANNER INFERIOR DE ACCIÓN ================= */}
          <div style={{
            marginTop: '28px',
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid var(--linea)',
            borderRadius: '20px',
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: '0 6px 20px rgba(19, 42, 82, 0.04)'
          }}>
            <div>
              <h4 style={{ color: 'var(--marino)', margin: '0 0 4px 0', fontSize: '1.08rem', fontWeight: 800 }}>
                Hagamos que tu marca destaque. Solicita una cotización.
              </h4>
              <p style={{ color: 'var(--texto-2)', margin: 0, fontSize: '0.88rem' }}>
                Conoce nuestro catálogo completo o personaliza tus uniformes con bordado computarizado directo de fábrica.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/catalogo"
                className="btn sec"
                style={{
                  fontWeight: 750,
                  fontSize: '0.88rem',
                  padding: '10px 20px',
                  borderRadius: '10px'
                }}
              >
                Ver Catálogo
              </Link>
              <Link
                href="/configurador"
                className="btn"
                style={{
                  backgroundColor: 'var(--rey)',
                  color: '#ffffff',
                  fontWeight: 750,
                  fontSize: '0.88rem',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <IconConfigurator size={18} color="#ffffff" />
                Probar Configurador
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

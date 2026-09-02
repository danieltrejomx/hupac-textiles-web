'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterTitle from '@/components/TypewriterTitle';

export default function NosotrosPage() {
  const [activeModal, setActiveModal] = useState<'mision' | 'vision' | 'valores' | null>(null);

  const modalData = {
    mision: {
      tag: 'MISIÓN INSTITUCIONAL',
      titulo: 'Nuestra Misión',
      icono: '🎯',
      color: 'var(--rey)',
      texto: 'Confeccionar e innovar en uniformes empresariales e industriales de alto rendimiento, brindando a nuestros clientes prendas funcionales, duraderas y de máxima calidad textil que reflejen la identidad y solidez de su empresa.'
    },
    vision: {
      tag: 'VISIÓN FUTURA',
      titulo: 'Visión Corporativa',
      icono: '👁️',
      color: '#0284c7',
      texto: 'Consolidarnos como el fabricante y proveedor textil líder en México y América Latina, destacando por nuestra integración vertical, innovación tecnológica constante, sustentabilidad y excelencia en el servicio al cliente.'
    },
    valores: {
      tag: 'PRINCIPIOS RECTORES',
      titulo: 'Nuestros Valores',
      icono: '🛡️',
      color: '#059669',
      texto: '',
      items: [
        { titulo: 'Calidad sin compromiso', desc: 'La excelencia es nuestra base fundamental en cada fibra e hilo.', icono: '⭐' },
        { titulo: 'Compromiso total', desc: 'Cumplimiento puntual en tiempos y especificaciones de entrega.', icono: '🤝' },
        { titulo: 'Innovación continua', desc: 'Tecnología japonesa y alemana de última generación en planta.', icono: '💡' },
        { titulo: 'Integridad y transparencia', desc: 'Ética y rectitud comercial en cada cotización y contrato.', icono: '🛡️' },
        { titulo: 'Sinergia de equipo', desc: 'Alianzas sólidas con distribuidores para crecer conjuntamente.', icono: '🚀' },
        { titulo: 'Sostenibilidad ambiental', desc: 'Procesos limpios y cumplimiento de normativas mexicanas.', icono: '🌱' }
      ]
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '60px' }}>
        {/* Hero Header */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: 'clamp(28px, 3.5vh, 48px) 28px clamp(44px, 5vh, 60px) 28px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '10px', fontSize: '0.85rem', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>Inicio</Link>
              <span>/</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Nosotros</span>
            </div>

            <span className="eyebrow" style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px', fontSize: '0.8rem' }}>
              Nuestra Historia & Compromiso
            </span>
            <TypewriterTitle
              text="Más de 21 años transformando fibras en identidad"
              as="h1"
              style={{ fontSize: 'clamp(1.7rem, 2.2vw, 2.3rem)', fontWeight: 850, margin: '0 0 10px 0', lineHeight: 1.2, color: '#ffffff' }}
            />
            <p style={{ fontSize: '0.98rem', color: '#cbd5e1', maxWidth: '740px', margin: '0 auto', lineHeight: 1.45 }}>
              Somos <strong>HUPAC TEXTILES</strong>, empresa 100% mexicana con inicio de operaciones en 2005. Confeccionamos uniformes empresariales e industriales de alto rendimiento.
            </p>
          </div>
        </section>

        {/* Contenedor Principal estilo Referencia */}
        <div style={{ maxWidth: '1200px', margin: '-32px auto 0 auto', padding: '0 24px' }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--linea)',
            borderRadius: '24px',
            padding: 'clamp(28px, 4vw, 44px)',
            boxShadow: '0 10px 30px rgba(19, 42, 82, 0.06)',
            marginBottom: '40px'
          }}>
            {/* Header de Sección */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{
                fontSize: '0.82rem',
                fontFamily: 'var(--mono)',
                fontWeight: 750,
                color: 'var(--rey)',
                letterSpacing: '1.5px',
                display: 'block',
                marginBottom: '6px'
              }}>
                — ESTÁNDAR DE EXCELENCIA
              </span>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
                fontWeight: 900,
                color: 'var(--marino)',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                POLÍTICA DE CALIDAD
              </h2>
            </div>

            {/* Cita Destacada con Marco Azul */}
            <div style={{
              backgroundColor: 'rgba(36,86,196,0.04)',
              borderLeft: '4px solid var(--rey)',
              borderRadius: '0 12px 12px 0',
              padding: '20px 24px',
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '1.02rem',
                fontWeight: 700,
                fontStyle: 'italic',
                color: 'var(--marino)',
                margin: 0,
                lineHeight: 1.55
              }}>
                &ldquo;En HUPAC TEXTILES nos comprometemos a ofrecer uniformes empresariales e industriales que superen las expectativas de nuestros clientes en desempeño, seguridad y durabilidad, respaldados por un servicio técnico certificado, procesos de mejora continua y el más alto estándar de atención en la industria.&rdquo;
              </p>
            </div>

            {/* Texto Descriptivo */}
            <p style={{
              fontSize: '0.96rem',
              color: 'var(--texto-2)',
              lineHeight: 1.65,
              marginBottom: '32px'
            }}>
              Cada lote que confeccionamos pasa por un proceso de selección de hilo y control de calidad riguroso antes de llegar a nuestros clientes. Trabajamos con materias primas de primera categoría e integración vertical completa, garantizando que cada producto HUPAC sea sinónimo de confianza, durabilidad y valor real.
            </p>

            {/* Fila de 5 Tarjetas Horizontales */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '16px',
              marginBottom: '36px'
            }}>
              {[
                { titulo: 'SEGURIDAD', desc: 'EPP y confección certificada bajo normativas oficiales.', icono: '🛡️' },
                { titulo: 'RESPALDO', desc: 'Garantía directa de fábrica y abastecimiento continuo.', icono: '🏭' },
                { titulo: 'MEJORA CONTINUA', desc: 'Tecnología textil de punto, bordado y estampado constante.', icono: '📈' },
                { titulo: 'SATISFACCIÓN', desc: 'El cliente y distribuidor en el centro de cada decisión.', icono: '🤝' },
                { titulo: 'SOSTENIBILIDAD', desc: 'Procesos limpios, reciclaje y respeto al capital humano.', icono: '🌱' }
              ].map((card, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--linea)',
                  borderRadius: '16px',
                  padding: '20px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ fontSize: '1.4rem' }}>{card.icono}</div>
                  <h3 style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    fontFamily: 'var(--mono)',
                    color: 'var(--marino)',
                    margin: 0,
                    letterSpacing: '0.5px'
                  }}>
                    {card.titulo}
                  </h3>
                  <p style={{
                    fontSize: '0.82rem',
                    color: 'var(--texto-2)',
                    margin: 0,
                    lineHeight: 1.45
                  }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Botones Flotantes Emergentes (Misión, Visión, Valores) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              paddingTop: '16px',
              borderTop: '1px solid var(--linea)'
            }}>
              <button
                onClick={() => setActiveModal('mision')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'var(--marino)',
                  color: '#ffffff',
                  border: '2px solid var(--marino)',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  fontFamily: 'var(--mono)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 14px rgba(19, 42, 82, 0.15)'
                }}
              >
                <span>🎯</span> NUESTRA MISIÓN
              </button>

              <button
                onClick={() => setActiveModal('vision')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#ffffff',
                  color: 'var(--marino)',
                  border: '2px solid var(--rey)',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  fontFamily: 'var(--mono)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)'
                }}
              >
                <span>👁️</span> VISIÓN CORPORATIVA
              </button>

              <button
                onClick={() => setActiveModal('valores')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#ffffff',
                  color: 'var(--marino)',
                  border: '2px solid var(--linea)',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  fontFamily: 'var(--mono)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)'
                }}
              >
                <span>🛡️</span> NUESTROS VALORES
              </button>
            </div>
          </div>
        </div>

        {/* Modal Emergente (Pantalla Flotante) */}
        {activeModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(19, 42, 82, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '24px'
            }}
            onClick={() => setActiveModal(null)}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '36px',
                maxWidth: '620px',
                width: '100%',
                boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                border: '1px solid var(--linea)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de Cerrar */}
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#f1f5f9',
                  border: 'none',
                  color: 'var(--marino)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>

              {/* Tag y Título del Modal */}
              <span style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--mono)',
                fontWeight: 800,
                color: modalData[activeModal].color,
                backgroundColor: 'rgba(36,86,196,0.06)',
                border: `1px solid ${modalData[activeModal].color}33`,
                padding: '4px 12px',
                borderRadius: '8px',
                display: 'inline-block',
                marginBottom: '14px',
                letterSpacing: '1px'
              }}>
                {modalData[activeModal].tag}
              </span>

              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                color: 'var(--marino)',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span>{modalData[activeModal].icono}</span> {modalData[activeModal].titulo}
              </h2>

              {/* Contenido del Modal */}
              {modalData[activeModal].texto ? (
                <p style={{
                  fontSize: '1.05rem',
                  color: 'var(--texto-2)',
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {modalData[activeModal].texto}
                </p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  {modalData.valores.items?.map((item, idx) => (
                    <div key={idx} style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid var(--linea)',
                      borderRadius: '14px',
                      padding: '16px'
                    }}>
                      <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.icono}</div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--marino)', margin: '0 0 4px 0' }}>
                        {item.titulo}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--texto-2)', margin: 0, lineHeight: 1.45 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

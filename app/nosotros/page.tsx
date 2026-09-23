'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  IconShield, 
  IconAward, 
  IconTrending, 
  IconSparkles, 
  IconCheckCircle, 
  IconTarget,
  IconEye,
  IconConfigurator
} from '@/components/Icons';

type ModalType = 'mision' | 'vision' | 'valores' | null;

export default function NosotrosPage() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'transparent', minHeight: '85vh', position: 'relative' }}>
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1260px',
          margin: '0 auto',
          padding: '16px 20px 48px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>

          {/* ================= TARJETA PRINCIPAL: POLÍTICA DE CALIDAD ================= */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--linea)',
            borderRadius: '24px',
            padding: '36px 44px 32px 44px',
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

            {/* Tag Superior */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--rey)',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              <span style={{ width: '22px', height: '2px', backgroundColor: 'var(--rey)', display: 'inline-block' }} />
              ESTÁNDAR DE EXCELENCIA
            </div>

            {/* Título Principal */}
            <h1 style={{
              fontSize: '2.3rem',
              fontWeight: 850,
              color: 'var(--marino)',
              letterSpacing: '-0.02em',
              margin: '0 0 18px 0',
              lineHeight: 1.15
            }}>
              POLÍTICA DE CALIDAD
            </h1>

            {/* Cita Destacada con Barra Azul Royal */}
            <div style={{
              backgroundColor: '#F0F7FF',
              border: '1px solid #D0E3FF',
              borderLeft: '5px solid var(--rey)',
              borderRadius: '0 14px 14px 0',
              padding: '20px 24px',
              marginBottom: '20px'
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
                &ldquo;En <strong style={{ color: 'var(--rey)', fontWeight: 850 }}>HUPAC TEXTILES</strong> nos comprometemos a ofrecer soluciones textiles, uniformes corporativos, prendas industriales y calzado de seguridad que superen las expectativas de nuestros clientes en desempeño, confort y durabilidad, respaldados por confección 100% mexicana, rigurosos procesos de control de calidad y el más alto estándar de atención personalizada en la industria.&rdquo;
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
              Cada prenda y producto que confeccionamos y comercializamos pasa por un proceso de selección y control de calidad riguroso antes de llegar a nuestros clientes. Trabajamos únicamente con insumos de primera y estándares de costura industrial, garantizando que cada producto HUPAC sea sinónimo de confianza, durabilidad y valor real.
            </p>

            {/* ================= GRID DE 5 TARJETAS DE PILARES ================= */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
              marginBottom: '28px'
            }}>
              {[
                {
                  icon: IconShield,
                  iconColor: 'var(--rey)',
                  badgeBg: '#EAF3FC',
                  titulo: 'SEGURIDAD & CALIDAD',
                  desc: 'Telas de alto gramaje, costuras reforzadas y pruebas de uso rudo en todos los modelos.'
                },
                {
                  icon: IconAward,
                  iconColor: '#0284c7',
                  badgeBg: '#e0f2fe',
                  titulo: 'RESPALDO',
                  desc: 'Garantía directa de confección, asesoría especializada y reposición continua de inventario.'
                },
                {
                  icon: IconTrending,
                  iconColor: '#2563eb',
                  badgeBg: '#eff6ff',
                  titulo: 'MEJORA CONTINUA',
                  desc: 'Actualización constante de catálogo con lo mejor en tecnología textil, bordados y confección.'
                },
                {
                  icon: IconCheckCircle,
                  iconColor: '#16a34a',
                  badgeBg: '#dcfce7',
                  titulo: 'SATISFACCIÓN',
                  desc: 'El cliente y la proyección de su identidad corporativa en el centro de cada decisión.'
                },
                {
                  icon: IconSparkles,
                  iconColor: '#d97706',
                  badgeBg: '#fef3c7',
                  titulo: 'HECHO EN MÉXICO',
                  desc: 'Fabricación 100% nacional. Fomentamos el empleo formal y la manufactura con altos estándares éticos.'
                }
              ].map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '16px',
                      padding: '18px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--rey)';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 24px rgba(19, 42, 82, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: card.badgeBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: card.iconColor,
                      marginBottom: '2px'
                    }}>
                      <IconComponent size={20} color={card.iconColor} />
                    </div>
                    <h3 style={{
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: 'var(--marino)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      margin: 0
                    }}>
                      {card.titulo}
                    </h3>
                    <p style={{
                      fontSize: '0.78rem',
                      lineHeight: 1.45,
                      color: 'var(--texto-2)',
                      margin: 0
                    }}>
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* ================= FILA DE BOTONES EMERGENTES (MISIÓN, VISIÓN, VALORES) ================= */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '14px',
              borderTop: '1px solid var(--linea)',
              paddingTop: '24px',
              flexWrap: 'wrap'
            }}>
              <button
                type="button"
                onClick={() => setActiveModal('mision')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  borderRadius: '100px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid var(--rey)',
                  color: 'var(--rey)',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--rey)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(26, 58, 112, 0.18)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = 'var(--rey)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <IconTarget size={18} color="currentColor" />
                NUESTRA MISIÓN
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('vision')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  borderRadius: '100px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid var(--rey)',
                  color: 'var(--rey)',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--rey)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(26, 58, 112, 0.18)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = 'var(--rey)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <IconEye size={18} color="currentColor" />
                VISIÓN CORPORATIVA
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('valores')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  borderRadius: '100px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid var(--rey)',
                  color: 'var(--rey)',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--rey)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(26, 58, 112, 0.18)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = 'var(--rey)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <IconAward size={18} color="currentColor" />
                NUESTROS VALORES
              </button>
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
                Más de 21 años vistiendo y protegiendo a las empresas de México
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

        {/* ================= VENTANA MODAL EMERGENTE ================= */}
        {activeModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={closeModal}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--linea)',
                borderRadius: '24px',
                padding: '36px 40px',
                maxWidth: '680px',
                width: '100%',
                boxShadow: '0 25px 60px rgba(19, 42, 82, 0.2)',
                position: 'relative',
                color: 'var(--texto)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                type="button"
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  color: '#64748b',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fee2e2';
                  e.currentTarget.style.color = '#ef4444';
                  e.currentTarget.style.borderColor = '#fca5a5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                ✕
              </button>

              {/* Contenido según el modal seleccionado */}
              {activeModal === 'mision' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: '#EAF3FC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--rey)',
                      flexShrink: 0
                    }}>
                      <IconTarget size={26} color="var(--rey)" />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--rey)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        PROPÓSITO Y DIRECCIÓN
                      </span>
                      <h2 style={{ fontSize: '1.75rem', fontWeight: 850, color: 'var(--marino)', margin: 0 }}>
                        Nuestra Misión
                      </h2>
                    </div>
                  </div>

                  <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: 'var(--texto-2)', marginBottom: '24px' }}>
                    Transformamos la identidad y presencia de las empresas en uniformes y soluciones textiles de la más alta calidad, combinando diseño ergonómico, funcionalidad industrial y personalización de vanguardia para proyectar con orgullo la imagen de cada cliente.
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px',
                    borderTop: '1px solid var(--linea)',
                    paddingTop: '20px'
                  }}>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px' }}>
                      <b style={{ color: 'var(--marino)', fontSize: '0.86rem', display: 'block', marginBottom: '4px' }}>🇲🇽 Confección 100% Nacional</b>
                      <span style={{ color: 'var(--texto-2)', fontSize: '0.78rem' }}>Mano de obra calificada y procesos éticos.</span>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px' }}>
                      <b style={{ color: 'var(--marino)', fontSize: '0.86rem', display: 'block', marginBottom: '4px' }}>🛡️ Durabilidad Garantizada</b>
                      <span style={{ color: 'var(--texto-2)', fontSize: '0.78rem' }}>Materiales resistentes al uso continuo.</span>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px' }}>
                      <b style={{ color: 'var(--marino)', fontSize: '0.86rem', display: 'block', marginBottom: '4px' }}>👔 Imagen Corporativa</b>
                      <span style={{ color: 'var(--texto-2)', fontSize: '0.78rem' }}>Bordado fino y acabados impecables.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'vision' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: '#EAF3FC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--rey)',
                      flexShrink: 0
                    }}>
                      <IconEye size={26} color="var(--rey)" />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--rey)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        HORIZONTE FUTURO
                      </span>
                      <h2 style={{ fontSize: '1.75rem', fontWeight: 850, color: 'var(--marino)', margin: 0 }}>
                        Visión Corporativa
                      </h2>
                    </div>
                  </div>

                  <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: 'var(--texto-2)', marginBottom: '24px' }}>
                    Consolidarnos como el fabricante y proveedor líder a nivel nacional en soluciones textiles e indumentaria corporativa, reconocidos por nuestra excelencia en confección, innovación constante, puntualidad de entrega y servicio de clase mundial.
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px',
                    borderTop: '1px solid var(--linea)',
                    paddingTop: '20px'
                  }}>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px' }}>
                      <b style={{ color: 'var(--marino)', fontSize: '0.86rem', display: 'block', marginBottom: '4px' }}>📦 Cobertura Todo México</b>
                      <span style={{ color: 'var(--texto-2)', fontSize: '0.78rem' }}>Distribución eficiente a cualquier estado.</span>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px' }}>
                      <b style={{ color: 'var(--marino)', fontSize: '0.86rem', display: 'block', marginBottom: '4px' }}>⚡ Innovación y Tecnología</b>
                      <span style={{ color: 'var(--texto-2)', fontSize: '0.78rem' }}>Modernización constante de maquinaria textil.</span>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px' }}>
                      <b style={{ color: 'var(--marino)', fontSize: '0.86rem', display: 'block', marginBottom: '4px' }}>🤝 Alianza Estratégica</b>
                      <span style={{ color: 'var(--texto-2)', fontSize: '0.78rem' }}>Socios confiables de tu crecimiento.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'valores' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: '#EAF3FC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--rey)',
                      flexShrink: 0
                    }}>
                      <IconAward size={26} color="var(--rey)" />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--rey)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        PILAR ÉTICO E INSTITUCIONAL
                      </span>
                      <h2 style={{ fontSize: '1.75rem', fontWeight: 850, color: 'var(--marino)', margin: 0 }}>
                        Nuestros Valores
                      </h2>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    maxHeight: '380px',
                    overflowY: 'auto',
                    paddingRight: '6px'
                  }}>
                    {[
                      {
                        val: 'Calidad Inquebrantable',
                        desc: 'Cada puntada, corte y botón pasa por estrictos controles para superar cualquier estándar de la industria.'
                      },
                      {
                        val: 'Compromiso y Puntualidad',
                        desc: 'Respetamos cada fecha de entrega y especificación acordada con absoluta seriedad y profesionalismo.'
                      },
                      {
                        val: 'Confianza e Integridad',
                        desc: 'Construimos relaciones comerciales transparentes y duraderas basadas en el cumplimiento y la honestidad.'
                      },
                      {
                        val: 'Innovación Textil',
                        desc: 'Evolución técnica en materiales, tejidos transpirables y técnicas de bordado computarizado de alta definición.'
                      },
                      {
                        val: 'Pasión por el Servicio',
                        desc: 'Acompañamiento integral y asesoría experta para resolver con precisión las necesidades de cada empresa.'
                      }
                    ].map((v, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '12px',
                          padding: '14px 16px'
                        }}
                      >
                        <b style={{ color: 'var(--marino)', fontSize: '0.92rem', display: 'block', marginBottom: '4px' }}>
                          • {v.val}
                        </b>
                        <p style={{ color: 'var(--texto-2)', fontSize: '0.82rem', margin: 0, lineHeight: 1.45 }}>
                          {v.desc}
                        </p>
                      </div>
                    ))}
                  </div>
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

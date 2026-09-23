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
  IconTruck 
} from '@/components/Icons';

type ModalType = 'mision' | 'vision' | 'valores' | null;

export default function NosotrosPage() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#060B13', minHeight: '90vh', position: 'relative', overflow: 'hidden' }}>
        
        {/* Glow de fondo atmosférico institucional */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '450px',
          background: 'radial-gradient(ellipse at center, rgba(36, 86, 196, 0.22) 0%, rgba(56, 189, 248, 0.08) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 20px 64px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>

          {/* ================= TARJETA PRINCIPAL: POLÍTICA DE CALIDAD ================= */}
          <div style={{
            backgroundColor: '#0c1424',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '24px',
            padding: '40px 48px 36px 48px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          }}>
            {/* Línea superior con gradiente de luz */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #38bdf8, #2456C4, transparent)'
            }} />

            {/* Tag Superior */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#38bdf8',
              fontSize: '0.76rem',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              <span style={{ width: '24px', height: '2px', backgroundColor: '#38bdf8', display: 'inline-block' }} />
              ESTÁNDAR DE EXCELENCIA
            </div>

            {/* Título Principal */}
            <h1 style={{
              fontSize: '2.4rem',
              fontWeight: 850,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              margin: '0 0 20px 0',
              lineHeight: 1.15
            }}>
              POLÍTICA DE CALIDAD
            </h1>

            {/* Cita Destacada con Barra Azul Royal */}
            <div style={{
              borderLeft: '4px solid #2456C4',
              paddingLeft: '22px',
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '1.08rem',
                fontWeight: 600,
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '-0.01em'
              }}>
                &ldquo;En <strong style={{ color: '#38bdf8' }}>HUPAC TEXTILES</strong> nos comprometemos a ofrecer soluciones textiles, uniformes corporativos, prendas industriales y calzado de seguridad que superen las expectativas de nuestros clientes en desempeño, confort y durabilidad, respaldados por confección 100% mexicana, rigurosos procesos de control de calidad y el más alto estándar de atención personalizada en la industria.&rdquo;
              </p>
            </div>

            {/* Párrafo Descriptivo */}
            <p style={{
              fontSize: '0.88rem',
              lineHeight: 1.6,
              color: '#94a3b8',
              margin: '0 0 28px 0',
              maxWidth: '100%'
            }}>
              Cada prenda y producto que confeccionamos y comercializamos pasa por un proceso de selección y control de calidad riguroso antes de llegar a nuestros clientes. Trabajamos únicamente con insumos de primera y estándares de costura industrial, garantizando que cada producto HUPAC sea sinónimo de confianza, durabilidad y valor real.
            </p>

            {/* ================= GRID DE 5 TARJETAS DE PILARES ================= */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '14px',
              marginBottom: '28px'
            }}>
              {[
                {
                  icon: IconShield,
                  color: '#38bdf8',
                  titulo: 'SEGURIDAD & CALIDAD',
                  desc: 'Telas de alto gramaje, costuras reforzadas y pruebas de uso rudo en todos los modelos.'
                },
                {
                  icon: IconAward,
                  color: '#60a5fa',
                  titulo: 'RESPALDO',
                  desc: 'Garantía directa de confección, asesoría especializada y reposición continua de inventario.'
                },
                {
                  icon: IconTrending,
                  color: '#38bdf8',
                  titulo: 'MEJORA CONTINUA',
                  desc: 'Actualización constante de catálogo con lo mejor en tecnología textil, bordados y confección.'
                },
                {
                  icon: IconCheckCircle,
                  color: '#4ade80',
                  titulo: 'SATISFACCIÓN',
                  desc: 'El cliente y la proyección de su identidad corporativa en el centro de cada decisión.'
                },
                {
                  icon: IconSparkles,
                  color: '#fbbf24',
                  titulo: 'HECHO EN MÉXICO',
                  desc: 'Fabricación 100% nacional. Fomentamos el empleo formal y la manufactura con altos estándares éticos.'
                }
              ].map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#111c30',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '14px',
                      padding: '16px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                      e.currentTarget.style.backgroundColor = '#15233d';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(36, 86, 196, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                      e.currentTarget.style.backgroundColor = '#111c30';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ color: card.color, marginBottom: '2px', display: 'flex', alignItems: 'center' }}>
                      <IconComponent size={20} color={card.color} />
                    </div>
                    <h3 style={{
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: card.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      margin: 0
                    }}>
                      {card.titulo}
                    </h3>
                    <p style={{
                      fontSize: '0.76rem',
                      lineHeight: 1.45,
                      color: '#94a3b8',
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
              gap: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
                  padding: '12px 24px',
                  borderRadius: '100px',
                  backgroundColor: 'rgba(36, 86, 196, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2456C4';
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(36, 86, 196, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>🎯</span> NUESTRA MISIÓN
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('vision')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '100px',
                  backgroundColor: 'rgba(36, 86, 196, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2456C4';
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(36, 86, 196, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>👁️</span> VISIÓN CORPORATIVA
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('valores')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '100px',
                  backgroundColor: 'rgba(36, 86, 196, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2456C4';
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(36, 86, 196, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>🏅</span> NUESTROS VALORES
              </button>
            </div>
          </div>

          {/* ================= BANNER INFERIOR DE ACCIÓN ================= */}
          <div style={{
            marginTop: '32px',
            width: '100%',
            backgroundColor: '#0c1424',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h4 style={{ color: '#ffffff', margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 800 }}>
                Más de 21 años vistiendo y protegiendo a las empresas de México
              </h4>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.88rem' }}>
                Conoce nuestro catálogo completo o personaliza tus uniformes con bordado computarizado directo de fábrica.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link
                href="/catalogo"
                className="btn"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0B192C',
                  fontWeight: 800,
                  fontSize: '0.9rem',
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
                  backgroundColor: '#2456C4',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  padding: '10px 20px',
                  borderRadius: '10px'
                }}
              >
                🎨 Probar Configurador
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
              backgroundColor: 'rgba(3, 7, 18, 0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
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
                backgroundColor: '#0c1424',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                borderRadius: '24px',
                padding: '36px 40px',
                maxWidth: '680px',
                width: '100%',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(36, 86, 196, 0.3)',
                position: 'relative',
                color: '#ffffff'
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
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  color: '#cbd5e1',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#cbd5e1';
                }}
              >
                ✕
              </button>

              {/* Contenido según el modal seleccionado */}
              {activeModal === 'mision' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '2rem' }}>🎯</span>
                    <div>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        PROPÓSITO Y DIRECCIÓN
                      </span>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: 850, color: '#ffffff', margin: 0 }}>
                        Nuestra Misión
                      </h2>
                    </div>
                  </div>

                  <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#e2e8f0', marginBottom: '24px' }}>
                    Transformamos la identidad y presencia de las empresas en uniformes y soluciones textiles de la más alta calidad, combinando diseño ergonómico, funcionalidad industrial y personalización de vanguardia para proyectar con orgullo la imagen de cada cliente.
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '20px'
                  }}>
                    <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '12px', borderRadius: '10px' }}>
                      <b style={{ color: '#38bdf8', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>🇲🇽 Confección 100% Nacional</b>
                      <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Mano de obra calificada y procesos éticos.</span>
                    </div>
                    <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '12px', borderRadius: '10px' }}>
                      <b style={{ color: '#38bdf8', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>🛡️ Durabilidad Garantizada</b>
                      <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Materiales resistentes al uso continuo.</span>
                    </div>
                    <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '12px', borderRadius: '10px' }}>
                      <b style={{ color: '#38bdf8', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>👔 Imagen Corporativa</b>
                      <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Bordado fino y acabados impecables.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'vision' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '2rem' }}>👁️</span>
                    <div>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        HORIZONTE FUTURO
                      </span>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: 850, color: '#ffffff', margin: 0 }}>
                        Visión Corporativa
                      </h2>
                    </div>
                  </div>

                  <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#e2e8f0', marginBottom: '24px' }}>
                    Consolidarnos como el fabricante y proveedor líder a nivel nacional en soluciones textiles e indumentaria corporativa, reconocidos por nuestra excelencia en confección, innovación constante, puntualidad de entrega y servicio de clase mundial.
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '20px'
                  }}>
                    <div style={{ backgroundColor: 'rgba(36, 86, 196, 0.12)', border: '1px solid rgba(36, 86, 196, 0.3)', padding: '12px', borderRadius: '10px' }}>
                      <b style={{ color: '#60a5fa', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>📦 Cobertura Todo México</b>
                      <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Distribución eficiente a cualquier estado.</span>
                    </div>
                    <div style={{ backgroundColor: 'rgba(36, 86, 196, 0.12)', border: '1px solid rgba(36, 86, 196, 0.3)', padding: '12px', borderRadius: '10px' }}>
                      <b style={{ color: '#60a5fa', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>⚡ Innovación y Tecnología</b>
                      <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Modernización constante de maquinaria textil.</span>
                    </div>
                    <div style={{ backgroundColor: 'rgba(36, 86, 196, 0.12)', border: '1px solid rgba(36, 86, 196, 0.3)', padding: '12px', borderRadius: '10px' }}>
                      <b style={{ color: '#60a5fa', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>🤝 Alianza Estratégica</b>
                      <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Socios confiables de tu crecimiento.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'valores' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '2rem' }}>🏅</span>
                    <div>
                      <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        PILAR ÉTICO E INSTITUCIONAL
                      </span>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: 850, color: '#ffffff', margin: 0 }}>
                        Nuestros Valores
                      </h2>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
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
                          backgroundColor: '#111c30',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '14px 16px'
                        }}
                      >
                        <b style={{ color: '#38bdf8', fontSize: '0.94rem', display: 'block', marginBottom: '4px' }}>
                          • {v.val}
                        </b>
                        <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0, lineHeight: 1.45 }}>
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

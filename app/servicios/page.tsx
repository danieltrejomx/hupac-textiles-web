'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TecnicaAnimacion from '@/components/TecnicasAnimadas';
import { 
  IconBordado, 
  IconSerigrafia, 
  IconDTG, 
  IconSublimacion, 
  IconTransfer, 
  IconWhatsApp, 
  IconConfigurator 
} from '@/components/Icons';

export default function ServiciosPage() {
  const [modalServicio, setModalServicio] = useState<any | null>(null);
  const [activeTecnicaId, setActiveTecnicaId] = useState<string>('bordado');

  const serviciosDetalle = [
    {
      id: 'bordado',
      titulo: 'Bordado Industrial Computarizado',
      buttonLabel: 'Bordado Industrial',
      iconComp: IconBordado,
      resumen: 'Hilos de alta resistencia, acabados premium y relieve 3D de máxima durabilidad.',
      destacado: 'Más de 2 millones de piezas bordadas',
      desc: 'Acabado premium de máxima resistencia y relieve tridimensional utilizando hilos de alta tenacidad que resisten lavados industriales continuos sin decolorar.',
      caracteristicas: [
        'Ideal para camisas de vestir, polos piqué, chalecos, chamarras y gorras.',
        'Hilos de poliéster y rayón con brillo superior y amplia gama de colores Pantone.',
        'Maquinaria multicabezal automatizada de alta precisión y velocidad.',
        'Digitalización (ponchado) profesional para reproducir logotipos con nitidez milimétrica.'
      ],
      telas: '100% Algodón, Piqué, Mezclilla, Gabardina, Micropolar'
    },
    {
      id: 'serigrafia',
      titulo: 'Serigrafía Textil de Alto Rendimiento',
      buttonLabel: 'Serigrafía Textil',
      iconComp: IconSerigrafia,
      resumen: 'Tintas plastisol y ahuladas ideales para medianos y grandes volúmenes.',
      destacado: 'La técnica más eficiente para medianos y grandes volúmenes',
      desc: 'Impresión con tintas plastisol, ahuladas y base agua que ofrecen colores intensos, gran durabilidad y excelente relación costo-beneficio para eventos masivos o dotaciones de personal.',
      caracteristicas: [
        'Excelente opacidad y cobertura en prendas claras y oscuras.',
        'Tintas ecológicas libres de metales pesados y ftalatos.',
        'Efectos especiales: tacto cero (discharge), inflables (puff) y reflejantes.',
        'Curado térmico controlado que garantiza fijación permanente al tejido.'
      ],
      telas: '100% Algodón, Algodón/Poliéster, Jersey'
    },
    {
      id: 'dtg',
      titulo: 'Impresión Directa a Prenda (DTG)',
      buttonLabel: 'Impresión DTG',
      iconComp: IconDTG,
      resumen: 'Resolución fotográfica sin límite de colores y tacto suave e impalpable.',
      destacado: 'Resolución fotográfica sin límite de colores',
      desc: 'Tecnología digital de inyección de tinta textil que penetra la fibra sin dejar plastas gruesas, permitiendo degradados finos, sombras complejas e ilustraciones hiperrealistas.',
      caracteristicas: [
        'Ideal para diseños complejos, ilustraciones y fotografías.',
        'Tacto suave y transpirable sobre la prenda.',
        'Sin costos de revelado de marcos ni matrices.',
        'Tinta pigmentada con base agua de secado reactivo.'
      ],
      telas: '100% Algodón Peinado y Tejidos Lisos'
    },
    {
      id: 'sublimacion',
      titulo: 'Sublimación Textil HD',
      buttonLabel: 'Sublimación HD',
      iconComp: IconSublimacion,
      resumen: 'Impresión molecular 100% transpirable que nunca se despinta ni cuartea.',
      destacado: 'Impresión molecular 100% transpirable',
      desc: 'El calor y la presión transforman la tinta en gas penetrando la molécula de poliéster, logrando estampados continuos (full print) que nunca se cuartean ni pierden intensidad.',
      caracteristicas: [
        'Cero tacto: la tinta forma parte integral del tejido.',
        'No tapa los poros de la tela, manteniendo propiedades dry-fit y transpirabilidad.',
        'Colores vivos y brillantes que duran toda la vida útil de la prenda.',
        'Excelente para uniformes deportivos, playeras técnicas y cordones.'
      ],
      telas: '100% Poliéster, Dry-Fit, Microfibra, Lycra'
    },
    {
      id: 'transfer',
      titulo: 'Termotransferencia y Vinil Textil',
      buttonLabel: 'Termotransferencia y Vinil',
      iconComp: IconTransfer,
      resumen: 'Precisión nítida para folios, nombres y logotipos reflectivos de seguridad.',
      destacado: 'Precisión nítida para números, nombres y logotipos reflectivos',
      desc: 'Aplicación térmica de películas de poliuretano y tecnología DTF de alta fidelidad, ideal para numeraciones deportivas, personalización individual y detalles de alta reflectividad de seguridad.',
      caracteristicas: [
        'Disponibilidad de acabados especiales: reflectivo clase 2, metálico y mate.',
        'Gran elasticidad y adherencia sin cuartearse.',
        'Excelente definición en líneas finas y textos pequeños.',
        'Ideal para personalización individual con nombres de empleados.'
      ],
      telas: 'Algodón, Poliéster, Nylon, Mezclas y Ropa de Trabajo'
    }
  ];

  const activeServicio = serviciosDetalle.find((s) => s.id === activeTecnicaId) || serviciosDetalle[0];

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

          {/* ================= TARJETA PRINCIPAL: TÉCNICAS DE PERSONALIZACIÓN ================= */}
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
              HUPAC TEXTILES
            </div>

            {/* Título Principal */}
            <h1 style={{
              fontSize: '2.3rem',
              fontWeight: 850,
              color: 'var(--marino)',
              letterSpacing: '-0.02em',
              margin: '0 0 6px 0',
              lineHeight: 1.15
            }}>
              CINCO TÉCNICAS DE PERSONALIZACIÓN
            </h1>

            {/* Subtítulo */}
            <p style={{
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: 'var(--texto-2)',
              margin: '0 0 24px 0'
            }}>
              Cinco técnicas de personalización. Un solo fabricante.
            </p>

            {/* ================= SIMULADOR ANIMADO Y SELECTOR DE LAS 5 TÉCNICAS ================= */}
            <div style={{
              borderTop: '1px solid var(--linea)',
              paddingTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}>
              {/* Fila de botones de cápsula (Las 5 técnicas) */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                {serviciosDetalle.map((srv) => {
                  const IconComponent = srv.iconComp;
                  const isActive = srv.id === activeTecnicaId;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setActiveTecnicaId(srv.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        borderRadius: '100px',
                        backgroundColor: isActive ? 'var(--rey)' : '#ffffff',
                        border: `1.5px solid ${isActive ? 'var(--rey)' : '#cbd5e1'}`,
                        color: isActive ? '#ffffff' : 'var(--marino)',
                        fontSize: '0.84rem',
                        fontWeight: isActive ? 850 : 750,
                        letterSpacing: '0.03em',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? '0 4px 14px rgba(36, 86, 196, 0.28)' : 'none',
                        userSelect: 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = 'var(--rey)';
                          e.currentTarget.style.color = 'var(--rey)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = '#cbd5e1';
                          e.currentTarget.style.color = 'var(--marino)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <IconComponent size={18} color={isActive ? '#ffffff' : 'var(--rey)'} />
                      <span>{srv.buttonLabel || srv.titulo}</span>
                    </button>
                  );
                })}
              </div>

              {/* Visor de Animación de la técnica activa */}
              <div style={{
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(19, 42, 82, 0.12)',
                border: '1px solid #1e293b'
              }}>
                <TecnicaAnimacion id={activeTecnicaId} height={320} />
              </div>

              {/* Barra de descripción y botón de especificaciones */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                padding: '12px 18px',
                backgroundColor: '#f8fafc',
                borderRadius: '14px',
                border: '1px solid var(--linea)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    backgroundColor: 'var(--cielo)',
                    color: 'var(--rey)',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '10px',
                    letterSpacing: '0.04em'
                  }}>
                    ✓ {activeServicio.destacado}
                  </span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--texto-2)', lineHeight: 1.4 }}>
                    {activeServicio.resumen}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setModalServicio(activeServicio)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid var(--rey)',
                    color: 'var(--rey)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--rey)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = 'var(--rey)';
                  }}
                >
                  Ver ficha y especificaciones &rarr;
                </button>
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
              <span style={{ fontSize: '0.78rem', color: 'var(--rey)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '4px' }}>
                ¿Tienes dudas sobre qué técnica elegir?
              </span>
              <h2 style={{ color: 'var(--marino)', margin: '0 0 4px 0', fontSize: '1.18rem', fontWeight: 850 }}>
                Te asesoramos sin costo en la técnica ideal para tus uniformes
              </h2>
              <p style={{ color: 'var(--texto-2)', margin: 0, fontSize: '0.88rem' }}>
                Evaluamos el tipo de tela, la complejidad de tu logotipo y tu presupuesto para garantizar la mejor durabilidad y acabado visual.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="https://wa.me/525516257933?text=Hola,%20quisiera%20asesoria%20sobre%20las%20tecnicas%20de%20personalizacion"
                target="_blank"
                className="btn"
                style={{
                  backgroundColor: '#22c55e',
                  color: '#ffffff',
                  fontWeight: 750,
                  fontSize: '0.88rem',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
              >
                <IconWhatsApp size={18} color="#ffffff" />
                Asesoría por WhatsApp
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
                  gap: '8px',
                  textDecoration: 'none'
                }}
              >
                <IconConfigurator size={18} color="#ffffff" />
                Probar Configurador 3D
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ================= MODAL PANTALLA EMERGENTE DE TÉCNICA ================= */}
      {modalServicio && (
        <div 
          onClick={() => setModalServicio(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--linea)',
              padding: '36px',
              position: 'relative'
            }}
          >
            {/* Botón Cerrar */}
            <button
              type="button"
              onClick={() => setModalServicio(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--marino)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              ✕
            </button>

            {/* Header del Modal */}
            <div style={{ marginBottom: '16px' }}>
              <div>
                <span style={{
                  fontSize: '0.78rem',
                  backgroundColor: 'var(--cielo)',
                  color: 'var(--rey)',
                  border: '1px solid var(--cielo-2)',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  display: 'inline-block',
                  marginBottom: '8px'
                }}>
                  ✓ {modalServicio.destacado}
                </span>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--marino)', margin: 0, fontWeight: 850, lineHeight: 1.25, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {modalServicio.iconComp && <modalServicio.iconComp size={24} color="var(--rey)" />}
                  <span>{modalServicio.titulo}</span>
                </h2>
              </div>
            </div>

            {/* Simulación Animada en el Modal */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '20px',
              border: '1px solid #1e293b',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)'
            }}>
              <TecnicaAnimacion id={modalServicio.id} height={230} />
            </div>

            <p style={{ fontSize: '0.98rem', color: 'var(--texto-2)', lineHeight: 1.6, marginBottom: '20px' }}>
              {modalServicio.desc}
            </p>

            <div style={{
              padding: '12px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '14px',
              border: '1px solid var(--linea)',
              fontSize: '0.88rem',
              color: 'var(--marino)',
              marginBottom: '24px'
            }}>
              <strong>Telas recomendadas:</strong> {modalServicio.telas}
            </div>

            {/* Ventajas y Especificaciones */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid var(--linea)',
              borderRadius: '18px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--marino)', margin: '0 0 14px 0', fontWeight: 800 }}>
                Ventajas y Especificaciones Técnicas:
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {modalServicio.caracteristicas.map((c: string, i: number) => (
                  <li key={i} style={{ fontSize: '0.92rem', color: 'var(--texto-2)', lineHeight: 1.45 }}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Acciones */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setModalServicio(null)}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: 'var(--marino)',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 750,
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
              <Link
                href="/configurador"
                className="btn"
                style={{
                  backgroundColor: 'var(--rey)',
                  color: '#ffffff',
                  fontWeight: 800,
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '0.92rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Probar en Configurador 3D &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

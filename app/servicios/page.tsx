'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterTitle from '@/components/TypewriterTitle';
import { IconBordado, IconSerigrafia, IconDTG, IconSublimacion, IconTransfer, IconWhatsApp, IconConfigurator } from '@/components/Icons';

export default function ServiciosPage() {
  const [modalServicio, setModalServicio] = useState<any | null>(null);

  const serviciosDetalle = [
    {
      id: 'bordado',
      titulo: 'Bordado Industrial Computarizado',
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

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '80px' }}>
        {/* Header Compacto Centrado */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: '12px 24px 20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center'
        }}>
          <div style={{ 
            maxWidth: '1320px', 
            margin: '0 auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '10px 18px', 
            flexWrap: 'wrap',
            textAlign: 'center'
          }}>
            <h1 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 850, 
              margin: 0, 
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center'
            }}>
              Cinco técnicas de personalización. Un solo fabricante.
            </h1>

            <span style={{ 
              fontSize: '0.86rem', 
              color: '#cbd5e1',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>•</span> Haz clic en cualquiera de las 5 técnicas para ver sus especificaciones completas.
            </span>
          </div>
        </section>

        {/* GRID DE LAS 5 TÉCNICAS (EN UNA SOLA LÍNEA) */}
        <div style={{ maxWidth: '1280px', margin: '-10px auto 0 auto', padding: '0 24px' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '36px'
          }}>
            {serviciosDetalle.map((srv, idx) => {
              const IconComponent = srv.iconComp;
              return (
                <div
                  key={srv.id}
                  className="interactive-card-box"
                  onClick={() => setModalServicio(srv)}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <div style={{ textAlign: 'center' }}>
                    {/* Badge Centrado con Ícono + Técnica 1..5 */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '14px' }}>
                      <span className="card-icon-badge" style={{
                        fontSize: '0.78rem',
                        fontFamily: 'var(--mono)',
                        fontWeight: 800,
                        color: 'var(--rey)',
                        backgroundColor: 'var(--cielo)',
                        border: '1px solid var(--cielo-2)',
                        padding: '5px 14px',
                        borderRadius: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <IconComponent size={18} color="currentColor" />
                        <span>Técnica {idx + 1}</span>
                      </span>
                    </div>

                    {/* Título de la Técnica Centrado */}
                    <h3 style={{ 
                      fontSize: '1.05rem', 
                      fontWeight: 850, 
                      color: 'var(--marino)', 
                      margin: '0 0 8px 0', 
                      lineHeight: 1.25,
                      textAlign: 'center'
                    }}>
                      {srv.titulo}
                    </h3>

                    {/* Resumen Centrado */}
                    <p style={{ fontSize: '0.82rem', color: 'var(--texto-2)', margin: 0, lineHeight: 1.45, fontWeight: 500, textAlign: 'center' }}>
                      {srv.resumen}
                    </p>
                  </div>

                  <div className="card-action-link" style={{
                    fontSize: '0.84rem',
                    fontWeight: 850,
                    color: 'var(--rey)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    textAlign: 'center',
                    marginTop: '12px'
                  }}>
                    <span>Ver especificaciones</span>
                    <span className="card-arrow-icon">→</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner de Asesoría */}
          <div style={{
            marginTop: '44px',
            backgroundColor: 'var(--marino)',
            color: '#ffffff',
            borderRadius: '24px',
            padding: '36px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            boxShadow: '0 12px 36px rgba(19, 42, 82, 0.12)'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                ¿Tienes dudas sobre qué técnica elegir?
              </span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 850, margin: '0 0 6px 0', color: '#ffffff' }}>
                Te asesoramos sin costo en la técnica ideal para tus uniformes
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', margin: 0, maxWidth: '640px' }}>
                Evaluamos el tipo de tela, la complejidad de tu logotipo y tu presupuesto para garantizar la mejor durabilidad y acabado visual.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="https://wa.me/525516257933?text=Hola,%20quisiera%20asesoria%20sobre%20las%20tecnicas%20de%20personalizacion"
                target="_blank"
                className="btn-primary"
                style={{ backgroundColor: '#22c55e', color: '#ffffff', padding: '12px 22px', fontSize: '0.9rem', borderRadius: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <IconWhatsApp size={18} color="#ffffff" /> Asesoría por WhatsApp
              </Link>
              <Link
                href="/configurador"
                className="btn-outline"
                style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: '#ffffff', padding: '12px 22px', fontSize: '0.9rem', borderRadius: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <IconConfigurator size={18} color="#ffffff" /> Probar Configurador 3D
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

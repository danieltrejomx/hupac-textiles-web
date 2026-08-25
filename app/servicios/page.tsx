'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterTitle from '@/components/TypewriterTitle';

export default function ServiciosPage() {
  const serviciosDetalle = [
    {
      id: 'bordado',
      titulo: 'Bordado Industrial Computarizado',
      icono: '🪡',
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
      icono: '🎨',
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
      icono: '🖨️',
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
      icono: '🌈',
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
      titulo: 'Termotransferencia y Vinil Textil (DTF)',
      icono: '✨',
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
        {/* Header Banner */}
        <section style={{
          background: 'linear-gradient(135deg, #0f172a 0%, var(--marino) 100%)',
          color: '#ffffff',
          padding: '64px 28px 72px 28px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>Inicio</Link>
              <span>/</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Servicios</span>
            </div>

            <span className="eyebrow" style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: '16px' }}>
              Taller de Decoración & Personalización
            </span>
            <TypewriterTitle
              text="Cinco técnicas de personalización. Un solo fabricante."
              as="h1"
              speed={30}
              delay={100}
              cursorColor="#60a5fa"
              style={{ fontSize: '2.6rem', fontWeight: 850, margin: '0 0 16px 0', lineHeight: 1.2, color: '#ffffff' }}
            />
            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', maxWidth: '760px', margin: '0 auto', lineHeight: 1.6 }}>
              Personalizamos tus uniformes dentro de nuestras propias instalaciones, garantizando tiempos de entrega exactos, calibración de color precisa y el costo más bajo de fábrica.
            </p>
          </div>
        </section>

        {/* Lista Detallada de Servicios */}
        <div style={{ maxWidth: '1200px', margin: '-32px auto 0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {serviciosDetalle.map((srv, idx) => (
              <div key={srv.id} style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--linea)',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 4px 20px rgba(19, 42, 82, 0.04)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '36px',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '2.4rem' }}>{srv.icono}</span>
                    <div>
                      <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)', color: 'var(--rey)', fontWeight: 700, textTransform: 'uppercase' }}>
                        Técnica 0{idx + 1}
                      </span>
                      <h2 style={{ fontSize: '1.6rem', color: 'var(--marino)', margin: 0, fontWeight: 800 }}>
                        {srv.titulo}
                      </h2>
                    </div>
                  </div>

                  <div style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--cielo)',
                    color: 'var(--rey)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}>
                    ✓ {srv.destacado}
                  </div>

                  <p style={{ fontSize: '1rem', color: 'var(--texto-2)', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                    {srv.desc}
                  </p>

                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid var(--linea)',
                    fontSize: '0.88rem',
                    color: 'var(--marino)'
                  }}>
                    <strong>Telas recomendadas:</strong> {srv.telas}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--linea)',
                  borderRadius: '18px',
                  padding: '28px'
                }}>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--marino)', margin: '0 0 16px 0', fontWeight: 800 }}>
                    Ventajas y Especificaciones Técnicas:
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {srv.caracteristicas.map((c, i) => (
                      <li key={i} style={{ fontSize: '0.92rem', color: 'var(--texto-2)', lineHeight: 1.45 }}>
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                    <Link
                      href="/configurador"
                      className="btn"
                      style={{ fontSize: '0.85rem', padding: '9px 16px', backgroundColor: 'var(--rey)', color: '#ffffff' }}
                    >
                      Probar en Configurador 3D &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Banner de Asesoría */}
          <div style={{
            marginTop: '48px',
            backgroundColor: 'var(--marino)',
            borderRadius: '24px',
            padding: '44px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{ maxWidth: '680px' }}>
              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, margin: '0 0 8px 0', color: '#ffffff' }}>
                ¿No estás seguro de qué técnica es la más adecuada para tu proyecto?
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.98rem', margin: 0, lineHeight: 1.5 }}>
                Envíanos tu logotipo y un asesor técnico evaluará la tela, los colores y las proporciones para recomendarte la técnica más duradera y económica.
              </p>
            </div>
            <Link href="/#cotizador" className="btn" style={{ backgroundColor: '#ffffff', color: 'var(--marino)', fontWeight: 800, padding: '14px 28px', fontSize: '1rem' }}>
              Solicitar Asesoría de Personalización
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

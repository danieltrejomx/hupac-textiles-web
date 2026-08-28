'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterTitle from '@/components/TypewriterTitle';

export default function IndustriasPage() {
  const sectores = [
    {
      id: 'corporativo',
      titulo: 'Sector Administrativo y Corporativo',
      icono: '👔',
      descripcion: 'Prendas ejecutivas con acabados refinados que proyectan elegancia, confianza y profesionalismo en oficinas, atención a clientes y puestos gerenciales.',
      prendas: [
        'Camisas de vestir en algodón y mezclas de fácil planchado.',
        'Polos piqué ejecutivas con cuello y puños tejidos al tono.',
        'Pantalones de vestir corte recto y contemporáneo.',
        'Blazers corporativos y chalecos formales con bordado fino.'
      ],
      linkCatalogo: '/categoria/playeras',
      linkTexto: 'Ver textiles corporativos'
    },
    {
      id: 'medico',
      titulo: 'Sector Médico, Clínico y Farmacéutico',
      icono: '🩺',
      descripcion: 'Uniformes con telas de alta asepsia, repelencia a fluidos y máxima comodidad para largas jornadas en hospitales, laboratorios y clínicas dentales.',
      prendas: [
        'Filipinas médicas antifluidos en variedad de colores.',
        'Batas de laboratorio de corte profesional con bolsas funcionales.',
        'Pantalones clínicos tipo jogger y tradicionales.',
        'Cofias de protección, cubrebocas y calzado antiderrapante.'
      ],
      linkCatalogo: '/categoria/cabeza',
      linkTexto: 'Ver protección médica'
    },
    {
      id: 'industrial',
      titulo: 'Sector Industrial, Manufactura y Construcción',
      icono: '🏗️',
      descripcion: 'Ropa de trabajo pesada y equipo de protección certificado para soportar abrasión, chispas, grasas y condiciones de uso rudo en planta y obra.',
      prendas: [
        'Overoles industriales de mezclilla y gabardina 100% algodón.',
        'Camisolas de trabajo y camisas de mezclilla uso rudo.',
        'Pantalones industriales con costuras reforzadas de triple puntada.',
        'Botas de seguridad Duty Gear dieléctricas y con casquillo de poliamida.'
      ],
      linkCatalogo: '/categoria/calzado',
      linkTexto: 'Ver calzado y ropa industrial'
    },
    {
      id: 'gastronomico',
      titulo: 'Sector Restaurantero y Hospitalidad',
      icono: '👨‍🍳',
      descripcion: 'Vestimenta fresca, ergonómica y de fácil lavado para chefs, cocineros, meseros, baristas y personal de limpieza en hoteles y restaurantes.',
      prendas: [
        'Filipinas de chef en manga corta y larga con vivos personalizados.',
        'Mandiles pechera de gabardina y mezclilla con herrajes.',
        'Pantalones de cocina tipo mascota y lisos con elástico.',
        'Gorros de cocina, cofias y calzado con suela antideslizante certificada.'
      ],
      linkCatalogo: '/categoria/ropa-trabajo',
      linkTexto: 'Ver ropa de trabajo'
    },
    {
      id: 'logistica',
      titulo: 'Centros Logísticos, Almacén y Transporte',
      icono: '🚚',
      descripcion: 'Kits integrales de uniformes de alta visibilidad diseñados para operadores de montacargas, choferes, almacenistas y cuadrillas de reparto.',
      prendas: [
        'Chalecos de seguridad con cintas reflejantes grado ingeniería.',
        'Playeras y camisolas de alta visibilidad en colores neón.',
        'Fajas sacrolumbares ergonómicas con tirantes ajustables.',
        'Guantes de maniobra anticorte y lentes de seguridad envolventes.'
      ],
      linkCatalogo: '/categoria/manos',
      linkTexto: 'Ver equipo para logística'
    },
    {
      id: 'seguridad-vial',
      titulo: 'Seguridad Privada y Señalización Vial',
      icono: '🚧',
      descripcion: 'Uniformes tácticos y equipamiento de control perimetral para elementos de vigilancia, brigadas viales y delimitación de obras civiles.',
      prendas: [
        'Camisolas y pantalones tácticos tipo comando ripstop.',
        'Impermeables industriales completos con cinta reflejante.',
        'Cascos de seguridad clase E y protectores faciales.',
        'Conos viales, trafitambos, mallas y cintas de precaución.'
      ],
      linkCatalogo: '/categoria/vial',
      linkTexto: 'Ver limitación vial y EPC'
    }
  ];

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '80px' }}>
        {/* Hero */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: '64px 28px 72px 28px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>Inicio</Link>
              <span>/</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Industrias</span>
            </div>

            <span className="eyebrow" style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: '16px' }}>
              Soluciones Especializadas por Sector
            </span>
            <TypewriterTitle
              text="Un uniforme específico para cada operación"
              as="h1"
              speed={85}
              delay={250}
              cursorColor="#60a5fa"
              style={{ fontSize: '2.6rem', fontWeight: 850, margin: '0 0 16px 0', lineHeight: 1.2, color: '#ffffff' }}
            />
            <p style={{ fontSize: '1.15rem', color: '#cbd5e1', maxWidth: '760px', margin: '0 auto', lineHeight: 1.6 }}>
              Armamos paquetes y dotaciones completas con la ergonomía, telas resistentes y normativas de seguridad que tu industria exige.
            </p>
          </div>
        </section>

        {/* Grid de Industrias */}
        <div style={{ maxWidth: '1200px', margin: '-32px auto 0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '28px'
          }}>
            {sectores.map((sec) => (
              <div key={sec.id} style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--linea)',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 4px 16px rgba(19, 42, 82, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}>
                <div>
                  <div style={{ fontSize: '2.6rem', marginBottom: '12px' }}>{sec.icono}</div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--marino)', margin: '0 0 10px 0' }}>
                    {sec.titulo}
                  </h2>
                  <p style={{ fontSize: '0.94rem', color: 'var(--texto-2)', lineHeight: 1.55, marginBottom: '20px' }}>
                    {sec.descripcion}
                  </p>

                  <div style={{ borderTop: '1px solid var(--linea)', paddingTop: '16px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 750, color: 'var(--marino)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                      Prendas y Equipo Incluido:
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {sec.prendas.map((p, i) => (
                        <li key={i} style={{ fontSize: '0.88rem', color: 'var(--texto-2)', lineHeight: 1.4 }}>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--linea)' }}>
                  <Link
                    href={sec.linkCatalogo}
                    style={{ fontSize: '0.88rem', color: 'var(--rey)', fontWeight: 700, textDecoration: 'none' }}
                  >
                    {sec.linkTexto} &rarr;
                  </Link>

                  <Link
                    href="/#cotizador"
                    className="btn"
                    style={{ fontSize: '0.82rem', padding: '8px 14px', backgroundColor: 'var(--cielo)', color: 'var(--rey)', border: '1px solid var(--cielo-2)' }}
                  >
                    Cotizar Sector
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Banner */}
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
            <div style={{ maxWidth: '660px' }}>
              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, margin: '0 0 8px 0', color: '#ffffff' }}>
                ¿Requieres un desarrollo especial o tela con especificación técnica?
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.98rem', margin: 0, lineHeight: 1.5 }}>
                Desarrollamos prendas sobre pedido con acabados antiflama, antiestáticos, repelentes o con mezclas especiales para licitaciones y proyectos corporativos de gran escala.
              </p>
            </div>
            <Link href="/#cotizador" className="btn" style={{ backgroundColor: '#ffffff', color: 'var(--marino)', fontWeight: 800, padding: '14px 28px', fontSize: '1rem' }}>
              Contactar a un Asesor Industrial
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

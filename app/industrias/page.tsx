'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterTitle from '@/components/TypewriterTitle';

export default function IndustriasPage() {
  const [selectedSectorId, setSelectedSectorId] = useState<string>('corporativo');

  const sectores = [
    {
      id: 'corporativo',
      titulo: 'Administrativo y Corporativo',
      subtitulo: 'Línea Ejecutiva y Oficina',
      icono: '👔',
      tag: 'Elegancia y Confort',
      color: '#132A52',
      descripcion: 'Prendas ejecutivas con acabados refinados que proyectan elegancia, confianza y profesionalismo en oficinas, atención a clientes y puestos gerenciales.',
      productos: [
        {
          nombre: 'Camisa Oxford Ejecutiva',
          desc: 'Confeccionada en algodón/poliéster de fácil planchado. Excelente caída y ajuste.',
          link: '/categoria/textiles',
          imagen: '👔',
          specs: ['Algodón / Poliéster', 'Fácil planchado', 'Tallas XCH - 3EG']
        },
        {
          nombre: 'Playera Polo Piqué Ejecutiva',
          desc: 'Tejido piqué de alta densidad con cuello y puños al tono. Ideal para corporativos.',
          link: '/categoria/textiles',
          imagen: '👕',
          specs: ['100% Algodón Peinado', '150-220 g/m²', 'Bordado fino']
        },
        {
          nombre: 'Pantalón de Vestir Gabardina',
          desc: 'Corte recto contemporáneo con bolsas profundas y confección de alta durabilidad.',
          link: '/categoria/textiles',
          imagen: '👖',
          specs: ['Gabardina 100% Algodón', 'Planchado permanente', 'Variedad de tonos']
        },
        {
          nombre: 'Blazer Corporativo Fino',
          desc: 'Saco formal estructurado con forro interno y espacio para bordado institucional.',
          link: '/categoria/textiles',
          imagen: '🧥',
          specs: ['Lana / Poliéster', 'Forro premium', 'Corte dama y caballero']
        }
      ]
    },
    {
      id: 'medico',
      titulo: 'Médico, Clínico y Farmacéutico',
      subtitulo: 'Salud, Asepsia y Laboratorio',
      icono: '🩺',
      tag: 'Alta Asepsia & Antifluidos',
      color: '#0284c7',
      descripcion: 'Uniformes con telas de alta asepsia, repelencia a fluidos y máxima comodidad para largas jornadas en hospitales, laboratorios y clínicas dentales.',
      productos: [
        {
          nombre: 'Filipina Médica Antifluidos',
          desc: 'Tela stretch suave repelente a líquidos y manchas. Bolsas ergonómicas.',
          link: '/categoria/ropa-trabajo',
          imagen: '🥼',
          specs: ['Tecnología Antifluidos', 'Secado rápido', '8 colores clínicos']
        },
        {
          nombre: 'Bata de Laboratorio Profesional',
          desc: 'Bata blanca corte largo y mediano con botones ocultos y bolsas de parche.',
          link: '/categoria/ropa-trabajo',
          imagen: '🩺',
          specs: ['Gabardina clínica', 'Resistente a lavados', 'Manga larga / corta']
        },
        {
          nombre: 'Pantalón Clínico Jogger',
          desc: 'Pantalón tipo médico con resorte y jareta ajustable para máximo confort.',
          link: '/categoria/ropa-trabajo',
          imagen: '👖',
          specs: ['Tela microfibra stretch', '6 bolsas funcionales', 'Antiarrugas']
        },
        {
          nombre: 'Calzado & Protección Clínica',
          desc: 'Zapatos antideslizantes sin agujetas, cofias quirúrgicas y cubrebocas.',
          link: '/categoria/calzado',
          imagen: '👟',
          specs: ['Suela antideslizante', 'Certificado asepsia', 'Hipoalergénico']
        }
      ]
    },
    {
      id: 'industrial',
      titulo: 'Industrial, Manufactura y Construcción',
      subtitulo: 'Uso Rudo y Planta Industrial',
      icono: '🏗️',
      tag: 'Uso Rudo Certificado',
      color: '#d97706',
      descripcion: 'Ropa de trabajo pesada y equipo de protección certificado para soportar abrasión, chispas, grasas y condiciones de uso rudo en planta y obra.',
      productos: [
        {
          nombre: 'Overol Industrial Gabardina',
          desc: 'Overol completo con cierre reforzado de doble vía y reflejantes opcionales.',
          link: '/categoria/ropa-trabajo',
          imagen: '👷‍♂️',
          specs: ['Gabardina 100% Algodón', 'Costuras triple puntada', 'Protección completa']
        },
        {
          nombre: 'Camisola de Mezclilla Heavy-Duty',
          desc: 'Confeccionada en mezclilla de 14 oz. Ideal para soldadura y mecánica.',
          link: '/categoria/ropa-trabajo',
          imagen: '👔',
          specs: ['Mezclilla 14 oz', 'Botones reforzados', 'Alta durabilidad']
        },
        {
          nombre: 'Pantalón Industrial Reforzado',
          desc: 'Pantalón de trabajo uso pesado con remaches en puntos de tensión.',
          link: '/categoria/ropa-trabajo',
          imagen: '👖',
          specs: ['Gabardina de 280g', 'Bolsas cargo', 'Resistencia a fricción']
        },
        {
          nombre: 'Botas Duty Gear Dieléctricas',
          desc: 'Calzado de seguridad industrial con casquillo de poliamida y suela antiderrapante.',
          link: '/categoria/calzado',
          imagen: '🥾',
          specs: ['NOM-113-STPS', 'Dieléctrico 14 kV', 'Casquillo no metálico']
        }
      ]
    },
    {
      id: 'gastronomico',
      titulo: 'Restaurantero y Hospitalidad',
      subtitulo: 'Cocina, Bar y Servicio',
      icono: '👨‍🍳',
      tag: 'Ergonomía & Frescura',
      color: '#059669',
      descripcion: 'Vestimenta fresca, ergonómica y de fácil lavado para chefs, cocineros, meseros, baristas y personal de limpieza en hoteles y restaurantes.',
      productos: [
        {
          nombre: 'Filipina de Chef Ejecutiva',
          desc: 'Filipina en manga corta o larga con botones cruzados y tela transpirable.',
          link: '/categoria/ropa-trabajo',
          imagen: '👨‍🍳',
          specs: ['Algodón / Poliéster', 'Transpiración posterior', 'Personalizable']
        },
        {
          nombre: 'Mandil Pechera Gabardina / Mezclilla',
          desc: 'Mandil ajustables con herrajes metálicos y bolsas porta comanda.',
          link: '/categoria/ropa-trabajo',
          imagen: '🎽',
          specs: ['Mezclilla o Gabardina', 'Bolsas frontales', 'Resistente a lavados']
        },
        {
          nombre: 'Pantalón de Cocina Mascota / Liso',
          desc: 'Pantalón con resorte continuo para facilidad de movimiento en cocina.',
          link: '/categoria/ropa-trabajo',
          imagen: '👖',
          specs: ['Patrón mascota / negro', '100% Algodón', 'Secado rápido']
        },
        {
          nombre: 'Calzado Gastronómico Antideslizante',
          desc: 'Zapatos de cocina ligeros con plantilla ergonómica y suela anti-aceite.',
          link: '/categoria/calzado',
          imagen: '👞',
          specs: ['Suela antideslizante', 'Resistente a grasas', 'Ergonómico']
        }
      ]
    },
    {
      id: 'logistica',
      titulo: 'Centros Logísticos y Transporte',
      subtitulo: 'Almacén, Choferes y Rejillas',
      icono: '🚚',
      tag: 'Alta Visibilidad ANSI',
      color: '#2456C4',
      descripcion: 'Kits integrales de uniformes de alta visibilidad diseñados para operadores de montacargas, choferes, almacenistas y cuadrillas de reparto.',
      productos: [
        {
          nombre: 'Chaleco de Seguridad Reflejante',
          desc: 'Chaleco con cintas reflejantes de 2 pulgadas y bolsas porta identificador.',
          link: '/categoria/vial',
          imagen: '🦺',
          specs: ['Norma ANSI / ISEA', 'Reflejante microprismático', 'Alta visibilidad']
        },
        {
          nombre: 'Playera Dry-Fit Alta Visibilidad',
          desc: 'Playera neón de secado rápido con cintas reflejantes termoselladas.',
          link: '/categoria/textiles',
          imagen: '👕',
          specs: ['Poliéster Microfibra', 'Colores Neón', 'Filtro UV']
        },
        {
          nombre: 'Faja Sacrolumbar Ergonómica',
          desc: 'Faja de protección de soporte lumbar con varillas flexibles y tirantes.',
          link: '/categoria/manos',
          imagen: '🛡️',
          specs: ['Banda elástica de 8"', 'Prevención de lesiones', 'Ajuste doble']
        },
        {
          nombre: 'Guantes de Maniobra Anticorte',
          desc: 'Guantes de nitrilo y poliuretano para manipulación segura de carga.',
          link: '/categoria/manos',
          imagen: '🧤',
          specs: ['Nivel anticorte 3 y 5', 'Grip antideslizante', 'Ergonómicos']
        }
      ]
    },
    {
      id: 'seguridad-vial',
      titulo: 'Seguridad Privada y Señalización',
      subtitulo: 'Vigilancia, Brigadas y EPC',
      icono: '🚧',
      tag: 'Línea Táctica & EPC',
      color: '#dc2626',
      descripcion: 'Uniformes tácticos y equipamiento de control perimetral para elementos de vigilancia, brigadas viales y delimitación de obras civiles.',
      productos: [
        {
          nombre: 'Camisola & Pantalón Táctico Ripstop',
          desc: 'Traje táctico anti-desgarre con bolsas tipo cargo y refuerzo en rodillas.',
          link: '/categoria/ropa-trabajo',
          imagen: '👮‍♂️',
          specs: ['Tela Ripstop militar', 'Repele agua y polvo', 'Corte táctico']
        },
        {
          nombre: 'Impermeable Industrial Completo',
          desc: 'Conjunto de saco y pantalón impermeable PVC con cintas reflejantes.',
          link: '/categoria/ropa-trabajo',
          imagen: '🌧️',
          specs: ['PVC / Poliéster', 'Sellado en calor', '100% Impermeable']
        },
        {
          nombre: 'Casco de Seguridad Clase E',
          desc: 'Casco de protección dieléctrico con suspensión de matraca de 4 puntos.',
          link: '/categoria/cabeza',
          imagen: '🪖',
          specs: ['NOM-115-STPS', 'Dieléctrico hasta 20kV', 'Ajuste milimétrico']
        },
        {
          nombre: 'Señalización & Delimitación Vial',
          desc: 'Conos de 71cm y 91cm, trafitambos, mallas delimitadoras y cintas.',
          link: '/categoria/vial',
          imagen: '🚧',
          specs: ['PVC flexible con reflejante', 'Grado ingeniería', 'Alta durabilidad']
        }
      ]
    }
  ];

  const sectorActivo = sectores.find(s => s.id === selectedSectorId) || sectores[0];

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '80px' }}>
        {/* Hero Header */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: 'clamp(28px, 3.5vh, 48px) 28px clamp(44px, 5vh, 60px) 28px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '10px', fontSize: '0.85rem', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>Inicio</Link>
              <span>/</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Industrias</span>
            </div>

            <span className="eyebrow" style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px', fontSize: '0.8rem' }}>
              Soluciones Especializadas por Sector
            </span>
            <TypewriterTitle
              text="Un uniforme específico para cada operación"
              as="h1"
              style={{ fontSize: 'clamp(1.7rem, 2.2vw, 2.3rem)', fontWeight: 850, margin: '0 0 10px 0', lineHeight: 1.2, color: '#ffffff' }}
            />
            <p style={{ fontSize: '0.98rem', color: '#cbd5e1', maxWidth: '740px', margin: '0 auto', lineHeight: 1.45 }}>
              Haz clic en cualquiera de las <strong>6 industrias</strong> para desplegar sus productos y dotaciones recomendadas.
            </p>
          </div>
        </section>

        <div style={{ maxWidth: '1200px', margin: '-32px auto 0 auto', padding: '0 24px' }}>
          {/* GRID DE LAS 6 INDUSTRIAS (3 COLUMNAS X 2 FILAS) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '36px'
          }}>
            {sectores.map((sec) => {
              const isSelected = sec.id === selectedSectorId;
              return (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSectorId(sec.id)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: isSelected ? `2.5px solid var(--rey)` : '1px solid var(--linea)',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: isSelected ? '0 12px 30px rgba(36, 86, 196, 0.15)' : '0 4px 14px rgba(19, 42, 82, 0.04)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: isSelected ? 'translateY(-2px)' : 'none'
                  }}
                >
                  {/* Badge de Selección Activa */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '2.4rem' }}>{sec.icono}</span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--mono)',
                      fontWeight: 800,
                      color: isSelected ? '#ffffff' : 'var(--rey)',
                      backgroundColor: isSelected ? 'var(--rey)' : 'rgba(36, 86, 196, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {isSelected ? '✓ SELECCIONADO' : sec.tag}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.25rem', fontWeight: 850, color: 'var(--marino)', margin: '0 0 6px 0' }}>
                    {sec.titulo}
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: 'var(--texto-2)', margin: '0 0 16px 0', lineHeight: 1.45 }}>
                    {sec.subtitulo}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--linea)',
                    fontSize: '0.85rem',
                    fontWeight: 750,
                    color: isSelected ? 'var(--rey)' : 'var(--texto-2)'
                  }}>
                    <span>{isSelected ? 'Desplegando productos abajo 👇' : 'Ver productos de esta industria →'}</span>
                    <span style={{ fontSize: '1.1rem' }}>{isSelected ? '▼' : '▶'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PANEL DE DESPLIEGUE DE PRODUCTOS DE LA INDUSTRIA SELECCIONADA */}
          <div
            id="despliegue-productos"
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid var(--rey)',
              borderRadius: '24px',
              padding: 'clamp(28px, 4vw, 44px)',
              boxShadow: '0 12px 36px rgba(19, 42, 82, 0.08)',
              marginBottom: '44px'
            }}
          >
            {/* Encabezado del Sector Desplegado */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              paddingBottom: '24px',
              marginBottom: '28px',
              borderBottom: '1px solid var(--linea)'
            }}>
              <div>
                <span style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--mono)',
                  fontWeight: 800,
                  color: 'var(--rey)',
                  letterSpacing: '1.2px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(36, 86, 196, 0.06)',
                  padding: '4px 12px',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}>
                  SECTOR SELECCIONADO — {sectorActivo.tag}
                </span>
                <h2 style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--marino)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>{sectorActivo.icono}</span> {sectorActivo.titulo}
                </h2>
                <p style={{ fontSize: '1.02rem', color: 'var(--texto-2)', maxWidth: '820px', margin: 0, lineHeight: 1.6 }}>
                  {sectorActivo.descripcion}
                </p>
              </div>

              <Link
                href="/#cotizador"
                className="btn"
                style={{
                  backgroundColor: 'var(--rey)',
                  color: '#ffffff',
                  fontWeight: 800,
                  padding: '12px 24px',
                  fontSize: '0.92rem',
                  boxShadow: '0 4px 14px rgba(36, 86, 196, 0.25)'
                }}
              >
                Cotizar Dotación para este Sector
              </Link>
            </div>

            {/* Grid de Productos Desplegados */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 850, color: 'var(--marino)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📦 Productos y Prendas Clave para {sectorActivo.titulo}:
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {sectorActivo.productos.map((prod, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid var(--linea)',
                    borderRadius: '18px',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}>
                    <div>
                      <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{prod.imagen}</div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--marino)', margin: '0 0 6px 0' }}>
                        {prod.nombre}
                      </h4>
                      <p style={{ fontSize: '0.86rem', color: 'var(--texto-2)', margin: '0 0 14px 0', lineHeight: 1.45 }}>
                        {prod.desc}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                        {prod.specs.map((spec, sIdx) => (
                          <span key={sIdx} style={{
                            fontSize: '0.75rem',
                            backgroundColor: '#ffffff',
                            border: '1px solid var(--linea)',
                            color: 'var(--marino)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontWeight: 650
                          }}>
                            ✓ {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--linea)' }}>
                      <Link
                        href={prod.link}
                        style={{ fontSize: '0.85rem', color: 'var(--rey)', fontWeight: 750, textDecoration: 'none' }}
                      >
                        Ver en Catálogo →
                      </Link>

                      <Link
                        href="/#cotizador"
                        style={{
                          fontSize: '0.78rem',
                          padding: '6px 12px',
                          backgroundColor: 'var(--cielo)',
                          color: 'var(--rey)',
                          border: '1px solid var(--cielo-2)',
                          borderRadius: '6px',
                          fontWeight: 750,
                          textDecoration: 'none'
                        }}
                      >
                        Cotizar
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Banner de Asesoría Industrial */}
          <div style={{
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

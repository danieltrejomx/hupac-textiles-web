'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterTitle from '@/components/TypewriterTitle';
import { IconAward, IconTrending, IconShield, IconTag } from '@/components/Icons';

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'transparent', minHeight: '85vh', paddingBottom: '40px' }}>
        {/* Header Compacto Centrado */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: '14px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center'
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
              Más de 21 años creando soluciones textiles que proyectan tu marca.
            </h1>
          </div>
        </section>

        <div style={{ maxWidth: '1200px', margin: '-10px auto 0 auto', padding: '0 24px' }}>
          {/* Tarjetas Principales: Misión, Visión */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '24px'
          }}>
            {[
              { 
                tag: 'MISIÓN', 
                titulo: 'Misión', 
                desc: 'Transformamos la identidad de las empresas en uniformes y soluciones textiles de calidad, combinando diseño, funcionalidad y personalización para proyectar la mejor imagen de cada cliente.', 
                icon: IconAward,
                color: 'var(--rey)'
              },
              { 
                tag: 'VISIÓN', 
                titulo: 'Visión', 
                desc: 'Ser el aliado estratégico de las empresas en soluciones textiles, reconocidos por nuestra calidad, innovación y servicio, llevando la imagen de nuestros clientes a nuevos niveles.', 
                icon: IconTrending,
                color: '#0284c7'
              }
            ].map((pillar, i) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={i}
                  className={`textile-tag-card tag-delay-${i + 1}`}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--linea)',
                    borderRadius: '18px',
                    padding: '28px 30px',
                    boxShadow: '0 8px 24px rgba(19, 42, 82, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--mono)',
                      fontSize: '9.5px',
                      fontWeight: 750,
                      letterSpacing: '1px',
                      color: pillar.color,
                      backgroundColor: 'rgba(36,86,196,0.06)',
                      border: `1px solid ${pillar.color}33`,
                      padding: '3px 10px',
                      borderRadius: '6px',
                      marginBottom: '12px',
                      textTransform: 'uppercase'
                    }}>
                      <IconComp size={12} color={pillar.color} /> {pillar.tag}
                    </span>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 850, color: 'var(--marino)', marginBottom: '12px' }}>
                      {pillar.titulo}
                    </h2>
                    <p style={{ color: 'var(--texto-2)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tarjeta de Valores Corporativos */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--linea)',
            borderRadius: '20px',
            padding: '32px 36px',
            boxShadow: '0 4px 20px rgba(19, 42, 82, 0.04)',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                fontWeight: 750,
                letterSpacing: '1px',
                color: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.08)',
                border: '1px solid rgba(5, 150, 105, 0.25)',
                padding: '4px 12px',
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}>
                <IconShield size={13} color="#059669" /> VALORES
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 850, color: 'var(--marino)', margin: '0 0 20px 0' }}>
              Nuestros Valores
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px'
            }}>
              {[
                { val: 'Calidad', desc: 'Cada detalle cuenta. Creamos prendas que cumplen y superan expectativas.' },
                { val: 'Compromiso', desc: 'Tu proyecto es nuestro compromiso. Respondemos con responsabilidad y cumplimiento.' },
                { val: 'Confianza', desc: 'Construimos relaciones duraderas con transparencia y profesionalismo.' },
                { val: 'Innovación', desc: 'Evolucionamos para ofrecer soluciones textiles que destacan.' },
                { val: 'Servicio', desc: 'Escuchamos, entendemos y creamos soluciones a la medida de cada cliente.' },
              ].map((v, idx) => (
                <div key={idx} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                  <b style={{ color: 'var(--marino)', fontSize: '1.05rem', display: 'block', marginBottom: '6px' }}>
                    • {v.val}
                  </b>
                  <p style={{ color: 'var(--texto-2)', fontSize: '0.88rem', margin: 0, lineHeight: 1.45 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sección Destacada: Política de Calidad */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--linea)',
            borderRadius: '20px',
            padding: '36px 40px',
            boxShadow: '0 4px 20px rgba(19, 42, 82, 0.04)',
            marginBottom: '36px'
          }}>
            <div style={{ maxWidth: '980px' }}>
              <span className="eyebrow" style={{ color: 'var(--rey)', marginBottom: '10px' }}>Compromiso Institucional</span>
              <h2 style={{ fontSize: '1.9rem', color: 'var(--marino)', margin: '0 0 16px 0', lineHeight: 1.25, fontWeight: 850 }}>
                Política de Calidad
              </h2>
              <div style={{
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '14px',
                padding: '24px 28px',
                color: '#0369a1',
                fontSize: '0.98rem',
                lineHeight: 1.65,
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <p style={{ margin: 0 }}>
                  En <strong>HUPAC TEXTILES</strong> trabajamos para ofrecer uniformes y soluciones textiles que cumplan con las expectativas de nuestros clientes, mediante procesos enfocados en la calidad, el cumplimiento y la mejora continua.
                </p>
                <p style={{ margin: 0 }}>
                  Con más de 21 años de experiencia, asumimos el compromiso de brindar productos confiables, atención personalizada y soluciones que fortalezcan la imagen de cada empresa.
                </p>
                <div style={{ borderTop: '1px solid #7dd3fc', paddingTop: '12px', fontWeight: 800, color: 'var(--marino)', fontSize: '1.05rem' }}>
                  Hagamos que tu marca destaque. Solicita una cotización.
                </div>
              </div>
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

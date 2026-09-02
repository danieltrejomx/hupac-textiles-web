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
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '40px' }}>
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

        <div style={{ maxWidth: '1200px', margin: '-32px auto 0 auto', padding: '0 24px' }}>
          {/* Tarjetas Principales: Misión, Visión, Valores */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {[
              { 
                tag: 'MISIÓN', 
                titulo: 'Misión', 
                desc: 'Información pendiente por actualizar', 
                icon: IconAward,
                color: 'var(--rey)'
              },
              { 
                tag: 'VISIÓN', 
                titulo: 'Visión', 
                desc: 'Información pendiente por actualizar', 
                icon: IconTrending,
                color: '#0284c7'
              },
              { 
                tag: 'VALORES', 
                titulo: 'Valores', 
                desc: 'Información pendiente por actualizar', 
                icon: IconShield,
                color: '#059669'
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
                    padding: '24px 26px',
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
                    <div style={{
                      backgroundColor: '#fef3c7',
                      border: '1px dashed #d97706',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      color: '#b45309',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span>⏳</span> {pillar.desc}
                    </div>
                  </div>
                </div>
              );
            })}
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
            {/* Texto de Política de Calidad Arriba */}
            <div style={{ maxWidth: '880px', marginBottom: '32px' }}>
              <span className="eyebrow" style={{ color: 'var(--rey)', marginBottom: '10px' }}>Compromiso Institucional</span>
              <h2 style={{ fontSize: '2.1rem', color: 'var(--marino)', margin: '0 0 16px 0', lineHeight: 1.25, fontWeight: 850 }}>
                Política de Calidad
              </h2>
              <div style={{
                backgroundColor: '#fef3c7',
                border: '1px dashed #d97706',
                borderRadius: '12px',
                padding: '16px 20px',
                color: '#b45309',
                fontSize: '0.94rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '1.2rem' }}>⏳</span>
                <div>
                  Información pendiente por actualizar
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

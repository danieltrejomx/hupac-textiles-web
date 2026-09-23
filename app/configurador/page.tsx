'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Configurator from '@/components/Configurator';

export default function ConfiguradorPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'transparent', minHeight: '85vh', paddingBottom: '48px', position: 'relative' }}>
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '16px 20px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* ================= TARJETA PRINCIPAL: CABECERA INSTITUCIONAL ================= */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--linea)',
            borderRadius: '24px',
            padding: '36px 44px 32px 44px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 12px 36px rgba(19, 42, 82, 0.07)',
            marginBottom: '28px'
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
              fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
              fontWeight: 850,
              color: 'var(--marino)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 12px 0'
            }}>
              CONFIGURADOR VISUAL DE UNIFORMES
            </h1>

            {/* Subtítulo / Descripción */}
            <p style={{
              fontSize: '1rem',
              color: 'var(--texto-2)',
              maxWidth: '860px',
              lineHeight: 1.6,
              margin: 0,
              fontStyle: 'italic'
            }}>
              Diseña y personaliza tus prendas corporativas en tiempo real. Visualiza tu logotipo sobre prendas fotorrealistas y cotiza al mayoreo directamente con fábrica.
            </p>
          </div>

          {/* Componente del Configurador */}
          <div style={{ width: '100%' }}>
            <Configurator />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

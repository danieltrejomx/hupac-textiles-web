'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Configurator from '@/components/Configurator';

export default function ConfiguradorPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'transparent', minHeight: '85vh', paddingBottom: '40px' }}>
        {/* Header Compacto Centrado */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: '12px 24px',
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
              Configurador Visual de Uniformes
            </h1>

            <span style={{ 
              fontSize: '0.86rem', 
              color: '#cbd5e1',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>•</span> Sube tu logo, elige prenda y color corporativo, y visualiza tu uniforme al instante.
            </span>
          </div>
        </section>

        {/* Componente del Configurador */}
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 16px' }}>
          <Configurator />
        </div>
      </main>
      <Footer />
    </>
  );
}

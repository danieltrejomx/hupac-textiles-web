'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Configurator from '@/components/Configurator';

export default function ConfiguradorPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '40px' }}>
        {/* Header Compacto en Una Sola Línea */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: '10px 24px',
          textAlign: 'center'
        }}>
          <div style={{ 
            maxWidth: '1320px', 
            margin: '0 auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '10px 16px', 
            flexWrap: 'wrap' 
          }}>
            <span className="eyebrow" style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.1)', padding: '3px 10px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap' }}>
              🎨 PERSONALIZADOR EN TIEMPO REAL
            </span>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 850, margin: 0, color: '#ffffff', whiteSpace: 'nowrap' }}>
              Configurador Visual de Uniformes
            </h1>
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              — Sube tu logo, elige prenda y color corporativo, y visualiza tu uniforme al instante.
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

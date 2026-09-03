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
              Configurador Visual de Uniformes
            </h1>
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

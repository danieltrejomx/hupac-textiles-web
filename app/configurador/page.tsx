'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Configurator from '@/components/Configurator';

export default function ConfiguradorPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '80px' }}>
        {/* Header */}
        <section style={{
          background: 'linear-gradient(135deg, var(--marino) 0%, #1e293b 100%)',
          color: '#ffffff',
          padding: '48px 28px 48px 28px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '14px', fontSize: '0.9rem', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>Inicio</Link>
              <span>/</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Configurador</span>
            </div>

            <span className="eyebrow" style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: '12px' }}>
              Herramienta Interactiva HUPAC
            </span>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 850, margin: '0 0 12px 0', lineHeight: 1.2, color: '#ffffff' }}>
              Configurador Visual de Uniformes
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '720px', margin: '0 auto', lineHeight: 1.5 }}>
              Selecciona tu prenda, elige el color corporativo, sube tu logotipo, colócalo en la posición deseada y calcula tu cotización estimada al instante.
            </p>
          </div>
        </section>

        {/* Componente del Configurador */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 0 20px' }}>
          <Configurator />
        </div>
      </main>
      <Footer />
    </>
  );
}

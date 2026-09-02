'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Configurator from '@/components/Configurator';
import TypewriterTitle from '@/components/TypewriterTitle';

export default function ConfiguradorPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '40px' }}>
        {/* Header */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: 'clamp(20px, 2.5vh, 32px) 24px clamp(24px, 3vh, 36px) 24px',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ marginBottom: '8px', fontSize: '0.85rem', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>Inicio</Link>
              <span>/</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Configurador</span>
            </div>

            <span className="eyebrow" style={{ color: '#60a5fa', background: 'rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '8px', fontSize: '0.78rem' }}>
              🎨 Personalizador Interactivo en Tiempo Real
            </span>
            <TypewriterTitle
              text="Configurador Visual de Uniformes"
              as="h1"
              style={{ fontSize: 'clamp(1.6rem, 2.2vw, 2.2rem)', fontWeight: 850, margin: '0 0 8px 0', lineHeight: 1.2, color: '#ffffff' }}
            />
            <p style={{ fontSize: '0.94rem', color: '#cbd5e1', maxWidth: '720px', margin: '0 auto', lineHeight: 1.4 }}>
              Sube tu logotipo, elige prenda y color corporativo, y visualiza tu uniforme personalizado al instante.
            </p>
          </div>
        </section>

        {/* Componente del Configurador */}
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '16px 16px 0 16px' }}>
          <Configurator />
        </div>
      </main>
      <Footer />
    </>
  );
}

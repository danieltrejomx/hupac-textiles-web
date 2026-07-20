'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const secciones = document.querySelectorAll('section[id],div[id].nosotros,div[id].config-wrap');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setActiveSection(e.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    secciones.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav>
      <div className="nav-in">
        <Link href="/#inicio" className="logo">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z" fill="#132A52"/>
            <path d="M12 12h4v6h8v-6h4v16h-4v-6h-8v6h-4V12z" fill="#2456C4"/>
          </svg>
          HUPAC TEXTILES
        </Link>
        <div className="nav-links">
          <Link href="/#nosotros" className={`nav-btn ${activeSection === 'nosotros' ? 'act' : ''}`}>Nosotros</Link>
          <Link href="/#catalogo" className={`nav-btn ${activeSection === 'catalogo' ? 'act' : ''}`}>Catálogo</Link>
          <Link href="/#servicios" className={`nav-btn ${activeSection === 'servicios' ? 'act' : ''}`}>Servicios</Link>
          <Link href="/#configurador" className={`nav-btn ${activeSection === 'configurador' ? 'act' : ''}`}>Configurador</Link>
          <Link href="/#industrias" className={`nav-btn ${activeSection === 'industrias' ? 'act' : ''}`}>Industrias</Link>
          <Link href="/#distribuidores" className={`nav-btn ${activeSection === 'distribuidores' ? 'act' : ''}`}>Distribuidores</Link>
        </div>
        <Link href="/#cotizador" className="btn" style={{ padding: '10px 20px', fontSize: '13.5px', marginLeft: '10px' }}>
          Cotizar pedido
        </Link>
      </div>
    </nav>
  );
}

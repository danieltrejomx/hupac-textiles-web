'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const secciones = document.querySelectorAll('section[id],div[id].nosotros,div[id].config-wrap');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActiveSection(e.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secciones.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close menu on route change / scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const NAV_LINKS = [
    { href: '/#inicio', label: 'Inicio', id: 'inicio' },
    { href: '/#nosotros', label: 'Nosotros', id: 'nosotros' },
    { href: '/#catalogo', label: 'Catálogo', id: 'catalogo' },
    { href: '/#servicios', label: 'Servicios', id: 'servicios' },
    { href: '/#configurador', label: 'Configurador', id: 'configurador' },
    { href: '/#industrias', label: 'Industrias', id: 'industrias' },
    { href: '/#distribuidores', label: 'Distribuidores', id: 'distribuidores' },
  ];

  return (
    <>
      <nav>
        <div className="nav-in">
          {/* Logo */}
          <Link href="/#inicio" className="logo" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z" fill="#132A52"/>
              <path d="M12 12h4v6h8v-6h4v16h-4v-6h-8v6h-4V12z" fill="#2456C4"/>
            </svg>
            HUPAC TEXTILES
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <Link key={l.id} href={l.href} className={`nav-btn ${activeSection === l.id ? 'act' : ''}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                position: 'relative', background: '#f1f5f9', border: '1px solid #cbd5e1',
                borderRadius: '10px', padding: '8px 12px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                color: 'var(--marino)', fontWeight: 600, fontSize: '14px', flexShrink: 0
              }}
              aria-label="Abrir carrito de compras"
            >
              🛒
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  backgroundColor: 'var(--rey)', color: '#ffffff',
                  fontSize: '11px', fontWeight: 800, width: '20px', height: '20px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Cotizar — hidden on very small screens */}
            <Link href="/#cotizador" className="btn nav-cta" style={{ padding: '9px 16px', fontSize: '13px', flexShrink: 0, whiteSpace: 'nowrap' }}>
              Cotizar pedido
            </Link>

            {/* Hamburger — visible on tablet/mobile */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
              <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
              <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu drawer */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.id}
              href={l.href}
              className={`mobile-nav-btn ${activeSection === l.id ? 'act' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--linea)', paddingTop: '16px' }}>
            <Link href="/#cotizador" className="btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
              Cotizar pedido
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

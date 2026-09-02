'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { IconSearch, IconCart } from '@/components/Icons';

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navQuery, setNavQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (pathname !== '/') return;
    const secciones = document.querySelectorAll('section[id],div[id].nosotros,div[id].config-wrap');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActiveSection(e.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    secciones.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Close menu on route change / scroll
  useEffect(() => {
    if (menuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, isSearchOpen]);

  const NAV_LINKS = [
    { href: '/', label: 'Inicio', id: 'inicio', path: '/' },
    { href: '/catalogo', label: 'Catálogo', id: 'catalogo', path: '/catalogo' },
    { href: '/configurador', label: 'Configurador', id: 'configurador', path: '/configurador' },
    { href: '/nosotros', label: 'Nosotros', id: 'nosotros', path: '/nosotros' },
    { href: '/servicios', label: 'Servicios', id: 'servicios', path: '/servicios' },
    { href: '/industrias', label: 'Industrias', id: 'industrias', path: '/industrias' },
    { href: '/distribuidores', label: 'Distribuidores', id: 'distribuidores', path: '/distribuidores' },
  ];

  const isLinkActive = (l: typeof NAV_LINKS[0]) => {
    if (l.path === '/catalogo' && pathname === '/catalogo') return true;
    if (l.path === '/nosotros' && pathname === '/nosotros') return true;
    if (l.path === '/servicios' && pathname === '/servicios') return true;
    if (l.path === '/configurador' && pathname === '/configurador') return true;
    if (l.path === '/industrias' && pathname === '/industrias') return true;
    if (l.path === '/distribuidores' && pathname === '/distribuidores') return true;
    if (pathname === '/' && activeSection === l.id) return true;
    if (pathname === '/' && !activeSection && l.id === 'inicio') return true;
    return false;
  };

  const navSearchResults = navQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = navQuery.toLowerCase().trim();
        return (
          p.nombre.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.composicion?.toLowerCase().includes(q) ||
          p.categoria?.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <>
      <nav>
        <div className="nav-in">
          {/* Logo */}
          <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z" fill="#132A52"/>
              <path d="M12 12h4v6h8v-6h4v16h-4v-6h-8v6h-4V12z" fill="#2456C4"/>
            </svg>
            HUPAC TEXTILES
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <Link key={l.id} href={l.href} className={`nav-btn ${isLinkActive(l) ? 'act' : ''}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            
            {/* Lupa / Botón de Búsqueda */}
            <button
              onClick={() => setIsSearchOpen(true)}
              style={{
                position: 'relative',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--marino)',
                fontWeight: 700,
                fontSize: '14px',
                flexShrink: 0
              }}
              aria-label="Buscar productos"
              title="Buscar productos"
            >
              <IconSearch size={16} color="var(--marino)" />
              <span style={{ fontSize: '13px', color: '#475569' }}>Buscar</span>
            </button>

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
              <IconCart size={18} color="var(--marino)" />
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

      {/* ================= MODAL GLOBAL DE BÚSQUEDA CON LUPA ================= */}
      {isSearchOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '60px 20px 20px 20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
            border: '1px solid #cbd5e1',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Header del Modal con Campo de Búsqueda */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <IconSearch size={20} color="var(--marino)" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={navQuery}
                  onChange={(e) => setNavQuery(e.target.value)}
                  placeholder="Escribe el producto, código SKU o tipo (ej: polo, bota, chaleco)..."
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--marino)',
                    outline: 'none',
                    paddingRight: '40px'
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setNavQuery('');
                  }}
                  style={{
                    backgroundColor: '#e2e8f0',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    color: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    flexShrink: 0
                  }}
                  title="Cerrar búsqueda"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Lista de Resultados del Modal */}
            <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              {navQuery.trim() ? (
                navSearchResults.length > 0 ? (
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '14px' }}>
                      {navSearchResults.length} PRODUCTOS ENCONTRADOS
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {navSearchResults.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/productos/${prod.id}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setNavQuery('');
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#ffffff',
                            textDecoration: 'none',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                            e.currentTarget.style.borderColor = '#bfdbfe';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.borderColor = '#e2e8f0';
                          }}
                        >
                          <div style={{ width: '56px', height: '56px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', flexShrink: 0 }}>
                            <img src={prod.imagenPrincipal} alt={prod.nombre} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ fontSize: '0.72rem', color: 'var(--rey)', fontWeight: 800, fontFamily: 'var(--mono)', display: 'block' }}>
                              ESTILO {prod.sku}
                            </span>
                            <b style={{ color: 'var(--marino)', fontSize: '0.98rem', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {prod.nombre}
                            </b>
                            <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block' }}>
                              {prod.composicion || 'Alta Calidad HUPAC'}
                            </span>
                          </div>
                          {prod.precioDirecto ? (
                            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--marino)', flexShrink: 0 }}>
                              ${prod.precioDirecto.toFixed(2)}
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '36px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                      <IconSearch size={32} color="var(--marino)" />
                    </div>
                    <b style={{ color: 'var(--marino)', display: 'block', fontSize: '1.05rem', marginBottom: '4px' }}>
                      No se encontraron resultados para &quot;{navQuery}&quot;
                    </b>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                      Prueba buscando palabras como &quot;polo&quot;, &quot;bota&quot;, &quot;casco&quot; o &quot;chaleco&quot;.
                    </span>
                  </div>
                )
              ) : (
                <div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '12px' }}>
                    BÚSQUEDAS POPULARES
                  </span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['Playera Polo', 'Calzado Duty Gear', 'Chaleco Industrial', 'Bata Médica', 'Casco de Seguridad', 'Lentes'].map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setNavQuery(term)}
                        style={{
                          backgroundColor: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          borderRadius: '20px',
                          padding: '6px 14px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: 'var(--marino)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <IconSearch size={13} color="var(--rey)" /> {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
              className={`mobile-nav-btn ${isLinkActive(l) ? 'act' : ''}`}
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

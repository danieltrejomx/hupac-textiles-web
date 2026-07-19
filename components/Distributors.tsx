'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Distributors() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    if (ref.current) {
      const rvs = ref.current.querySelectorAll('.rv');
      rvs.forEach((el) => observer.observe(el));
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="distribuidores" style={{ paddingTop: '24px' }} ref={ref}>
      <div className="dist rv">
        <div>
          <span className="eyebrow" style={{ color: '#8FC1EA' }}>Red de distribuidores</span>
          <h2>Beneficios de comprar con nosotros.</h2>
          <p>Somos fabricantes: tus márgenes empiezan en la fábrica. Únete a la red de distribuidores HUPAC y crece con producción nacional y reposición rápida.</p>
          <Link href="#cotizador" className="btn" style={{ background: '#fff', color: 'var(--marino)' }}>Quiero ser distribuidor</Link>
        </div>
        <div className="dist-ben">
          <div className="dben">
            <div className="ic">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div><b>Precios de fábrica</b><span>Compra directo al fabricante con precios escalonados por volumen.</span></div>
          </div>
          <div className="dben">
            <div className="ic">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z"/>
              </svg>
            </div>
            <div><b>Cobertura nacional e internacional</b><span>Distribución en cadenas comerciales de México y clientes en el extranjero.</span></div>
          </div>
          <div className="dben">
            <div className="ic">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="M3 8l9 5 9-5M12 13v8"/>
              </svg>
            </div>
            <div><b>Stock disponible</b><span>Inventario de línea permanente para reposición inmediata.</span></div>
          </div>
          <div className="dben">
            <div className="ic">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v14M12 16l-3-3M12 16l3-3M4 20h16"/>
              </svg>
            </div>
            <div><b>Bordados industriales</b><span>Personalización interna: bordado, serigrafía, sublimación, DTG y transfer.</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

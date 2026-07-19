'use client';
import { useEffect, useRef } from 'react';

export default function Services() {
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
    <section id="servicios" style={{ paddingTop: '40px' }} ref={ref}>
      <div className="sec-head rv">
        <span className="eyebrow">Soluciones textiles integrales</span>
        <h2>Cinco técnicas de decoración. Un solo proveedor.</h2>
        <p>Bordado, estampado, lavado y planchado con alta calidad y a un precio justo. Te ayudamos a elegir la técnica ideal según la composición de tu prenda.</p>
      </div>
      <div className="tecnicas">
        <div className="tec rv">
          <div className="ic">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2v14M12 16l-3-3M12 16l3-3"/><path d="M4 20h16"/>
            </svg>
          </div>
          <b>Bordado</b>
          <span>Diseño en relieve con hilos de color. Alta durabilidad y acabado premium. Más de 2 millones realizados.</span>
        </div>
        <div className="tec rv">
          <div className="ic">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 12h18"/>
            </svg>
          </div>
          <b>Serigrafía</b>
          <span>El método más económico para grandes cantidades con reproducción rápida y fiel.</span>
        </div>
        <div className="tec rv">
          <div className="ic">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="4"/>
            </svg>
          </div>
          <b>Impresión directa</b>
          <span>DTG con calidad fotográfica y tacto mínimo sobre la tela.</span>
        </div>
        <div className="tec rv">
          <div className="ic">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3c3 4 6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 3-6 6-10Z"/>
            </svg>
          </div>
          <b>Sublimación</b>
          <span>Tinta que penetra la fibra de poliéster: color total, sin relieve.</span>
        </div>
        <div className="tec rv">
          <div className="ic">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 17h16M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10"/><path d="M9 21h6"/>
            </svg>
          </div>
          <b>Termotransferencia</b>
          <span>Calor y presión para impresiones nítidas, legibles y de larga vida.</span>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useEffect, useRef } from 'react';

export default function Industries() {
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
    <section id="industrias" ref={ref}>
      <div className="sec-head rv">
        <span className="eyebrow">Tipos de uniformes por sector</span>
        <h2>Un uniforme para cada operación.</h2>
        <p>Configuramos paquetes de prendas por sector, con las tallas, telas y personalización que tu equipo necesita.</p>
      </div>
      <div className="grid-ind">
        <div className="ind rv">
          <div className="ic">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </div>
          <b>Administrativo</b>
          <span>Camisas, pantalones ejecutivos y blazers.</span>
        </div>
        <div className="ind rv">
          <div className="ic">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 4v16M4 12h16"/><circle cx="12" cy="12" r="9"/>
            </svg>
          </div>
          <b>Médico</b>
          <span>Filipinas, batas y pantalones clínicos.</span>
        </div>
        <div className="ind rv">
          <div className="ic">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 20h18M5 20V9l7-5 7 5v11"/><path d="M10 20v-6h4v6"/>
            </svg>
          </div>
          <b>Industrial</b>
          <span>Overoles, chalecos y uniformes de campo.</span>
        </div>
        <div className="ind rv">
          <div className="ic">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 21V10a8 8 0 0 1 16 0v11"/><path d="M2 21h20"/>
            </svg>
          </div>
          <b>Restaurantes</b>
          <span>Camisolas, chalecos, pantalón y mandiles.</span>
        </div>
        <div className="ind rv">
          <div className="ic">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="7" width="13" height="10" rx="1.5"/><path d="M15 10h4l3 3v4h-7"/><circle cx="6.5" cy="19" r="1.8"/><circle cx="18.5" cy="19" r="1.8"/>
            </svg>
          </div>
          <b>Centros logísticos</b>
          <span>Camisola, pantalón, chaleco, casco, guantes y lentes.</span>
        </div>
      </div>
    </section>
  );
}

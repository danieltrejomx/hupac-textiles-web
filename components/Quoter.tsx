'use client';
import { useEffect, useRef } from 'react';

export default function Quoter() {
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
    <section id="cotizador" style={{ paddingTop: '24px' }} ref={ref}>
      <div className="cotiza rv">
        <span className="eyebrow" style={{ justifyContent: 'center' }}>Cotizador</span>
        <h2>Cotiza tu uniforme en tres pasos.</h2>
        <p>Cuéntanos qué necesitas y nuestro equipo comercial te responde con precio, tiempo de fabricación y propuesta de personalización.</p>
        <div className="cotiza-pasos">
          <div className="paso"><span className="n">1</span><div><b>Define tu pedido</b><span>Prenda, cantidades, tallas y colores.</span></div></div>
          <div className="paso"><span className="n">2</span><div><b>Comparte tu logotipo</b><span>Bordado, serigrafía, sublimación, DTG o transfer.</span></div></div>
          <div className="paso"><span className="n">3</span><div><b>Recibe tu propuesta</b><span>Precio de fábrica, tiempos y muestras.</span></div></div>
        </div>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn ws" id="btnWhats" href="https://wa.me/525612870780" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm5.6 14.2c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.6.7-.4 1 .6 1 1.3 1.8 2.2 2.4.7.4 1.1.6 1.3.4.2-.1.7-.8.9-1.1.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.4 0 .1 0 .7-.2 1.5Z"/>
            </svg>
            Cotizar por WhatsApp
          </a>
          <a className="btn sec" href="mailto:diviciontextiles@grupohupac.com?subject=Solicitud%20de%20cotizaci%C3%B3n%20HUPAC%20TEXTILES">Cotizar por correo</a>
        </div>
        <p className="nota" style={{ marginTop: '22px' }}>Tel. 55 1625 7933 · WhatsApp 56 1287 0780</p>
      </div>
    </section>
  );
}

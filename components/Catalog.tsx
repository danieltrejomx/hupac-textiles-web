'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';

export default function Catalog() {
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
    <section id="catalogo" ref={ref}>
      <div className="sec-head rv">
        <span className="eyebrow">Catálogo corporativo 2025</span>
        <h2>Prendas de línea, listas para personalizar.</h2>
        <p>Haz clic en cualquier producto para seleccionar talla, variante de color, ficha técnica o enviar una cotización directa.</p>
      </div>
      <div className="grid-prod">
        {PRODUCTS.map((prod) => (
          <Link key={prod.id} href={`/productos/${prod.id}`} className="prod-card-link" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <article className="prod rv" style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
              <div className="prod-foto">
                <img src={prod.imagenPrincipal} alt={prod.nombre} />
                <span className="prod-tag">{prod.estilo}</span>
              </div>
              <div className="prod-info">
                <h3>{prod.nombre}</h3>
                <span className="prod-spec">{prod.composicion} · {prod.gramaje}</span>
                <span className="prod-spec" style={{ color: 'var(--rey)', fontWeight: 600, marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Ver detalles y colores &rarr;
                </span>
                <div className="prod-colores" style={{ marginTop: '12px' }}>
                  {prod.colores.map((c, i) => (
                    <span 
                      key={i} 
                      className="cdot" 
                      style={{ background: c.hex, border: c.hex === '#FFFFFF' ? '1px solid #cbd5e1' : 'none' }}
                      title={c.nombre}
                    />
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

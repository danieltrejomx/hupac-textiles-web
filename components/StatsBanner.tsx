'use client';
import { useEffect, useRef } from 'react';

function fmt(v: number, div: number, suf: string) {
  const x = v / div;
  return (x % 1 === 0 ? x.toFixed(0) : x.toFixed(1)).replace('.', ',') + suf;
}

export default function StatsBanner() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        observer.unobserve(e.target);
        
        const el = e.target as HTMLElement;
        const v = +(el.dataset.v || 0);
        const div = +(el.dataset.div || 1);
        const suf = el.dataset.suf || '';

        if (reduce) {
          el.textContent = fmt(v, div, suf);
          return;
        }

        const t0 = performance.now();
        const dur = 1800;

        function tick(now: number) {
          const p = Math.min((now - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.round(v * ease), div, suf);
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });

    if (statsRef.current) {
      const cnts = statsRef.current.querySelectorAll('.cnt');
      cnts.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="cifras" aria-label="Cifras de HUPAC TEXTILES" ref={statsRef}>
      <div className="cifras-in">
        <div className="cifra"><b><span className="cnt" data-v="43000" data-suf=" mil" data-div="1000">0</span>+</b><span>clientes atendidos</span></div>
        <div className="cifra"><b><span className="cnt" data-v="7000000" data-suf=" M" data-div="1000000">0</span>+</b><span>prendas confeccionadas</span></div>
        <div className="cifra"><b><span className="cnt" data-v="2000000" data-suf=" M" data-div="1000000">0</span>+</b><span>bordados realizados</span></div>
        <div className="cifra"><b><span className="cnt" data-v="800000" data-suf=" mil" data-div="1000">0</span></b><span>estampados producidos</span></div>
        <div className="cifra"><b><span className="cnt" data-v="1500000" data-suf=" M" data-div="1000000">0</span>+</b><span>prendas sublimadas</span></div>
      </div>
    </div>
  );
}

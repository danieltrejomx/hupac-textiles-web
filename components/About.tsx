'use client';
import { useEffect, useRef } from 'react';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

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
    <div id="nosotros" className="nosotros" ref={ref}>
      <div className="nos-grid">
        <div className="rv">
          <span className="eyebrow">¿Quiénes somos?</span>
          <h2>Más de 21 años transformando fibras en identidad.</h2>
          <p>Somos <strong>HUPAC TEXTILES</strong>, una empresa 100% mexicana con inicio de operaciones en 2005, especializada en la confección de uniformes empresariales que destacan por su calidad, estilo y funcionalidad. Transformamos fibras de algodón y sintéticas para brindar a nuestros distribuidores y sus clientes prendas funcionales, cómodas y durables.</p>
          <p>Fabricamos hilados, tejidos, acabados y prendas de vestir para toda la familia — nuestra fortaleza es el <strong>tejido de punto</strong>. Hemos confeccionado más de <strong>7 millones de prendas</strong> para más de <strong>43 mil clientes</strong>, con distribución en cadenas comerciales nacionales y clientes internacionales.</p>
          <p className="frase">Diseñamos identidad,<br/>confeccionamos confianza.</p>
        </div>
        <div className="valores rv">
          <div className="valor"><b>Calidad sin compromiso</b><span>La excelencia es nuestra base, desde la prenda hasta la atención.</span></div>
          <div className="valor"><b>Compromiso</b><span>Damos lo mejor en cada proyecto y en cada entrega.</span></div>
          <div className="valor"><b>Innovación continua</b><span>Evolucionamos procesos, diseños y servicios constantemente.</span></div>
          <div className="valor"><b>Integridad</b><span>Actuamos con ética, transparencia y rectitud.</span></div>
          <div className="valor"><b>Sinergia</b><span>Construimos en equipo para lograr más, juntos.</span></div>
          <div className="valor"><b>Cumplimiento legal y ambiental</b><span>Operamos conforme a la ley, cuidando el entorno y a nuestra gente.</span></div>
        </div>
      </div>
    </div>
  );
}

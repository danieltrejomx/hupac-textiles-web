'use client';
import { useEffect, useRef } from 'react';

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
        <p>Cada estilo con su ficha técnica: composición, gramaje, tallas CH a 2EG y técnicas de decoración compatibles. Fotografías del catálogo oficial HUPAC.</p>
      </div>
      <div className="grid-prod">
        <article className="prod rv">
          <div className="prod-foto"><img src="/images/img_3.webp" alt="Playera Max cuello redondo turquesa, caballero"/><span className="prod-tag">ESTILO 32603</span></div>
          <div className="prod-info">
            <h3>Playera Max · Cuello redondo</h3>
            <span className="prod-spec">100% algodón · 190 g/m² · CH–2EG</span>
            <span className="prod-spec">Impresión directa · Serigrafía · Termotransferencia</span>
            <div className="prod-colores"><span className="cdot" style={{background:'#fff'}}></span><span className="cdot" style={{background:'#132A52'}}></span><span className="cdot" style={{background:'#2456C4'}}></span><span className="cdot" style={{background:'#8A97A6'}}></span><span className="cdot" style={{background:'#B22234'}}></span><span className="cdot" style={{background:'#17222B'}}></span></div>
          </div>
        </article>
        <article className="prod rv">
          <div className="prod-foto"><img src="/images/img_4.webp" alt="Playera Prime negra cuello redondo, caballero"/><span className="prod-tag">ESTILO 32702</span></div>
          <div className="prod-info">
            <h3>Playera Prime · Peso medio</h3>
            <span className="prod-spec">100% algodón · 155 g/m² · CH–2EG</span>
            <span className="prod-spec">17 colores de línea · Dama, caballero, infantil y juvenil</span>
            <div className="prod-colores"><span className="cdot" style={{background:'#fff'}}></span><span className="cdot" style={{background:'#17222B'}}></span><span className="cdot" style={{background:'#132A52'}}></span><span className="cdot" style={{background:'#2456C4'}}></span><span className="cdot" style={{background:'#C7D3DE'}}></span><span className="cdot" style={{background:'#6B7A28'}}></span></div>
          </div>
        </article>
        <article className="prod rv">
          <div className="prod-foto"><img src="/images/img_5.webp" alt="Polo heather caballero, estilo 32633"/><span className="prod-tag">ESTILO 32633</span></div>
          <div className="prod-info">
            <h3>Polo Caballero · Cuello tejido</h3>
            <span className="prod-spec">100% algodón · 230 g/m² · Aletilla 3 botones</span>
            <span className="prod-spec">Compatible con bordado de logotipo</span>
            <div className="prod-colores"><span className="cdot" style={{background:'#C7D3DE'}}></span><span className="cdot" style={{background:'#fff'}}></span><span className="cdot" style={{background:'#132A52'}}></span><span className="cdot" style={{background:'#2456C4'}}></span><span className="cdot" style={{background:'#67C3CF'}}></span><span className="cdot" style={{background:'#B22234'}}></span></div>
          </div>
        </article>
        <article className="prod rv">
          <div className="prod-foto"><img src="/images/img_6.webp" alt="Polo asiluetada dama blanca, estilo 32626"/><span className="prod-tag">ESTILO 32626</span></div>
          <div className="prod-info">
            <h3>Polo Asiluetada · Dama</h3>
            <span className="prod-spec">100% algodón · 230 g/m² · Aletilla 4 botones al tono</span>
            <span className="prod-spec">Corte para una figura más femenina</span>
            <div className="prod-colores"><span className="cdot" style={{background:'#fff'}}></span><span className="cdot" style={{background:'#132A52'}}></span><span className="cdot" style={{background:'#2456C4'}}></span><span className="cdot" style={{background:'#F3C4D3'}}></span><span className="cdot" style={{background:'#67C3CF'}}></span><span className="cdot" style={{background:'#5A2D63'}}></span></div>
          </div>
        </article>
        <article className="prod rv">
          <div className="prod-foto"><img src="/images/img_7.webp" alt="Polo manga corta Supreme tela piqué, estilo 36980"/><span className="prod-tag">ESTILO 36980</span></div>
          <div className="prod-info">
            <h3>Polo Supreme · Tela piqué</h3>
            <span className="prod-spec">50% algodón peinado / 50% poliéster · 210 g/m²</span>
            <span className="prod-spec">Hombros reforzados · Aberturas laterales · Nuevo fit regular</span>
            <div className="prod-colores"><span className="cdot" style={{background:'#fff'}}></span><span className="cdot" style={{background:'#C7D3DE'}}></span><span className="cdot" style={{background:'#132A52'}}></span><span className="cdot" style={{background:'#2456C4'}}></span><span className="cdot" style={{background:'#B22234'}}></span><span className="cdot" style={{background:'#3A3F46'}}></span></div>
          </div>
        </article>
        <article className="prod rv">
          <div className="prod-foto"><img src="/images/img_8.webp" alt="Camisa manga corta dama con pantalón de mezclilla"/><span className="prod-tag">ESTILOS 35000 / 55152</span></div>
          <div className="prod-info">
            <h3>Camisa + Pantalón · Uniforme completo</h3>
            <span className="prod-spec">Camisa algodón/poliéster 145 g/m² · Mezclilla 12–14 oz/yd²</span>
            <span className="prod-spec">Gabardina o mezclilla · Dama y caballero · Bordado</span>
            <div className="prod-colores"><span className="cdot" style={{background:'#fff'}}></span><span className="cdot" style={{background:'#AECDE8'}}></span><span className="cdot" style={{background:'#132A52'}}></span><span className="cdot" style={{background:'#A99A6B'}}></span><span className="cdot" style={{background:'#27364B'}}></span></div>
          </div>
        </article>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const HERO_SLIDES = [
  {
    src: '/images/hero_slide_1.jpg',
    alt: 'Camisa ejecutiva de vestir y línea corporativa HUPAC TEXTILES',
    title: 'Línea Corporativa y Ejecutiva',
    subtitle: 'Camisas de vestir para oficinas y clientes corporativos'
  },
  {
    src: '/images/hero_slide_2.jpg',
    alt: 'Uniformes de seguridad e industriales HUPAC',
    title: 'Línea Industrial y Seguridad',
    subtitle: 'Confeccionados para trabajo pesado y uso rudo'
  },
  {
    src: '/images/hero_slide_3.jpg',
    alt: 'Prendas de alta visibilidad y logística HUPAC',
    title: 'Línea Logística y Alta Visibilidad',
    subtitle: 'Chalecos y prendas de alta visibilidad para supervisión'
  },
  {
    src: '/images/hero_slide_4.jpg',
    alt: 'Chalecos de trabajo y uniformes de almacén HUPAC',
    title: 'Línea Operativa y Almacén',
    subtitle: 'Chalecos multibolsillos y equipo para montacarguistas'
  },
  {
    src: '/images/hero_slide_5.jpg',
    alt: 'Batas y uniformes médicos y de salud HUPAC',
    title: 'Línea Médica y Sanitaria',
    subtitle: 'Batas, filipinas y uniformes para clínicas y hospitales'
  },
  {
    src: '/images/hero_slide_6.jpg',
    alt: 'Uniformes para estaciones de servicio y gasolineras HUPAC',
    title: 'Línea de Servicio y Mantenimiento',
    subtitle: 'Uniformes durables para estaciones de servicio y campo'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section id="inicio" className="hero">
      <div>
        <span className="badge-mx"><i></i> 100% Hecho en México</span>
        <h1>Tu negocio con una imagen superior.</h1>
        <p className="lead">Fabricamos y personalizamos uniformes empresariales que transmiten confianza, orgullo y profesionalismo en cada hilo.</p>
        <div className="hero-ctas">
          <Link href="#catalogo" className="btn">Ver catálogo de línea</Link>
          <Link href="#cotizador" className="btn sec">Cotizar para mi equipo</Link>
        </div>
        <div className="stats">
          <div><b>21</b><span>Años de<br/>experiencia</span></div>
          <div><b>7 M</b><span>Prendas<br/>entregadas</span></div>
          <div><b>43 k</b><span>Clientes<br/>satisfechos</span></div>
          <div><b>100%</b><span>Producción<br/>nacional</span></div>
        </div>
      </div>
      <div className="hero-visual">
        <div 
          className="hero-foto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {HERO_SLIDES.map((slide, idx) => (
            <div 
              key={slide.src}
              className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
            >
              <img className="hero-slide-bg" src={slide.src} alt="" aria-hidden="true" />
              <img className="hero-slide-fg" src={slide.src} alt={slide.alt} />
            </div>
          ))}

          {/* Flechas de navegación */}
          <button 
            type="button"
            className="hero-arrow prev" 
            onClick={prevSlide}
            aria-label="Imagen anterior"
          >
            &#10094;
          </button>
          <button 
            type="button"
            className="hero-arrow next" 
            onClick={nextSlide}
            aria-label="Siguiente imagen"
          >
            &#10095;
          </button>

          {/* Indicadores / Puntos */}
          <div className="hero-dots">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`hero-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Ver imagen ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Tarjeta informativa ubicada por DEBAJO del recuadro de la foto */}
        <div className="hero-caption">
          <div className="dot">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <b>{HERO_SLIDES[currentSlide].title}</b>
            <span>{HERO_SLIDES[currentSlide].subtitle}</span>
          </div>
        </div>
      </div>
    </section>
  );
}




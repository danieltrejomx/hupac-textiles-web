import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
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
        <div className="hero-foto">
          <img src="/images/img_2.webp" alt="Personal de HUPAC TEXTILES con uniformes de línea"/>
          <div className="hero-card">
            <div className="dot">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <div>
              <b>Distribución nacional e internacional</b>
              <span>Cadenas comerciales y clientes corporativos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

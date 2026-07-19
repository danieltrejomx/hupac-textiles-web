import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="foot-in">
        <div className="foot-brand">
          <Link href="#inicio" className="logo" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
            <img src="/images/img_9.png" alt="HUPAC TEXTILES" style={{ width: '150px', objectFit: 'contain' }}/>
          </Link>
          <p>Av. Laguna Luna 30, Col. Cumbria,<br/>Cuautitlán Izcalli, Estado de México, C.P. 54740.</p>
          <span className="badge-mx" style={{ margin: 0 }}><i></i> 100% Hecho en México</span>
        </div>
        <div>
          <h5>Sitio</h5>
          <Link href="#nosotros">Nosotros</Link>
          <Link href="#catalogo">Catálogo</Link>
          <Link href="#configurador">Configurador</Link>
          <Link href="#distribuidores">Distribuidores</Link>
        </div>
        <div>
          <h5>Personalización</h5>
          <Link href="#servicios">Bordado industrial</Link>
          <Link href="#servicios">Serigrafía</Link>
          <Link href="#servicios">Sublimación</Link>
          <Link href="#servicios">Impresión directa</Link>
        </div>
        <div>
          <h5>Contacto</h5>
          <a href="tel:+525516257933">55 1625 7933</a>
          <a href="https://wa.me/525612870780" target="_blank" rel="noopener noreferrer">WhatsApp 56 1287 0780</a>
          <a href="mailto:diviciontextiles@grupohupac.com">diviciontextiles@grupohupac.com</a>
          <a href="https://www.hupactextiles.mx" target="_blank" rel="noopener noreferrer">www.hupactextiles.mx</a>
        </div>
      </div>
      <div className="legal">
        <span>© {new Date().getFullYear()} HUPAC TEXTILES · Grupo HUPAC</span>
        <span>&quot;Nuestro negocio es tu imagen&quot;</span>
      </div>
    </footer>
  );
}

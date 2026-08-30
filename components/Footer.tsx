import Link from 'next/link';
import { IconPhone, IconWhatsApp, IconMail, IconGlobe } from '@/components/Icons';

export default function Footer() {
  return (
    <footer>
      <div className="foot-in">
        <div className="foot-brand">
          <Link href="/#inicio" className="logo" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
            <img src="/images/img_9.png" alt="HUPAC TEXTILES" style={{ width: '150px', objectFit: 'contain' }}/>
          </Link>
          <p>Av. Laguna Luna 30, Col. Cumbria,<br/>Cuautitlán Izcalli, Estado de México, C.P. 54740.</p>
          <span className="badge-mx" style={{ margin: 0 }}><i></i> 100% Hecho en México</span>
        </div>
        <div>
          <h5>Sitio</h5>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/configurador">Configurador</Link>
          <Link href="/industrias">Industrias</Link>
          <Link href="/distribuidores">Distribuidores</Link>
        </div>
        <div>
          <h5>Personalización</h5>
          <Link href="/servicios">Bordado industrial</Link>
          <Link href="/servicios">Serigrafía</Link>
          <Link href="/servicios">Sublimación</Link>
          <Link href="/servicios">Impresión directa (DTG)</Link>
          <Link href="/servicios">Termotransferencia (DTF)</Link>
        </div>
        <div>
          <h5>Contacto</h5>
          <a href="tel:+525516257933" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconPhone size={14} color="#94a3b8" />
            55 1625 7933
          </a>
          <a href="https://wa.me/525516257933" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconWhatsApp size={14} color="#22c55e" />
            WhatsApp 55 1625 7933
          </a>
          <a href="mailto:diviciontextiles@grupohupac.com" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconMail size={14} color="#94a3b8" />
            diviciontextiles@grupohupac.com
          </a>
          <a href="https://www.hupactextiles.mx" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconGlobe size={14} color="#94a3b8" />
            www.hupactextiles.mx
          </a>
        </div>
      </div>
      <div className="legal">
        <span>© {new Date().getFullYear()} HUPAC TEXTILES · Grupo HUPAC</span>
        <span>&quot;Nuestro negocio es tu imagen&quot;</span>
      </div>
    </footer>
  );
}

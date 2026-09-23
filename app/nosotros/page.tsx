import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NosotrosPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'transparent', minHeight: '85vh' }}>
        <div style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '40px 24px 64px 24px',
        }}>

          {/* Título */}
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 850,
            color: 'var(--marino)',
            textAlign: 'center',
            margin: '0 0 10px 0',
            letterSpacing: '-0.01em'
          }}>
            HUPAC TEXTILES
          </h1>

          {/* Subtítulo */}
          <p style={{
            textAlign: 'center',
            fontStyle: 'italic',
            color: 'var(--texto-2)',
            fontSize: '0.95rem',
            margin: '0 0 36px 0'
          }}>
            Más de 21 años creando soluciones textiles que proyectan tu marca.
          </p>

          {/* MISIÓN */}
          <h2 style={{ fontSize: '1rem', fontWeight: 850, color: 'var(--marino)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            MISIÓN
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--texto)', margin: '0 0 28px 0' }}>
            Transformamos la identidad de las empresas en uniformes y soluciones textiles de calidad, combinando diseño, funcionalidad y personalización para proyectar la mejor imagen de cada cliente.
          </p>

          {/* VISIÓN */}
          <h2 style={{ fontSize: '1rem', fontWeight: 850, color: 'var(--marino)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            VISIÓN
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--texto)', margin: '0 0 28px 0' }}>
            Ser el aliado estratégico de las empresas en soluciones textiles, reconocidos por nuestra calidad, innovación y servicio, llevando la imagen de nuestros clientes a nuevos niveles.
          </p>

          {/* VALORES */}
          <h2 style={{ fontSize: '1rem', fontWeight: 850, color: 'var(--marino)', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            VALORES
          </h2>
          <ul style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--texto)', margin: '0 0 28px 0', paddingLeft: '20px' }}>
            <li><strong>Calidad:</strong> Cada detalle cuenta. Creamos prendas que cumplen y superan expectativas.</li>
            <li><strong>Compromiso:</strong> Tu proyecto es nuestro compromiso. Respondemos con responsabilidad y cumplimiento.</li>
            <li><strong>Confianza:</strong> Construimos relaciones duraderas con transparencia y profesionalismo.</li>
            <li><strong>Innovación:</strong> Evolucionamos para ofrecer soluciones textiles que destacan.</li>
            <li><strong>Servicio:</strong> Escuchamos, entendemos y creamos soluciones a la medida de cada cliente.</li>
          </ul>

          {/* POLÍTICA DE CALIDAD */}
          <h2 style={{ fontSize: '1rem', fontWeight: 850, color: 'var(--marino)', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            POLÍTICA DE CALIDAD
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--texto)', margin: '0 0 16px 0' }}>
            En HUPAC TEXTILES trabajamos para ofrecer uniformes y soluciones textiles que cumplan con las expectativas de nuestros clientes, mediante procesos enfocados en la calidad, el cumplimiento y la mejora continua.
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--texto)', margin: '0 0 32px 0' }}>
            Con más de 21 años de experiencia, asumimos el compromiso de brindar productos confiables, atención personalizada y soluciones que fortalezcan la imagen de cada empresa.
          </p>

          {/* CTA */}
          <p style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.98rem', color: 'var(--marino)', margin: 0 }}>
            Hagamos que tu marca destaque. Solicita una cotización.
          </p>

        </div>
      </main>
      <Footer />
    </>
  );
}

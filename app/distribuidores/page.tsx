'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterTitle from '@/components/TypewriterTitle';
import { IconPriceTag, IconBox, IconSparkles, IconTruck } from '@/components/Icons';

export default function DistribuidoresPage() {
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [estado, setEstado] = useState('Estado de México');
  const [interes, setInteres] = useState('Textiles y Calzado');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = encodeURIComponent(
      `Hola, me interesa ser Distribuidor HUPAC.\n\n*Nombre:* ${nombre}\n*Empresa:* ${empresa}\n*Teléfono:* ${telefono}\n*Correo:* ${correo}\n*Estado:* ${estado}\n*Línea de Interés:* ${interes}`
    );
    window.open(`https://wa.me/525516257933?text=${mensaje}`, '_blank');
    setEnviado(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '85vh', paddingBottom: '80px' }}>
        {/* Header Compacto Centrado */}
        <section style={{
          background: 'var(--marino)',
          color: '#ffffff',
          padding: '12px 24px 20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center'
        }}>
          <div style={{ 
            maxWidth: '1320px', 
            margin: '0 auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '10px 18px', 
            flexWrap: 'wrap',
            textAlign: 'center'
          }}>
            <h1 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 850, 
              margin: 0, 
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center'
            }}>
              Tus márgenes de ganancia empiezan en la fábrica
            </h1>

            <span style={{ 
              fontSize: '0.86rem', 
              color: '#cbd5e1',
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>•</span> Precios por volumen directo de planta y muestras para licitaciones.
            </span>
          </div>
        </section>

        <div style={{ maxWidth: '1200px', margin: '-10px auto 0 auto', padding: '0 24px' }}>
          {/* Formulario y Requisitos */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--linea)',
            borderRadius: '24px',
            padding: '24px 32px 32px 32px',
            boxShadow: '0 4px 20px rgba(19, 42, 82, 0.04)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '36px'
          }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--rey)', marginBottom: '10px' }}>Inicia hoy</span>
              <h2 style={{ fontSize: '2rem', color: 'var(--marino)', margin: '0 0 16px 0', lineHeight: 1.3 }}>
                Solicita tu registro como Distribuidor Autorizado
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--texto-2)', lineHeight: 1.6, marginBottom: '24px' }}>
                Completa el formulario y un asesor de cuentas corporativas se comunicará contigo para compartirte nuestra lista de precios mayorista y catálogo con especificaciones.
              </p>

              <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--linea)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--marino)', margin: '0 0 12px 0', fontWeight: 800 }}>
                  ¿Quiénes pueden ser distribuidores?
                </h3>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.92rem', color: 'var(--texto-2)' }}>
                  <li>Empresas de uniformes y bordados locales.</li>
                  <li>Comercializadoras y agencias de artículos promocionales.</li>
                  <li>Proveedores de equipo de seguridad industrial y ferreterías.</li>
                  <li>Distribuidores de abarrotes mayoristas y dotaciones institucionales.</li>
                </ul>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--texto-2)' }}>
                📍 <strong>Matriz y Bodega Central:</strong> Av. Laguna Luna 30, Col. Cumbria, Cuautitlán Izcalli, Estado de México, C.P. 54740.<br/>
                📞 <strong>Atención Mayorista:</strong> Tel. y WhatsApp 55 1625 7933
              </div>
            </div>

            {/* Formulario */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid var(--linea)',
              borderRadius: '20px',
              padding: '32px'
            }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--marino)', margin: '0 0 20px 0', fontWeight: 800 }}>
                Datos de Contacto Mayorista
              </h3>

              {enviado ? (
                <div style={{ padding: '24px', backgroundColor: '#dcfce7', border: '1px solid #86efac', borderRadius: '12px', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>✅</span>
                  <strong style={{ color: '#166534', fontSize: '1.1rem', display: 'block', marginBottom: '4px' }}>¡Solicitud Enviada!</strong>
                  <p style={{ color: '#15803d', fontSize: '0.92rem', margin: 0 }}>
                    Se ha abierto la conversación de WhatsApp con tu asesor asignado. En breve nos comunicaremos contigo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--marino)', marginBottom: '6px' }}>
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Carlos Mendoza"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--linea)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--marino)', marginBottom: '6px' }}>
                      Nombre de la Empresa o Negocio *
                    </label>
                    <input
                      type="text"
                      required
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Ej. Distribuidora Textil del Centro"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--linea)', fontSize: '0.95rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--marino)', marginBottom: '6px' }}>
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="55 1234 5678"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--linea)', fontSize: '0.95rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--marino)', marginBottom: '6px' }}>
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="contacto@empresa.com"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--linea)', fontSize: '0.95rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--marino)', marginBottom: '6px' }}>
                        Estado / Región
                      </label>
                      <input
                        type="text"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        placeholder="Ej. Nuevo León"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--linea)', fontSize: '0.95rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--marino)', marginBottom: '6px' }}>
                        Línea de Interés
                      </label>
                      <select
                        value={interes}
                        onChange={(e) => setInteres(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--linea)', fontSize: '0.95rem', backgroundColor: '#ffffff' }}
                      >
                        <option value="Textiles y Calzado">Textiles y Calzado</option>
                        <option value="Solo Confección Textil">Solo Confección Textil</option>
                        <option value="Solo Calzado Duty Gear">Solo Calzado Duty Gear</option>
                        <option value="Equipo de Protección (EPC)">Equipo de Protección (EPC)</option>
                        <option value="Catálogo Completo">Catálogo Completo</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn"
                    style={{
                      marginTop: '8px',
                      backgroundColor: 'var(--rey)',
                      color: '#ffffff',
                      fontWeight: 800,
                      padding: '14px',
                      fontSize: '1rem',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(36,86,196,0.3)'
                    }}
                  >
                    Enviar Solicitud Mayorista &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Grid de Beneficios de Distribuidor (Ubicado por DEBAJO de la tarjeta de datos) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {[
              {
                num: '01',
                icon: IconPriceTag,
                titulo: 'Precios de Fábrica',
                desc: 'Escalas de precios por volumen (mayoreo 72+ y 504+ pzas) para maximizar tu rentabilidad comercial.'
              },
              {
                num: '02',
                icon: IconBox,
                titulo: 'Inventario Permanente',
                desc: 'Stock garantizado de playeras peso completo, polos piqué y calzado Duty Gear para reposición inmediata.'
              },
              {
                num: '03',
                icon: IconSparkles,
                titulo: 'Personalización Integral',
                desc: 'Servicio interno de bordado computarizado, serigrafía y transfer: entrega prendas listas para tu cliente.'
              },
              {
                num: '04',
                icon: IconTruck,
                titulo: 'Envíos a Todo México',
                desc: 'Alianzas logísticas con transportistas consolidados para entregas seguras y económicas en cualquier estado.'
              }
            ].map((ben, i) => {
              const IconComp = ben.icon;
              return (
                <div key={i} style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--linea)',
                  borderRadius: '18px',
                  padding: '28px',
                  boxShadow: '0 4px 16px rgba(19, 42, 82, 0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--cielo)',
                      border: '1px solid var(--cielo-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--rey)'
                    }}>
                      <IconComp size={22} color="var(--rey)" />
                    </div>

                    <span style={{
                      fontSize: '0.78rem',
                      fontFamily: 'var(--mono)',
                      fontWeight: 800,
                      color: 'var(--rey)',
                      backgroundColor: 'var(--cielo)',
                      padding: '3px 10px',
                      borderRadius: '8px'
                    }}>
                      {ben.num}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--marino)', margin: '0 0 8px 0' }}>
                    {ben.titulo}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--texto-2)', margin: 0, lineHeight: 1.5 }}>
                    {ben.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

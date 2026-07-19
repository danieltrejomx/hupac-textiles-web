'use client';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Prenda = 'polo' | 'playera' | 'camisa';
type Posicion = 'izq' | 'centro' | 'der';
type Tecnica = 'Bordado' | 'Estampado';

const posiciones: Record<Prenda, Record<Posicion, [number, number]>> = {
  polo:   {izq: [292, 196], centro: [240, 268], der: [188, 196]},
  playera:{izq: [292, 188], centro: [240, 252], der: [188, 188]},
  camisa: {izq: [188, 196], centro: [240, 300], der: [292, 196]}
};

const nombres: Record<Prenda, string> = {
  polo: 'POLO',
  playera: 'PLAYERA CUELLO REDONDO',
  camisa: 'CAMISA'
};

const posicionNombres: Record<Posicion, string> = {
  izq: 'Pecho izquierdo',
  centro: 'Centro',
  der: 'Pecho derecho'
};

export default function Configurator() {
  const [prenda, setPrenda] = useState<Prenda>('polo');
  const [color, setColor] = useState<string>('#FFFFFF');
  const [colorN, setColorN] = useState<string>('Blanco');
  const [tec, setTec] = useState<Tecnica>('Bordado');
  const [pos, setPos] = useState<Posicion>('izq');
  const [size, setSize] = useState<number>(100);
  const [logo, setLogo] = useState<string | null>(null);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setLogo(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const oscuro = ['#132A52', '#2456C4', '#B22234'].includes(color);
  const strokeColor = oscuro ? 'rgba(255,255,255,.45)' : '#C9D4E0';
  const circleFill = oscuro ? 'rgba(255,255,255,.6)' : '#C9D4E0';
  
  const w = size * 0.9;
  const h = size * 0.64;
  const [cx, cy] = posiciones[prenda][pos];
  const x = cx - w / 2;
  const y = cy - h / 2;

  const msg = encodeURIComponent(`Hola HUPAC TEXTILES, quiero cotizar: ${nombres[prenda]}, color ${colorN}, personalización ${tec} en ${posicionNombres[pos].toLowerCase()}.`);

  return (
    <div id="configurador" className="config-wrap" ref={ref}>
      <div className="config">
        <div className="panel">
          <div className="rv">
            <span className="eyebrow">Configurador de uniformes</span>
            <h2>Coloca el logo de tu empresa y míralo antes de fabricar.</h2>
            <p style={{ color: 'var(--texto-2)' }}>Elige la prenda, el color de línea y la técnica; sube tu logotipo y posiciónalo sobre la prenda. El resumen se genera automáticamente para tu cotización.</p>
          </div>
          
          <div className="grupo rv">
            <label className="tit">1 · Prenda base</label>
            <div className="opciones">
              <button className={`op ${prenda === 'polo' ? 'on' : ''}`} onClick={() => setPrenda('polo')}>Polo</button>
              <button className={`op ${prenda === 'playera' ? 'on' : ''}`} onClick={() => setPrenda('playera')}>Playera cuello redondo</button>
              <button className={`op ${prenda === 'camisa' ? 'on' : ''}`} onClick={() => setPrenda('camisa')}>Camisa</button>
            </div>
          </div>
          
          <div className="grupo rv">
            <label className="tit">2 · Color de línea</label>
            <div className="swatches">
              {[
                {c: '#FFFFFF', n: 'Blanco'},
                {c: '#AECDE8', n: 'Cielo'},
                {c: '#2456C4', n: 'Rey'},
                {c: '#132A52', n: 'Marino'},
                {c: '#9AA6B2', n: 'Gris'},
                {c: '#B22234', n: 'Rojo'}
              ].map(opt => (
                <button 
                  key={opt.c}
                  className={`sw ${color === opt.c ? 'on' : ''}`} 
                  style={{ background: opt.c }} 
                  aria-label={opt.n}
                  onClick={() => { setColor(opt.c); setColorN(opt.n); }}
                />
              ))}
            </div>
          </div>
          
          <div className="grupo rv">
            <label className="tit">3 · Logotipo del cliente</label>
            <label className="upload" htmlFor="fileLogo">
              <b>Subir logotipo</b>
              <span>PNG, JPG o SVG · Se coloca al instante sobre la prenda</span>
              <input type="file" id="fileLogo" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
          
          <div className="grupo rv">
            <label className="tit">4 · Técnica y posición</label>
            <div className="opciones" style={{ marginBottom: '14px' }}>
              <button className={`op ${tec === 'Bordado' ? 'on' : ''}`} onClick={() => setTec('Bordado')}>Bordado</button>
              <button className={`op ${tec === 'Estampado' ? 'on' : ''}`} onClick={() => setTec('Estampado')}>Estampado</button>
            </div>
            <div className="opciones">
              <button className={`op ${pos === 'izq' ? 'on' : ''}`} onClick={() => setPos('izq')}>Pecho izquierdo</button>
              <button className={`op ${pos === 'centro' ? 'on' : ''}`} onClick={() => setPos('centro')}>Centro</button>
              <button className={`op ${pos === 'der' ? 'on' : ''}`} onClick={() => setPos('der')}>Pecho derecho</button>
            </div>
            <div className="slider-row" style={{ marginTop: '16px' }}>
              <span className="nota">Tamaño</span>
              <input type="range" min="60" max="160" value={size} onChange={(e) => setSize(+e.target.value)} aria-label="Tamaño del logotipo" />
            </div>
          </div>
          
          <div className="resumen rv">
            <b>Resumen de configuración</b><br/>
            Prenda: <b>{nombres[prenda]}</b><br/>
            Color: <b>{colorN}</b> · Técnica: <b>{tec}</b><br/>
            Posición: <b>{posicionNombres[pos]}</b> · Logotipo: <b>{logo ? 'Cargado ✓' : 'Pendiente'}</b>
          </div>
          
          <button 
            className="btn rv" 
            onClick={async () => {
              try {
                await addDoc(collection(db, 'orders'), {
                  prenda: nombres[prenda],
                  color: colorN,
                  tecnica: tec,
                  posicion: posicionNombres[pos],
                  tamaño: size,
                  logoIncluido: !!logo,
                  fecha: serverTimestamp(),
                });
              } catch (e) {
                console.error("Error guardando el pedido: ", e);
              }
              window.open(`https://wa.me/525612870780?text=${msg}`, '_blank');
            }}
            style={{ alignSelf: 'flex-start', border: 'none', cursor: 'pointer', fontFamily: 'var(--fuente-cuerpo)' }}
          >
            Enviar esta configuración a cotización
          </button>
        </div>

        <div className="visor rv" aria-label="Vista previa de la prenda configurada">
          <div className="visor-head"><span>VISTA PREVIA · <b>{nombres[prenda]}</b></span><span>{colorN}</span></div>
          <svg viewBox="0 0 480 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Prenda con logotipo del cliente">
            <defs>
              <filter id="fBordado" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6"/>
              </filter>
              <filter id="sombraSuave"><feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#132A52" floodOpacity="0.10"/></filter>
            </defs>

            {prenda === 'polo' && (
              <g filter="url(#sombraSuave)">
                <path d="M168 78 L120 100 L86 190 L128 206 L142 172 L142 470 L338 470 L338 172 L352 206 L394 190 L360 100 L312 78 L292 66 Q240 78 188 66 Z" fill={color} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M188 66 Q240 108 292 66 L302 84 Q240 122 178 84 Z" fill={color} stroke={strokeColor} strokeWidth="2.5"/>
                <path d="M225 96 L255 96 L255 170 L240 180 L225 170 Z" fill="none" stroke={strokeColor} strokeWidth="2"/>
                <circle cx="240" cy="118" r="3" fill={circleFill}/>
                <circle cx="240" cy="138" r="3" fill={circleFill}/>
                <circle cx="240" cy="158" r="3" fill={circleFill}/>
                <path d="M128 206 L142 172 M352 206 L338 172" stroke={strokeColor} strokeWidth="2"/>
              </g>
            )}

            {prenda === 'playera' && (
              <g filter="url(#sombraSuave)">
                <path d="M170 76 L118 100 L84 192 L128 208 L142 174 L142 470 L338 470 L338 174 L352 208 L396 192 L362 100 L310 76 L290 64 Q240 96 190 64 Z" fill={color} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M190 64 Q240 96 290 64" fill="none" stroke={strokeColor} strokeWidth="6" strokeLinecap="round"/>
                <path d="M128 208 L142 174 M352 208 L338 174" stroke={strokeColor} strokeWidth="2"/>
              </g>
            )}

            {prenda === 'camisa' && (
              <g filter="url(#sombraSuave)">
                <path d="M166 84 L112 104 L92 250 L136 258 L146 214 L146 474 L334 474 L334 214 L344 258 L388 250 L368 104 L314 84 L296 70 L240 84 L184 70 Z" fill={color} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M184 70 L214 96 L240 84 L266 96 L296 70" fill="none" stroke={strokeColor} strokeWidth="2.5"/>
                <path d="M184 70 L206 54 L240 66 L274 54 L296 70 L266 96 L240 84 L214 96 Z" fill={color} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round"/>
                <line x1="240" y1="96" x2="240" y2="470" stroke={strokeColor} strokeWidth="2.5"/>
                <circle cx="240" cy="130" r="3" fill={circleFill}/>
                <circle cx="240" cy="180" r="3" fill={circleFill}/>
                <circle cx="240" cy="230" r="3" fill={circleFill}/>
                <circle cx="240" cy="280" r="3" fill={circleFill}/>
                <circle cx="240" cy="330" r="3" fill={circleFill}/>
                <rect x="286" y="150" width="42" height="48" rx="4" fill="none" stroke={strokeColor} strokeWidth="2"/>
                <path d="M136 258 L146 214 M344 258 L334 214" stroke={strokeColor} strokeWidth="2"/>
              </g>
            )}

            <g>
              {!logo ? (
                <>
                  <rect x={x} y={y} width={w} height={h} rx="6" fill="rgba(36,86,196,.06)" stroke={oscuro ? '#AECDE8' : '#2456C4'} strokeDasharray="5 5" strokeWidth="1.6"/>
                  <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill={oscuro ? '#AECDE8' : '#2456C4'} fontWeight="600">TU LOGO</text>
                </>
              ) : (
                <image href={logo} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid meet" filter={tec === 'Bordado' ? 'url(#fBordado)' : ''} />
              )}
            </g>
          </svg>
          <p className="nota" style={{ marginTop: '14px', textAlign: 'center' }}>Vista ilustrativa. Los tonos pueden variar contra la tela física.</p>
        </div>
      </div>
    </div>
  );
}

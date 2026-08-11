'use client';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Prenda = 'polo' | 'playera' | 'camisa';
type Vista = 'frente' | 'espalda';
type PosicionFrente = 'pecho_izq' | 'centro_pecho' | 'pecho_der';
type PosicionEspalda = 'espalda_cuello' | 'espalda_centro' | 'espalda_baja';
type Posicion = PosicionFrente | PosicionEspalda;
type Tecnica = 'Bordado' | 'Estampado';

interface PrendaConfig {
  nombre: string;
  subtitulo: string;
  frenteImgWhite: string;
  espaldaImgWhite: string;
  frenteImgColor: string;
  espaldaImgColor: string;
  posicionesFrente: { id: PosicionFrente; label: string; x: number; y: number; maxW: number }[];
  posicionesEspalda: { id: PosicionEspalda; label: string; x: number; y: number; maxW: number }[];
}

const PRENDAS: Record<Prenda, PrendaConfig> = {
  polo: {
    nombre: 'POLO PIQUÉ EJECUTIVA',
    subtitulo: 'Tejido de punto 100% mexicano · Cuello y puños tejidos',
    frenteImgWhite: '/images/configurator/polo_front.jpg',
    espaldaImgWhite: '/images/configurator/polo_back.jpg',
    frenteImgColor: '/images/configurator/polo_front_color.png',
    espaldaImgColor: '/images/configurator/polo_back_color.png',
    posicionesFrente: [
      { id: 'pecho_izq', label: 'Pecho Izquierdo', x: 63, y: 34, maxW: 90 },
      { id: 'centro_pecho', label: 'Centro Pecho', x: 50, y: 44, maxW: 130 },
      { id: 'pecho_der', label: 'Pecho Derecho', x: 37, y: 34, maxW: 90 },
    ],
    posicionesEspalda: [
      { id: 'espalda_cuello', label: 'Espalda Superior (Cuello)', x: 50, y: 22, maxW: 100 },
      { id: 'espalda_centro', label: 'Espalda Centro (Grande)', x: 50, y: 44, maxW: 180 },
      { id: 'espalda_baja', label: 'Espalda Baja', x: 50, y: 68, maxW: 160 },
    ]
  },
  playera: {
    nombre: 'PLAYERA CUELLO REDONDO',
    subtitulo: 'Peso completo 100% algodón · Confort y alta durabilidad',
    frenteImgWhite: '/images/configurator/playera_front.jpg',
    espaldaImgWhite: '/images/configurator/playera_back.jpg',
    frenteImgColor: '/images/configurator/playera_front_color.png',
    espaldaImgColor: '/images/configurator/playera_back_color.png',
    posicionesFrente: [
      { id: 'pecho_izq', label: 'Pecho Izquierdo', x: 64, y: 32, maxW: 90 },
      { id: 'centro_pecho', label: 'Centro Pecho', x: 50, y: 42, maxW: 150 },
      { id: 'pecho_der', label: 'Pecho Derecho', x: 36, y: 32, maxW: 90 },
    ],
    posicionesEspalda: [
      { id: 'espalda_cuello', label: 'Espalda Superior (Cuello)', x: 50, y: 22, maxW: 100 },
      { id: 'espalda_centro', label: 'Espalda Centro (Grande)', x: 50, y: 44, maxW: 180 },
      { id: 'espalda_baja', label: 'Espalda Baja', x: 50, y: 68, maxW: 160 },
    ]
  },
  camisa: {
    nombre: 'CAMISA DE VESTIR EJECUTIVA',
    subtitulo: 'Corte formal corporativo · Algodón premium y fácil planchado',
    frenteImgWhite: '/images/configurator/camisa_front.jpg',
    espaldaImgWhite: '/images/configurator/camisa_back.jpg',
    frenteImgColor: '/images/configurator/camisa_front_color.png',
    espaldaImgColor: '/images/configurator/camisa_back_color.png',
    posicionesFrente: [
      { id: 'pecho_izq', label: 'Pecho Izquierdo', x: 62, y: 34, maxW: 85 },
      { id: 'centro_pecho', label: 'Centro Pecho', x: 50, y: 45, maxW: 120 },
      { id: 'pecho_der', label: 'Pecho Derecho', x: 38, y: 34, maxW: 85 },
    ],
    posicionesEspalda: [
      { id: 'espalda_cuello', label: 'Espalda Superior (Cuello)', x: 50, y: 22, maxW: 95 },
      { id: 'espalda_centro', label: 'Espalda Centro (Grande)', x: 50, y: 44, maxW: 170 },
      { id: 'espalda_baja', label: 'Espalda Baja', x: 50, y: 68, maxW: 150 },
    ]
  }
};

interface ColorOption {
  c: string;
  n: string;
  rgb: [number, number, number] | null;
  textColor: string;
}

const COLORES: ColorOption[] = [
  { c: '#FFFFFF', n: 'Blanco Clásico', rgb: null, textColor: '#17232F' },
  { c: '#7EA9CD', n: 'Azul Cielo', rgb: [126, 169, 205], textColor: '#132A52' },
  { c: '#2254B8', n: 'Azul Rey (HUPAC)', rgb: [34, 84, 184], textColor: '#FFFFFF' },
  { c: '#142236', n: 'Azul Marino Corporativo', rgb: [20, 34, 54], textColor: '#FFFFFF' },
  { c: '#4E5664', n: 'Gris Oxford Industrial', rgb: [78, 86, 100], textColor: '#FFFFFF' },
  { c: '#A31F2D', n: 'Rojo Empresarial', rgb: [163, 31, 45], textColor: '#FFFFFF' },
  { c: '#22262E', n: 'Negro Profundo', rgb: [34, 38, 46], textColor: '#FFFFFF' },
];

export default function Configurator() {
  const [prenda, setPrenda] = useState<Prenda>('polo');
  const [vista, setVista] = useState<Vista>('frente');
  const [colorOption, setColorOption] = useState<ColorOption>(COLORES[0]);
  const [tec, setTec] = useState<Tecnica>('Bordado');
  const [posicionFrente, setPosicionFrente] = useState<PosicionFrente>('pecho_izq');
  const [posicionEspalda, setPosicionEspalda] = useState<PosicionEspalda>('espalda_centro');
  const [size, setSize] = useState<number>(100);
  const [logo, setLogo] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>('');
  const [isProcessingCanvas, setIsProcessingCanvas] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const prendaActual = PRENDAS[prenda];
  const activePositionId = vista === 'frente' ? posicionFrente : posicionEspalda;
  const currentPositions = vista === 'frente' ? prendaActual.posicionesFrente : prendaActual.posicionesEspalda;
  const activePositionObj = currentPositions.find(p => p.id === activePositionId) || currentPositions[0];

  // Observador para animaciones al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) {
      const rvs = containerRef.current.querySelectorAll('.rv');
      rvs.forEach((el) => observer.observe(el));
    }
    
    return () => observer.disconnect();
  }, []);

  // Manejo de carga de archivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setLogo(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Renderizado dinámico en Canvas: foto original para blanco + coloreado 100% parejo y sin manchas
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    setIsProcessingCanvas(true);
    const isWhite = !colorOption.rgb;

    const imgSrc = isWhite
      ? (vista === 'frente' ? prendaActual.frenteImgWhite : prendaActual.espaldaImgWhite)
      : (vista === 'frente' ? prendaActual.frenteImgColor : prendaActual.espaldaImgColor);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgSrc;

    img.onload = () => {
      cvs.width = img.naturalWidth;
      cvs.height = img.naturalHeight;
      ctx.clearRect(0, 0, cvs.width, cvs.height);

      // Dibujar imagen
      ctx.drawImage(img, 0, 0);

      // Si es Blanco Clásico: mostrar directamente la foto auténtica de estudio
      if (isWhite) {
        setIsProcessingCanvas(false);
        return;
      }

      // Si es Color: colorear el 100% de la prenda sin dejar puntos blancos
      const w = cvs.width;
      const h = cvs.height;
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      const [tr, tg, tb] = colorOption.rgb!;

      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a === 0) continue; // Fondo transparente limpio

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;

        // Coloreado completo y uniforme respetando la textura del tejido
        data[i]     = Math.min(255, Math.round(tr * brightness));
        data[i + 1] = Math.min(255, Math.round(tg * brightness));
        data[i + 2] = Math.min(255, Math.round(tb * brightness));
      }

      ctx.putImageData(imgData, 0, 0);
      setIsProcessingCanvas(false);
    };
  }, [prenda, vista, colorOption]);

  // Función para descargar el diseño generado en alta resolución
  const handleDownloadMockup = () => {
    const cvs = canvasRef.current;
    if (!cvs) return;

    // Crear canvas temporal de exportación que combina prenda + logo
    const exportCvs = document.createElement('canvas');
    exportCvs.width = cvs.width;
    exportCvs.height = cvs.height;
    const ctx = exportCvs.getContext('2d');
    if (!ctx) return;

    // 1. Fondo blanco de estudio y dibujo de la prenda coloreada
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCvs.width, exportCvs.height);
    ctx.drawImage(cvs, 0, 0);

    // 2. Si hay logo, dibujarlo en la posición exacta
    if (logo) {
      const logoImg = new Image();
      logoImg.src = logo;
      logoImg.onload = () => {
        const posX = (activePositionObj.x / 100) * exportCvs.width;
        const posY = (activePositionObj.y / 100) * exportCvs.height;
        const logoWidth = (size / 100) * (activePositionObj.maxW * 2.2);
        const aspect = logoImg.naturalHeight / logoImg.naturalWidth;
        const logoHeight = logoWidth * aspect;

        ctx.save();
        if (tec === 'Bordado') {
          ctx.shadowColor = 'rgba(0,0,0,0.3)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetY = 2;
        }
        ctx.drawImage(logoImg, posX - logoWidth / 2, posY - logoHeight / 2, logoWidth, logoHeight);
        ctx.restore();

        const link = document.createElement('a');
        link.download = `HUPAC_${prenda.toUpperCase()}_${colorOption.n.replace(/\s+/g, '_')}_${vista}.png`;
        link.href = exportCvs.toDataURL('image/png');
        link.click();
      };
    } else {
      const link = document.createElement('a');
      link.download = `HUPAC_${prenda.toUpperCase()}_${colorOption.n.replace(/\s+/g, '_')}_${vista}.png`;
      link.href = exportCvs.toDataURL('image/png');
      link.click();
    }
  };

  const activePositionName = activePositionObj.label;
  const msg = encodeURIComponent(
    `Hola HUPAC TEXTILES, quiero cotizar uniformes con la siguiente configuración:\n` +
    `• Prenda: ${prendaActual.nombre}\n` +
    `• Color: ${colorOption.n}\n` +
    `• Vista: ${vista === 'frente' ? 'Frente' : 'Espalda'}\n` +
    `• Posición de Logo: ${activePositionName}\n` +
    `• Técnica: ${tec}\n` +
    `• Logotipo: ${logo ? 'Cargado en mockup' : 'Pendiente de enviar'}`
  );

  return (
    <div id="configurador" className="config-wrap" ref={containerRef}>
      <div className="config" style={{ maxWidth: '1320px' }}>
        
        {/* ================= PANEL IZQUIERDO: CONTROLES ================= */}
        <div className="panel">
          <div className="rv">
            <span className="eyebrow">Configurador de Uniformes HUPAC</span>
            <h2>Visualiza tu logotipo sobre prendas reales en alta definición.</h2>
            <p style={{ color: 'var(--texto-2)', fontSize: '1.02rem', lineHeight: 1.6 }}>
              Selecciona el modelo, el color institucional y la vista (Frente o Espalda). Sube tu logotipo para ver cómo lucirá con técnica de bordado en relieve o estampado textil.
            </p>
          </div>
          
          {/* 1. Prenda Base */}
          <div className="grupo rv">
            <label className="tit">1 · Modelo de Prenda</label>
            <div className="opciones">
              <button 
                className={`op ${prenda === 'polo' ? 'on' : ''}`} 
                onClick={() => setPrenda('polo')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>👕</span> Polo Piqué
              </button>
              <button 
                className={`op ${prenda === 'playera' ? 'on' : ''}`} 
                onClick={() => setPrenda('playera')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>🎽</span> Playera Cuello Redondo
              </button>
              <button 
                className={`op ${prenda === 'camisa' ? 'on' : ''}`} 
                onClick={() => setPrenda('camisa')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>👔</span> Camisa de Vestir
              </button>
            </div>
          </div>
          
          {/* 2. Color de Línea */}
          <div className="grupo rv">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <label className="tit" style={{ margin: 0 }}>2 · Color de Línea HUPAC</label>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--rey)' }}>
                {colorOption.n}
              </span>
            </div>
            <div className="swatches">
              {COLORES.map(opt => (
                <button 
                  key={opt.c}
                  className={`sw ${colorOption.c === opt.c ? 'on' : ''}`} 
                  style={{ 
                    background: opt.c,
                    border: opt.c === '#FFFFFF' ? '2px solid #cbd5e1' : '2px solid rgba(0,0,0,0.1)'
                  }} 
                  aria-label={opt.n}
                  title={opt.n}
                  onClick={() => setColorOption(opt)}
                />
              ))}
            </div>
          </div>

          {/* 3. Vista de la Prenda (Frente / Espalda) */}
          <div className="grupo rv">
            <label className="tit">3 · Vista de la Prenda</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className={`op ${vista === 'frente' ? 'on' : ''}`} 
                onClick={() => setVista('frente')}
                style={{ flex: 1, textAlign: 'center', padding: '12px 16px' }}
              >
                👕 Vista Frontal (Frente)
              </button>
              <button 
                className={`op ${vista === 'espalda' ? 'on' : ''}`} 
                onClick={() => setVista('espalda')}
                style={{ flex: 1, textAlign: 'center', padding: '12px 16px' }}
              >
                🔄 Vista Trasera (Espalda)
              </button>
            </div>
          </div>

          {/* 4. Posición del Logotipo según la Vista Activa */}
          <div className="grupo rv">
            <label className="tit">
              4 · Posición del Logotipo ({vista === 'frente' ? 'Frente' : 'Espalda'})
            </label>
            <div className="opciones">
              {vista === 'frente' ? (
                prendaActual.posicionesFrente.map(p => (
                  <button 
                    key={p.id}
                    className={`op ${posicionFrente === p.id ? 'on' : ''}`} 
                    onClick={() => setPosicionFrente(p.id)}
                  >
                    {p.label}
                  </button>
                ))
              ) : (
                prendaActual.posicionesEspalda.map(p => (
                  <button 
                    key={p.id}
                    className={`op ${posicionEspalda === p.id ? 'on' : ''}`} 
                    onClick={() => setPosicionEspalda(p.id)}
                  >
                    {p.label}
                  </button>
                ))
              )}
            </div>

            {/* Slider de Tamaño */}
            <div className="slider-row" style={{ marginTop: '18px', backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '110px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--marino)' }}>Tamaño</span>
                <span className="nota">Aprox. {Math.round(size * 0.12)} cm</span>
              </div>
              <input 
                type="range" 
                min="60" 
                max="160" 
                value={size} 
                onChange={(e) => setSize(+e.target.value)} 
                aria-label="Tamaño del logotipo" 
                style={{ accentColor: 'var(--rey)', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--marino)', minWidth: '40px', textAlign: 'right' }}>
                {size}%
              </span>
            </div>
          </div>

          {/* 5. Técnica de Personalización */}
          <div className="grupo rv">
            <label className="tit">5 · Técnica de Personalización</label>
            <div className="opciones">
              <button 
                className={`op ${tec === 'Bordado' ? 'on' : ''}`} 
                onClick={() => setTec('Bordado')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>🧵</span> Bordado (Relieve de Hilo)
              </button>
              <button 
                className={`op ${tec === 'Estampado' ? 'on' : ''}`} 
                onClick={() => setTec('Estampado')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <span>🎨</span> Estampado / DTG / Serigrafía
              </button>
            </div>
          </div>
          
          {/* 6. Subir Logotipo */}
          <div className="grupo rv">
            <label className="tit">6 · Logotipo del Cliente</label>
            <label 
              className="upload-dropzone" 
              htmlFor="fileLogo"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px 20px',
                backgroundColor: logo ? '#f0fdf4' : '#f8fafc',
                border: logo ? '2px solid #22c55e' : '2px dashed #93c5fd',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: logo ? '#dcfce7' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                boxShadow: '0 4px 10px rgba(36, 86, 196, 0.08)',
                color: logo ? '#16a34a' : 'var(--rey)',
                fontSize: '1.4rem'
              }}>
                {logo ? '✓' : '☁️'}
              </div>

              <span style={{ fontSize: '0.98rem', fontWeight: 750, color: 'var(--marino)', display: 'block', marginBottom: '4px' }}>
                {logo ? `¡Logotipo cargado! (${logoName})` : 'Carga tu archivo de logotipo'}
              </span>

              <span style={{ fontSize: '0.82rem', color: 'var(--texto-2)', display: 'block', maxWidth: '360px', lineHeight: 1.4 }}>
                {logo 
                  ? 'El logo se muestra en la prenda. Puedes cambiar de posición o tamaño arriba.' 
                  : 'Recomendado archivo PNG con fondo transparente, SVG o JPG.'
                }
              </span>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <span style={{
                  fontSize: '0.78rem',
                  backgroundColor: logo ? '#15803d' : 'var(--rey)',
                  color: '#ffffff',
                  fontWeight: 700,
                  padding: '6px 16px',
                  borderRadius: '20px',
                  display: 'inline-block'
                }}>
                  {logo ? 'Cambiar imagen' : 'Explorar archivos'}
                </span>

                {logo && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setLogo(null);
                      setLogoName('');
                    }}
                    style={{
                      fontSize: '0.78rem',
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 700,
                      padding: '6px 14px',
                      borderRadius: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    Quitar logo
                  </button>
                )}
              </div>

              <input type="file" id="fileLogo" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
          </div>
          
          {/* Resumen de Configuración */}
          <div className="resumen rv" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <b style={{ color: 'var(--marino)', fontSize: '0.95rem' }}>Resumen de Personalización</b>
              <span style={{ fontSize: '0.75rem', backgroundColor: '#e0e7ff', color: 'var(--rey)', padding: '2px 8px', borderRadius: '8px', fontWeight: 700 }}>
                HUPAC TEXTILES
              </span>
            </div>
            Prenda: <b>{prendaActual.nombre}</b><br/>
            Color: <b style={{ color: colorOption.c === '#FFFFFF' ? '#64748b' : colorOption.c }}>{colorOption.n}</b> · Técnica: <b>{tec}</b><br/>
            Vista: <b>{vista === 'frente' ? 'Frontal (Frente)' : 'Trasera (Espalda)'}</b> · Posición: <b>{activePositionName}</b><br/>
            Logotipo: <b>{logo ? `Cargado ✓ (${logoName})` : 'Pendiente de adjuntar'}</b>
          </div>
          
          {/* Botón WhatsApp */}
          <button 
            className="btn rv" 
            onClick={async () => {
              try {
                await addDoc(collection(db, 'orders'), {
                  tipo: 'Cotización Personalizada',
                  prenda: prendaActual.nombre,
                  color: colorOption.n,
                  vista: vista === 'frente' ? 'Frente' : 'Espalda',
                  tecnica: tec,
                  posicion: activePositionName,
                  tamaño: size,
                  logoIncluido: !!logo,
                  fecha: serverTimestamp(),
                });
              } catch (e) {
                console.error("Error guardando el pedido: ", e);
              }
              window.open(`https://wa.me/525612870780?text=${msg}`, '_blank');
            }}
            style={{ 
              alignSelf: 'flex-start', 
              border: 'none', 
              cursor: 'pointer', 
              fontFamily: 'var(--fuente-cuerpo)',
              padding: '16px 28px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>💬</span> Enviar esta configuración por WhatsApp
          </button>
        </div>

        {/* ================= PANEL DERECHO: VISOR FOTORREALISTA ================= */}
        <div className="visor rv" aria-label="Vista previa fotorrealista de la prenda configurada" style={{ padding: '24px' }}>
          
          {/* Barra superior del visor */}
          <div className="visor-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--marino)', fontWeight: 800 }}>
                {prendaActual.nombre}
              </span>
              <span style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--cielo)',
                color: 'var(--marino)',
                padding: '2px 8px',
                borderRadius: '10px',
                fontWeight: 600
              }}>
                {vista === 'frente' ? 'Frente' : 'Espalda'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: colorOption.c,
                border: colorOption.c === '#FFFFFF' ? '1px solid #cbd5e1' : 'none',
                display: 'inline-block'
              }} />
              <span style={{ fontWeight: 700, color: 'var(--marino)', fontSize: '0.85rem' }}>
                {colorOption.n}
              </span>
            </div>
          </div>

          {/* Selector Rápido de Frente / Espalda dentro del Visor */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '16px',
            gap: '4px'
          }}>
            <button
              type="button"
              onClick={() => setVista('frente')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: vista === 'frente' ? '#ffffff' : 'transparent',
                color: vista === 'frente' ? 'var(--rey)' : 'var(--texto-2)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: vista === 'frente' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              👕 Vista Frente
            </button>
            <button
              type="button"
              onClick={() => setVista('espalda')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: vista === 'espalda' ? '#ffffff' : 'transparent',
                color: vista === 'espalda' ? 'var(--rey)' : 'var(--texto-2)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: vista === 'espalda' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              🔄 Vista Espalda
            </button>
          </div>

          {/* Contenedor del Mockup Fotorrealista */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1/1',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.02)'
          }}>
            
            {/* Canvas con la prenda coloreada con pliegues fotorrealistas */}
            <canvas 
              ref={canvasRef} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />

            {/* Capa Interactiva del Logotipo / Placeholder */}
            <div style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
            }}>
              <div 
                style={{
                  position: 'absolute',
                  left: `${activePositionObj.x}%`,
                  top: `${activePositionObj.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: `${(size / 100) * activePositionObj.maxW}px`,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {!logo ? (
                  /* Placeholder cuando no hay logo */
                  <div style={{
                    width: '100%',
                    padding: '10px 8px',
                    borderRadius: '8px',
                    border: colorOption.c === '#FFFFFF' ? '2px dashed var(--rey)' : '2px dashed #ffffff',
                    backgroundColor: colorOption.c === '#FFFFFF' ? 'rgba(36,86,196,0.08)' : 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(2px)',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    <span style={{
                      display: 'block',
                      fontFamily: 'var(--fuente-mono)',
                      fontSize: '10px',
                      fontWeight: 800,
                      color: colorOption.c === '#FFFFFF' ? 'var(--rey)' : '#ffffff',
                      letterSpacing: '0.5px'
                    }}>
                      TU LOGO AQUÍ
                    </span>
                    <span style={{
                      display: 'block',
                      fontSize: '8.5px',
                      color: colorOption.c === '#FFFFFF' ? 'var(--marino)' : '#f8fafc',
                      fontWeight: 600,
                      marginTop: '2px'
                    }}>
                      {activePositionObj.label}
                    </span>
                  </div>
                ) : (
                  /* Logotipo aplicado con textura de Bordado o Estampado */
                  <img
                    src={logo}
                    alt="Logotipo del cliente en uniforme"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '140px',
                      objectFit: 'contain',
                      filter: tec === 'Bordado'
                        ? 'drop-shadow(0 2px 2px rgba(0,0,0,0.4)) drop-shadow(0 -0.5px 0.5px rgba(255,255,255,0.5)) contrast(1.1)'
                        : 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))',
                      transition: 'all 0.2s ease'
                    }}
                  />
                )}
              </div>
            </div>

            {/* Badge de Técnica y Acabado */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              backgroundColor: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(6px)',
              padding: '4px 10px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--marino)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>{tec === 'Bordado' ? '🧵' : '🎨'}</span>
              <span>Acabado: {tec}</span>
            </div>

            {/* Botón flotante para voltear vista rápido */}
            <button
              type="button"
              onClick={() => setVista(vista === 'frente' ? 'espalda' : 'frente')}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(6px)',
                border: '1px solid #cbd5e1',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--rey)',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Voltear prenda"
            >
              🔄 Ver {vista === 'frente' ? 'Espalda' : 'Frente'}
            </button>
          </div>

          {/* Acciones del visor: Descargar diseño */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
            <p className="nota" style={{ margin: 0, fontSize: '0.78rem' }}>
              * Vista fotográfica con proporciones para confección y bordado.
            </p>
            <button
              type="button"
              onClick={handleDownloadMockup}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--marino)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
              title="Descargar imagen del diseño"
            >
              <span>📥</span> Descargar Vista
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

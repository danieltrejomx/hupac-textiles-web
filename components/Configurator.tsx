'use client';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  IconPolo,
  IconPlayeraRound,
  IconCamisa,
  IconMezclilla,
  IconReflectiveStripes,
  IconBordado,
  IconDTG,
  IconSparkles,
  IconUploadCloud,
  IconCheckSimple,
  IconInfoCircle,
  IconRotate,
  IconDownload,
  IconTicket,
  IconWhatsApp
} from '@/components/Icons';

type Prenda = 'polo' | 'playera' | 'camisa' | 'mezclilla';
type VersionMezclilla = 'sin_reflejante' | 'con_reflejante';
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
  },
  mezclilla: {
    nombre: 'CAMISA DE MEZCLILLA INDUSTRIAL',
    subtitulo: '100% Algodón de uso rudo · Confección reforzada y doble bolsa',
    frenteImgWhite: '/images/configurator/camisa_mezclilla_frente.png',
    espaldaImgWhite: '/images/configurator/camisa_mezclilla_espalda.png',
    frenteImgColor: '/images/configurator/camisa_mezclilla_reflejante_frente.jpg',
    espaldaImgColor: '/images/configurator/camisa_mezclilla_reflejante_espalda.jpg',
    posicionesFrente: [
      { id: 'pecho_izq', label: 'Pecho Izquierdo', x: 63, y: 34, maxW: 85 },
      { id: 'centro_pecho', label: 'Centro Pecho', x: 50, y: 38, maxW: 120 },
      { id: 'pecho_der', label: 'Pecho Derecho', x: 37, y: 34, maxW: 85 },
    ],
    posicionesEspalda: [
      { id: 'espalda_cuello', label: 'Espalda Superior (Cuello)', x: 50, y: 22, maxW: 95 },
      { id: 'espalda_centro', label: 'Espalda Centro (Grande)', x: 50, y: 42, maxW: 170 },
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

const COLORES_POLO_PLAYERA: ColorOption[] = [
  { c: '#FFFFFF', n: 'Blanco Clásico', rgb: null, textColor: '#17232F' },
  { c: '#3CC4D6', n: 'Azul Turquesa', rgb: [60, 196, 214], textColor: '#132A52' },
  { c: '#142236', n: 'Azul Marino Corporativo', rgb: [20, 34, 54], textColor: '#FFFFFF' },
  { c: '#4E5664', n: 'Gris Oxford Industrial', rgb: [78, 86, 100], textColor: '#FFFFFF' },
  { c: '#A31F2D', n: 'Rojo Empresarial', rgb: [163, 31, 45], textColor: '#FFFFFF' },
  { c: '#22262E', n: 'Negro Profundo', rgb: [34, 38, 46], textColor: '#FFFFFF' },
];

const COLORES_CAMISA: ColorOption[] = [
  { c: '#FFFFFF', n: 'Blanco Clásico', rgb: null, textColor: '#17232F' },
  { c: '#7BA4D0', n: 'Azul Cielo (Oxford)', rgb: [123, 164, 208], textColor: '#132A52' },
  { c: '#22262E', n: 'Negro Profundo', rgb: [34, 38, 46], textColor: '#FFFFFF' },
];

function removeImageBackground(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = dataUrl;
    img.onload = () => {
      const cvs = document.createElement('canvas');
      cvs.width = img.naturalWidth;
      cvs.height = img.naturalHeight;
      const ctx = cvs.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
      const d = imgData.data;

      // Muestrear las 4 esquinas para detectar color de fondo
      const corners = [
        0,
        (cvs.width - 1) * 4,
        cvs.width * (cvs.height - 1) * 4,
        (cvs.width * cvs.height - 1) * 4
      ];

      let avgR = 0, avgG = 0, avgB = 0;
      corners.forEach(idx => {
        avgR += d[idx];
        avgG += d[idx + 1];
        avgB += d[idx + 2];
      });
      avgR = Math.round(avgR / 4);
      avgG = Math.round(avgG / 4);
      avgB = Math.round(avgB / 4);

      const isLightBg = avgR > 220 && avgG > 220 && avgB > 220;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];

        if (isLightBg) {
          // Remoción de fondo blanco / claro
          if (r > 235 && g > 235 && b > 235) {
            d[i + 3] = 0;
          } else if (r > 208 && g > 208 && b > 208) {
            const minVal = Math.min(r, g, b);
            const factor = Math.max(0, Math.min(1, (235 - minVal) / 27));
            d[i + 3] = Math.round(d[i + 3] * factor);
          }
        } else {
          // Fondo sólido similar al promedio de esquinas
          const dist = Math.sqrt((r - avgR) ** 2 + (g - avgG) ** 2 + (b - avgB) ** 2);
          if (dist < 26) {
            d[i + 3] = 0;
          } else if (dist < 40) {
            d[i + 3] = Math.round(d[i + 3] * ((dist - 26) / 14));
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(cvs.toDataURL('image/png'));
    };
    img.onerror = () => resolve(dataUrl);
  });
}

export default function Configurator() {
  const [prenda, setPrenda] = useState<Prenda>('polo');
  const [versionMezclilla, setVersionMezclilla] = useState<VersionMezclilla>('sin_reflejante');
  const [vista, setVista] = useState<Vista>('frente');
  const [colorOption, setColorOption] = useState<ColorOption>(COLORES_POLO_PLAYERA[0]);
  const [tec, setTec] = useState<Tecnica>('Bordado');
  const [posicionFrente, setPosicionFrente] = useState<PosicionFrente>('pecho_izq');
  const [posicionEspalda, setPosicionEspalda] = useState<PosicionEspalda>('espalda_centro');
  const [customPosFrente, setCustomPosFrente] = useState<{ x: number; y: number } | null>(null);
  const [customPosEspalda, setCustomPosEspalda] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initialPosX: number; initialPosY: number; hasMoved: boolean }>({
    startX: 0,
    startY: 0,
    initialPosX: 0,
    initialPosY: 0,
    hasMoved: false
  });
  const mockupContainerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>(100);
  const [logo, setLogo] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>('');
  const [isProcessingCanvas, setIsProcessingCanvas] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [folio, setFolio] = useState<string>('');

  const getColoresParaPrenda = (p: Prenda): ColorOption[] => {
    if (p === 'camisa') return COLORES_CAMISA;
    return COLORES_POLO_PLAYERA;
  };

  const coloresActuales = getColoresParaPrenda(prenda);

  const handlePrendaChange = (nuevaPrenda: Prenda) => {
    setPrenda(nuevaPrenda);
    setCustomPosFrente(null);
    setCustomPosEspalda(null);
    if (nuevaPrenda === 'mezclilla') {
      return;
    }
    const listaActual = getColoresParaPrenda(nuevaPrenda);
    const listaAnterior = getColoresParaPrenda(prenda);
    const idx = listaAnterior.findIndex(c => c.n === colorOption.n || c.c === colorOption.c);
    if (idx >= 0 && listaActual[idx]) {
      setColorOption(listaActual[idx]);
    } else {
      setColorOption(listaActual[0]);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const prendaActual = PRENDAS[prenda];
  const activePositionId = vista === 'frente' ? posicionFrente : posicionEspalda;
  const currentPositions = vista === 'frente' ? prendaActual.posicionesFrente : prendaActual.posicionesEspalda;
  const activePositionObj = currentPositions.find(p => p.id === activePositionId) || currentPositions[0];

  const isCustomActive = vista === 'frente' ? customPosFrente !== null : customPosEspalda !== null;
  const currentPos = vista === 'frente' 
    ? (customPosFrente || { x: activePositionObj.x, y: activePositionObj.y })
    : (customPosEspalda || { x: activePositionObj.x, y: activePositionObj.y });
  const activePositionName = isCustomActive
    ? 'Ubicación Libre Personalizada'
    : activePositionObj.label;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const container = mockupContainerRef.current;
    if (!container) return;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialPosX: currentPos.x,
      initialPosY: currentPos.y,
      hasMoved: false
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = mockupContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dx = ((e.clientX - dragStartRef.current.startX) / rect.width) * 100;
    const dy = ((e.clientY - dragStartRef.current.startY) / rect.height) * 100;

    if (Math.abs(e.clientX - dragStartRef.current.startX) > 3 || Math.abs(e.clientY - dragStartRef.current.startY) > 3) {
      dragStartRef.current.hasMoved = true;
    }

    // Límites estrictos dentro de la prenda para no salirse al fondo blanco:
    const MIN_X = 22;
    const MAX_X = 78;
    const MIN_Y = 16;
    const MAX_Y = 85;

    const rawNewX = dragStartRef.current.initialPosX + dx;
    const rawNewY = dragStartRef.current.initialPosY + dy;

    const clampedX = Math.max(MIN_X, Math.min(MAX_X, rawNewX));
    const clampedY = Math.max(MIN_Y, Math.min(MAX_Y, rawNewY));

    if (vista === 'frente') {
      setCustomPosFrente({ x: Math.round(clampedX * 10) / 10, y: Math.round(clampedY * 10) / 10 });
    } else {
      setCustomPosEspalda({ x: Math.round(clampedX * 10) / 10, y: Math.round(clampedY * 10) / 10 });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    setIsDragging(false);

    if (!dragStartRef.current.hasMoved && !logo) {
      document.getElementById('fileLogo')?.click();
    }
  };

  useEffect(() => {
    setFolio('HUP-' + Math.floor(100000 + Math.random() * 900000));
  }, []);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoName(file.name);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      if (ev.target?.result) {
        const rawSrc = ev.target.result as string;
        // Remover automáticamente fondo sólido para generar transparencia PNG
        const transparentSrc = await removeImageBackground(rawSrc);
        setLogo(transparentSrc);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    setIsProcessingCanvas(true);

    if (prenda === 'mezclilla') {
      const isReflective = versionMezclilla === 'con_reflejante';
      const imgSrc = isReflective
        ? (vista === 'frente' ? prendaActual.frenteImgColor : prendaActual.espaldaImgColor)
        : (vista === 'frente' ? prendaActual.frenteImgWhite : prendaActual.espaldaImgWhite);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imgSrc;

      img.onload = () => {
        cvs.width = img.naturalWidth;
        cvs.height = img.naturalHeight;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0);
        setIsProcessingCanvas(false);
      };
      return;
    }

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

      ctx.drawImage(img, 0, 0);

      if (isWhite) {
        setIsProcessingCanvas(false);
        return;
      }

      const w = cvs.width;
      const h = cvs.height;
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      const [tr, tg, tb] = colorOption.rgb!;

      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a === 0) continue;

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;

        data[i]     = Math.min(255, Math.round(tr * brightness));
        data[i + 1] = Math.min(255, Math.round(tg * brightness));
        data[i + 2] = Math.min(255, Math.round(tb * brightness));
      }

      ctx.putImageData(imgData, 0, 0);
      setIsProcessingCanvas(false);
    };
  }, [prenda, vista, colorOption, versionMezclilla]);

  const activeColorLabel = prenda === 'mezclilla'
    ? (versionMezclilla === 'con_reflejante' ? 'Azul Mezclilla c/ Reflejante' : 'Azul Mezclilla Clásica')
    : colorOption.n;

  const handleDownloadMockup = () => {
    const cvs = canvasRef.current;
    if (!cvs) return;

    const exportCvs = document.createElement('canvas');
    exportCvs.width = cvs.width;
    exportCvs.height = cvs.height;
    const ctx = exportCvs.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCvs.width, exportCvs.height);
    ctx.drawImage(cvs, 0, 0);

    const filenamePrefix = `HUPAC_${prenda.toUpperCase()}_${activeColorLabel.replace(/\s+/g, '_')}_${vista}.png`;

    if (logo) {
      const logoImg = new Image();
      logoImg.src = logo;
      logoImg.onload = () => {
        const posX = (currentPos.x / 100) * exportCvs.width;
        const posY = (currentPos.y / 100) * exportCvs.height;
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
        link.download = filenamePrefix;
        link.href = exportCvs.toDataURL('image/png');
        link.click();
      };
    } else {
      const link = document.createElement('a');
      link.download = filenamePrefix;
      link.href = exportCvs.toDataURL('image/png');
      link.click();
    }
  };

  const fechaActualStr = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const ticketFormattedText = 
`📄 *TICKET DE COTIZACIÓN FORMAL*
🏢 *HUPAC TEXTILES S.A. DE C.V.*
────────────────────────────
🆔 *Folio:* #${folio}
📅 *Fecha:* ${fechaActualStr}
────────────────────────────
👔 *ESPECIFICACIONES DE PRENDA*
• *Modelo:* ${prendaActual.nombre}
• *Color / Versión:* ${activeColorLabel}
• *Descripción:* ${prendaActual.subtitulo}

🪡 *PERSONALIZACIÓN Y BORDADO*
• *Técnica:* ${tec}
• *Vista de Prenda:* ${vista === 'frente' ? 'Frontal (Frente)' : 'Trasera (Espalda)'}
• *Posición de Logo:* ${activePositionName}
• *Tamaño de Logo:* ${size}% (Aprox. ${Math.round(size * 0.12)} cm)
• *Logotipo:* ${logo ? `Cargado ✓ (${logoName || 'Imagen adjunta'})` : 'Pendiente de enviar por chat'}

📦 *CONDICIONES Y CONFECCIÓN*
• Confección 100% Nacional (México)
• Garantía de Calidad Textil Empresarial HUPAC
────────────────────────────
💬 *Mensaje del Cliente:* Hola HUPAC TEXTILES, adjunto mi ticket de cotización para solicitar propuesta formal con escala de precios por volumen.`;

  const msg = encodeURIComponent(ticketFormattedText);

  return (
    <div id="configurador" className="config-wrap" ref={containerRef}>
      <div className="config" style={{ maxWidth: '1320px', padding: 0, gap: '32px' }}>
        
        {/* ================= PANEL IZQUIERDO: CONTROLES ================= */}
        <div className="panel" style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--linea)',
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: '0 12px 36px rgba(19, 42, 82, 0.06)'
        }}>
          <div className="rv" style={{ marginBottom: '16px' }}>
            <span className="eyebrow" style={{ color: 'var(--rey)', display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(36,86,196,0.06)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800 }}>
              <IconSparkles size={14} color="var(--rey)" /> Personaliza tu Uniforme con tu Logo
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 850, color: 'var(--marino)', margin: '8px 0 6px 0', lineHeight: 1.25 }}>
              Prueba cómo luce tu logotipo sobre prendas reales en alta definición.
            </h2>
            <p style={{ color: 'var(--texto-2)', fontSize: '0.92rem', lineHeight: 1.45, margin: 0 }}>
              Elige el modelo, color institucional y sube tu logotipo para generar tu cotización y mockup digital.
            </p>
          </div>
          
          {/* 1. Prenda Base (4 botones limpios con SVG) */}
          <div className="grupo rv">
            <label className="tit">1 · Modelo de Prenda</label>
            <div className="opciones" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
              <button 
                type="button"
                className={`op ${prenda === 'polo' ? 'on' : ''}`} 
                onClick={() => handlePrendaChange('polo')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <IconPolo size={19} color={prenda === 'polo' ? '#ffffff' : 'var(--rey)'} />
                <span>Polo Piqué</span>
              </button>
              <button 
                type="button"
                className={`op ${prenda === 'playera' ? 'on' : ''}`} 
                onClick={() => handlePrendaChange('playera')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <IconPlayeraRound size={19} color={prenda === 'playera' ? '#ffffff' : 'var(--rey)'} />
                <span>Playera Cuello Redondo</span>
              </button>
              <button 
                type="button"
                className={`op ${prenda === 'camisa' ? 'on' : ''}`} 
                onClick={() => handlePrendaChange('camisa')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <IconCamisa size={19} color={prenda === 'camisa' ? '#ffffff' : 'var(--rey)'} />
                <span>Camisa de Vestir</span>
              </button>
              <button 
                type="button"
                className={`op ${prenda === 'mezclilla' ? 'on' : ''}`} 
                onClick={() => handlePrendaChange('mezclilla')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <IconMezclilla size={19} color={prenda === 'mezclilla' ? '#ffffff' : 'var(--rey)'} />
                <span>Camisa de Mezclilla</span>
              </button>
            </div>
          </div>
          
          {/* 2. Color de Línea o Selector de Reflejante para Mezclilla */}
          {prenda === 'mezclilla' ? (
            <div className="grupo rv">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <label className="tit" style={{ margin: 0 }}>2 · Versión / Cintas Reflejantes</label>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--marino)' }}>
                  {versionMezclilla === 'con_reflejante' ? 'Con Cintas Reflejantes' : 'Sin Reflejante'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className={`op ${versionMezclilla === 'sin_reflejante' ? 'on' : ''}`}
                  onClick={() => setVersionMezclilla('sin_reflejante')}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 14px' }}
                >
                  <IconMezclilla size={18} color={versionMezclilla === 'sin_reflejante' ? '#ffffff' : 'var(--marino)'} />
                  <span>Sin Reflejante</span>
                </button>
                <button
                  type="button"
                  className={`op ${versionMezclilla === 'con_reflejante' ? 'on' : ''}`}
                  onClick={() => setVersionMezclilla('con_reflejante')}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 14px' }}
                >
                  <IconReflectiveStripes size={18} color={versionMezclilla === 'con_reflejante' ? '#ffffff' : 'var(--marino)'} />
                  <span>Con Reflejante</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grupo rv">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <label className="tit" style={{ margin: 0 }}>2 · Color de Línea HUPAC</label>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--marino)' }}>
                  {colorOption.n}
                </span>
              </div>
              <div className="swatches">
                {coloresActuales.map(opt => (
                  <button 
                    key={opt.c}
                    type="button"
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
          )}

          {/* 3. Vista de la Prenda (Frente / Espalda) */}
          <div className="grupo rv">
            <label className="tit">3 · Vista de la Prenda</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button"
                className={`op ${vista === 'frente' ? 'on' : ''}`} 
                onClick={() => setVista('frente')}
                style={{ flex: 1, textAlign: 'center', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <IconPlayeraRound size={17} color={vista === 'frente' ? '#ffffff' : 'var(--rey)'} />
                <span>Vista Frontal (Frente)</span>
              </button>
              <button 
                type="button"
                className={`op ${vista === 'espalda' ? 'on' : ''}`} 
                onClick={() => setVista('espalda')}
                style={{ flex: 1, textAlign: 'center', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <IconRotate size={17} color={vista === 'espalda' ? '#ffffff' : 'var(--rey)'} />
                <span>Vista Trasera (Espalda)</span>
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
                    type="button"
                    className={`op ${(!isCustomActive && posicionFrente === p.id) ? 'on' : ''}`} 
                    onClick={() => {
                      setPosicionFrente(p.id);
                      setCustomPosFrente(null);
                    }}
                  >
                    {p.label}
                  </button>
                ))
              ) : (
                prendaActual.posicionesEspalda.map(p => (
                  <button 
                    key={p.id}
                    type="button"
                    className={`op ${(!isCustomActive && posicionEspalda === p.id) ? 'on' : ''}`} 
                    onClick={() => {
                      setPosicionEspalda(p.id);
                      setCustomPosEspalda(null);
                    }}
                  >
                    {p.label}
                  </button>
                ))
              )}
            </div>

            {isCustomActive && (
              <div style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '0.8rem',
                color: 'var(--rey)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📍</span> <strong>Ubicación libre activa</strong> (arrastrada en prenda)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (vista === 'frente') setCustomPosFrente(null);
                    else setCustomPosEspalda(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    fontWeight: 750,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: '2px 6px',
                    fontSize: '0.8rem'
                  }}
                >
                  Restablecer
                </button>
              </div>
            )}

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

          {/* 5. Técnica */}
          <div className="grupo rv">
            <label className="tit">5 · Técnica de Personalización</label>
            <div className="opciones">
              <button 
                type="button"
                className={`op ${tec === 'Bordado' ? 'on' : ''}`} 
                onClick={() => setTec('Bordado')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <IconBordado size={18} color={tec === 'Bordado' ? '#ffffff' : 'var(--rey)'} />
                <span>Bordado (Relieve de Hilo)</span>
              </button>
              <button 
                type="button"
                className={`op ${tec === 'Estampado' ? 'on' : ''}`} 
                onClick={() => setTec('Estampado')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <IconDTG size={18} color={tec === 'Estampado' ? '#ffffff' : 'var(--rey)'} />
                <span>Estampado / DTG / Serigrafía</span>
              </button>
            </div>
          </div>

          {/* 6. Logotipo del Cliente (LADO IZQUIERDO) */}
          <div className="grupo rv">
            <label className="tit">6 · Logotipo del Cliente</label>
            <label 
              htmlFor="fileLogo"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px 20px',
                backgroundColor: logo ? 'rgba(34, 197, 94, 0.05)' : '#eff6ff',
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
                color: logo ? '#16a34a' : 'var(--rey)'
              }}>
                {logo ? <IconCheckSimple size={24} color="#16a34a" /> : <IconUploadCloud size={24} color="var(--rey)" />}
              </div>

              <span style={{ fontSize: '0.98rem', fontWeight: 750, color: 'var(--marino)', display: 'block', marginBottom: '4px' }}>
                {logo ? `¡Logotipo cargado! (${logoName})` : 'Carga tu archivo de logotipo'}
              </span>

              <span style={{ fontSize: '0.82rem', color: 'var(--texto-2)', display: 'block', maxWidth: '360px', lineHeight: 1.4 }}>
                {logo 
                  ? 'El logo se muestra en la prenda a la derecha.' 
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

            {/* Leyenda de recomendación PNG */}
            <div style={{
              marginTop: '12px',
              backgroundColor: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '0.82rem',
              color: '#0369a1',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              lineHeight: 1.45
            }}>
              <div style={{ flexShrink: 0, marginTop: '1px' }}>
                <IconInfoCircle size={18} color="#0369a1" />
              </div>
              <div>
                <strong>Recomendación:</strong> Es preferible adjuntar tu imagen en formato <strong>PNG con fondo transparente</strong> para un acabado óptimo. Si tu imagen tiene fondo blanco, nuestro sistema intentará removerlo automáticamente.
              </div>
            </div>
          </div>
        </div>

        {/* ================= PANEL DERECHO: VISOR FOTORREALISTA, TICKET Y WHATSAPP ================= */}
        <div className="visor rv" aria-label="Vista previa fotorrealista de la prenda configurada" style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--linea)',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 12px 36px rgba(19, 42, 82, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          position: 'sticky',
          top: '80px',
          alignSelf: 'flex-start'
        }}>
          
          {/* TARJETA DEL VISOR MOCKUP FOTORREALISTA */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--linea)', borderRadius: '20px', padding: '20px', boxShadow: 'var(--sombra)' }}>
            {/* Barra superior del visor */}
            <div className="visor-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
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
                {prenda !== 'mezclilla' && (
                  <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: colorOption.c,
                    border: colorOption.c === '#FFFFFF' ? '1px solid #cbd5e1' : 'none',
                    display: 'inline-block'
                  }} />
                )}
                <span style={{ fontWeight: 700, color: 'var(--marino)', fontSize: '0.85rem' }}>
                  {activeColorLabel}
                </span>
              </div>
            </div>

            {/* Selector Rápido de Frente / Espalda dentro del Visor */}
            <div style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              padding: '4px',
              borderRadius: '100px',
              marginBottom: '16px',
              gap: '4px'
            }}>
              <button
                type="button"
                onClick={() => setVista('frente')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '100px',
                  border: 'none',
                  backgroundColor: vista === 'frente' ? '#ffffff' : 'transparent',
                  color: vista === 'frente' ? 'var(--rey)' : 'var(--texto-2)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: vista === 'frente' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <IconPlayeraRound size={15} color={vista === 'frente' ? 'var(--rey)' : 'var(--texto-2)'} />
                <span>Vista Frente</span>
              </button>
              <button
                type="button"
                onClick={() => setVista('espalda')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '100px',
                  border: 'none',
                  backgroundColor: vista === 'espalda' ? '#ffffff' : 'transparent',
                  color: vista === 'espalda' ? 'var(--rey)' : 'var(--texto-2)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: vista === 'espalda' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <IconRotate size={15} color={vista === 'espalda' ? 'var(--rey)' : 'var(--texto-2)'} />
                <span>Vista Espalda</span>
              </button>
            </div>

            {/* Contenedor del Mockup Fotorrealista */}
            <div 
              ref={mockupContainerRef}
              style={{
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
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.02)',
                userSelect: 'none'
              }}
            >
              
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
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{
                    position: 'absolute',
                    left: `${currentPos.x}%`,
                    top: `${currentPos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${(size / 100) * activePositionObj.maxW}px`,
                    maxWidth: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: isDragging ? 'none' : 'left 0.12s ease-out, top 0.12s ease-out',
                    zIndex: 25,
                    pointerEvents: 'auto',
                    touchAction: 'none',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    userSelect: 'none'
                  }}
                  title="Arrastra para mover libremente por la prenda"
                >
                  {!logo ? (
                    /* Placeholder visual cuando aún no hay logo subido */
                    <div style={{
                      border: isDragging ? '2px solid var(--rey)' : '2px dashed var(--rey)',
                      backgroundColor: isDragging ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.88)',
                      backdropFilter: 'blur(3px)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      boxShadow: isDragging ? '0 8px 24px rgba(36, 86, 196, 0.3)' : '0 4px 12px rgba(36, 86, 196, 0.15)',
                      transform: isDragging ? 'scale(1.04)' : 'scale(1)',
                      transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                      width: '100%',
                      cursor: isDragging ? 'grabbing' : 'grab',
                    }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--marino)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        TU LOGO AQUÍ
                      </span>
                      <span style={{ fontSize: '0.62rem', color: 'var(--texto-2)', display: 'block', whiteSpace: 'nowrap' }}>
                        {activePositionName}
                      </span>
                      <span style={{ fontSize: '0.56rem', color: 'var(--rey)', display: 'block', marginTop: '2px', fontWeight: 700 }}>
                        {isDragging ? 'Soltar para fijar' : '✋ Arrastra para mover'}
                      </span>
                    </div>
                  ) : (
                    /* Logotipo aplicado con textura de Bordado o Estampado */
                    <div style={{
                      position: 'relative',
                      display: 'inline-flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '4px',
                      border: isDragging ? '1.5px dashed var(--rey)' : '1.5px dashed transparent',
                      borderRadius: '8px',
                      backgroundColor: isDragging ? 'rgba(36, 86, 196, 0.08)' : 'transparent',
                      transform: isDragging ? 'scale(1.04)' : 'scale(1)',
                      transition: 'transform 0.1s ease, background-color 0.15s',
                      cursor: isDragging ? 'grabbing' : 'grab'
                    }}>
                      <img
                        src={logo}
                        alt="Logotipo del cliente en uniforme"
                        draggable={false}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '140px',
                          objectFit: 'contain',
                          filter: tec === 'Bordado'
                            ? 'drop-shadow(0 2px 2px rgba(0,0,0,0.4)) drop-shadow(0 -0.5px 0.5px rgba(255,255,255,0.5)) contrast(1.1)'
                            : 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))',
                          pointerEvents: 'none',
                          userSelect: 'none'
                        }}
                      />
                      {isDragging && (
                        <span style={{
                          position: 'absolute',
                          bottom: '-18px',
                          backgroundColor: 'var(--marino)',
                          color: '#fff',
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none'
                        }}>
                          Moviendo logo...
                        </span>
                      )}
                    </div>
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
                {tec === 'Bordado' ? <IconBordado size={14} color="var(--rey)" /> : <IconDTG size={14} color="var(--rey)" />}
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
                <IconRotate size={13} color="var(--rey)" />
                <span>Ver {vista === 'frente' ? 'Espalda' : 'Frente'}</span>
              </button>
            </div>

            {/* Acciones del visor: Descargar diseño */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
              <p className="nota" style={{ margin: 0, fontSize: '0.78rem', color: 'var(--texto-2)' }}>
                💡 Puedes arrastrar y mover libremente tu logotipo sobre la prenda con el mouse o dedo.
              </p>
              <button
                type="button"
                onClick={handleDownloadMockup}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '100px',
                  padding: '6px 14px',
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
                <IconDownload size={14} color="var(--marino)" />
                <span>Descargar Vista</span>
              </button>
            </div>
          </div>

          {/* ================= TICKET DE COTIZACIÓN DIGITAL (LADO DERECHO) ================= */}
          <div className="resumen" style={{ 
            backgroundColor: '#ffffff', 
            border: '2px dashed #cbd5e1', 
            borderRadius: '16px',
            padding: '18px',
            boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '2px dashed #e2e8f0', paddingBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--rey)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                  HUPAC TEXTILES S.A. DE C.V.
                </span>
                <b style={{ color: 'var(--marino)', fontSize: '1rem', display: 'block' }}>
                  Ticket de Cotización Digital
                </b>
              </div>
              <span style={{ 
                fontSize: '0.8rem', 
                backgroundColor: '#eff6ff', 
                color: 'var(--rey)', 
                padding: '4px 10px', 
                borderRadius: '8px', 
                fontWeight: 800,
                border: '1px solid #bfdbfe'
              }}>
                #{folio}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 14px', fontSize: '0.86rem', color: '#334155', marginBottom: '14px' }}>
              <div>Prenda: <b style={{ color: 'var(--marino)' }}>{prendaActual.nombre}</b></div>
              <div>Versión / Color: <b style={{ color: 'var(--marino)' }}>{activeColorLabel}</b></div>
              <div>Técnica: <b>{tec}</b></div>
              <div>Vista: <b>{vista === 'frente' ? 'Frontal (Frente)' : 'Trasera (Espalda)'}</b></div>
              <div>Posición Logo: <b>{activePositionName}</b></div>
              <div>Tamaño Logo: <b>{size}%</b></div>
              <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                Logotipo: <b style={{ color: logo ? '#16a34a' : '#ea580c' }}>{logo ? `Cargado ✓ (${logoName})` : 'Pendiente de adjuntar por chat'}</b>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowTicketModal(true)}
                style={{
                  flex: 1,
                  backgroundColor: '#f8fafc',
                  color: 'var(--marino)',
                  border: '1px solid #cbd5e1',
                  borderRadius: '100px',
                  padding: '10px 16px',
                  fontSize: '0.86rem',
                  fontWeight: 750,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <IconTicket size={16} color="var(--marino)" />
                <span>Ver Ticket PDF / Formato</span>
              </button>
            </div>
          </div>
          
          {/* ================= BOTÓN ENVIAR TICKET POR WHATSAPP (LADO DERECHO) ================= */}
          <button 
            type="button"
            className="btn" 
            onClick={async () => {
              try {
                await addDoc(collection(db, 'orders'), {
                  tipo: 'Cotización Personalizada',
                  folio: folio,
                  prenda: prendaActual.nombre,
                  color: activeColorLabel,
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
              window.open(`https://wa.me/525516257933?text=${msg}`, '_blank');
            }}
            style={{ 
              width: '100%',
              border: 'none', 
              cursor: 'pointer', 
              fontFamily: 'var(--fuente-cuerpo)',
              padding: '16px 28px',
              fontSize: '1rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              borderRadius: '100px',
              boxShadow: '0 8px 20px rgba(36, 86, 196, 0.25)'
            }}
          >
            <IconWhatsApp size={20} />
            <span>Enviar Ticket por WhatsApp</span>
          </button>
        </div>

        {/* ================= MODAL FORMATO TICKET DE COTIZACIÓN ================= */}
        {showTicketModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '620px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #cbd5e1',
              padding: '28px',
              position: 'relative'
            }}>
              {/* Botón cerrar */}
              <button
                type="button"
                onClick={() => setShowTicketModal(false)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  backgroundColor: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>

              {/* Header del Ticket */}
              <div style={{ borderBottom: '2px solid #2456C4', paddingBottom: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ color: 'var(--marino)', margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                      HUPAC TEXTILES S.A. DE C.V.
                    </h3>
                    <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
                      Confección & Personalización Textil Empresarial · México
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.78rem', backgroundColor: '#2456C4', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontWeight: 800 }}>
                      TICKET OFICIAL
                    </span>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', fontWeight: 800, color: 'var(--marino)' }}>
                      #{folio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Datos Generales */}
              <div style={{ backgroundColor: '#f8fafc', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem' }}>
                <div><b>Fecha de Solicitud:</b> {fechaActualStr}</div>
                <div><b>Estado:</b> <span style={{ color: '#16a34a', fontWeight: 700 }}>Válido para Cotización</span></div>
                <div><b>Garantía:</b> 100% Hecho en México</div>
                <div><b>Mínimo de Compra:</b> Desde 1 pieza</div>
              </div>

              {/* Detalles de Configuración */}
              <h4 style={{ color: 'var(--marino)', fontSize: '1.05rem', margin: '0 0 12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px' }}>
                Especificaciones del Pedido
              </h4>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '20px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 0', color: '#64748b', fontWeight: 600 }}>Modelo de Prenda</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 800, color: 'var(--marino)' }}>{prendaActual.nombre}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 0', color: '#64748b', fontWeight: 600 }}>Versión / Color</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 800 }}>{activeColorLabel}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 0', color: '#64748b', fontWeight: 600 }}>Técnica de Personalización</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 800 }}>{tec}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 0', color: '#64748b', fontWeight: 600 }}>Vista Configurada</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 800 }}>{vista === 'frente' ? 'Frontal (Frente)' : 'Trasera (Espalda)'}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 0', color: '#64748b', fontWeight: 600 }}>Posición del Logo</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 800 }}>{activePositionName}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 0', color: '#64748b', fontWeight: 600 }}>Tamaño Escala Logo</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 800 }}>{size}% (Aprox. {Math.round(size * 0.12)} cm)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', color: '#64748b', fontWeight: 600 }}>Archivo de Logotipo</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 800, color: logo ? '#16a34a' : '#ea580c' }}>
                      {logo ? `Cargado ✓ (${logoName})` : 'Pendiente por WhatsApp'}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Botones de acción del Modal */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    color: 'var(--marino)',
                    border: '1px solid #cbd5e1',
                    borderRadius: '100px',
                    padding: '12px',
                    fontWeight: 750,
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Imprimir Ticket
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.open(`https://wa.me/525516257933?text=${msg}`, '_blank');
                  }}
                  style={{
                    flex: 1.5,
                    backgroundColor: '#2456C4',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '100px',
                    padding: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    fontSize: '0.95rem'
                  }}
                >
                  Enviar este Ticket a WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

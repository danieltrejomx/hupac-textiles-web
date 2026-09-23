'use client';
import React from 'react';

// =========================================================================
// 1. ANIMACIÓN: BORDADO INDUSTRIAL COMPUTARIZADO
// =========================================================================
export function AnimacionBordado() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 500 240" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', maxWidth: '620px', maxHeight: '100%', display: 'block', margin: '0 auto' }}>
        <defs>
          {/* Trama de tejido de tela piqué/gabardina industrial */}
          <pattern id="telaIndustrial" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#132a52" />
            <path d="M0 3h6M3 0v6" stroke="#1e3a8a" strokeWidth="0.8" opacity="0.6" />
            <circle cx="1.5" cy="1.5" r="0.6" fill="#2563eb" opacity="0.4" />
            <circle cx="4.5" cy="4.5" r="0.6" fill="#2563eb" opacity="0.4" />
          </pattern>

          {/* Textura de puntadas de satín bordadas con ángulo */}
          <pattern id="satinHilos" width="4" height="8" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="4" stroke="#fef08a" strokeWidth="1.2" opacity="0.9" />
            <line x1="0" y1="4" x2="4" y2="8" stroke="#ca8a04" strokeWidth="1.2" opacity="0.8" />
          </pattern>

          {/* Gradiente cromado de acero y aluminio aeroespacial */}
          <linearGradient id="aceroCNC" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="25%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="75%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Gradiente dorado metálico para hilo de bordar Madeira */}
          <linearGradient id="hiloOro3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          {/* Gradiente para hilo azul eléctrico reflectivo */}
          <linearGradient id="hiloAzul3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="40%" stopColor="#38bdf8" />
            <stop offset="80%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>

          {/* Sombra de relieve tridimensional bordado */}
          <filter id="relevoBordado" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="1.5" floodColor="#050b14" floodOpacity="0.8" />
          </filter>

          {/* Resplandor láser CNC */}
          <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <style>{`
          @keyframes agujaPunzona {
            0%, 100% { transform: translateY(0); }
            45% { transform: translateY(28px); }
            50% { transform: translateY(30px); }
            55% { transform: translateY(28px); }
          }
          @keyframes footBounce {
            0%, 100% { transform: translateY(0); }
            40% { transform: translateY(18px); }
            50% { transform: translateY(22px); }
            60% { transform: translateY(18px); }
          }
          @keyframes pantografoCNC {
            0%, 100% { transform: translate(0, 0); }
            20% { transform: translate(-8px, 4px); }
            40% { transform: translate(7px, -5px); }
            65% { transform: translate(-5px, -3px); }
            85% { transform: translate(6px, 5px); }
          }
          @keyframes threadFlutter {
            0%, 100% { d: path("M 250 42 Q 248 75 250 110"); }
            50% { d: path("M 250 42 Q 254 75 250 110"); }
          }
          @keyframes laserPulse {
            0%, 100% { opacity: 0.65; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes satinGrowth {
            0% { stroke-dashoffset: 600; }
            100% { stroke-dashoffset: 0; }
          }
        `}</style>

        {/* Fondo: Cama de la bordadora industrial con guías CNC */}
        <rect width="500" height="240" fill="#090f1d" />

        {/* Rieles de medición CNC en los costados */}
        <g opacity="0.35">
          <line x1="20" y1="50" x2="20" y2="230" stroke="#334155" strokeWidth="1" />
          <line x1="480" y1="50" x2="480" y2="230" stroke="#334155" strokeWidth="1" />
          {[60, 90, 120, 150, 180, 210].map((y) => (
            <g key={y}>
              <line x1="16" y1={y} x2="24" y2={y} stroke="#64748b" strokeWidth="1.5" />
              <line x1="476" y1={y} x2="484" y2={y} stroke="#64748b" strokeWidth="1.5" />
            </g>
          ))}
        </g>

        {/* ================================================================= */}
        {/* PANTÓGRAFO INDUSTRIAL CNC Y BASTIDOR DE ALUMINIO CON PRENDA */}
        {/* ================================================================= */}
        <g style={{ animation: 'pantografoCNC 7s infinite ease-in-out' }}>
          {/* Brazos mecánicos del pantógrafo (Izquierda y Derecha) */}
          <rect x="25" y="142" width="55" height="12" rx="2" fill="url(#aceroCNC)" stroke="#1e293b" strokeWidth="1" />
          <rect x="420" y="142" width="55" height="12" rx="2" fill="url(#aceroCNC)" stroke="#1e293b" strokeWidth="1" />
          <circle cx="50" cy="148" r="3.5" fill="#1e293b" />
          <circle cx="450" cy="148" r="3.5" fill="#1e293b" />

          {/* Bastidor Industrial Rectangular de Aluminio Aeroespacial */}
          {/* Sombra del bastidor sobre la cama */}
          <rect x="74" y="80" width="352" height="136" rx="20" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="16" />

          {/* Marco exterior de aluminio pulido */}
          <rect x="74" y="80" width="352" height="136" rx="20" fill="none" stroke="url(#aceroCNC)" strokeWidth="12" />
          <rect x="74" y="80" width="352" height="136" rx="20" fill="none" stroke="#1e293b" strokeWidth="1" />

          {/* Mordazas de fijación y tensión rápida (Quick-lock clamps) */}
          <rect x="68" y="136" width="12" height="24" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          <rect x="420" y="136" width="12" height="24" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          <line x1="68" y1="148" x2="80" y2="148" stroke="#0f172a" strokeWidth="2" />
          <line x1="420" y1="148" x2="432" y2="148" stroke="#0f172a" strokeWidth="2" />

          {/* Prenda Textil Tensada (Tela Azul Marino HUPAC) */}
          <rect x="80" y="86" width="340" height="124" rx="16" fill="url(#telaIndustrial)" />

          {/* Guías vectoriales del software de ponchado (Wilcom / Tajima) */}
          <g opacity="0.3">
            <line x1="120" y1="148" x2="380" y2="148" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="250" y1="95" x2="250" y2="200" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 4" />
            <circle cx="250" cy="148" r="45" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 3" />
          </g>

          {/* =============================================================== */}
          {/* LOGOTIPO BORDADO REAL CON VOLUMEN 3D Y PUNTADAS DE SATÍN */}
          {/* =============================================================== */}
          <g filter="url(#relevoBordado)">
            {/* Escudo heráldico exterior bordado en hilo azul eléctrico */}
            <path
              d="M 195 110 L 250 96 L 305 110 C 305 155 250 182 250 182 C 250 182 195 155 195 110 Z"
              fill="none"
              stroke="url(#hiloAzul3D)"
              strokeWidth="5"
              strokeLinejoin="round"
              strokeDasharray="600"
              style={{ animation: 'satinGrowth 6s infinite linear' }}
            />
            {/* Cordón interior de satín en hilo dorado */}
            <path
              d="M 203 114 L 250 102 L 297 114 C 297 150 250 174 250 174 C 250 174 203 150 203 114 Z"
              fill="rgba(2, 6, 23, 0.45)"
              stroke="url(#hiloOro3D)"
              strokeWidth="2.5"
              strokeDasharray="400"
              style={{ animation: 'satinGrowth 6s infinite linear' }}
            />

            {/* Letra 'H' en relieve 3D bordado (Puntadas de columna satinada) */}
            <g>
              {/* Columna Izquierda 'H' */}
              <rect x="220" y="118" width="14" height="42" rx="2" fill="url(#hiloOro3D)" />
              {/* Rayas de puntadas de satín para textura de hilo real */}
              {[120, 124, 128, 132, 136, 140, 144, 148, 152, 156].map((sy) => (
                <line key={`lh-${sy}`} x1="220" y1={sy} x2="234" y2={sy + 2} stroke="#fef08a" strokeWidth="0.9" opacity="0.6" />
              ))}

              {/* Columna Derecha 'H' */}
              <rect x="266" y="118" width="14" height="42" rx="2" fill="url(#hiloOro3D)" />
              {[120, 124, 128, 132, 136, 140, 144, 148, 152, 156].map((sy) => (
                <line key={`rh-${sy}`} x1="266" y1={sy} x2="280" y2={sy + 2} stroke="#fef08a" strokeWidth="0.9" opacity="0.6" />
              ))}

              {/* Travesaño Central 'H' */}
              <rect x="234" y="133" width="32" height="12" fill="url(#hiloOro3D)" />
              {[236, 242, 248, 254, 260].map((sx) => (
                <line key={`mh-${sx}`} x1={sx} y1="133" x2={sx} y2="145" stroke="#fef08a" strokeWidth="0.9" opacity="0.6" />
              ))}
            </g>

            {/* Texto bordado "HUPAC" en puntada corrida de alta definición */}
            <text x="250" y="171" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="2.5">
              HUPAC
            </text>
          </g>

          {/* Puntero Láser CNC de Posicionamiento (Cruz roja de precisión) */}
          <g transform="translate(250, 148)" filter="url(#laserGlow)" style={{ animation: 'laserPulse 1.5s infinite ease-in-out' }}>
            <circle cx="0" cy="0" r="2.5" fill="#ef4444" />
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#ef4444" strokeWidth="1" opacity="0.8" />
            <line x1="0" y1="-10" x2="0" y2="10" stroke="#ef4444" strokeWidth="1" opacity="0.8" />
          </g>
        </g>

        {/* ================================================================= */}
        {/* CABEZAL INDUSTRIAL MULTICABEZAL TAJIMA / BARUDAN (PARTE SUPERIOR) */}
        {/* ================================================================= */}
        {/* Estante de conos de hilo (Thread Stand Tree) */}
        <g>
          {/* Barra soporte de conos */}
          <rect x="160" y="2" width="180" height="5" rx="1.5" fill="url(#aceroCNC)" />
          
          {/* 5 Conos industriales de hilo de bordar (Diferentes colores oficiales) */}
          {[
            { x: 175, col: '#ca8a04', label: 'ORO' },
            { x: 212, col: '#0284c7', label: 'AZUL' },
            { x: 250, col: '#f8fafc', label: 'BLANCO' },
            { x: 288, col: '#ef4444', label: 'ROJO' },
            { x: 325, col: '#94a3b8', label: 'PLATA' }
          ].map((cono, i) => (
            <g key={i}>
              {/* Carrete cónico de hilo */}
              <polygon
                points={`${cono.x - 7},${7} ${cono.x + 7},${7} ${cono.x + 10},${22} ${cono.x - 10},${22}`}
                fill={cono.col}
                stroke="#0f172a"
                strokeWidth="0.8"
              />
              {/* Base del cono */}
              <rect x={cono.x - 11} y="22" width="22" height="3" rx="1" fill="#334155" />
              {/* Ojal guía de hilo superior */}
              <circle cx={cono.x} cy="4" r="1.5" fill="#f8fafc" />
            </g>
          ))}

          {/* Hilo dorado activo que desciende desde el cono 1 hacia el tensor */}
          <path d="M 175 4 L 175 18 L 246 36" stroke="url(#hiloOro3D)" strokeWidth="1.2" fill="none" opacity="0.85" />
        </g>

        {/* Carcasa Principal del Cabezal de Bordado Industrial */}
        <g>
          {/* Bloque masivo del cabezal */}
          <path d="M 215 28 L 285 28 L 280 82 L 220 82 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <path d="M 224 34 L 276 34 L 272 76 L 228 76 Z" fill="url(#aceroCNC)" opacity="0.9" />

          {/* Discos de tensión rotativos cromados */}
          <circle cx="236" cy="46" r="6" fill="url(#aceroCNC)" stroke="#0f172a" strokeWidth="1" />
          <circle cx="250" cy="46" r="6" fill="url(#aceroCNC)" stroke="#0f172a" strokeWidth="1" />
          <circle cx="264" cy="46" r="6" fill="url(#aceroCNC)" stroke="#0f172a" strokeWidth="1" />
          
          {/* Indicador LED de cabezal activo Tajima */}
          <circle cx="250" cy="62" r="3" fill="#22c55e" filter="url(#laserGlow)" />

          {/* Tirahilos articulado en movimiento (Take-up lever) */}
          <line x1="250" y1="46" x2="250" y2="78" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Hilo vibrando entre el tirahilos y la aguja */}
        <path
          d="M 250 78 Q 252 105 250 125"
          stroke="url(#hiloOro3D)"
          strokeWidth="1.8"
          fill="none"
          style={{ animation: 'threadFlutter 0.25s infinite linear' }}
        />

        {/* ================================================================= */}
        {/* BARRA DE AGUJA ACTIVA Y PRENSATELAS CIRCULAR EN PUNZONADO RÁPIDO */}
        {/* ================================================================= */}
        {/* Prensa-telas circular móvil (Presser Foot) */}
        <g style={{ animation: 'footBounce 0.5s infinite ease-in-out' }}>
          <path d="M 238 90 L 238 132 L 243 138 M 262 90 L 262 132 L 257 138" fill="none" stroke="url(#aceroCNC)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Anillo del prensatelas */}
          <ellipse cx="250" cy="144" rx="8" ry="3.5" fill="none" stroke="url(#aceroCNC)" strokeWidth="2.5" />
        </g>

        {/* Barra de la aguja cromada punzonando a 1,200 RPM */}
        <g style={{ animation: 'agujaPunzona 0.5s infinite ease-in-out' }}>
          {/* Sujetador de aguja (Needle clamp) */}
          <rect x="244" y="82" width="12" height="16" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
          <circle cx="250" cy="90" r="2" fill="#f8fafc" />

          {/* Vástago de la aguja cromada */}
          <rect x="248.8" y="98" width="2.4" height="42" fill="url(#aceroCNC)" />

          {/* Punta cónica de aguja industrial DBxK5 */}
          <polygon points="248.8,140 251.2,140 250,148" fill="url(#aceroCNC)" />

          {/* Ojo de la aguja por donde pasa el hilo dorado */}
          <ellipse cx="250" cy="143" rx="0.7" ry="1.8" fill="#090f1d" />
        </g>

        {/* Telemetría industrial CNC inferior sobre la mesa */}
        <g opacity="0.6">
          <text x="35" y="228" fill="#64748b" fontSize="8" fontFamily="monospace" fontWeight="700">
            TAJIMA INDUSTRIAL CNC · MULTICABEZAL 15-AGUJAS
          </text>
          <text x="465" y="228" textAnchor="end" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="700">
            X: +124.5mm  Y: -42.0mm
          </text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// 2. ANIMACIÓN: SERIGRAFÍA TEXTIL DE ALTO RENDIMIENTO
// =========================================================================
export function AnimacionSerigrafia() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 500 240" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', maxWidth: '620px', maxHeight: '100%', display: 'block', margin: '0 auto' }}>
        <defs>
          {/* Clip path para revelar la tinta conforme avanza el rasero */}
          <clipPath id="inkRevealClip">
            <rect x="120" y="70" width="260" height="110" style={{ animation: 'clipReveal 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </clipPath>

          {/* Gradiente de rasero de madera y goma */}
          <linearGradient id="maderaRasero" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id="gomaPoliuretano" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Tinta Plastisol Brillante */}
          <linearGradient id="tintaPlastisol" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        <style>{`
          @keyframes squeegeeSweep {
            0%, 15% { transform: translateX(0); }
            55%, 80% { transform: translateX(200px); }
            95%, 100% { transform: translateX(0); }
          }
          @keyframes clipReveal {
            0%, 15% { width: 0px; }
            55%, 80% { width: 260px; }
            95%, 100% { width: 0px; }
          }
          @keyframes frameLift {
            0%, 55% { transform: translateY(0); }
            65%, 80% { transform: translateY(-8px); }
            90%, 100% { transform: translateY(0); }
          }
        `}</style>

        {/* Base / Mesa de Impresión */}
        <rect width="500" height="240" fill="#0f172a" />

        {/* Prenda Textil sobre la paleta */}
        <rect x="80" y="40" width="340" height="160" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <path d="M 80 80 Q 140 100 140 160 M 420 80 Q 360 100 360 160" stroke="#334155" strokeWidth="2" fill="none" opacity="0.4" />

        {/* LOGO IMPRESO EN LA PRENDA (Revelado por el paso del rasero) */}
        <g clipPath="url(#inkRevealClip)">
          {/* Tipografía y Escudo HUPAC en Plastisol de alta densidad */}
          <rect x="140" y="85" width="220" height="70" rx="8" fill="#132a52" stroke="#38bdf8" strokeWidth="2" />
          <text x="250" y="125" textAnchor="middle" fill="#38bdf8" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="4">
            HUPAC
          </text>
          <text x="250" y="143" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="sans-serif" letterSpacing="2">
            TEXTILES INDUSTRIAL
          </text>
          {/* Franjas decorativas de precisión */}
          <line x1="160" y1="102" x2="340" y2="102" stroke="#f59e0b" strokeWidth="3" />
          <line x1="160" y1="148" x2="340" y2="148" stroke="#f59e0b" strokeWidth="3" />
        </g>

        {/* MARCO DE SERIGRAFÍA (Se levanta ligeramente al terminar la pasada) */}
        <g style={{ animation: 'frameLift 3.5s infinite ease-in-out' }}>
          {/* Malla Serigráfica tensada (efecto traslúcido) */}
          <rect x="100" y="55" width="300" height="130" fill="rgba(254, 240, 138, 0.15)" stroke="#cbd5e1" strokeWidth="1" />
          
          {/* Silueta en negativo sobre la malla (Stencil) */}
          <rect x="140" y="85" width="220" height="70" rx="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Marco de Aluminio Robusto */}
          <rect x="94" y="49" width="312" height="142" rx="4" fill="none" stroke="#94a3b8" strokeWidth="12" />
          <rect x="94" y="49" width="312" height="142" rx="4" fill="none" stroke="#475569" strokeWidth="1.5" />
          {/* Soldaduras en las esquinas del marco */}
          <line x1="94" y1="49" x2="106" y2="61" stroke="#64748b" strokeWidth="3" />
          <line x1="406" y1="49" x2="394" y2="61" stroke="#64748b" strokeWidth="3" />
          <line x1="94" y1="191" x2="106" y2="179" stroke="#64748b" strokeWidth="3" />
          <line x1="406" y1="191" x2="394" y2="179" stroke="#64748b" strokeWidth="3" />
        </g>

        {/* RASERO (SQUEEGEE) CON TINTA EN MOVIMIENTO */}
        <g style={{ animation: 'squeegeeSweep 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1)' }}>
          {/* Banco de tinta plastisol que es arrastrado */}
          <ellipse cx="150" cy="120" rx="10" ry="48" fill="url(#tintaPlastisol)" opacity="0.9" />

          {/* Hoja de Goma de Poliuretano en ángulo */}
          <path d="M 142 65 L 149 65 L 153 175 L 146 175 Z" fill="url(#gomaPoliuretano)" stroke="#b45309" strokeWidth="1" />

          {/* Mango de Madera Ergonómico */}
          <rect x="134" y="60" width="12" height="120" rx="4" fill="url(#maderaRasero)" stroke="#78350f" strokeWidth="1.5" />
          {/* Tornillos del rasero */}
          <circle cx="140" cy="75" r="2" fill="#cbd5e1" />
          <circle cx="140" cy="120" r="2" fill="#cbd5e1" />
          <circle cx="140" cy="165" r="2" fill="#cbd5e1" />
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// 3. ANIMACIÓN: IMPRESIÓN DIRECTA A PRENDA (DTG)
// =========================================================================
export function AnimacionDTG() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 500 240" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', maxWidth: '620px', maxHeight: '100%', display: 'block', margin: '0 auto' }}>
        <defs>
          {/* Gradiente arcoíris de alta resolución (fotográfico) */}
          <linearGradient id="dtgGraphic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="60%" stopColor="#ec4899" />
            <stop offset="85%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <clipPath id="dtgScanClip">
            <rect x="140" y="80" width="220" height="90" style={{ animation: 'dtgProgress 4s infinite linear' }} />
          </clipPath>
        </defs>

        <style>{`
          @keyframes dtgCarriageScan {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(200px); }
          }
          @keyframes dtgJetPulse {
            0%, 100% { opacity: 0.3; transform: scaleY(0.7); }
            50% { opacity: 1; transform: scaleY(1.1); }
          }
          @keyframes dtgProgress {
            0% { height: 0px; }
            80% { height: 90px; }
            100% { height: 90px; }
          }
        `}</style>

        {/* Plataforma de la impresora digital */}
        <rect width="500" height="240" fill="#090d16" />

        {/* Camiseta blanca sobre el plato plano */}
        <rect x="110" y="45" width="280" height="150" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        {/* Cuello de la playera */}
        <path d="M 220 45 Q 250 65 280 45" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />

        {/* GRÁFICO FOTOGRÁFICO FORMÁNDOSE LÍNEA A LÍNEA */}
        <g clipPath="url(#dtgScanClip)">
          {/* Ilustración fotorrealista multicolor */}
          <rect x="150" y="80" width="200" height="90" rx="10" fill="url(#dtgGraphic)" />
          
          {/* Silueta de marca integrada */}
          <circle cx="250" cy="120" r="28" fill="#ffffff" opacity="0.92" />
          <path d="M 242 108 L 242 132 M 258 108 L 258 132 M 242 120 L 258 120" stroke="#132a52" strokeWidth="4" strokeLinecap="round" />
          <text x="250" y="158" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" letterSpacing="2">
            DIRECT TO GARMENT
          </text>
        </g>

        {/* Riel cromado horizontal de precisión */}
        <rect x="50" y="32" width="400" height="6" rx="3" fill="#64748b" stroke="#334155" strokeWidth="1" />
        <rect x="50" y="34" width="400" height="2" fill="#e2e8f0" />

        {/* CARRO DEL CABEZAL DIGITAL INDUSTRIAL (Escaneo rápido) */}
        <g style={{ animation: 'dtgCarriageScan 2s infinite ease-in-out' }}>
          {/* Carcasa del cabezal */}
          <rect x="150" y="18" width="60" height="42" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          
          {/* Luces LED de estado */}
          <circle cx="160" cy="28" r="2" fill="#22c55e" />
          <circle cx="168" cy="28" r="2" fill="#38bdf8" />
          <rect x="178" y="26" width="24" height="4" rx="2" fill="#0f172a" />

          {/* Inyectores micro-piezoeléctricos */}
          <rect x="160" y="55" width="40" height="5" fill="#475569" />

          {/* CHORROS MICRO-GOTAS CMYK (Inyección activa) */}
          <g style={{ animation: 'dtgJetPulse 0.3s infinite ease-in-out' }}>
            {/* Cyan */}
            <line x1="166" y1="60" x2="166" y2="85" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 2" />
            {/* Magenta */}
            <line x1="174" y1="60" x2="174" y2="85" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 2" />
            {/* Yellow */}
            <line x1="182" y1="60" x2="182" y2="85" stroke="#eab308" strokeWidth="2" strokeDasharray="3 2" />
            {/* Black */}
            <line x1="190" y1="60" x2="190" y2="85" stroke="#0f172a" strokeWidth="2" strokeDasharray="3 2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// 4. ANIMACIÓN: SUBLIMACIÓN TEXTIL HD
// =========================================================================
export function AnimacionSublimacion() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 500 240" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', maxWidth: '620px', maxHeight: '100%', display: 'block', margin: '0 auto' }}>
        <defs>
          {/* Calor térmico radiante */}
          <radialGradient id="calorTermico" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
          </radialGradient>

          {/* Gráfico deportivo sublimado */}
          <linearGradient id="dryfitPattern" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        <style>{`
          @keyframes heatPlanchaDown {
            0%, 15% { transform: translateY(0); }
            30%, 70% { transform: translateY(46px); }
            85%, 100% { transform: translateY(0); }
          }
          @keyframes heatAuraPulse {
            0%, 25% { opacity: 0; transform: scale(0.9); }
            35%, 65% { opacity: 1; transform: scale(1.1); }
            75%, 100% { opacity: 0; transform: scale(1.2); }
          }
          @keyframes vaporRise {
            0%, 65% { opacity: 0; transform: translateY(0) scale(0.8); }
            75% { opacity: 0.8; transform: translateY(-18px) scale(1.2); }
            90%, 100% { opacity: 0; transform: translateY(-36px) scale(1.5); }
          }
          @keyframes transferSheetLift {
            0%, 68% { transform: translateY(0) rotate(0deg); opacity: 1; }
            78%, 90% { transform: translateY(-24px) rotate(-6deg); opacity: 0.7; }
            98%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
          }
        `}</style>

        {/* Estación de Transferencia Térmica */}
        <rect width="500" height="240" fill="#0f172a" />

        {/* Plancha inferior de silicón (Base) */}
        <rect x="90" y="160" width="320" height="24" rx="4" fill="#334155" stroke="#475569" strokeWidth="2" />
        <rect x="80" y="180" width="340" height="14" rx="3" fill="#1e293b" />

        {/* Camiseta deportiva 100% poliéster Dry-Fit */}
        <rect x="110" y="145" width="280" height="30" rx="4" fill="#f8fafc" />

        {/* Gráfico sublimado fusionado a nivel molecular */}
        <rect x="140" y="148" width="220" height="24" rx="4" fill="url(#dryfitPattern)" />
        <text x="250" y="164" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900" letterSpacing="3">
          100% POLIÉSTER DRY-FIT
        </text>

        {/* Aura de Calor Radiante (Aparece cuando la plancha baja) */}
        <ellipse cx="250" cy="148" rx="160" ry="30" fill="url(#calorTermico)" style={{ animation: 'heatAuraPulse 4s infinite ease-in-out' }} />

        {/* Vapor / Gas de Sublimación ascendiendo */}
        <g style={{ animation: 'vaporRise 4s infinite ease-out' }}>
          <path d="M 180 140 Q 185 125 180 110 T 180 90" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 250 140 Q 255 120 250 100 T 250 80" stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 320 140 Q 325 125 320 110 T 320 90" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Papel Transfer de Sublimación (Se levanta tras el planchado) */}
        <g style={{ animation: 'transferSheetLift 4s infinite ease-in-out', transformOrigin: '120px 150px' }}>
          <rect x="130" y="140" width="240" height="14" rx="2" fill="#fed7aa" stroke="#fb923c" strokeWidth="1" opacity="0.85" />
          <text x="250" y="151" textAnchor="middle" fill="#7c2d12" fontSize="7.5" fontWeight="800">
            PAPEL TRANSFER SUBLIMACIÓN
          </text>
        </g>

        {/* PLANCHA TÉRMICA SUPERIOR (Baja con 200°C y presión) */}
        <g style={{ animation: 'heatPlanchaDown 4s infinite cubic-bezier(0.45, 0, 0.55, 1)' }}>
          {/* Placa calefactora de teflón fundido */}
          <rect x="96" y="80" width="308" height="24" rx="5" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
          <rect x="100" y="98" width="300" height="6" fill="#451a03" />

          {/* Bloque superior con aislamiento térmico */}
          <rect x="120" y="52" width="260" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />

          {/* Display Digital de Temperatura Industrial */}
          <rect x="210" y="58" width="80" height="18" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
          <text x="250" y="71" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="900" fontFamily="monospace">
            200 °C
          </text>

          {/* Mango de Presión Ergonómico */}
          <path d="M 250 52 L 250 20 L 310 20" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="290" y="14" width="35" height="12" rx="3" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// 5. ANIMACIÓN: TERMOTRANSFERENCIA Y VINIL TEXTIL
// =========================================================================
export function AnimacionTransfer() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 500 240" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', maxWidth: '620px', maxHeight: '100%', display: 'block', margin: '0 auto' }}>
        <defs>
          {/* Brillo reflectivo metálico */}
          <linearGradient id="vinilReflectivo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="35%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="85%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>

          {/* Destello de luz viajero */}
          <linearGradient id="shineGleam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <clipPath id="vinylClip">
            <rect x="140" y="90" width="220" height="70" rx="8" />
          </clipPath>
        </defs>

        <style>{`
          @keyframes pressStamp {
            0%, 20% { transform: translateY(0); }
            30%, 55% { transform: translateY(35px); }
            65%, 100% { transform: translateY(0); }
          }
          @keyframes linerPeel {
            0%, 60% { transform: translate(0, 0) rotate(0deg); opacity: 0.9; }
            75%, 90% { transform: translate(60px, -45px) rotate(16deg); opacity: 0.4; }
            98%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.9; }
          }
          @keyframes shineSwipe {
            0%, 65% { transform: translateX(-150px); }
            80%, 95% { transform: translateX(250px); }
            100% { transform: translateX(250px); }
          }
        `}</style>

        {/* Fondo de Mesa Textil */}
        <rect width="500" height="240" fill="#0f172a" />

        {/* Prenda Textil de Trabajo de Alta Visibilidad */}
        <rect x="80" y="55" width="340" height="140" rx="10" fill="#132a52" stroke="#1e3a8a" strokeWidth="2" />
        
        {/* Franjas de seguridad verde neón en la prenda */}
        <rect x="80" y="70" width="340" height="10" fill="#84cc16" opacity="0.85" />
        <rect x="80" y="170" width="340" height="10" fill="#84cc16" opacity="0.85" />

        {/* LOGOTIPO DE VINIL TERMOTRANSFERIBLE ADHERIDO */}
        <g clipPath="url(#vinylClip)">
          {/* Base de vinil reflectivo plata clase 2 */}
          <rect x="140" y="90" width="220" height="70" rx="8" fill="url(#vinilReflectivo)" stroke="#ffffff" strokeWidth="1.5" />
          
          {/* Tipografía de alta precisión calada */}
          <text x="250" y="130" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="4">
            SEGURIDAD
          </text>
          <text x="250" y="146" textAnchor="middle" fill="#1e3a8a" fontSize="9.5" fontWeight="800" letterSpacing="2">
            VINIL TÉRMICO REFLEJANTE
          </text>

          {/* Destello de brillo reflectivo recorriendo el vinil */}
          <rect x="140" y="90" width="80" height="70" fill="url(#shineGleam)" style={{ animation: 'shineSwipe 4s infinite ease-in-out' }} />
        </g>

        {/* PELÍCULA TRANSPORTADORA TRANSPARENTE (LINER PEELING) */}
        <g style={{ animation: 'linerPeel 4s infinite ease-in-out', transformOrigin: '360px 160px' }}>
          {/* Hoja plástica Mylar doblándose al desprender */}
          <path
            d="M 140 90 L 360 90 L 360 160 L 140 160 Z"
            fill="rgba(255, 255, 255, 0.35)"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <text x="320" y="85" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="800">
            DESPRENDIMIENTO DE LINER ↗
          </text>
        </g>

        {/* PRENSA TÉRMICA PLANA (Sellado a 160°C) */}
        <g style={{ animation: 'pressStamp 4s infinite cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <rect x="120" y="25" width="260" height="24" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
          <rect x="130" y="45" width="240" height="6" fill="#f59e0b" />
          {/* Perno central */}
          <rect x="242" y="5" width="16" height="22" rx="3" fill="#94a3b8" />
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// COMPONENTE CONTENEDOR MAESTRO CON HUD TÉCNICO Y MARCO PREMIUM
// =========================================================================
interface TecnicaAnimacionProps {
  id: string;
  height?: number | string;
}

export default function TecnicaAnimacion({ id, height = 310 }: TecnicaAnimacionProps) {
  const getBadgeInfo = () => {
    switch (id) {
      case 'bordado':
        return {
          title: 'PROCESO AUTOMATIZADO · BORDADO COMPUTARIZADO',
          metric: '1,200 PPM',
          step: 'Puntadas tridimensionales de alta resistencia y relieve'
        };
      case 'serigrafia':
        return {
          title: 'PROCESO INDUSTRIAL · SERIGRAFÍA TEXTIL',
          metric: 'Malla 77T · Plastisol',
          step: 'Paso de rasero transfiriendo tinta de alta densidad a la tela'
        };
      case 'dtg':
        return {
          title: 'PROCESO DIGITAL · IMPRESIÓN DIRECTA (DTG)',
          metric: '1440 DPI · CMYK',
          step: 'Inyección micro-piezoeléctrica de tinta reactiva sin tacto'
        };
      case 'sublimacion':
        return {
          title: 'PROCESO TÉRMICO · SUBLIMACIÓN HD',
          metric: '200°C · 40s',
          step: 'Gasificación molecular que impregna el 100% de la fibra'
        };
      case 'transfer':
      default:
        return {
          title: 'PROCESO TÉRMICO · VINIL Y TERMOTRANSFERENCIA',
          metric: 'Corte Plotter · 160°C',
          step: 'Fijación de vinil de seguridad con desprendimiento de película'
        };
    }
  };

  const info = getBadgeInfo();

  return (
    <div style={{
      width: '100%',
      height: typeof height === 'number' ? `${height}px` : height,
      backgroundColor: '#0b1329',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid #1e293b',
      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5), 0 8px 24px rgba(11, 19, 41, 0.25)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Barra superior de telemetría (HUD) */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '14px',
        right: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            boxShadow: '0 0 8px #22c55e',
            display: 'inline-block'
          }} />
          <span style={{
            fontSize: '0.7rem',
            fontFamily: 'monospace',
            fontWeight: 800,
            color: '#94a3b8',
            letterSpacing: '0.08em'
          }}>
            {info.title}
          </span>
        </div>

        <span style={{
          fontSize: '0.68rem',
          fontFamily: 'monospace',
          fontWeight: 800,
          color: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '2px 8px',
          borderRadius: '6px'
        }}>
          {info.metric}
        </span>
      </div>

      {/* Visor de Animación Central */}
      <div style={{
        flex: 1,
        position: 'relative',
        width: '100%',
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '38px 16px 36px 16px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {id === 'bordado' && <AnimacionBordado />}
        {id === 'serigrafia' && <AnimacionSerigrafia />}
        {id === 'dtg' && <AnimacionDTG />}
        {id === 'sublimacion' && <AnimacionSublimacion />}
        {id === 'transfer' && <AnimacionTransfer />}
      </div>

      {/* Barra inferior explicativa */}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        left: '14px',
        right: '14px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <span style={{
          fontSize: '0.74rem',
          color: '#cbd5e1',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(4px)',
          padding: '3px 12px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          💡 {info.step}
        </span>
      </div>
    </div>
  );
}

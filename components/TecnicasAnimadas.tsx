'use client';
import React, { useId } from 'react';

interface AnimProps {
  uid?: string;
}

// =========================================================================
// 1. ANIMACIÓN: BORDADO INDUSTRIAL COMPUTARIZADO
// =========================================================================
export function AnimacionBordado({ uid: propUid }: AnimProps) {
  const generatedUid = useId().replace(/[^a-zA-Z0-9]/g, '_');
  const uid = propUid || generatedUid;

  const telaId = `telaIndustrial_${uid}`;
  const aceroId = `aceroCNC_${uid}`;
  const hiloOroId = `hiloOro3D_${uid}`;
  const hiloAzulId = `hiloAzul3D_${uid}`;
  const relevoId = `relevoBordado_${uid}`;
  const laserGlowId = `laserGlow_${uid}`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 500 240"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', maxWidth: '620px', maxHeight: '100%', display: 'block', margin: '0 auto' }}
      >
        <defs>
          {/* Trama de tejido de tela piqué/gabardina industrial */}
          <pattern id={telaId} width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#132a52" />
            <path d="M0 3h6M3 0v6" stroke="#1e3a8a" strokeWidth="0.8" opacity="0.6" />
            <circle cx="1.5" cy="1.5" r="0.6" fill="#2563eb" opacity="0.4" />
            <circle cx="4.5" cy="4.5" r="0.6" fill="#2563eb" opacity="0.4" />
          </pattern>

          {/* Gradiente cromado de acero y aluminio aeroespacial */}
          <linearGradient id={aceroId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="25%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="75%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Gradiente dorado metálico para hilo de bordar */}
          <linearGradient id={hiloOroId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="30%" stopColor="#facc15" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          {/* Gradiente para hilo azul eléctrico reflectivo */}
          <linearGradient id={hiloAzulId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="40%" stopColor="#38bdf8" />
            <stop offset="80%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>

          {/* Sombra de relieve tridimensional bordado */}
          <filter id={relevoId} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="1.5" floodColor="#050b14" floodOpacity="0.8" />
          </filter>

          {/* Resplandor láser CNC */}
          <filter id={laserGlowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <style>{`
          @-webkit-keyframes agujaPunzona_${uid} {
            0%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            45% { -webkit-transform: translate3d(0, 28px, 0); transform: translate3d(0, 28px, 0); }
            50% { -webkit-transform: translate3d(0, 30px, 0); transform: translate3d(0, 30px, 0); }
            55% { -webkit-transform: translate3d(0, 28px, 0); transform: translate3d(0, 28px, 0); }
          }
          @keyframes agujaPunzona_${uid} {
            0%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            45% { -webkit-transform: translate3d(0, 28px, 0); transform: translate3d(0, 28px, 0); }
            50% { -webkit-transform: translate3d(0, 30px, 0); transform: translate3d(0, 30px, 0); }
            55% { -webkit-transform: translate3d(0, 28px, 0); transform: translate3d(0, 28px, 0); }
          }
          @-webkit-keyframes footBounce_${uid} {
            0%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            40% { -webkit-transform: translate3d(0, 18px, 0); transform: translate3d(0, 18px, 0); }
            50% { -webkit-transform: translate3d(0, 22px, 0); transform: translate3d(0, 22px, 0); }
            60% { -webkit-transform: translate3d(0, 18px, 0); transform: translate3d(0, 18px, 0); }
          }
          @keyframes footBounce_${uid} {
            0%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            40% { -webkit-transform: translate3d(0, 18px, 0); transform: translate3d(0, 18px, 0); }
            50% { -webkit-transform: translate3d(0, 22px, 0); transform: translate3d(0, 22px, 0); }
            60% { -webkit-transform: translate3d(0, 18px, 0); transform: translate3d(0, 18px, 0); }
          }
          @-webkit-keyframes pantografoCNC_${uid} {
            0%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            20% { -webkit-transform: translate3d(-8px, 4px, 0); transform: translate3d(-8px, 4px, 0); }
            40% { -webkit-transform: translate3d(7px, -5px, 0); transform: translate3d(7px, -5px, 0); }
            65% { -webkit-transform: translate3d(-5px, -3px, 0); transform: translate3d(-5px, -3px, 0); }
            85% { -webkit-transform: translate3d(6px, 5px, 0); transform: translate3d(6px, 5px, 0); }
          }
          @keyframes pantografoCNC_${uid} {
            0%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            20% { -webkit-transform: translate3d(-8px, 4px, 0); transform: translate3d(-8px, 4px, 0); }
            40% { -webkit-transform: translate3d(7px, -5px, 0); transform: translate3d(7px, -5px, 0); }
            65% { -webkit-transform: translate3d(-5px, -3px, 0); transform: translate3d(-5px, -3px, 0); }
            85% { -webkit-transform: translate3d(6px, 5px, 0); transform: translate3d(6px, 5px, 0); }
          }
          @-webkit-keyframes threadFlutter_${uid} {
            0%, 100% { -webkit-transform: scaleX(1) translate3d(0, 0, 0); transform: scaleX(1) translate3d(0, 0, 0); }
            50% { -webkit-transform: scaleX(1.2) translate3d(-1px, 0, 0); transform: scaleX(1.2) translate3d(-1px, 0, 0); }
          }
          @keyframes threadFlutter_${uid} {
            0%, 100% { -webkit-transform: scaleX(1) translate3d(0, 0, 0); transform: scaleX(1) translate3d(0, 0, 0); }
            50% { -webkit-transform: scaleX(1.2) translate3d(-1px, 0, 0); transform: scaleX(1.2) translate3d(-1px, 0, 0); }
          }
          @-webkit-keyframes laserPulse_${uid} {
            0%, 100% { opacity: 0.65; -webkit-transform: scale(1); transform: scale(1); }
            50% { opacity: 1; -webkit-transform: scale(1.25); transform: scale(1.25); }
          }
          @keyframes laserPulse_${uid} {
            0%, 100% { opacity: 0.65; -webkit-transform: scale(1); transform: scale(1); }
            50% { opacity: 1; -webkit-transform: scale(1.25); transform: scale(1.25); }
          }
          @-webkit-keyframes satinGrowth_${uid} {
            0% { stroke-dashoffset: 600; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes satinGrowth_${uid} {
            0% { stroke-dashoffset: 600; }
            100% { stroke-dashoffset: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            .anim-node-${uid} {
              -webkit-animation: none !important;
              animation: none !important;
            }
          }
        `}</style>

        {/* Fondo: Cama de la bordadora industrial */}
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

        {/* PANTÓGRAFO INDUSTRIAL CNC Y BASTIDOR */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `pantografoCNC_${uid} 7s infinite ease-in-out`,
            animation: `pantografoCNC_${uid} 7s infinite ease-in-out`,
            willChange: 'transform',
            transformBox: 'view-box'
          }}
        >
          {/* Brazos mecánicos del pantógrafo */}
          <rect x="25" y="142" width="55" height="12" rx="2" fill={`url(#${aceroId})`} stroke="#1e293b" strokeWidth="1" />
          <rect x="420" y="142" width="55" height="12" rx="2" fill={`url(#${aceroId})`} stroke="#1e293b" strokeWidth="1" />
          <circle cx="50" cy="148" r="3.5" fill="#1e293b" />
          <circle cx="450" cy="148" r="3.5" fill="#1e293b" />

          {/* Bastidor Industrial Rectangular */}
          <rect x="74" y="80" width="352" height="136" rx="20" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="16" />
          <rect x="74" y="80" width="352" height="136" rx="20" fill="none" stroke={`url(#${aceroId})`} strokeWidth="12" />
          <rect x="74" y="80" width="352" height="136" rx="20" fill="none" stroke="#1e293b" strokeWidth="1" />

          {/* Mordazas de fijación rápida */}
          <rect x="68" y="136" width="12" height="24" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          <rect x="420" y="136" width="12" height="24" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          <line x1="68" y1="148" x2="80" y2="148" stroke="#0f172a" strokeWidth="2" />
          <line x1="420" y1="148" x2="432" y2="148" stroke="#0f172a" strokeWidth="2" />

          {/* Prenda Textil Tensada */}
          <rect x="80" y="86" width="340" height="124" rx="16" fill={`url(#${telaId})`} />

          {/* Guías vectoriales de ponchado */}
          <g opacity="0.3">
            <line x1="120" y1="148" x2="380" y2="148" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="250" y1="95" x2="250" y2="200" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 4" />
            <circle cx="250" cy="148" r="45" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 3" />
          </g>

          {/* LOGOTIPO BORDADO REAL CON VOLUMEN 3D */}
          <g filter={`url(#${relevoId})`}>
            {/* Escudo heráldico exterior bordado en hilo azul */}
            <path
              d="M 195 110 L 250 96 L 305 110 C 305 155 250 182 250 182 C 250 182 195 155 195 110 Z"
              fill="none"
              stroke={`url(#${hiloAzulId})`}
              strokeWidth="5"
              strokeLinejoin="round"
              strokeDasharray="600"
              strokeDashoffset="0"
              className={`anim-node-${uid}`}
              style={{
                WebkitAnimation: `satinGrowth_${uid} 6s infinite linear`,
                animation: `satinGrowth_${uid} 6s infinite linear`
              }}
            />
            {/* Cordón interior de satín en hilo dorado */}
            <path
              d="M 203 114 L 250 102 L 297 114 C 297 150 250 174 250 174 C 250 174 203 150 203 114 Z"
              fill="rgba(2, 6, 23, 0.45)"
              stroke={`url(#${hiloOroId})`}
              strokeWidth="2.5"
              strokeDasharray="400"
              strokeDashoffset="0"
              className={`anim-node-${uid}`}
              style={{
                WebkitAnimation: `satinGrowth_${uid} 6s infinite linear`,
                animation: `satinGrowth_${uid} 6s infinite linear`
              }}
            />

            {/* Letra 'H' bordada */}
            <g>
              <rect x="220" y="118" width="14" height="42" rx="2" fill={`url(#${hiloOroId})`} />
              {[120, 124, 128, 132, 136, 140, 144, 148, 152, 156].map((sy) => (
                <line key={`lh-${sy}`} x1="220" y1={sy} x2="234" y2={sy + 2} stroke="#fef08a" strokeWidth="0.9" opacity="0.6" />
              ))}

              <rect x="266" y="118" width="14" height="42" rx="2" fill={`url(#${hiloOroId})`} />
              {[120, 124, 128, 132, 136, 140, 144, 148, 152, 156].map((sy) => (
                <line key={`rh-${sy}`} x1="266" y1={sy} x2="280" y2={sy + 2} stroke="#fef08a" strokeWidth="0.9" opacity="0.6" />
              ))}

              <rect x="234" y="133" width="32" height="12" fill={`url(#${hiloOroId})`} />
              {[236, 242, 248, 254, 260].map((sx) => (
                <line key={`mh-${sx}`} x1={sx} y1="133" x2={sx} y2="145" stroke="#fef08a" strokeWidth="0.9" opacity="0.6" />
              ))}
            </g>

            {/* Texto bordado "HUPAC" */}
            <text x="250" y="171" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="900" fontFamily="sans-serif" letterSpacing="2.5">
              HUPAC
            </text>
          </g>

          {/* Puntero Láser CNC */}
          <g
            transform="translate(250, 148)"
            filter={`url(#${laserGlowId})`}
            className={`anim-node-${uid}`}
            style={{
              WebkitAnimation: `laserPulse_${uid} 1.5s infinite ease-in-out`,
              animation: `laserPulse_${uid} 1.5s infinite ease-in-out`,
              WebkitTransformOrigin: 'center',
              transformOrigin: '250px 148px',
              transformBox: 'view-box'
            }}
          >
            <circle cx="0" cy="0" r="2.5" fill="#ef4444" />
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#ef4444" strokeWidth="1" opacity="0.8" />
            <line x1="0" y1="-10" x2="0" y2="10" stroke="#ef4444" strokeWidth="1" opacity="0.8" />
          </g>
        </g>

        {/* CABEZAL INDUSTRIAL MULTICABEZAL TAJIMA */}
        <g>
          {/* Barra soporte de conos */}
          <rect x="160" y="2" width="180" height="5" rx="1.5" fill={`url(#${aceroId})`} />
          
          {[
            { x: 175, col: '#ca8a04' },
            { x: 212, col: '#0284c7' },
            { x: 250, col: '#f8fafc' },
            { x: 288, col: '#ef4444' },
            { x: 325, col: '#94a3b8' }
          ].map((cono, i) => (
            <g key={i}>
              <polygon
                points={`${cono.x - 7},${7} ${cono.x + 7},${7} ${cono.x + 10},${22} ${cono.x - 10},${22}`}
                fill={cono.col}
                stroke="#0f172a"
                strokeWidth="0.8"
              />
              <rect x={cono.x - 11} y="22" width="22" height="3" rx="1" fill="#334155" />
              <circle cx={cono.x} cy="4" r="1.5" fill="#f8fafc" />
            </g>
          ))}

          {/* Hilo activo desde cono */}
          <path d="M 175 4 L 175 18 L 246 36" stroke={`url(#${hiloOroId})`} strokeWidth="1.2" fill="none" opacity="0.85" />
        </g>

        {/* Carcasa del Cabezal */}
        <g>
          <path d="M 215 28 L 285 28 L 280 82 L 220 82 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <path d="M 224 34 L 276 34 L 272 76 L 228 76 Z" fill={`url(#${aceroId})`} opacity="0.9" />

          <circle cx="236" cy="46" r="6" fill={`url(#${aceroId})`} stroke="#0f172a" strokeWidth="1" />
          <circle cx="250" cy="46" r="6" fill={`url(#${aceroId})`} stroke="#0f172a" strokeWidth="1" />
          <circle cx="264" cy="46" r="6" fill={`url(#${aceroId})`} stroke="#0f172a" strokeWidth="1" />
          
          <circle cx="250" cy="62" r="3" fill="#22c55e" filter={`url(#${laserGlowId})`} />
          <line x1="250" y1="46" x2="250" y2="78" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Hilo activo que vibra bajo tensión hacia la aguja */}
        <path
          d="M 250 78 Q 252 105 250 125"
          stroke={`url(#${hiloOroId})`}
          strokeWidth="1.8"
          fill="none"
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `threadFlutter_${uid} 0.25s infinite linear`,
            animation: `threadFlutter_${uid} 0.25s infinite linear`,
            WebkitTransformOrigin: '250px 78px',
            transformOrigin: '250px 78px',
            transformBox: 'view-box',
            willChange: 'transform'
          }}
        >
          <animate
            attributeName="d"
            dur="0.25s"
            repeatCount="indefinite"
            values="M 250 78 Q 248 105 250 125; M 250 78 Q 254 105 250 125; M 250 78 Q 248 105 250 125"
          />
        </path>

        {/* Prensa-telas circular móvil */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `footBounce_${uid} 0.5s infinite ease-in-out`,
            animation: `footBounce_${uid} 0.5s infinite ease-in-out`,
            willChange: 'transform',
            transformBox: 'view-box'
          }}
        >
          <path d="M 238 90 L 238 132 L 243 138 M 262 90 L 262 132 L 257 138" fill="none" stroke={`url(#${aceroId})`} strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="250" cy="144" rx="8" ry="3.5" fill="none" stroke={`url(#${aceroId})`} strokeWidth="2.5" />
        </g>

        {/* Barra de la aguja punzonando */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `agujaPunzona_${uid} 0.5s infinite ease-in-out`,
            animation: `agujaPunzona_${uid} 0.5s infinite ease-in-out`,
            willChange: 'transform',
            transformBox: 'view-box'
          }}
        >
          <rect x="244" y="82" width="12" height="16" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
          <circle cx="250" cy="90" r="2" fill="#f8fafc" />
          <rect x="248.8" y="98" width="2.4" height="42" fill={`url(#${aceroId})`} />
          <polygon points="248.8,140 251.2,140 250,148" fill={`url(#${aceroId})`} />
          <ellipse cx="250" cy="143" rx="0.7" ry="1.8" fill="#090f1d" />
        </g>

        {/* Telemetría industrial CNC inferior */}
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
export function AnimacionSerigrafia({ uid: propUid }: AnimProps) {
  const generatedUid = useId().replace(/[^a-zA-Z0-9]/g, '_');
  const uid = propUid || generatedUid;

  const clipId = `inkRevealClip_${uid}`;
  const maderaId = `maderaRasero_${uid}`;
  const gomaId = `gomaPoliuretano_${uid}`;
  const tintaId = `tintaPlastisol_${uid}`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 500 240"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', maxWidth: '620px', maxHeight: '100%', display: 'block', margin: '0 auto' }}
      >
        <defs>
          {/* Clip path optimizado para Safari/iOS y Android */}
          <clipPath id={clipId}>
            <rect
              x="135"
              y="75"
              width="235"
              height="90"
              className={`clip-reveal-${uid}`}
              style={{
                WebkitAnimation: `clipRevealScale_${uid} 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1)`,
                animation: `clipRevealScale_${uid} 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1)`,
                WebkitTransformOrigin: '140px 120px',
                transformOrigin: '140px 120px',
                transformBox: 'view-box',
                willChange: 'transform'
              }}
            >
              <animate
                attributeName="width"
                dur="3.5s"
                repeatCount="indefinite"
                keyTimes="0; 0.15; 0.55; 0.80; 0.95; 1"
                values="0; 0; 235; 235; 0; 0"
              />
            </rect>
          </clipPath>

          <linearGradient id={maderaId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id={gomaId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id={tintaId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        <style>{`
          @-webkit-keyframes squeegeeSweep_${uid} {
            0%, 15% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            55%, 80% { -webkit-transform: translate3d(200px, 0, 0); transform: translate3d(200px, 0, 0); }
            95%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
          }
          @keyframes squeegeeSweep_${uid} {
            0%, 15% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            55%, 80% { -webkit-transform: translate3d(200px, 0, 0); transform: translate3d(200px, 0, 0); }
            95%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
          }
          @-webkit-keyframes clipRevealScale_${uid} {
            0%, 15% { -webkit-transform: scaleX(0); transform: scaleX(0); }
            55%, 80% { -webkit-transform: scaleX(1); transform: scaleX(1); }
            95%, 100% { -webkit-transform: scaleX(0); transform: scaleX(0); }
          }
          @keyframes clipRevealScale_${uid} {
            0%, 15% { -webkit-transform: scaleX(0); transform: scaleX(0); }
            55%, 80% { -webkit-transform: scaleX(1); transform: scaleX(1); }
            95%, 100% { -webkit-transform: scaleX(0); transform: scaleX(0); }
          }
          @-webkit-keyframes frameLift_${uid} {
            0%, 55% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            65%, 80% { -webkit-transform: translate3d(0, -8px, 0); transform: translate3d(0, -8px, 0); }
            90%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
          }
          @keyframes frameLift_${uid} {
            0%, 55% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            65%, 80% { -webkit-transform: translate3d(0, -8px, 0); transform: translate3d(0, -8px, 0); }
            90%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .anim-node-${uid}, .clip-reveal-${uid} {
              -webkit-animation: none !important;
              animation: none !important;
              -webkit-transform: none !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Base / Mesa de Impresión */}
        <rect width="500" height="240" fill="#0f172a" />

        {/* Prenda Textil sobre la paleta */}
        <rect x="80" y="40" width="340" height="160" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <path d="M 80 80 Q 140 100 140 160 M 420 80 Q 360 100 360 160" stroke="#334155" strokeWidth="2" fill="none" opacity="0.4" />

        {/* LOGO IMPRESO EN LA PRENDA (Revelado conforme avanza el rasero) */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="140" y="85" width="220" height="70" rx="8" fill="#132a52" stroke="#38bdf8" strokeWidth="2" />
          <text x="250" y="125" textAnchor="middle" fill="#38bdf8" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="4">
            HUPAC
          </text>
          <text x="250" y="143" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="sans-serif" letterSpacing="2">
            TEXTILES INDUSTRIAL
          </text>
          <line x1="160" y1="102" x2="340" y2="102" stroke="#f59e0b" strokeWidth="3" />
          <line x1="160" y1="148" x2="340" y2="148" stroke="#f59e0b" strokeWidth="3" />
        </g>

        {/* MARCO DE SERIGRAFÍA */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `frameLift_${uid} 3.5s infinite ease-in-out`,
            animation: `frameLift_${uid} 3.5s infinite ease-in-out`,
            willChange: 'transform',
            transformBox: 'view-box'
          }}
        >
          {/* Malla Serigráfica traslúcida */}
          <rect x="100" y="55" width="300" height="130" fill="rgba(254, 240, 138, 0.15)" stroke="#cbd5e1" strokeWidth="1" />
          
          {/* Stencil sobre la malla */}
          <rect x="140" y="85" width="220" height="70" rx="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Marco de Aluminio */}
          <rect x="94" y="49" width="312" height="142" rx="4" fill="none" stroke="#94a3b8" strokeWidth="12" />
          <rect x="94" y="49" width="312" height="142" rx="4" fill="none" stroke="#475569" strokeWidth="1.5" />
          <line x1="94" y1="49" x2="106" y2="61" stroke="#64748b" strokeWidth="3" />
          <line x1="406" y1="49" x2="394" y2="61" stroke="#64748b" strokeWidth="3" />
          <line x1="94" y1="191" x2="106" y2="179" stroke="#64748b" strokeWidth="3" />
          <line x1="406" y1="191" x2="394" y2="179" stroke="#64748b" strokeWidth="3" />
        </g>

        {/* RASERO (SQUEEGEE) CON TINTA EN MOVIMIENTO */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `squeegeeSweep_${uid} 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1)`,
            animation: `squeegeeSweep_${uid} 3.5s infinite cubic-bezier(0.4, 0, 0.2, 1)`,
            willChange: 'transform',
            transformBox: 'view-box'
          }}
        >
          {/* Tinta arrastrada */}
          <ellipse cx="150" cy="120" rx="10" ry="48" fill={`url(#${tintaId})`} opacity="0.9" />

          {/* Hoja de Goma */}
          <path d="M 142 65 L 149 65 L 153 175 L 146 175 Z" fill={`url(#${gomaId})`} stroke="#b45309" strokeWidth="1" />

          {/* Mango de Madera */}
          <rect x="134" y="60" width="12" height="120" rx="4" fill={`url(#${maderaId})`} stroke="#78350f" strokeWidth="1.5" />
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
export function AnimacionDTG({ uid: propUid }: AnimProps) {
  const generatedUid = useId().replace(/[^a-zA-Z0-9]/g, '_');
  const uid = propUid || generatedUid;

  const graphicId = `dtgGraphic_${uid}`;
  const clipId = `dtgScanClip_${uid}`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 500 240"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', maxWidth: '620px', maxHeight: '100%', display: 'block', margin: '0 auto' }}
      >
        <defs>
          <linearGradient id={graphicId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="60%" stopColor="#ec4899" />
            <stop offset="85%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* Clip path optimizado para impresión progresiva vertical */}
          <clipPath id={clipId}>
            <rect
              x="145"
              y="80"
              width="210"
              height="95"
              className={`dtg-reveal-${uid}`}
              style={{
                WebkitAnimation: `dtgProgressScale_${uid} 4s infinite linear`,
                animation: `dtgProgressScale_${uid} 4s infinite linear`,
                WebkitTransformOrigin: '250px 80px',
                transformOrigin: '250px 80px',
                transformBox: 'view-box',
                willChange: 'transform'
              }}
            >
              <animate
                attributeName="height"
                dur="4s"
                repeatCount="indefinite"
                keyTimes="0; 0.8; 1"
                values="0; 95; 95"
              />
            </rect>
          </clipPath>
        </defs>

        <style>{`
          @-webkit-keyframes dtgCarriageScan_${uid} {
            0%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            50% { -webkit-transform: translate3d(200px, 0, 0); transform: translate3d(200px, 0, 0); }
          }
          @keyframes dtgCarriageScan_${uid} {
            0%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            50% { -webkit-transform: translate3d(200px, 0, 0); transform: translate3d(200px, 0, 0); }
          }
          @-webkit-keyframes dtgJetPulse_${uid} {
            0%, 100% { opacity: 0.3; -webkit-transform: scaleY(0.7); transform: scaleY(0.7); }
            50% { opacity: 1; -webkit-transform: scaleY(1.1); transform: scaleY(1.1); }
          }
          @keyframes dtgJetPulse_${uid} {
            0%, 100% { opacity: 0.3; -webkit-transform: scaleY(0.7); transform: scaleY(0.7); }
            50% { opacity: 1; -webkit-transform: scaleY(1.1); transform: scaleY(1.1); }
          }
          @-webkit-keyframes dtgProgressScale_${uid} {
            0% { -webkit-transform: scaleY(0); transform: scaleY(0); }
            80%, 100% { -webkit-transform: scaleY(1); transform: scaleY(1); }
          }
          @keyframes dtgProgressScale_${uid} {
            0% { -webkit-transform: scaleY(0); transform: scaleY(0); }
            80%, 100% { -webkit-transform: scaleY(1); transform: scaleY(1); }
          }
          @media (prefers-reduced-motion: reduce) {
            .anim-node-${uid}, .dtg-reveal-${uid} {
              -webkit-animation: none !important;
              animation: none !important;
              -webkit-transform: none !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Plataforma de la impresora digital */}
        <rect width="500" height="240" fill="#090d16" />

        {/* Camiseta sobre el plato plano */}
        <rect x="110" y="45" width="280" height="150" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 220 45 Q 250 65 280 45" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />

        {/* GRÁFICO FOTOGRÁFICO FORMÁNDOSE LÍNEA A LÍNEA */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="150" y="80" width="200" height="90" rx="10" fill={`url(#${graphicId})`} />
          
          <circle cx="250" cy="120" r="28" fill="#ffffff" opacity="0.92" />
          <path d="M 242 108 L 242 132 M 258 108 L 258 132 M 242 120 L 258 120" stroke="#132a52" strokeWidth="4" strokeLinecap="round" />
          <text x="250" y="158" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" letterSpacing="2">
            DIRECT TO GARMENT
          </text>
        </g>

        {/* Riel cromado horizontal */}
        <rect x="50" y="32" width="400" height="6" rx="3" fill="#64748b" stroke="#334155" strokeWidth="1" />
        <rect x="50" y="34" width="400" height="2" fill="#e2e8f0" />

        {/* CARRO DEL CABEZAL DIGITAL */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `dtgCarriageScan_${uid} 2s infinite ease-in-out`,
            animation: `dtgCarriageScan_${uid} 2s infinite ease-in-out`,
            willChange: 'transform',
            transformBox: 'view-box'
          }}
        >
          <rect x="150" y="18" width="60" height="42" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          
          <circle cx="160" cy="28" r="2" fill="#22c55e" />
          <circle cx="168" cy="28" r="2" fill="#38bdf8" />
          <rect x="178" y="26" width="24" height="4" rx="2" fill="#0f172a" />

          <rect x="160" y="55" width="40" height="5" fill="#475569" />

          {/* CHORROS MICRO-GOTAS CMYK */}
          <g
            className={`anim-node-${uid}`}
            style={{
              WebkitAnimation: `dtgJetPulse_${uid} 0.3s infinite ease-in-out`,
              animation: `dtgJetPulse_${uid} 0.3s infinite ease-in-out`,
              willChange: 'transform, opacity',
              WebkitTransformOrigin: '178px 60px',
              transformOrigin: '178px 60px',
              transformBox: 'view-box'
            }}
          >
            <line x1="166" y1="60" x2="166" y2="85" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 2" />
            <line x1="174" y1="60" x2="174" y2="85" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 2" />
            <line x1="182" y1="60" x2="182" y2="85" stroke="#eab308" strokeWidth="2" strokeDasharray="3 2" />
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
export function AnimacionSublimacion({ uid: propUid }: AnimProps) {
  const generatedUid = useId().replace(/[^a-zA-Z0-9]/g, '_');
  const uid = propUid || generatedUid;

  const calorId = `calorTermico_${uid}`;
  const patternId = `dryfitPattern_${uid}`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 500 240"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', maxWidth: '620px', maxHeight: '100%', display: 'block', margin: '0 auto' }}
      >
        <defs>
          <radialGradient id={calorId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={patternId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        <style>{`
          @-webkit-keyframes heatPlanchaDown_${uid} {
            0%, 15% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            30%, 70% { -webkit-transform: translate3d(0, 46px, 0); transform: translate3d(0, 46px, 0); }
            85%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
          }
          @keyframes heatPlanchaDown_${uid} {
            0%, 15% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            30%, 70% { -webkit-transform: translate3d(0, 46px, 0); transform: translate3d(0, 46px, 0); }
            85%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
          }
          @-webkit-keyframes heatAuraPulse_${uid} {
            0%, 25% { opacity: 0; -webkit-transform: scale(0.95); transform: scale(0.95); }
            35%, 65% { opacity: 1; -webkit-transform: scale(1.05); transform: scale(1.05); }
            75%, 100% { opacity: 0; -webkit-transform: scale(1.1); transform: scale(1.1); }
          }
          @keyframes heatAuraPulse_${uid} {
            0%, 25% { opacity: 0; -webkit-transform: scale(0.95); transform: scale(0.95); }
            35%, 65% { opacity: 1; -webkit-transform: scale(1.05); transform: scale(1.05); }
            75%, 100% { opacity: 0; -webkit-transform: scale(1.1); transform: scale(1.1); }
          }
          @-webkit-keyframes vaporRise_${uid} {
            0%, 65% { opacity: 0; -webkit-transform: translate3d(0, 0, 0) scale(0.8); transform: translate3d(0, 0, 0) scale(0.8); }
            75% { opacity: 0.8; -webkit-transform: translate3d(0, -18px, 0) scale(1.2); transform: translate3d(0, -18px, 0) scale(1.2); }
            90%, 100% { opacity: 0; -webkit-transform: translate3d(0, -36px, 0) scale(1.5); transform: translate3d(0, -36px, 0) scale(1.5); }
          }
          @keyframes vaporRise_${uid} {
            0%, 65% { opacity: 0; -webkit-transform: translate3d(0, 0, 0) scale(0.8); transform: translate3d(0, 0, 0) scale(0.8); }
            75% { opacity: 0.8; -webkit-transform: translate3d(0, -18px, 0) scale(1.2); transform: translate3d(0, -18px, 0) scale(1.2); }
            90%, 100% { opacity: 0; -webkit-transform: translate3d(0, -36px, 0) scale(1.5); transform: translate3d(0, -36px, 0) scale(1.5); }
          }
          @-webkit-keyframes transferSheetLift_${uid} {
            0%, 68% { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); transform: translate3d(0, 0, 0) rotate(0deg); opacity: 1; }
            78%, 90% { -webkit-transform: translate3d(0, -24px, 0) rotate(-6deg); transform: translate3d(0, -24px, 0) rotate(-6deg); opacity: 0.7; }
            98%, 100% { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); transform: translate3d(0, 0, 0) rotate(0deg); opacity: 1; }
          }
          @keyframes transferSheetLift_${uid} {
            0%, 68% { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); transform: translate3d(0, 0, 0) rotate(0deg); opacity: 1; }
            78%, 90% { -webkit-transform: translate3d(0, -24px, 0) rotate(-6deg); transform: translate3d(0, -24px, 0) rotate(-6deg); opacity: 0.7; }
            98%, 100% { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); transform: translate3d(0, 0, 0) rotate(0deg); opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            .anim-node-${uid} {
              -webkit-animation: none !important;
              animation: none !important;
            }
          }
        `}</style>

        {/* Estación de Transferencia Térmica */}
        <rect width="500" height="240" fill="#0f172a" />

        {/* Plancha inferior de silicón */}
        <rect x="90" y="160" width="320" height="24" rx="4" fill="#334155" stroke="#475569" strokeWidth="2" />
        <rect x="80" y="180" width="340" height="14" rx="3" fill="#1e293b" />

        {/* Camiseta deportiva 100% poliéster */}
        <rect x="110" y="145" width="280" height="30" rx="4" fill="#f8fafc" />

        {/* Gráfico sublimado */}
        <rect x="140" y="148" width="220" height="24" rx="4" fill={`url(#${patternId})`} />
        <text x="250" y="164" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900" letterSpacing="3">
          100% POLIÉSTER DRY-FIT
        </text>

        {/* Aura de Calor Radiante */}
        <ellipse
          cx="250"
          cy="148"
          rx="160"
          ry="30"
          fill={`url(#${calorId})`}
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `heatAuraPulse_${uid} 4s infinite ease-in-out`,
            animation: `heatAuraPulse_${uid} 4s infinite ease-in-out`,
            WebkitTransformOrigin: '250px 148px',
            transformOrigin: '250px 148px',
            transformBox: 'view-box',
            willChange: 'transform, opacity'
          }}
        />

        {/* Vapor / Gas de Sublimación */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `vaporRise_${uid} 4s infinite ease-out`,
            animation: `vaporRise_${uid} 4s infinite ease-out`,
            willChange: 'transform, opacity',
            transformBox: 'view-box'
          }}
        >
          <path d="M 180 140 Q 185 125 180 110 T 180 90" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 250 140 Q 255 120 250 100 T 250 80" stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 320 140 Q 325 125 320 110 T 320 90" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Papel Transfer de Sublimación */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `transferSheetLift_${uid} 4s infinite ease-in-out`,
            animation: `transferSheetLift_${uid} 4s infinite ease-in-out`,
            WebkitTransformOrigin: '120px 150px',
            transformOrigin: '120px 150px',
            transformBox: 'view-box',
            willChange: 'transform, opacity'
          }}
        >
          <rect x="130" y="140" width="240" height="14" rx="2" fill="#fed7aa" stroke="#fb923c" strokeWidth="1" opacity="0.85" />
          <text x="250" y="151" textAnchor="middle" fill="#7c2d12" fontSize="7.5" fontWeight="800">
            PAPEL TRANSFER SUBLIMACIÓN
          </text>
        </g>

        {/* PLANCHA TÉRMICA SUPERIOR */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `heatPlanchaDown_${uid} 4s infinite cubic-bezier(0.45, 0, 0.55, 1)`,
            animation: `heatPlanchaDown_${uid} 4s infinite cubic-bezier(0.45, 0, 0.55, 1)`,
            willChange: 'transform',
            transformBox: 'view-box'
          }}
        >
          <rect x="96" y="80" width="308" height="24" rx="5" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
          <rect x="100" y="98" width="300" height="6" fill="#451a03" />

          <rect x="120" y="52" width="260" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />

          <rect x="210" y="58" width="80" height="18" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
          <text x="250" y="71" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="900" fontFamily="monospace">
            200 °C
          </text>

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
export function AnimacionTransfer({ uid: propUid }: AnimProps) {
  const generatedUid = useId().replace(/[^a-zA-Z0-9]/g, '_');
  const uid = propUid || generatedUid;

  const vinilId = `vinilReflectivo_${uid}`;
  const shineId = `shineGleam_${uid}`;
  const clipId = `vinylClip_${uid}`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        viewBox="0 0 500 240"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', maxWidth: '620px', maxHeight: '100%', display: 'block', margin: '0 auto' }}
      >
        <defs>
          <linearGradient id={vinilId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="35%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="85%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>

          <linearGradient id={shineId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <clipPath id={clipId}>
            <rect x="140" y="90" width="220" height="70" rx="8" />
          </clipPath>
        </defs>

        <style>{`
          @-webkit-keyframes pressStamp_${uid} {
            0%, 20% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            30%, 55% { -webkit-transform: translate3d(0, 35px, 0); transform: translate3d(0, 35px, 0); }
            65%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
          }
          @keyframes pressStamp_${uid} {
            0%, 20% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
            30%, 55% { -webkit-transform: translate3d(0, 35px, 0); transform: translate3d(0, 35px, 0); }
            65%, 100% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
          }
          @-webkit-keyframes linerPeel_${uid} {
            0%, 60% { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.9; }
            75%, 90% { -webkit-transform: translate3d(60px, -45px, 0) rotate(16deg); transform: translate3d(60px, -45px, 0) rotate(16deg); opacity: 0.4; }
            98%, 100% { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.9; }
          }
          @keyframes linerPeel_${uid} {
            0%, 60% { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.9; }
            75%, 90% { -webkit-transform: translate3d(60px, -45px, 0) rotate(16deg); transform: translate3d(60px, -45px, 0) rotate(16deg); opacity: 0.4; }
            98%, 100% { -webkit-transform: translate3d(0, 0, 0) rotate(0deg); transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.9; }
          }
          @-webkit-keyframes shineSwipe_${uid} {
            0%, 65% { -webkit-transform: translate3d(-150px, 0, 0); transform: translate3d(-150px, 0, 0); }
            80%, 95% { -webkit-transform: translate3d(250px, 0, 0); transform: translate3d(250px, 0, 0); }
            100% { -webkit-transform: translate3d(250px, 0, 0); transform: translate3d(250px, 0, 0); }
          }
          @keyframes shineSwipe_${uid} {
            0%, 65% { -webkit-transform: translate3d(-150px, 0, 0); transform: translate3d(-150px, 0, 0); }
            80%, 95% { -webkit-transform: translate3d(250px, 0, 0); transform: translate3d(250px, 0, 0); }
            100% { -webkit-transform: translate3d(250px, 0, 0); transform: translate3d(250px, 0, 0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .anim-node-${uid} {
              -webkit-animation: none !important;
              animation: none !important;
            }
          }
        `}</style>

        {/* Fondo de Mesa Textil */}
        <rect width="500" height="240" fill="#0f172a" />

        {/* Prenda Textil de Seguridad */}
        <rect x="80" y="55" width="340" height="140" rx="10" fill="#132a52" stroke="#1e3a8a" strokeWidth="2" />
        <rect x="80" y="70" width="340" height="10" fill="#84cc16" opacity="0.85" />
        <rect x="80" y="170" width="340" height="10" fill="#84cc16" opacity="0.85" />

        {/* LOGOTIPO DE VINIL ADHERIDO */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="140" y="90" width="220" height="70" rx="8" fill={`url(#${vinilId})`} stroke="#ffffff" strokeWidth="1.5" />
          
          <text x="250" y="130" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="4">
            SEGURIDAD
          </text>
          <text x="250" y="146" textAnchor="middle" fill="#1e3a8a" fontSize="9.5" fontWeight="800" letterSpacing="2">
            VINIL TÉRMICO REFLEJANTE
          </text>

          {/* Destello reflectivo */}
          <rect
            x="140"
            y="90"
            width="80"
            height="70"
            fill={`url(#${shineId})`}
            className={`anim-node-${uid}`}
            style={{
              WebkitAnimation: `shineSwipe_${uid} 4s infinite ease-in-out`,
              animation: `shineSwipe_${uid} 4s infinite ease-in-out`,
              willChange: 'transform',
              transformBox: 'view-box'
            }}
          />
        </g>

        {/* PELÍCULA TRANSPORTADORA (LINER PEELING) */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `linerPeel_${uid} 4s infinite ease-in-out`,
            animation: `linerPeel_${uid} 4s infinite ease-in-out`,
            WebkitTransformOrigin: '360px 160px',
            transformOrigin: '360px 160px',
            transformBox: 'view-box',
            willChange: 'transform, opacity'
          }}
        >
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

        {/* PRENSA TÉRMICA PLANA */}
        <g
          className={`anim-node-${uid}`}
          style={{
            WebkitAnimation: `pressStamp_${uid} 4s infinite cubic-bezier(0.4, 0, 0.2, 1)`,
            animation: `pressStamp_${uid} 4s infinite cubic-bezier(0.4, 0, 0.2, 1)`,
            willChange: 'transform',
            transformBox: 'view-box'
          }}
        >
          <rect x="120" y="25" width="260" height="24" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
          <rect x="130" y="45" width="240" height="6" fill="#f59e0b" />
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
  const generatedUid = useId().replace(/[^a-zA-Z0-9]/g, '_');
  const uid = `anim_${id}_${generatedUid}`;

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
      {/* Barra superior de telemetría (HUD) adaptativa para pantallas móviles */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '12px',
        right: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, overflow: 'hidden' }}>
          <span style={{
            width: '8px',
            height: '8px',
            minWidth: '8px',
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            boxShadow: '0 0 8px #22c55e',
            display: 'inline-block'
          }} />
          <span style={{
            fontSize: 'clamp(0.62rem, 2vw, 0.7rem)',
            fontFamily: 'monospace',
            fontWeight: 800,
            color: '#94a3b8',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {info.title}
          </span>
        </div>

        <span style={{
          fontSize: 'clamp(0.6rem, 1.8vw, 0.68rem)',
          fontFamily: 'monospace',
          fontWeight: 800,
          color: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '2px 8px',
          borderRadius: '6px',
          whiteSpace: 'nowrap',
          flexShrink: 0
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
        padding: '36px 12px 34px 12px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {id === 'bordado' && <AnimacionBordado uid={uid} />}
        {id === 'serigrafia' && <AnimacionSerigrafia uid={uid} />}
        {id === 'dtg' && <AnimacionDTG uid={uid} />}
        {id === 'sublimacion' && <AnimacionSublimacion uid={uid} />}
        {id === 'transfer' && <AnimacionTransfer uid={uid} />}
      </div>

      {/* Barra inferior explicativa */}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        left: '10px',
        right: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <span style={{
          fontSize: 'clamp(0.65rem, 2vw, 0.74rem)',
          color: '#cbd5e1',
          backgroundColor: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          padding: '3px 10px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          textAlign: 'center',
          maxWidth: '94%',
          lineHeight: 1.3,
          whiteSpace: 'normal'
        }}>
          💡 {info.step}
        </span>
      </div>
    </div>
  );
}

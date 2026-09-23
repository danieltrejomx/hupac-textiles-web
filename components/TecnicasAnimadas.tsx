'use client';
import React from 'react';

// =========================================================================
// 1. ANIMACIÓN: BORDADO INDUSTRIAL COMPUTARIZADO
// =========================================================================
export function AnimacionBordado() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          {/* Trama de tejido de tela */}
          <pattern id="telaWeave" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 4h8M4 0v8" stroke="#1e293b" strokeWidth="1" />
            <circle cx="2" cy="2" r="0.8" fill="#334155" opacity="0.6" />
            <circle cx="6" cy="6" r="0.8" fill="#334155" opacity="0.6" />
          </pattern>

          {/* Gradiente cromado de aguja industrial */}
          <linearGradient id="metalAguja" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="40%" stopColor="#f8fafc" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Brillo de hilo dorado */}
          <linearGradient id="hiloOro" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Resplandor de puntada */}
          <filter id="glowPuntada" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <style>{`
          @keyframes agujaStitch {
            0%, 100% { transform: translateY(0); }
            45% { transform: translateY(32px); }
            50% { transform: translateY(34px); }
            55% { transform: translateY(32px); }
          }
          @keyframes stitchImpact {
            0%, 40% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1.6); }
            70%, 100% { opacity: 0; transform: scale(2); }
          }
          @keyframes hilosDraw {
            0% { stroke-dashoffset: 400; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes bastidorMove {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-8px, 4px); }
            50% { transform: translate(6px, -4px); }
            75% { transform: translate(-4px, -6px); }
          }
          @keyframes threadVibrate {
            0%, 100% { d: path("M 250 10 Q 248 50 250 85"); }
            50% { d: path("M 250 10 Q 256 50 250 85"); }
          }
        `}</style>

        {/* Fondo de Prenda Textil */}
        <rect width="500" height="240" fill="#0b1329" />
        <rect width="500" height="240" fill="url(#telaWeave)" />

        {/* Bastidor de Bordado en Movimiento CNC */}
        <g style={{ animation: 'bastidorMove 8s infinite ease-in-out' }}>
          {/* Aro exterior de madera */}
          <ellipse cx="250" cy="140" rx="170" ry="75" fill="none" stroke="#78350f" strokeWidth="12" />
          <ellipse cx="250" cy="140" rx="170" ry="75" fill="none" stroke="#b45309" strokeWidth="6" />
          {/* Tornillo tensor del bastidor */}
          <rect x="70" y="134" width="20" height="12" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          <rect x="62" y="137" width="10" height="6" rx="2" fill="#94a3b8" />

          {/* Tela tensada interior */}
          <ellipse cx="250" cy="140" rx="164" ry="70" fill="#132a52" opacity="0.85" />

          {/* Líneas de Guía de Bordado Digital (Vector / Ponchado) */}
          <path 
            d="M 190 140 L 250 100 L 310 140 L 250 175 Z" 
            fill="none" 
            stroke="rgba(56, 189, 248, 0.25)" 
            strokeWidth="1" 
            strokeDasharray="4 4" 
          />

          {/* Puntadas Bordadas Progresivas (Efecto Relleno 3D) */}
          <g filter="url(#glowPuntada)">
            {/* Letra 'H' bordada con relieve */}
            <path
              d="M 215 115 L 215 165 M 285 115 L 285 165 M 215 140 L 285 140"
              stroke="url(#hiloOro)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="400"
              style={{ animation: 'hilosDraw 4s infinite linear' }}
            />
            {/* Puntadas de satín en zigzag */}
            <path
              d="M 210 115 Q 250 95 290 115 Q 250 135 210 115"
              fill="none"
              stroke="url(#hiloOro)"
              strokeWidth="4"
              strokeDasharray="6 3"
            />
            <path
              d="M 210 165 Q 250 185 290 165 Q 250 145 210 165"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
          </g>

          {/* Destello de impacto donde la aguja penetra */}
          <circle cx="250" cy="140" r="10" fill="#fef08a" style={{ animation: 'stitchImpact 0.6s infinite ease-out' }} />
        </g>

        {/* Hilo superior que baja del cono a la aguja */}
        <path
          d="M 250 0 L 250 85"
          stroke="url(#hiloOro)"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Cabezal y Barra de Aguja Mecánica */}
        <g style={{ animation: 'agujaStitch 0.6s infinite ease-in-out' }}>
          {/* Bloque porta-aguja superior */}
          <rect x="238" y="20" width="24" height="45" rx="4" fill="url(#metalAguja)" stroke="#334155" strokeWidth="1.5" />
          <line x1="238" y1="35" x2="262" y2="35" stroke="#475569" strokeWidth="2" />
          <line x1="238" y1="50" x2="262" y2="50" stroke="#475569" strokeWidth="2" />
          
          {/* Barra de la aguja cromada */}
          <rect x="248" y="65" width="4" height="60" fill="url(#metalAguja)" />
          
          {/* Punta afilada de aguja */}
          <polygon points="248,125 252,125 250,140" fill="url(#metalAguja)" />
          
          {/* Ojo de la aguja */}
          <ellipse cx="250" cy="133" rx="1" ry="2.5" fill="#0f172a" />

          {/* Prensatelas en 'U' (Presser Foot) */}
          <path d="M 236 100 L 236 128 L 243 134 M 264 100 L 264 128 L 257 134" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
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
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', display: 'block' }}>
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
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', display: 'block' }}>
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
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', display: 'block' }}>
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
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', display: 'block' }}>
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

export default function TecnicaAnimacion({ id, height = 240 }: TecnicaAnimacionProps) {
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
      <div style={{ flex: 1, position: 'relative' }}>
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

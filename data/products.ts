export interface ProductColor {
  nombre: string;
  hex: string;
  imagen?: string;
}

export interface Product {
  id: string;
  estilo: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  composicion: string;
  gramaje: string;
  tallas: string[];
  detalles: string[];
  tecnicas: string[];
  imagenPrincipal: string;
  colores: ProductColor[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'playera-max-cuello-redondo',
    estilo: 'ESTILO 32603',
    nombre: 'Playera Max · Cuello redondo',
    subtitulo: 'Algodón Pesado 190 g/m²',
    descripcion: 'Playera de corte clásico confeccionada en 100% algodón de peso completo. Ideal para uniformes industriales, comerciales y promocionales de gran durabilidad.',
    composicion: '100% Algodón peinado',
    gramaje: '190 g/m²',
    tallas: ['CH', 'M', 'G', 'XG', '2EG'],
    detalles: [
      'Cuello en tejido de punto con costura doble reforzada',
      'Tapa costura de hombro a hombro para mayor confort',
      'Doble dobladillo en mangas y bajo',
      'Excelente retención de color tras múltiples lavados'
    ],
    tecnicas: ['Impresión directa (DTG)', 'Serigrafía textil', 'Termotransferencia', 'Bordado industrial'],
    imagenPrincipal: '/images/img_3.webp',
    colores: [
      { nombre: 'Turquesa / Aqua', hex: '#67C3CF', imagen: '/images/img_3.webp' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Azul Marino', hex: '#132A52' },
      { nombre: 'Azul Rey', hex: '#2456C4' },
      { nombre: 'Gris Jaspe', hex: '#8A97A6' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Negro', hex: '#17222B' }
    ]
  },
  {
    id: 'playera-prime-peso-medio',
    estilo: 'ESTILO 32702',
    nombre: 'Playera Prime · Peso medio',
    subtitulo: 'Algodón Ligero 155 g/m²',
    descripcion: 'Prenda versátil de tacto suave y frescura superior. Disponible en 17 colores de línea y cortes para toda la familia.',
    composicion: '100% Algodón',
    gramaje: '155 g/m²',
    tallas: ['CH', 'M', 'G', 'XG', '2EG'],
    detalles: [
      'Silueta confort regular',
      'Tejido liso apto para serigrafía fina',
      'Disponible en corte Dama, Caballero, Infantil y Juvenil'
    ],
    tecnicas: ['Serigrafía', 'Impresión Directa (DTG)', 'Termotransferencia'],
    imagenPrincipal: '/images/img_4.webp',
    colores: [
      { nombre: 'Negro', hex: '#17222B', imagen: '/images/img_4.webp' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Azul Marino', hex: '#132A52' },
      { nombre: 'Azul Rey', hex: '#2456C4' },
      { nombre: 'Gris Claro', hex: '#C7D3DE' },
      { nombre: 'Verde Olivo', hex: '#6B7A28' }
    ]
  },
  {
    id: 'polo-caballero-cuello-tejido',
    estilo: 'ESTILO 32633',
    nombre: 'Polo Caballero · Cuello tejido',
    subtitulo: '100% Algodón Piqué 230 g/m²',
    descripcion: 'Polo ejecutiva clásica con cuello y puños tejidos. Aletilla reforzada de 3 botones al tono, excelente opción para imagen corporativa elegante.',
    composicion: '100% Algodón Piqué',
    gramaje: '230 g/m²',
    tallas: ['CH', 'M', 'G', 'XG', '2EG'],
    detalles: [
      'Cuello y puños en tejido rib de alta resistencia',
      'Aletilla de 3 botones reforzada',
      'Aberturas laterales en la base para mayor movilidad',
      'Especialmente diseñada para bordado de logotipo en pecho'
    ],
    tecnicas: ['Bordado de alta definición', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_5.webp',
    colores: [
      { nombre: 'Gris Heather', hex: '#C7D3DE', imagen: '/images/img_5.webp' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Azul Marino', hex: '#132A52' },
      { nombre: 'Azul Rey', hex: '#2456C4' },
      { nombre: 'Celeste', hex: '#67C3CF' },
      { nombre: 'Rojo', hex: '#B22234' }
    ]
  },
  {
    id: 'polo-asiluetada-dama',
    estilo: 'ESTILO 32626',
    nombre: 'Polo Asiluetada · Dama',
    subtitulo: 'Corte Femenino Piqué 230 g/m²',
    descripcion: 'Playera tipo polo con corte ergonómico asiluetado para dama. Aletilla estilizada de 4 botones al tono para un estilo impecable.',
    composicion: '100% Algodón Piqué',
    gramaje: '230 g/m²',
    tallas: ['CH', 'M', 'G', 'XG'],
    detalles: [
      'Corte curvo en cintura para ajuste femenino cómodo',
      'Aletilla fina de 4 botones al tono',
      'Tejido suave al tacto y transpirable'
    ],
    tecnicas: ['Bordado de alta definición', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_6.webp',
    colores: [
      { nombre: 'Rosa Pastel', hex: '#F3C4D3', imagen: '/images/img_6.webp' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Azul Marino', hex: '#132A52' },
      { nombre: 'Azul Rey', hex: '#2456C4' },
      { nombre: 'Turquesa', hex: '#67C3CF' },
      { nombre: 'Uva / Morado', hex: '#5A2D63' }
    ]
  },
  {
    id: 'polo-supreme-pique',
    estilo: 'ESTILO 36980',
    nombre: 'Polo Supreme · Tela piqué',
    subtitulo: '50% Algodón / 50% Poliéster 210 g/m²',
    descripcion: 'Línea Supreme con mezcla de algodón peinado y poliéster para cero encogimiento y secado rápido. Fit regular moderno.',
    composicion: '50% Algodón peinado / 50% Poliéster',
    gramaje: '210 g/m²',
    tallas: ['CH', 'M', 'G', 'XG', '2EG'],
    detalles: [
      'Hombros reforzados con pespunte doble',
      'Aberturas laterales y corte recto regular fit',
      'Gran estabilidad dimensional tras lavado industrial'
    ],
    tecnicas: ['Bordado', 'Sublimación parcial', 'Serigrafía'],
    imagenPrincipal: '/images/img_7.webp',
    colores: [
      { nombre: 'Blanco Supreme', hex: '#FFFFFF', imagen: '/images/img_7.webp' },
      { nombre: 'Gris Plata', hex: '#C7D3DE' },
      { nombre: 'Azul Marino', hex: '#132A52' },
      { nombre: 'Azul Rey', hex: '#2456C4' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Antracita / Carbón', hex: '#3A3F46' }
    ]
  },
  {
    id: 'camisa-pantalon-uniforme-completo',
    estilo: 'ESTILOS 35000 / 55152',
    nombre: 'Camisa + Pantalón · Uniforme completo',
    subtitulo: 'Gabardina o Mezclilla Operativa',
    descripcion: 'Conjunto de uniforme operativo de alta durabilidad. Camisa ejecutiva/operativa combinada con pantalón duradero de mezclilla o gabardina.',
    composicion: 'Camisa: Algodón/Poliéster 145 g/m² · Pantalón: Mezclilla 12-14 oz/yd²',
    gramaje: '145 g/m² (Camisa) / 14 oz (Pantalón)',
    tallas: ['CH', 'M', 'G', 'XG', '2EG', '3EG'],
    detalles: [
      'Disponible en corte Dama y Caballero',
      'Costuras triples reforzadas en puntos de tensión',
      'Bolsillo frontal y soporte para pluma'
    ],
    tecnicas: ['Bordado institucional', 'Serigrafía'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Cielo / Beige', hex: '#AECDE8', imagen: '/images/img_8.webp' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Azul Marino', hex: '#132A52' },
      { nombre: 'Khaki', hex: '#A99A6B' },
      { nombre: 'Mezclilla Índigo', hex: '#27364B' }
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

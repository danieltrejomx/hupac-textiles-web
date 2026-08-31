export interface ProductColor {
  nombre: string;
  hex: string;
  imagen?: string;
}

export interface PriceBracket {
  '12-71': number;
  '72-503': number;
  '504+': number;
}

export interface SizePriceConfig {
  Blanco?: PriceBracket;
  Claro?: PriceBracket;
  Oscuro?: PriceBracket;
  Colores?: PriceBracket;
}

export interface Product {
  id: string;
  sku: string;
  estilo?: string;
  nombre: string;
  categoria?: 'textiles' | 'calzado' | 'accesorios' | 'cabeza' | 'visual' | 'manos' | 'ropa-trabajo' | 'alturas' | 'vial';
  subtitulo: string;
  descripcion: string;
  composicion: string;
  gramaje: string;
  tallas: string[];
  detalles: string[];
  tecnicas: string[];
  imagenPrincipal: string;
  colores: ProductColor[];
  precios: Record<string, SizePriceConfig>;
  precioDirecto?: number;
  suela?: string;
  tipoNorma?: string;
  corrida?: string;
  empaque?: string;
}

export function getColorGroup(colorName: string): 'Blanco' | 'Claro' | 'Oscuro' | 'Colores' {
  const name = colorName.toLowerCase().trim();
  if (name === 'blanco') return 'Blanco';
  
  const claros = ['heather', 'cielo', 'rosa', 'aqua', 'celeste', 'amarillo', 'turquesa', 'gris', 'acero', 'gris jaspe', 'gris claro', 'turquesa jaspe', 'jaspe claro', 'jaspe jade', 'jaspe claro/gris', 'claro'];
  if (claros.some(c => name.includes(c))) return 'Claro';
  
  const oscuros = ['negro', 'marino', 'rojo', 'rey', 'vino', 'khaki', 'kakhi', 'café', 'morado', 'esmeralda', 'olivo', 'naranja', 'mango', 'fiusha', 'oxford', 'dark stone', 'verde olivo', 'jaspe negro', 'jaspe acero', 'jaspe petróleo', 'jaspe sepia', 'jaspe terracota', 'jaspe rosa mexicano', 'rey jaspe', 'rojo jaspe', 'ladrillo jaspe', 'negro jaspe', 'demin blk heather', 'fiusha neón', 'oscuro'];
  if (oscuros.some(o => name.includes(o))) return 'Oscuro';
  
  return 'Colores';
}

export function getSizeGroup(talla: string, precios: Record<string, any>): string {
  const keys = Object.keys(precios);
  if (keys.length === 0) return '';
  if (keys.length === 1) return keys[0];
  
  const t = talla.toUpperCase().trim();
  
  if (t === '2EG') {
    const match = keys.find(k => k.includes('2EG'));
    if (match) return match;
  }
  
  if (t === '3EG') {
    const match = keys.find(k => k.includes('3EG'));
    if (match) return match;
  }

  if (['ECH(04)', 'CH(06)', 'MD(08)', 'XCH-MD', '04-06-08', '04', '06', '08'].includes(t)) {
    const match = keys.find(k => k.includes('XCH-MD') || k.includes('04-06-08') || k.includes('04'));
    if (match) return match;
  }
  
  if (['GD(10/12)', 'EG(14/16)', 'GD-EG', '10/12-14/16', '10:12', '14:16', '10', '12', '14', '16'].includes(t)) {
    const match = keys.find(k => k.includes('GD-EG') || k.includes('10:12') || k.includes('14:16'));
    if (match) return match;
  }

  const adultMatch = keys.find(k => k.includes('CH-EG') || k.includes('CH-2EG'));
  if (adultMatch) return adultMatch;
  
  return keys[0];
}

export function getProductPrice(product: Product, colorName: string, size: string, quantity: number): number {
  if (product.precioDirecto) return product.precioDirecto;
  
  const sizeGroup = getSizeGroup(size, product.precios);
  const sizeConfig = product.precios[sizeGroup];
  if (!sizeConfig) return 0;
  
  const colorGroup = getColorGroup(colorName);
  
  const priceBracket = sizeConfig[colorGroup as keyof typeof sizeConfig]
    || sizeConfig['Colores' as keyof typeof sizeConfig]
    || sizeConfig['Blanco' as keyof typeof sizeConfig]
    || Object.values(sizeConfig)[0];
    
  if (!priceBracket) return 0;
  
  if (quantity >= 504) return priceBracket['504+'];
  if (quantity >= 72) return priceBracket['72-503'];
  return priceBracket['12-71'];
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id || p.sku === id);
}

export const PRODUCTS: Product[] = [
  {
    id: '34401-playera-premium-caballero',
    sku: '34401',
    nombre: 'Playera Premium',
    subtitulo: 'Caballero · 100% Algodón Peinado · 150 g/m²',
    descripcion: 'Playera formal casual confeccionada con hilo de algodón peinado ultrafino.',
    composicion: '100% Algodón Peinado',
    gramaje: '150 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Algodón peinado premium', 'Tacto terso', 'Fit moderno'],
    tecnicas: ['Impresión Directa (DTG)', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/34401_playera_premium_caballero.jpg',
    colores: [
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 39.00, '72-503': 38.22, '504+': 37.05 },
        Colores: { '12-71': 45.50, '72-503': 44.59, '504+': 43.23 }
      }
    }
  },
  {
    id: '30039-playera-stampa-caballero',
    sku: '30039',
    nombre: 'Playera Stampa',
    subtitulo: 'Caballero · 50% Algodón, 50% Poliéster · 155 g/m²',
    descripcion: 'Playera fresca de mezcla algodón/poliéster. Gran durabilidad, libre de encogimiento y arrugas.',
    composicion: '50% Algodón / 50% Poliéster',
    gramaje: '155 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Mezcla suave y fuerte', 'Frescura diaria', 'Resistente a lavadas continuas'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/30039_playera_stampa_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 30.00, '72-503': 29.40, '504+': 28.80 },
        Colores: { '12-71': 36.00, '72-503': 35.28, '504+': 34.56 }
      },
      '2EG': {
        Blanco: { '12-71': 34.50, '72-503': 33.81, '504+': 33.12 },
        Colores: { '12-71': 40.50, '72-503': 39.69, '504+': 38.88 }
      }
    }
  },
  {
    id: '32633-playera-polo-pique-caballero',
    sku: '32633',
    nombre: 'Playera Polo Piqué para Caballero',
    subtitulo: 'Caballero · Tipo Polo · 230 g/m²',
    descripcion: 'Camisa tipo Polo en clásico tejido piqué pesado de algodón con cuello y puños tejidos.',
    composicion: '100% Algodón',
    gramaje: '230 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Cuello tejido clásico', 'Aletilla de 3 botones', 'Ideal para bordados corporativos'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/32633_playera_polo_pique_caballero.jpg',
    colores: [
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Amarillo', hex: '#F5BE18' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 66.53, '72-503': 64.53, '504+': 63.20 },
        Colores: { '12-71': 79.59, '72-503': 77.20, '504+': 75.61 }
      },
      '2EG': {
        Blanco: { '12-71': 80.78, '72-503': 78.36, '504+': 76.74 },
        Colores: { '12-71': 95.00, '72-503': 92.15, '504+': 90.25 }
      }
    }
  },
  {
    id: '32626-playera-polo-pique-dama',
    sku: '32626',
    nombre: 'Playera Polo Pique para Dama',
    subtitulo: 'Dama · Tipo Polo · 230 g/m²',
    descripcion: 'Polo en tejido piqué de algodón con silueta entallada y costuras laterales curvadas.',
    composicion: '100% Algodón',
    gramaje: '230 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Silueta femenina entallada', 'Aletilla de 4 botones finos', 'Cuello tejido rib'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/32626_playera_polo_pique_dama.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Amarillo', hex: '#F5BE18' },
      { nombre: 'Rosa', hex: '#F3C4D3' },
      { nombre: 'Fiusha', hex: '#E6007E' },
      { nombre: 'Naranja', hex: '#F97316' },
      { nombre: 'Esmeralda', hex: '#0f9f6e' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 66.53, '72-503': 64.53, '504+': 63.20 },
        Claro: { '12-71': 73.65, '72-503': 71.44, '504+': 69.97 },
        Oscuro: { '12-71': 79.59, '72-503': 77.20, '504+': 75.61 }
      },
      '2EG': {
        Blanco: { '12-71': 80.78, '72-503': 78.36, '504+': 76.74 },
        Claro: { '12-71': 87.88, '72-503': 85.24, '504+': 83.49 },
        Oscuro: { '12-71': 95.03, '72-503': 92.18, '504+': 90.28 }
      }
    }
  },
  {
    id: '36980-playera-polo-supreme-caballero',
    sku: '36980',
    nombre: 'Playera Polo Supreme para Caballero',
    subtitulo: 'Caballero · 50% Algodón Peinado, 50% Poliéster · 210 g/m²',
    descripcion: 'Polo Supreme para caballero con mezcla de algodón peinado y poliéster para cero encogimiento.',
    composicion: '50% Algodón Peinado / 50% Poliéster',
    gramaje: '210 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG'],
    precios: {
      'CH-EG': {
        Colores: { '12-71': 92.10, '72-503': 90.26, '504+': 87.50 }
      },
      '2EG': {
        Colores: { '12-71': 110.83, '72-503': 108.61, '504+': 105.29 }
      }
    },
    detalles: ['Cuello de alta calidad', 'Resistente a arrugas', ' Fit regular fit'],
    tecnicas: ['Bordado', 'Serigrafía'],
    imagenPrincipal: '/images/products/36980_playera_polo_supreme_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Vino', hex: '#5C1D24' },
      { nombre: 'Jaspe Negro', hex: '#2A2D34' }
    ]
  },
  {
    id: '36981-playera-polo-supreme-dama',
    sku: '36981',
    nombre: 'Playera Polo Supreme para Dama',
    subtitulo: 'Dama · 50% Algodón Peinado, 50% Poliéster · 210 g/m²',
    descripcion: 'Polo Supreme con corte entallado femenino. Tela estable y resistente ideal para lavado continuo.',
    composicion: '50% Algodón Peinado / 50% Poliéster',
    gramaje: '210 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Corte entallado dama', 'Aletilla fina', 'Secado rápido'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/36981_playera_polo_supreme_dama.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Vino', hex: '#5C1D24' },
      { nombre: 'Jaspe Negro', hex: '#2A2D34' }
    ],
    precios: {
      'CH-EG': {
        Colores: { '12-71': 92.10, '72-503': 90.26, '504+': 87.50 }
      },
      '2EG': {
        Colores: { '12-71': 110.83, '72-503': 108.61, '504+': 105.29 }
      }
    }
  },
  {
    id: '31818-playera-prime-cuello-v-dama',
    sku: '31818',
    nombre: 'Playera Prime Cuello V',
    subtitulo: 'Dama · 100% Algodón Peinado · 155 g/m²',
    descripcion: 'Playera con escote en V entallada para dama, elaborada en fino algodón peinado premium.',
    composicion: '100% Algodón Peinado',
    gramaje: '155 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Escote en V fino', 'Corte para dama entallado', 'Fresco y ligero'],
    tecnicas: ['Serigrafía', 'Impresión Directa (DTG)', 'Termotransferencia'],
    imagenPrincipal: '/images/products/31818_playera_prime_cuello_v_dama.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Amarillo', hex: '#F5BE18' },
      { nombre: 'Rosa', hex: '#F3C4D3' },
      { nombre: 'Aqua', hex: '#67C3CF' },
      { nombre: 'Fiusha', hex: '#E6007E' },
      { nombre: 'Morado', hex: '#5A2D63' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 36.70, '72-503': 35.97, '504+': 34.87 },
        Claro: { '12-71': 42.00, '72-503': 41.16, '504+': 39.90 },
        Oscuro: { '12-71': 42.52, '72-503': 41.67, '504+': 40.39 }
      }
    }
  },
  {
    id: '38387-playera-cuello-v-caballero',
    sku: '38387',
    nombre: 'Playera Cuello V',
    subtitulo: 'Caballero · Manga Corta · 140 g/m²',
    descripcion: 'Playera con escote en V para caballero, fresca y ligera, ideal para un estilo casual u operativo en climas cálidos.',
    composicion: '100% Algodón',
    gramaje: '140 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Cuello V estructurado', 'Doble costura', 'Fácil de lavar'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/38387_playera_cuello_v_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ],
    precios: {
      'CH-EG': {
        Colores: { '12-71': 46.50, '72-503': 45.57, '504+': 44.18 }
      }
    }
  },
  {
    id: '37326-playera-tank-top-caballero',
    sku: '37326',
    nombre: 'Playera Tank Top',
    subtitulo: 'Caballero · Manga Corta · 150 g/m²',
    descripcion: 'Playera sin mangas tipo Tank Top. Diseñada para actividades deportivas o uso cotidiano en exteriores de altas temperaturas.',
    composicion: '100% Algodón',
    gramaje: '150 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Sin mangas', 'Sisas ribeteadas', 'Tacto suave'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/37326_playera_tank_top_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Heather', hex: '#c2c8d0' }
    ],
    precios: {
      'CH-EG': {
        Colores: { '12-71': 33.60, '72-503': 32.93, '504+': 31.92 }
      }
    }
  },
  {
    id: '32873-playera-tank-top-dama',
    sku: '32873',
    nombre: 'Playera Tank Top Dama',
    subtitulo: 'Dama · 50% Algodón, 50% Poliéster · 140 g/m²',
    descripcion: 'Camiseta sin mangas para dama con espalda atlética y tejido suave de peso extra ligero.',
    composicion: '50% Algodón / 50% Poliéster',
    gramaje: '140 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Corte olímpico espalda', 'Tejido jaspeado y liso', 'Ligereza excepcional'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/32873_playera_tank_top_dama.jpg',
    colores: [
      { nombre: 'Fiusha Neón', hex: '#FF007F' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rosa', hex: '#F3C4D3' },
      { nombre: 'Morado', hex: '#5A2D63' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Amarillo', hex: '#F5BE18' }
    ],
    precios: {
      'CH-EG': {
        Colores: { '12-71': 33.00, '72-503': 32.01, '504+': 31.35 }
      },
      '2EG': {
        Colores: { '12-71': 36.00, '72-503': 34.92, '504+': 34.20 }
      }
    }
  },
  {
    id: '34988-playera-snow-caballero',
    sku: '34988',
    nombre: 'Playera Snow',
    subtitulo: 'Caballero · 100% Algodón · 140 g/m²',
    descripcion: 'Playera con acabado jaspeado y textura extra suave, en corte clásico y cómodo.',
    composicion: '100% Algodón',
    gramaje: '140 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Textura efecto nieve', 'Tela ultra fresca', 'Ideal para calor'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/34988_playera_snow_caballero.jpg',
    colores: [
      { nombre: 'Jaspe Negro', hex: '#2A2D34' },
      { nombre: 'Jaspe Acero', hex: '#707A8A' },
      { nombre: 'Jaspe Petróleo', hex: '#2A4D54' },
      { nombre: 'Jaspe Sepia', hex: '#7A6B58' },
      { nombre: 'Jaspe Claro', hex: '#E2E8F0' }
    ],
    precios: {
      'CH-EG': {
        Colores: { '12-71': 42.00, '72-503': 41.16, '504+': 39.90 }
      },
      '2EG': {
        Colores: { '12-71': 50.00, '72-503': 49.00, '504+': 47.50 }
      }
    }
  },
  {
    id: '34990-playera-snow-cuello-v-dama',
    sku: '34990',
    nombre: 'Playera Snow Cuello V',
    subtitulo: 'Dama · 50% Algodón Peinado, 50% Poliéster · 140 g/m²',
    descripcion: 'Femenina playera con textura de efecto "Snow" jaspeado suave y escote en V.',
    composicion: '50% Algodón Peinado / 50% Poliéster',
    gramaje: '140 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Efecto jaspeado "Snow"', 'Escote en V estilizado', 'Tacto ultra suave'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/34990_playera_snow_cuello_v_dama.jpg',
    colores: [
      { nombre: 'Jaspe Negro', hex: '#2A2D34' },
      { nombre: 'Jaspe Acero', hex: '#707A8A' },
      { nombre: 'Jaspe Jade', hex: '#4F7D6D' },
      { nombre: 'Jaspe Terracota', hex: '#B35E46' },
      { nombre: 'Jaspe Rosa Mexicano', hex: '#E04A8A' }
    ],
    precios: {
      'CH-EG': {
        Colores: { '12-71': 44.20, '72-503': 43.32, '504+': 41.99 }
      }
    }
  },
  {
    id: '33981-polo-pique-manga-larga-caballero',
    sku: '33981',
    nombre: 'Polo Pique Manga Larga para Caballero',
    subtitulo: 'Caballero · 100% Algodón · 230 g/m²',
    descripcion: 'Polo de manga larga formal en piqué pesado, ideal para climas de transición y uniformado formal.',
    composicion: '100% Algodón',
    gramaje: '230 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Manga larga formal', 'Puño tejido rib', 'Aletilla con 3 botones'],
    tecnicas: ['Bordado', 'Serigrafía'],
    imagenPrincipal: '/images/products/33981_polo_pique_manga_larga_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 83.80, '72-503': 82.12, '504+': 79.61 },
        Colores: { '12-71': 92.90, '72-503': 91.04, '504+': 88.26 }
      }
    }
  },
  {
    id: '32692-playera-heavy-manga-larga-caballero',
    sku: '32692',
    nombre: 'Playera Heavy Manga Larga',
    subtitulo: 'Caballero · Manga Larga · 100% Algodón · 190 g/m²',
    descripcion: 'Playera manga larga de peso completo en 100% algodón, ideal para uniformar en ambientes fríos o de intemperie.',
    composicion: '100% Algodón',
    gramaje: '190 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Manga larga con puños acanalados', 'Tejido pesado abrigador', 'Costuras reforzadas en hombros'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/32692_playera_heavy_manga_larga_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 53.50, '72-503': 52.43, '504+': 50.83 },
        Colores: { '12-71': 66.00, '72-503': 64.68, '504+': 62.70 }
      },
      '2EG': {
        Blanco: { '12-71': 64.00, '72-503': 62.72, '504+': 60.80 },
        Colores: { '12-71': 77.00, '72-503': 75.46, '504+': 73.15 }
      }
    }
  },
  // --- CATEGORÍA CALZADO Y ACCESORIOS DE SEGURIDAD ---
  {
    id: 'calzado-1427-dominion-phylon-tpu',
    sku: '1427',
    nombre: 'Bota Dominion Phylon / TPU Waterproof',
    categoria: 'calzado',
    subtitulo: 'Bota Industrial Waterproof · Tipo II+III',
    descripcion: 'Bota de seguridad industrial waterproof con tecnología Dominion Phylon/TPU. Ofrece máxima protección, ligereza e impermeabilidad.',
    composicion: 'Micropiel Negro/Azul, Micropiel Negro/Amarillo',
    gramaje: 'Suela Phylon / TPU',
    tallas: ['23', '24', '25', '26', '27', '28', '29', '30'],
    detalles: ['Norma Tipo II+III', 'Suela Negra/Azul o Negra/Amarillo', 'Resistente al agua (Waterproof)'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_1427_dominion_waterproof.jpg',
    colores: [
      { nombre: 'Negro/Azul', hex: '#1e293b', imagen: '/images/calzado/calzado_1427_dominion_negro_azul.jpg' },
      { nombre: 'Negro/Amarillo', hex: '#eab308', imagen: '/images/calzado/calzado_1427_dominion_waterproof.jpg' }
    ],
    precios: {},
    precioDirecto: 613.00,
    suela: 'Negro/Azul y Negro/Amarillo',
    tipoNorma: 'II+III',
    corrida: '23-30'
  },
  {
    id: '32603-playera-max-caballero',
    sku: '32603',
    nombre: 'Playera Max',
    subtitulo: 'Caballero · Peso Completo · 190 g/m²',
    descripcion: 'Playera clásica Max de peso completo para caballero. Confeccionada con algodón de alta calidad para máxima durabilidad y confort.',
    composicion: '100% Algodón',
    gramaje: '190 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Cuello de punto reforzado', 'Doble costura en dobladillos', 'Tapa costura de hombro a hombro'],
    tecnicas: ['Serigrafía', 'Impresión Directa (DTG)', 'Termotransferencia', 'Bordado'],
    imagenPrincipal: '/images/products/32603_playera_max_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Amarillo', hex: '#F5BE18' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Cielo', hex: '#AECDE8' },
      { nombre: 'Acero', hex: '#64748b' },
      { nombre: 'Naranja', hex: '#F97316' },
      { nombre: 'Esmeralda', hex: '#0f9f6e' },
      { nombre: 'Gris', hex: '#9AA6B2' },
      { nombre: 'Khaki', hex: '#A99A6B' },
      { nombre: 'Mango', hex: '#FFB000' },
      { nombre: 'Café', hex: '#543D2B' },
      { nombre: 'Morado', hex: '#5A2D63' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 35.00, '72-503': 34.30, '504+': 33.25 },
        Colores: { '12-71': 41.00, '72-503': 40.18, '504+': 38.95 }
      },
      '2EG': {
        Blanco: { '12-71': 43.50, '72-503': 42.63, '504+': 41.33 },
        Colores: { '12-71': 51.00, '72-503': 49.98, '504+': 48.45 }
      }
    }
  },
  {
    id: '32702-playera-prime-caballero',
    sku: '32702',
    nombre: 'Playera Prime',
    subtitulo: 'Caballero · Manga Corta · 155 g/m²',
    descripcion: 'Playera regular ligera de tacto suave para caballero, ideal para uniformes de uso diario o eventos masivos.',
    composicion: '100% Algodón',
    gramaje: '155 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Silueta confort regular', 'Tejido pre-encogido', 'Tacto suave'],
    tecnicas: ['Serigrafía', 'Impresión Directa (DTG)', 'Termotransferencia'],
    imagenPrincipal: '/images/products/32702_playera_prime_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Olivo', hex: '#556B2F' },
      { nombre: 'Acero', hex: '#64748b' },
      { nombre: 'Naranja', hex: '#F97316' },
      { nombre: 'Esmeralda', hex: '#0f9f6e' },
      { nombre: 'Gris', hex: '#9AA6B2' },
      { nombre: 'Khaki', hex: '#A99A6B' },
      { nombre: 'Mango', hex: '#FFB000' },
      { nombre: 'Morado', hex: '#5A2D63' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 32.50, '72-503': 31.85, '504+': 30.88 },
        Claro: { '12-71': 35.90, '72-503': 35.18, '504+': 34.11 },
        Oscuro: { '12-71': 37.00, '72-503': 36.26, '504+': 35.15 }
      },
      '2EG': {
        Blanco: { '12-71': 41.00, '72-503': 40.18, '504+': 38.95 },
        Claro: { '12-71': 45.00, '72-503': 44.10, '504+': 42.75 },
        Oscuro: { '12-71': 45.00, '72-503': 44.10, '504+': 42.75 }
      }
    }
  },
  {
    id: '34400-playera-london-caballero',
    sku: '34400',
    nombre: 'Playera London',
    subtitulo: 'Caballero · 100% Algodón · 140 g/m²',
    descripcion: 'Estilo jaspeado moderno con un peso de tela super ligero. Un fit sofisticado y textura premium ideal para un look casual.',
    composicion: '100% Algodón',
    gramaje: '140 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Textura jaspeada ultra suave', 'Costura lateral moderna', 'Cuello fino al tono'],
    tecnicas: ['Serigrafía', 'Termotransferencia', 'Sublimación (tonos claros)'],
    imagenPrincipal: '/images/products/34400_playera_london_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Rey Jaspe', hex: '#355FC4' },
      { nombre: 'Rojo Jaspe', hex: '#B83543' },
      { nombre: 'Ladrillo Jaspe', hex: '#A84C38' },
      { nombre: 'Turquesa Jaspe', hex: '#4EA8B8' },
      { nombre: 'Negro Jaspe', hex: '#2C2E33' },
      { nombre: 'Demin Blk Heather', hex: '#24272D' }
    ],
    precios: {
      'CH-EG': {
        Colores: { '12-71': 42.00, '72-503': 41.16, '504+': 39.90 }
      }
    }
  },
  {
    id: '34420-playera-subli-caballero',
    sku: '34420',
    nombre: 'Playera Subli',
    subtitulo: 'Caballero · 100% Poliéster · 160 g/m²',
    descripcion: 'Playera de poliéster de tacto algodón diseñada especialmente para una excelente sublimación a todo color.',
    composicion: '100% Poliéster',
    gramaje: '160 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Tacto algodón', 'Sublimación perfecta', 'Fácil secado'],
    tecnicas: ['Sublimación total', 'Termotransferencia'],
    imagenPrincipal: '/images/products/34420_playera_subli_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 46.00, '72-503': 45.08, '504+': 43.70 }
      }
    }
  },
  {
    id: '39028-playera-cuello-redondo-nino',
    sku: '39028',
    nombre: 'Playera Cuello Redondo Infantil/Juvenil',
    subtitulo: 'Niño · 100% Algodón · 185 g/m²',
    descripcion: 'Playera clásica resistente para niños y adolescentes en algodón de peso completo.',
    composicion: '100% Algodón',
    gramaje: '185 g/m²',
    tallas: ['ECH(04)', 'CH(06)', 'MD(08)', 'GD(10/12)', 'EG(14/16)'],
    detalles: ['Doble costura de refuerzo', 'Tintes suaves', 'Corte amplio escolar'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/39028_playera_cuello_redondo_nino.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Amarillo', hex: '#F5BE18' },
      { nombre: 'Naranja', hex: '#F97316' },
      { nombre: 'Esmeralda', hex: '#0f9f6e' }
    ],
    precios: {
      'XCH-MD': {
        Blanco: { '12-71': 23.50, '72-503': 23.03, '504+': 22.33 },
        Colores: { '12-71': 28.00, '72-503': 27.44, '504+': 26.60 }
      },
      'GD-EG': {
        Blanco: { '12-71': 29.00, '72-503': 28.42, '504+': 27.55 },
        Colores: { '12-71': 32.80, '72-503': 32.14, '504+': 31.16 }
      }
    }
  },
  {
    id: '39029-playera-asiluetada-nina',
    sku: '39029',
    nombre: 'Playera Asiluetada Niña',
    subtitulo: 'Niña · 100% Algodón · 155 g/m²',
    descripcion: 'Playera con silueta entallada confortable para niñas y jóvenes, ideal para actividades escolares.',
    composicion: '100% Algodón',
    gramaje: '155 g/m²',
    tallas: ['ECH(04)', 'CH(06)', 'MD(08)', 'GD(10/12)', 'EG(14/16)'],
    detalles: ['Silueta entallada juvenil', 'Cuello elástico fino', 'Tacto suave'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/39029_playera_asiluetada_nina.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rosa', hex: '#F3C4D3' },
      { nombre: 'Fiusha', hex: '#E6007E' }
    ],
    precios: {
      'XCH-MD': {
        Blanco: { '12-71': 23.50, '72-503': 23.50, '504+': 23.50 },
        Colores: { '12-71': 28.00, '72-503': 28.00, '504+': 28.00 }
      },
      'GD-EG': {
        Blanco: { '12-71': 29.30, '72-503': 29.30, '504+': 29.30 },
        Colores: { '12-71': 33.80, '72-503': 33.80, '504+': 33.80 }
      }
    }
  },
  {
    id: '32412-playera-polo-pique-infantil',
    sku: '32412',
    nombre: 'Playera Polo Pique Infantil',
    subtitulo: 'Infantil · Tipo Polo Infantil · 200 g/m²',
    descripcion: 'Polo infantil en piqué de algodón premium. Ideal para escuelas y uniformado deportivo infantil.',
    composicion: '100% Algodón',
    gramaje: '200 g/m²',
    tallas: ['ECH(04)', 'CH(06)', 'MD(08)'],
    detalles: ['Tejido transpirable de algodón', 'Puños ribeteados confortables', 'Costuras reforzadas para niños'],
    tecnicas: ['Bordado', 'Serigrafía'],
    imagenPrincipal: '/images/products/32412_playera_polo_pique_infantil.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Amarillo', hex: '#F5BE18' },
      { nombre: 'Naranja', hex: '#F97316' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rosa', hex: '#F3C4D3' }
    ],
    precios: {
      '04-06-08': {
        Blanco: { '12-71': 43.00, '72-503': 42.14, '504+': 40.85 },
        Colores: { '12-71': 49.80, '72-503': 48.80, '504+': 47.31 }
      }
    }
  },
  {
    id: '32417-playera-polo-pique-juvenil',
    sku: '32417',
    nombre: 'Playera Polo Pique Juvenil',
    subtitulo: 'Juvenil · Tipo Polo Juvenil · 200 g/m²',
    descripcion: 'Polo en piqué de algodón para jóvenes, ideal para uniformes de secundaria y actividades de equipo.',
    composicion: '100% Algodón',
    gramaje: '200 g/m²',
    tallas: ['GD(10/12)', 'EG(14/16)'],
    detalles: ['Corte confortable regular juvenil', 'Resistente a deformación', 'Alta solidez al frote'],
    tecnicas: ['Bordado', 'Serigrafía'],
    imagenPrincipal: '/images/products/32417_playera_polo_pique_juvenil.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Amarillo', hex: '#F5BE18' },
      { nombre: 'Naranja', hex: '#F97316' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rosa', hex: '#F3C4D3' }
    ],
    precios: {
      '10:12-14:16': {
        Blanco: { '12-71': 50.60, '72-503': 49.59, '504+': 48.07 },
        Colores: { '12-71': 55.00, '72-503': 53.90, '504+': 52.25 }
      }
    }
  },
  {
    id: '370pw-playera-logan-caballero',
    sku: '370PW',
    nombre: 'Playera Logan',
    subtitulo: 'Caballero · Manga Corta · 200 g/m²',
    descripcion: 'Playera premium extra pesada para caballero. Estilo estructurado de gran cuerpo y prestancia.',
    composicion: '100% Algodón',
    gramaje: '200 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG', '3EG'],
    detalles: ['Grosor máximo y calidez', 'Corte amplio confortable', 'Cuello rib grueso'],
    tecnicas: ['Serigrafía', 'Bordado', 'Termotransferencia'],
    imagenPrincipal: '/images/products/32603_playera_max_caballero.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Gris', hex: '#9AA6B2' },
      { nombre: 'Khaki', hex: '#A99A6B' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 43.50, '72-503': 42.63, '504+': 41.33 },
        Claro: { '12-71': 46.00, '72-503': 45.08, '504+': 43.70 },
        Oscuro: { '12-71': 52.00, '72-503': 50.96, '504+': 49.40 }
      },
      '2EG': {
        Blanco: { '12-71': 54.00, '72-503': 52.92, '504+': 51.30 },
        Claro: { '12-71': 57.00, '72-503': 55.86, '504+': 54.15 },
        Oscuro: { '12-71': 66.00, '72-503': 64.68, '504+': 62.70 }
      },
      '3EG': {
        Blanco: { '12-71': 59.50, '72-503': 58.31, '504+': 56.53 },
        Oscuro: { '12-71': 75.50, '72-503': 73.99, '504+': 71.73 }
      }
    }
  },
  {
    id: '32582-playera-prime-dama',
    sku: '32582',
    nombre: 'Playera Prime Cuello Redondo',
    subtitulo: 'Dama · 100% Algodón Peinado · 155 g/m²',
    descripcion: 'Playera de silueta curva estilizada para dama, confeccionada con algodón peinado ultrafino.',
    composicion: '100% Algodón Peinado',
    gramaje: '155 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Silueta entallada femenina', 'Tacto suave peinado', 'Excelente caída'],
    tecnicas: ['Serigrafía', 'Impresión Directa (DTG)', 'Termotransferencia'],
    imagenPrincipal: '/images/products/32582_playera_prime_cuello_redondo_dama.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Amarillo', hex: '#F5BE18' },
      { nombre: 'Rosa', hex: '#F3C4D3' },
      { nombre: 'Aqua', hex: '#67C3CF' },
      { nombre: 'Fiusha', hex: '#E6007E' },
      { nombre: 'Morado', hex: '#5A2D63' },
      { nombre: 'Vino', hex: '#5C1D24' },
      { nombre: 'Marino', hex: '#132A52' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 35.60, '72-503': 34.89, '504+': 33.82 },
        Claro: { '12-71': 38.00, '72-503': 37.24, '504+': 36.10 },
        Oscuro: { '12-71': 40.00, '72-503': 39.20, '504+': 38.00 }
      }
    }
  },
  {
    id: '370lj-playera-crop-dama',
    sku: '370L',
    nombre: 'Playera Crop',
    subtitulo: 'Dama · 50% Algodón, 50% Poliéster · 140 g/m²',
    descripcion: 'Playera corta tipo Crop moderna para dama. Confeccionada con suave tejido de peso ligero.',
    composicion: '50% Algodón / 50% Poliéster',
    gramaje: '140 g/m²',
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Silueta corta a la cintura', 'Corte amplio holgado', 'Fresco y juvenil'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/products/31818_playera_prime_cuello_v_dama.jpg',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rosa', hex: '#F3C4D3' },
      { nombre: 'Amarillo', hex: '#F5BE18' },
      { nombre: 'Turquesa', hex: '#3cc4d6' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 40.00, '72-503': 39.20, '504+': 38.00 },
        Colores: { '12-71': 44.00, '72-503': 43.12, '504+': 41.80 }
      }
    }
  },
  {
    id: 'calzado-1417-dominion-phylon-tpu',
    sku: '1417',
    nombre: 'Bota Dominion Phylon / TPU Bull Fight',
    categoria: 'calzado',
    subtitulo: 'Bota de Seguridad Bull Fight · Tipo II+III',
    descripcion: 'Bota de seguridad alta durabilidad confeccionada en piel Bull Fight café o negro con suela de TPU negro.',
    composicion: 'Bull Fight Café / Bull Fight Negro',
    gramaje: 'Suela TPU Negro',
    tallas: ['23', '24', '25', '26', '27', '28', '29', '30'],
    detalles: ['Norma Tipo II+III', 'Suela TPU antiderrapante', 'Waterproof'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_1417_dominion_bullfight.jpg',
    colores: [
      { nombre: 'Bull Fight Café', hex: '#78350f', imagen: '/images/calzado/calzado_1417_dominion_bullfight.jpg' },
      { nombre: 'Bull Fight Negro', hex: '#17222B', imagen: '/images/calzado/calzado_1417_dominion_bullfight_negro.jpg' }
    ],
    precios: {},
    precioDirecto: 628.00,
    suela: 'TPU NEGRO',
    tipoNorma: 'II+III',
    corrida: '23-30'
  },
  {
    id: 'calzado-1437-dominion-phylon-tpu',
    sku: '1437',
    nombre: 'Bota Dominion Phylon / TPU Cuña',
    categoria: 'calzado',
    subtitulo: 'Bota Industrial Dieléctrica · Tipo II+III',
    descripcion: 'Bota ergonómica de seguridad con suela TPU cuña gris o cuña negro-azul. Diseñada para largas jornadas de trabajo.',
    composicion: 'Micro Negro / Cuña Gris o Negro-Azul',
    gramaje: 'Suela TPU Negro',
    tallas: ['23', '24', '25', '26', '27', '28', '29', '30'],
    detalles: ['Norma Tipo II+III', 'Suela TPU Negro', 'Capellada transpirable'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_1437_dominion_cuna.jpg',
    colores: [
      { nombre: 'Micro Negro/Cuña Gris', hex: '#475569', imagen: '/images/calzado/calzado_1437_dominion_cuna.jpg' },
      { nombre: 'Micro Negro/Cuña Negro-Azul', hex: '#1e3a8a', imagen: '/images/calzado/calzado_1437_dominion_cuna_azul.jpg' }
    ],
    precios: {},
    precioDirecto: 628.00,
    suela: 'TPU NEGRO',
    tipoNorma: 'II+III',
    corrida: '23-30'
  },
  {
    id: 'calzado-2203-mark-2-pu-tpu',
    sku: '2203',
    nombre: 'Bota Mark 2 PU/TPU Rosa (Dama)',
    categoria: 'calzado',
    subtitulo: 'Bota Industrial para Dama · Tipo II+III',
    descripcion: 'Bota de seguridad diseñada para dama con detalles en rosa, suela bidensidad PU/TPU y protección dieléctrica.',
    composicion: 'Micro Negro / Rosa',
    gramaje: 'Suela PU/TPU Rosa Bidensidad',
    tallas: ['22', '23', '24', '25', '26', '27'],
    detalles: ['Norma Tipo II+III para dama', 'Waterproof', 'Suela Rosa Bidensidad'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_2203_mark2_rosa_dama.jpg',
    colores: [
      { nombre: 'Micro Negro/Rosa', hex: '#f43f5e', imagen: '/images/calzado/calzado_2203_mark2_rosa_dama.jpg' }
    ],
    precios: {},
    precioDirecto: 541.00,
    suela: 'PU/TPU Rosa Bidensidad',
    tipoNorma: 'II+III',
    corrida: '22-27'
  },
  {
    id: 'calzado-3638-mark-2-pu-tpu-negro',
    sku: '3638-N',
    nombre: 'Bota Mark 2 PU/TPU Negro',
    categoria: 'calzado',
    subtitulo: 'Bota Industrial Bidensidad · Tipo II+III',
    descripcion: 'Bota industrial resistente en micro negro con suela bidensidad PU/TPU Negro.',
    composicion: 'Micro Negro',
    gramaje: 'Suela PU/TPU Negro',
    tallas: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Norma Tipo II+III', 'Waterproof', 'Excelente agarre'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_3638_mark2_negro.jpg',
    colores: [
      { nombre: 'Micro Negro', hex: '#17222B', imagen: '/images/calzado/calzado_3638_mark2_negro.jpg' }
    ],
    precios: {},
    precioDirecto: 570.00,
    suela: 'PU/TPU Negro',
    tipoNorma: 'II+III',
    corrida: '22-31'
  },
  {
    id: 'calzado-3638-mark-2-pu-tpu-cafe',
    sku: '3638-C',
    nombre: 'Bota Mark 2 PU/TPU Crazy Café',
    categoria: 'calzado',
    subtitulo: 'Bota Industrial Crazy Café · Tipo II+III',
    descripcion: 'Bota de seguridad premium en acabado Crazy Café con suela PU/TPU traslúcida.',
    composicion: 'Crazy Café',
    gramaje: 'Suela PU/TPU Traslúcido',
    tallas: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Norma Tipo II+III', 'Waterproof', 'Piel Crazy resistente'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_3638_mark2_crazy_cafe.jpg',
    colores: [
      { nombre: 'Crazy Café', hex: '#92400e', imagen: '/images/calzado/calzado_3638_mark2_crazy_cafe.jpg' }
    ],
    precios: {},
    precioDirecto: 617.00,
    suela: 'PU/TPU Traslúcido',
    tipoNorma: 'II+III',
    corrida: '22-31'
  },
  {
    id: 'calzado-2236-mark-2-pu-tpu-chelsea',
    sku: '2236',
    nombre: 'Bota Chelsea Mark 2 Piel Grasso Café',
    categoria: 'calzado',
    subtitulo: 'Bota de Casquillo Sin Agujetas · Tipo II+III',
    descripcion: 'Calzado de seguridad tipo Chelsea en piel grasso café con elásticos laterales y suela bidensidad traslúcida.',
    composicion: 'Piel Grasso Café',
    gramaje: 'Suela PU/TPU Traslúcido',
    tallas: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Estilo Chelsea elástico', 'Fácil de calzar', 'Norma Tipo II+III'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_2236_mark2_chelsea_cafe.jpg',
    colores: [
      { nombre: 'Piel Grasso Café', hex: '#78350f', imagen: '/images/calzado/calzado_2236_mark2_chelsea_cafe.jpg' }
    ],
    precios: {},
    precioDirecto: 582.00,
    suela: 'PU/TPU Traslúcido',
    tipoNorma: 'II+III',
    corrida: '22-31'
  },
  {
    id: 'calzado-3728-mark-2-napa-cafe',
    sku: '3728-C',
    nombre: 'Bota Mark 2 Napa Café',
    categoria: 'calzado',
    subtitulo: 'Bota Industrial Napa · Tipo II+III',
    descripcion: 'Bota industrial liviana en acabado Napa Café suave con suela PU/TPU Negro.',
    composicion: 'Napa Café',
    gramaje: 'Suela PU/TPU Negro',
    tallas: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Norma Tipo II+III', 'Tacto suave napa', 'Alta tracción'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_3728_mark2_napa_cafe.jpg',
    colores: [
      { nombre: 'Napa Café', hex: '#854d0e', imagen: '/images/calzado/calzado_3728_mark2_napa_cafe.jpg' }
    ],
    precios: {},
    precioDirecto: 572.00,
    suela: 'PU/TPU Negro',
    tipoNorma: 'II+III',
    corrida: '22-31'
  },
  {
    id: 'calzado-3728-mark-2-micro-negro',
    sku: '3728-N',
    nombre: 'Bota Mark 2 Micro Negro',
    categoria: 'calzado',
    subtitulo: 'Bota Industrial Robusta · Tipo II+III',
    descripcion: 'Bota de trabajo en micro negro de alta duración con suela bidensidad.',
    composicion: 'Micro Negro',
    gramaje: 'Suela PU/TPU Negro',
    tallas: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Norma Tipo II+III', 'Antiderrapante', 'Confort interior'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_3728_mark2_micro_negro.jpg',
    colores: [
      { nombre: 'Micro Negro', hex: '#17222B', imagen: '/images/calzado/calzado_3728_mark2_micro_negro.jpg' }
    ],
    precios: {},
    precioDirecto: 559.00,
    suela: 'PU/TPU Negro',
    tipoNorma: 'II+III',
    corrida: '22-31'
  },
  {
    id: 'calzado-2211-mark-2-bidensidad',
    sku: '2211',
    nombre: 'Bota Mark 2 Negro / Azul',
    categoria: 'calzado',
    subtitulo: 'Bota Dieléctrica Bidensidad · Tipo II+III',
    descripcion: 'Bota de seguridad clásica con vivos en azul y suela PU/TPU de alta resistencia bidensidad.',
    composicion: 'Piel Negro / Azul',
    gramaje: 'Suela PU/TPU Bidensidad',
    tallas: ['25', '26', '27', '28', '29', '30'],
    detalles: ['Norma Tipo II+III', 'Protección dieléctrica', 'Ergonómica'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_2211_mark2_negro_azul.jpg',
    colores: [
      { nombre: 'Negro/Azul', hex: '#1d4ed8', imagen: '/images/calzado/calzado_2211_mark2_negro_azul.jpg' }
    ],
    precios: {},
    precioDirecto: 628.00,
    suela: 'PU/TPU Bidensidad',
    tipoNorma: 'II+III',
    corrida: '25-30'
  },
  {
    id: 'calzado-4031-mark-2-metatarsal',
    sku: '4031',
    nombre: 'Bota Mark 2 Metatarsal Piel Negro',
    categoria: 'calzado',
    subtitulo: 'Bota de Seguridad con Solapa Metatarsal · Tipo II+III',
    descripcion: 'Bota especializada con protector metatarsal integrado de máxima seguridad en empeine.',
    composicion: 'Piel Negro con Solapa Metatarsal',
    gramaje: 'Suela PU/TPU Negro Bidensidad',
    tallas: ['25', '26', '27', '28', '29', '30'],
    detalles: ['Protector metatarsal para empeine', 'Norma Tipo II+III', 'Alta protección contra impactos'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_4031_mark2_metatarsal.jpg',
    colores: [
      { nombre: 'Piel Negro', hex: '#17222B', imagen: '/images/calzado/calzado_4031_mark2_metatarsal.jpg' }
    ],
    precios: {},
    precioDirecto: 639.00,
    suela: 'PU/TPU Negro Bidensidad',
    tipoNorma: 'II+III',
    corrida: '25-30'
  },
  {
    id: 'calzado-8427-kenny-phylon-tpu',
    sku: '8427',
    nombre: 'Bota Kenny Phylon / TPU',
    categoria: 'calzado',
    subtitulo: 'Bota Industrial Ligera Kenny · Tipo II+III',
    descripcion: 'Calzado de seguridad tipo sneaker industrial super ligero con suela de Phylon y suela exterior TPU.',
    composicion: 'Micropiel Negro/Azul o Negro/Amarillo',
    gramaje: 'Suela Phylon / TPU',
    tallas: ['25', '26', '27', '28', '29', '30'],
    detalles: ['Súper ligera', 'Norma Tipo II+III', 'Suela amortiguadora Phylon'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_8427_kenny_phylon.jpg',
    colores: [
      { nombre: 'Negro/Azul', hex: '#2563eb', imagen: '/images/calzado/calzado_8427_kenny_phylon.jpg' },
      { nombre: 'Negro/Amarillo', hex: '#eab308', imagen: '/images/calzado/calzado_8427_kenny_amarillo.jpg' }
    ],
    precios: {},
    precioDirecto: 537.00,
    suela: 'Phylon ngo/tpu azul o amarillo',
    tipoNorma: 'II+III',
    corrida: '25-30'
  },
  {
    id: 'calzado-6427-shark-phylon-tpu-caballero',
    sku: '6427-C',
    nombre: 'Calzado Shark Phylon/TPU Malla Tejida',
    categoria: 'calzado',
    subtitulo: 'Tenis de Seguridad Deportivo Malla · Tipo II',
    descripcion: 'Tenis de seguridad estilo deportivo confeccionado en malla tejida ultra transpirable con casquillo de protección.',
    composicion: 'Malla Tejida Transpirable',
    gramaje: 'Suela Phylon / TPU',
    tallas: ['23', '24', '25', '26', '27', '28', '29', '30'],
    detalles: ['Malla tejida ultra fresca', 'Estilo sneaker deportivo', 'Norma Tipo II'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_6427_shark_caballero.png',
    colores: [
      { nombre: 'Negro/Amarillo', hex: '#eab308', imagen: '/images/calzado/calzado_6427_shark_caballero.png' },
      { nombre: 'Negro/Azul', hex: '#2563eb', imagen: '/images/calzado/calzado_6427_shark_azul.png' }
    ],
    precios: {},
    precioDirecto: 510.00,
    suela: 'Phylon ngo/tpu amarillo o azul',
    tipoNorma: 'II',
    corrida: '23-30'
  },
  {
    id: 'calzado-6427-shark-phylon-tpu-fiusha',
    sku: '6427-F',
    nombre: 'Calzado Shark Phylon/TPU Fiusha (Dama)',
    categoria: 'calzado',
    subtitulo: 'Tenis de Seguridad para Dama · Tipo II',
    descripcion: 'Tenis de seguridad deportivo para dama en malla tejida con vivos en color fiusha y casquillo protector.',
    composicion: 'Malla Tejida Transpirable',
    gramaje: 'Suela Phylon / TPU Fiusha',
    tallas: ['23', '24', '25', '26', '27'],
    detalles: ['Horma femenina', 'Suela Phylon Fiusha', 'Norma Tipo II'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_6427_shark_fiusha_dama.jpg',
    colores: [
      { nombre: 'Negro/Fiusha', hex: '#ec4899', imagen: '/images/calzado/calzado_6427_shark_fiusha_dama.jpg' }
    ],
    precios: {},
    precioDirecto: 510.00,
    suela: 'Phylon ngo/tpu Fiusha',
    tipoNorma: 'II',
    corrida: '23-27'
  },
  {
    id: 'calzado-800-ken-phylon-anticlavo',
    sku: '800',
    nombre: 'Calzado Ken Phylon / Anticlavo',
    categoria: 'calzado',
    subtitulo: 'Tenis de Seguridad Tipo Calcetín Anticlavo · Tipo II+III',
    descripcion: 'Tenis industrial tipo calcetín con plantilla anticlavo y suela de EVA hule flexible.',
    composicion: 'Calcetín Negro Ajustable',
    gramaje: 'Suela EVA Hule Negro',
    tallas: ['25', '26', '27', '28', '29', '30'],
    detalles: ['Ajuste tipo calcetín slip-on', 'Protección anticlavo integrada', 'Norma Tipo II+III'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_800_ken_anticlavo.jpg',
    colores: [
      { nombre: 'Calcetín Negro', hex: '#17222B', imagen: '/images/calzado/calzado_800_ken_anticlavo.jpg' }
    ],
    precios: {},
    precioDirecto: 479.00,
    suela: 'EVA hule negro',
    tipoNorma: 'II+III',
    corrida: '25-30'
  },
  {
    id: 'calzado-8606-gripp-phylon-tpu',
    sku: '8606',
    nombre: 'Bota Gripp Phylon / TPU',
    categoria: 'calzado',
    subtitulo: 'Bota de Alta Tracción Gripp · Tipo II+III',
    descripcion: 'Bota de seguridad con huella Gripp antideslizante en suela Phylon/TPU.',
    composicion: 'Micropiel Negro/Azul o Negro/Amarillo',
    gramaje: 'Suela Phylon / TPU',
    tallas: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Diseño antiderrapante Gripp', 'Norma Tipo II+III', 'Ligera e impermeable'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_8606_gripp_phylon.png',
    colores: [
      { nombre: 'Negro/Azul', hex: '#2563eb', imagen: '/images/calzado/calzado_8606_gripp_phylon.png' },
      { nombre: 'Negro/Amarillo', hex: '#eab308', imagen: '/images/calzado/calzado_8606_gripp_amarillo.png' }
    ],
    precios: {},
    precioDirecto: 608.00,
    suela: 'Phylon ngo/tpu azul o amarillo',
    tipoNorma: 'II+III',
    corrida: '22-31'
  },
  {
    id: 'calzado-6997-balboa-hule-acrilo-nitrilo',
    sku: '6997',
    nombre: 'Bota Balboa Hule Acrilo-Nitrilo',
    categoria: 'calzado',
    subtitulo: 'Bota Petrolera / Química de Hule Nitrilo · Tipo II+III',
    descripcion: 'Bota de caña alta en piel engrasada café con suela de hule acrilo-nitrilo resistente a aceites y químicos.',
    composicion: 'Piel Engrasada Café',
    gramaje: 'Suela Hule Acrilo-Nitrilo',
    tallas: ['23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Resistente a hidrocarburos y aceites', 'Estilo petrolero de caña alta', 'Norma Tipo II+III'],
    tecnicas: ['Protección Industrial Especializada'],
    imagenPrincipal: '/images/calzado/calzado_6997_balboa_hule.jpg',
    colores: [
      { nombre: 'Piel Engrasada Café', hex: '#78350f', imagen: '/images/calzado/calzado_6997_balboa_hule.jpg' }
    ],
    precios: {},
    precioDirecto: 672.00,
    suela: 'Hule acrilo-nitrilo',
    tipoNorma: 'II+III',
    corrida: '23-31'
  },
  {
    id: 'calzado-1367-monster-2-cafe',
    sku: '1367-C',
    nombre: 'Bota Monster 2 Piel Grasso Café',
    categoria: 'calzado',
    subtitulo: 'Bota Híbrida Phylon/Nitrilo Waterproof · Tipo II+III',
    descripcion: 'Bota industrial de alto rendimiento Monster 2 en piel grasso café con suela antideslizante Phylon/Hule.',
    composicion: 'Piel Grasso Café',
    gramaje: 'Suela Phylon / Hule Acrilo-Nitrilo',
    tallas: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Waterproof a prueba de agua', 'Suela acrilo-nitrilo resistente', 'Norma Tipo II+III'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_1367_monster2_cafe.jpg',
    colores: [
      { nombre: 'Piel Grasso Café', hex: '#78350f', imagen: '/images/calzado/calzado_1367_monster2_cafe.jpg' }
    ],
    precios: {},
    precioDirecto: 675.00,
    suela: 'Phylon / Hule',
    tipoNorma: 'II+III',
    corrida: '22-31'
  },
  {
    id: 'calzado-1367-monster-2-negro',
    sku: '1367-N',
    nombre: 'Bota Monster 2 Micro Negro',
    categoria: 'calzado',
    subtitulo: 'Bota Híbrida Phylon/Nitrilo Waterproof · Tipo II+III',
    descripcion: 'Bota Monster 2 en micro negro con suela Phylon/Hule acrilo-nitrilo y máxima amortiguación.',
    composicion: 'Micro Negro',
    gramaje: 'Suela Phylon / Hule Acrilo-Nitrilo',
    tallas: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Waterproof', 'Alta durabilidad', 'Norma Tipo II+III'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/calzado_1367_monster2_negro.jpg',
    colores: [
      { nombre: 'Micro Negro', hex: '#17222B', imagen: '/images/calzado/calzado_1367_monster2_negro.jpg' }
    ],
    precios: {},
    precioDirecto: 664.00,
    suela: 'Phylon / Hule',
    tipoNorma: 'II+III',
    corrida: '22-31'
  },
  // --- ACCESORIOS DE SEGURIDAD ---
  {
    id: 'accesorio-proteccion-metatarsal',
    sku: 'ACC-META',
    nombre: 'Protección Metatarsal Externa',
    categoria: 'accesorios',
    subtitulo: 'Accesorio de Seguridad sobre Calzado',
    descripcion: 'Protector metatarsal externo adaptable a calzado industrial para brindar protección adicional en el empeine contra impactos pesados.',
    composicion: 'Polímero Termoplástico de Alto Impacto',
    gramaje: 'Accesorio Adaptable',
    tallas: ['Unica'],
    detalles: ['Adaptable a cualquier bota', 'Resistente a fuertes impactos de objetos caídos', 'Fácil colocación'],
    tecnicas: ['Protección Industrial'],
    imagenPrincipal: '/images/calzado/accesorio_proteccion_metatarsal.jpg',
    colores: [
      { nombre: 'Negro Industrial', hex: '#17222B', imagen: '/images/calzado/accesorio_proteccion_metatarsal.jpg' }
    ],
    precios: {},
    precioDirecto: 60.00
  },
  {
    id: 'accesorio-plantillas-pu-duty-gear',
    sku: 'ACC-PLAN',
    nombre: 'Plantillas Ergonómicas de PU Duty Gear',
    categoria: 'accesorios',
    subtitulo: 'Plantilla de Confort Antifatiga en Poliuretano',
    descripcion: 'Plantilla de PU termoformada antifatiga, diseñada para brindar máximo confort en largas jornadas de pie.',
    composicion: 'Poliuretano (PU) de Alta Densidad',
    gramaje: 'Plantilla Anatómica',
    tallas: ['22-24', '25-27', '28-30'],
    detalles: ['Soporte de arco anatómico', 'Absorción de impacto en talón', 'Mínimo de compra: 60 pares'],
    tecnicas: ['Confort Laboral'],
    imagenPrincipal: '/images/calzado/accesorio_plantillas_pu.jpg',
    colores: [
      { nombre: 'Amarillo / Negro', hex: '#eab308', imagen: '/images/calzado/accesorio_plantillas_pu.jpg' }
    ],
    precios: {},
    precioDirecto: 48.90
  },

  // ==========================================
  // EPC — PROTECCIÓN PARA LA CABEZA
  // ==========================================
  // =========================================================================
  // CATÁLOGO INDUSTRIAL HUPAC 2026 — EQUIPO DE PROTECCIÓN PERSONAL Y EPC
  // =========================================================================

  // --- 01-05: PROTECCIÓN PARA LA CABEZA ---
  {
    id: 'epc-casco-mundial',
    sku: 'CAS-MUN',
    nombre: 'Casco de Protección Mundial',
    categoria: 'cabeza',
    subtitulo: 'Dieléctrico hasta 20,000V · 8 Puntos · Polietileno Alto Impacto',
    descripcion: 'Casco de polietileno de alto impacto con estructura ergonómica, cómodo y ligero. Sistema de suspensión de 8 puntos. Capaz de resistir hasta 20,000 volts.',
    composicion: 'Polietileno de Alto Impacto',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Dieléctrico hasta 20,000V', 'Suspensión 8 puntos', 'Intervalo $46.90 / Matraca $87.90', 'Múltiplo de venta: 5 pz', 'Caja máster: 24 pz y 20 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/casco_mundial.png',
    colores: [
      { nombre: 'Blanco', hex: '#ffffff' },
      { nombre: 'Amarillo', hex: '#eab308' },
      { nombre: 'Naranja', hex: '#f97316' },
      { nombre: 'Azul', hex: '#2563eb' },
      { nombre: 'Verde', hex: '#16a34a' },
      { nombre: 'Rojo', hex: '#dc2626' }
    ],
    precios: {},
    precioDirecto: 46.90,
    empaque: '5 pz / Caja 24 pz'
  },
  {
    id: 'epc-casco-ala-ancha',
    sku: 'CAS-ALA',
    nombre: 'Casco de Protección Ala Ancha',
    categoria: 'cabeza',
    subtitulo: 'Protección 360° · Dieléctrico · Suspensión 8 Puntos',
    descripcion: 'Casco con ala ancha integral para protección contra caída de objetos, sol y lluvia. Fabricado en polietileno de alto impacto con suspensión de 8 puntos.',
    composicion: 'Polietileno de Alto Impacto',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Ala ancha 360°', 'Suspensión 8 puntos', 'Intervalo $85.90 / Matraca $101.90', 'Múltiplo de venta: 5 pz', 'Caja máster: 24 pz y 20 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/casco_ala_ancha.png',
    colores: [
      { nombre: 'Blanco', hex: '#ffffff' },
      { nombre: 'Amarillo', hex: '#eab308' },
      { nombre: 'Naranja', hex: '#f97316' },
      { nombre: 'Rojo', hex: '#dc2626' },
      { nombre: 'Azul', hex: '#2563eb' },
      { nombre: 'Verde', hex: '#16a34a' }
    ],
    precios: {},
    precioDirecto: 85.90,
    empaque: '5 pz / Caja 24 pz'
  },
  {
    id: 'epc-protector-facial',
    sku: 'PROT-FAC',
    nombre: 'Protector Facial para Casco',
    categoria: 'cabeza',
    subtitulo: 'Mica Policarbonato + Adaptador Universal para Casco',
    descripcion: 'Protector facial con adaptador abatible compatible con cascos de seguridad. Protege contra esquirlas, salpicaduras y partículas a alta velocidad.',
    composicion: 'Policarbonato de Alto Impacto',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Adaptador universal abatible', 'Mica alta transparencia', 'Adaptador $77.90 / Mica $44.90', 'Múltiplo de venta: 1 pz', 'Caja máster: 50 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/protector_facial.png',
    colores: [{ nombre: 'Transparente', hex: '#e2e8f0' }],
    precios: {},
    precioDirecto: 77.90,
    empaque: '1 pz / Caja 50 pz'
  },
  {
    id: 'epc-orejera-casco',
    sku: 'ORE-CAS',
    nombre: 'Orejera con Adaptador para Casco',
    categoria: 'cabeza',
    subtitulo: 'Atenuación Acústica · Montaje Directo en Ranuras de Casco',
    descripcion: 'Orejera protectora con acoplamiento directo a las ranuras laterales de cascos de seguridad. Almohadillas ergonómicas de alta comodidad.',
    composicion: 'ABS + Espuma Acústica',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Atenuación de ruido industrial', 'Montaje seguro en casco', 'Almohadillas acolchadas', 'Múltiplo de venta: 1 par'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/orejera_casco.png',
    colores: [{ nombre: 'Negro', hex: '#1e293b' }],
    precios: {},
    precioDirecto: 349.90,
    empaque: '1 par'
  },
  {
    id: 'epc-cubre-nuca',
    sku: 'CUB-NUC',
    nombre: 'Cubre Nuca con Reflejante',
    categoria: 'cabeza',
    subtitulo: 'Bloqueo Rayos UV · Cinta Reflejante · Tejido Transpirable',
    descripcion: 'Cubre nuca adaptable a cascos de seguridad para protección contra radiación solar e intemperie. Tejido transpirable de alta visibilidad con franja reflejante.',
    composicion: 'Malla Poliéster Fluorescente + Franja Reflejante',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Bloqueo UV', 'Tejido transpirable fresco', 'Material retrorreflectante', 'Múltiplo de venta: 10 pz', 'Caja máster: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/cubre_nuca.png',
    colores: [
      { nombre: 'Amarillo Neón', hex: '#facc15' },
      { nombre: 'Naranja Neón', hex: '#fb923c' },
      { nombre: 'Verde Neón', hex: '#4ade80' }
    ],
    precios: {},
    precioDirecto: 31.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-capucha-antiflama',
    sku: 'CAP-ANT',
    nombre: 'Capucha Antiflama Ignífuga',
    categoria: 'cabeza',
    subtitulo: 'Resistencia al Fuego y Chispas · Protección Soldadura',
    descripcion: 'Capucha ignífuga para protección de cabeza, cuello y hombros contra chispas de soldadura y calor radiante. Tejido suave, transpirable y resistente.',
    composicion: 'Algodón Tratado Ignífugo / Antiflama',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Resistencia al fuego', 'Protege contra soldadura', 'Tejido transpirable', 'Múltiplo de venta: 10 pz', 'Caja máster: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/capucha_antiflama.png',
    colores: [
      { nombre: 'Verde', hex: '#166534' },
      { nombre: 'Azul', hex: '#1e40af' }
    ],
    precios: {},
    precioDirecto: 97.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-tapon-reusable',
    sku: 'TAP-REU',
    nombre: 'Tapón Auditivo Reusable con Cordón',
    categoria: 'cabeza',
    subtitulo: 'Triple Aleta de Silicona · Apto Uso Prolongado',
    descripcion: 'Tapón auditivo lavable y reusable de silicona suave con triple reborde de sellado y cordón de sujeción. No irrita el canal auditivo.',
    composicion: 'Silicona Grado Médico + Cordón de Poliéster',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Aletas suaves adaptables', 'Apto uso prolongado sin irritación', 'Reducción de ruido industrial', 'Múltiplo de venta: 200 pz', 'Caja máster: 1,000 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/tapon_reusable.png',
    colores: [{ nombre: 'Verde / Azul', hex: '#22c55e' }],
    precios: {},
    precioDirecto: 6.90,
    empaque: '200 pz / Caja 1,000 pz'
  },
  {
    id: 'epc-tapon-desechable',
    sku: 'TAP-DES',
    nombre: 'Tapón Auditivo Desechable',
    categoria: 'cabeza',
    subtitulo: 'Espuma de Poliuretano Expansible · Reducción de Ruido',
    descripcion: 'Tapón auditivo cónico de espuma autoexpansible con memoria. Se amolda suavemente a cualquier canal auditivo para un sellado acústico óptimo.',
    composicion: 'Espuma de Poliuretano Suave',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Se expande para sellado cómodo', 'Reducción de ruido', 'De un solo uso', 'Múltiplo de venta: 100 pz', 'Caja máster: 1,000 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/tapon_desechable.png',
    colores: [{ nombre: 'Naranja / Azul', hex: '#f97316' }],
    precios: {},
    precioDirecto: 5.90,
    empaque: '100 pz / Caja 1,000 pz'
  },
  {
    id: 'epc-cofia-pisada',
    sku: 'COF-PIS',
    nombre: 'Cofia Pisada Desechable',
    categoria: 'cabeza',
    subtitulo: 'Tejido No Tejido Transpirable · Elástico sin Látex · Dispenser',
    descripcion: 'Cofia plisada desechable para contención capilar en industrias alimentarias, médicas y farmacéuticas. Elástico libre de látex para ajuste sin opresión.',
    composicion: 'Polipropileno Spunbond No Tejido',
    gramaje: 'Dispenser 100 pz',
    tallas: ['Unitalla'],
    detalles: ['Tejido transpirable', 'Elástico sin látex', 'Ligero y cómodo', 'Múltiplo de venta: 100 pz (Dispenser)', 'Caja máster: 1,000 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/cofia_pisada.png',
    colores: [{ nombre: 'Blanco', hex: '#ffffff' }],
    precios: {},
    precioDirecto: 39.90,
    empaque: '100 pz / Caja 1,000 pz'
  },
  {
    id: 'epc-cofia-ninja',
    sku: 'COF-NIN',
    nombre: 'Cofia Ninja Hood Desechable',
    categoria: 'cabeza',
    subtitulo: 'Cobertura Integral Cabeza y Cuello · Tejido Transpirable',
    descripcion: 'Cofia estilo Ninja Hood de cobertura integral de cabeza, nuca y cuello para máximos estándares de inocuidad en plantas procesadoras.',
    composicion: 'Polipropileno No Tejido Premium',
    gramaje: 'Dispenser 100 pz',
    tallas: ['Unitalla'],
    detalles: ['Cobertura completa', 'Tejido transpirable', 'Ligero e higiénico', 'Múltiplo de venta: 100 pz (Dispenser)', 'Caja máster: 1,000 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/cofia_ninja.png',
    colores: [{ nombre: 'Blanco', hex: '#ffffff' }],
    precios: {},
    precioDirecto: 198.90,
    empaque: '100 pz / Caja 1,000 pz'
  },

  // --- 06-09: PROTECCIÓN VISUAL Y FACIAL ---
  {
    id: 'epc-lente-dc0024',
    sku: 'LEN-DC0024',
    nombre: 'Lente de Seguridad DC0024',
    categoria: 'visual',
    subtitulo: 'Protección UV 99.9% · Policarbonato Antirayaduras · Vista Panorámica',
    descripcion: 'Lente de seguridad con montura ergonómica envolvente, fabricado en policarbonato de alta resistencia contra impactos y recubrimiento antirayaduras.',
    composicion: 'Policarbonato de Alto Impacto',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Bloquea 99.9% rayos UV', 'Material policarbonato', 'Vista panorámica', 'Antirayones', 'Múltiplo de venta: 12 pz', 'Caja máster: 240 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/lente_dc0024.png',
    colores: [
      { nombre: 'Transparente / Blanco', hex: '#e2e8f0' },
      { nombre: 'Humo / Negro', hex: '#1e293b' }
    ],
    precios: {},
    precioDirecto: 15.90,
    empaque: '12 pz / Caja 240 pz'
  },
  {
    id: 'epc-lente-dc0025',
    sku: 'LEN-DC0025',
    nombre: 'Lente de Seguridad DC0025',
    categoria: 'visual',
    subtitulo: 'Protección UV400 · Ultraligero · Puente Nasal Confort',
    descripcion: 'Lente de seguridad ultraligero con protección UV400. Diseño clásico y ergonómico para uso continuo en líneas de producción y mantenimiento.',
    composicion: 'Policarbonato Óptico',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Protección UV400', 'Material policarbonato', 'Ligero', 'Blanco $17.90 / Negro $12.90', 'Múltiplo de venta: 12 pz', 'Caja máster: 300 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/lente_dc0025.png',
    colores: [
      { nombre: 'Blanco', hex: '#ffffff' },
      { nombre: 'Negro', hex: '#1e293b' }
    ],
    precios: {},
    precioDirecto: 12.90,
    empaque: '12 pz / Caja 300 pz'
  },
  {
    id: 'epc-lente-nemesis-camuflaje',
    sku: 'LEN-NEM-CAM',
    nombre: 'Lente Tipo Némesis Camuflaje',
    categoria: 'visual',
    subtitulo: 'Armazón Camuflajeado · Patillas Flexibles · UV 99.9%',
    descripcion: 'Lente de seguridad deportivo tipo Némesis con elegante armazón camuflaje militar. Patillas flexibles con insertos suaves y amplio campo visual.',
    composicion: 'Policarbonato Resistente a Impactos',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Bloquea 99.9% rayos UV', 'Patillas flexibles', 'Vista panorámica', 'Antirayones', 'Múltiplo de venta: 12 pz', 'Caja máster: 144 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/lente_nemesis_camuflaje.png',
    colores: [
      { nombre: 'Mica Clara', hex: '#e2e8f0' },
      { nombre: 'Mica Oscura', hex: '#334155' }
    ],
    precios: {},
    precioDirecto: 69.90,
    empaque: '12 pz / Caja 144 pz'
  },
  {
    id: 'epc-lente-nemesis',
    sku: 'LEN-NEM',
    nombre: 'Lente Tipo Némesis',
    categoria: 'visual',
    subtitulo: 'Línea Deportiva · Protección contra Impactos · UV 99.9%',
    descripcion: 'Lente de seguridad tipo Némesis con diseño ergonómico de estilo deportivo. Ajuste ceñido de alta estabilidad y micas resistentes a rayaduras.',
    composicion: 'Policarbonato Resistente a Impactos',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Bloquea 99.9% rayos UV', 'Protección contra impactos', 'Antirayones', 'Múltiplo de venta: 12 pz', 'Caja máster: 144 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/lente_nemesis.png',
    colores: [
      { nombre: 'Mica Clara', hex: '#e2e8f0' },
      { nombre: 'Mica Oscura / Rojo', hex: '#991b1b' }
    ],
    precios: {},
    precioDirecto: 59.90,
    empaque: '12 pz / Caja 144 pz'
  },
  {
    id: 'epc-google-trilogy',
    sku: 'GOG-TRI',
    nombre: 'Goggle de Seguridad Trilogy',
    categoria: 'visual',
    subtitulo: 'Sellado Facial Completo · Banda Elástica Ajustable · Anti-Impacto',
    descripcion: 'Goggle de seguridad con sellado perimetral contra polvo fino y partículas volátiles. Micas panorámicas y banda elástica de ajuste regulable.',
    composicion: 'Cuerpo de PVC Flexible + Mica de Policarbonato',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Bloquea 99.9% rayos UV', 'Antirayones', 'Vista panorámica', 'Elástico para ajuste', 'Múltiplo de venta: 12 pz', 'Caja máster: 60 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/google_trilogy.png',
    colores: [{ nombre: 'Azul / Humo', hex: '#2563eb' }],
    precios: {},
    precioDirecto: 94.90,
    empaque: '12 pz / Caja 60 pz'
  },
  {
    id: 'epc-lente-pasta-dura',
    sku: 'LEN-PAS',
    nombre: 'Lente Pasta Dura Polarizado',
    categoria: 'visual',
    subtitulo: 'Armazón Rígido Reforzado · Micas Polarizadas · Máxima Resistencia',
    descripcion: 'Lente de seguridad con robusto armazón de pasta dura y cristales polarizados. Excelente protección contra deslumbramiento y rayos solares.',
    composicion: 'Armazón de Pasta Rígida + Lentes Polarizados',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Armazón de pasta dura', 'Bloquea 99.9% rayos UV', 'Protección contra impactos', 'Antirayones', 'Múltiplo de venta: 1 pz', 'Caja máster: 60 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/lente_pasta_dura.png',
    colores: [{ nombre: 'Camuflaje / Polarizado', hex: '#475569' }],
    precios: {},
    precioDirecto: 99.90,
    empaque: '1 pz / Caja 60 pz'
  },
  {
    id: 'epc-sobre-lente-dc0027',
    sku: 'SLEN-DC0027',
    nombre: 'Sobre Lente DC0027 (OTG)',
    categoria: 'visual',
    subtitulo: 'Para Uso Sobre Lentes Graduados · Alta Visibilidad Panorámica',
    descripcion: 'Lente de protección tipo Sobre Lente (OTG - Over The Glasses) diseñado específicamente para colocarse sobre lentes oftálmicos graduados sin interferencia.',
    composicion: 'Policarbonato Transparente de Alta Calidad',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Mica clara alta visibilidad', 'Ajuste amplio diferentes rostros', 'Vista panorámica', 'Antirayones', 'Múltiplo de venta: 12 pz', 'Caja máster: 144 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/sobre_lente_dc0027.png',
    colores: [{ nombre: 'Transparente', hex: '#e2e8f0' }],
    precios: {},
    precioDirecto: 29.90,
    empaque: '12 pz / Caja 144 pz'
  },
  {
    id: 'epc-monogoogle-ventilado',
    sku: 'MGOG-VEN',
    nombre: 'Monogoggle Ventilado',
    categoria: 'visual',
    subtitulo: 'Ventilación Indirecta · Evita Salpicaduras Químicas y Polvo',
    descripcion: 'Monogoggle de protección con válvulas de ventilación indirecta que evitan el empañamiento e impiden el ingreso de gotas, salpicaduras y partículas.',
    composicion: 'PVC Flexible Transparente + Policarbonato',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Evita entrada de líquidos y partículas', 'Elástico para ajuste', 'Ventilación indirecta', 'Múltiplo de venta: 6 pz', 'Caja máster: 60 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/monogoogle_ventilado.png',
    colores: [{ nombre: 'Transparente', hex: '#e2e8f0' }],
    precios: {},
    precioDirecto: 34.30,
    empaque: '6 pz / Caja 60 pz'
  },

  // --- 10-20: PROTECCIÓN PARA MANOS ---
  {
    id: 'epc-guantes-nylon-nitrilo',
    sku: 'GNT-NYL',
    nombre: 'Guantes Nylon con Nitrilo',
    categoria: 'manos',
    subtitulo: 'Palma Bañada en Nitrilo Negro · Destreza y Ergonomía',
    descripcion: 'Guante de tejido de nylon sin costuras con recubrimiento de nitrilo en palma y dedos. Ofrece excelente agarre en seco y resistencia a aceites y abrasión.',
    composicion: 'Nylon 13 Gauge + Recubrimiento de Nitrilo',
    gramaje: 'Par',
    tallas: ['6', '7', '8', '9', '10'],
    detalles: ['Destreza y ergonomía', 'Contra abrasión', 'Tejido transpirable', 'Repele líquidos y químicos ligeros', 'Múltiplo: 12 pares / Caja: 240 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_nylon_nitrilo.png',
    colores: [{ nombre: 'Negro', hex: '#0f172a' }],
    precios: {},
    precioDirecto: 12.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guantes-nylon-pu',
    sku: 'GPU-NYL',
    nombre: 'Guante Nylon con Poliuretano (PU)',
    categoria: 'manos',
    subtitulo: 'Recubrimiento PU · Alta Sensibilidad Táctil · Montaje de Precisión',
    descripcion: 'Guante de nylon con recubrimiento de poliuretano en palma. Proporciona máxima sensibilidad táctil, no deja pelusa y es ideal para ensambles electrónicos y mecánicos.',
    composicion: 'Nylon + Recubrimiento de Poliuretano',
    gramaje: 'Par',
    tallas: ['6', '7', '8', '9', '10'],
    detalles: ['PU en palma y dedos', 'Gran adherencia en seco', 'Sensibilidad táctil', 'Resistencia químicos ligeros', 'Múltiplo: 12 pares / Caja: 240 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_nylon_pu.png',
    colores: [
      { nombre: 'Gris', hex: '#64748b' },
      { nombre: 'Blanco', hex: '#ffffff' },
      { nombre: 'Negro', hex: '#0f172a' }
    ],
    precios: {},
    precioDirecto: 12.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guantes-anticorte-impacto',
    sku: 'GAC-IMP',
    nombre: 'Guantes Anticorte Nivel 5 Anti Impacto',
    categoria: 'manos',
    subtitulo: 'Nivel A5 Anticorte + Protecciones TPR Anti Impacto en Dorso',
    descripcion: 'Guante de protección extrema con tejido HPPE Nivel 5 anticorte y protecciones termoplásticas TPR en dorso y dedos contra golpes y pellizcos.',
    composicion: 'Fibra HPPE Nivel 5 + Protectores TPR + Palma Nitrilo',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Resistencia al corte Nivel 5', 'Protección EN 388', 'Goma termoplástica TPR', 'Repele líquidos y aceites', 'Múltiplo: 12 pares / Caja: 144 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_anticorte_impacto.png',
    colores: [{ nombre: 'Gris / Amarillo TPR', hex: '#eab308' }],
    precios: {},
    precioDirecto: 227.90,
    empaque: '12 pares / Caja 144 pares'
  },
  {
    id: 'epc-guantes-anticorte-nitrilo',
    sku: 'GAC-NIT',
    nombre: 'Guantes Anticorte Nivel 5 Palma de Nitrilo',
    categoria: 'manos',
    subtitulo: 'Tejido HPPE Nivel A5 · Recubrimiento Nitrilo Sand / Foam',
    descripcion: 'Guante anticorte con fibra de alto rendimiento Nivel 5 y palma de microespuma de nitrilo para agarre firme en piezas aceitosas y cortantes.',
    composicion: 'Fibra HPPE Nivel A5 + Nitrilo Microespuma',
    gramaje: 'Par',
    tallas: ['6', '7', '8', '9', '10'],
    detalles: ['Resistencia corte Nivel 5', 'Protección EN 388', 'Sensibilidad táctil', 'Repele aceites', 'Múltiplo: 12 pares / Caja: 240 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_anticorte_nitrilo.png',
    colores: [{ nombre: 'Gris / Negro', hex: '#334155' }],
    precios: {},
    precioDirecto: 45.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guantes-inspector',
    sku: 'GIN-POL',
    nombre: 'Guantes Inspector 100% Poliéster',
    categoria: 'manos',
    subtitulo: 'Evita Huellas y Rayones · Trabajo Limpio · Control de Calidad',
    descripcion: 'Guante ligero de inspección en 100% poliéster blanco. Evita manchas, grasa natural de la piel y rayaduras en productos terminados.',
    composicion: '100% Poliéster Blanco Suave',
    gramaje: 'Par',
    tallas: ['7', '8', '9', '10'],
    detalles: ['Evita huellas y manchas', 'Sensibilidad táctil', 'Ligeros', 'Control de calidad e inspección', 'Múltiplo: 12 pares / Caja: 240 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_inspector.png',
    colores: [{ nombre: 'Blanco', hex: '#ffffff' }],
    precios: {},
    precioDirecto: 10.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guantes-japones-latex',
    sku: 'GJP-LAT',
    nombre: 'Guante Japonés con Palma Látex',
    categoria: 'manos',
    subtitulo: 'Tejido Punto Continuo + Palma Baño Látex Rugoso',
    descripcion: 'Guante tejido tipo japonés con recubrimiento de látex corrugado en la palma para un agarre excepcional en materiales secos y húmedos.',
    composicion: 'Algodón/Poliéster + Palma de Látex Corrugado',
    gramaje: 'Par',
    tallas: ['7', '8', '9', '10'],
    detalles: ['Protección EN 388', 'Sensibilidad táctil', 'Tejido transpirable', 'Repele líquidos ligeros', 'Múltiplo: 12 pares / Caja: 240 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_japones_latex.png',
    colores: [{ nombre: 'Azul / Blanco', hex: '#2563eb' }],
    precios: {},
    precioDirecto: 29.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guantes-anticorte-pu',
    sku: 'GAC-PU',
    nombre: 'Guantes Anticorte Nivel 5 Poliuretano',
    categoria: 'manos',
    subtitulo: 'Fibra HPPE Nivel 5 + Palma Poliuretano Gris',
    descripcion: 'Guante anticorte Nivel 5 con recubrimiento de poliuretano en palma. Combina alta protección contra navajas y filos con máxima destreza táctil.',
    composicion: 'Fibra HPPE Nivel A5 + Recubrimiento PU',
    gramaje: 'Par',
    tallas: ['6', '7', '8', '9', '10'],
    detalles: ['Resistencia al corte Nivel 5', 'Protección EN 388', 'Sensibilidad táctil', 'Fibra alto rendimiento', 'Múltiplo: 12 pares / Caja: 240 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_anticorte_pu.png',
    colores: [{ nombre: 'Gris', hex: '#64748b' }],
    precios: {},
    precioDirecto: 42.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guantes-argoneros',
    sku: 'GAR-ARG',
    nombre: 'Guantes Argoneros',
    categoria: 'manos',
    subtitulo: 'Piel Flor de Cerdo/Res Suave · Soldadura TIG / Argón',
    descripcion: 'Guante de piel suave tipo argonero para soldadura especializada TIG/Argón. Excelente sensibilidad y tacto para manipular varillas y sopletes.',
    composicion: 'Piel Natural Flor',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Resistencia dieléctrica', 'Sensibilidad táctil', 'Ligeros', 'Destreza y ergonomía', 'Múltiplo: 5 pares / Caja: 100 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_argoneros.png',
    colores: [{ nombre: 'Amarillo Ocre', hex: '#ca8a04' }],
    precios: {},
    precioDirecto: 56.90,
    empaque: '5 pares / Caja 100 pares'
  },
  {
    id: 'epc-guantes-electricista',
    sku: 'GEL-ELE',
    nombre: 'Guantes Electricista',
    categoria: 'manos',
    subtitulo: 'Piel con Puño Carnaza/Lona Reforzado',
    descripcion: 'Guante de piel para electricista y mantenimiento general con palma suave y dorso con puño protector para trabajos con cableado y conexiones.',
    composicion: 'Piel Genuina + Puño de Lona',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Resistencia dieléctrica', 'Sensibilidad táctil', 'Ligeros', 'Destreza y ergonomía', 'Múltiplo: 5 pares / Caja: 100 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_electricista.png',
    colores: [{ nombre: 'Amarillo / Blanco', hex: '#ca8a04' }],
    precios: {},
    precioDirecto: 54.90,
    empaque: '5 pares / Caja 100 pares'
  },
  {
    id: 'epc-guantes-carnaza-corto',
    sku: 'GCAR-COR',
    nombre: 'Guante de Carnaza Corto',
    categoria: 'manos',
    subtitulo: 'Carnaza de Res Calibre Pesado · Trabajo Rudo',
    descripcion: 'Guante de carnaza corto para manejo de materiales abrasivos, construcción, herrería y maniobras generales en almacenes.',
    composicion: 'Carnaza de Res de Primera Calidad',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Contra abrasión', 'Útil para tareas con chispas', 'Sensibilidad táctil', 'No lavable en agua', 'Múltiplo: 5 pares / Caja: 100 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_carnaza_corto.png',
    colores: [{ nombre: 'Naranja Óxido', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 38.90,
    empaque: '5 pares / Caja 100 pares'
  },
  {
    id: 'epc-guantes-carnaza-largo',
    sku: 'GCAR-LAR',
    nombre: 'Guantes de Carnaza Largo',
    categoria: 'manos',
    subtitulo: 'Manga Larga de Protección de Antebrazo · Soldadura',
    descripcion: 'Guante de carnaza con manga larga extendida para proteger antebrazo y muñeca contra chispas, escorias y rebabas calientes.',
    composicion: 'Carnaza de Res Curtida',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Manga extendida', 'Contra abrasión', 'Útil para chispas', 'No lavable en agua', 'Múltiplo: 5 pares / Caja: 100 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_carnaza_largo.png',
    colores: [{ nombre: 'Naranja Óxido', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 39.90,
    empaque: '5 pares / Caja 100 pares'
  },
  {
    id: 'epc-guantes-operador',
    sku: 'GOP-OPE',
    nombre: 'Guante de Operador',
    categoria: 'manos',
    subtitulo: 'Piel Suave de Conducción y Manejo de Maquinaria',
    descripcion: 'Guante de piel de operador con costuras internas finas y elástico de ajuste en dorso. Diseñado para choferes, operadores de montacargas y maquinaria.',
    composicion: 'Piel Flor Natural',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Ideal para maniobrar equipos', 'Sensibilidad táctil', 'Costuras internas finas', 'Múltiplo: 5 pares / Caja: 100 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_operador.png',
    colores: [{ nombre: 'Amarillo Mostaza', hex: '#d97706' }],
    precios: {},
    precioDirecto: 42.90,
    empaque: '5 pares / Caja 100 pares'
  },
  {
    id: 'epc-guantes-toalla-terry',
    sku: 'GTO-TER',
    nombre: 'Guantes Toalla Terry',
    categoria: 'manos',
    subtitulo: 'Tejido Toalla Absorbente · Aislamiento Térmico Moderado',
    descripcion: 'Guante tejido en rizo de toalla de algodón. Absorbe humedad, aceites y brinda protección térmica moderada para panaderías y fundiciones ligeras.',
    composicion: '100% Algodón Rizo Toalla',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Aislante térmico moderado', 'Absorbente de líquidos', 'Mantenimiento y limpieza', 'Múltiplo: 12 pares / Caja: 120 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_toalla_terry.png',
    colores: [{ nombre: 'Crudo / Blanco', hex: '#f8fafc' }],
    precios: {},
    precioDirecto: 24.90,
    empaque: '12 pares / Caja 120 pares'
  },
  {
    id: 'epc-guantes-japones-algodon',
    sku: 'GJP-ALG',
    nombre: 'Guante Japonés 100% Algodón',
    categoria: 'manos',
    subtitulo: 'Tejido de Punto Sin Costuras · Disponible en 40g y 60g',
    descripcion: 'Guante japonés 100% algodón tejido sin costuras. Fresco, transpirable y económico para empaque, almacén y labores generales.',
    composicion: '100% Algodón Natural',
    gramaje: '40g / 60g',
    tallas: ['Unitalla'],
    detalles: ['100% algodón', 'Gran adherencia en seco', 'Flexibilidad', '40g $8.90 / 60g $9.90', 'Múltiplo: 12 pares / Caja: 300 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_japones_algodon.png',
    colores: [
      { nombre: 'Blanco', hex: '#ffffff' },
      { nombre: 'Gris Jaspe', hex: '#94a3b8' }
    ],
    precios: {},
    precioDirecto: 8.90,
    empaque: '12 pares / Caja 300 pares'
  },
  {
    id: 'epc-guantes-japones-pvc',
    sku: 'GJP-PVC',
    nombre: 'Guantes Japonés con Puntos PVC',
    categoria: 'manos',
    subtitulo: 'Puntos de PVC Antiderrapantes en Palma · Agarre Firme',
    descripcion: 'Guante japonés tejido de algodón con puntos de PVC en una cara para maximizar el agarre en cajas, herramientas y piezas lisas.',
    composicion: 'Algodón/Poliéster + Puntos de PVC',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Puntos PVC antiderrapantes', 'Gran adherencia en seco', 'Absorbe sudor y refresca', 'Múltiplo: 12 pares / Caja: 300 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_japones_pvc.png',
    colores: [{ nombre: 'Blanco / Puntos Negros', hex: '#ffffff' }],
    precios: {},
    precioDirecto: 13.90,
    empaque: '12 pares / Caja 300 pares'
  },
  {
    id: 'epc-guantes-chino-doble-palma',
    sku: 'GCH-DOB',
    nombre: 'Guante Chino Doble Palma',
    categoria: 'manos',
    subtitulo: 'Refuerzo Doble en Palma · Trabajo Rudo y Construcción',
    descripcion: 'Guante textil con refuerzo de doble lona en palma para trabajos con fricción constante, cargamentos pesados y minería.',
    composicion: 'Algodón Reforzado + Doble Palma',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Refuerzo doble en palma', 'Cómodo y ergonómico', 'Resistencia a corrosión y desgaste', 'Múltiplo: 12 pares / Caja: 120 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_chino_doble_palma.png',
    colores: [{ nombre: 'Gris / Rayas', hex: '#64748b' }],
    precios: {},
    precioDirecto: 38.90,
    empaque: '12 pares / Caja 120 pares'
  },
  {
    id: 'epc-guantes-nitrilo-lona',
    sku: 'GNT-LON',
    nombre: 'Guantes Nitrilo Puño de Lona',
    categoria: 'manos',
    subtitulo: 'Baño Completo Nitrilo Azul + Puño Rígido de Seguridad',
    descripcion: 'Guante con recubrimiento pesado de nitrilo azul sobre soporte de algodón y puño de lona de seguridad para descalce rápido.',
    composicion: 'Algodón Pesado + Baño Nitrilo + Puño Lona',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Ajuste firme', 'Gran adherencia en seco', 'Repele líquidos y aceites', 'Múltiplo: 12 pares / Caja: 144 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_nitrilo_lona.png',
    colores: [{ nombre: 'Azul / Blanco', hex: '#2563eb' }],
    precios: {},
    precioDirecto: 36.90,
    empaque: '12 pares / Caja 144 pares'
  },
  {
    id: 'epc-guantes-nitrilo-elastico',
    sku: 'GNT-ELA',
    nombre: 'Guante Nitrilo Puño Elástico',
    categoria: 'manos',
    subtitulo: 'Baño Completo Nitrilo Azul + Puño Tejido Ajustable',
    descripcion: 'Guante bañado en nitrilo azul con puño tejido elástico tipo calcetín que impide la entrada de rebabas y polvo al interior de la mano.',
    composicion: 'Soporte Textil + Baño de Nitrilo + Puño Tejido',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Elástico tipo ribete', 'Gran adherencia en seco', 'Repele líquidos y aceites', 'Múltiplo: 12 pares / Caja: 144 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_nitrilo_elastico.png',
    colores: [{ nombre: 'Azul', hex: '#2563eb' }],
    precios: {},
    precioDirecto: 36.90,
    empaque: '12 pares / Caja 144 pares'
  },
  {
    id: 'epc-guantes-nitrilo-desechable',
    sku: 'GNT-DES',
    nombre: 'Guantes Nitrilo Desechable',
    categoria: 'manos',
    subtitulo: '100% Nitrilo Sintético Libre de Polvo · Grado Médico/Alimentos',
    descripcion: 'Guantes de examen desechables en 100% nitrilo azul. Libres de látex y polvo, ideales para laboratorios, alimentos, salud y cosmética.',
    composicion: '100% Nitrilo Sintético Grado Médico',
    gramaje: 'Dispenser 100 pares',
    tallas: ['7', '8', '9', '10'],
    detalles: ['Sensibilidad táctil', 'Ligeros', '100% nitrilo sintético', 'Múltiplo: 100 pares (Dispenser) / Caja: 1,000 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_nitrilo_desechable.png',
    colores: [{ nombre: 'Azul Cobalto', hex: '#1d4ed8' }],
    precios: {},
    precioDirecto: 95.90,
    empaque: '100 pares / Caja 1,000 pares'
  },
  {
    id: 'epc-guantes-nitrilo-solvex',
    sku: 'GNT-SLV',
    nombre: 'Guante Nitrilo Verde Tipo Solvex',
    categoria: 'manos',
    subtitulo: 'Resistente a Químicos y Solventes · Relieve Antiderrapante',
    descripcion: 'Guante de nitrilo verde no soportado para manejo seguro de químicos agresivos, solventes, desengrasantes y ácidos diluidos.',
    composicion: 'Nitrilo Sintético Resistente a Solventes',
    gramaje: 'Par',
    tallas: ['7', '8', '9', '10'],
    detalles: ['Resistencia a solventes', 'Gran adherencia en seco y mojado', 'Repele químicos y aceites', 'Múltiplo: 12 pares / Caja: 144 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_nitrilo_solvex.png',
    colores: [{ nombre: 'Verde', hex: '#16a34a' }],
    precios: {},
    precioDirecto: 24.90,
    empaque: '12 pares / Caja 144 pares'
  },
  {
    id: 'epc-guantes-acidos',
    sku: 'GNT-ACID',
    nombre: 'Guantes Contra Ácidos 18"',
    categoria: 'manos',
    subtitulo: 'Largo 18 Pulgadas (45 cm) · Protección Química Pesada',
    descripcion: 'Guante largo de 18 pulgadas (45 cm) para inmersión y manejo de ácidos, sustancias alcalinas y compuestos corrosivos en laboratorios e industria química.',
    composicion: 'Neopreno / Látex Pesado Resistente a Ácidos',
    gramaje: 'Par 18"',
    tallas: ['Unitalla'],
    detalles: ['Largo extendido 18"', 'Químico resistente', 'Impermeable', 'Múltiplo: 12 pares / Caja: 144 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_acidos.png',
    colores: [{ nombre: 'Negro', hex: '#0f172a' }],
    precios: {},
    precioDirecto: 79.90,
    empaque: '12 pares / Caja 144 pares'
  },
  {
    id: 'epc-guantes-soldador-kevlar',
    sku: 'GSOL-KEV',
    nombre: 'Guante Soldador con Hilo Kevlar',
    categoria: 'manos',
    subtitulo: 'Costuras con Hilo Kevlar® Ignífugo · Forro Térmico Interior',
    descripcion: 'Guante para soldadura pesada con forro interior térmico y costuras reforzadas con auténtico hilo Kevlar® resistente a chispas y calor extremo.',
    composicion: 'Carnaza Premium + Hilo Kevlar® + Forro Aislante Térmico',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Protección mecánica EN 388', 'Costura con Kevlar®', 'Aislante térmico interno', 'Rojos $61.90 / Azules $64.90', 'Múltiplo: 6 pares / Caja: 72 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/guantes_soldador_kevlar.png',
    colores: [
      { nombre: 'Rojo', hex: '#dc2626' },
      { nombre: 'Azul', hex: '#2563eb' }
    ],
    precios: {},
    precioDirecto: 61.90,
    empaque: '6 pares / Caja 72 pares'
  },

  // --- 21-22: CALZADO DE SEGURIDAD Y PROTECCIÓN ---
  {
    id: 'calzado-bota-industrial',
    sku: 'BOT-IND',
    nombre: 'Bota Industrial',
    categoria: 'calzado',
    subtitulo: 'Piel Vacuno · Casquillo de Protección · Suela Antiderrapante',
    descripcion: 'Bota de trabajo industrial con casquillo de protección contra impactos, piel de ganado vacuno, suela antiderrapante y resistencia química.',
    composicion: 'Piel Ganado Vacuno + Suela Resistente',
    gramaje: 'Calzado',
    tallas: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Protección contra impactos', 'Suela antiderrapante', 'Resistencia química', 'Flexión hasta 200%', 'Múltiplo: 5 pares / Caja: 28 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/bota_industrial.png',
    colores: [{ nombre: 'Negro', hex: '#0f172a' }],
    precios: {},
    precioDirecto: 349.90,
    empaque: '5 pares / Caja 28 pares'
  },
  {
    id: 'calzado-bota-roper',
    sku: 'BOT-ROP',
    nombre: 'Bota Roper de Seguridad',
    categoria: 'calzado',
    subtitulo: 'Estilo Roper sin Agujetas · Casquillo · Suela Tractora',
    descripcion: 'Bota estilo Roper de descalce rápido con casquillo de seguridad y suela tractora de alta resistencia a aceites y químicos.',
    composicion: 'Piel Genuina de Res + Suela Todo Terreno',
    gramaje: 'Calzado',
    tallas: ['26', '27', '28', '29', '30'],
    detalles: ['Suela resistente', 'Impermeable', 'Repele líquidos y aceites', 'Múltiplo: 5 pares / Caja: 19 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/bota_roper.png',
    colores: [{ nombre: 'Negro', hex: '#0f172a' }],
    precios: {},
    precioDirecto: 549.90,
    empaque: '5 pares / Caja 19 pares'
  },
  {
    id: 'epc-rodilleras-capsula',
    sku: 'ROD-CAP',
    nombre: 'Rodilleras Cápsula de Policarbonato',
    categoria: 'ropa-trabajo',
    subtitulo: 'Cápsula Rígida · Interior Acolchado · Ergonómicas',
    descripcion: 'Rodilleras con cápsula rígida de policarbonato e interior acolchado. Brindan mayor movilidad al flexionar y máxima absorción de impacto.',
    composicion: 'Policarbonato Rígido + Espuma EVA Acolchada',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Mayor movilidad al flexionar', 'Interior acolchado', 'Diseño ergonómico', 'Múltiplo: 5 pares / Caja: 50 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/rodilleras_capsula.png',
    colores: [{ nombre: 'Negro / Blanco', hex: '#1e293b' }],
    precios: {},
    precioDirecto: 149.00,
    empaque: '5 pares / Caja 50 pares'
  },
  {
    id: 'epc-polaina-carnaza',
    sku: 'POL-CAR',
    nombre: 'Polaina de Carnaza Barlem Protec',
    categoria: 'ropa-trabajo',
    subtitulo: 'Protección contra Chispas, Calor y Abrasión',
    descripcion: 'Polaina de carnaza curtida para protección de empeine, tobillo y pierna en trabajos de soldadura y fundición.',
    composicion: 'Carnaza de Res Genuina',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Contra abrasión', 'Útil para tareas con chispas', 'No lavable en agua', 'Múltiplo: 5 pares / Caja: 50 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/polaina_carnaza.png',
    colores: [{ nombre: 'Amarillo Ocre', hex: '#ca8a04' }],
    precios: {},
    precioDirecto: 84.90,
    empaque: '5 pares / Caja 50 pares'
  },

  // --- 23-34: ROPA DE TRABAJO / UNIFORMES ---
  {
    id: 'epc-chaleco-malla',
    sku: 'CHAL-MAL',
    nombre: 'Chaleco de Malla',
    categoria: 'ropa-trabajo',
    subtitulo: 'Malla Transpirable · Franjas Reflejantes · Colores Fluorescentes',
    descripcion: 'Chaleco de seguridad en malla ligera y transpirable con franjas reflejantes. Máxima ventilación y visibilidad.',
    composicion: '100% Poliéster Malla',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Malla transpirable', 'Franjas reflejantes', 'Colores fluorescentes', 'Múltiplo: 25 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_malla.png',
    colores: [
      { nombre: 'Naranja Neón', hex: '#ea580c' },
      { nombre: 'Amarillo Neón', hex: '#eab308' },
      { nombre: 'Verde Neón', hex: '#22c55e' },
      { nombre: 'Azul', hex: '#2563eb' }
    ],
    precios: {},
    precioDirecto: 44.90,
    empaque: '25 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-clase2',
    sku: 'CHAL-CL2',
    nombre: 'Chaleco Clase 2',
    categoria: 'ropa-trabajo',
    subtitulo: 'Norma Clase 2 · Cinta Reflejante 2 Pulgadas',
    descripcion: 'Chaleco de alta visibilidad certificado bajo norma de seguridad Clase 2 con franjas reflejantes de 2 pulgadas.',
    composicion: 'Poliéster de Alta Visibilidad',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Malla transpirable', 'Franjas reflejantes 2"', 'Colores fluorescentes', 'Múltiplo: 10 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_clase2.png',
    colores: [
      { nombre: 'Verde Neón', hex: '#22c55e' },
      { nombre: 'Naranja Neón', hex: '#ea580c' },
      { nombre: 'Azul Turquesa', hex: '#7EA9CD' }
    ],
    precios: {},
    precioDirecto: 44.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-clase2-bolsas',
    sku: 'CHAL-CL2B',
    nombre: 'Chaleco Clase 2 con Bolsas',
    categoria: 'ropa-trabajo',
    subtitulo: 'Norma Clase 2 · Múltiples Bolsillos Frontales Portaherramientas',
    descripcion: 'Chaleco de alta visibilidad Clase 2 equipado con bolsas frontales para libreta, plumas y celular.',
    composicion: 'Poliéster Fluorescente con Bolsas Reforzadas',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Bolsas frontales funcionales', 'Franjas reflejantes', 'Colores fluorescentes', 'Múltiplo: 10 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_clase2_bolsas.png',
    colores: [
      { nombre: 'Naranja Neón', hex: '#ea580c' },
      { nombre: 'Verde Neón', hex: '#22c55e' }
    ],
    precios: {},
    precioDirecto: 55.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-poliester-premium',
    sku: 'CHAL-PREM',
    nombre: 'Chaleco Poliéster Premium',
    categoria: 'ropa-trabajo',
    subtitulo: 'Tela Poliéster Alta Densidad · Acabados Reforzados',
    descripcion: 'Chaleco de trabajo de confección reforzada con ribete perimetral, franjas reflejantes y bolsas de carga.',
    composicion: '100% Poliéster Premium',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Tela premium resistente', 'Franjas reflejantes alta visibilidad', 'Colores fluorescentes', 'Múltiplo: 10 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_poliester_premium.png',
    colores: [
      { nombre: 'Verde Neón', hex: '#22c55e' },
      { nombre: 'Naranja Neón', hex: '#ea580c' }
    ],
    precios: {},
    precioDirecto: 84.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-sport-malla',
    sku: 'CHAL-SPT',
    nombre: 'Chaleco Sport de Malla',
    categoria: 'ropa-trabajo',
    subtitulo: 'Corte Anatómico Sport · Malla Ligera y Fresca',
    descripcion: 'Chaleco con corte deportivo en V que brinda máxima soltura de movimiento y visibilidad en faenas viales y deportivas.',
    composicion: 'Poliéster Malla Sport',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Malla transpirable', 'Franjas reflejantes', 'Colores fluorescentes', 'Múltiplo: 10 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_sport_malla.png',
    colores: [
      { nombre: 'Naranja / Amarillo', hex: '#ea580c' },
      { nombre: 'Verde / Amarillo', hex: '#22c55e' }
    ],
    precios: {},
    precioDirecto: 89.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-malla-led',
    sku: 'CHAL-LED',
    nombre: 'Chaleco de Malla con Luz LED',
    categoria: 'ropa-trabajo',
    subtitulo: 'Luces LED Integradas Intermitentes · Máxima Visibilidad Nocturna',
    descripcion: 'Chaleco de seguridad con sistema de iluminación LED intermitente activo, recargable o con batería para trabajos nocturnos y carreteras.',
    composicion: 'Malla Poliéster + Sistema LED con Batería',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Leds intermitentes alta potencia', 'Malla transpirable', 'Colores fluorescentes', 'Múltiplo: 5 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_malla_led.png',
    colores: [
      { nombre: 'Verde Neón', hex: '#22c55e' },
      { nombre: 'Naranja Neón', hex: '#ea580c' }
    ],
    precios: {},
    precioDirecto: 194.00,
    empaque: '5 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-rescatista',
    sku: 'CHAL-RESC',
    nombre: 'Chaleco Rescatista Desprendible',
    categoria: 'ropa-trabajo',
    subtitulo: 'Sistema de 5 Puntos Desprendibles Anti-Atrapamiento',
    descripcion: 'Chaleco con cierres de velcro desprendibles en hombros y costados para evitar atrapamientos en maquinaria en movimiento.',
    composicion: 'Poliéster con Cierres de Velcro Desprendibles',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['5 puntos desprendibles', 'Franjas reflejantes en X', 'Colores fluorescentes', 'Múltiplo: 10 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_rescatista.png',
    colores: [
      { nombre: 'Azul Marino / Verde', hex: '#1e3a8a' },
      { nombre: 'Naranja Neón', hex: '#ea580c' }
    ],
    precios: {},
    precioDirecto: 102.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-cazador',
    sku: 'CHAL-CAZ',
    nombre: 'Chaleco Cazador',
    categoria: 'ropa-trabajo',
    subtitulo: 'Confección Gabardina · Múltiples Bolsillos Fuelle de Carga',
    descripcion: 'Chaleco tipo cazador con bolsas de fuelle de gran capacidad, portacredencial y franjas reflejantes.',
    composicion: 'Gabardina de Alta Resistencia',
    gramaje: 'Multitalla',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL', 'XXXL'],
    detalles: ['Bolsas fuelle con broche', 'Franjas reflejantes', 'Tela gabardina pesada', 'Múltiplo: 5 pz / Caja: 50 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_cazador.png',
    colores: [
      { nombre: 'Naranja', hex: '#ea580c' },
      { nombre: 'Azul Marino', hex: '#1e3a8a' },
      { nombre: 'Negro', hex: '#0f172a' }
    ],
    precios: {},
    precioDirecto: 355.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-chaleco-brigadista-premium',
    sku: 'CHAL-BRP',
    nombre: 'Chaleco Brigadista Premium',
    categoria: 'ropa-trabajo',
    subtitulo: 'Gabardina 100% Algodón · Porta Radio, Celular y Credencial',
    descripcion: 'Chaleco brigadista de alta gama fabricado en gabardina 100% algodón con franja reflejante de 2 pulgadas y compartimentos organizadores.',
    composicion: '100% Gabardina de Algodón',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Porta radio y celular', 'Portacredencial transparente', 'Franja reflejante 2"', 'Múltiplo: 10 pz / Caja: 50 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_brigadista_premium.png',
    colores: [
      { nombre: 'Azul Marino', hex: '#142236' },
      { nombre: 'Rojo', hex: '#dc2626' },
      { nombre: 'Naranja', hex: '#ea580c' },
      { nombre: 'Verde', hex: '#16a34a' },
      { nombre: 'Amarillo', hex: '#eab308' },
      { nombre: 'Negro', hex: '#0f172a' }
    ],
    precios: {},
    precioDirecto: 147.90,
    empaque: '10 pz / Caja 50 pz'
  },
  {
    id: 'epc-chaleco-brigadista-std',
    sku: 'CHAL-BRS',
    nombre: 'Chaleco Brigadista Estándar',
    categoria: 'ropa-trabajo',
    subtitulo: 'Poliéster / Algodón · Bolsillos Radio/Plumas · Reflejante',
    descripcion: 'Chaleco brigadista estándar con bolsillos para radio y plumas, y franjas reflejantes de alta visibilidad.',
    composicion: 'Poliéster / Algodón',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Bolsillos radio/plumas', 'Franjas reflejantes alta visibilidad', 'Funcional y cómodo', 'Múltiplo: 10 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_brigadista_std.png',
    colores: [
      { nombre: 'Naranja', hex: '#ea580c' },
      { nombre: 'Azul Marino', hex: '#142236' },
      { nombre: 'Rojo', hex: '#dc2626' },
      { nombre: 'Verde', hex: '#16a34a' }
    ],
    precios: {},
    precioDirecto: 139.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-ligero-malla',
    sku: 'CHAL-LME',
    nombre: 'Chaleco Ligero Espalda de Malla',
    categoria: 'ropa-trabajo',
    subtitulo: 'Frente con Bolsas · Espalda Malla para Ventilación',
    descripcion: 'Chaleco ligero con frente cerrado con bolsas y espalda en malla para ventilación. Diseño funcional para campo.',
    composicion: 'Poliéster / Malla',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Frente con bolsas', 'Espalda en malla fresca', 'Ventilación trasera', 'Múltiplo: 10 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_ligero_malla.png',
    colores: [
      { nombre: 'Verde Neón', hex: '#22c55e' },
      { nombre: 'Naranja Neón', hex: '#ea580c' }
    ],
    precios: {},
    precioDirecto: 139.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-regio',
    sku: 'CHAL-REG',
    nombre: 'Chaleco Regio',
    categoria: 'ropa-trabajo',
    subtitulo: 'Estilo Institucional · Acabados Premium · Supervisores',
    descripcion: 'Chaleco Regio de estilo institucional con acabados de alta calidad. Ideal para supervisores, ejecutivos y personal de campo.',
    composicion: 'Poliéster de Alta Densidad',
    gramaje: 'Multitalla',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL', 'XXXL'],
    detalles: ['Estilo institucional', 'Acabados de alta calidad', 'Múltiples bolsillos', 'Múltiplo: 5 pz / Caja: 50 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/chaleco_regio.png',
    colores: [
      { nombre: 'Naranja / Plata', hex: '#ea580c' },
      { nombre: 'Azul Marino / Plata', hex: '#1e3a8a' },
      { nombre: 'Negro / Plata', hex: '#0f172a' }
    ],
    precios: {},
    precioDirecto: 275.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-overol-laminado',
    sku: 'OVER-LAM',
    nombre: 'Overol Laminado Desechable',
    categoria: 'ropa-trabajo',
    subtitulo: 'Impermeable · Protección Química · Zipper con Solapa',
    descripcion: 'Overol laminado impermeable con protección contra salpicaduras químicas y cierre zipper con solapa de seguridad.',
    composicion: 'Polipropileno Laminado Microporoso',
    gramaje: 'Talla Completa',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL', 'XXXL'],
    detalles: ['Impermeable', 'Protección salpicaduras químicas', 'Zipper con solapa', 'Múltiplo: 10 pz / Caja: 50 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/overol_laminado.png',
    colores: [{ nombre: 'Blanco', hex: '#ffffff' }],
    precios: {},
    precioDirecto: 72.90,
    empaque: '10 pz / Caja 50 pz'
  },
  {
    id: 'epc-overol-gabardina',
    sku: 'OVER-GAB',
    nombre: 'Overol Gabardina con Reflejante',
    categoria: 'ropa-trabajo',
    subtitulo: 'Gabardina Industrial · Franjas Reflejantes · 6 Bolsillos',
    descripcion: 'Overol de gabardina industrial con bolsillos funcionales y franjas reflejantes. Para trabajo pesado en campo, talleres y plataformas.',
    composicion: 'Gabardina 65/35 Poliéster/Algodón',
    gramaje: 'Industrial',
    tallas: ['36', '38', '40', '42', '44', '46'],
    detalles: ['Gabardina industrial pesada', 'Bolsillos funcionales', 'Franjas reflejantes', 'Múltiplo: 5 pz / Caja: 50 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/overol_gabardina.png',
    colores: [
      { nombre: 'Naranja Industrial', hex: '#ea580c' },
      { nombre: 'Azul Marino', hex: '#1e3a8a' }
    ],
    precios: {},
    precioDirecto: 489.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-elastico-carrillero',
    sku: 'ELA-CAR',
    nombre: 'Elástico Carrillero Reflejante',
    categoria: 'ropa-trabajo',
    subtitulo: 'Banda Elástica Reflejante 360° · Ajustable a Cualquier Talla',
    descripcion: 'Tirante elástico tipo carrillero con bandas reflejantes de alta visibilidad 360°. Ajustable para colocarse sobre cualquier prenda de trabajo o ciclismo.',
    composicion: 'Banda Elástica de Poliéster + Franja Reflejante',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Banda reflejante 360°', 'Ajustable a diferentes tallas', 'Colores fluorescentes', 'Múltiplo: 12 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/elastico_carrillero.png',
    colores: [
      { nombre: 'Verde Neón', hex: '#22c55e' },
      { nombre: 'Naranja Neón', hex: '#ea580c' }
    ],
    precios: {},
    precioDirecto: 63.90,
    empaque: '12 pz / Caja 100 pz'
  },
  {
    id: 'epc-faja-lumbar',
    sku: 'FAJA-LUM',
    nombre: 'Faja Lumbar 3er Cinto',
    categoria: 'ropa-trabajo',
    subtitulo: 'Tercer Cinto Reforzado · Varillas Flexibles · Tirantes',
    descripcion: 'Faja lumbar con tercer cinto de ajuste doble y tirantes reforzados para máximo soporte lumbar en jornadas de carga pesada.',
    composicion: 'Malla Elástica Transpirable + Varillas de Policarbonato',
    gramaje: 'Soporte Lumbar',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL'],
    detalles: ['Cinto de ajuste doble', 'Tirantes reforzados', 'Soporte lumbar ergonómico', 'Múltiplo: 5 pz / Caja: 50 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/faja_lumbar.png',
    colores: [{ nombre: 'Negro', hex: '#0f172a' }],
    precios: {},
    precioDirecto: 169.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-yompa-mezclilla',
    sku: 'YOM-MEZ',
    nombre: 'Yompa de Mezclilla 14oz',
    categoria: 'ropa-trabajo',
    subtitulo: '100% Algodón 14oz · Costuras Reforzadas · Botones de Uso Rudo',
    descripcion: 'Chamarra de trabajo tipo Yompa confeccionada en mezclilla pesada de 14 onzas de puro algodón. Botones metálicos de uso repetitivo y costuras triples.',
    composicion: '100% Algodón Mezclilla 14oz',
    gramaje: '14 oz',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL'],
    detalles: ['Botones resistentes a uso repetitivo', 'Tela algodón 14oz pesada', 'Costuras reforzadas', 'Múltiplo: 5 pz / Caja: 20 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/yompa_mezclilla.png',
    colores: [{ nombre: 'Azul Mezclilla', hex: '#1d4ed8' }],
    precios: {},
    precioDirecto: 195.00,
    empaque: '5 pz / Caja 20 pz'
  },
  {
    id: 'epc-camisa-mezclilla',
    sku: 'CAM-MEZ',
    nombre: 'Camisa de Mezclilla Industrial',
    categoria: 'ropa-trabajo',
    subtitulo: '100% Algodón · Disponible con o sin Franja Reflejante',
    descripcion: 'Camisa de mezclilla industrial de algodón resistente con botones metálicos y bolsillos funcionales. Disponible con o sin franja reflejante.',
    composicion: '100% Algodón Mezclilla',
    gramaje: 'Industrial',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL', 'XXXL'],
    detalles: ['Algodón resistente', 'Bolsillos funcionales', 'Sin reflejante $325.00 / Con reflejante $379.90', 'Múltiplo: 5 pz / Caja: 20 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/camisa_mezclilla.png',
    colores: [{ nombre: 'Azul Mezclilla', hex: '#1d4ed8' }],
    precios: {},
    precioDirecto: 325.00,
    empaque: '5 pz / Caja 20 pz'
  },
  {
    id: 'epc-pantalon-mezclilla',
    sku: 'PAN-MEZ',
    nombre: 'Pantalón de Mezclilla Industrial',
    categoria: 'ropa-trabajo',
    subtitulo: 'Corte Recto · Costuras Triples · Con/Sin Reflejante',
    descripcion: 'Pantalón de mezclilla industrial para uso rudo con remaches en puntos de tensión. Disponible con o sin franja reflejante en piernas.',
    composicion: '100% Algodón Mezclilla Industrial',
    gramaje: 'Industrial',
    tallas: ['28', '30', '32', '34', '36', '38', '40', '42'],
    detalles: ['Mezclilla industrial', 'Costuras reforzadas', 'Sin reflejante $284.90 / Con reflejante $349.90', 'Múltiplo: 12 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/pantalon_mezclilla.png',
    colores: [{ nombre: 'Azul Mezclilla', hex: '#1d4ed8' }],
    precios: {},
    precioDirecto: 284.90,
    empaque: '12 pz / Caja 100 pz'
  },
  {
    id: 'epc-mandil-mezclilla',
    sku: 'MAN-MEZ',
    nombre: 'Mandil de Mezclilla',
    categoria: 'ropa-trabajo',
    subtitulo: 'Protección contra Suciedad y Salpicaduras · Con/Sin Bolsa',
    descripcion: 'Mandil de mezclilla lavable para protección en tornos, carpintería, herrería y talleres. Disponible con o sin bolsa frontal.',
    composicion: '100% Algodón Mezclilla',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Protección salpicaduras', 'Fácil de lavar', 'Sin bolsa $79.90 / Con bolsa $89.90', 'Múltiplo: 5 pz / Caja: 50 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/mandil_mezclilla.png',
    colores: [{ nombre: 'Azul Mezclilla', hex: '#1d4ed8' }],
    precios: {},
    precioDirecto: 79.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-manga-mezclilla',
    sku: 'MGA-MEZ',
    nombre: 'Manga de Mezclilla',
    categoria: 'ropa-trabajo',
    subtitulo: 'Protección de Brazos contra Salpicaduras y Suciedad',
    descripcion: 'Mangas de mezclilla con elástico de ajuste en ambos extremos para protección de brazos contra fricción y rebabas.',
    composicion: '100% Algodón Mezclilla',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Ajuste en cada extremo', 'Protección contra salpicaduras', 'Costuras reforzadas', 'Múltiplo: 10 pares / Caja: 50 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/manga_mezclilla.png',
    colores: [{ nombre: 'Azul Mezclilla', hex: '#1d4ed8' }],
    precios: {},
    precioDirecto: 26.80,
    empaque: '10 pares / Caja 50 pares'
  },
  {
    id: 'epc-mandil-carnaza-50x80',
    sku: 'MAN-CAR-5080',
    nombre: 'Mandil de Carnaza 50×80 cm',
    categoria: 'ropa-trabajo',
    subtitulo: 'Carnaza de Res para Soldador y Herrería · 50×80 cm',
    descripcion: 'Mandil de carnaza curtida de 50 cm de ancho por 80 cm de largo con tirantes ajustables para soldadura y fundición.',
    composicion: 'Carnaza de Res de Primera',
    gramaje: '50×80 cm',
    tallas: ['Unitalla'],
    detalles: ['Contra abrasión', 'Útil para chispas de soldadura', 'No lavable en agua', 'Múltiplo: 5 pz / Caja: 50 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/mandil_carnaza_50x80.png',
    colores: [{ nombre: 'Amarillo Ocre', hex: '#ca8a04' }],
    precios: {},
    precioDirecto: 94.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-mandil-carnaza-60x95',
    sku: 'MAN-CAR-6095',
    nombre: 'Mandil de Carnaza 60×95 cm',
    categoria: 'ropa-trabajo',
    subtitulo: 'Máxima Cobertura 60×95 cm · Trabajo Pesado en Herrería',
    descripcion: 'Mandil de carnaza de gran formato 60 cm de ancho por 95 cm de largo para cobertura extendida hasta las rodillas.',
    composicion: 'Carnaza de Res Pesada',
    gramaje: '60×95 cm',
    tallas: ['Unitalla'],
    detalles: ['Gran formato 60×95 cm', 'Contra abrasión y calor', 'No lavable en agua', 'Múltiplo: 5 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/mandil_carnaza_60x95.png',
    colores: [{ nombre: 'Amarillo Ocre', hex: '#ca8a04' }],
    precios: {},
    precioDirecto: 114.90,
    empaque: '5 pz / Caja 100 pz'
  },
  {
    id: 'epc-manga-carnaza',
    sku: 'MAN-CAR',
    nombre: 'Mangas de Carnaza',
    categoria: 'ropa-trabajo',
    subtitulo: 'Resistencia a Chispas y Calor Radiante para Soldador',
    descripcion: 'Mangas de carnaza resistentes a chispas y calor para soldadura. Cintas de amarre y ajuste en hombro.',
    composicion: 'Carnaza de Res Curtida',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Resistentes a chispas', 'Resistentes al calor', 'No lavables en agua', 'Múltiplo: 5 pares / Caja: 50 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/manga_carnaza.png',
    colores: [{ nombre: 'Naranja Óxido', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 84.90,
    empaque: '5 pares / Caja 50 pares'
  },
  {
    id: 'epc-manga-anticorte',
    sku: 'MAN-AC',
    nombre: 'Manga Anticorte Nivel 5',
    categoria: 'ropa-trabajo',
    subtitulo: 'Fibra HPPE Nivel 5 (A5) con Ojillo para Dedo Pulgar',
    descripcion: 'Manga de protección anticorte Nivel 5 para brazos con inserto para el dedo pulgar que evita que la manga se deslice.',
    composicion: 'HPPE / Fibra Anticorte Nivel 5',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Resistencia corte Nivel 5', 'Ajuste en cada extremo', 'Costuras reforzadas', 'Múltiplo: 12 pares / Caja: 120 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/manga_anticorte.png',
    colores: [{ nombre: 'Gris', hex: '#64748b' }],
    precios: {},
    precioDirecto: 98.90,
    empaque: '12 pares / Caja 120 pares'
  },
  {
    id: 'epc-impermeable-gabardina',
    sku: 'IMP-GAB',
    nombre: 'Impermeable Tipo Gabardina',
    categoria: 'ropa-trabajo',
    subtitulo: '100% Impermeable PVC/Poliéster · Zipper con Solapa',
    descripcion: 'Impermeable estilo gabardina larga con cierre zipper protegido por solapa y broches de presión. Franjas reflejantes de seguridad.',
    composicion: 'PVC / Poliéster Impermeable',
    gramaje: 'Impermeable',
    tallas: ['M', 'XL'],
    detalles: ['100% impermeable', 'Zipper con solapa de seguridad', 'Franja reflejante', 'Múltiplo: 1 pz / Caja: 20 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/impermeable_gabardina.png',
    colores: [{ nombre: 'Amarillo Tráfico', hex: '#eab308' }],
    precios: {},
    precioDirecto: 139.00,
    empaque: '1 pz / Caja 20 pz'
  },

  // --- 35-36: PROTECCIÓN A LAS ALTURAS ---
  {
    id: 'epc-arnes-1aro',
    sku: 'ARN-1A',
    nombre: 'Arnés Cuerpo Completo 1 Aro',
    categoria: 'alturas',
    subtitulo: 'Resistencia hasta 5,000 lbs (22 kN) · Anillo Dorsal D',
    descripcion: 'Arnés de cuerpo completo con 1 aro dorsal en D para detención de caídas. Correas de poliéster de alta tenacidad con ajustes metálicos.',
    composicion: 'Poliéster de Alta Tenacidad + Herrajes Acero',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Ajustes para mayor confort y sujeción', 'Poliéster de alta resistencia', 'Resistencia hasta 5,000 lb / 22 kN', 'Múltiplo: 5 pz / Caja: 15 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/arnes_1aro.png',
    colores: [{ nombre: 'Naranja / Negro', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 599.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-arnes-3aros',
    sku: 'ARN-3A',
    nombre: 'Arnés Cuerpo Completo 3 Aros',
    categoria: 'alturas',
    subtitulo: '3 Aros en D (Dorsal y Laterales de Posicionamiento)',
    descripcion: 'Arnés de cuerpo completo con 3 aros de conexión en D para posicionamiento y detención de caídas. Soporta hasta 5,000 lbs (22 kN).',
    composicion: 'Poliéster de Alta Tenacidad + Herrajes de Acero Forjado',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['3 aros D reforzados', 'Poliéster alta resistencia', 'Resistencia hasta 5,000 lb / 22 kN', 'Múltiplo: 5 pz / Caja: 15 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/arnes_3aros.png',
    colores: [{ nombre: 'Naranja / Negro', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 619.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-linea-vida-doble',
    sku: 'LDV-DBL',
    nombre: 'Línea de Vida Doble Gancho Grande',
    categoria: 'alturas',
    subtitulo: 'Doble Brazo en Y · Ganchos Estructurales de 2 1/4"',
    descripcion: 'Línea de vida doble (en Y) con ganchos grandes de acero para transiciones seguras al 100% del tiempo en andamios y torres.',
    composicion: 'Poliéster + Ganchos de Acero con Doble Seguro',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Doble línea de conexión', 'Ganchos grandes estructurales', 'Resistencia impacto 5,000 lb / 22 kN', 'Múltiplo: 5 pz / Caja: 15 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/linea_vida_doble.png',
    colores: [{ nombre: 'Naranja / Plata', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 609.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-linea-vida-simple',
    sku: 'LDV-SMP',
    nombre: 'Línea de Vida 1 Gancho Grande',
    categoria: 'alturas',
    subtitulo: '1 Gancho Estructural Grande · Conexión Segura al Punto de Anclaje',
    descripcion: 'Línea de vida simple con gancho grande de apertura amplia para conexión directa y segura a perfiles y estructuras certificadas.',
    composicion: 'Poliéster + Gancho de Acero Forjado',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Permite conexión segura del arnés', 'Gancho grande de seguridad', 'Resistencia 5,000 lb / 22 kN', 'Múltiplo: 5 pz / Caja: 15 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/linea_vida_simple.png',
    colores: [{ nombre: 'Naranja / Plata', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 499.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-arnes-linea-kit',
    sku: 'ARN-KIT',
    nombre: 'Arnés con Línea de Vida Integrada',
    categoria: 'alturas',
    subtitulo: 'Kit Completo de Trabajo en Alturas · Capacidad 140 kg (310 lbs)',
    descripcion: 'Kit integral que incluye arnés ergonómico de cuerpo completo con línea de vida integrada. Capacidad máxima certificada de 140 kg (310 lbs).',
    composicion: 'Poliéster de Alta Resistencia + Acero Forjado',
    gramaje: 'Kit Completo',
    tallas: ['Unitalla'],
    detalles: ['Kit arnés + línea de vida', 'Capacidad 140 kg (310 lbs)', 'Resistencia 5,000 lb / 22 kN', 'Múltiplo: 5 pz / Caja: 15 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/arnes_linea_kit.png',
    colores: [{ nombre: 'Naranja / Blanco', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 989.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-punto-fijo',
    sku: 'PNT-FIJ',
    nombre: 'Punto Fijo de Anclaje (Tie-Off Strap)',
    categoria: 'alturas',
    subtitulo: 'Cinta de Anclaje Portátil de Alta Resistencia con Anillo D',
    descripcion: 'Cinta de anclaje portátil tipo Tie-off con argolla metálica en D para rodear vigas y columnas creando un punto de amarre seguro.',
    composicion: 'Poliéster de Alta Densidad + Anillo de Acero',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Permite conexión segura del arnés', 'Anclaje portátil de alta resistencia', 'Múltiplo: 5 pz / Caja: 15 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/punto_fijo.png',
    colores: [{ nombre: 'Rojo / Negro', hex: '#dc2626' }],
    precios: {},
    precioDirecto: 129.90,
    empaque: '5 pz / Caja 15 pz'
  },

  // --- 37-39: LIMITACIÓN VIAL ---
  {
    id: 'epc-trafitambo',
    sku: 'TRAF-2R',
    nombre: 'Trafitambo con 2 Franjas Reflejantes',
    categoria: 'vial',
    subtitulo: 'Altura Aprox. 120 cm · 2 Franjas Reflejantes · Agarradera Superior',
    descripcion: 'Trafitambo de polietileno de alta resistencia de aprox. 120 cm de altura con 2 franjas reflejantes Grado Ingeniería para delimitación en avenidas y obras.',
    composicion: 'Polietileno de Alta Resistencia a Impactos',
    gramaje: '~120 cm',
    tallas: ['N/A'],
    detalles: ['Franjas reflejantes', 'Color fluorescente', 'Aprox. 120 cm de alto', 'Múltiplo: 1 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/trafitambo.png',
    colores: [{ nombre: 'Naranja / Blanco Reflejante', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 585.00,
    empaque: '1 pz'
  },
  {
    id: 'epc-poste-limitador',
    sku: 'POST-LIM',
    nombre: 'Poste Limitador con Reflejante',
    categoria: 'vial',
    subtitulo: 'Altura Aprox. 120 cm · Franjas Reflejantes · Base Lastrada',
    descripcion: 'Poste delimitador vial tubular de aprox. 120 cm de altura con franjas reflejantes de alta visibilidad para canalizar tráfico y delimitar accesos.',
    composicion: 'Polietileno Flexible + Base Rígida',
    gramaje: '~120 cm',
    tallas: ['N/A'],
    detalles: ['Franjas reflejantes', 'Color fluorescente', 'Aprox. 120 cm de alto', 'Múltiplo: 5 pz / Caja: 15 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/poste_limitador.png',
    colores: [{ nombre: 'Naranja / Blanco', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 395.00,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-malla-delimitadora',
    sku: 'MALLA-DEL',
    nombre: 'Malla Delimitadora Naranja',
    categoria: 'vial',
    subtitulo: 'Rollo 1.20 m Alto × 30 m Largo · Resistente a Rayos UV',
    descripcion: 'Malla plástica de polietileno de alta densidad color naranja fluorescente con protección UV para delimitación perimetral de obras y excavaciones.',
    composicion: 'Polietileno de Alta Densidad con Filtro UV',
    gramaje: '1.20 m × 30 m',
    tallas: ['N/A'],
    detalles: ['Ligera y fácil de transportar', '1.20 m alto × 30 m largo', 'Resistente a rayos UV', 'Múltiplo: 5 pz / Caja: 25 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/malla_delimitadora.png',
    colores: [{ nombre: 'Naranja Fluorescente', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 364.90,
    empaque: '5 pz / Caja 25 pz'
  },
  {
    id: 'epc-banderola-malla',
    sku: 'BAND-ML',
    nombre: 'Banderola de Malla Reflejante con Asta',
    categoria: 'vial',
    subtitulo: 'Malla Fluorescente con Cinta Reflejante y Asta de Madera',
    descripcion: 'Banderola de señalización vial para bandereros y control de tráfico. Confeccionada en malla fluorescente de alta visibilidad con franja reflejante.',
    composicion: 'Malla Fluorescente + Asta de Madera + Reflejante',
    gramaje: 'Unitaria',
    tallas: ['N/A'],
    detalles: ['Resistente a rayos UV', 'Franjas reflejantes', 'Malla fluorescente', 'Múltiplo: 5 pz / Caja: 15 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/banderola_malla.png',
    colores: [{ nombre: 'Naranja / Verde Reflejante', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 41.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-cono-vial',
    sku: 'CONO-VL',
    nombre: 'Cono Vial con Reflejantes',
    categoria: 'vial',
    subtitulo: 'Base Ancha y Pesada Antivuelco · PVC Flexible · 3 Tamaños',
    descripcion: 'Cono de seguridad vial en PVC flexible resistente a impactos vehiculares. Cuenta con base ancha pesada que evita vuelcos por viento o paso de vehículos.',
    composicion: 'PVC Flexible con Memoria de Impacto',
    gramaje: '3 Tamaños',
    tallas: ['Chico (45cm)', 'Mediano (71cm)', 'Grande (91cm)'],
    detalles: ['Base ancha y pesada evita vuelcos', 'Franjas reflejantes', 'Chico $89.90 / Mediano $195.00 / Grande $279.00', 'Múltiplo: 5 pz / Atado: 15 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/cono_vial.png',
    colores: [{ nombre: 'Naranja / Blanco', hex: '#ea580c' }],
    precios: {},
    precioDirecto: 89.90,
    empaque: '5 pz / Atado 15 pz'
  },
  {
    id: 'epc-cinta-limitadora',
    sku: 'CINT-LIM',
    nombre: 'Cinta Limitadora "Peligro / Precaución"',
    categoria: 'vial',
    subtitulo: 'Rollo de 300 Metros · Alta Resistencia a Intemperie y UV',
    descripcion: 'Cinta plástica de señalización de 300 metros de longitud en colores llamativos con leyenda de advertencia para acordonar zonas de riesgo.',
    composicion: 'Polietileno Flexible de Alta Densidad',
    gramaje: '300 m',
    tallas: ['N/A'],
    detalles: ['Resistente a la exposición exterior', 'Colores llamativos', '300 metros', 'Múltiplo: 5 pz / Caja: 50 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/epc/cinta_limitadora.png',
    colores: [
      { nombre: 'Amarillo (Precaución)', hex: '#eab308' },
      { nombre: 'Rojo (Peligro)', hex: '#dc2626' }
    ],
    precios: {},
    precioDirecto: 54.90,
    empaque: '5 pz / Caja 50 pz'
  }
];

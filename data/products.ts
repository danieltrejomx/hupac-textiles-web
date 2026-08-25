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

export const PRODUCTS: Product[] = [
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
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Vino', hex: '#5C1D24' },
      { nombre: 'Rey', hex: '#2456C4' }
    ],
    precios: {
      'CH-EG': {
        Blanco: { '12-71': 39.00, '72-503': 38.22, '504+': 37.05 },
        Colores: { '12-71': 45.50, '72-503': 44.59, '504+': 43.23 }
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
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Kakhi', hex: '#A99A6B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Amarillo', hex: '#F5BE18' },
      { nombre: 'Rosa', hex: '#F3C4D3' },
      { nombre: 'Naranja', hex: '#F97316' },
      { nombre: 'Morado', hex: '#5A2D63' },
      { nombre: 'Esmeralda', hex: '#0f9f6e' },
      { nombre: 'Gris', hex: '#9AA6B2' },
      { nombre: 'Vino', hex: '#5C1D24' }
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
  {
    id: 'epc-casco-mundial',
    sku: 'CASCO-MUN',
    nombre: 'Casco de Protección Mundial',
    categoria: 'cabeza',
    subtitulo: 'Casco Dieléctrico hasta 20,000 V · Suspensión 8 Puntos',
    descripcion: 'Casco de polietileno de alto impacto con suspensión de 8 puntos. Dieléctrico hasta 20,000 V. Disponible con o sin matraca.',
    composicion: 'Polietileno de Alto Impacto',
    gramaje: 'Dieléctrico 20,000 V',
    tallas: ['Unitalla'],
    detalles: ['Suspensión 8 puntos', 'Dieléctrico hasta 20,000 V', 'Múltiplo: 5 pz · Caja: 24 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 46.90,
    empaque: '5 pz / Caja 24 pz'
  },
  {
    id: 'epc-casco-ala-ancha',
    sku: 'CASCO-ALA',
    nombre: 'Casco de Protección Ala Ancha',
    categoria: 'cabeza',
    subtitulo: 'Estructura Ergonómica · Suspensión 8 Puntos',
    descripcion: 'Casco de polietileno de alto impacto con ala ancha, estructura ergonómica y suspensión de 8 puntos. Disponible con o sin matraca.',
    composicion: 'Polietileno de Alto Impacto',
    gramaje: 'Ergonómico',
    tallas: ['Unitalla'],
    detalles: ['Ala ancha 360°', 'Estructura ergonómica', 'Suspensión 8 puntos', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 85.90,
    empaque: '5 pz / Caja 24 pz'
  },
  {
    id: 'epc-protector-facial',
    sku: 'PROT-FAC',
    nombre: 'Protector Facial para Casco',
    categoria: 'cabeza',
    subtitulo: 'Mica Protectora + Adaptador Incluido',
    descripcion: 'Protector facial de polietileno de alto impacto, cómodo y ligero. Compatible con casco de protección. Incluye adaptador.',
    composicion: 'Polietileno de Alto Impacto',
    gramaje: 'Ligero',
    tallas: ['Unitalla'],
    detalles: ['Compatible con cascos', 'Mica protectora $44.90', 'Adaptador $77.90', 'Caja: 50 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 77.90,
    empaque: '1 pz / Caja 50 pz'
  },
  {
    id: 'epc-orejera-casco',
    sku: 'OREJ-CAS',
    nombre: 'Orejera con Adaptador para Casco',
    categoria: 'cabeza',
    subtitulo: 'Reducción de Ruido · Adaptable a Casco',
    descripcion: 'Orejera con adaptador universal para casco de seguridad. Reduce significativamente el nivel de ruido en el entorno laboral.',
    composicion: 'Plástico ABS / Espuma Atenuadora',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Reducción de ruido certificada', 'Adaptable a la mayoría de cascos', 'Múltiplo: 1 par'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 349.90,
    empaque: '1 par'
  },
  {
    id: 'epc-cubre-nuca',
    sku: 'CUB-NUCA',
    nombre: 'Cubre Nuca con Reflejante',
    categoria: 'cabeza',
    subtitulo: 'Bloqueo UV · Material Retrorreflectante',
    descripcion: 'Cubre nuca con material retrorreflectante y tejido transpirable. Bloquea rayos UV para protección solar en jornadas al aire libre.',
    composicion: 'Tejido Transpirable + Banda Reflejante',
    gramaje: 'Ligero',
    tallas: ['Unitalla'],
    detalles: ['Bloqueo UV', 'Material retrorreflectante', 'Tejido transpirable', 'Múltiplo: 10 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 31.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-capucha-antiflama',
    sku: 'CAP-ANTIF',
    nombre: 'Capucha Antiflama Ignífuga',
    categoria: 'cabeza',
    subtitulo: 'Resistencia al Fuego · Ideal para Soldadura',
    descripcion: 'Capucha ignífuga de tejido transpirable con resistencia certificada al fuego. Ideal para trabajos de soldadura y ambientes de calor extremo.',
    composicion: 'Fibra Ignífuga Transpirable',
    gramaje: 'Protección FR',
    tallas: ['Unitalla'],
    detalles: ['Resistencia al fuego', 'Tejido transpirable', 'Ideal soldadura', 'Múltiplo: 10 pz / Caja: 100 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 97.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-tapon-reusable',
    sku: 'TAP-REUS',
    nombre: 'Tapón Auditivo Reusable',
    categoria: 'cabeza',
    subtitulo: 'Aletas Suaves · Uso Prolongado',
    descripcion: 'Tapón auditivo reusable con aletas suaves y adaptables. Diseñado para uso prolongado sin irritación y reducción efectiva de ruido.',
    composicion: 'Silicón Suave',
    gramaje: 'Unitario',
    tallas: ['Unitalla'],
    detalles: ['Aletas suaves adaptables', 'Sin irritación en uso prolongado', 'Reducción de ruido', 'Múltiplo: 200 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 6.90,
    empaque: '200 pz / Caja 1,000 pz'
  },
  {
    id: 'epc-tapon-desechable',
    sku: 'TAP-DESC',
    nombre: 'Tapón Auditivo Desechable',
    categoria: 'cabeza',
    subtitulo: 'Un Solo Uso · Sellado Cómodo',
    descripcion: 'Tapón auditivo desechable de espuma que se expande para un sellado cómodo y efectivo. De un solo uso.',
    composicion: 'Espuma de PU',
    gramaje: 'Desechable',
    tallas: ['Unitalla'],
    detalles: ['Se expande para sellado', 'Un solo uso', 'Múltiplo: 100 pz / Caja: 1,000 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 5.90,
    empaque: '100 pz / Caja 1,000 pz'
  },
  {
    id: 'epc-cofia-pisada',
    sku: 'COFIA-PIS',
    nombre: 'Cofia Pisada Desechable',
    categoria: 'cabeza',
    subtitulo: 'Tejido Transpirable · Elástico sin Látex',
    descripcion: 'Cofia pisada desechable de tejido transpirable con elástico sin látex. Ligera y adecuada para ambientes de inocuidad alimentaria.',
    composicion: 'Tela No Tejida (TNT)',
    gramaje: 'Desechable',
    tallas: ['Unitalla'],
    detalles: ['Elástico sin látex', 'Tejido transpirable', 'Ligera', 'Múltiplo: 100 pz Dispenser'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 39.90,
    empaque: 'Dispenser 100 pz / Caja 1,000 pz'
  },
  {
    id: 'epc-cofia-ninja',
    sku: 'COFIA-NIN',
    nombre: 'Cofia Ninja Hood Desechable',
    categoria: 'cabeza',
    subtitulo: 'Cobertura Completa · Transpirable',
    descripcion: 'Cofia ninja con cobertura completa de cabeza, cuello y parte del rostro. Tejido transpirable y ligero para máxima protección higiénica.',
    composicion: 'Tela No Tejida (TNT)',
    gramaje: 'Desechable',
    tallas: ['Unitalla'],
    detalles: ['Cobertura completa', 'Tejido transpirable', 'Ligera', 'Múltiplo: 100 pz Dispenser'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 198.90,
    empaque: 'Dispenser 100 pz / Caja 1,000 pz'
  },

  // ==========================================
  // EPC — PROTECCIÓN VISUAL
  // ==========================================
  {
    id: 'epc-lente-dc0024',
    sku: 'DC0024',
    nombre: 'Lente DC0024',
    categoria: 'visual',
    subtitulo: 'Vista Panorámica · Bloquea 99.9% UV · Antirrayones',
    descripcion: 'Lente de policarbonato con vista panorámica. Bloquea 99.9% de rayos UV y cuenta con recubrimiento antirrayones.',
    composicion: 'Policarbonato',
    gramaje: 'Lente de Seguridad',
    tallas: ['Unitalla'],
    detalles: ['Bloquea 99.9% UV', 'Vista panorámica', 'Antirrayones', 'Múltiplo: 12 pz / Caja: 240 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 15.90,
    empaque: '12 pz / Caja 240 pz'
  },
  {
    id: 'epc-lente-dc0025',
    sku: 'DC0025',
    nombre: 'Lente DC0025',
    categoria: 'visual',
    subtitulo: 'Policarbonato · Protección UV400 · Ligero',
    descripcion: 'Lente de policarbonato ligero con protección UV400. Disponible en armazón blanco o negro.',
    composicion: 'Policarbonato',
    gramaje: 'UV400',
    tallas: ['Unitalla'],
    detalles: ['Protección UV400', 'Ligero', 'Armazón Blanco $17.90 / Negro $12.90', 'Múltiplo: 12 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Blanco', hex: '#ffffff' },
      { nombre: 'Negro', hex: '#1a1a1a' }
    ],
    precios: {},
    precioDirecto: 15.90,
    empaque: '12 pz / Caja 300 pz'
  },
  {
    id: 'epc-lente-nemesis-camuflaje',
    sku: 'NEM-CAM',
    nombre: 'Lente Tipo Nemesis Camuflaje',
    categoria: 'visual',
    subtitulo: 'Bloquea 99.9% UV · Patillas Flexibles · Vista Panorámica',
    descripcion: 'Lente tipo Nemesis con armazón camuflaje. Bloquea 99.9% UV, patillas flexibles y vista panorámica con recubrimiento antirrayones.',
    composicion: 'Policarbonato / Armazón Camuflaje',
    gramaje: 'Vista Panorámica',
    tallas: ['Unitalla'],
    detalles: ['99.9% UV', 'Patillas flexibles', 'Vista panorámica', 'Antirrayones', 'Múltiplo: 12 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 69.90,
    empaque: '12 pz / Caja 144 pz'
  },
  {
    id: 'epc-lente-nemesis',
    sku: 'NEM-STD',
    nombre: 'Lente Tipo Nemesis',
    categoria: 'visual',
    subtitulo: 'Protección contra Impactos · Antirrayones',
    descripcion: 'Lente tipo Nemesis estándar. Bloquea 99.9% UV, protección contra impactos y recubrimiento antirrayones.',
    composicion: 'Policarbonato',
    gramaje: 'Antiimpacto',
    tallas: ['Unitalla'],
    detalles: ['99.9% UV', 'Protección contra impactos', 'Antirrayones', 'Múltiplo: 12 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 59.90,
    empaque: '12 pz / Caja 144 pz'
  },
  {
    id: 'epc-goggle-trilogy',
    sku: 'GOG-TRI',
    nombre: 'Goggle Trilogy',
    categoria: 'visual',
    subtitulo: 'Vista Panorámica · Elástico de Ajuste',
    descripcion: 'Goggle de seguridad Trilogy. Bloquea 99.9% UV con elástico de ajuste y vista panorámica amplia.',
    composicion: 'Policarbonato',
    gramaje: 'Goggle',
    tallas: ['Unitalla'],
    detalles: ['99.9% UV', 'Elástico de ajuste', 'Vista panorámica', 'Múltiplo: 12 pz / Caja: 60 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 94.90,
    empaque: '12 pz / Caja 60 pz'
  },
  {
    id: 'epc-lente-polarizado',
    sku: 'POLAR-STD',
    nombre: 'Lente Pasta Dura Polarizado',
    categoria: 'visual',
    subtitulo: 'Armazón Pasta Dura · Polarizado · Antiimpacto',
    descripcion: 'Lente de armazón pasta dura polarizado con protección contra impactos. Para uso en exteriores con alta exposición solar.',
    composicion: 'Pasta Dura + Lente Polarizado',
    gramaje: 'Polarizado',
    tallas: ['Unitalla'],
    detalles: ['Polarizado', 'Protección contra impactos', 'Armazón pasta dura', 'Múltiplo: 1 pz / Caja: 60 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 99.90,
    empaque: '1 pz / Caja 60 pz'
  },
  {
    id: 'epc-sobre-lente-dc0027',
    sku: 'DC0027',
    nombre: 'Sobre Lente DC0027',
    categoria: 'visual',
    subtitulo: 'Alta Visibilidad · Ajuste Amplio',
    descripcion: 'Sobre lente de mica clara con alta visibilidad, diseñado para usarse sobre lentes con graduación. Ajuste amplio para varios tipos de rostro.',
    composicion: 'Policarbonato Transparente',
    gramaje: 'Sobre Lente',
    tallas: ['Unitalla'],
    detalles: ['Ajuste amplio', 'Mica clara alta visibilidad', 'Para uso sobre lentes graduados', 'Múltiplo: 12 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 29.90,
    empaque: '12 pz / Caja 144 pz'
  },
  {
    id: 'epc-monogoggle-ventilado',
    sku: 'MONO-VENT',
    nombre: 'Monogoggle Ventilado',
    categoria: 'visual',
    subtitulo: 'Protección contra Líquidos y Partículas · Elástico',
    descripcion: 'Goggle sellado ventilado que evita la entrada directa de líquidos y partículas. Elástico de ajuste para mayor comodidad.',
    composicion: 'PVC / Policarbonato',
    gramaje: 'Goggle',
    tallas: ['Unitalla'],
    detalles: ['Evita entrada de líquidos y partículas', 'Ventilación lateral', 'Elástico ajustable', 'Múltiplo: 6 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 34.90,
    empaque: '6 pz / Caja 60 pz'
  },

  // ==========================================
  // EPC — PROTECCIÓN PARA MANOS
  // ==========================================
  {
    id: 'epc-guante-nylon-nitrilo',
    sku: 'GN-NIT',
    nombre: 'Guantes Nylon con Nitrilo',
    categoria: 'manos',
    subtitulo: 'Resistente a Abrasión · Repele Líquidos Ligeros',
    descripcion: 'Guante ergonómico de nylon con recubrimiento de nitrilo. Resistente a abrasión y repele líquidos y químicos ligeros.',
    composicion: 'Nylon + Recubrimiento Nitrilo',
    gramaje: 'Par',
    tallas: ['6', '7', '8', '9', '10'],
    detalles: ['Resistente a abrasión', 'Repele líquidos/químicos ligeros', 'Norma EN 388', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 12.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guante-nylon-pu',
    sku: 'GN-PU',
    nombre: 'Guante Nylon con Poliuretano',
    categoria: 'manos',
    subtitulo: 'Alta Sensibilidad · Adherencia en Seco',
    descripcion: 'Guante de nylon con recubrimiento de poliuretano en palma y dedos. Alta sensibilidad táctil y excelente adherencia en seco.',
    composicion: 'Nylon + Poliuretano (PU)',
    gramaje: 'Par',
    tallas: ['6', '7', '8', '9', '10'],
    detalles: ['Alta sensibilidad táctil', 'Adherencia en seco', 'Recubrimiento en palma/dedos', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 12.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guante-anticorte-n5-impacto',
    sku: 'AC-N5-IMP',
    nombre: 'Guantes Anticorte Nivel 5 Anti Impacto',
    categoria: 'manos',
    subtitulo: 'Nivel 5 Anticorte · TPR Anti Impacto · EN 388',
    descripcion: 'Guante anticorte Nivel 5 con protección TPR anti impacto en dorso. Cumple norma EN 388.',
    composicion: 'HPPE + TPR Anti Impacto',
    gramaje: 'Par Reforzado',
    tallas: ['Unitalla'],
    detalles: ['Nivel 5 anticorte', 'TPR anti impacto', 'Norma EN 388', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 227.90,
    empaque: '12 pares / Caja 144 pares'
  },
  {
    id: 'epc-guante-anticorte-n5-nitrilo',
    sku: 'AC-N5-NIT',
    nombre: 'Guantes Anticorte Nivel 5 Palma Nitrilo',
    categoria: 'manos',
    subtitulo: 'Nivel 5 · EN 388 · Repele Aceites',
    descripcion: 'Guante anticorte Nivel 5 con palma de nitrilo que repele líquidos y aceites. Cumple norma EN 388.',
    composicion: 'HPPE + Palma Nitrilo',
    gramaje: 'Par',
    tallas: ['6', '7', '8', '9', '10'],
    detalles: ['Nivel 5 anticorte', 'Repele líquidos/aceites', 'EN 388', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 45.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guante-inspector',
    sku: 'INSP-POL',
    nombre: 'Guantes Inspector 100% Poliéster',
    categoria: 'manos',
    subtitulo: 'Evita Huellas · Alta Sensibilidad',
    descripcion: 'Guante de poliéster para inspección que evita huellas y rayones en superficies delicadas. No apto para zonas de calor.',
    composicion: '100% Poliéster',
    gramaje: 'Par Inspector',
    tallas: ['7', '8', '9', '10'],
    detalles: ['Evita huellas y rayones', 'Alta sensibilidad táctil', 'No apto zonas de calor', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 10.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guante-japones-latex',
    sku: 'JAP-LAT',
    nombre: 'Guante Japonés con Palma Látex',
    categoria: 'manos',
    subtitulo: 'Palma Látex · Repele Líquidos · EN 388',
    descripcion: 'Guante japonés con palma de látex que repele líquidos. Tejido transpirable y cumple norma EN 388.',
    composicion: 'Algodón + Palma Látex',
    gramaje: 'Par',
    tallas: ['7', '8', '9', '10'],
    detalles: ['Palma látex', 'Repele líquidos', 'Tejido transpirable', 'EN 388', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 29.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guante-anticorte-n5-pu',
    sku: 'AC-N5-PU',
    nombre: 'Guantes Anticorte Nivel 5 Poliuretano',
    categoria: 'manos',
    subtitulo: 'Fibra HPPE · EN 388 · Nivel 5',
    descripcion: 'Guante anticorte Nivel 5 de fibra HPPE de alto rendimiento con recubrimiento de poliuretano. Cumple EN 388.',
    composicion: 'HPPE + Poliuretano',
    gramaje: 'Par',
    tallas: ['6', '7', '8', '9', '10'],
    detalles: ['Nivel 5 anticorte', 'Fibra HPPE', 'EN 388', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 42.90,
    empaque: '12 pares / Caja 240 pares'
  },
  {
    id: 'epc-guantes-argoneros',
    sku: 'ARGON-STD',
    nombre: 'Guantes Argoneros',
    categoria: 'manos',
    subtitulo: 'Resistencia Dieléctrica · Alta Destreza',
    descripcion: 'Guantes argoneros con resistencia dieléctrica. Ligeros y de alta destreza ergonómica para soldadura MIG/TIG.',
    composicion: 'Carnaza / Fibra Dieléctrica',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Resistencia dieléctrica', 'Alta destreza ergonómica', 'Ligeros', 'Múltiplo: 5 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 56.90,
    empaque: '5 pares / Caja 100 pares'
  },
  {
    id: 'epc-guantes-electricista',
    sku: 'ELEC-STD',
    nombre: 'Guantes Electricista',
    categoria: 'manos',
    subtitulo: 'Resistencia Dieléctrica · Sensibilidad Táctil',
    descripcion: 'Guantes para electricista con alta resistencia dieléctrica y gran sensibilidad táctil para maniobras eléctricas.',
    composicion: 'Látex Dieléctrico',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Resistencia dieléctrica', 'Gran sensibilidad táctil', 'Para trabajos eléctricos', 'Múltiplo: 5 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 54.90,
    empaque: '5 pares / Caja 100 pares'
  },
  {
    id: 'epc-guante-carnaza-corto',
    sku: 'CAR-CORT',
    nombre: 'Guante Carnaza Corto',
    categoria: 'manos',
    subtitulo: 'Resistente a Abrasión y Chispas',
    descripcion: 'Guante de carnaza corto resistente a abrasión y chispas. No lavable en agua. Ideal para mantenimiento y soldadura ligera.',
    composicion: 'Carnaza de Vaqueta',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Resistente a abrasión', 'Resistente a chispas', 'No lavable en agua', 'Múltiplo: 5 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 38.90,
    empaque: '5 pares / Caja 100 pares'
  },
  {
    id: 'epc-guante-carnaza-largo',
    sku: 'CAR-LARG',
    nombre: 'Guantes Carnaza Largo',
    categoria: 'manos',
    subtitulo: 'Mayor Cobertura en Brazo · Resistente a Chispas',
    descripcion: 'Guante de carnaza largo con mayor cobertura en el antebrazo. Resistente a chispas y abrasión para soldadura y fundición.',
    composicion: 'Carnaza de Vaqueta',
    gramaje: 'Par Largo',
    tallas: ['Unitalla'],
    detalles: ['Mayor cobertura de brazo', 'Resistente a chispas', 'Resistente a abrasión', 'Múltiplo: 5 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 39.90,
    empaque: '5 pares / Caja 100 pares'
  },
  {
    id: 'epc-guante-operador',
    sku: 'OPER-STD',
    nombre: 'Guante Operador',
    categoria: 'manos',
    subtitulo: 'Para Maniobrar Equipo · Costuras Finas',
    descripcion: 'Guante operador ideal para maniobrar equipo y maquinaria. Costuras internas finas para mayor confort.',
    composicion: 'Carnaza / Lona',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Para maniobras de equipo', 'Costuras internas finas', 'Cómodo y duradero', 'Múltiplo: 5 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 42.90,
    empaque: '5 pares / Caja 100 pares'
  },
  {
    id: 'epc-guantes-toalla-terry',
    sku: 'TOA-TERRY',
    nombre: 'Guantes Toalla Terry',
    categoria: 'manos',
    subtitulo: 'Aislante Térmico · Ideal para Mantenimiento',
    descripcion: 'Guantes de toalla terry con aislamiento térmico y capacidad absorbente de líquidos. Ideales para mantenimiento general.',
    composicion: '100% Algodón Terry',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Aislante térmico', 'Absorbente de líquidos', 'Para mantenimiento', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 24.90,
    empaque: '12 pares / Caja 120 pares'
  },
  {
    id: 'epc-guante-japones-algodon',
    sku: 'JAP-ALG',
    nombre: 'Guante Japonés 100% Algodón',
    categoria: 'manos',
    subtitulo: '100% Algodón · Absorbe Polvo',
    descripcion: 'Guante japonés 100% algodón. Adherencia en seco y absorción de polvo. Disponible en presentación 60g y 40g.',
    composicion: '100% Algodón',
    gramaje: '60g / 40g',
    tallas: ['Unitalla'],
    detalles: ['Adherencia en seco', 'Absorbe polvo', '60g: $9.90 / 40g: $8.90', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 9.90,
    empaque: '12 pares / Caja 300 pares'
  },
  {
    id: 'epc-guante-japones-pvc',
    sku: 'JAP-PVC',
    nombre: 'Guantes Japonés con Puntos PVC',
    categoria: 'manos',
    subtitulo: 'Antiderrapante · Absorbe Sudor',
    descripcion: 'Guante japonés con puntos de PVC antiderrapantes que absorben el sudor y mejoran el agarre.',
    composicion: 'Algodón + Puntos PVC',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Puntos PVC antiderrapantes', 'Absorbe sudor', 'Agarre mejorado', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 13.90,
    empaque: '12 pares / Caja 300 pares'
  },
  {
    id: 'epc-guante-chino-doble-palma',
    sku: 'CHIN-DPL',
    nombre: 'Guante Chino Doble Palma',
    categoria: 'manos',
    subtitulo: 'Refuerzo Doble en Palma · Resistente a Corrosión',
    descripcion: 'Guante chino con refuerzo doble en palma para mayor durabilidad. Resistente a la corrosión.',
    composicion: 'Algodón / Lona Reforzada',
    gramaje: 'Par Reforzado',
    tallas: ['Unitalla'],
    detalles: ['Doble refuerzo en palma', 'Resistente a corrosión', 'Durabilidad aumentada', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 38.90,
    empaque: '12 pares / Caja 120 pares'
  },
  {
    id: 'epc-guante-nitrilo-puno-lona',
    sku: 'NIT-PLO',
    nombre: 'Guantes Nitrilo Puño de Lona',
    categoria: 'manos',
    subtitulo: 'Puño Lona · Repele Aceites',
    descripcion: 'Guante de nitrilo con puño de lona para ajuste firme. Repele líquidos y aceites.',
    composicion: 'Nitrilo + Puño de Lona',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Puño de lona', 'Ajuste firme', 'Repele líquidos y aceites', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 36.90,
    empaque: '12 pares / Caja 144 pares'
  },
  {
    id: 'epc-guante-nitrilo-elastico',
    sku: 'NIT-ELA',
    nombre: 'Guante Nitrilo Puño Elástico',
    categoria: 'manos',
    subtitulo: 'Ribete Elástico · Repele Aceites',
    descripcion: 'Guante de nitrilo con puño de ribete elástico para mayor hermeticidad. Repele líquidos y aceites.',
    composicion: 'Nitrilo + Puño Elástico',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Puño ribete elástico', 'Repele líquidos y aceites', 'Mayor hermeticidad', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 36.90,
    empaque: '12 pares / Caja 144 pares'
  },
  {
    id: 'epc-guante-nitrilo-desechable',
    sku: 'NIT-DESC',
    nombre: 'Guantes Nitrilo Desechable',
    categoria: 'manos',
    subtitulo: '100% Nitrilo · Ligero · Alta Sensibilidad',
    descripcion: 'Guante desechable 100% nitrilo sintético. Ligero con alta sensibilidad táctil. Presentación en dispenser de 100 piezas.',
    composicion: '100% Nitrilo Sintético',
    gramaje: 'Desechable',
    tallas: ['7', '8', '9', '10'],
    detalles: ['100% nitrilo sintético', 'Ligero', 'Alta sensibilidad', 'Dispenser 100 pz: $95.90'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 95.90,
    empaque: 'Dispenser 100 pares / Caja 1,000 pares'
  },
  {
    id: 'epc-guante-nitrilo-solvex',
    sku: 'NIT-SOL',
    nombre: 'Guante Nitrilo Verde Tipo Solvex',
    categoria: 'manos',
    subtitulo: 'Resistente a Químicos/Solventes · Agarre Húmedo',
    descripcion: 'Guante de nitrilo verde tipo Solvex resistente a químicos y solventes. Gran adherencia tanto en seco como en húmedo.',
    composicion: 'Nitrilo Verde Grueso',
    gramaje: 'Par',
    tallas: ['7', '8', '9', '10'],
    detalles: ['Resistente a químicos/solventes', 'Agarre en seco y húmedo', 'Reutilizable', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Verde', hex: '#16a34a' }],
    precios: {},
    precioDirecto: 24.90,
    empaque: '12 pares / Caja 144 pares'
  },
  {
    id: 'epc-guante-contra-acidos',
    sku: 'AC-18IN',
    nombre: 'Guantes Contra Ácidos 18"',
    categoria: 'manos',
    subtitulo: '18 Pulgadas · Impermeable · Alta Resistencia Química',
    descripcion: 'Guante largo de 18 pulgadas completamente impermeable con alta resistencia química para manejo de ácidos.',
    composicion: 'Caucho / Neopreno',
    gramaje: 'Par 18"',
    tallas: ['Unitalla'],
    detalles: ['Largo 18 pulgadas', 'Impermeable', 'Alta resistencia química', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 79.90,
    empaque: '12 pares / Caja 144 pares'
  },
  {
    id: 'epc-guante-soldador-kevlar',
    sku: 'SOLD-KEV',
    nombre: 'Guante Soldador con Hilo Kevlar',
    categoria: 'manos',
    subtitulo: 'Hilo Kevlar · Aislante Térmico · EN 388',
    descripcion: 'Guante de soldador con costuras en hilo Kevlar. Aislante térmico interno y cumple norma EN 388. Disponible en azul o rojo.',
    composicion: 'Carnaza + Hilo Kevlar',
    gramaje: 'Par Soldador',
    tallas: ['Unitalla'],
    detalles: ['Costuras hilo Kevlar', 'Aislante térmico', 'EN 388', 'Azul $64.90 / Rojo $61.90'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Azul', hex: '#2456C4' },
      { nombre: 'Rojo', hex: '#B22234' }
    ],
    precios: {},
    precioDirecto: 64.90,
    empaque: '6 pares / Caja 72 pares'
  },

  // ==========================================
  // EPC — CALZADO INDUSTRIAL (nuevos)
  // ==========================================
  {
    id: 'epc-bota-industrial',
    sku: 'BOT-IND',
    nombre: 'Bota Industrial',
    categoria: 'calzado',
    subtitulo: 'Piel Vacuno · Suela Antiderrapante · Flexión 200%',
    descripcion: 'Bota industrial de piel de ganado vacuno con suela antiderrapante de alta flexión (hasta 200%). Fabricada para resistir jornadas exigentes.',
    composicion: 'Piel de Ganado Vacuno',
    gramaje: 'Par',
    tallas: ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    detalles: ['Piel ganado vacuno', 'Suela antiderrapante', 'Flexión hasta 200%', 'Múltiplo: 5 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/calzado/calzado_bota_industrial.jpg',
    colores: [{ nombre: 'Café', hex: '#92400e' }],
    precios: {},
    precioDirecto: 349.90,
    empaque: '5 pares / Caja 28 pares'
  },
  {
    id: 'epc-bota-roper',
    sku: 'BOT-ROP',
    nombre: 'Bota Roper',
    categoria: 'calzado',
    subtitulo: 'Impermeable · Repele Líquidos y Aceites',
    descripcion: 'Bota roper con suela resistente, impermeable y repelente a líquidos y aceites. Estilo western de uso industrial.',
    composicion: 'Piel + Suela Impermeable',
    gramaje: 'Par',
    tallas: ['26', '27', '28', '29', '30'],
    detalles: ['Suela resistente', 'Impermeable', 'Repele líquidos y aceites', 'Múltiplo: 5 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/calzado/calzado_bota_roper.jpg',
    colores: [{ nombre: 'Café', hex: '#92400e' }],
    precios: {},
    precioDirecto: 549.90,
    empaque: '5 pares / Caja 19 pares'
  },

  // ==========================================
  // EPC — ROPA DE TRABAJO Y UNIFORMES
  // ==========================================
  {
    id: 'epc-chaleco-malla',
    sku: 'CHAL-ML',
    nombre: 'Chaleco de Malla',
    categoria: 'ropa-trabajo',
    subtitulo: 'Malla Transpirable · Franjas Reflejantes',
    descripcion: 'Chaleco de malla transpirable con franjas reflejantes en color fluorescente para alta visibilidad en zonas de trabajo.',
    composicion: 'Malla Poliéster Fluorescente',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Malla transpirable', 'Franjas reflejantes', 'Color fluorescente', 'Múltiplo: 25 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Naranja Fluorescente', hex: '#f97316' }, { nombre: 'Amarillo Fluorescente', hex: '#eab308' }],
    precios: {},
    precioDirecto: 44.90,
    empaque: '25 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-clase2',
    sku: 'CHAL-C2',
    nombre: 'Chaleco Clase 2',
    categoria: 'ropa-trabajo',
    subtitulo: 'Norma Clase 2 · Alta Visibilidad',
    descripcion: 'Chaleco de alta visibilidad Clase 2 en malla transpirable. Cumple norma de alta visibilidad para vialidad y construcción.',
    composicion: 'Malla Poliéster Fluorescente',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Norma Clase 2', 'Alta visibilidad', 'Malla transpirable', 'Múltiplo: 10 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Naranja', hex: '#f97316' }],
    precios: {},
    precioDirecto: 44.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-clase2-bolsas',
    sku: 'CHAL-C2B',
    nombre: 'Chaleco Clase 2 con Bolsas',
    categoria: 'ropa-trabajo',
    subtitulo: 'Clase 2 · Bolsillos Portaobjetos',
    descripcion: 'Chaleco Clase 2 de alta visibilidad con bolsillos portaobjetos y franjas reflejantes. Funcional para brigadistas y supervisores.',
    composicion: 'Malla Poliéster Fluorescente',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Norma Clase 2', 'Bolsillos portaobjetos', 'Franjas reflejantes', 'Múltiplo: 10 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Naranja', hex: '#f97316' }],
    precios: {},
    precioDirecto: 55.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-poliester-premium',
    sku: 'CHAL-POL',
    nombre: 'Chaleco Poliéster Premium',
    categoria: 'ropa-trabajo',
    subtitulo: 'Alta Durabilidad · Colores Fluorescentes',
    descripcion: 'Chaleco de poliéster premium de mayor durabilidad con colores fluorescentes de alta intensidad.',
    composicion: 'Poliéster Premium',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Mayor durabilidad', 'Colores fluorescentes', 'Poliéster premium', 'Múltiplo: 10 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 84.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-sport',
    sku: 'CHAL-SPT',
    nombre: 'Chaleco Sport de Malla',
    categoria: 'ropa-trabajo',
    subtitulo: 'Diseño Deportivo · Franjas Reflejantes',
    descripcion: 'Chaleco de malla de diseño deportivo con franjas reflejantes en espalda y frente para mayor visibilidad.',
    composicion: 'Malla Poliéster',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Diseño deportivo', 'Franjas reflejantes frente/espalda', 'Malla transpirable', 'Múltiplo: 10 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 89.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-led',
    sku: 'CHAL-LED',
    nombre: 'Chaleco de Malla Luz LED',
    categoria: 'ropa-trabajo',
    subtitulo: 'Sistema de Luces LED Integrado',
    descripcion: 'Chaleco de malla transpirable con sistema de luces LED integrado para máxima visibilidad nocturna en zonas de trabajo.',
    composicion: 'Malla Poliéster + Sistema LED',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Luces LED integradas', 'Malla transpirable', 'Máxima visibilidad nocturna', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 194.00,
    empaque: '5 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-rescatista',
    sku: 'CHAL-RES',
    nombre: 'Chaleco Rescatista Desprendible',
    categoria: 'ropa-trabajo',
    subtitulo: 'Cierre Rápido · Franjas en X',
    descripcion: 'Chaleco rescatista con cierre desprendible de seguridad rápida y franjas reflejantes en X. Para brigadas de emergencia.',
    composicion: 'Poliéster / Malla',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Cierre desprendible rápido', 'Franjas reflejantes en X', 'Para brigadas', 'Múltiplo: 10 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 102.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-cazador',
    sku: 'CHAL-CAZ',
    nombre: 'Chaleco Cazador',
    categoria: 'ropa-trabajo',
    subtitulo: 'Múltiples Bolsas Tácticas · Multifuncional',
    descripcion: 'Chaleco cazador multifuncional con múltiples bolsas tácticas para herramientas, radio y accesorios.',
    composicion: 'Poliéster Resistente',
    gramaje: 'Multitalla',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL', 'XXXL'],
    detalles: ['Múltiples bolsas tácticas', 'Diseño multifuncional', 'Para supervisores/técnicos', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 355.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-chaleco-brigadista-premium',
    sku: 'CHAL-BRP',
    nombre: 'Chaleco Brigadista Premium',
    categoria: 'ropa-trabajo',
    subtitulo: 'Material Reforzado · Múltiples Bolsillos',
    descripcion: 'Chaleco brigadista premium con material reforzado, múltiples bolsillos y solapas para portación de equipos de emergencia.',
    composicion: 'Poliéster / Cordura Reforzado',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Material reforzado', 'Múltiples bolsillos', 'Solapas incluidas', 'Múltiplo: 10 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 147.90,
    empaque: '10 pz / Caja 50 pz'
  },
  {
    id: 'epc-chaleco-brigadista-std',
    sku: 'CHAL-BRS',
    nombre: 'Chaleco Brigadista Estándar',
    categoria: 'ropa-trabajo',
    subtitulo: 'Bolsillos Radio/Plumas · Franjas Reflejantes',
    descripcion: 'Chaleco brigadista estándar con bolsillos para radio y plumas, y franjas reflejantes de alta visibilidad.',
    composicion: 'Poliéster',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Bolsillos radio/plumas', 'Franjas reflejantes alta visibilidad', 'Funcional y cómodo', 'Múltiplo: 10 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 139.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-ligero-malla',
    sku: 'CHAL-LME',
    nombre: 'Chaleco Ligero Espalda de Malla',
    categoria: 'ropa-trabajo',
    subtitulo: 'Frente con Bolsas · Espalda Malla',
    descripcion: 'Chaleco ligero con frente cerrado con bolsas y espalda en malla para ventilación. Diseño funcional para campo.',
    composicion: 'Poliéster / Malla',
    gramaje: 'Unitalla',
    tallas: ['Unitalla'],
    detalles: ['Frente con bolsas', 'Espalda en malla', 'Ventilación trasera', 'Múltiplo: 10 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 139.90,
    empaque: '10 pz / Caja 100 pz'
  },
  {
    id: 'epc-chaleco-regio',
    sku: 'CHAL-REG',
    nombre: 'Chaleco Regio',
    categoria: 'ropa-trabajo',
    subtitulo: 'Estilo Institucional · Acabados Premium',
    descripcion: 'Chaleco Regio de estilo institucional con acabados de alta calidad. Ideal para supervisores, ejecutivos y personal de campo.',
    composicion: 'Poliéster de Alta Densidad',
    gramaje: 'Multitalla',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL', 'XXXL'],
    detalles: ['Estilo institucional', 'Acabados de alta calidad', 'Múltiples bolsillos', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 275.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-overol-laminado',
    sku: 'OVER-LAM',
    nombre: 'Overol Laminado',
    categoria: 'ropa-trabajo',
    subtitulo: 'Impermeable · Protección Química · Zipper',
    descripcion: 'Overol laminado impermeable con protección contra salpicaduras químicas y cierre zipper con solapa de seguridad.',
    composicion: 'PP Laminado',
    gramaje: 'Talla Completa',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL', 'XXXL'],
    detalles: ['Impermeable', 'Protección salpicaduras químicas', 'Zipper con solapa', 'Múltiplo: 10 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 72.90,
    empaque: '10 pz / Caja 50 pz'
  },
  {
    id: 'epc-overol-gabardina',
    sku: 'OVER-GAB',
    nombre: 'Overol Gabardina con Reflejante',
    categoria: 'ropa-trabajo',
    subtitulo: 'Gabardina Industrial · Franjas Reflejantes',
    descripcion: 'Overol de gabardina industrial con bolsillos funcionales y franjas reflejantes. Para trabajo pesado en campo.',
    composicion: 'Gabardina 65/35 Poliéster/Algodón',
    gramaje: 'Industrial',
    tallas: ['36', '38', '40', '42', '44', '46'],
    detalles: ['Gabardina industrial', 'Bolsillos funcionales', 'Franjas reflejantes', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 489.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-faja-lumbar',
    sku: 'FAJA-LUM',
    nombre: 'Faja Lumbar 3er Cinto',
    categoria: 'ropa-trabajo',
    subtitulo: 'Doble Ajuste · Tirantes Reforzados',
    descripcion: 'Faja lumbar con tercer cinto de ajuste doble y tirantes reforzados para máximo soporte lumbar en jornadas de carga.',
    composicion: 'Tela Técnica Elástica',
    gramaje: 'Soporte Lumbar',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL'],
    detalles: ['Cinto de ajuste doble', 'Tirantes reforzados', 'Soporte lumbar', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 169.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-camisa-mezclilla',
    sku: 'CAM-MEZ',
    nombre: 'Camisa de Mezclilla',
    categoria: 'ropa-trabajo',
    subtitulo: 'Algodón Resistente · Con/Sin Reflejante',
    descripcion: 'Camisa de mezclilla de algodón resistente con bolsillos funcionales. Disponible con o sin franjas reflejantes.',
    composicion: '100% Algodón Mezclilla',
    gramaje: 'Industrial',
    tallas: ['CH', 'M', 'G', 'XL', 'XXL', 'XXXL'],
    detalles: ['Algodón resistente', 'Bolsillos funcionales', 'Con reflejante $379.90', 'Sin reflejante $325.00'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Azul Mezclilla', hex: '#1d4ed8' }],
    precios: {},
    precioDirecto: 325.00,
    empaque: '5 pz / Caja 20 pz'
  },
  {
    id: 'epc-pantalon-mezclilla',
    sku: 'PAN-MEZ',
    nombre: 'Pantalón de Mezclilla',
    categoria: 'ropa-trabajo',
    subtitulo: 'Mezclilla Industrial · Costuras Reforzadas',
    descripcion: 'Pantalón de mezclilla industrial con costuras reforzadas. Disponible con o sin franjas reflejantes.',
    composicion: '100% Algodón Mezclilla Industrial',
    gramaje: 'Industrial',
    tallas: ['28', '30', '32', '34', '36', '38', '40', '42'],
    detalles: ['Mezclilla industrial', 'Costuras reforzadas', 'Sin reflejante $284.90', 'Con reflejante $349.90'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
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
    subtitulo: 'Protección contra Suciedad y Salpicaduras',
    descripcion: 'Mandil de mezclilla lavable para protección contra suciedad y salpicaduras. Disponible con o sin bolsa.',
    composicion: '100% Algodón Mezclilla',
    gramaje: 'Mandil',
    tallas: ['Unitalla'],
    detalles: ['Protección salpicaduras', 'Lavable', 'Con bolsa $89.90 / Sin bolsa $79.90', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Azul Mezclilla', hex: '#1d4ed8' }],
    precios: {},
    precioDirecto: 89.90,
    empaque: '5 pz / Caja 50 pz'
  },
  {
    id: 'epc-manga-carnaza',
    sku: 'MAN-CAR',
    nombre: 'Mangas de Carnaza',
    categoria: 'ropa-trabajo',
    subtitulo: 'Resistencia a Chispas y Calor',
    descripcion: 'Mangas de carnaza resistentes a chispas y calor para soldadura. No lavables en agua.',
    composicion: 'Carnaza de Vaqueta',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Resistentes a chispas', 'Resistentes al calor', 'No lavables en agua', 'Múltiplo: 5 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 84.90,
    empaque: '5 pares / Caja 50 pares'
  },
  {
    id: 'epc-manga-anticorte',
    sku: 'MAN-AC',
    nombre: 'Manga Anticorte',
    categoria: 'ropa-trabajo',
    subtitulo: 'Nivel 5 (A5) · Cómoda y Ligera',
    descripcion: 'Manga anticorte Nivel 5 (A5) cómoda y ligera para protección de brazos en operaciones de corte y manejo de materiales.',
    composicion: 'HPPE / Fibra Anticorte',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Anticorte Nivel A5', 'Cómoda y ligera', 'Protección de brazos', 'Múltiplo: 12 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 98.90,
    empaque: '12 pares / Caja 120 pares'
  },
  {
    id: 'epc-impermeable-gabardina',
    sku: 'IMP-GAB',
    nombre: 'Impermeable Gabardina',
    categoria: 'ropa-trabajo',
    subtitulo: 'Zipper con Solapa · Bandas Reflejantes',
    descripcion: 'Impermeable estilo gabardina con zipper y solapa de protección. Incluye bandas reflejantes para visibilidad nocturna.',
    composicion: 'Gabardina Impermeable PVC',
    gramaje: 'Impermeable',
    tallas: ['M', 'XL'],
    detalles: ['Estilo gabardina', 'Zipper con solapa', 'Bandas reflejantes', 'Múltiplo: 1 pz / Caja: 20 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 139.00,
    empaque: '1 pz / Caja 20 pz'
  },
  {
    id: 'epc-rodilleras-capsula',
    sku: 'ROD-CAP',
    nombre: 'Rodilleras Cápsula Policarbonato',
    categoria: 'ropa-trabajo',
    subtitulo: 'Cápsula Rígida · Acolchado Interior · Alta Movilidad',
    descripcion: 'Rodilleras con cápsula rígida de policarbonato e interior acolchado. Alta movilidad para trabajo en pisos y construcción.',
    composicion: 'Policarbonato + Espuma EVA',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Cápsula rígida PC', 'Interior acolchado', 'Alta movilidad', 'Múltiplo: 5 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 149.00,
    empaque: '5 pares / Caja 50 pares'
  },
  {
    id: 'epc-polaina-carnaza',
    sku: 'POL-CAR',
    nombre: 'Polaina de Carnaza',
    categoria: 'ropa-trabajo',
    subtitulo: 'Protección contra Chispas y Abrasión',
    descripcion: 'Polaina de carnaza para protección de piernas contra chispas y abrasión en soldadura. No lavable en agua.',
    composicion: 'Carnaza de Vaqueta',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['Protección chispas', 'Resistente a abrasión', 'No lavable en agua', 'Múltiplo: 5 pares'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 84.90,
    empaque: '5 pares / Caja 50 pares'
  },

  // ==========================================
  // EPC — PROTECCIÓN A LAS ALTURAS
  // ==========================================
  {
    id: 'epc-arnes-1aro',
    sku: 'ARN-1A',
    nombre: 'Arnés Cuerpo Completo 1 Aro',
    categoria: 'alturas',
    subtitulo: 'Resistencia hasta 5,000 lbs (22 kN)',
    descripcion: 'Arnés de cuerpo completo con 1 aro dorsal de conexión. Poliéster de alta resistencia, soporta hasta 5,000 lbs (22 kN).',
    composicion: 'Poliéster de Alta Resistencia',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['1 aro dorsal', 'Resistencia 5,000 lbs (22 kN)', 'Poliéster alta resistencia', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 599.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-arnes-3aros',
    sku: 'ARN-3A',
    nombre: 'Arnés Cuerpo Completo 3 Aros',
    categoria: 'alturas',
    subtitulo: '3 Aros de Conexión · 5,000 lbs (22 kN)',
    descripcion: 'Arnés de cuerpo completo con 3 aros de conexión (dorsal, pectoral y lateral). Resistencia al impacto de 5,000 lbs.',
    composicion: 'Poliéster de Alta Resistencia',
    gramaje: 'Par',
    tallas: ['Unitalla'],
    detalles: ['3 aros de conexión', 'Resistencia 5,000 lbs (22 kN)', 'Poliéster alta resistencia', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 619.99,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-linea-vida-doble',
    sku: 'LDV-DBL',
    nombre: 'Línea de Vida Doble Gancho Grande',
    categoria: 'alturas',
    subtitulo: 'Doble Conexión · Transiciones Seguras · 5,000 lbs',
    descripcion: 'Línea de vida con doble gancho grande para transiciones seguras entre puntos de anclaje. Capacidad 5,000 lbs.',
    composicion: 'Poliéster / Ganchos Acero Inoxidable',
    gramaje: '1.2 m / 1.8 m',
    tallas: ['Unitalla'],
    detalles: ['Doble línea de conexión', 'Transiciones seguras', '5,000 lbs (22 kN)', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 609.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-linea-vida-simple',
    sku: 'LDV-SMP',
    nombre: 'Línea de Vida 1 Gancho Grande',
    categoria: 'alturas',
    subtitulo: '1 Gancho · Conexión Arnés-Anclaje · 5,000 lbs',
    descripcion: 'Línea de vida simple con 1 gancho grande para conexión segura del arnés al punto de anclaje. Capacidad 5,000 lbs.',
    composicion: 'Poliéster / Gancho Acero',
    gramaje: '1.2 m / 1.8 m',
    tallas: ['Unitalla'],
    detalles: ['1 gancho grande', 'Conexión arnés-anclaje', '5,000 lbs (22 kN)', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 499.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-arnes-linea-kit',
    sku: 'ARN-KIT',
    nombre: 'Arnés con Línea de Vida',
    categoria: 'alturas',
    subtitulo: 'Kit Integral · Capacidad Máx. 140 kg',
    descripcion: 'Kit integral que incluye arnés de cuerpo completo + línea de vida. Capacidad máxima 140 kg. Listo para trabajos en altura.',
    composicion: 'Poliéster Alta Resistencia + Acero',
    gramaje: 'Kit Completo',
    tallas: ['Unitalla'],
    detalles: ['Kit arnés + línea de vida', 'Capacidad máx. 140 kg', 'Listo para uso', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 989.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-punto-fijo',
    sku: 'PNT-FIJ',
    nombre: 'Punto Fijo',
    categoria: 'alturas',
    subtitulo: 'Anclaje de Alta Resistencia',
    descripcion: 'Punto fijo de anclaje de alta resistencia para sujeción segura en trabajos en altura. Compatible con arneses estándar.',
    composicion: 'Acero Galvanizado',
    gramaje: 'Anclaje',
    tallas: ['Unitalla'],
    detalles: ['Anclaje alta resistencia', 'Sujeción segura', 'Compatible con arneses', 'Múltiplo: 5 pz'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [],
    precios: {},
    precioDirecto: 129.90,
    empaque: '5 pz / Caja 15 pz'
  },

  // ==========================================
  // EPC — LIMITACIÓN VIAL
  // ==========================================
  {
    id: 'epc-trafitambo',
    sku: 'TRAF-2R',
    nombre: 'Trafitambo 2 Reflejantes',
    categoria: 'vial',
    subtitulo: '120 cm Altura · Franjas Reflejantes Fluorescentes',
    descripcion: 'Trafitambo de aprox. 120 cm de altura con 2 franjas reflejantes y color fluorescente para delimitación de zonas de obra.',
    composicion: 'Polietileno Flexible',
    gramaje: '~2.5 kg',
    tallas: ['N/A'],
    detalles: ['Altura ~120 cm', 'Franjas reflejantes', 'Color fluorescente', 'Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Naranja/Blanco', hex: '#f97316' }],
    precios: {},
    precioDirecto: 585.00,
    empaque: '1 pz'
  },
  {
    id: 'epc-poste-limitador',
    sku: 'POST-LIM',
    nombre: 'Poste Limitador con Reflejante',
    categoria: 'vial',
    subtitulo: '120 cm · Franjas Reflejantes',
    descripcion: 'Poste limitador de aprox. 120 cm con franjas reflejantes para delimitación de zonas de trabajo y vialidad.',
    composicion: 'Polietileno de Alta Densidad',
    gramaje: 'Unitario',
    tallas: ['N/A'],
    detalles: ['Altura ~120 cm', 'Franjas reflejantes', 'Resistente', 'Múltiplo: 5 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Naranja', hex: '#f97316' }],
    precios: {},
    precioDirecto: 395.00,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-malla-delimitadora',
    sku: 'MALLA-DEL',
    nombre: 'Malla Delimitadora',
    categoria: 'vial',
    subtitulo: '1.20 m Alto × 30 m Largo · UV',
    descripcion: 'Malla delimitadora de 1.20 m de alto por 30 m de largo, resistente a rayos UV para delimitación de perímetros.',
    composicion: 'Polietileno UV Fluorescente',
    gramaje: 'Rollo 30 m',
    tallas: ['N/A'],
    detalles: ['1.20 m alto × 30 m largo', 'Resistente a UV', 'Múltiplo: 5 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Naranja Fluorescente', hex: '#f97316' }],
    precios: {},
    precioDirecto: 364.90,
    empaque: '5 pz / Caja 25 pz'
  },
  {
    id: 'epc-banderola-malla',
    sku: 'BAND-ML',
    nombre: 'Banderola de Malla Reflejante',
    categoria: 'vial',
    subtitulo: 'Fluorescente · Reflejante · Resistente UV',
    descripcion: 'Banderola de malla fluorescente con franjas reflejantes y resistencia UV para señalización y delimitación.',
    composicion: 'Malla Fluorescente + Banda Reflejante',
    gramaje: 'Unitaria',
    tallas: ['N/A'],
    detalles: ['Malla fluorescente', 'Franjas reflejantes', 'Resistente UV', 'Múltiplo: 5 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Naranja/Plata', hex: '#f97316' }],
    precios: {},
    precioDirecto: 41.90,
    empaque: '5 pz / Caja 15 pz'
  },
  {
    id: 'epc-cono-vial',
    sku: 'CONO-VL',
    nombre: 'Cono Vial con Reflejantes',
    categoria: 'vial',
    subtitulo: 'Base Pesada · Antivolcable · 3 Tamaños',
    descripcion: 'Cono vial con franjas reflejantes y base ancha pesada para evitar vuelcos. Disponible en 3 tamaños. Envío no incluido.',
    composicion: 'PVC Flexible',
    gramaje: 'Pequeño/Mediano/Grande',
    tallas: ['Pequeño', 'Mediano', 'Grande'],
    detalles: ['Base ancha pesada', 'Franjas reflejantes', 'Pequeño $89.90 / Med $195.00 / Grande $279.00', 'Múltiplo: 5 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [{ nombre: 'Naranja Fluorescente', hex: '#f97316' }],
    precios: {},
    precioDirecto: 89.90,
    empaque: '5 pz / Atado 15 pz'
  },
  {
    id: 'epc-cinta-limitadora',
    sku: 'CINT-LIM',
    nombre: 'Cinta Limitadora',
    categoria: 'vial',
    subtitulo: 'Rollo 300 m · PRECAUCIÓN / PELIGRO',
    descripcion: 'Cinta limitadora en rollo de 300 metros en colores llamativos con leyendas "PRECAUCIÓN" o "PELIGRO" para señalización de zonas de riesgo.',
    composicion: 'Polietileno Flexible',
    gramaje: 'Rollo 300 m',
    tallas: ['N/A'],
    detalles: ['Rollo 300 metros', 'Colores llamativos', 'PRECAUCIÓN o PELIGRO', 'Múltiplo: 5 pz · Envío NO incluido'],
    tecnicas: [],
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Amarillo/Negro (Precaución)', hex: '#eab308' },
      { nombre: 'Rojo/Blanco (Peligro)', hex: '#dc2626' }
    ],
    precios: {},
    precioDirecto: 54.90,
    empaque: '5 pz / Caja 50 pz'
  }
];


export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

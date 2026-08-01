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
  categoria?: 'textiles' | 'calzado' | 'accesorios';
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Negro/Azul', hex: '#1e293b' },
      { nombre: 'Negro/Amarillo', hex: '#eab308' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Bull Fight Café', hex: '#78350f' },
      { nombre: 'Bull Fight Negro', hex: '#17222B' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Micro Negro/Cuña Gris', hex: '#475569' },
      { nombre: 'Micro Negro/Cuña Negro-Azul', hex: '#1e3a8a' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Micro Negro/Rosa', hex: '#f43f5e' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Micro Negro', hex: '#17222B' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Crazy Café', hex: '#92400e' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Piel Grasso Café', hex: '#78350f' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Napa Café', hex: '#854d0e' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Micro Negro', hex: '#17222B' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Negro/Azul', hex: '#1d4ed8' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Piel Negro', hex: '#17222B' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Negro/Azul', hex: '#2563eb' },
      { nombre: 'Negro/Amarillo', hex: '#eab308' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Negro/Amarillo', hex: '#eab308' },
      { nombre: 'Negro/Azul', hex: '#2563eb' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Negro/Fiusha', hex: '#ec4899' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Calcetín Negro', hex: '#17222B' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Negro/Azul', hex: '#2563eb' },
      { nombre: 'Negro/Amarillo', hex: '#eab308' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Piel Engrasada Café', hex: '#78350f' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Piel Grasso Café', hex: '#78350f' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Micro Negro', hex: '#17222B' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Negro Industrial', hex: '#17222B' }
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
    imagenPrincipal: '/images/no-image.svg',
    colores: [
      { nombre: 'Amarillo/Negro', hex: '#eab308' }
    ],
    precios: {},
    precioDirecto: 48.90
  }
];


export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

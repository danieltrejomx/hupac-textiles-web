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
  precioUnitario: number;
  precioMayoreo?: number;
  tallas: string[];
  detalles: string[];
  tecnicas: string[];
  imagenPrincipal: string;
  colores: ProductColor[];
}

export const PRODUCTS: Product[] = [
  {
    id: '32603-playera-max-caballero',
    estilo: 'ESTILO 32603',
    nombre: 'Playera Max',
    subtitulo: 'Caballero · 100% Algodón · 190 g/m²',
    descripcion: 'Playera clásica de peso completo para caballero. Confección robusta en algodón peinado premium para alta durabilidad, confort y retención de color.',
    composicion: '100% Algodón',
    gramaje: '190 g/m²',
    precioUnitario: 110,
    precioMayoreo: 95,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Cuello de punto reforzado', 'Doble costura en dobladillos', 'Tapa costura de hombro a hombro'],
    tecnicas: ['Serigrafía', 'Impresión Directa (DTG)', 'Termotransferencia', 'Bordado'],
    imagenPrincipal: '/images/img_3.webp',
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
    ]
  },
  {
    id: '32702-playera-prime-caballero',
    estilo: 'ESTILO 32702',
    nombre: 'Playera Prime',
    subtitulo: 'Caballero · 100% Algodón · 155 g/m²',
    descripcion: 'Playera ligera de tacto suave para caballero, ideal para climas templados o eventos masivos que requieren frescura y movilidad.',
    composicion: '100% Algodón',
    gramaje: '155 g/m²',
    precioUnitario: 95,
    precioMayoreo: 80,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Silueta regular fit', 'Tejido suave pre-encogido', 'Ideal para estampados detallados'],
    tecnicas: ['Serigrafía', 'Impresión Directa (DTG)', 'Termotransferencia'],
    imagenPrincipal: '/images/img_4.webp',
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
    ]
  },
  {
    id: '34401-playera-premium-caballero',
    estilo: 'ESTILO 34401',
    nombre: 'Playera Premium',
    subtitulo: 'Caballero · 100% Algodón Peinado · 150 g/m²',
    descripcion: 'Línea de playera Premium con algodón peinado ultrafino. Ofrece una superficie ultrasuave óptima para impresión digital y uso casual de alta calidad.',
    composicion: '100% Algodón Peinado',
    gramaje: '150 g/m²',
    precioUnitario: 120,
    precioMayoreo: 105,
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Algodón peinado de fibra larga', 'Ajuste modern regular fit', 'Textura sumamente tersa'],
    tecnicas: ['Impresión Directa (DTG)', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_3.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Vino', hex: '#5C1D24' },
      { nombre: 'Rey', hex: '#2456C4' }
    ]
  },
  {
    id: '30039-playera-stampa-caballero',
    estilo: 'ESTILO 30039',
    nombre: 'Playera Stampa',
    subtitulo: 'Caballero · 50% Algodón / 50% Poliéster · 155 g/m²',
    descripcion: 'Mezcla perfecta de algodón y poliéster que ofrece ligereza, resistencia y mínima arruga. Óptima para uniformes diarios y eventos corporativos.',
    composicion: '50% Algodón / 50% Poliéster',
    gramaje: '155 g/m²',
    precioUnitario: 90,
    precioMayoreo: 78,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Mezcla de fibras de alta resistencia', 'Secado rápido', 'Cero encogimiento'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_4.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ]
  },
  {
    id: '34400-playera-london-caballero',
    estilo: 'ESTILO 34400',
    nombre: 'Playera London',
    subtitulo: 'Caballero · 50% Algodón Peinado / 50% Poliéster · 140 g/m²',
    descripcion: 'Estilo jaspeado moderno con un peso de tela super ligero. Un fit sofisticado y textura premium ideal para un look corporativo casual.',
    composicion: '50% Algodón Peinado / 50% Poliéster',
    gramaje: '140 g/m²',
    precioUnitario: 105,
    precioMayoreo: 90,
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Textura jaspeada ultra suave', 'Costura lateral moderna', 'Cuello fino al tono'],
    tecnicas: ['Serigrafía', 'Termotransferencia', 'Sublimación (tonos claros)'],
    imagenPrincipal: '/images/img_3.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Rey Jaspe', hex: '#355FC4' },
      { nombre: 'Rojo Jaspe', hex: '#B83543' },
      { nombre: 'Ladrillo Jaspe', hex: '#A84C38' },
      { nombre: 'Turquesa Jaspe', hex: '#4EA8B8' },
      { nombre: 'Negro Jaspe', hex: '#2C2E33' },
      { nombre: 'Demin Blk Heather', hex: '#24272D' }
    ]
  },
  {
    id: '32582-playera-prime-dama',
    estilo: 'ESTILO 32582',
    nombre: 'Playera Prime Dama',
    subtitulo: 'Dama · 100% Algodón · 155 g/m²',
    descripcion: 'Playera con silueta ligeramente ajustada para dama. Confeccionada con algodón de peso medio para excelente caída y comodidad diaria.',
    composicion: '100% Algodón',
    gramaje: '155 g/m²',
    precioUnitario: 95,
    precioMayoreo: 80,
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Silueta femenina entallada', 'Cuello redondo con cárdigan fino', 'Hombros reforzados'],
    tecnicas: ['Serigrafía', 'Impresión Directa (DTG)', 'Termotransferencia'],
    imagenPrincipal: '/images/img_4.webp',
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
    ]
  },
  {
    id: '39028-playera-redondo-nino',
    estilo: 'ESTILO 39028',
    nombre: 'Playera Cuello Redondo Infantil/Juvenil',
    subtitulo: 'Niño · 100% Algodón · 185 g/m²',
    descripcion: 'Playera infantil y juvenil de algodón resistente de alto gramaje. Especialmente reforzada para soportar el juego y uso continuo.',
    composicion: '100% Algodón',
    gramaje: '185 g/m²',
    precioUnitario: 85,
    precioMayoreo: 75,
    tallas: ['ECH(04)', 'CH(06)', 'MD(08)', 'GD(10/12)', 'EG(14/16)'],
    detalles: ['Costura doble en cuello y hombro', 'Tintes hipoalergénicos', 'Tacto suave para piel sensible'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_3.webp',
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
    ]
  },
  {
    id: '39029-playera-asiluetada-nina',
    estilo: 'ESTILO 39029',
    nombre: 'Playera Asiluetada Infantil/Juvenil',
    subtitulo: 'Niña · 100% Algodón · 155 g/m²',
    descripcion: 'Playera con silueta ligeramente entallada para niñas y jóvenes. Material fresco e ideal para uniformes deportivos o escolares.',
    composicion: '100% Algodón',
    gramaje: '155 g/m²',
    precioUnitario: 85,
    precioMayoreo: 75,
    tallas: ['ECH(04)', 'CH(06)', 'MD(08)', 'GD(10/12)', 'EG(14/16)'],
    detalles: ['Corte asiluetado infantil', 'Cuello fino', 'Alta solidez de color'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_4.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rosa', hex: '#F3C4D3' },
      { nombre: 'Fiusha', hex: '#E6007E' }
    ]
  },
  {
    id: '34420-playera-subli-caballero',
    estilo: 'ESTILO 34420',
    nombre: 'Playera Subli',
    subtitulo: 'Caballero · 100% Poliéster · 160 g/m²',
    descripcion: 'Playera blanca de poliéster de tacto algodón especialmente diseñada para una perfecta sublimación a todo color.',
    composicion: '100% Poliéster',
    gramaje: '160 g/m²',
    precioUnitario: 80,
    precioMayoreo: 70,
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Tacto algodón ultra suave', 'Apta para sublimación directa', 'Secado rápido'],
    tecnicas: ['Sublimación total', 'Termotransferencia'],
    imagenPrincipal: '/images/img_3.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' }
    ]
  },
  {
    id: '32692-playera-heavy-manga-larga-caballero',
    estilo: 'ESTILO 32692',
    nombre: 'Playera Heavy Manga Larga',
    subtitulo: 'Caballero · 100% Algodón · 190 g/m²',
    descripcion: 'Playera manga larga de peso completo. Ideal para proteger en climas fríos o actividades operativas al aire libre.',
    composicion: '100% Algodón',
    gramaje: '190 g/m²',
    precioUnitario: 135,
    precioMayoreo: 120,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Puños tejidos de punto', 'Doble costura', 'Protección y abrigo confortables'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_3.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' }
    ]
  },
  {
    id: '38387-playera-max-cuello-v-caballero',
    estilo: 'ESTILO 38387',
    nombre: 'Playera Max Cuello V',
    subtitulo: 'Caballero · 100% Algodón · 140 g/m²',
    descripcion: 'Playera casual de corte regular con cuello en "V", confeccionada en algodón transpirable y ligero.',
    composicion: '100% Algodón',
    gramaje: '140 g/m²',
    precioUnitario: 110,
    precioMayoreo: 95,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Cuello en V bien estructurado', 'Silueta fluida y cómoda', 'Pre-encogida'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_4.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ]
  },
  {
    id: '31818-playera-prime-cuello-v-dama',
    estilo: 'ESTILO 31818',
    nombre: 'Playera Prime Cuello V Dama',
    subtitulo: 'Dama · 100% Algodón · 155 g/m²',
    descripcion: 'Playera con escote en "V" y silueta entallada. Textura suave ideal para uso diario o uniformes corporativos modernos.',
    composicion: '100% Algodón',
    gramaje: '155 g/m²',
    precioUnitario: 95,
    precioMayoreo: 80,
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Escote estilizado en V', 'Corte favorecedor en cintura', 'Costuras al tono'],
    tecnicas: ['Serigrafía', 'Impresión Directa (DTG)', 'Termotransferencia'],
    imagenPrincipal: '/images/img_4.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Amarillo', hex: '#F5BE18' },
      { nombre: 'Rosa', hex: '#F3C4D3' },
      { nombre: 'Aqua', hex: '#67C3CF' },
      { nombre: 'Fiusha', hex: '#E6007E' },
      { nombre: 'Morado', hex: '#5A2D63' }
    ]
  },
  {
    id: '34988-playera-snow-manga-corta-caballero',
    estilo: 'ESTILO 34988',
    nombre: 'Playera Snow Manga Corta',
    subtitulo: 'Caballero · 50% Algodón / 50% Poliéster · 140 g/m²',
    descripcion: 'Llamativa playera con efecto "Snow" jaspeado de tacto ultra suave. Excelente opción para eventos casuales y uniformes modernos.',
    composicion: '50% Algodón Peinado / 50% Poliéster',
    gramaje: '140 g/m²',
    precioUnitario: 125,
    precioMayoreo: 110,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Textura jaspeada efecto nieve', 'Tela extra ligera', 'Cárdigan de cuello ultra fino'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_3.webp',
    colores: [
      { nombre: 'Jaspe Negro', hex: '#2A2D34' },
      { nombre: 'Jaspe Acero', hex: '#707A8A' },
      { nombre: 'Jaspe Petróleo', hex: '#2A4D54' },
      { nombre: 'Jaspe Sepia', hex: '#7A6B58' },
      { nombre: 'Jaspe Claro', hex: '#E2E8F0' }
    ]
  },
  {
    id: '34990-playera-snow-cuello-v-dama',
    estilo: 'ESTILO 34990',
    nombre: 'Playera Snow Cuello V Dama',
    subtitulo: 'Dama · 50% Algodón / 50% Poliéster · 140 g/m²',
    descripcion: 'Playera con escote en "V" y efecto jaspeado "Snow". Corte asiluetado muy femenino y suave.',
    composicion: '50% Algodón Peinado / 50% Poliéster',
    gramaje: '140 g/m²',
    precioUnitario: 125,
    precioMayoreo: 110,
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Escote en V', 'Efecto jaspeado', 'Secado rápido'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_4.webp',
    colores: [
      { nombre: 'Jaspe Negro', hex: '#2A2D34' },
      { nombre: 'Jaspe Acero', hex: '#707A8A' },
      { nombre: 'Jaspe Jade', hex: '#4F7D6D' },
      { nombre: 'Jaspe Terracota', hex: '#B35E46' },
      { nombre: 'Jaspe Rosa Mexicano', hex: '#E04A8A' }
    ]
  },
  {
    id: '32633-polo-caballero',
    estilo: 'ESTILO 32633',
    nombre: 'Polo Caballero',
    subtitulo: 'Caballero · 100% Algodón · 230 g/m²',
    descripcion: 'Polo clásica piqué en algodón pesado con cuello y puños tejidos. Es la prenda de uniforme corporativo por excelencia.',
    composicion: '100% Algodón Piqué',
    gramaje: '230 g/m²',
    precioUnitario: 180,
    precioMayoreo: 165,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Aletilla reforzada de 3 botones', 'Aberturas laterales en base', 'Diseño óptimo para bordados corporativos'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_5.webp',
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
    ]
  },
  {
    id: '32626-polo-asiluetada-dama',
    estilo: 'ESTILO 32626',
    nombre: 'Polo Asiluetada Dama',
    subtitulo: 'Dama · 100% Algodón · 230 g/m²',
    descripcion: 'Prenda tipo polo clásica adaptada a la silueta femenina. Perfecta para personal de oficina, ventas o eventos.',
    composicion: '100% Algodón Piqué',
    gramaje: '230 g/m²',
    precioUnitario: 175,
    precioMayoreo: 160,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Corte curvo asiluetado', 'Aletilla fina con 4 botones', 'Excelente durabilidad en lavado'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_6.webp',
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
    ]
  },
  {
    id: '33981-polo-manga-larga-caballero',
    estilo: 'ESTILO 33981',
    nombre: 'Polo Manga Larga',
    subtitulo: 'Caballero · 100% Algodón · 230 g/m²',
    descripcion: 'Polo manga larga formal en tejido piqué pesado. Ideal para climas de transición y uniformes semi-formales de oficina o campo.',
    composicion: '100% Algodón Piqué',
    gramaje: '230 g/m²',
    precioUnitario: 200,
    precioMayoreo: 185,
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Puños tejidos rib finos', 'Aletilla con botones al tono', 'Hombros reforzados'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_5.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' }
    ]
  },
  {
    id: '36980-polo-supreme-caballero',
    estilo: 'ESTILO 36980',
    nombre: 'Polo Manga Corta Supreme',
    subtitulo: 'Caballero · 50% Algodón / 50% Poliéster · 210 g/m²',
    descripcion: 'Polo de mezcla premium peinada. Gran resistencia al desgaste y arrugas, secado ultra veloz y fit regular fit corporativo.',
    composicion: '50% Algodón Peinado / 50% Poliéster',
    gramaje: '210 g/m²',
    precioUnitario: 210,
    precioMayoreo: 190,
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Costuras reforzadas', 'No encoge ni pierde el color', 'Apta para lavados constantes'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_7.webp',
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
    id: '36981-polo-supreme-dama',
    estilo: 'ESTILO 36981',
    nombre: 'Polo Manga Corta Supreme Dama',
    subtitulo: 'Dama · 50% Algodón / 50% Poliéster · 210 g/m²',
    descripcion: 'Polo Supreme con corte femenino y aletilla adaptada. Mezcla de algodón y poliéster que garantiza durabilidad extrema.',
    composicion: '50% Algodón Peinado / 50% Poliéster',
    gramaje: '210 g/m²',
    precioUnitario: 210,
    precioMayoreo: 190,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Silueta femenina estilizada', 'Excelente transpirabilidad', 'Botones reforzados'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_7.webp',
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
    id: '32412-polo-infantil',
    estilo: 'ESTILO 32412',
    nombre: 'Polo Infantil',
    subtitulo: 'Infantil · 100% Algodón · 200 g/m²',
    descripcion: 'Polo clásica resistente y cómoda para uniforme escolar o deportivo de los más pequeños.',
    composicion: '100% Algodón Piqué',
    gramaje: '200 g/m²',
    precioUnitario: 140,
    precioMayoreo: 125,
    tallas: ['ECH(04)', 'CH(06)', 'MD(08)'],
    detalles: ['Cárdigan suave en cuello', 'Botones seguros', 'Ideal para uso diario escolar'],
    tecnicas: ['Bordado', 'Serigrafía'],
    imagenPrincipal: '/images/img_5.webp',
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
    ]
  },
  {
    id: '32417-polo-juvenil',
    estilo: 'ESTILO 32417',
    nombre: 'Polo Juvenil',
    subtitulo: 'Juvenil · 100% Algodón · 200 g/m²',
    descripcion: 'Playera tipo polo para jóvenes, con la comodidad del algodón y el ajuste óptimo para el día a día.',
    composicion: '100% Algodón Piqué',
    gramaje: '200 g/m²',
    precioUnitario: 150,
    precioMayoreo: 135,
    tallas: ['GD(10/12)', 'EG(14/16)'],
    detalles: ['Estructura resistente', 'Corte regular juvenil', 'Fácil lavado'],
    tecnicas: ['Bordado', 'Serigrafía'],
    imagenPrincipal: '/images/img_5.webp',
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
    ]
  },
  {
    id: '37326-playera-tank-top-caballero',
    estilo: 'ESTILO 37326',
    nombre: 'Playera Tank Top',
    subtitulo: 'Caballero · 100% Algodón · 150 g/m²',
    descripcion: 'Playera sin mangas para caballero. Estilo deportivo y fresco, ideal para actividades físicas intensas o climas cálidos.',
    composicion: '100% Algodón',
    gramaje: '150 g/m²',
    precioUnitario: 90,
    precioMayoreo: 78,
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Sisas y cuello ribeteados', 'Espalda olímpica', 'Tela ligera y transpirable'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_3.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rey', hex: '#2456C4' },
      { nombre: 'Heather', hex: '#c2c8d0' }
    ]
  },
  {
    id: '32873-tank-top-neon-dama',
    estilo: 'ESTILO 32873',
    nombre: 'Tank Top Neon Dama',
    subtitulo: 'Dama · 50% Algodón / 50% Poliéster · 140 g/m²',
    descripcion: 'Playera de tirantes para dama con colores neón muy llamativos. Ideal para fitness o marcas con identidad juvenil.',
    composicion: '50% Algodón / 50% Poliéster',
    gramaje: '140 g/m²',
    precioUnitario: 95,
    precioMayoreo: 82,
    tallas: ['CH', 'MD', 'GD', 'EG'],
    detalles: ['Colores vibrantes neón', 'Tirantes delgados', 'Espalda atlética'],
    tecnicas: ['Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_4.webp',
    colores: [
      { nombre: 'Fiusha Neón', hex: '#FF007F' },
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Rojo', hex: '#B22234' },
      { nombre: 'Rosa', hex: '#F3C4D3' },
      { nombre: 'Morado', hex: '#5A2D63' },
      { nombre: 'Turquesa', hex: '#3cc4d6' },
      { nombre: 'Amarillo', hex: '#F5BE18' }
    ]
  },
  {
    id: '38103-sudadera-capucha-cangurera-general',
    estilo: 'ESTILO 38103',
    nombre: 'Sudadera Capucha y Cangurera',
    subtitulo: 'General · 52% Algodón / 48% Poliéster · 267 g/m²',
    descripcion: 'Sudadera unisex con capucha ajustable y bolsillo frontal tipo cangurera. Calidez y tacto afelpado ideal para el frío.',
    composicion: '52% Algodón / 48% Poliéster',
    gramaje: '267 g/m²',
    precioUnitario: 290,
    precioMayoreo: 265,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Capucha con forro y cordón plano', 'Bolsillo de canguro amplio', 'Interior afelpado muy cálido'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Oxford', hex: '#4b5563' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ]
  },
  {
    id: '38102-sudadera-cuello-redondo-general',
    estilo: 'ESTILO 38102',
    nombre: 'Sudadera Cuello Redondo',
    subtitulo: 'General · 52% Algodón / 48% Poliéster · 267 g/m²',
    descripcion: 'Sudadera unisex clásica con cuello redondo. Un corte cómodo e ideal para combinar con uniformes ejecutivos u operativos.',
    composicion: '52% Algodón / 48% Poliéster',
    gramaje: '267 g/m²',
    precioUnitario: 270,
    precioMayoreo: 245,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Cuello redondo de cárdigan rib', 'Corte unisex regular fit', 'Material resistente al encogimiento'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Oxford', hex: '#4b5563' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ]
  },
  {
    id: '38105-sudadera-capucha-cierre-general',
    estilo: 'ESTILO 38105',
    nombre: 'Sudadera Capucha con Cierre',
    subtitulo: 'General · 52% Algodón / 48% Poliéster · 267 g/m²',
    descripcion: 'Sudadera con gorro y cierre metálico completo al frente. Ajustable y práctica para personal técnico o comercial.',
    composicion: '52% Algodón / 48% Poliéster',
    gramaje: '267 g/m²',
    precioUnitario: 320,
    precioMayoreo: 295,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Cierre metálico deslizante completo', 'Capucha con cordones', 'Cárdigan elástico en puños y pretina'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Oxford', hex: '#4b5563' },
      { nombre: 'Heather', hex: '#c2c8d0' },
      { nombre: 'Vino', hex: '#5C1D24' }
    ]
  },
  {
    id: '38106-pantalon-jogger-caballero',
    estilo: 'ESTILO 38106',
    nombre: 'Pantalón Tipo Jogger',
    subtitulo: 'Caballero · 52% Algodón / 48% Poliéster · 267 g/m²',
    descripcion: 'Pantalón deportivo tipo jogger para caballero. Ajuste cómodo y pretina elástica, ideal para gimnasios o empresas dinámicas.',
    composicion: '52% Algodón / 48% Poliéster',
    gramaje: '267 g/m²',
    precioUnitario: 250,
    precioMayoreo: 230,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Tobillos acanalados con cárdigan', 'Cintura elástica con cordón ajustable', 'Bolsillos laterales prácticos'],
    tecnicas: ['Bordado', 'Serigrafía'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Negro', hex: '#17222B' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Oxford', hex: '#4b5563' },
      { nombre: 'Heather', hex: '#c2c8d0' }
    ]
  },
  {
    id: '38132-pantalon-jogger-juvenil',
    estilo: 'ESTILO 38132',
    nombre: 'Pantalón Tipo Jogger Juvenil',
    subtitulo: 'Juvenil · 52% Algodón / 48% Poliéster · 300 g/m²',
    descripcion: 'Jogger de felpa extra pesada para jóvenes. Calidez inigualable y ajuste seguro para uniformes deportivos escolares.',
    composicion: '52% Algodón / 48% Poliéster',
    gramaje: '300 g/m²',
    precioUnitario: 220,
    precioMayoreo: 200,
    tallas: ['10-12', '14-16'],
    detalles: ['Felpa térmica gruesa', 'Excelente resistencia a roturas', 'Pretina reforzada'],
    tecnicas: ['Bordado', 'Serigrafía'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Oxford', hex: '#4b5563' },
      { nombre: 'Heather', hex: '#c2c8d0' }
    ]
  },
  {
    id: '38129-sudadera-capucha-cangurera-juvenil',
    estilo: 'ESTILO 38129',
    nombre: 'Sudadera Capucha y Cangurera Juvenil',
    subtitulo: 'Juvenil · 52% Algodón / 48% Poliéster · 250 g/m²',
    descripcion: 'Sudadera con gorro para jóvenes. Excelente balance de abrigo y ligereza para uso cotidiano.',
    composicion: '52% Algodón / 48% Poliéster',
    gramaje: '250 g/m²',
    precioUnitario: 240,
    precioMayoreo: 220,
    tallas: ['10-12', '14-16'],
    detalles: ['Cordones seguros (anti-ahogo)', 'Bolsillo frontal grande', 'Puños elásticos'],
    tecnicas: ['Bordado', 'Serigrafía', 'Termotransferencia'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Oxford', hex: '#4b5563' },
      { nombre: 'Heather', hex: '#c2c8d0' }
    ]
  },
  {
    id: '35003-camisa-manga-larga-caballero',
    estilo: 'ESTILO 35003',
    nombre: 'Camisa Manga Larga Caballero',
    subtitulo: 'Caballero · Algodón / Poliéster · 145 g/m²',
    descripcion: 'Camisa ejecutiva formal con cuello estructurado. Mezcla fresca fácil de planchar y excelente presencia.',
    composicion: '60% Algodón / 40% Poliéster',
    gramaje: '145 g/m²',
    precioUnitario: 240,
    precioMayoreo: 215,
    tallas: ['CH', 'M', 'G', 'XG'],
    detalles: ['Cuello con botones ocultos', 'Costuras finas de vestir', 'Bolsillo de pecho clásico'],
    tecnicas: ['Bordado corporativo'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Cielo', hex: '#AECDE8' }
    ]
  },
  {
    id: '51774-pantalon-gabardina-caballero',
    estilo: 'ESTILO 51774',
    nombre: 'Pantalón de Gabardina Caballero',
    subtitulo: 'Caballero · 100% Algodón · 7 oz/yd²',
    descripcion: 'Pantalón formal operativo de gabardina ligera de algodón. Cómodo y duradero para oficinas y campo.',
    composicion: '100% Algodón Gabardina',
    gramaje: '7 oz/yd²',
    precioUnitario: 340,
    precioMayoreo: 310,
    tallas: ['28', '30', '32', '34', '36', '38', '40', '42'],
    detalles: ['Cierre y botón reforzados', 'Pinzas frontales para mejor caída', 'Bolsillos formales traseros'],
    tecnicas: ['Bordado'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Khaki', hex: '#A99A6B' }
    ]
  },
  {
    id: '35001-camisa-manga-larga-dama',
    estilo: 'ESTILO 35001',
    nombre: 'Camisa Manga Larga Dama',
    subtitulo: 'Dama · Algodón / Poliéster · 145 g/m²',
    descripcion: 'Camisa de vestir para dama con pinzas de ajuste al frente y espalda que realzan la figura corporativa.',
    composicion: '60% Algodón / 40% Poliéster',
    gramaje: '145 g/m²',
    precioUnitario: 240,
    precioMayoreo: 215,
    tallas: ['CH', 'M', 'G', 'XG'],
    detalles: ['Pinzas entalladas femeninas', 'Puño ajustable con doble botón', 'Cuello elegante formal'],
    tecnicas: ['Bordado corporativo'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Cielo', hex: '#AECDE8' }
    ]
  },
  {
    id: '51783-pantalon-gabardina-dama',
    estilo: 'ESTILO 51783',
    nombre: 'Pantalón de Gabardina Dama',
    subtitulo: 'Dama · 100% Algodón · 7 oz/yd²',
    descripcion: 'Pantalón de vestir de gabardina de algodón con silueta para dama. Ofrece excelente comodidad y durabilidad.',
    composicion: '100% Algodón Gabardina',
    gramaje: '7 oz/yd²',
    precioUnitario: 340,
    precioMayoreo: 310,
    tallas: ['5', '7', '9', '11', '13', '15'],
    detalles: ['Corte confort dama', 'Resistente a arrugas', 'Bolsillos laterales discretos'],
    tecnicas: ['Bordado'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Marino', hex: '#132A52' },
      { nombre: 'Khaki', hex: '#A99A6B' }
    ]
  },
  {
    id: '35002-camisa-manga-corta-caballero',
    estilo: 'ESTILO 35002',
    nombre: 'Camisa Manga Corta Caballero',
    subtitulo: 'Caballero · Algodón / Poliéster · 145 g/m²',
    descripcion: 'Camisa manga corta fresca y formal, ideal para climas cálidos en oficinas corporativas y personal comercial.',
    composicion: '60% Algodón / 40% Poliéster',
    gramaje: '145 g/m²',
    precioUnitario: 220,
    precioMayoreo: 195,
    tallas: ['CH', 'M', 'G', 'XG'],
    detalles: ['Cuello de vestir estructurado', 'Bolsillo funcional en pecho', 'Costuras reforzadas al tono'],
    tecnicas: ['Bordado corporativo'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Cielo', hex: '#AECDE8' }
    ]
  },
  {
    id: '55151-pantalon-mezclilla-caballero',
    estilo: 'ESTILO 55151',
    nombre: 'Pantalón de Mezclilla Caballero',
    subtitulo: 'Caballero · 100% Algodón · 14 oz/yd²',
    descripcion: 'Pantalón de mezclilla industrial de peso completo (14 oz) para trabajo pesado de caballero.',
    composicion: '100% Algodón Mezclilla',
    gramaje: '14 oz/yd²',
    precioUnitario: 360,
    precioMayoreo: 330,
    tallas: ['28', '30', '32', '34', '36', '38', '40', '42'],
    detalles: ['Triple costura de seguridad', 'Mezclilla rígida de larga duración', 'Bolsillos y remaches metálicos'],
    tecnicas: ['Bordado'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Dark Stone', hex: '#2C3A47' }
    ]
  },
  {
    id: '35000-camisa-manga-corta-dama',
    estilo: 'ESTILO 35000',
    nombre: 'Camisa Manga Corta Dama',
    subtitulo: 'Dama · Algodón / Poliéster · 145 g/m²',
    descripcion: 'Camisa ejecutiva de manga corta para dama con silueta curvo-entallada que brinda frescura e imagen impecable.',
    composicion: '60% Algodón / 40% Poliéster',
    gramaje: '145 g/m²',
    precioUnitario: 220,
    precioMayoreo: 195,
    tallas: ['CH', 'MD', 'GD', 'EG', '2EG'],
    detalles: ['Corte asiluetado dama', 'Bolsillo discreto frontal', 'Apta para planchado fácil'],
    tecnicas: ['Bordado corporativo'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Blanco', hex: '#FFFFFF' },
      { nombre: 'Cielo', hex: '#AECDE8' }
    ]
  },
  {
    id: '55152-pantalon-mezclilla-dama',
    estilo: 'ESTILO 55152',
    nombre: 'Pantalón de Mezclilla Dama',
    subtitulo: 'Dama · 100% Algodón · 12 oz/yd²',
    descripcion: 'Pantalón de mezclilla para dama con excelente caída y grosor ideal para el trabajo operativo o comercial pesado.',
    composicion: '100% Algodón Mezclilla',
    gramaje: '12 oz/yd²',
    precioUnitario: 360,
    precioMayoreo: 330,
    tallas: ['5', '7', '9', '11', '13', '15'],
    detalles: ['Remaches de refuerzo', 'Ajuste confortable en cadera', 'Resistente a lavados continuos'],
    tecnicas: ['Bordado'],
    imagenPrincipal: '/images/img_8.webp',
    colores: [
      { nombre: 'Dark Stone', hex: '#2C3A47' }
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

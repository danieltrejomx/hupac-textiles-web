// lib/chatKnowledgeBase.ts
// Motor conversacional inteligente de HUPAC TEXTILES
// Basado en el Banco Maestro oficial (62 páginas) + Catálogo en vivo (PRODUCTS) + Secciones Web

import { PRODUCTS, Product } from '@/data/products';

export interface ActionLink {
  label: string;
  url: string;
}

export interface FAQItem {
  id: string;
  categoria: string;
  keywords: string[];
  intencion: string;
  respuesta: string;
  seguimiento?: string;
  catalogo?: string;
  escalamiento?: string;
  links?: ActionLink[];
}

export const FALLBACK_MESSAGE =
  "Lo siento, por el momento no cuento con esa información confirmada. Con gusto te comunico con nuestro equipo comercial para ayudarte directamente.";

export const CONTACT_INFO = {
  correoVentas: "ventas@hupactextiles.com",
  correoDivision: "divisiontextiles@grupohupac.com",
  whatsapp: "56 1287 0780",
  whatsappUrl: "https://wa.me/525612870780",
  telefonoPrincipal: "56 1287 0780",
  telefonoAdicional: "55 1625 7933",
  sitioWeb: "www.hupactextiles.mx",
  direccion: "Av. Laguna Luna 30, Col. Cumbria, Cuautitlán Izcalli, Estado de México, C.P. 54740",
  horario: "Lunes a viernes de 9:00 a 19:00 hrs y sábados de 10:00 a 14:00 hrs",
  redes: "Facebook, Instagram, TikTok y LinkedIn como Hupac Textiles"
};

// =========================================================================
// 1. DECODIFICADOR FONÉTICO Y DE TIPEOS (Tolerancia a ortografía y abreviaturas)
// =========================================================================

const TYPO_DICTIONARY: Record<string, string> = {
  // Agradecimientos
  grx: "gracias",
  grax: "gracias",
  grac: "gracias",
  grasias: "gracias",
  graciass: "gracias",
  graciasss: "gracias",
  thx: "gracias",
  agradecido: "gracias",
  // Saludos
  ola: "hola",
  holaa: "hola",
  holaaa: "hola",
  qtal: "que tal",
  wuenas: "buenas",
  // Peticiones
  kiero: "quiero",
  qiero: "quiero",
  qero: "quiero",
  nesesito: "necesito",
  necsito: "necesito",
  nesecito: "necesito",
  nesecitamos: "necesitamos",
  ocupo: "necesito",
  cupo: "necesito",
  ayudame: "ayuda",
  ayudeme: "ayuda",
  // Prendas y EPP
  unifome: "uniforme",
  unifomes: "uniformes",
  unifrmes: "uniformes",
  vestimenta: "uniforme",
  chaleko: "chaleco",
  chalekos: "chalecos",
  chalecos: "chaleco",
  chaleco: "chaleco",
  kamisa: "camisa",
  kamisas: "camisas",
  camisola: "camisa",
  camisolas: "camisas",
  camisas: "camisa",
  patalon: "pantalon",
  pantlones: "pantalones",
  pantalon: "pantalon",
  pantalones: "pantalon",
  mezcliya: "mezclilla",
  mesclilla: "mezclilla",
  votas: "botas",
  bota: "bota",
  botas: "bota",
  calzado: "calzado",
  zapatos: "calzado",
  zapato: "calzado",
  kasco: "casco",
  kascos: "cascos",
  cascco: "casco",
  cascos: "casco",
  casco: "casco",
  gwante: "guante",
  gwantes: "guantes",
  guantes: "guante",
  lentes: "lentes",
  gogles: "lentes",
  googles: "lentes",
  antiparras: "lentes",
  mameluco: "overol",
  oberol: "overol",
  overol: "overol",
  overoles: "overol",
  sueter: "sudadera",
  hoodie: "sudadera",
  cangurera: "sudadera",
  polos: "polo",
  playera: "playera",
  playeras: "playera",
  plallera: "playera",
  remera: "playera",
  // Técnicas
  vordado: "bordado",
  vordar: "bordado",
  bordar: "bordado",
  bordados: "bordado",
  cerigrafia: "serigrafia",
  serigrafia: "serigrafia",
  sublimasion: "sublimacion",
  sublimar: "sublimacion",
  estampado: "estampado",
  estampar: "estampado",
  // Términos comerciales
  presio: "precio",
  presios: "precios",
  cotisar: "cotizar",
  cotisacion: "cotizacion",
  cotisame: "cotizar",
  coticen: "cotizar",
  malloreo: "mayoreo",
  volumen: "mayoreo",
  distrivuidor: "distribuidor",
  distribuidres: "distribuidor",
  revendedor: "distribuidor",
  flete: "envio",
  embio: "envio",
  embios: "envios",
  refejante: "reflejante",
  reflejantes: "reflejante",
  reflectivo: "reflejante",
  reflectivas: "reflejante"
};

function collapseRepeatedLetters(word: string): string {
  return word.replace(/(.)\1{2,}/g, '$1$1');
}

function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export function decodeAndNormalizeQuery(raw: string): {
  normalized: string;
  decodedWords: string[];
} {
  const clean = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,:;()_\-—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = clean.split(" ").filter(w => w.length > 0);
  const decodedWords: string[] = [];

  for (const rawW of words) {
    let w = collapseRepeatedLetters(rawW);

    if (TYPO_DICTIONARY[w]) {
      w = TYPO_DICTIONARY[w];
    } else {
      let fixed = w
        .replace(/^k/, 'c')
        .replace(/^q([aeou])/, 'c$1')
        .replace(/z/g, 's')
        .replace(/ll/g, 'y');

      if (TYPO_DICTIONARY[fixed]) {
        w = TYPO_DICTIONARY[fixed];
      }
    }

    decodedWords.push(w);
  }

  return {
    normalized: decodedWords.join(" "),
    decodedWords
  };
}

// =========================================================================
// 2. BANCO MAESTRO DE PREGUNTAS Y RESPUESTAS (192 REGISTROS DEL PDF OFICIAL)
// =========================================================================

export const FAQ_DATABASE: FAQItem[] = [
  // -----------------------------------------------------------------------
  // CORTESÍA, AGRADECIMIENTOS Y CIERRES (CIE-001 a CIE-008)
  // -----------------------------------------------------------------------
  {
    id: "CIE-001",
    categoria: "Cierre y Agradecimiento",
    keywords: ["gracias", "muchas gracias", "mil gracias", "te agradezco", "muchas grasias", "agradecido", "muy amable", "excelente gracias", "ok gracias", "va gracias", "perfecto gracias", "gracias por la ayuda", "gracias ya me quedo claro"],
    intencion: "Cliente agradece y/o se despide",
    respuesta: "¡Con mucho gusto! Si te surge cualquier otra duda sobre uniformes, equipo de protección industrial o calzado de Hupac Textiles, aquí estaré para ayudarte. ¡Que tengas un excelente día!",
    seguimiento: "¿Hay alguna otra prenda, cotización o detalle que te gustaría revisar?",
    links: [
      { label: "Ver Catálogo de Uniformes", url: "/catalogo?catalogo=textil" },
      { label: "Abrir Configurador 3D", url: "/configurador" },
      { label: "WhatsApp Directo", url: "https://wa.me/525612870780" }
    ]
  },
  {
    id: "CIE-CONF",
    categoria: "Confirmación",
    keywords: ["ok", "okay", "sale", "va", "perfecto", "de acuerdo", "entendido", "enterado", "excelente", "esta bien", "bien", "super", "va que va", "clarisimo", "listo"],
    intencion: "Cliente confirma o asiente",
    respuesta: "¡Excelente! Si deseas cotizar alguna prenda específica, consultar tablas de tallas o probar tu logotipo en nuestro Configurador 3D, dime con toda confianza y te acompaño paso a paso.",
    seguimiento: "¿Qué prenda o equipo te gustaría explorar a continuación?",
    links: [
      { label: "Consultar Catálogo Completo", url: "/catalogo" },
      { label: "Abrir Configurador 3D", url: "/configurador" }
    ]
  },
  {
    id: "CIE-BYE",
    categoria: "Despedida",
    keywords: ["adios", "bye", "hasta luego", "nos vemos", "hasta pronto", "chao", "buenas noches", "me retiro", "luego te escribo"],
    intencion: "Cliente se despide",
    respuesta: "¡Hasta pronto! Fue un placer atenderte. Quedo a tus órdenes en Hupac Textiles las 24 horas para cuando lo necesites. ¡Que tengas mucho éxito en tu jornada!",
    seguimiento: "¡Hasta luego!",
    links: [
      { label: "Visitar hupactextiles.mx", url: "/" }
    ]
  },
  {
    id: "BIE-001",
    categoria: "Bienvenida",
    keywords: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "hey", "que tal", "saludos", "inicio", "buen dia", "hola buenas"],
    intencion: "Saludo inicial / apertura",
    respuesta: "¡Hola! Bienvenido(a) a Hupac Textiles. Con gusto te ayudamos a encontrar los uniformes empresariales, prendas de trabajo o equipo de seguridad industrial (EPP) que necesitas. ¿Qué estás buscando hoy?",
    seguimiento: "¿Buscas uniformes corporativos, equipo de protección industrial o calzado de seguridad?",
    links: [
      { label: "Uniformes Corporativos", url: "/catalogo?catalogo=textil" },
      { label: "Seguridad Industrial (EPP)", url: "/catalogo?catalogo=epc" },
      { label: "Configurador Visual 3D", url: "/configurador" }
    ]
  },
  {
    id: "BIE-002",
    categoria: "Bienvenida",
    keywords: ["ayuda", "informacion", "duda", "asesoria", "necesito informacion", "me pueden ayudar", "orientacion", "info porfa", "info"],
    intencion: "Solicitud de ayuda genérica",
    respuesta: "¡Claro que sí, para eso estamos! Cuéntame: ¿tu interés es en uniformes corporativos (playeras, polos, camisas, pantalones), equipo de protección industrial (cascos, guantes, chalecos, etc.) o calzado industrial?",
    seguimiento: "¿Es para uso personal o para tu empresa?",
    links: [
      { label: "Ver Catálogo Completo", url: "/catalogo" },
      { label: "Soluciones por Industria", url: "/industrias" }
    ]
  },
  {
    id: "BIE-003",
    categoria: "Bienvenida",
    keywords: ["robot", "bot", "inteligencia artificial", "eres una ia", "persona", "humano", "hablo con una persona", "automatico", "eres robot"],
    intencion: "Cliente pregunta si habla con un bot",
    respuesta: "Sí, soy el Asistente Virtual oficial de Hupac Textiles y estoy aquí para brindarte información inmediata de nuestros productos, telas, precios y servicios en el sitio web. Si en algún momento prefieres hablar directamente con un asesor humano de nuestro equipo comercial, con gusto te canalizo de inmediato.",
    seguimiento: "¿Quieres que continuemos por aquí o prefieres que te conecte con un asesor?",
    links: [
      { label: "Hablar con Asesor en WhatsApp", url: "https://wa.me/525612870780" }
    ]
  },
  {
    id: "BIE-005",
    categoria: "Bienvenida",
    keywords: ["horario", "abiertos", "hora atienden", "sabados", "atienden hoy", "dias de atencion", "a que hora abren", "hasta que hora"],
    intencion: "Horario de atención oficial",
    respuesta: "Nuestro horario de atención oficial de oficinas y planta es de lunes a viernes de 9:00 a 19:00 hrs y sábados de 10:00 a 14:00 hrs. Yo, como asistente virtual, estoy disponible las 24 horas del día en el sitio web para resolver tus dudas y ayudarte a cotizar.",
    seguimiento: "¿Deseas dejar tu consulta lista para que el equipo comercial le dé seguimiento?",
    links: [
      { label: "Contactar en Horario Laboral", url: "https://wa.me/525612870780" }
    ]
  },
  {
    id: "BIE-006",
    categoria: "Identidad",
    keywords: ["donde estan", "ubicacion", "direccion", "tienda fisica", "visitar", "cuautitlan", "estado de mexico", "recoger pedido", "oficinas", "sucursal", "domicilio"],
    intencion: "Ubicación o visita presencial",
    respuesta: "Nuestras oficinas y centro de operaciones se encuentran en Av. Laguna Luna 30, Col. Cumbria, Cuautitlán Izcalli, Estado de México, C.P. 54740. Si deseas visitarnos o recoger un pedido, te recomendamos coordinarlo antes con un asesor para confirmar disponibilidad.",
    seguimiento: "¿Te gustaría que un asesor te contacte para agendar tu visita o confirmar recolección?",
    links: [
      { label: "Conoce Nuestra Ubicación", url: "/nosotros" }
    ]
  },
  {
    id: "BIE-010",
    categoria: "Identidad",
    keywords: ["que venden", "a que se dedican", "que productos manejan", "cuentame de la empresa", "servicios que ofrecen"],
    intencion: "Qué hace Hupac Textiles",
    respuesta: "Hupac Textiles es una empresa 100% mexicana con más de 30 años de experiencia especializada en:\n1. Uniformes corporativos e industriales (playeras, polos, camisas, pantalones y sudaderas).\n2. Equipo de protección personal e industrial EPP (cascos, guantes, chalecos, lentes, calzado de seguridad y arneses).\n3. Servicios de personalización textil (bordado industrial, serigrafía, DTF, sublimación y vinil textil).",
    seguimiento: "¿Hay alguna categoría en particular que te interese revisar?",
    links: [
      { label: "Ver Catálogo Completo", url: "/catalogo" },
      { label: "Soluciones por Industria", url: "/industrias" }
    ]
  },
  {
    id: "IDE-001",
    categoria: "Identidad",
    keywords: ["quienes son", "sobre la empresa", "historia", "que es hupac", "cuanto tiempo tienen", "anos de experiencia", "experiencia textil"],
    intencion: "Historia y respaldo de Hupac Textiles",
    respuesta: "Hupac Textiles es una empresa 100% mexicana con más de 30 años de experiencia en la confección de uniformes empresariales y transformación de fibras de algodón y sintéticas para producir hilados, tejidos, acabados y prendas de vestir. Fabricamos aproximadamente 14 millones de prendas al año y contamos además con una línea especializada en equipo de protección personal (EPP) fundada en 2005.",
    seguimiento: "¿Te gustaría conocer nuestra línea de uniformes o la de seguridad industrial?",
    links: [
      { label: "Conoce más en Nosotros", url: "/nosotros" }
    ]
  },

  // -----------------------------------------------------------------------
  // FUNCIONALIDADES WEB EXCLUSIVAS (CONFIGURADOR 3D, PAGOS, DISTRIBUIDORES)
  // -----------------------------------------------------------------------
  {
    id: "WEB-CONF-001",
    categoria: "Configurador",
    keywords: ["configurador", "configurador 3d", "probar logo", "ver mi logo", "subir logo", "disenar uniforme", "mockup", "simulador", "como se ve mi logo", "personalizar 3d", "vista 3d"],
    intencion: "Uso del Configurador Visual 3D",
    respuesta: "¡Contamos con un Configurador Visual 3D interactivo en la web! Te permite:\n1. Elegir entre Polo Piqué, Playera Cuello Redondo, Camisa de Vestir o Camisa de Mezclilla (con o sin reflejante).\n2. Seleccionar el color institucional exacto.\n3. Cargar el archivo de tu logotipo (PNG, JPG o SVG).\n4. Mover y escalar libremente tu logo en vista frontal o trasera.\n5. Generar un ticket formal de cotización y enviarlo por WhatsApp.",
    seguimiento: "¿Te gustaría probar el configurador ahora mismo?",
    links: [
      { label: "Ir al Configurador Visual 3D", url: "/configurador" }
    ]
  },
  {
    id: "WEB-PAY-001",
    categoria: "Pagos",
    keywords: ["como pagar", "metodos de pago", "formas de pago", "tarjeta", "tarjeta de credito", "debito", "mercado pago", "spei", "oxxo", "efectivo", "transferencia", "como comprar", "pagar en linea"],
    intencion: "Métodos de pago y Checkout",
    respuesta: "Puedes realizar tu compra directamente en nuestra tienda en línea mediante Mercado Pago de forma 100% segura. Aceptamos:\n• Tarjetas de crédito y débito (Visa, Mastercard, American Express).\n• Transferencias interbancarias SPEI.\n• Pagos en efectivo en tiendas de conveniencia (OXXO).\n\nNo cobramos ningún recargo extra por IVA en el checkout; pagas exactamente el precio publicado del producto.",
    seguimiento: "¿Deseas explorar los productos para agregar al carrito?",
    links: [
      { label: "Ver Carrito de Compras", url: "/checkout" },
      { label: "Ver Catálogo", url: "/catalogo" }
    ]
  },
  {
    id: "WEB-DIST-001",
    categoria: "Distribuidores",
    keywords: ["distribuidor", "distribuidores", "revender", "precio distribuidor", "mayoreo distribuidor", "ser distribuidor", "requisitos distribuidor", "distribucion", "reventa"],
    intencion: "Programa de Distribuidores Autorizados",
    respuesta: "Ofrecemos nuestro Programa de Distribuidores Autorizados HUPAC, ideal para comercializadores de uniformes y EPP. Beneficios:\n• Precios preferenciales y márgenes de ganancia directo de fábrica.\n• Inventario garantizado para entrega inmediata sin esperas de confección.\n• Envíos consolidados a toda la República Mexicana.\n• Catálogos digitales y soporte comercial dedicado.\n\nPuedes registrarte con tus datos comerciales en nuestra página de Distribuidores.",
    seguimiento: "¿Te gustaría llenar el formulario de registro para distribuidores?",
    links: [
      { label: "Ir a Distribuidores", url: "/distribuidores" },
      { label: "Contactar por WhatsApp", url: "https://wa.me/525612870780" }
    ]
  },
  {
    id: "WEB-IND-001",
    categoria: "Industrias",
    keywords: ["industrias", "industria", "giros", "que uniforme para mi empresa", "automotriz", "construccion", "manufactura", "logistica", "seguridad privada", "mineria", "petroleo", "obra"],
    intencion: "Soluciones por Industria",
    respuesta: "En Hupac Textiles desarrollamos paquetes normativos para 6 sectores industriales clave:\n1. Manufactura & Maquiladora (antiestático, algodón peinado, alta duración).\n2. Automotriz & Talleres (mezclilla ruda, gabardina resistente a grasas).\n3. Construcción & Obra Civil (alta visibilidad con reflejantes, cascos y botas).\n4. Logística & Almacenes (prendas transpirables, chalecos brigadista, fajas).\n5. Seguridad Privada (camisas tácticas, pantalones comando, botas operativas).\n6. Minería, Energía & Petróleo (retardante a flama, dieléctrico y arco eléctrico).",
    seguimiento: "¿De qué sector es tu empresa para darte la recomendación exacta?",
    links: [
      { label: "Ver Soluciones por Industria", url: "/industrias" }
    ]
  },

  // -----------------------------------------------------------------------
  // UNIFORMES CORPORATIVOS (UNI-001 a UNI-016)
  // -----------------------------------------------------------------------
  {
    id: "UNI-001",
    categoria: "Uniformes",
    keywords: ["uniformes", "ropa corporativa", "ropa de trabajo", "uniforme para empresa", "uniformar personal", "camisas", "playeras", "pantalones"],
    intencion: "Disponibilidad general de uniformes",
    respuesta: "Sí, manejamos una línea completa de uniformes corporativos de confección 100% nacional:\n• Playeras de cuello redondo (modelos MAX, PRIME, PREMIUM peinado, STAMPA, LONDON, SUBLI).\n• Playeras tipo polo (Caballero, Dama asiluetada, Supreme piqué reforzado, infantil y juvenil).\n• Camisas de vestir (manga larga y corta, en blanco y cielo) y Camisas de mezclilla (con o sin reflejante).\n• Pantalones de gabardina 100% algodón y pantalones de mezclilla dark stone.\n• Sudaderas cuello redondo, con capucha y cangurera.",
    seguimiento: "¿Buscas un uniforme formal de oficina o prendas operativas de uso rudo?",
    links: [
      { label: "Ver Catálogo Textil", url: "/catalogo?catalogo=textil" }
    ]
  },
  {
    id: "UNI-002",
    categoria: "Uniformes",
    keywords: ["pantalon", "pantalones", "gabardina", "pantalon de vestir", "pantalon azul marino", "pantalon beige", "pantalon khaki", "p51774", "51783"],
    intencion: "Pantalones de gabardina",
    respuesta: "Contamos con pantalón de gabardina 100% algodón para caballero (estilo P51774) y dama (estilo 51783), disponible en color marino y khaki (beige). Se combinan de forma ideal con nuestras camisas de vestir manga larga o corta.",
    seguimiento: "¿Necesitas también la camisa a juego? Tenemos manga larga y manga corta en blanco y azul cielo.",
    links: [
      { label: "Ver Pantalones en Catálogo", url: "/catalogo?cat=pantalones" }
    ]
  },
  {
    id: "UNI-003",
    categoria: "Uniformes",
    keywords: ["jeans", "mezclilla", "pantalon de mezclilla", "dark stone", "55151", "55152", "pantalones de mezclilla"],
    intencion: "Pantalones de mezclilla de trabajo",
    respuesta: "Tenemos pantalón de mezclilla 100% algodón en color dark stone, disponible para caballero (estilo 55151) y dama (estilo 55152), de corte recto y alta resistencia ante trabajo pesado.",
    seguimiento: "¿Te interesa también la camisa de mezclilla a juego?",
    links: [
      { label: "Ver Mezclilla en Catálogo", url: "/catalogo?cat=pantalones" }
    ]
  },
  {
    id: "UNI-004",
    categoria: "Uniformes",
    keywords: ["camisas", "camisa de vestir", "camisa blanca", "camisa azul cielo", "camisa manga larga", "camisa manga corta"],
    intencion: "Camisas de vestir para oficina",
    respuesta: "Manejamos camisas de vestir en algodón/poliéster de planchado fácil, manga larga y manga corta, para caballero y dama, en color blanco y cielo (azul claro). También disponemos de camisa de mezclilla y camisa de mezclilla con franjas reflejantes para personal operativo.",
    seguimiento: "¿La camisa es para personal administrativo o para personal de campo/operación?",
    links: [
      { label: "Ver Camisas en Catálogo", url: "/catalogo?cat=camisas" }
    ]
  },
  {
    id: "UNI-005",
    categoria: "Uniformes",
    keywords: ["camisa con reflejante", "camisa mezclilla reflejante", "franjas reflectivas", "alta visibilidad"],
    intencion: "Camisa de mezclilla con reflejante",
    respuesta: "Sí, contamos con camisa de mezclilla con franjas reflejantes de alta visibilidad, ideal para personal que labora en campo, vialidades o en condiciones nocturnas, además de la versión sin reflejante para uso general.",
    seguimiento: "¿Cuántas piezas necesitas y en qué tallas?",
    links: [
      { label: "Ver Camisa Reflejante", url: "/catalogo?cat=camisas" }
    ]
  },
  {
    id: "UNI-006",
    categoria: "Uniformes",
    keywords: ["playera", "playeras", "playera max", "playera prime", "playera premium", "stampa", "london", "subli", "cuello redondo", "manga larga", "tank top"],
    intencion: "Modelos de playera",
    respuesta: "Contamos con varios modelos de playera:\n• Premium (34401): 100% algodón peinado, tacto suave premium.\n• Max (30038): 100% algodón peso completo resistente (200 g/m²).\n• Prime (30037): 100% algodón suave y fresca (155 g/m²).\n• Stampa (30039): Mezcla 50% algodón / 50% poliéster, ideal para serigrafía.\n• London (30040): 100% algodón con efecto jaspeado.\n• Subli (30041): 100% poliéster especial para sublimación.",
    seguimiento: "¿La playera es para personalizar con bordado o estampado, o la necesitas lisa?",
    links: [
      { label: "Ver Playeras en Catálogo", url: "/catalogo?cat=playeras" }
    ]
  },
  {
    id: "UNI-007",
    categoria: "Uniformes",
    keywords: ["polo", "polos", "playera polo", "polo dama", "polo caballero", "supreme", "pique"],
    intencion: "Playeras tipo polo",
    respuesta: "Sí, manejamos polo caballero y dama (corte asiluetado), en manga corta y manga larga, además de la línea Supreme (tejido piqué reforzado 50% algodón / 50% poliéster, 230 g/m²) y versiones infantil y juvenil. Se pueden personalizar con bordado, serigrafía o DTF.",
    seguimiento: "¿Cuántas personas necesitas uniformar con polo?",
    links: [
      { label: "Ver Polos en Catálogo", url: "/catalogo?cat=polos" }
    ]
  },
  {
    id: "UNI-008",
    categoria: "Uniformes",
    keywords: ["sudaderas", "sudadera", "hoodie", "chamarra", "cangurera", "sudadera con capucha", "sudadera con cierre", "jogger"],
    intencion: "Sudaderas corporativas",
    respuesta: "Sí, contamos con sudadera capucha y cangurera, sudadera cuello redondo y sudadera capucha con cierre, en tela de algodón/poliéster resistente y cálida, además de versiones juveniles (capucha cangurera y jogger).",
    seguimiento: "¿La necesitas lisa o con logo bordado/estampado?",
    links: [
      { label: "Ver Sudaderas en Catálogo", url: "/catalogo?cat=sudaderas" }
    ]
  },
  {
    id: "UNI-009",
    categoria: "Uniformes",
    keywords: ["tallas", "que tallas manejan", "tallas grandes", "2eg", "talla infantil", "hasta que talla"],
    intencion: "Tallas disponibles",
    respuesta: "En playeras, polos y sudaderas para adulto manejamos tallas CH, MD, GD, EG y 2EG. En línea infantil manejamos ECH (04), CH (06) y MD (08), y en juvenil GD (10-12) y EG (14-16). Los pantalones de vestir y mezclilla se manejan por número de cintura.",
    seguimiento: "¿Qué tallas necesitas para validar existencias exactas por modelo?",
    links: [
      { label: "Consultar Catálogo Textil", url: "/catalogo?catalogo=textil" }
    ]
  },
  {
    id: "UNI-011",
    categoria: "Uniformes",
    keywords: ["colores", "que colores manejan", "color vino", "color azul", "colores disponibles", "carta de color"],
    intencion: "Colores de prendas",
    respuesta: "Manejamos una carta de color muy amplia: blanco, negro, marino, rojo, azul rey, turquesa, cielo, acero, naranja, esmeralda, gris, khaki, mango, café, morado, vino, amarillo, rosa, aqua, fiusha, además de tonos jaspeados y dark stone, según el modelo.",
    seguimiento: "¿Qué color corporativo necesitas para confirmarte si el modelo lo maneja?",
    links: [
      { label: "Ver Colores en Catálogo", url: "/catalogo?catalogo=textil" }
    ]
  },

  // -----------------------------------------------------------------------
  // SERVICIOS DE PERSONALIZACIÓN TEXTIL (PER-001 a PER-014)
  // -----------------------------------------------------------------------
  {
    id: "PER-001",
    categoria: "Personalización",
    keywords: ["personalizar", "poner logo", "bordado", "estampado", "serigrafia", "dtf", "sublimacion", "vinil textil", "impresion", "letras en la ropa"],
    intencion: "Técnicas de personalización disponibles",
    respuesta: "Ofrecemos personalización mediante 5 técnicas profesionales:\n• Bordado Industrial: En relieve con hilos de poliéster de alta tenacidad (ideal para camisas, polos y chamarras).\n• Serigrafía Textil: Tintas plastisol y ecológicas para corridas de alto volumen con excelente costo-beneficio.\n• DTF Textil: Impresión digital directa a film en alta definición (ideal para degradados y detalles finos sobre cualquier tela).\n• Sublimación: Pigmentación transferida por calor en prendas de poliéster (como playera SUBLI), sin tacto.\n• Vinil Textil: Termotransferencia de alta resistencia perfecta para logotipos sólidos, nombres y franjas reflejantes.",
    seguimiento: "¿Tu logo es a un solo color, varios colores, o tiene degradados/fotografía?",
    links: [
      { label: "Ver Técnicas y Animaciones", url: "/servicios" },
      { label: "Probar en Configurador 3D", url: "/configurador" }
    ]
  },
  {
    id: "PER-002",
    categoria: "Personalización",
    keywords: ["diferencia bordado y estampado", "que dura mas bordado o estampado", "cual es mejor bordado o serigrafia"],
    intencion: "Diferencia entre bordado y estampado",
    respuesta: "El bordado cose hilos sobre la tela en relieve; es un método artesanal, de máxima durabilidad y acabado ejecutivo para polos y camisas. El estampado (serigrafía, DTF o sublimación) transfiere tintas mediante calor, siendo ideal para diseños con muchos colores, fotografías o letras muy pequeñas, además de ser más económico en pedidos grandes.",
    seguimiento: "¿Para qué tipo de prenda requieres el logotipo: playera, polo o camisa?",
    links: [
      { label: "Ver Comparativa en Servicios", url: "/servicios" }
    ]
  },
  {
    id: "PER-008",
    categoria: "Personalización",
    keywords: ["formato de logo", "archivo de logo", "en que formato mando el logo", "vectorial", "pdf logo", "png logo"],
    intencion: "Formato de archivo para personalización",
    respuesta: "Idealmente recibimos el logotipo en formato vectorial (AI de Illustrator, EPS o PDF vectorizado) o en imagen de alta resolución (PNG o JPG a 300 DPI con fondo transparente). Esto garantiza que el ponchado de bordado o la placa de serigrafía queden con la máxima nitidez.",
    seguimiento: "¿Cuentas con tu logotipo en formato digital para compartirlo con el equipo de diseño?",
    links: [
      { label: "Subir y Probar Logo en 3D", url: "/configurador" }
    ]
  },
  {
    id: "PER-012",
    categoria: "Personalización",
    keywords: ["logo en pecho y espalda", "varios logos", "espalda y frente", "manga", "personalizar varios lados"],
    intencion: "Personalización en más de una zona",
    respuesta: "Sí, es totalmente posible personalizar más de una zona de la prenda (por ejemplo, logo bordado en el pecho izquierdo, estampado grande en la espalda y bandera o nombre en la manga), e incluso combinar técnicas distintas en la misma prenda.",
    seguimiento: "¿Qué diseño llevaría cada zona de la prenda?",
    links: [
      { label: "Probar Vistas en Configurador 3D", url: "/configurador" }
    ]
  },

  // -----------------------------------------------------------------------
  // SEGURIDAD INDUSTRIAL (EPP) Y CALZADO (EPP-001 a EPP-016, CAL-001 a CAL-012)
  // -----------------------------------------------------------------------
  {
    id: "EPP-001",
    categoria: "EPP",
    keywords: ["epp", "seguridad industrial", "cascos", "guantes", "lentes", "chalecos", "arneses", "equipo de proteccion"],
    intencion: "Línea completa de EPP",
    respuesta: "Nuestra división de Seguridad Industrial (EPP) incluye:\n• Protección Craneal: Cascos tipo mundial y ala ancha con suspensión de 8 puntos, barboquejos y capuchas.\n• Protección Visual: Lentes Nemesis, goggles Trilogy cerrados, polarizados y sobrelentes.\n• Protección de Manos: Guantes anticorte nivel 5, nylon/nitrilo, carnaza, argonero y soldador con Kevlar.\n• Ropa Industrial: Chalecos clase 2 con reflejante, chalecos brigadista, overoles de gabardina y laminados.\n• Calzado: Botas industriales con casquillo de acero y bota roper vaquera (tallas 22 al 30).\n• Alturas & Vial: Arneses de 1 y 3 aros, líneas de vida, conos reflejantes y trafitambos.",
    seguimiento: "¿Qué actividad realiza el personal que necesita el equipo?",
    links: [
      { label: "Explorar Catálogo EPP", url: "/catalogo?catalogo=epc" }
    ]
  },
  {
    id: "EPP-002",
    categoria: "EPP",
    keywords: ["casco", "cascos", "casco de construccion", "casco con matraca", "casco ala ancha", "casco mundial"],
    intencion: "Cascos de seguridad",
    respuesta: "Manejamos casco de protección tipo mundial (con y sin matraca de ajuste) y casco de ala ancha (también con opción de matraca), fabricados en polietileno de alto impacto con sistema de suspensión de 8 puntos, disponibles en varios colores normativos y talla única ajustable.",
    seguimiento: "¿Prefieres el ajuste con matraca (más preciso) o el ajuste estándar?",
    links: [
      { label: "Ver Cascos en Catálogo", url: "/catalogo?cat=cabeza" }
    ]
  },
  {
    id: "EPP-004",
    categoria: "EPP",
    keywords: ["lentes", "lentes de seguridad", "goggles", "nemesis", "trilogy", "lentes polarizados", "sobrelentes"],
    intencion: "Lentes y protección visual",
    respuesta: "Manejamos varios modelos de protección visual: lente básico transparente/oscuro, lente tipo Nemesis (incluye versión camuflaje), goggle Trilogy (cerrado hermético), lente de pasta dura polarizado, sobrelente (para usar sobre lentes graduados) y monogoggle ventilado.",
    seguimiento: "¿Necesitas protección contra impacto, contra polvo/partículas o contra el sol (polarizado)?",
    links: [
      { label: "Ver Protección Visual", url: "/catalogo?cat=visual" }
    ]
  },
  {
    id: "EPP-005",
    categoria: "EPP",
    keywords: ["guantes", "guante", "guante anticorte", "guantes de trabajo", "guante de nitrilo", "guante soldador", "carnaza", "kevlar"],
    intencion: "Guantes de protección",
    respuesta: "Manejamos una variedad amplia: guantes de nylon con nitrilo o poliuretano, guantes anticorte nivel 5 (anti-impacto, palma nitrilo o PU), guante inspector de poliéster, guante japonés (algodón, con puntos PVC o palma látex), guante de carnaza (corto y largo), guante argonero, guante para soldador con hilo Kevlar y guante nitrilo desechable.",
    seguimiento: "¿Para qué actividad necesitas el guante: manejo general, corte, soldadura, químicos o electricidad?",
    links: [
      { label: "Ver Guantes en Catálogo", url: "/catalogo?cat=manos" }
    ]
  },
  {
    id: "EPP-009",
    categoria: "EPP",
    keywords: ["chaleco", "chalecos", "chaleco reflejante", "chaleco brigadista", "chaleco clase 2", "chaleco con bolsas", "chaleco led"],
    intencion: "Chalecos de seguridad y brigadista",
    respuesta: "Tenemos una amplia variedad: chaleco de malla, chaleco clase 2 (con y sin bolsas), chaleco poliéster premium, chaleco sport de malla, chaleco con luces LED, chaleco rescatista desprendible, chaleco cazador, chaleco brigadista (premium y estándar) y chaleco regio.",
    seguimiento: "¿El chaleco es para uso vial/construcción, para brigada de emergencias o para identificación de personal?",
    links: [
      { label: "Ver Chalecos en Catálogo", url: "/catalogo?cat=vial" }
    ]
  },
  {
    id: "EPP-010",
    categoria: "EPP",
    keywords: ["overol", "overoles", "mameluco", "overol de gabardina", "overol desechable", "overol con reflejante"],
    intencion: "Overoles industriales",
    respuesta: "Manejamos overol laminado (desechable microporoso, con capucha) para protección contra partículas y polvos, y overol de gabardina 100% algodón con franjas reflejantes de uso rudo en tallas de la 36 a la 46.",
    seguimiento: "¿El overol es para protección contra polvos/pintura (desechable) o para trabajo mecánico/operativo diario (gabardina)?",
    links: [
      { label: "Ver Overoles en Catálogo", url: "/catalogo?cat=ropa" }
    ]
  },
  {
    id: "CAL-001",
    categoria: "Calzado",
    keywords: ["calzado", "bota", "botas", "bota industrial", "bota de seguridad", "bota de casquillo", "bota roper", "vaquera", "tallas calzado", "zapatos de seguridad"],
    intencion: "Calzado industrial y botas de trabajo",
    respuesta: "Manejamos calzado industrial de alta durabilidad en piel de ganado vacuno con suela antiderrapante y resistente a aceites y químicos ligeros. Modelos destacados:\n• Bota Industrial con casquillo de acero (tallas del 22 al 30/31).\n• Bota Roper tipo vaquera de tubo alto (tallas 26 al 30).\n• Accesorios: Plantillas de confort y protectores metatarsales.",
    seguimiento: "¿El calzado es para construcción, manufactura, almacén o trabajo en campo?",
    links: [
      { label: "Ver Calzado en Catálogo", url: "/catalogo?cat=calzado" }
    ]
  },
  {
    id: "CAL-004",
    categoria: "Calzado",
    keywords: ["casquillo", "casquillo de acero", "antiderrapante", "dieléctrico", "proteccion calzado"],
    intencion: "Protección y casquillo del calzado",
    respuesta: "Nuestro calzado industrial cuenta con protección contra impactos mediante casquillo de acero, suela antiderrapante y resistencia química básica ante aceites, en piel de ganado vacuno con excelente flexión.",
    seguimiento: "¿Cuántos pares necesitas y en qué tallas?",
    links: [
      { label: "Ver Calzado Industrial", url: "/catalogo?cat=calzado" }
    ]
  },

  // -----------------------------------------------------------------------
  // CATÁLOGOS DIGITALES (CAT-001 a CAT-016)
  // -----------------------------------------------------------------------
  {
    id: "CAT-001",
    categoria: "Catálogos",
    keywords: ["catalogo", "catalogos", "descargar catalogo", "catalogo pdf", "ver catalogo", "mandar catalogo", "catalogo digital", "catalogos pdf"],
    intencion: "Catálogos digitales en PDF",
    respuesta: "Contamos con tres catálogos digitales completos que puedes consultar y descargar en línea de forma gratuita:\n1. Catálogo de Uniformes Corporativos (playeras, polos, camisas, pantalones, sudaderas).\n2. Catálogo Industrial EPP (cascos, guantes, chalecos, lentes, arneses).\n3. Catálogo de Calzado Industrial.",
    seguimiento: "¿Cuál de los tres catálogos te gustaría descargar o revisar primero?",
    links: [
      { label: "Descargar Catálogo Textil (PDF)", url: "/catalogo-textil-hupac.pdf" },
      { label: "Descargar Catálogo Industrial EPP (PDF)", url: "/catalogo-epc-industrial-2026.pdf" },
      { label: "Descargar Catálogo General (PDF)", url: "/catalogo-hupac.pdf" },
      { label: "Explorar Catálogo Web", url: "/catalogo" }
    ]
  },

  // -----------------------------------------------------------------------
  // PRECIOS, COTIZACIONES Y MAYOREO (PRE-001 a PRE-014)
  // -----------------------------------------------------------------------
  {
    id: "PRE-001",
    categoria: "Precios",
    keywords: ["precio", "precios", "cuanto cuesta", "cuanto vale", "costo", "cotizar", "cotizacion", "presupuesto", "precio porfa", "dame precios"],
    intencion: "Precios y cotizaciones",
    respuesta: "Manejamos precios muy competitivos directo de fábrica, escalonados por volumen (a mayor número de piezas, menor precio unitario). Para darte la cifra exacta, compárteme qué prenda o producto te interesa, cantidades aproximadas y si requiere bordado o estampado con tu logotipo.",
    seguimiento: "¿Qué modelo y cantidad aproximada estás considerando para cotizarte?",
    links: [
      { label: "Consultar Precios en Catálogo", url: "/catalogo" },
      { label: "Solicitar Cotización en WhatsApp", url: "https://wa.me/525612870780" }
    ]
  },
  {
    id: "PRE-005",
    categoria: "Precios",
    keywords: ["mayoreo", "precio mayoreo", "descuento por volumen", "comprar por mayoreo", "descuentos", "escalas de precio"],
    intencion: "Precios de mayoreo por volumen",
    respuesta: "Sí, manejamos escalas de precios por volumen directo de fábrica (por ejemplo de 12 a 71 piezas, 72 a 143, 144 a 287, y más de 288 piezas), tanto para prendas textiles como para equipo de protección y calzado. A mayor volumen de tu pedido, obtienes el mejor precio unitario.",
    seguimiento: "¿Cuántas piezas tienes en mente para aplicarte la escala de mayoreo correspondiente?",
    links: [
      { label: "Ver Precios en Catálogo", url: "/catalogo" },
      { label: "Cotizar Mayoreo en WhatsApp", url: "https://wa.me/525612870780" }
    ]
  },
  {
    id: "PRE-006",
    categoria: "Precios",
    keywords: ["iva", "incluye iva", "mas iva", "factura con iva", "impuestos"],
    intencion: "Precios e impuestos (IVA)",
    respuesta: "En nuestros catálogos impresos los precios se muestran más IVA; en cambio, en nuestra tienda web y checkout los precios se muestran claros. Al solicitar cotización formal con el equipo comercial, se te entrega el desglose exacto con IVA al 16% para facturación fiscal deducible al 100%.",
    seguimiento: "¿Requieres factura con RFC empresarial para tu compra?",
    links: [
      { label: "Ver Precios en Tienda", url: "/catalogo" }
    ]
  },

  // -----------------------------------------------------------------------
  // LOGÍSTICA Y ENVÍOS (LOG-001 a LOG-010)
  // -----------------------------------------------------------------------
  {
    id: "LOG-001",
    categoria: "Logística",
    keywords: ["envio", "envios", "flete", "entrega", "cobertura", "cuanto tarda", "a donde envian", "monterrey", "guadalajara", "republica", "toda la republica", "envian a domicilio"],
    intencion: "Envíos y cobertura nacional",
    respuesta: "Realizamos envíos a toda la República Mexicana mediante convenios con las principales paqueterías y transportes de carga consolidada. El tiempo de entrega estándar es de 3 a 7 días hábiles según destino y volumen. También ofrecemos recolección directa en nuestro centro de operaciones de Cuautitlán Izcalli, Estado de México.",
    seguimiento: "¿A qué código postal o ciudad requieres el envío?",
    links: [
      { label: "Ver en Nosotros", url: "/nosotros" }
    ]
  },
  {
    id: "LOG-006",
    categoria: "Logística",
    keywords: ["pickup", "recoger", "recoger en persona", "pasar por el pedido", "recoleccion en tienda"],
    intencion: "Recolección en sucursal / planta",
    respuesta: "Sí, es posible coordinar la recolección directa en nuestras instalaciones de Cuautitlán Izcalli, Estado de México, previa confirmación de que tu pedido ya se encuentra listo y empacado.",
    seguimiento: "¿Te gustaría coordinar la entrega o cotizar primero tus piezas?",
    links: [
      { label: "Ubicación y Contacto", url: "/nosotros" }
    ]
  },

  // -----------------------------------------------------------------------
  // PEDIDOS, ATENCIÓN Y QUEJAS (PED-001 a PED-010, QUE-001 a QUE-008)
  // -----------------------------------------------------------------------
  {
    id: "PED-001",
    categoria: "Pedidos",
    keywords: ["como comprar", "como hacer pedido", "ordenar", "proceso de compra", "quiero comprar"],
    intencion: "Proceso de compra",
    respuesta: "El proceso es muy ágil:\n1. Eliges tus prendas o equipo en el Catálogo o en el Configurador 3D.\n2. Defines cantidades, tallas y envías tu logotipo si requieres personalización.\n3. Recibes tu cotización formal con desglose de precios y tiempos.\n4. Confirmas mediante Mercado Pago (tarjetas/SPEI/OXXO) o transferencia directa y se programa entrega o envío a domicilio.",
    seguimiento: "¿Quieres que empecemos cotizando las prendas de tu interés?",
    links: [
      { label: "Ver Catálogo", url: "/catalogo" },
      { label: "Abrir Configurador 3D", url: "/configurador" }
    ]
  },
  {
    id: "PED-008",
    categoria: "Pedidos",
    keywords: ["factura", "facturacion", "cfdi", "facturan", "rfc", "datos fiscales"],
    intencion: "Facturación fiscal",
    respuesta: "Sí, emitimos factura fiscal electrónica (CFDI) deducible de impuestos para todas las compras corporativas y de menudeo. Solo requerimos tu Constancia de Situación Fiscal actualizada y uso de CFDI.",
    seguimiento: "¿Deseas generar una cotización formal a nombre de tu empresa?",
    links: [
      { label: "Enviar Datos Fiscales", url: "https://wa.me/525612870780" }
    ]
  },
  {
    id: "QUE-001",
    categoria: "Atención de Quejas",
    keywords: ["queja", "reclamo", "pedido incorrecto", "llego mal", "incompleto", "defecto", "garantia", "problema con mi pedido", "no me llego", "retrasado"],
    intencion: "Atención de quejas e incidencias",
    respuesta: "Lamentamos mucho cualquier inconveniente; en Hupac Textiles nos tomamos muy en serio la calidad y el servicio al cliente. Para resolver tu caso con la máxima prioridad, compárteme tu número de pedido, tu nombre y una breve descripción de lo ocurrido para canalizarlo de inmediato con el área de Calidad y Gerencia Comercial.",
    seguimiento: "¿Me compartes tu número de pedido o nombre con el que se registró la compra?",
    links: [
      { label: "Atención Prioritaria en WhatsApp", url: "https://wa.me/525612870780" }
    ]
  },
  {
    id: "PRO-008",
    categoria: "Atención Humana",
    keywords: ["asesor", "humano", "persona", "hablar con alguien", "llamada", "gerente", "vendedor", "telefono de ventas", "quiero que me llamen"],
    intencion: "Solicitud explícita de atención humana",
    respuesta: "Por supuesto, con gusto te canalizo con un asesor comercial humano. Puedes contactarnos de inmediato por WhatsApp al 56 1287 0780 o llamarnos al 55 1625 7933 de lunes a viernes de 9:00 a 19:00 hrs y sábados de 10:00 a 14:00 hrs.",
    seguimiento: "¿Prefieres que te contacten por WhatsApp o por correo electrónico?",
    links: [
      { label: "Contactar Asesor Humano en WhatsApp", url: "https://wa.me/525612870780" }
    ]
  }
];

// =========================================================================
// 3. BÚSQUEDA EN VIVO EN EL CATÁLOGO DE PRODUCTOS (PRODUCTS)
// =========================================================================

export function searchProductsLive(query: string): string | null {
  const { decodedWords, normalized } = decodeAndNormalizeQuery(query);
  if (decodedWords.length === 0) return null;

  const matches: { product: Product; score: number }[] = [];

  for (const p of PRODUCTS) {
    let score = 0;
    const pNombre = (p.nombre || '').toLowerCase();
    const pSub = (p.subtitulo || '').toLowerCase();
    const pDesc = (p.descripcion || '').toLowerCase();
    const pSku = (p.sku || '').toLowerCase();
    const pCat = (p.categoria || '').toLowerCase();

    // Coincidencia exacta de SKU
    if (normalized === pSku || decodedWords.includes(pSku)) score += 25;

    for (const w of decodedWords) {
      if (w.length < 3) continue;

      if (pNombre.includes(w)) score += 6;
      if (pSub.includes(w)) score += 4;
      if (pDesc.includes(w)) score += 2;
      if (pCat.includes(w)) score += 4;

      // Distancia de Levenshtein contra palabras del nombre
      for (const nameWord of pNombre.split(/\s+/)) {
        if (Math.abs(nameWord.length - w.length) <= 2) {
          const dist = levenshteinDistance(w, nameWord);
          if (dist === 1) score += 4;
          else if (dist === 2) score += 2;
        }
      }
    }

    if (score >= 4) {
      matches.push({ product: p, score });
    }
  }

  if (matches.length === 0) return null;

  matches.sort((a, b) => b.score - a.score);
  const topMatches = matches.slice(0, 2).map(m => m.product);

  const lines: string[] = [];
  lines.push("En nuestro catálogo de Hupac Textiles contamos con las siguientes opciones disponibles:");

  for (const prod of topMatches) {
    let priceStr = '';
    if (prod.precioDirecto) {
      priceStr = ` | Precio desde $${prod.precioDirecto.toFixed(2)} MXN`;
    } else if (prod.precios) {
      const firstGroup = Object.values(prod.precios)[0];
      if (firstGroup) {
        const firstBracket = Object.values(firstGroup)[0];
        if (firstBracket && firstBracket['12-71']) {
          priceStr = ` | Desde $${firstBracket['12-71'].toFixed(2)} MXN (Mayoreo)`;
        }
      }
    }

    const tallasStr = prod.tallas?.length ? ` | Tallas: ${prod.tallas.slice(0, 5).join(', ')}` : '';
    const compStr = prod.composicion ? ` | Tela: ${prod.composicion}` : '';

    lines.push(`\n• **${prod.nombre}** (SKU ${prod.sku}): ${prod.subtitulo}${compStr}${tallasStr}${priceStr}`);
  }

  lines.push("\nPuedes consultar la ficha técnica completa o agregar al carrito en nuestro Catálogo:");
  return lines.join('\n');
}

// =========================================================================
// 4. MOTOR CONVERSACIONAL Y CLASIFICADOR INTELIGENTE
// =========================================================================

export function queryKnowledgeBase(rawQuery: string): {
  found: boolean;
  respuesta: string;
  seguimiento?: string;
  links?: ActionLink[];
} {
  const { normalized, decodedWords } = decodeAndNormalizeQuery(rawQuery);

  // 1. Filtrar preguntas totalmente fuera de contexto (no inventar cosas no textiles/industriales)
  // Regla INE-001: Declinar de forma amable y profesional enfocando en Hupac Textiles
  const nonHupacPatterns = [
    /\b(receta|cocinar|espagueti|pizza|hamburguesa|comida|restaurante italiano)\b/i,
    /\b(clima|tiempo hace hoy|va a llover)\b/i,
    /\b(chiste|broma|cuentame un chiste)\b/i,
    /\b(futbol|partido|mundial|messi|cristiano|politica|elecciones)\b/i,
    /\b(cancion|letra de|pelicula|cine|actor)\b/i,
    /\b(cuanto factura la empresa|margen de ganancia interno|cuanto ganan los dueños)\b/i,
    /\b(consejo de vida|amor|novio|novia|que opinas de mi vida)\b/i,
    /\b(celulares|computadoras|playstation|xbox|autos|coches)\b/i
  ];

  for (const pat of nonHupacPatterns) {
    if (pat.test(rawQuery) || pat.test(normalized)) {
      return {
        found: true,
        respuesta: "Con gusto platicamos de otras cosas en otro momento; por ahora mi función como Asistente Virtual es ayudarte específicamente con los uniformes corporativos, prendas de trabajo, equipo de protección personal (EPP) y calzado de seguridad de Hupac Textiles.",
        seguimiento: "¿Hay alguna prenda, equipo de seguridad o cotización en la que te pueda apoyar hoy?",
        links: [
          { label: "Ver Catálogo de Uniformes", url: "/catalogo?catalogo=textil" },
          { label: "Ver Catálogo EPP", url: "/catalogo?catalogo=epc" },
          { label: "Configurador 3D", url: "/configurador" }
        ]
      };
    }
  }

  // 2. Comprobación de palabras clave con tolerancia difusa (Fuzzy Matching)
  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const item of FAQ_DATABASE) {
    let score = 0;

    for (const kw of item.keywords) {
      const { normalized: normKw, decodedWords: kwWords } = decodeAndNormalizeQuery(kw);

      // Coincidencia exacta de frase
      if (normalized === normKw) {
        score += 35;
      } else if (normalized.includes(normKw)) {
        score += 15 + normKw.length * 0.4;
      } else {
        // Coincidencia palabra por palabra
        for (const kwW of kwWords) {
          if (kwW.length < 3) continue;

          for (const userW of decodedWords) {
            if (userW === kwW) {
              score += 5;
            } else if (Math.abs(userW.length - kwW.length) <= 2) {
              const dist = levenshteinDistance(userW, kwW);
              if (dist === 1) score += 4;
              else if (dist === 2 && kwW.length >= 5) score += 2;
            }
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // 3. Si el puntaje en el banco de conocimiento es sólido (>= 5), responder con el registro
  if (bestMatch && highestScore >= 5) {
    return {
      found: true,
      respuesta: bestMatch.respuesta,
      seguimiento: bestMatch.seguimiento,
      links: bestMatch.links
    };
  }

  // 4. Búsqueda en vivo en el catálogo de productos (PRODUCTS)
  const productSearchResult = searchProductsLive(rawQuery);
  if (productSearchResult) {
    return {
      found: true,
      respuesta: productSearchResult,
      seguimiento: "¿Te gustaría cotizar este modelo en particular o probarlo en el Configurador 3D?",
      links: [
        { label: "Ir al Catálogo", url: "/catalogo" },
        { label: "Abrir Configurador 3D", url: "/configurador" },
        { label: "Cotizar por WhatsApp", url: "https://wa.me/525612870780" }
      ]
    };
  }

  // 5. Si hubo una coincidencia parcial moderada en FAQ (score >= 3)
  if (bestMatch && highestScore >= 3) {
    return {
      found: true,
      respuesta: bestMatch.respuesta,
      seguimiento: bestMatch.seguimiento,
      links: bestMatch.links
    };
  }

  // 6. Si no hay información suficiente sobre productos no textiles o temas no documentados:
  return {
    found: false,
    respuesta: FALLBACK_MESSAGE,
    links: [
      { label: "Contactar a Soporte por WhatsApp", url: "https://wa.me/525612870780" },
      { label: "Consultar Catálogos", url: "/catalogo" }
    ]
  };
}

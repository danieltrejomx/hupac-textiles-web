// lib/chatKnowledgeBase.ts
// Motor de conocimiento híbrido: Banco Maestro oficial + Catálogo en vivo de la Web (PRODUCTS) + Secciones Web

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
  "Lo siento, por el momento no cuento con esa información. Por favor comunícate con soporte para ayudarte directamente.";

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

// Base de Conocimiento Estructurada con todas las secciones de la Web
export const FAQ_DATABASE: FAQItem[] = [
  // 1. BIENVENIDA Y GENERAL
  {
    id: "BIE-001",
    categoria: "Bienvenida",
    keywords: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "hey", "que tal", "saludos", "inicio"],
    intencion: "Saludo inicial / apertura",
    respuesta: "¡Hola! Bienvenido(a) a Hupac Textiles. Con gusto te ayudamos a encontrar los uniformes, prendas o productos industriales que necesitas. ¿Qué estás buscando hoy?",
    seguimiento: "¿Buscas uniformes corporativos, equipo de protección industrial o calzado de seguridad?",
    links: [
      { label: "👕 Ver Catálogo de Uniformes", url: "/catalogo?catalogo=textil" },
      { label: "🛡️ Ver Catálogo de Seguridad (EPP)", url: "/catalogo?catalogo=epc" },
      { label: "🎨 Abrir Configurador 3D", url: "/configurador" }
    ]
  },
  {
    id: "BIE-002",
    categoria: "Bienvenida",
    keywords: ["ayuda", "informacion", "duda", "asesoria", "necesito informacion", "me pueden ayudar", "orientacion"],
    intencion: "Solicitud de ayuda genérica",
    respuesta: "Claro que sí, para eso estamos. Cuéntame un poco más: ¿tu interés es en uniformes corporativos (playeras, polos, camisas, pantalones), equipo de protección industrial (cascos, guantes, chalecos, etc.) o calzado industrial?",
    seguimiento: "¿Es para uso personal o para tu empresa?",
    links: [
      { label: "Ver Catálogo Completo", url: "/catalogo" },
      { label: "Soluciones por Industria", url: "/industrias" }
    ]
  },
  {
    id: "BIE-003",
    categoria: "Bienvenida",
    keywords: ["robot", "bot", "inteligencia artificial", "eres una ia", "persona", "humano", "hablo con una persona", "automatico"],
    intencion: "Cliente pregunta si es un bot",
    respuesta: "Sí, soy el asistente virtual inteligente de Hupac Textiles y estoy aquí para orientarte con información detallada de nuestros productos, precios y servicios. Si en algún momento prefieres hablar directamente con un asesor humano de nuestro equipo comercial, con gusto te canalizo.",
    seguimiento: "¿Quieres que continuemos por aquí o prefieres que te contacte un asesor?",
    links: [
      { label: "💬 Hablar con Asesor en WhatsApp", url: "https://wa.me/525612870780" }
    ]
  },
  {
    id: "BIE-005",
    categoria: "Bienvenida",
    keywords: ["horario", "abiertos", "hora atienden", "sabados", "atienden hoy", "dias de atencion", "a que hora abren"],
    intencion: "Horario de atención",
    respuesta: "Nuestro horario de atención oficial es de lunes a viernes de 9:00 a 19:00 hrs y sábados de 10:00 a 14:00 hrs. Yo, como asistente virtual, estoy disponible las 24 horas del día para ayudarte a explorar productos, cotizar y resolver dudas en el sitio web.",
    seguimiento: "¿Deseas cotizar algún producto o agendar contacto con un asesor?"
  },
  {
    id: "BIE-006",
    categoria: "Identidad",
    keywords: ["donde estan", "ubicacion", "direccion", "tienda fisica", "visitar", "cuautitlan", "estado de mexico", "recoger pedido", "oficinas", "sucursal"],
    intencion: "Ubicación o visita a tienda",
    respuesta: "Nuestras oficinas centrales y centro de distribución se encuentran en Av. Laguna Luna 30, Col. Cumbria, Cuautitlán Izcalli, Estado de México, C.P. 54740. Si deseas visitarnos o recoger un pedido de forma presencial, te recomendamos coordinarlo antes con nuestro equipo para validar existencias.",
    seguimiento: "¿Te gustaría que un asesor te contacte para agendar tu visita o pedido?",
    links: [
      { label: "📍 Ver en Nosotros", url: "/nosotros" }
    ]
  },
  {
    id: "IDE-001",
    categoria: "Identidad",
    keywords: ["quienes son", "sobre la empresa", "historia", "que es hupac", "cuanto tiempo tienen", "anos de experiencia"],
    intencion: "Conocer quién es la empresa",
    respuesta: "Hupac Textiles es una empresa 100% mexicana con más de 30 años de experiencia en la industria textil empresarial, especializada en hilados, tejidos, acabados y confección de prendas de vestir. Contamos con una producción anual aproximada de 14 millones de prendas y una división de Seguridad Industrial (EPP) fundada en 2005.",
    seguimiento: "¿Te gustaría conocer nuestra línea de uniformes o la de seguridad industrial?",
    links: [
      { label: "Conoce más en Nosotros", url: "/nosotros" }
    ]
  },

  // 2. CONFIGURADOR VISUAL 3D (DE LA WEB)
  {
    id: "WEB-CONF-001",
    categoria: "Configurador",
    keywords: ["configurador", "configurador 3d", "probar logo", "ver mi logo", "subir logo", "diseñar uniforme", "mockup", "simulador", "como se ve mi logo"],
    intencion: "Uso del Configurador Visual 3D",
    respuesta: "¡Contamos con un Configurador Visual 3D interactivo en la web! Te permite:\n1. Elegir entre Polo Piqué, Playera Cuello Redondo, Camisa de Vestir o Camisa de Mezclilla (con o sin reflejante).\n2. Seleccionar el color institucional exacto.\n3. Cargar el archivo de tu logotipo (PNG, JPG o SVG).\n4. Mover y escalar libremente tu logo en vista frontal o trasera.\n5. Generar un ticket formal de cotización y enviarlo por WhatsApp.",
    seguimiento: "¿Te gustaría probar el configurador ahora mismo?",
    links: [
      { label: "🎨 Ir al Configurador Visual 3D", url: "/configurador" }
    ]
  },

  // 3. PAGOS Y COMPRA EN LÍNEA (MERCADO PAGO)
  {
    id: "WEB-PAY-001",
    categoria: "Pagos",
    keywords: ["como pagar", "metodos de pago", "formas de pago", "tarjeta", "tarjeta de credito", "debito", "mercado pago", "spei", "oxxo", "efectivo", "transferencia", "como comprar"],
    intencion: "Métodos de pago y Checkout",
    respuesta: "Puedes realizar tu compra directamente en nuestra tienda en línea mediante Mercado Pago de forma 100% segura. Aceptamos:\n• Tarjetas de crédito y débito (Visa, Mastercard, American Express).\n• Transferencias interbancarias SPEI.\n• Pagos en efectivo en tiendas de conveniencia (OXXO).\n\nNo cobramos ningún recargo extra por IVA en el checkout; pagas exactamente el precio publicado del producto.",
    seguimiento: "¿Deseas explorar los productos para agregar al carrito?",
    links: [
      { label: "🛒 Ver Carrito de Compras", url: "/checkout" },
      { label: "📦 Ver Catálogo", url: "/catalogo" }
    ]
  },

  // 4. PROGRAMA DE DISTRIBUIDORES
  {
    id: "WEB-DIST-001",
    categoria: "Distribuidores",
    keywords: ["distribuidor", "distribuidores", "revender", "precio distribuidor", "mayoreo distribuidor", "ser distribuidor", "requisitos distribuidor"],
    intencion: "Programa de Distribuidores Autorizados",
    respuesta: "Ofrecemos nuestro Programa de Distribuidores Autorizados HUPAC, ideal para comercializadores de uniformes y EPP. Beneficios:\n• Precios preferenciales y márgenes de ganancia directo de fábrica.\n• Inventario garantizado para entrega inmediata sin esperas de confección.\n• Envíos consolidados a toda la República Mexicana.\n• Catálogos digitales y soporte comercial dedicado.\n\nPuedes registrarte con tus datos comerciales en nuestra página de Distribuidores.",
    seguimiento: "¿Te gustaría llenar el formulario de registro para distribuidores?",
    links: [
      { label: "🤝 Ir a Distribuidores", url: "/distribuidores" },
      { label: "💬 Contactar por WhatsApp", url: "https://wa.me/525612870780" }
    ]
  },

  // 5. INDUSTRIAS Y SOLUCIONES ESPECIALIZADAS
  {
    id: "WEB-IND-001",
    categoria: "Industrias",
    keywords: ["industrias", "industria", "giros", "que uniforme para mi empresa", "automotriz", "construccion", "manufactura", "logistica", "seguridad privada", "mineria"],
    intencion: "Soluciones por Industria",
    respuesta: "En Hupac Textiles desarrollamos paquetes normativos para 6 sectores industriales clave:\n1. Manufactura & Maquiladora (antiestático, algodón peinado, alta duración).\n2. Automotriz & Talleres (mezclilla ruda, gabardina resistente a grasas).\n3. Construcción & Obra Civil (alta visibilidad con reflejantes, cascos y botas).\n4. Logística & Almacenes (prendas transpirables, chalecos brigadista, fajas).\n5. Seguridad Privada (camisas tácticas, pantalones comando, botas operativas).\n6. Minería, Energía & Petróleo (retardante a flama, dieléctrico y arco eléctrico).",
    seguimiento: "¿De qué sector es tu empresa para darte la recomendación exacta?",
    links: [
      { label: "🏭 Ver Soluciones por Industria", url: "/industrias" }
    ]
  },

  // 6. TÉCNICAS DE PERSONALIZACIÓN Y TALLER
  {
    id: "WEB-SRV-001",
    categoria: "Servicios",
    keywords: ["tecnicas", "bordado", "serigrafia", "dtf", "sublimacion", "vinil textil", "estampado", "personalizacion", "poner logo"],
    intencion: "Técnicas de personalización disponibles",
    respuesta: "Contamos con taller propio de personalización con 5 técnicas principales:\n• Bordado Industrial: En relieve con hilos de poliéster de alta tenacidad (ideal para camisas, polos y chamarras).\n• Serigrafía Textil: Tintas plastisol y ecológicas para corridas de alto volumen con excelente costo-beneficio.\n• DTF Textil: Impresión digital directa a film en alta definición (ideal para degradados y detalles finos sobre cualquier tela).\n• Sublimación: Pigmentación transferida por calor profundo en prendas de poliéster (como playera SUBLI), sin tacto.\n• Vinil Textil: Termotransferencia de alta resistencia perfecta para logotipos sólidos, nombres y franjas reflejantes.",
    seguimiento: "¿Para qué tipo de prenda necesitas tu personalización?",
    links: [
      { label: "🧵 Ver Técnicas y Animaciones", url: "/servicios" }
    ]
  },

  // 7. UNIFORMES Y PRENDAS BÁSICAS
  {
    id: "UNI-001",
    categoria: "Uniformes",
    keywords: ["uniformes", "ropa corporativa", "ropa de trabajo", "uniforme para empresa", "uniformar personal", "camisas", "playeras", "pantalones"],
    intencion: "Disponibilidad general de uniformes",
    respuesta: "Manejamos una línea completa de uniformes corporativos de confección 100% nacional:\n• Playeras de cuello redondo (MAX, PRIME, PREMIUM peinado, STAMPA, LONDON, SUBLI).\n• Playeras tipo polo (Caballero, Dama asiluetada, Supreme piqué reforzado, infantil y juvenil).\n• Camisas de vestir (manga larga y corta, en blanco y cielo) y Camisas de mezclilla (con o sin reflejante).\n• Pantalones de gabardina 100% algodón y pantalones de mezclilla dark stone.\n• Sudaderas cuello redondo, con capucha y cangurera.",
    seguimiento: "¿Buscas un uniforme formal de oficina o prendas operativas de uso rudo?",
    links: [
      { label: "👕 Ver Catálogo Textil", url: "/catalogo?catalogo=textil" }
    ]
  },
  {
    id: "UNI-006",
    categoria: "Uniformes",
    keywords: ["playeras", "modelos de playera", "playera max", "playera prime", "playera premium", "stampa", "london", "subli", "heavy", "cuello v", "tank top"],
    intencion: "Modelos de playera",
    respuesta: "Tenemos opciones para cada necesidad:\n• Premium (34401): 100% algodón peinado ultrafino, tacto suave premium.\n• Max (30038): 100% algodón peso completo resistente (200 g/m²).\n• Prime (30037): 100% algodón suave y fresca (155 g/m²).\n• Stampa (30039): Mezcla 50% algodón / 50% poliéster, ideal para serigrafía.\n• London (30040): 100% algodón con efecto jaspeado moderno.\n• Subli (30041): 100% poliéster especial para sublimación fotográfica.",
    seguimiento: "¿Qué modelo te gustaría cotizar o en qué color?",
    links: [
      { label: "👕 Ver Playeras en Catálogo", url: "/catalogo?cat=playeras" }
    ]
  },
  {
    id: "UNI-007",
    categoria: "Uniformes",
    keywords: ["polo", "playera polo", "polos", "polo dama", "polo caballero", "supreme", "pique"],
    intencion: "Playeras tipo polo",
    respuesta: "Contamos con playeras tipo polo en corte Caballero y Dama asiluetado, en manga corta y manga larga. Además, disponemos de la línea Polo Supreme en tejido piqué reforzado (50% algodón / 50% poliéster, 230 g/m²) con gran durabilidad ante lavados industriales.",
    seguimiento: "¿Cuántas piezas de polo necesitas y en qué color?",
    links: [
      { label: "Ver Polos en Catálogo", url: "/catalogo?cat=polos" }
    ]
  },
  {
    id: "UNI-004",
    categoria: "Uniformes",
    keywords: ["camisas", "camisa de vestir", "camisa blanca", "camisa azul cielo", "camisa mezclilla", "camisa reflejante"],
    intencion: "Camisas de vestir y mezclilla",
    respuesta: "Manejamos camisas de vestir formales en mezcla algodón/poliéster de fácil planchado, en manga corta y manga larga (colores Blanco y Azul Cielo). En línea operativa, contamos con camisa de mezclilla 100% algodón, disponible en versión estándar y en versión con franjas reflejantes de alta visibilidad.",
    seguimiento: "¿La camisa es para personal administrativo o de campo?",
    links: [
      { label: "Ver Camisas en Catálogo", url: "/catalogo?cat=camisas" }
    ]
  },
  {
    id: "UNI-002",
    categoria: "Uniformes",
    keywords: ["pantalon", "pantalones", "gabardina", "jeans", "mezclilla", "pantalon marino", "pantalon khaki", "dark stone"],
    intencion: "Pantalones corporativos e industriales",
    respuesta: "Contamos con:\n• Pantalón de gabardina 100% algodón (Estilo P51774 caballero y 51783 dama), disponible en Azul Marino y Khaki (beige).\n• Pantalón de mezclilla 100% algodón en tono dark stone (Estilo 55151 caballero y 55152 dama), corte recto de alta resistencia.",
    seguimiento: "¿Buscas pantalón formal de gabardina o jeans de mezclilla?",
    links: [
      { label: "Ver Pantalones en Catálogo", url: "/catalogo?cat=pantalones" }
    ]
  },

  // 8. EQUIPO DE SEGURIDAD (EPP) Y CALZADO
  {
    id: "EPP-001",
    categoria: "EPP",
    keywords: ["epp", "seguridad industrial", "cascos", "guantes", "lentes", "chalecos", "arneses", "botas", "equipo de seguridad"],
    intencion: "Línea completa de EPP",
    respuesta: "Nuestra división de Seguridad Industrial (EPP) incluye:\n• Protección Craneal: Cascos tipo mundial y ala ancha con suspensión de 8 puntos, barboquejos y capuchas.\n• Protección Visual: Lentes Nemesis, goggles Trilogy cerrados, polarizados y sobrelentes.\n• Protección de Manos: Guantes anticorte nivel 5, nylon/nitrilo, carnaza, argonero y soldador con Kevlar.\n• Ropa Industrial: Chalecos clase 2 con reflejante, chalecos brigadista, overoles de gabardina y laminados.\n• Calzado: Botas industriales con casquillo de acero y bota roper vaquera (tallas 22 al 30).\n• Alturas & Vial: Arneses de 1 y 3 aros, líneas de vida, conos reflejantes y trafitambos.",
    seguimiento: "¿Qué equipo de protección requiere tu personal?",
    links: [
      { label: "🛡️ Explorar Catálogo EPP", url: "/catalogo?catalogo=epc" }
    ]
  },
  {
    id: "CAL-001",
    categoria: "Calzado",
    keywords: ["calzado", "botas", "bota industrial", "bota de seguridad", "bota de casquillo", "bota roper", "vaquera", "tallas calzado"],
    intencion: "Calzado industrial y botas de trabajo",
    respuesta: "Manejamos calzado industrial de alta durabilidad en piel de ganado vacuno con suela antiderrapante y resistente a aceites y químicos ligeros. Modelos:\n• Bota Industrial con casquillo de acero (tallas del 22 al 30/31).\n• Bota Roper tipo vaquera de tubo alto (tallas 26 al 30).\n• Accesorios: Plantillas de confort y protectores metatarsales.",
    seguimiento: "¿Cuántos pares necesitas y en qué tallas?",
    links: [
      { label: "🥾 Ver Calzado en Catálogo", url: "/catalogo?cat=calzado" }
    ]
  },

  // 9. PRECIOS, MAYOREO Y COTIZACIONES
  {
    id: "PRE-001",
    categoria: "Precios",
    keywords: ["precio", "cuanto cuesta", "cotizacion", "cotizar", "mayoreo", "descuentos", "escalas", "cuanto sale"],
    intencion: "Precios y mayoreo",
    respuesta: "Nuestros productos cuentan con precios sumamente competitivos con escalas por volumen:\n• Mayoreo bajo: 12 a 71 piezas.\n• Mayoreo medio: 72 a 503 piezas.\n• Mayoreo alto / Distribuidor: 504+ piezas.\n\nPuedes ver los precios desglosados en cada ficha de producto en el Catálogo, o enviarnos tu lista para prepararte una cotización formal inmediata con escala por volumen.",
    seguimiento: "¿Qué modelo y cantidad aproximada estás considerando?",
    links: [
      { label: "📋 Consultar Catálogo con Precios", url: "/catalogo" },
      { label: "💬 Solicitar Cotización en WhatsApp", url: "https://wa.me/525612870780" }
    ]
  },

  // 10. ENVÍOS Y COBERTURA
  {
    id: "LOG-001",
    categoria: "Logística",
    keywords: ["envios", "envio", "flete", "entrega", "cobertura", "cuanto tarda", "a donde envian", "monterrey", "guadalajara", "republica"],
    intencion: "Envíos a todo México",
    respuesta: "Realizamos envíos a toda la República Mexicana mediante convenios con las principales paqueterías y transportes de carga consolidada. El tiempo y costo de flete depende del volumen y destino de tu pedido. También ofrecemos recolección directa en nuestro centro de operaciones de Cuautitlán Izcalli, Estado de México.",
    seguimiento: "¿A qué código postal o ciudad requieres el envío?",
    links: [
      { label: "📍 Contactar a Logística", url: "/nosotros" }
    ]
  }
];

// Búsqueda inteligente en vivo en el catálogo de productos (PRODUCTS)
export function searchProductsLive(query: string): string | null {
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/).filter(w => w.length > 2);
  if (words.length === 0) return null;

  // Filtrar productos que coincidan
  const matches: { product: Product; score: number }[] = [];

  for (const p of PRODUCTS) {
    let score = 0;
    const pNombre = p.nombre.toLowerCase();
    const pSub = (p.subtitulo || '').toLowerCase();
    const pDesc = (p.descripcion || '').toLowerCase();
    const pSku = (p.sku || '').toLowerCase();
    const pCat = (p.categoria || '').toLowerCase();

    // Coincidencia exacta de SKU
    if (q === pSku) score += 20;

    for (const w of words) {
      if (pNombre.includes(w)) score += 5;
      if (pSub.includes(w)) score += 3;
      if (pDesc.includes(w)) score += 2;
      if (pCat.includes(w)) score += 3;
      if (pSku.includes(w)) score += 4;
    }

    if (score >= 4) {
      matches.push({ product: p, score });
    }
  }

  if (matches.length === 0) return null;

  // Ordenar por score
  matches.sort((a, b) => b.score - a.score);
  const topMatches = matches.slice(0, 2).map(m => m.product);

  const lines: string[] = [];
  lines.push(`En nuestro catálogo contamos con opciones ideales para lo que buscas:`);

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

  lines.push(`\nPuedes ver la ficha completa, fotos y tabla de colores en nuestro Catálogo:`);
  return lines.join('\n');
}

// Búsqueda inteligente combinada
export function queryKnowledgeBase(rawQuery: string): {
  found: boolean;
  respuesta: string;
  seguimiento?: string;
  links?: ActionLink[];
} {
  const query = rawQuery.toLowerCase().trim();

  // 1. Filtrar preguntas totalmente fuera de contexto (no inventar cosas no textiles/industriales)
  const forbiddenPatterns = [
    /cuanto factura la empresa/i,
    /margen de ganancia interno/i,
    /consejo de vida/i,
    /que opinas del clima/i,
    /cuentame un chiste/i,
    /comida|restaurante italiano|viaje a|hotel/i,
    /celulares|computadoras|autos|coches/i
  ];

  for (const pat of forbiddenPatterns) {
    if (pat.test(query)) {
      return {
        found: false,
        respuesta: FALLBACK_MESSAGE
      };
    }
  }

  // 2. Normalización
  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const normalizedQuery = normalize(query);

  // 3. Evaluar FAQ_DATABASE
  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const item of FAQ_DATABASE) {
    let score = 0;

    for (const kw of item.keywords) {
      const normKw = normalize(kw);

      if (normalizedQuery === normKw) {
        score += 20;
      } else if (normalizedQuery.includes(normKw)) {
        score += 8 + normKw.length * 0.4;
      } else {
        const words = normKw.split(/\s+/);
        for (const w of words) {
          if (w.length > 3 && normalizedQuery.includes(w)) {
            score += 2.5;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // 4. Si el score en FAQ es suficiente, responder con FAQ + posibles links
  if (bestMatch && highestScore >= 5) {
    return {
      found: true,
      respuesta: bestMatch.respuesta,
      seguimiento: bestMatch.seguimiento,
      links: bestMatch.links
    };
  }

  // 5. Búsqueda en catálogo de productos en vivo
  const productSearchResult = searchProductsLive(query);
  if (productSearchResult) {
    return {
      found: true,
      respuesta: productSearchResult,
      seguimiento: "¿Te gustaría cotizar este modelo en particular o probarlo en el Configurador 3D?",
      links: [
        { label: "📦 Ir al Catálogo", url: "/catalogo" },
        { label: "🎨 Abrir Configurador 3D", url: "/configurador" },
        { label: "💬 Cotizar por WhatsApp", url: "https://wa.me/525612870780" }
      ]
    };
  }

  // 6. Si hubo un match débil en FAQ pero con relevancia
  if (bestMatch && highestScore >= 3) {
    return {
      found: true,
      respuesta: bestMatch.respuesta,
      seguimiento: bestMatch.seguimiento,
      links: bestMatch.links
    };
  }

  // 7. Si no hay información suficiente en la web ni en el banco de datos:
  return {
    found: false,
    respuesta: FALLBACK_MESSAGE,
    links: [
      { label: "💬 Contactar a Soporte por WhatsApp", url: "https://wa.me/525612870780" }
    ]
  };
}

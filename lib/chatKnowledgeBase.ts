// lib/chatKnowledgeBase.ts
// Base de conocimiento oficial del Banco Maestro de Preguntas y Respuestas para el Agente Virtual de HUPAC TEXTILES

export interface FAQItem {
  id: string;
  categoria: string;
  keywords: string[];
  intencion: string;
  respuesta: string;
  seguimiento?: string;
  catalogo?: string;
  escalamiento?: string;
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

export const FAQ_DATABASE: FAQItem[] = [
  // 1. BIENVENIDA Y GENERAL
  {
    id: "BIE-001",
    categoria: "Bienvenida",
    keywords: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "hey", "que tal", "saludos", "inicio"],
    intencion: "Saludo inicial / apertura",
    respuesta: "¡Hola! Bienvenido(a) a Hupac Textiles. Con gusto te ayudamos a encontrar los uniformes, prendas o productos industriales que necesitas. ¿Qué estás buscando hoy?",
    seguimiento: "¿Buscas uniformes corporativos, equipo de protección industrial o calzado de seguridad?"
  },
  {
    id: "BIE-002",
    categoria: "Bienvenida",
    keywords: ["ayuda", "informacion", "duda", "asesoria", "necesito informacion", "me pueden ayudar"],
    intencion: "Solicitud de ayuda genérica",
    respuesta: "Claro que sí, para eso estamos. Cuéntame un poco más: ¿tu interés es en uniformes corporativos (playeras, polos, camisas, pantalones), equipo de protección industrial (cascos, guantes, chalecos, etc.) o calzado industrial?",
    seguimiento: "¿Es para uso personal o para tu empresa?"
  },
  {
    id: "BIE-003",
    categoria: "Bienvenida",
    keywords: ["robot", "bot", "inteligencia artificial", "eres una ia", "persona", "humano", "hablo con una persona", "automatico"],
    intencion: "Cliente pregunta si es un bot",
    respuesta: "Sí, soy el asistente virtual de Hupac Textiles y estoy aquí para orientarte con información de nuestros productos y ayudarte a avanzar hacia una cotización. Si en algún momento prefieres hablar directamente con una persona de nuestro equipo comercial, con gusto te canalizo.",
    seguimiento: "¿Quieres que continuemos por aquí o prefieres que te conecte con un asesor?"
  },
  {
    id: "BIE-005",
    categoria: "Bienvenida",
    keywords: ["horario", "abiertos", "hora atienden", "sabados", "atienden hoy", "dias de atencion"],
    intencion: "Horario de atención",
    respuesta: "Nuestro horario de atención es de lunes a viernes de 9:00 a 19:00 hrs y sábados de 10:00 a 14:00 hrs. Yo, en cambio, estoy disponible para orientarte en cualquier momento en la web; si tu consulta requiere a un asesor humano, se te dará seguimiento dentro de ese horario.",
    seguimiento: "¿Quieres que dejemos lista tu consulta para que el equipo te contacte en cuanto abra?"
  },
  {
    id: "BIE-006",
    categoria: "Identidad",
    keywords: ["donde estan", "ubicacion", "direccion", "tienda fisica", "visitar", "cuautitlan", "estado de mexico", "recoger pedido", "oficinas"],
    intencion: "Ubicación o visita a tienda",
    respuesta: "Nuestras oficinas y centro de operaciones se encuentran en Av. Laguna Luna 30, Col. Cumbria, Cuautitlán Izcalli, Estado de México, C.P. 54740. Si deseas visitarnos o recoger un pedido, te recomiendo coordinarlo antes con un asesor para confirmar disponibilidad.",
    seguimiento: "¿Te gustaría que un asesor te contacte para agendar tu visita o pedido?"
  },
  {
    id: "IDE-001",
    categoria: "Identidad",
    keywords: ["quienes son", "sobre la empresa", "historia", "que es hupac", "cuanto tiempo tienen", "anos de experiencia"],
    intencion: "Conocer quién es la empresa",
    respuesta: "Hupac Textiles es una empresa 100% mexicana con más de 30 años de experiencia en la confección de uniformes empresariales, especializada en hilados, tejidos, acabados y prendas de vestir, además de contar con una línea especializada en equipo de protección personal e industrial (EPP) desde 2005. Diseñamos identidad y confeccionamos confianza para empresas de distintos sectores.",
    seguimiento: "¿Te gustaría conocer nuestra línea de uniformes o la de seguridad industrial?"
  },
  {
    id: "IDE-003",
    categoria: "Identidad",
    keywords: ["capacidad", "cuanto producen", "fabrica", "volumen", "tamano", "produccion anual", "grandes pedidos"],
    intencion: "Capacidad de producción",
    respuesta: "Contamos con más de 30 años de experiencia en la transformación de fibras de algodón y sintéticas. Producimos hilados, tejidos, acabados y prendas de vestir, con una producción anual aproximada de 14 millones de prendas, distribuidas en cadenas comerciales nacionales y con clientes internacionales.",
    seguimiento: "¿Tu proyecto es de volumen bajo, medio o alto? Así te oriento mejor sobre tiempos."
  },
  {
    id: "IDE-005",
    categoria: "Identidad",
    keywords: ["que venden", "que productos tienen", "lineas de negocio", "catalogo general", "que manejan"],
    intencion: "Líneas de producto",
    respuesta: "Manejamos dos grandes líneas de negocio: 1) Uniformes corporativos (playeras, polos, camisas, pantalones y sudaderas, para caballero, dama, juvenil e infantil) y 2) Equipo de protección personal e industrial EPP (cascos, lentes, guantes, calzado de seguridad, chalecos, arneses y señalización vial), además de servicios integrales de personalización como bordado, estampado, serigrafía y termoestampado.",
    seguimiento: "¿Cuál de las dos líneas te interesa revisar primero?"
  },
  {
    id: "IDE-006",
    categoria: "Contacto",
    keywords: ["telefono", "correo", "whatsapp", "contacto directo", "numero", "email", "comunicarme"],
    intencion: "Datos de contacto directo",
    respuesta: "Puedes escribirnos a ventas@hupactextiles.com o por WhatsApp al 56 1287 0780. También puedes llamarnos al 55 1625 7933 en nuestro horario de atención: lunes a viernes de 9:00 a 19:00 hrs y sábados de 10:00 a 14:00 hrs.",
    seguimiento: "¿Deseas que te canalice con un asesor en este momento por WhatsApp?"
  },
  {
    id: "IDE-008",
    categoria: "Identidad",
    keywords: ["redes sociales", "facebook", "instagram", "tiktok", "linkedin", "donde los sigo"],
    intencion: "Redes sociales oficiales",
    respuesta: "Sí, nos puedes encontrar en Facebook, Instagram y TikTok como Hupac Textiles, donde compartimos promociones, lanzamientos y contenido de nuestros productos. También estamos en LinkedIn.",
    seguimiento: "¿Quieres que te comparta el catálogo digital directamente por aquí mientras tanto?"
  },

  // 2. UNIFORMES CORPORATIVOS
  {
    id: "UNI-001",
    categoria: "Uniformes",
    keywords: ["uniformes", "ropa corporativa", "ropa de trabajo", "uniforme para empresa", "uniformar personal"],
    intencion: "Disponibilidad general de uniformes",
    respuesta: "Sí, manejamos una línea completa de uniformes corporativos: playeras (varios modelos y pesos de tela), polos, camisas de vestir, sudaderas y pantalones, para caballero, dama, juvenil e infantil, con opción de personalización con logotipo institucional.",
    seguimiento: "¿Buscas un uniforme más formal (camisa y pantalón de vestir) o más casual (playera o polo)?"
  },
  {
    id: "UNI-002",
    categoria: "Uniformes",
    keywords: ["pantalon de gabardina", "gabardina", "pantalon vestir", "pantalon marino", "pantalon khaki", "p51774", "51783"],
    intencion: "Pantalón de gabardina",
    respuesta: "Sí, contamos con pantalón de gabardina 100% algodón para caballero (estilo P51774) y dama (estilo 51783), disponible en color marino y khaki (beige). Se combinan muy bien con nuestras camisas de vestir manga larga o corta.",
    seguimiento: "¿Necesitas también la camisa a juego? Tenemos manga larga y manga corta en blanco y cielo."
  },
  {
    id: "UNI-003",
    categoria: "Uniformes",
    keywords: ["pantalon de mezclilla", "mezclilla", "jeans de trabajo", "dark stone", "55151", "55152"],
    intencion: "Pantalón de mezclilla",
    respuesta: "Sí, tenemos pantalón de mezclilla 100% algodón en color dark stone, disponible para caballero (estilo 55151) y dama (estilo 55152), ideal para combinarlo con camisa de mezclilla manga corta o larga.",
    seguimiento: "¿Te interesa también la camisa de mezclilla a juego?"
  },
  {
    id: "UNI-004",
    categoria: "Uniformes",
    keywords: ["camisas", "camisa de vestir", "camisa blanca", "camisa azul cielo", "camisa manga larga", "camisa manga corta"],
    intencion: "Camisas de vestir corporativas",
    respuesta: "Manejamos camisas de vestir en algodón/poliéster, manga larga y manga corta, para caballero y dama, en color blanco y cielo (azul claro). También tenemos camisa de mezclilla y camisa de mezclilla con franjas reflejantes para personal operativo.",
    seguimiento: "¿La camisa es para personal administrativo o para personal operativo de campo?"
  },
  {
    id: "UNI-005",
    categoria: "Uniformes",
    keywords: ["camisa mezclilla reflejante", "mezclilla con reflejante", "camisa reflectiva", "franjas reflejantes"],
    intencion: "Camisa de mezclilla con reflejante",
    respuesta: "Sí, contamos con camisa de mezclilla con franjas reflejantes, ideal para personal que trabaja en campo o en condiciones de baja visibilidad nocturna, además de la versión sin reflejante para uso general.",
    seguimiento: "¿Cuántas piezas necesitas y en qué tallas?"
  },
  {
    id: "UNI-006",
    categoria: "Uniformes",
    keywords: ["playeras", "modelos de playera", "playera max", "playera prime", "playera premium", "stampa", "london", "subli", "heavy", "cuello v", "tank top"],
    intencion: "Modelos de playera",
    respuesta: "Contamos con varios modelos de playera: MAX, PRIME, PREMIUM (algodón peinado), STAMPA (ideal para estampado), LONDON (efecto jaspeado), SUBLI (100% poliéster para sublimación), HEAVY manga larga, cuello V y tank top, en amplia variedad de colores y tallas de CH a 2EG.",
    seguimiento: "¿La playera es para personalizar con bordado o estampado, o la necesitas lisa?"
  },
  {
    id: "UNI-007",
    categoria: "Uniformes",
    keywords: ["polo", "playera polo", "polos", "polo dama", "polo caballero", "supreme", "pique"],
    intencion: "Playeras tipo polo",
    respuesta: "Sí, manejamos polo caballero y dama (corte asiluetado), en manga corta y manga larga, además de la línea Supreme (tejido piqué reforzado) y versiones infantil y juvenil. Se pueden personalizar con bordado, estampado o termotransferencia.",
    seguimiento: "¿Cuántas personas necesitas uniformar con polo?"
  },
  {
    id: "UNI-008",
    categoria: "Uniformes",
    keywords: ["sudaderas", "sudadera", "sudadera capucha", "sudadera con cierre", "cuello redondo", "cangurera", "jogger"],
    intencion: "Sudaderas corporativas",
    respuesta: "Sí, contamos con sudadera capucha y cangurera, sudadera cuello redondo y sudadera capucha con cierre, en tela de algodón/poliéster, además de versiones juveniles (capucha cangurera y jogger).",
    seguimiento: "¿La necesitas lisa o con logo bordado/estampado?"
  },
  {
    id: "UNI-009",
    categoria: "Uniformes",
    keywords: ["tallas", "que tallas manejan", "tallas grandes", "2eg", "tallas infantiles", "talla ch", "talla md", "talla gd"],
    intencion: "Tallas disponibles",
    respuesta: "En playeras, polos y sudaderas para adulto manejamos tallas CH, MD, GD, EG y 2EG (según el modelo). En línea infantil manejamos ECH (04), CH (06) y MD (08), y en juvenil GD (10-12) y EG (14-16). Los pantalones de vestir y mezclilla varían por número de talla según el estilo.",
    seguimiento: "¿Me compartes las tallas que necesitas para validar disponibilidad exacta por modelo?"
  },
  {
    id: "UNI-011",
    categoria: "Uniformes",
    keywords: ["colores", "que colores manejan", "color institucional", "carta de color", "tienen color"],
    intencion: "Colores disponibles",
    respuesta: "Manejamos una carta de color muy amplia: blanco, negro, marino, rojo, rey, turquesa, cielo, acero, naranja, esmeralda, gris, khaki, mango, café, morado, vino, amarillo, rosa, aqua, fiusha, además de tonos jaspeados y dark stone, aunque la disponibilidad exacta varía según el modelo de prenda.",
    seguimiento: "¿Qué color corporativo necesitas para confirmarte si el modelo que te gusta lo maneja?"
  },
  {
    id: "UNI-016",
    categoria: "Uniformes",
    keywords: ["material", "composicion", "algodon", "poliester", "peso de tela", "gramaje", "se encoge"],
    intencion: "Composición de telas",
    respuesta: "Depende del modelo: tenemos opciones 100% algodón (como MAX, PRIME y PREMIUM), mezclas de algodón/poliéster (como STAMPA y LONDON) y 100% poliéster (SUBLI, para sublimación). El peso de la tela varía entre 140 y 230 g/m² según el estilo.",
    seguimiento: "¿Buscas una tela más fresca (mayor % algodón) o más resistente al lavado industrial (mayor % poliéster)?"
  },

  // 3. TÉCNICAS DE PERSONALIZACIÓN
  {
    id: "PER-001",
    categoria: "Personalización",
    keywords: ["personalizacion", "poner logo", "personalizan", "impresion", "logotipo", "personalizar"],
    intencion: "Servicios de personalización",
    respuesta: "Sí, ofrecemos personalización mediante bordado, estampado, serigrafía y termoestampado (termotransferencia), según el tipo de prenda, el diseño de tu logotipo y la cantidad de piezas.",
    seguimiento: "¿Tu logo es a un color, varios colores, o tiene degradados o detalles fotográficos?"
  },
  {
    id: "PER-002",
    categoria: "Personalización",
    keywords: ["diferencia bordado y estampado", "bordado o estampado", "cual dura mas bordado", "conviene bordar"],
    intencion: "Bordado vs Estampado",
    respuesta: "El bordado consiste en coser hilos sobre la tela para formar el diseño en relieve; es un método de alta durabilidad y da un acabado elegante, ideal para polos y camisas. El estampado (serigrafía, DTG o termotransferencia) transfiere el diseño mediante tinta o calor, siendo más versátil para muchos colores o detalles finos y más económico en volúmenes grandes.",
    seguimiento: "¿Para qué tipo de prenda es el logo: playera, polo o camisa?"
  },
  {
    id: "PER-003",
    categoria: "Personalización",
    keywords: ["serigrafia", "estampado serigrafico", "malla", "muchas piezas serigrafia"],
    intencion: "Serigrafía textil",
    respuesta: "La serigrafía es un método de estampado que transfiere una imagen trazada en una plantilla sobre una malla, usando tinta, hacia la prenda. Es muy recomendable cuando se necesita reproducir el mismo diseño muchas veces de forma rápida, y es uno de los métodos más económicos para grandes cantidades.",
    seguimiento: "¿Cuántas piezas necesitas estampar con este diseño?"
  },
  {
    id: "PER-004",
    categoria: "Personalización",
    keywords: ["sublimacion", "sublimar", "subli", "sublimar algodon"],
    intencion: "Sublimación",
    respuesta: "La sublimación es una técnica que transfiere una imagen a una prenda de poliéster aplicando calor con una plancha transfer; la tinta pasa a estado gaseoso y penetra en la fibra textil. Nuestra playera SUBLI está fabricada en 100% poliéster especialmente para este proceso. No es recomendable para prendas 100% algodón.",
    seguimiento: "¿Tu diseño incluye fotografías o degradados de color?"
  },
  {
    id: "PER-005",
    categoria: "Personalización",
    keywords: ["dtg", "impresion directa", "impresion digital", "calidad fotografica"],
    intencion: "Impresión directa (DTG)",
    respuesta: "El método de impresión directa a prenda (DTG) es una técnica de impresión textil digital que destaca por su calidad, logrando estampados con fidelidad casi fotográfica. Es muy versátil para diseños complejos en tirajes medios y bajos.",
    seguimiento: "¿Tu diseño tiene muchos colores o detalles finos tipo fotografía?"
  },
  {
    id: "PER-006",
    categoria: "Personalización",
    keywords: ["termoestampado", "termotransferencia", "vinil", "cinta termica", "calor"],
    intencion: "Termoestampado",
    respuesta: "El termoestampado (o termotransferencia) utiliza calor y presión para transferir la tinta desde una cinta térmica hacia la superficie de la prenda. Es una opción excelente para lograr un producto impreso nítido y de alta durabilidad.",
    seguimiento: "¿Buscas esta técnica para playeras, sudaderas o chalecos?"
  },
  {
    id: "PER-008",
    categoria: "Personalización",
    keywords: ["formato de logo", "archivo de logo", "en que formato mando el logo", "vectorial", "pdf logo", "png logo"],
    intencion: "Formato del logotipo",
    respuesta: "Idealmente el logo se recibe en un formato vectorial (AI, EPS o PDF vectorizado) o, en su defecto, en una imagen de alta resolución (PNG con fondo transparente o JPG en alta calidad). Esto ayuda a que el resultado final sea completamente nítido.",
    seguimiento: "¿Cuentas con el logo en algún formato digital para compartirlo con el equipo de diseño?"
  },
  {
    id: "PER-012",
    categoria: "Personalización",
    keywords: ["zonas de logo", "pecho y espalda", "mangas", "donde puedo poner el logo", "dos lados"],
    intencion: "Zonas de personalización",
    respuesta: "Sí, es posible personalizar más de una zona de la prenda (por ejemplo, logo bordado en el pecho y estampado grande en la espalda o mangas), e incluso combinar técnicas distintas en una misma prenda, siempre que sea viable para el tipo de tela.",
    seguimiento: "¿Qué diseño llevaría cada zona de la prenda?"
  },

  // 4. SEGURIDAD INDUSTRIAL (EPP)
  {
    id: "EPP-001",
    categoria: "EPP",
    keywords: ["epp", "seguridad industrial", "proteccion personal", "equipo de seguridad", "obra"],
    intencion: "Disponibilidad general de EPP",
    respuesta: "Sí, contamos con una línea completa de equipo de protección personal: protección para cabeza (cascos), protección visual y facial (lentes y caretas), protección para manos (guantes de distintos tipos), calzado de seguridad, ropa de trabajo (chalecos, overoles), protección contra caídas (arneses y líneas de vida) y señalización vial.",
    seguimiento: "¿Qué actividad realiza el personal que necesita el equipo? Así te oriento al producto correcto.",
    catalogo: "Catálogo Industrial"
  },
  {
    id: "EPP-002",
    categoria: "EPP",
    keywords: ["cascos", "casco de seguridad", "casco construccion", "casco mundial", "ala ancha", "matraca"],
    intencion: "Cascos de protección",
    respuesta: "Manejamos casco de protección tipo mundial (con y sin matraca de ajuste) y casco de ala ancha (también con opción de matraca), fabricados en polietileno de alto impacto, con sistema de suspensión de 8 puntos, disponibles en varios colores y talla única.",
    seguimiento: "¿Prefieres el ajuste con matraca (más preciso) o el ajuste estándar?"
  },
  {
    id: "EPP-004",
    categoria: "EPP",
    keywords: ["lentes", "lentes de seguridad", "goggles", "nemesis", "polarizados", "sobrelentes"],
    intencion: "Lentes de seguridad",
    respuesta: "Manejamos varios modelos: lente básico transparente/oscuro, lente tipo Nemesis (incluye versión camuflaje), google Trilogy cerrado, lente de pasta dura polarizado, sobrelente (para usar sobre lentes graduados) y monogoogle ventilado.",
    seguimiento: "¿Necesitas protección contra impacto, contra polvo/partículas o contra el sol (polarizado)?"
  },
  {
    id: "EPP-005",
    categoria: "EPP",
    keywords: ["guantes", "guantes de trabajo", "tipos de guantes", "guantes de seguridad"],
    intencion: "Guantes de protección",
    respuesta: "Manejamos una variedad amplia: guantes de nylon con nitrilo o poliuretano, guantes anticorte nivel 5, guante inspector de poliéster, guante japonés (algodón con puntos PVC o látex), guante de carnaza (corto y largo), guante para electricista, guante argonero, guante para soldador con hilo Kevlar, guante de nitrilo desechable y guante contra ácidos.",
    seguimiento: "¿Para qué actividad necesitas el guante: manejo general, corte, soldadura, químicos o electricidad?"
  },
  {
    id: "EPP-006",
    categoria: "EPP",
    keywords: ["guantes anticorte", "anticorte nivel 5", "anti impacto", "resistencia a cortes"],
    intencion: "Guantes anticorte",
    respuesta: "Sí, contamos con guantes anticorte nivel 5 en presentación anti-impacto, con palma de nitrilo y con palma de poliuretano, todos con protección de corte certificada nivel 5 y excelente sensibilidad táctil.",
    seguimiento: "¿El riesgo principal en tu operación es corte, impacto o ambos?"
  },
  {
    id: "EPP-007",
    categoria: "EPP",
    keywords: ["guantes para soldador", "soldadura", "hilo kevlar", "carnaza soldador"],
    intencion: "Guantes para soldador",
    respuesta: "Sí, manejamos guante para soldador con hilo Kevlar (disponible en azul y rojo), guante de carnaza corto y largo, y complementos como manga anticorte y manga de carnaza para protección del antebrazo.",
    seguimiento: "¿Necesitas también manga de protección para el antebrazo o mandil?"
  },
  {
    id: "EPP-009",
    categoria: "EPP",
    keywords: ["chalecos", "chaleco reflejante", "chaleco brigadista", "chaleco clase 2", "chaleco con leds", "chaleco rescatista"],
    intencion: "Chalecos de seguridad",
    respuesta: "Tenemos una amplia variedad: chaleco de malla, chaleco clase 2 (con y sin bolsas), chaleco poliéster premium, chaleco sport de malla, chaleco con luces LED, chaleco rescatista desprendible, chaleco cazador, chaleco brigadista (premium y estándar), chaleco ligero espalda de malla y chaleco regio.",
    seguimiento: "¿El chaleco es para uso vial/construcción, para brigada de emergencias, o para identificación de personal?"
  },
  {
    id: "EPP-010",
    categoria: "EPP",
    keywords: ["overoles", "overol", "overol de gabardina", "overol desechable", "mameluco industrial"],
    intencion: "Overoles de trabajo",
    respuesta: "Sí, manejamos overol laminado (desechable, con capucha) y overol de gabardina con franjas reflejantes, este último en tallas de la 36 a la 46.",
    seguimiento: "¿El overol es para protección química/contaminación (desechable) o para uso operativo diario (gabardina)?"
  },
  {
    id: "EPP-013",
    categoria: "EPP",
    keywords: ["arneses", "arnes", "linea de vida", "alturas", "trabajo en alturas", "punto de anclaje"],
    intencion: "Equipo para trabajo en alturas",
    respuesta: "Sí, contamos con arnés de cuerpo completo (versión de 1 aro y de 3 aros), línea de vida (doble gancho grande y de 1 gancho grande), arnés con línea de vida integrada, y punto fijo de anclaje.",
    seguimiento: "¿Cuál es la altura de trabajo y el tipo de estructura donde se realizará el anclaje?"
  },
  {
    id: "EPP-016",
    categoria: "EPP",
    keywords: ["conos", "trafitambos", "senalizacion", "cinta de precaucion", "postes reflejantes", "malla delimitadora"],
    intencion: "Señalización vial y delimitación",
    respuesta: "Sí, manejamos cono vial con reflejantes (en distintos tamaños), trafitambo con reflejantes, poste limitador con reflejante, malla delimitadora, banderola de malla reflejante y cinta limitadora para delimitar zonas de obra.",
    seguimiento: "¿Es para señalización de obra vial, delimitación de área interna de almacén, o ambas?"
  },

  // 5. CALZADO INDUSTRIAL
  {
    id: "CAL-001",
    categoria: "Calzado",
    keywords: ["calzado industrial", "botas de trabajo", "zapatos de seguridad", "bota de casquillo", "calzado de seguridad"],
    intencion: "Calzado industrial",
    respuesta: "Sí, manejamos calzado industrial en tallas de la 22 a la 30 (y hasta 31 en algunos modelos), con opciones de bota industrial y bota roper tipo vaquera, fabricadas en piel de ganado vacuno, con suela antiderrapante y protección contra impacto.",
    seguimiento: "¿El calzado es para construcción, manufactura, logística/almacén u otra actividad?",
    catalogo: "Catálogo de Calzado Industrial"
  },
  {
    id: "CAL-002",
    categoria: "Calzado",
    keywords: ["bota roper", "bota vaquera", "modelos de bota"],
    intencion: "Modelos de bota",
    respuesta: "En nuestro catálogo destacamos la bota industrial (tallas 22 a 31) y la bota roper tipo vaquera (tallas 26 a 30). Contamos también con combinaciones adicionales que nuestro equipo comercial te puede compartir a detalle.",
    seguimiento: "¿Buscas un modelo más robusto tipo bota industrial o un corte más alto tipo roper?"
  },
  {
    id: "CAL-003",
    categoria: "Calzado",
    keywords: ["tallas de calzado", "talla de bota", "talla 27", "calzado para mujer"],
    intencion: "Tallas de calzado",
    respuesta: "Nuestro calzado industrial se maneja en tallas de la 22 a la 30 (con variaciones según el modelo, llegando en algunos estilos hasta la 31).",
    seguimiento: "¿Qué talla necesitas y para qué modelo en particular?"
  },

  // 6. CATÁLOGOS DIGITALES
  {
    id: "CAT-001",
    categoria: "Catálogos",
    keywords: ["catalogo", "catalogos", "ver catalogo", "descargar catalogo", "compartir catalogo", "mandar catalogo"],
    intencion: "Solicitud general de catálogos",
    respuesta: "Sí, contamos con tres catálogos digitales especializados: 1) Catálogo de Uniformes Corporativos, 2) Catálogo Industrial (EPP y seguridad) y 3) Catálogo de Calzado Industrial. Puedes consultarlos y descargarlos directamente en nuestra web o te los podemos compartir por WhatsApp.",
    seguimiento: "¿Cuál de los tres te gustaría revisar primero?"
  },
  {
    id: "CAT-010",
    categoria: "Catálogos",
    keywords: ["catalogo por whatsapp", "mandame el catalogo al whats", "enlace de catalogo"],
    intencion: "Catálogo por WhatsApp",
    respuesta: "Con gusto. Puedes escribirnos directamente a nuestro WhatsApp oficial 56 1287 0780 y ahí un asesor te compartirá los catálogos en PDF y atenderá todas tus dudas comerciales.",
    seguimiento: "¿Quieres que continúe ayudándote por aquí mientras tanto?"
  },

  // 7. PRECIOS, MAYOREO Y COTIZACIONES
  {
    id: "PRE-001",
    categoria: "Precios",
    keywords: ["cuanto cuesta", "precios", "precio", "costo", "cotizacion", "cotizar", "presupuesto"],
    intencion: "Precios y cotizaciones",
    respuesta: "Con gusto te compartimos precios. Para darte el dato exacto necesitamos saber qué producto te interesa específicamente, en qué talla/color y cuántas piezas necesitas, ya que manejamos escalas de precio muy competitivas por volumen.",
    seguimiento: "¿Qué producto te interesa cotizar y en qué cantidad aproximada?"
  },
  {
    id: "PRE-005",
    categoria: "Precios",
    keywords: ["mayoreo", "precio mayoreo", "descuento por volumen", "precio por cantidad", "distribuidor precios"],
    intencion: "Precios de mayoreo",
    respuesta: "Sí, en todas nuestras líneas manejamos escalas de precio según el volumen de compra. A mayor volumen de piezas, obtienes un mejor precio unitario. Para conocer las condiciones de mayoreo aplicables a tu pedido, el equipo comercial te puede armar la propuesta exacta.",
    seguimiento: "¿Buscas comprar por volumen para tu propia empresa o te interesa distribuir la marca?"
  },
  {
    id: "PRE-006",
    categoria: "Precios",
    keywords: ["iva", "incluye iva", "factura", "impuestos", "facturan"],
    intencion: "IVA y Facturación",
    respuesta: "En nuestros catálogos los precios de referencia se muestran antes de IVA (+ IVA). Emitimos factura fiscal para empresas en todos los pedidos formalizados; nuestro equipo administrativo desglosa el precio más impuestos al generar tu cotización.",
    seguimiento: "¿Requieres factura con datos fiscales de tu empresa?"
  },
  {
    id: "LOG-001",
    categoria: "Logística",
    keywords: ["envios", "envio a domicilio", "cobertura", "envian a monterrey", "envian a guadalajara", "toda la republica", "flete"],
    intencion: "Envíos y cobertura nacional",
    respuesta: "Sí, contamos con cobertura de distribución y envíos a todo México. Las condiciones específicas de flete y tiempo dependen del destino y del volumen de tu pedido, y las confirma el equipo comercial y logístico.",
    seguimiento: "¿A qué ciudad o código postal necesitarías el envío?"
  }
];

// Función de búsqueda inteligente sobre la base de conocimiento
export function queryKnowledgeBase(rawQuery: string): {
  found: boolean;
  item?: FAQItem;
  respuesta: string;
  seguimiento?: string;
} {
  const query = rawQuery.toLowerCase().trim();

  // 1. Chequeo de temas prohibidos o fuera de alcance explícito que deben ir al fallback
  const outOfScopeRegex = /(cuanto factura|ganancia de la empresa|opinion de mi vida|que opinas del clima|chiste|receta|otra marca es mala|habla mal de|competencia es peor)/i;
  if (outOfScopeRegex.test(query)) {
    return {
      found: false,
      respuesta: FALLBACK_MESSAGE
    };
  }

  // Normalizar acentos para búsqueda flexible
  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const normalizedQuery = normalize(query);

  // 2. Score por palabras clave
  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const item of FAQ_DATABASE) {
    let score = 0;

    for (const kw of item.keywords) {
      const normKw = normalize(kw);

      if (normalizedQuery === normKw) {
        score += 15;
      } else if (normalizedQuery.includes(normKw)) {
        score += 6 + normKw.length * 0.5;
      } else {
        // Coincidencia de palabras individuales
        const kwWords = normKw.split(/\s+/);
        for (const w of kwWords) {
          if (w.length > 3 && normalizedQuery.includes(w)) {
            score += 2;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Umbral mínimo de confianza
  if (bestMatch && highestScore >= 4) {
    return {
      found: true,
      item: bestMatch,
      respuesta: bestMatch.respuesta,
      seguimiento: bestMatch.seguimiento
    };
  }

  // Si no coincide con nada de la base de conocimiento, aplicar regla estricta:
  return {
    found: false,
    respuesta: FALLBACK_MESSAGE
  };
}

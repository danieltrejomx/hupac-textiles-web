import { NextResponse } from 'next/server';
import { queryKnowledgeBase, FALLBACK_MESSAGE, CONTACT_INFO } from '@/lib/chatKnowledgeBase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = (body.message || '').trim();
    const history = Array.isArray(body.history) ? body.history : [];

    if (!userMessage) {
      return NextResponse.json(
        { error: 'El mensaje no puede estar vacío.' },
        { status: 400 }
      );
    }

    // Consulta en el motor de la base de conocimiento de Hupac Textiles con contexto conversacional
    const kbResult = queryKnowledgeBase(userMessage, { history });

    let reply = kbResult.respuesta;
    if (kbResult.found && kbResult.seguimiento) {
      reply = `${reply}\n\n${kbResult.seguimiento}`;
    }

    return NextResponse.json({
      reply,
      found: kbResult.found,
      links: kbResult.links || [],
      options: kbResult.options || [],
      contact: CONTACT_INFO
    });
  } catch (error) {
    console.error('Error en /api/chat:', error);
    return NextResponse.json(
      {
        reply: FALLBACK_MESSAGE,
        found: false,
        links: [
          { label: "Contactar a Soporte por WhatsApp", url: "https://wa.me/525612870780" },
          { label: "Consultar Catálogos", url: "/catalogo" }
        ],
        options: [
          "Uniformes Corporativos",
          "Playeras Tipo Polo",
          "Seguridad Industrial (EPP)",
          "Hablar con un asesor"
        ],
        contact: CONTACT_INFO
      },
      { status: 200 }
    );
  }
}

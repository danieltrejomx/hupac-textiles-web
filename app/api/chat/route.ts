import { NextResponse } from 'next/server';
import { queryKnowledgeBase, FALLBACK_MESSAGE, CONTACT_INFO } from '@/lib/chatKnowledgeBase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = (body.message || '').trim();

    if (!userMessage) {
      return NextResponse.json(
        { error: 'El mensaje no puede estar vacío.' },
        { status: 400 }
      );
    }

    // Consulta en el motor de la base de conocimiento de Hupac Textiles
    const kbResult = queryKnowledgeBase(userMessage);

    let reply = kbResult.respuesta;
    if (kbResult.found && kbResult.seguimiento) {
      reply = `${reply}\n\n${kbResult.seguimiento}`;
    }

    return NextResponse.json({
      reply,
      found: kbResult.found,
      contact: CONTACT_INFO
    });
  } catch (error) {
    console.error('Error en /api/chat:', error);
    return NextResponse.json(
      {
        reply: FALLBACK_MESSAGE,
        found: false,
        contact: CONTACT_INFO
      },
      { status: 200 }
    );
  }
}

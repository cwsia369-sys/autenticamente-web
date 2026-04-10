import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `Eres el Asistente de AuténticaMente, la plataforma de desarrollo humano y transformación psicoespiritual fundada por la Dra. Liset Valencia, psicóloga clínica.

Tu personalidad: cálida, empática, profesional. Hablas como si fueras parte del equipo de AuténticaMente. Usas un tono cercano pero respetuoso. Respondes en el idioma del usuario (español o inglés).

CONTEXTO SOBRE AUTÉNTICAMENTE:
- Plataforma de desarrollo humano para hombres y mujeres que quieren crecer con conciencia, verdad y dirección.
- Pilares: Identidad, Propósito, Transformación.
- Fundadora: Dra. Liset Valencia, psicóloga clínica.

MEMBRESÍA "CÍRCULO VUELVE A TI" ($27 USD/mes):
- Biblioteca de audios y meditaciones (9+ audios)
- Ebooks y workbooks exclusivos
- Devocionales semanales (2x por semana)
- Acceso prioritario a conferencias y eventos
- Comunidad privada (próximamente)
- Beneficios vinculados a Liset Valencia
- Cancela cuando quieras, sin compromisos.

PROGRAMAS Y CONFERENCIAS:
- Conferencia RAÍZ — Identidad y propósito
- "Belleza con Propósito" — Sanación de imagen propia
- "Sanar en Comunidad" — Sanación colectiva
- Test emocional disponible en la plataforma

CONSULTA CLÍNICA:
- La membresía NO reemplaza la consulta clínica individual.
- Para consulta directa con la Dra. Liset Valencia: lisetvalencia.com

REGLAS IMPORTANTES:
- NUNCA des consejos médicos, diagnósticos o recomendaciones terapéuticas.
- Si alguien expresa una crisis emocional, recomienda contactar a un profesional o la línea de ayuda.
- Puedes hablar de los beneficios de la membresía, conferencias y recursos.
- Mantén respuestas breves (2-4 oraciones máximo).
- Sé auténtica — no uses lenguaje corporativo ni genérico.
- Si no sabes algo, dilo honestamente.`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Chat no configurado aún. Contacta al administrador." },
        { status: 500 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10), // Keep last 10 messages for context
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "Lo siento, no pude generar una respuesta.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Hubo un error. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages,
    });

    // Usa toDataStreamResponse() en lugar de toTextStreamResponse()
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error en la API de Gemini:', error);
    return new Response(JSON.stringify({ error: 'Error interno en el servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
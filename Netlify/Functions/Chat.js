import OpenAI from 'openai';

export const handler = async (event, context) => {
    // Solo permitir peticiones POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const { message, username } = JSON.parse(event.body);

        // Inicializar OpenAI apuntando a OpenRouter usando la variable segura de Netlify
        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY,
            defaultHeaders: {
                "HTTP-Referer": "https://dhl-roblxgroup.netlify.app/", 
                "X-Title": "DHL Roblox Group Assistant"
            }
        });

        const userIdentifier = username ? `@${username}` : "there";

        const systemPrompt = `You are Aida, the DHL Group Virtual Assistant for a Roblox community. 
        When replying to users, if they are logged in, address them as ${userIdentifier}. 
        Keep your answers helpful, friendly, and related to cargo operations and the official Discord: https://discord.gg/2Vvb87kugf`;

        const completion = await openai.chat.completions.create({
            model: "openrouter/free",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ]
        });

        const botReply = completion.choices[0].message.content;

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reply: botReply })
        };

    } catch (error) {
        console.error('Error con OpenRouter:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while processing your message.' })
        };
    }
};

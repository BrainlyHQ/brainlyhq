export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Bezpieczny odczyt klucza po stronie serwera Vercel
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'GROQ_API_KEY is not defined in Vercel environment variables.' });
    }

    try {
        const { messages } = req.body;

        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey.trim()}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.6,
                max_tokens: 800
            })
        });

        if (!groqResponse.ok) {
            const errorText = await groqResponse.text();
            return res.status(groqResponse.status).json({ error: errorText });
        }

        const data = await groqResponse.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Groq Proxy Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

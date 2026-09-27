export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'GROQ_API_KEY is not configured in Vercel.' });
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
                model: 'llama-3.3-70b-versatile', // Ultraszybki i stabilny model
                messages: messages,
                temperature: 0.6,
                max_tokens: 800
            })
        });

        const data = await groqResponse.json();

        if (!groqResponse.ok) {
            return res.status(groqResponse.status).json({ 
                error: data.error?.message || 'Groq API returned an error' 
            });
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
}

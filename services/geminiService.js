const axios = require('axios');

const reviewCodeWithGemini = async (code, language) => {
  const prompt = `You are a senior code reviewer. Analyze the following ${language} code and respond ONLY with valid JSON in this exact format, no other text before or after, no markdown code fences:

{
  "score": <number between 0 and 10>,
  "issues": [
    { "severity": "critical" or "warning" or "minor", "description": "...", "suggestedFix": "..." }
  ]
}

Code to review:
${code}`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }]
    },
    {
      headers: { 'content-type': 'application/json' }
    }
  );

  let rawText = response.data.candidates[0].content.parts[0].text;

  rawText = rawText.replace(/```json|```/g, '').trim();

  const parsed = JSON.parse(rawText);

  return parsed;
};

module.exports = reviewCodeWithGemini;
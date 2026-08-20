const axios = require('axios');

const reviewCodeWithClaude = async (code, language) => {
  const prompt = `You are a senior code reviewer. Analyze the following ${language} code and respond ONLY with valid JSON in this exact format, no other text before or after:

{
  "score": <number between 0 and 10>,
  "issues": [
    { "severity": "critical" or "warning" or "minor", "description": "...", "suggestedFix": "..." }
  ]
}

Code to review:
${code}`;

  const response = await axios.post(
    'https://api.anthropic.com/v1/messages',
    {
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    },
    {
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      }
    }
  );

  const rawText = response.data.content[0].text;
  const parsed = JSON.parse(rawText);

  return parsed;
};

module.exports = reviewCodeWithClaude;
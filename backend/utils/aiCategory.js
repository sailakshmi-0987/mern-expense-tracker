const axios = require('axios');
const getCategoryFromAI = async (title) => {
try {
const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
        model: "text-davinci-003",
        prompt: `Categorize this expense title into one of the categories (Food, Travel, Shopping, Bills, Entertainment, Others): \"${title}\"`,
        max_tokens: 10,
        temperature: 0
    },
    {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    }
);
const category = response.data.choices[0].text.trim();
return category || 'Others';
    } catch (error) {
    console.error("AI Category Prediction Error:", error.message);
    return 'Others';
    }
};
module.exports = getCategoryFromAI;
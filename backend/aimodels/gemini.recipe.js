const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function specificRecipe(recipe) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Extract the name of the dish from the recipe object
    const dishName = recipe.dish;

    // Use the dish name in the prompt
    const prompt = `Get me a complete detailed recipe of ${dishName}. `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
}


module.exports = specificRecipe;

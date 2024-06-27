const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function specificInput(input) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Extract the input content from the request body
    const inputContent = input.message;

    // Use the input content in the prompt
    const prompt = `${inputContent}. `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
}

module.exports = specificInput;



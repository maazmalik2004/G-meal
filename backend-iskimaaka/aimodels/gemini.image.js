// const dotenv = require("dotenv");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const fs = require("fs");
// const path = require('path');
// const util = require('util');
// const writeFile = util.promisify(fs.writeFile);

// // // dotenv.config();

// // // const genAI = new GoogleGenerativeAI("AIzaSyBWr5Y2wVDvBYIsAoXpz9_pl2KYoBXPXbo");

// // // function fileToGenerativePath(filePath, mimeType){
// // //     return {
// // //         inlineData: {
// // //             data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
// // //             mimeType,
// // //         }
// // //     };
// // // }

// // // async function run(base64Data){
// // //     const model = genAI.getGenerativeModel({model:"gemini-pro-vision"});
// // //     const prompt = "Mention the color of the tshirt in the image";

// // //     // Save base64 data to a file
// // //     const filePath = path.join(__dirname, 'temp.jpg');
// // //     const base64Image = base64Data.replace(/^data:image\/jpeg;base64,/, "");
// // //     await writeFile(filePath, base64Image, 'base64');

// // //     const imageParts = [fileToGenerativePath(filePath, "image/jpeg")];
// // //     console.log(imageParts);

// // //     const result = await model.generateContent([prompt, ...imageParts]);
// // //     const response = await result.response;
// // //     return response.text();
// // // }

// // // module.exports = { run };


const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require('path');
const meow = "../backend-iskimaaka/routes/image.jpg";

dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

function fileToGenerativePath(filePath, mimeType){
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
            mimeType,
        },
    };
}
// // // function base64ToGenerativePath(base64Data, mimeType){
// // //     return {
// // //         inlineData: {
// // //             data: base64Data,
// // //             mimeType,
// // //         },
// // //     };
// // // }
// // // async function run(base64Data){
// // //     const model = genAI.getGenerativeModel({model:"gemini-pro-vision"});
// // //     const prompt = "Mention the color of the tshirt in the image";

// // //     const imageParts = [fileToGenerativePath(base64Data,"image/jpeg")]; // Replace "image.jpg" with the correct image file path
// // //     console.log(imageParts);

// // //     const result = await model.generateContent([prompt, ...imageParts]);
// // //     const response = await result.response;
// // //     const text = response.text();
// // //     console.log(text);
// // // }
async function run(){
    const model = genAI.getGenerativeModel({model:"gemini-pro-vision"});
    const prompt = "List out the ingredients from the  image provided and then prepare a detailed recipe out of it"; // Add an equal sign after 'prompt'

    const imageParts = [fileToGenerativePath(meow,"image/jpeg")]; // Replace "image.jpg" with the correct image file path
    console.log(imageParts);

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    return response.text();
}

module.exports = { run };
// // // // Read the image file here
// // // const imageParts = [fileToGenerativePath("image.jpg","image/jpeg")];

// // // module.exports = run;
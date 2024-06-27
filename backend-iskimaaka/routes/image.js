const express = require('express');
const genimage = require("../aimodels/gemini.image.js")
const fs = require('fs');
const path = require('path');

const router = express.Router();
const { run } = require("../aimodels/gemini.image.js");

const aimodelsDirectory = __dirname;

router.post('/', async (req, res) => {
    try {
        const imageData = req.body.imageData;
        console.log('Received image data:', imageData);

        const base64Data = imageData.replace(/^data:image\/png;base64,/, '');

        // Ensure that the directory exists
        if (!fs.existsSync(aimodelsDirectory)) {
            fs.mkdirSync(aimodelsDirectory);
        }

        // Generate a unique filename
        const filename = "image.jpg";

        // Save the decoded image to the aimodels directory
        fs.writeFile(path.join(aimodelsDirectory, filename), base64Data, 'base64', async (err) => {
            if (err) {
                console.error('Error saving image:', err);
                return res.status(500).json({ error: 'Error saving image.' });
            }

            console.log('Image saved successfully:', filename);

            // Delay for 2 seconds
            await delay(2000);

            // Call the imageGeneration function with imageData
            const result = await run();

            console.log('Image generation successful:', result);

            // Send the generated content as response
            res.status(200).json({ generatedContent: result });
        });

    } catch (error) {
        // Log or send an error response if there's an error
        console.error('Error generating content from image:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

// Function to create a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
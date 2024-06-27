const express = require('express');
const router = express.Router();
const specificInput = require('../aimodels/gemini.chatbot');

// POST route to handle preferences data
router.post('/', async (req, res) => {
  try {
    const preferencesData = req.body;
    console.log(preferencesData);
    console.log('Received preferences data:', preferencesData);
  
    // Call the generateRecipe function with preferencesData
    const result = await specificInput(preferencesData);
    
    // Log success message if the data is sent correctly
    console.log('Output generation successful:', result);
    
    // Send the result back as JSON
    res.status(200).json({ response : result });
  
  } catch (error) {
    // Log or send an error response if there's an error
    console.error('Error generating recipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


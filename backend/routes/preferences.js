const express = require('express');
const router = express.Router();
const generateRecipe = require('../aimodels/gemini.text');

// POST route to handle preferences data
router.post('/', async (req, res) => {
  try {
    const preferencesData = req.body;
    console.log('Received preferences data:', preferencesData);
  
    // Call the generateRecipe function with preferencesData
    const result = await generateRecipe(preferencesData);
    
    // Log success message if the data is sent correctly
    console.log('Recipe generation successful:', result);
    const parsedResult = JSON.parse(result);
    
    // Set custom header while keeping Content-Type as application/json
    res.setHeader('Custom-Header', 'value'); // Replace 'value' with your desired value
    res.type('application/json');
    
    // Send the JSON response with the custom header
    res.status(200).json(parsedResult);

  } catch (error) {
    // Log or send an error response if there's an error
    console.error('Error generating recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

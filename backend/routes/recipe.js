const express = require('express');
const router = express.Router();
const generateRecipe = require('../aimodels/gemini.recipe');

// POST route to handle preferences data
router.post('/', async (req, res) => {
  try {
    const preferencesData = req.body;
    console.log('Received preferences data:', preferencesData);
  
    // Call the generateRecipe function with preferencesData
    const result = await generateRecipe(preferencesData);
    
    // Log success message if the data is sent correctly
    console.log('Recipe generation successful:', result);
    
    // Set custom header while keeping Content-Type as text/plain
    res.setHeader('Custom-Header', 'value'); // Replace 'value' with your desired value
    res.type('text/plain');
    
    // Send the result as a string response
    res.status(200).send(result);

  } catch (error) {
    // Log or send an error response if there's an error
    console.error('Error generating recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

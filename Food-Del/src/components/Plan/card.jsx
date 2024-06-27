import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import LinearIndeterminate from './loading.jsx';

const Card = ({ meal, dish, calories }) => {
  // State to store the recipe data
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch recipe data
  const fetchRecipe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8000/recipe", { dish: dish });
      console.log('patil', response);
      setRecipeData(response.data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError("Error fetching recipe. Please try again later.");
    }
  };

  // Function to determine color based on calorie value
  const getCaloriesColor = () => {
    if (calories < 500) {
      return "green";
    } else if (calories >= 500 && calories <= 1500) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-info">
          <p className="bold">{meal}</p>
          <p>{dish}</p>
          <p style={{ color: getCaloriesColor() }}>{calories} cal</p>
        </div>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "orangered",
            color: "white",
            '&:hover': {
              backgroundColor: "darkorange",
            },
          }}
          onClick={fetchRecipe}
        >
          View Recipe
        </Button>
      </div>
      {/* Display recipe data if available */}
      {isLoading && <LinearIndeterminate />}
      {error && <p>{error}</p>}
      {recipeData && (
        <div className="recipe">
          <p className='meal-recipe'>{recipeData}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
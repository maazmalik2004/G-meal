import './Plan.css';

import React, {
  useContext,
  useEffect,
} from 'react';

import DateIcon from '@mui/icons-material/DateRange';

import { StoreContext } from '../../Context/StoreContext.jsx';
import Card from './card.jsx';

const Plan = () => {
  const { plan,setPlan } = useContext(StoreContext);
  useEffect((
  ) => { console.log("plan is", plan);} , [plan]);
  
  // Hard-coded menu data with multiple dates
  /*
  const menuData = [
    {
      "date": "2024-04-28",
      "breakfast": [
        {"dish": "Raisin Bran", "calorie": 265},
        {"dish": "Banana", "calorie": 100},
        {"dish": "Skim Milk", "calorie": 90}
      ],
      "brunch": [
        {"dish": "Cucumber Sandwich", "calorie": 150},
        {"dish": "Mixed Fruit", "calorie": 110},
        {"dish": "Diet Iced Tea", "calorie": 0}
      ],
      "dinner": [
        {"dish": "Teriyaki Salmon with Cauliflower Rice", "calorie": 370},
        {"dish": "Mixed Greens Salad", "calorie": 170},
        {"dish": "Pear Slices", "calorie": 110}
      ]
    },
    {
      "date": "2024-04-29",
      "breakfast": [
        {"dish": "Oatmeal", "calorie": 220},
        {"dish": "Apple", "calorie": 95},
        {"dish": "Almond Milk", "calorie": 60}
      ],
      "brunch": [
        {"dish": "Avocado Toast", "calorie": 300},
        {"dish": "Berry Smoothie", "calorie": 180},
        {"dish": "Green Tea", "calorie": 0}
      ],
      "dinner": [
        {"dish": "Grilled Chicken Breast with Quinoa", "calorie": 400},
        {"dish": "Steamed Broccoli", "calorie": 90},
        {"dish": "Pineapple Slices", "calorie": 70}
      ]
    }
  ];*/

  // Render menu for each date
  const renderMenu = plan.map((menu, index) => (
    <div key={index}>
    <br/>
      <h3 style={{color:"red"}}><DateIcon/>  {menu.date}</h3>
      <br/>
      <div className="container1">
        {/* Map over the meal categories in the menu */}
        {Object.keys(menu).map((mealCategory, mealIndex) => {
          // Skip the date property
          if (mealCategory === 'date') return null;
          return (
            <div key={mealIndex}>
              <h3>{mealCategory.toUpperCase()}</h3>
              {/* Map over the dishes in the current meal category */}
              {menu[mealCategory].map((dish, dishIndex) => (
                <Card
                  key={dishIndex}
                  meal={mealCategory}
                  dish={dish.dish}
                  calories={dish.calorie}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  ));

  return (
    <div className='plan' id='plan'>
      <h1 className="title" >YOUR G-MEAL</h1>
      {/* Render menu for each date */}
      {renderMenu}
    </div>
  );
};

export default Plan;
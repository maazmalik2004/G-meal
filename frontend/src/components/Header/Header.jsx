import './Header.css';

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate(); // Initialize the useNavigate hook for navigation
  
    const handleMenuClick = (menuName) => {
      setMenu(menuName);
    };

  return (
    <div className='header'>
      <div 
        href='#preference'
        onClick={() => handleMenuClick("preferences")} 
        className={`${menu === "preferences" ? "active" : ""}`}
      >
        <div className='header-contents'>
          <h2>Plan Your Meals</h2>
          <p>
          Discover a range of recipes to suit any taste and diet, from energizing breakfasts to hearty dinners. Our meal planner helps you streamline grocery shopping, reduce food waste, and make healthier choices. Create balanced meals and achieve your wellness goals with ease.
          </p>
          <button>Plan Now</button>
        </div>
      </div>
    </div>
  );
};

export default Header;

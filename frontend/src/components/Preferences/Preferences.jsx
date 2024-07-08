import './Preferences.css';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { StoreContext } from '../../Context/StoreContext.jsx';


const Preferences = () => {
  
  const { plan,setPlan } = useContext(StoreContext);
  useEffect((
  ) => { console.log("plan is", plan);} , [plan]);
  
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [preferences, setPreferences] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    dietType: "",
    mealFrequency: "",
    mealSchedule: "",
    date: getTodayDate(),
    allergies:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =await axios.post("http://localhost:8000/preferences", preferences);
      console.log(response.data.menu);
      setPlan(response.data.menu);
    } catch (error) {
      console.error("Error submitting preferences:", error);
    }
  };

  useEffect(() => {console.log("plan updated in preferences",plan)} , [plan]);

  return (
    <div className='preference' id='preference'>
      <h1 className="heading">PREFERENCES</h1>
      <p className="heading">This allows us to prepare a plan suitable to you </p>
      <form onSubmit={handleSubmit} className="container2">
        <input
          type="number"
          name="age"
          value={preferences.age}
          onChange={handleChange}
          required
          className="input"
          placeholder="Age"
        />
        <br />
        <p>Gender</p>
        <select
          name="gender"
          value={preferences.gender}
          onChange={handleChange}
          required
          className="input"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <input
          type="number"
          name="height"
          value={preferences.height}
          onChange={handleChange}
          required
          className="input"
          placeholder="Height (cm)"
        />
        <br />
        <input
          type="number"
          name="weight"
          value={preferences.weight}
          onChange={handleChange}
          required
          className="input"
          placeholder="Weight (kg)"
        />
        <br />
        <p>Diet Type</p>
        <select
          name="dietType"
          value={preferences.dietType}
          onChange={handleChange}
          required
          className="input"
        >
          <option value="">Select</option>
          <option value="balanced">Balanced Diet (Recommended)</option>
          <option value="low-carb">Low-Carb</option>
          <option value="low-fat">Low-Fat</option>
        </select>
        <br />
        <input
          type="number"
          name="mealFrequency"
          value={preferences.mealFrequency}
          onChange={handleChange}
          required
          className="input"
          placeholder="Number of Meals per Day"
        />
        <br />
        <p>Meal Schedule</p>
        <select
          name="mealSchedule"
          value={preferences.mealSchedule}
          onChange={handleChange}
          required
          className="input"
        >
          <option value="">Select</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <br />
        <p>Allergies</p>
        <input
          type="text"
          name="allergies"
          value={preferences.allergies}
          onChange={handleChange}
          required
          className="input"
          placeholder="List any allergies (e.g., peanuts, dairy)"
        />
      
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: 'orangered',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkorange',
            },
          }}
        >
          CREATE PLAN
        </Button>
      </form>
    </div>
  );
};

export default Preferences;

import React, { useState, useEffect } from 'react';
import './stayhydrated.css'; // Styles for the popup

import ScheduleIcon from '@mui/icons-material/Schedule';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const HydrationReminder = () => {
  const [lastReminder, setLastReminder] = useState(
    localStorage.getItem('lastReminder') || 0
  );
  const [showPopup, setShowPopup] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastReminder = currentTime - lastReminder;
      const reminderInterval = 10 * 60 * 1000; // 10 minutes in milliseconds

      if (timeSinceLastReminder >= reminderInterval) {
        // Show popup
        setShowPopup(true);
        // Update last reminder timestamp
        setLastReminder(currentTime);
        // Update local storage
        localStorage.setItem('lastReminder', currentTime);
      } else {
        // Calculate time remaining until next reminder
        setTimeRemaining(reminderInterval - timeSinceLastReminder);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [lastReminder]);

  const handleClosePopup = () => {
    // Close the popup
    setShowPopup(false);
  };

  const formatTime = (milliseconds) => {
    // Convert milliseconds to seconds
    const seconds = Math.floor(milliseconds / 1000);
    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // Format the time as MM:SS
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content">
            <p>Remember to drink water!</p>
            <Fab color="primary" aria-label="Close" onClick={handleClosePopup}>
              <AddIcon />
            </Fab>
          </div>
        </div>
      )}
      <div className="counter-section">
        <ScheduleIcon />{"   "}
        Next water break {formatTime(timeRemaining)}
      </div>
    </>
  );
};

export default HydrationReminder;

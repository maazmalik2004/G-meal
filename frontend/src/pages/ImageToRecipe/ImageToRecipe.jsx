import './ImageToRecipe.css';

import React, {
  useContext,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  PhotoCamera,
  Send,
  VideoCameraBack,
} from '@mui/icons-material';
import {
  Box,
  Fab,
  Typography,
} from '@mui/material';

import { StoreContext } from '../../Context/StoreContext';

const ImageToRecipe = () => {
  
    const [recipe, setRecipe]=useState("Find the recipe here !");
    const videoRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    const {cartItems, food_list, removeFromCart,getTotalCartAmount} = useContext(StoreContext);
    const navigate = useNavigate();
  
    // Function to access webcam
    const getWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };
  
    // Function to capture image
    const captureImage = () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const base64Data = canvas.toDataURL("image/png");
      setImageData(base64Data);
    };
  
    // Function to send image data to server
    const sendImageData = async () => {
      try {
        const response = await axios.post("http://localhost:8000/image", {
          imageData,
        });
        console.log("Response from server:", response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error sending image data:", error);
      }
    };
  
    return (
      <div className="imageUpload" >
      <h1 style={{ textAlign: "left", marginTop: "20px", color: "orangered" }}>Upload Image</h1>
      <h3 style={{ textAlign: "left", marginTop: "20px" }}>Upload an image to get the recipe</h3>
      <br/>
      <br/>
  
        <Box
          style={{
            border: "2px solid gray",
            padding: "20px",
            marginTop: "10px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {/* Each button and text in a vertical flex container */}
          <Box style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center" }}>
            <Fab 
              style={{ backgroundColor: 'orangered', color: 'white', transform: 'scale(1.3)' }} 
              aria-label="start-webcam" 
              onClick={getWebcam}
            >
              <VideoCameraBack />
            </Fab>
            <Typography variant="caption" style={{ marginTop: "10px",marginLeft: "-13px", fontWeight: "bold" }}>
              Start Webcam
            </Typography>
          </Box>
  
          <Box style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center" }}>
            <Fab 
              style={{ backgroundColor: 'orangered', color: 'white', transform: 'scale(1.3)' }} 
              aria-label="capture-image" 
              onClick={captureImage}
            >
              <PhotoCamera />
            </Fab>
            <Typography variant="caption" style={{ marginTop: "10px",marginLeft: "-13px", fontWeight: "bold" }}>
              Capture Image
            </Typography>
          </Box>
  
          <Box style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center"}}>
            <Fab 
              style={{ backgroundColor: 'orangered', color: 'white', transform: 'scale(1.3)' }} 
              aria-label="send-image" 
              onClick={sendImageData}
            >
              <Send />
            </Fab>
            <Typography variant="caption" style={{ marginTop: "10px",marginLeft: "-7px", fontWeight: "bold" }}>
              Send Image
            </Typography>
          </Box>
        </Box>
        <br/>
        <div className="recipe">
        {recipe}
        </div>
        <br/>
        <video ref={videoRef} autoPlay style={{ width: "100%", height: "auto" }}></video>
      </div>
    );
  };
  
  export default ImageToRecipe;
  
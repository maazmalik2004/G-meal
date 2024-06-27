import './upload.css';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { PhotoCamera, Send, VideoCameraBack } from '@mui/icons-material';
import { Box, Fab, Typography, Paper } from '@mui/material';

const ImageUploader = () => {
  const [recipe, setRecipe] = useState("Find the recipe here!");
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [stream, setStream] = useState(null);

  const getWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStream(stream);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const turnOffWebcam = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const base64Data = canvas.toDataURL("image/png");
    setImageData(base64Data);
  };

  const sendImageData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/image", { imageData });
      console.log("Response from server:", response.data);
      setRecipe(response.data.generatedContent);
    } catch (error) {
      console.error("Error sending image data:", error);
    }
  };

  return (
    <div className='upload' id='upload'>
      <h1 style={{ textAlign: "left", marginTop: "20px", color: "orangered" }}>Upload Image</h1>
      <h3 style={{ textAlign: "left", marginTop: "20px" }}>Upload an image to get the recipe</h3>

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
        <Box style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center" }}>
          <Fab
            style={{ backgroundColor: 'orangered', color: 'white', transform: 'scale(1.3)' }}
            aria-label="start-webcam"
            onClick={getWebcam}
          >
            <VideoCameraBack />
          </Fab>
          <Typography variant="caption" style={{ marginTop: "10px", marginLeft: "-13px", fontWeight: "bold" }}>
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
          <Typography variant="caption" style={{ marginTop: "10px", marginLeft: "-13px", fontWeight: "bold" }}>
            Capture Image
          </Typography>
        </Box>

        <Box style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center" }}>
          <Fab
            style={{ backgroundColor: 'orangered', color: 'white', transform: 'scale(1.3)' }}
            aria-label="send-image"
            onClick={() => {
              sendImageData();
              turnOffWebcam();
            }}
          >
            <Send />
          </Fab>
          <Typography variant="caption" style={{ marginTop: "10px", marginLeft: "-7px", fontWeight: "bold" }}>
            Send Image
          </Typography>
        </Box>
      </Box>

      <Paper style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h6" style={{ marginBottom: "10px", color: "orangered" }}>
          Recipe
        </Typography>
        <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
          {recipe}
        </Typography>
      </Paper>

      <video ref={videoRef} autoPlay style={{ display: stream ? "block" : "none", width: "100%", height: "auto", marginTop: "20px" }}></video>
    </div>
  );
};

export default ImageUploader;

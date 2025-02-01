import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { fabric } from "fabric";
import "../components/EditPage.css";

const EditPage = () => {
  const location = useLocation();
  const canvasRef = useRef(null);
  const canvasInstanceRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#f9f9f9",
    });

    canvasInstanceRef.current = canvas;

    // Retrieve the image URL from location state
    const imageUrl = location.state?.imageUrl;
    if (imageUrl) {
      fabric.Image.fromURL(imageUrl, (img) => {
        img.scaleToWidth(800);
        canvas.add(img);
        canvas.renderAll();
      });
    }

    return () => {
      canvas.dispose();
    };
  }, [location]);

  // Handle adding the caption to the canvas
  const handleAddCaption = () => {
    if (caption.trim()) {
      const canvas = canvasInstanceRef.current;
      const text = new fabric.Text(caption, {
        left: 50,
        top: 50,
        fill: "black",
        fontSize: 30,
      });

      canvas.add(text);
      canvas.renderAll();
      setCaption(""); // Clear the input field
    } else {
      alert("Please enter a caption.");
    }
  };

  // Handle adding a description to the canvas
  const handleAddDescription = () => {
    if (description.trim()) {
      const canvas = canvasInstanceRef.current;
      const text = new fabric.Text(description, {
        left: 50,
        top: 100, // Position below the caption
        fill: "blue",
        fontSize: 20,
      });

      canvas.add(text);
      canvas.renderAll();
      setDescription(""); // Clear the input field
    } else {
      alert("Please enter a description.");
    }
  };

  return (
    <div className="edit-page">
      <h1>Edit Image</h1>
      <div className="canvas-container">
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className="caption-container">
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter caption here"
        />
        <button onClick={handleAddCaption}>Add Caption</button>
      </div>
    </div>
  );
};

export default EditPage;
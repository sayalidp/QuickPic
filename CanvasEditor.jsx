import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import fabric from "fabric";  // Corrected import

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const { imageUrl } = location.state;

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      width: 800,
      height: 600,
      backgroundColor: "white",
    });

    fabric.Image.fromURL(imageUrl, (img) => {
      img.scaleToWidth(800);
      canvas.add(img);
    });

    canvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  const addText = () => {
    const text = new fabric.Textbox("Your text here", {
      left: 50,
      top: 50,
      fontSize: 24,
      fill: "#000",
    });
    canvasRef.current.add(text);
  };

  const addShape = (shape) => {
    let shapeObj;
    switch (shape) {
      case "circle":
        shapeObj = new fabric.Circle({
          radius: 50,
          fill: "blue",
          left: 100,
          top: 100,
        });
        break;
      case "rectangle":
        shapeObj = new fabric.Rect({
          width: 100,
          height: 50,
          fill: "green",
          left: 150,
          top: 150,
        });
        break;
      case "triangle":
        shapeObj = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "red",
          left: 200,
          top: 200,
        });
        break;
      default:
        break;
    }
    canvasRef.current.add(shapeObj);
  };

  const downloadImage = () => {
    const dataURL = canvasRef.current.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_image.png";
    link.click();
  };

  return (
    <div className="canvas-editor">
      <h1>Canvas Editor</h1>
      <canvas id="canvas"></canvas>
      <div className="controls">
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={() => addShape("triangle")}>Add Triangle</button>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
};

export default CanvasEditor;

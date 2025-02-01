import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "../components/Box.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const fetchImages = async () => {
    if (!query.trim()) {
      alert("Please enter a search query.");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=r_Hv1NAs2eiYK-Cwus4S_eyOrw0znFbeiKBBubCDD_o`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleEdit = (imageUrl) => {
    navigate("/edit", { state: { imageUrl } });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchImages();
  };

  // Function to handle image download
  const handleDownload = async (imageUrl, imageId) => {
    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "DownloadedImg.jpg"; // Set the filename for the download
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="app">
      <div className="search-page">
        <header>
          {/* <div className="user-info">
            <p>Name: Sayali Dilip Parandwal</p>
            <p>Email: sayalidp17@gmail.com</p>
          </div> */}
        </header>

        <h1>Search Page</h1>
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your search term"
          />
          <i
            className="fa fa-search search-icon"
            onClick={fetchImages}
            title="Search"
            aria-label="Search"
          ></i>
        </div>

        <div className="results-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '100px' }}>
  {images.map((image) => (
    <div key={image.id} className="image-card">
      <img src={image.urls.small} alt={image.alt_description} />
      <div className="button-container">
        {/* <button onClick={() => handleEdit(image.urls.regular)}>Add Captions</button> */}
        <button
          onClick={() => handleDownload(image.urls.full, image.id)}
          className="download-button"
        >
          Download
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default SearchPage;
// src/components/Loading.jsx
import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading weather data...</p>
    </div>
  );
}

export default Loading;
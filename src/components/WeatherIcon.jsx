// src/components/WeatherIcon.jsx
import React from 'react';
import './WeatherIcon.css';

function WeatherIcon({ weatherCode, isLarge = false }) {
  // Map weather codes to icon classes and animation types
  const getIconInfo = (code) => {
    // Thunderstorm
    if (code >= 200 && code < 300) {
      return { icon: 'thunderstorm', animation: 'flash' };
    }
    // Drizzle & Rain
    else if ((code >= 300 && code < 400) || (code >= 500 && code < 600)) {
      return { icon: 'rainy', animation: 'fall' };
    }
    // Snow
    else if (code >= 600 && code < 700) {
      return { icon: 'snowy', animation: 'fall-slow' };
    }
    // Atmosphere (fog, mist, etc)
    else if (code >= 700 && code < 800) {
      return { icon: 'foggy', animation: 'pulse' };
    }
    // Clear
    else if (code === 800) {
      return { icon: 'sunny', animation: 'spin-slow' };
    }
    // Clouds
    else if (code > 800 && code < 900) {
      return { icon: 'cloudy', animation: 'float' };
    }
    // Default
    return { icon: 'question', animation: 'pulse' };
  };

  const { icon, animation } = getIconInfo(weatherCode);
  const sizeClass = isLarge ? 'icon-large' : '';

  return (
    <div className={`weather-icon ${icon} ${animation} ${sizeClass}`}>
      {/* Icon will be styled via CSS based on the classes */}
    </div>
  );
}

export default WeatherIcon;


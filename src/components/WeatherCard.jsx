// src/components/WeatherCard.jsx
import React from 'react';
import WeatherIcon from './WeatherIcon';
import './WeatherCard.css';

function WeatherCard({ weather, location }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="weather-card">
      <div className="city-info">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <p className="date">{formatDate(weather.dt)}</p>
      </div>
      
      <div className="weather-main">
        <div className="temp-container">
          <h1 className="temperature">{Math.round(weather.main.temp)}°C</h1>
          <p className="feels-like">Feels like: {Math.round(weather.main.feels_like)}°C</p>
        </div>
        
        <div className="weather-icon-container">
          <WeatherIcon weatherCode={weather.weather[0].id} isLarge={true} />
          <p className="weather-description">{weather.weather[0].description}</p>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.main.humidity}%</span>
        </div>
        <div className="detail">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{weather.main.pressure} hPa</span>
        </div>
        <div className="detail">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{Math.round(weather.wind.speed * 3.6)} km/h</span>
        </div>
        <div className="detail">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;

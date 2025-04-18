// src/components/ForecastList.jsx
import React from 'react';
import WeatherIcon from './WeatherIcon';
import './ForecastList.css';

function ForecastList({ forecast }) {
  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div className="forecast-item" key={index}>
            <h3>{getDayName(day.dt)}</h3>
            <WeatherIcon weatherCode={day.weather[0].id} />
            <div className="forecast-temp">
              <span className="max">{Math.round(day.main.temp_max)}°</span>
              <span className="min">{Math.round(day.main.temp_min)}°</span>
            </div>
            <p className="forecast-desc">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;


// src/App.jsx
import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import ThemeToggle from './components/ThemeToggle';
import Loading from './components/Loading';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    name: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  const API_KEY = 'da0ee604fe370ef8f7c4b54de269cbc0'; // Replace with your OpenWeatherMap API key
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    // Get user's location on initial load
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude, name: '' });
        fetchWeatherByCoords(latitude, longitude);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to get your location. Please search for a city.');
        setLoading(false);
        // Default to Tokyo if geolocation fails
        fetchWeatherByCity('Tokyo');
      }
    );
  }, []);
  
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      // Current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      
      // Forecast data (5 days)
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      
      setWeather(weatherData);
      setLocation({ lat, lon, name: weatherData.name });
      
      // Process forecast data to get one forecast per day
      const dailyForecasts = processForecastData(forecastData.list);
      setForecast(dailyForecasts);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again later.');
      setLoading(false);
    }
  };
  
  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    try {
      // Current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      
      const weatherData = await weatherResponse.json();
      const { lat, lon } = weatherData.coord;
      
      // Fetch forecast using coordinates for consistency
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      
      setWeather(weatherData);
      setLocation({ lat, lon, name: weatherData.name });
      
      // Process forecast data to get one forecast per day
      const dailyForecasts = processForecastData(forecastData.list);
      setForecast(dailyForecasts);
      
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching city data:', err);
      setError('City not found or network error. Please try again.');
      setLoading(false);
    }
  };
  
  const processForecastData = (forecastList) => {
    const dailyData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date] || new Date(item.dt * 1000).getHours() === 12) {
        // Prefer noon forecasts for each day
        dailyData[date] = item;
      }
    });
    
    // Convert to array and keep only 5 days
    return Object.values(dailyData).slice(0, 5);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeatherByCity(searchQuery);
    }
  };
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="app-container">
      <div className="header">
        <h1>Weather Dash<span className="accent">board</span></h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {weather && (
        <div className="weather-container">
          <WeatherCard weather={weather} location={location} />
          <ForecastList forecast={forecast} />
        </div>
      )}
      <br />
      <hr />
      <footer>
        <p>Created with ❤️ | Data from OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;
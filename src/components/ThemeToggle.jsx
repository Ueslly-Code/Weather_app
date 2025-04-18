// src/components/ThemeToggle.jsx
import React from 'react';
import './ThemeToggle.css';

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className="theme-toggle">
      <div className="toggle-track" onClick={toggleTheme}>
        <div className={`toggle-thumb ${theme}`}></div>
        <div className="toggle-icon moon">🌙</div>
        <div className="toggle-icon sun">☀️</div>
      </div>
    </div>
  );
}

export default ThemeToggle;


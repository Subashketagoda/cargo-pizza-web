import React, { useEffect, useState } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';
import pizzaImg from '../assets/pizza-hero.png';

const Loading = ({ onLoadingComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show loader for 2 seconds, then start fading out
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // After fade out animation completes (0.5s), remove component
    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="pizza-filler">
          <img src={pizzaImg} alt="Realistic Pizza" className="realistic-pizza" />
          <svg viewBox="0 0 100 100" className="pizza-cover">
            <circle 
              cx="50" 
              cy="50" 
              r="25" 
              fill="none" 
              stroke="var(--yellow)" 
              strokeWidth="50" 
              strokeDasharray="157.08" 
              className="pizza-mask-circle"
            />
          </svg>
        </div>
        
        <div className="loading-brand">
          <img src={logo} alt="Cargo Logo" className="loading-logo" />
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
        <p className="loading-text">Baking something delicious...</p>
      </div>
    </div>
  );
};

export default Loading;

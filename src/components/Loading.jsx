import React, { useEffect, useState } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';
import pizzaImg from '../assets/pizza-hero.png';

const Loading = ({ onLoadingComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Fast non-blocking load animation (800ms) for high Lighthouse performance
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 800);

    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 1100);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${isFadingOut ? 'fade-out' : ''}`} aria-label="Loading site">
      <div className="loading-content">
        <div className="pizza-filler">
          <img src={pizzaImg} alt="Cargo Pizza" className="realistic-pizza" />
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

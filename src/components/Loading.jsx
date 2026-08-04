import React, { useEffect, useState } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';
import mascot from '../assets/mascot.png';

const loadingSteps = [
  "Firing up the stone oven... 🔥",
  "Handcrafting fresh dough... 🍕",
  "Adding premium mozzarella... 🧀",
  "Ready to serve! 🚀"
];

const Loading = ({ onLoadingComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState(loadingSteps[0]);

  useEffect(() => {
    // Smooth progress timer (0% to 100% over ~2s)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 5;
        
        // Update step text based on progress
        if (next < 30) setStepText(loadingSteps[0]);
        else if (next < 65) setStepText(loadingSteps[1]);
        else if (next < 90) setStepText(loadingSteps[2]);
        else setStepText(loadingSteps[3]);

        return next;
      });
    }, 90);

    // Start fade out at 2.2s
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2200);

    // Remove component at 2.7s
    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 2700);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${isFadingOut ? 'fade-out' : ''}`}>
      {/* Ambient background glow elements */}
      <div className="loading-bg-glow loading-bg-glow--red"></div>
      <div className="loading-bg-glow loading-bg-glow--yellow"></div>

      <div className="loading-content">
        {/* Animated Mascot Ring */}
        <div className="loading-mascot-container">
          <div className="loading-spinner-ring"></div>
          <div className="loading-mascot-glow"></div>
          <img src={mascot} alt="Cargo Pizza Mascot" className="loading-mascot-img" />
        </div>

        {/* Brand Logo */}
        <img src={logo} alt="Cargo Pizza Logo" className="loading-brand-logo" />

        {/* Progress Bar & Percentage */}
        <div className="loading-bar-wrapper">
          <div className="loading-bar-track">
            <div className="loading-bar-fill" style={{ width: `${progress}%` }}>
              <div className="loading-bar-spark"></div>
            </div>
          </div>
          <div className="loading-info">
            <span className="loading-step-text">{stepText}</span>
            <span className="loading-percentage">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

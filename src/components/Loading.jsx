import React, { useEffect, useState } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';

const Loading = ({ onLoadingComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter from 0 to 100 over ~1.8 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 70);

    // Fade out at 1.8s
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1800);

    // Remove component at 2.3s
    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 2300);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`apple-loader ${isFadingOut ? 'apple-loader--exit' : ''}`}>
      {/* Soft Ambient Backlight */}
      <div className="apple-loader__ambient"></div>

      <div className="apple-loader__content">
        {/* Glowing Brand Logo */}
        <div className="apple-loader__logo-container">
          <div className="apple-loader__logo-glow"></div>
          <img src={logo} alt="Cargo Pizza" className="apple-loader__logo" />
        </div>

        {/* Brand Tagline */}
        <div className="apple-loader__brand-meta">
          <span className="apple-loader__title">CARGO PIZZA</span>
          <span className="apple-loader__subtitle">SRI JAYAWARDENEPURA KOTTE</span>
        </div>

        {/* Minimal Thin Progress Bar */}
        <div className="apple-loader__progress-track">
          <div
            className="apple-loader__progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

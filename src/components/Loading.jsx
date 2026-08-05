import React, { useEffect, useState } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';

const Loading = ({ onLoadingComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 70);

    // Fade out at 1.9s
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1900);

    // Remove component at 2.4s
    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`yellow-fire-loader ${isFadingOut ? 'yellow-fire-loader--exit' : ''}`}>
      {/* Background Rising Fire Sparks & Flames */}
      <div className="fire-spark spark-1">🔥</div>
      <div className="fire-spark spark-2">✨</div>
      <div className="fire-spark spark-3">🔥</div>
      <div className="fire-spark spark-4">✨</div>
      <div className="fire-spark spark-5">🔥</div>

      {/* Ambient Flame Glow Backlight */}
      <div className="yellow-loader__ambient-glow"></div>

      <div className="yellow-loader__content">
        {/* Glowing Brand Logo */}
        <div className="yellow-loader__logo-container">
          <div className="yellow-loader__logo-glow"></div>
          <img src={logo} alt="Cargo Pizza" className="yellow-loader__logo" />
        </div>

        {/* Brand Meta */}
        <div className="yellow-loader__brand-meta">
          <span className="yellow-loader__title">CARGO PIZZA</span>
          <span className="yellow-loader__subtitle">SRI JAYAWARDENEPURA KOTTE</span>
        </div>

        {/* Minimal 4px Progress Track */}
        <div className="yellow-loader__progress-track">
          <div
            className="yellow-loader__progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

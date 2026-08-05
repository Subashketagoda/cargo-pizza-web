import React, { useEffect, useState } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';
import mascot from '../assets/mascot.png';

const loadingSteps = [
  "Firing Up Stone Oven...",
  "Handcrafting Fresh Dough...",
  "Melting Mozzarella...",
  "Ready To Serve!"
];

const Loading = ({ onLoadingComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState(loadingSteps[0]);

  useEffect(() => {
    // Smooth progress counter from 0% to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 5;

        if (next < 30) setStepText(loadingSteps[0]);
        else if (next < 65) setStepText(loadingSteps[1]);
        else if (next < 90) setStepText(loadingSteps[2]);
        else setStepText(loadingSteps[3]);

        return next;
      });
    }, 70);

    // Fade out at 2.1s
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2100);

    // Remove component at 2.6s
    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 2600);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`clean-loader ${isFadingOut ? 'clean-loader--exit' : ''}`}>
      {/* Soft Ambient Background Glow */}
      <div className="clean-loader__glow"></div>

      <div className="clean-loader__content">
        {/* Brand Logo */}
        <div className="clean-loader__logo-wrap">
          <img src={logo} alt="Cargo Pizza" className="clean-loader__logo" />
        </div>

        {/* Mascot in Glowing Ring */}
        <div className="clean-loader__mascot-wrap">
          <div className="clean-loader__ring"></div>
          <div className="clean-loader__ring-glow"></div>
          <img src={mascot} alt="Cargo Mascot" className="clean-loader__mascot" />
        </div>

        {/* Status & Progress Bar */}
        <div className="clean-loader__status-wrap">
          <p className="clean-loader__text">{stepText}</p>
          <div className="clean-loader__bar-track">
            <div
              className="clean-loader__bar-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="clean-loader__bar-glow"></div>
            </div>
          </div>
          <span className="clean-loader__percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;

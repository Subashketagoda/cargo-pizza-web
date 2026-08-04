import React, { useEffect, useState } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';
import mascot from '../assets/mascot.png';

const loadingStages = [
  { text: "Firing up the stone oven (400°C)...", icon: "🔥", tag: "HEAT" },
  { text: "Handcrafting fresh organic dough...", icon: "🍕", tag: "DOUGH" },
  { text: "Melting rich mozzarella & toppings...", icon: "🧀", tag: "TOPPINGS" },
  { text: "Cargo Experience Ready!", icon: "✨", tag: "SERVE" }
];

const Loading = ({ onLoadingComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(loadingStages[0]);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 4;
        
        // Stage transitions
        if (next < 30) setCurrentStage(loadingStages[0]);
        else if (next < 60) setCurrentStage(loadingStages[1]);
        else if (next < 88) setCurrentStage(loadingStages[2]);
        else setCurrentStage(loadingStages[3]);

        return next;
      });
    }, 80);

    // Start fade out at 2.3s
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2300);

    // Remove component at 2.8s
    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`nextlevel-loader ${isFadingOut ? 'nextlevel-loader--exit' : ''}`}>
      {/* Woodfire Ember Particles */}
      <div className="ember-particle ember-1"></div>
      <div className="ember-particle ember-2"></div>
      <div className="ember-particle ember-3"></div>
      <div className="ember-particle ember-4"></div>
      <div className="ember-particle ember-5"></div>

      {/* Ambient Lighting Orbs */}
      <div className="ambient-orb ambient-orb--red"></div>
      <div className="ambient-orb ambient-orb--gold"></div>

      {/* Glassmorphic Main Card */}
      <div className="loader-glass-card">
        {/* Top Tag Badge */}
        <div className="loader-stage-pill">
          <span className="stage-pill-icon">{currentStage.icon}</span>
          <span className="stage-pill-text">{currentStage.tag}</span>
        </div>

        {/* Mascot Centerpiece with Dual Spinning Rings */}
        <div className="mascot-emblem-wrap">
          <div className="spin-ring spin-ring--outer"></div>
          <div className="spin-ring spin-ring--inner"></div>
          <div className="flame-glow-core"></div>
          <img src={mascot} alt="Cargo Pizza Mascot" className="mascot-hero-img" />
        </div>

        {/* Brand Logo */}
        <div className="brand-logo-wrap">
          <img src={logo} alt="Cargo Pizza Logo" className="brand-logo-img" />
        </div>

        {/* Dynamic Status Text */}
        <p className="stage-status-text">{currentStage.text}</p>

        {/* Progress Track & Spark */}
        <div className="progress-section">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }}>
              <div className="progress-spark"></div>
            </div>
          </div>
          <div className="progress-counter">
            <span className="counter-label">PREPARING EXPERIENCE</span>
            <span className="counter-val">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

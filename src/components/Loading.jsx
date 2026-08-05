import React, { useEffect, useState } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';
import mascot from '../assets/mascot.png';

const loadingStages = [
  { id: 0, text: "Firing up the stone oven (400°C)...", icon: "🔥", tag: "STONE OVEN HEAT" },
  { id: 1, text: "Handcrafting fresh organic dough...", icon: "🍕", tag: "FRESH DOUGH" },
  { id: 2, text: "Melting rich mozzarella & toppings...", icon: "🧀", tag: "PREMIUM TOPPINGS" },
  { id: 3, text: "Cargo Pizza Experience Ready!", icon: "✨", tag: "SERVED HOT" }
];

const Loading = ({ onLoadingComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    // Smooth progress counter from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 4;
        
        // Stage transitions based on progress percentage
        if (next < 28) setCurrentStageIdx(0);
        else if (next < 58) setCurrentStageIdx(1);
        else if (next < 88) setCurrentStageIdx(2);
        else setCurrentStageIdx(3);

        return next;
      });
    }, 75);

    // Start fade out at 2.4s
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2400);

    // Remove component at 2.9s
    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 2900);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoadingComplete]);

  const currentStage = loadingStages[currentStageIdx];

  return (
    <div className={`nextlevel-loader ${isFadingOut ? 'nextlevel-loader--exit' : ''}`}>
      {/* Woodfire Floating Ingredients & Embers */}
      <div className="food-ember food-ember-1">🍕</div>
      <div className="food-ember food-ember-2">🧀</div>
      <div className="food-ember food-ember-3">🔥</div>
      <div className="food-ember food-ember-4">🍅</div>
      <div className="food-ember food-ember-5">🌿</div>
      <div className="food-ember food-ember-6">✨</div>

      {/* Ambient Lighting Orbs */}
      <div className="ambient-orb ambient-orb--red"></div>
      <div className="ambient-orb ambient-orb--gold"></div>
      <div className="ambient-orb ambient-orb--blue"></div>

      {/* Glassmorphic Main Card with Gold Shimmer */}
      <div className="loader-glass-card">
        <div className="card-shimmer"></div>

        {/* Top Tag Badge */}
        <div className="loader-stage-pill">
          <span className="stage-pill-icon">{currentStage.icon}</span>
          <span className="stage-pill-text">{currentStage.tag}</span>
        </div>

        {/* Mascot Centerpiece with Dual Spinning Rings & Sonar Pulse */}
        <div className="mascot-emblem-wrap">
          <div className="sonar-wave sonar-wave-1"></div>
          <div className="sonar-wave sonar-wave-2"></div>
          <div className="spin-ring spin-ring--outer"></div>
          <div className="spin-ring spin-ring--inner"></div>
          <div className="flame-glow-core"></div>
          <img src={mascot} alt="Cargo Pizza Mascot" className="mascot-hero-img" />
        </div>

        {/* Brand Logo */}
        <div className="brand-logo-wrap">
          <img src={logo} alt="Cargo Pizza Logo" className="brand-logo-img" />
        </div>

        {/* Stage Step Indicator Dots */}
        <div className="stage-dots-row">
          {loadingStages.map((st, idx) => (
            <div
              key={st.id}
              className={`stage-dot ${idx <= currentStageIdx ? 'stage-dot--active' : ''}`}
            />
          ))}
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
            <span className="counter-label">HANDCRAFTING EXPERIENCE</span>
            <span className="counter-val">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

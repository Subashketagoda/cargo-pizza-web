import React, { useEffect, useState } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';
import pizzaImg from '../assets/pizza-hero.png';

const bakingStages = [
  { progress: 0, text: "Preparing Fresh Pizza Dough...", icon: "🍕" },
  { progress: 30, text: "Sliding Into Woodfire Stone Oven (400°C)...", icon: "🔥" },
  { progress: 70, text: "Baking To Perfection & Melting Mozzarella...", icon: "🧀" },
  { progress: 100, text: "Piping Hot & Ready To Serve!", icon: "✨" }
];

const Loading = ({ onLoadingComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(bakingStages[0].text);
  const [bakingState, setBakingState] = useState("preparing"); // "preparing" | "baking" | "baked"

  useEffect(() => {
    // Progress counter over ~2.5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBakingState("baked");
          setStatusText(bakingStages[3].text);
          return 100;
        }

        const next = prev + 3;

        if (next < 30) {
          setBakingState("preparing");
          setStatusText(bakingStages[0].text);
        } else if (next < 70) {
          setBakingState("baking");
          setStatusText(bakingStages[1].text);
        } else if (next < 95) {
          setBakingState("baking");
          setStatusText(bakingStages[2].text);
        } else {
          setBakingState("baked");
          setStatusText(bakingStages[3].text);
        }

        return next;
      });
    }, 70);

    // Fade out at 2.6s
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2600);

    // Remove component at 3.1s
    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3100);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`oven-loader ${isFadingOut ? 'oven-loader--exit' : ''}`}>
      {/* Fire & Heat Ambient Backlight */}
      <div className="oven-loader__ambient-fire"></div>
      <div className="oven-loader__ambient-glow"></div>

      <div className="oven-loader__container">
        {/* Brand Logo Header */}
        <div className="oven-loader__logo-wrap">
          <img src={logo} alt="Cargo Pizza" className="oven-loader__logo" />
        </div>

        {/* Woodfire Stone Oven Graphic */}
        <div className="stone-oven">
          {/* Oven Chimney & Steam */}
          <div className="oven-chimney">
            <div className="chimney-smoke smoke-1"></div>
            <div className="chimney-smoke smoke-2"></div>
            <div className="chimney-smoke smoke-3"></div>
          </div>

          {/* Stone Arch Structure */}
          <div className="oven-arch">
            <div className="oven-brick-texture"></div>

            {/* Inner Oven Cave / Fire Pit */}
            <div className="oven-mouth">
              {/* Flickering Flames Inside */}
              <div className="oven-flames">
                <span className="flame flame-1">🔥</span>
                <span className="flame flame-2">🔥</span>
                <span className="flame flame-3">🔥</span>
              </div>
              <div className="fire-glow-inside"></div>

              {/* Wood Logs */}
              <div className="oven-logs">
                <span className="log">🪵</span>
                <span className="log">🪵</span>
              </div>

              {/* Pizza on Peel Sliding In and Out */}
              <div className={`pizza-peel-assembly baking-state--${bakingState}`}>
                <div className="peel-handle"></div>
                <div className="peel-blade">
                  <div className="pizza-disc-wrapper">
                    <img
                      src={pizzaImg}
                      alt="Woodfire Pizza Baking"
                      className="baking-pizza-img"
                    />
                    {bakingState === "baking" && <div className="cheese-melt-overlay"></div>}
                    {bakingState === "baked" && <div className="baked-crust-glow"></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Oven Base Hearth */}
          <div className="oven-hearth">
            <span className="hearth-text">STONE OVEN • 400°C WOODFIRE</span>
          </div>
        </div>

        {/* Dynamic Status & Progress Counter */}
        <div className="oven-loader__status-panel">
          <p className="status-message">{statusText}</p>

          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="progress-flame-head">🔥</div>
            </div>
          </div>

          <div className="progress-footer">
            <span className="baking-badge">
              {bakingState === "baked" ? "✨ FRESH & HOT" : "🔥 WOODFIRE BAKING"}
            </span>
            <span className="progress-number">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

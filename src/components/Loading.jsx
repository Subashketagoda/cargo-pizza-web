import React, { useEffect, useState, useRef } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';

const loadingStages = [
  { text: "Firing Up Woodfire Stone Oven... 🔥", tag: "STONE OVEN HEAT" },
  { text: "Handcrafting Organic Dough & Toppings... 🍕", tag: "FRESH DOUGH" },
  { text: "Baking Fresh Pizza in 400°C Heat... 🧀", tag: "WOODFIRE BAKING" },
  { text: "Piping Hot & Ready To Serve! ✨", tag: "SERVED HOT" }
];

const Loading = ({ onLoadingComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(loadingStages[0]);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Web Audio API Fire Crackling Sound Synthesizer
  const startFireSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.2, ctx.currentTime);
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      // 1. Low Roaring Fire Hum (Pink Noise Filtered)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.12;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(mainGain);
      whiteNoise.start();

      // 2. Wood Pop Crackles (Impulses)
      const popInterval = setInterval(() => {
        if (!ctx || ctx.state === 'closed') {
          clearInterval(popInterval);
          return;
        }

        if (Math.random() > 0.25) {
          const popGain = ctx.createGain();
          const popTime = ctx.currentTime;
          popGain.gain.setValueAtTime(Math.random() * 0.28 + 0.06, popTime);
          popGain.gain.exponentialRampToValueAtTime(0.001, popTime + Math.random() * 0.08 + 0.02);

          const popFilter = ctx.createBiquadFilter();
          popFilter.type = 'highpass';
          popFilter.frequency.setValueAtTime(Math.random() * 2200 + 800, popTime);

          const popNoise = ctx.createBufferSource();
          popNoise.buffer = noiseBuffer;

          popNoise.connect(popFilter);
          popFilter.connect(popGain);
          popGain.connect(mainGain);

          popNoise.start(popTime);
          popNoise.stop(popTime + 0.1);
        }
      }, 85);
    } catch (e) {
      console.log("Audio play error", e);
    }
  };

  const stopFireSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.4);
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
        }, 450);
      } catch (e) {}
    }
  };

  // Start Baking Button Click Handler
  const handleStartBake = () => {
    setHasStarted(true);
    startFireSound();
  };

  // 10-Second Progress Timer (triggers only after user clicks Start)
  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 1;

        if (next < 25) setCurrentStage(loadingStages[0]);
        else if (next < 50) setCurrentStage(loadingStages[1]);
        else if (next < 85) setCurrentStage(loadingStages[2]);
        else setCurrentStage(loadingStages[3]);

        return next;
      });
    }, 100);

    // Fade out at 10.0 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
      stopFireSound();
    }, 10000);

    // Remove component at 10.5 seconds
    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 10500);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
      stopFireSound();
    };
  }, [hasStarted, onLoadingComplete]);

  return (
    <div className={`yellow-fire-loader ${isFadingOut ? 'yellow-fire-loader--exit' : ''}`}>
      {/* Background Rising Fire Sparks */}
      <div className="fire-spark spark-1">🔥</div>
      <div className="fire-spark spark-2">✨</div>
      <div className="fire-spark spark-3">🔥</div>
      <div className="fire-spark spark-4">✨</div>
      <div className="fire-spark spark-5">🔥</div>

      {/* Ambient Flame Glow Backlight */}
      <div className="yellow-loader__ambient-glow"></div>

      {/* Initial Screen: Start To Bake Button */}
      {!hasStarted ? (
        <div className="yellow-loader__content start-bake-screen">
          <div className="yellow-loader__logo-container">
            <div className="yellow-loader__logo-glow"></div>
            <img src={logo} alt="Cargo Pizza" className="yellow-loader__logo" />
          </div>

          <div className="yellow-loader__brand-meta">
            <span className="yellow-loader__title">CARGO PIZZA</span>
            <span className="yellow-loader__subtitle">SRI JAYAWARDENEPURA KOTTE</span>
          </div>

          <button className="start-bake-btn" onClick={handleStartBake}>
            🔥 START TO BAKE 🍕
          </button>
          <p className="start-bake-hint">Tap to ignite woodfire oven & enter</p>
        </div>
      ) : (
        /* Baking & 10-Second Loading Screen */
        <div className="yellow-loader__content baking-progress-screen">
          <div className="yellow-loader__stage-pill">
            <span className="stage-pill-txt">{currentStage.tag}</span>
          </div>

          <div className="yellow-loader__logo-container">
            <div className="yellow-loader__logo-glow"></div>
            <img src={logo} alt="Cargo Pizza" className="yellow-loader__logo" />
          </div>

          <p className="yellow-loader__stage-msg">{currentStage.text}</p>

          <div className="yellow-loader__brand-meta">
            <span className="yellow-loader__title">CARGO PIZZA</span>
            <span className="yellow-loader__subtitle">SRI JAYAWARDENEPURA KOTTE</span>
          </div>

          {/* 10-Second Progress Bar Track */}
          <div className="yellow-loader__progress-section">
            <div className="yellow-loader__progress-track">
              <div
                className="yellow-loader__progress-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-flame-head">🔥</div>
              </div>
            </div>
            <div className="yellow-loader__counter-row">
              <span>WOODFIRE BAKING IN PROGRESS</span>
              <span className="counter-val">{progress}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;

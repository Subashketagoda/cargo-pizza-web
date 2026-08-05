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
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStage, setCurrentStage] = useState(loadingStages[0]);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const isAudioActiveRef = useRef(false);

  // Web Audio API Fire Crackling Synthesizer
  const startFireSound = () => {
    try {
      if (isAudioActiveRef.current) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.18, ctx.currentTime);
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
        output[i] *= 0.11;
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

        if (Math.random() > 0.3) {
          const popGain = ctx.createGain();
          const popTime = ctx.currentTime;
          popGain.gain.setValueAtTime(Math.random() * 0.25 + 0.05, popTime);
          popGain.gain.exponentialRampToValueAtTime(0.001, popTime + Math.random() * 0.08 + 0.02);

          const popFilter = ctx.createBiquadFilter();
          popFilter.type = 'highpass';
          popFilter.frequency.setValueAtTime(Math.random() * 2000 + 800, popTime);

          const popNoise = ctx.createBufferSource();
          popNoise.buffer = noiseBuffer;

          popNoise.connect(popFilter);
          popFilter.connect(popGain);
          popGain.connect(mainGain);

          popNoise.start(popTime);
          popNoise.stop(popTime + 0.1);
        }
      }, 90);

      isAudioActiveRef.current = true;
    } catch (e) {
      console.log("Audio autoplay prevented", e);
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

  const toggleMute = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      if (isMuted) {
        gainNodeRef.current.gain.setValueAtTime(0.18, audioCtxRef.current.currentTime);
        setIsMuted(false);
      } else {
        gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        setIsMuted(true);
      }
    } else {
      startFireSound();
      setIsMuted(false);
    }
  };

  useEffect(() => {
    // Attempt auto sound start on load
    startFireSound();

    // User interaction listener to start sound if autoplay policy blocked it
    const handleUserGesture = () => {
      if (!isAudioActiveRef.current) {
        startFireSound();
      }
    };
    window.addEventListener('click', handleUserGesture, { once: true });
    window.addEventListener('touchstart', handleUserGesture, { once: true });

    // Exactly 10 Seconds Loading Timer (100 steps * 100ms = 10,000ms = 10s)
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

    // Start fade out at 10.0 seconds (10000ms)
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
      stopFireSound();
    }, 10000);

    // Remove component at 10.5 seconds (10500ms)
    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 10500);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
      stopFireSound();
      window.removeEventListener('click', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
    };
  }, [onLoadingComplete]);

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

      {/* Sound Mute/Unmute Toggle Button */}
      <button className="fire-sound-toggle" onClick={toggleMute} aria-label="Toggle fire crackle sound">
        {isMuted ? '🔇 Sound Off' : '🔊 Fire Crackle Sound On'}
      </button>

      <div className="yellow-loader__content">
        {/* Stage Badge */}
        <div className="yellow-loader__stage-pill">
          <span className="stage-pill-txt">{currentStage.tag}</span>
        </div>

        {/* Glowing Brand Logo */}
        <div className="yellow-loader__logo-container">
          <div className="yellow-loader__logo-glow"></div>
          <img src={logo} alt="Cargo Pizza" className="yellow-loader__logo" />
        </div>

        {/* Dynamic Cooking Message */}
        <p className="yellow-loader__stage-msg">{currentStage.text}</p>

        {/* Brand Meta */}
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
    </div>
  );
};

export default Loading;

import React, { useEffect, useState, useRef } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';

const dotsCycle = ['.', '..', '...'];

const Loading = ({ onLoadingComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // ── Ultra-Realistic Woodfire Sound Engine ──
  const startFireSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const sampleRate = ctx.sampleRate;
      const bufferSize = sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const nd = noiseBuffer.getChannelData(0);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
      for (let i = 0; i < bufferSize; i++) {
        const w = Math.random() * 2 - 1;
        b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759;
        b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856;
        b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
        nd[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.1;
        b6=w*0.115926;
      }

      // Deep Rumble
      const rumbleSrc = ctx.createBufferSource();
      rumbleSrc.buffer = noiseBuffer; rumbleSrc.loop = true;
      const rumbleLPF = ctx.createBiquadFilter();
      rumbleLPF.type = 'lowpass'; rumbleLPF.frequency.value = 110;
      const rumbleGain = ctx.createGain(); rumbleGain.gain.value = 0.55;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.5;
      const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.2;
      lfo.connect(lfoGain); lfoGain.connect(rumbleGain.gain); lfo.start();
      rumbleSrc.connect(rumbleLPF); rumbleLPF.connect(rumbleGain); rumbleGain.connect(masterGain);
      rumbleSrc.start();

      // Mid Hiss
      const hissSrc = ctx.createBufferSource();
      hissSrc.buffer = noiseBuffer; hissSrc.loop = true;
      const hissBPF = ctx.createBiquadFilter();
      hissBPF.type = 'bandpass'; hissBPF.frequency.value = 750; hissBPF.Q.value = 1.4;
      const hissGain = ctx.createGain(); hissGain.gain.value = 0.28;
      hissSrc.connect(hissBPF); hissBPF.connect(hissGain); hissGain.connect(masterGain);
      hissSrc.start();

      // Wood Pops
      const scheduleWoodPop = () => {
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;
        const nextMs = 30 + Math.random() * 200;
        if (Math.random() > 0.15) {
          const pGain = ctx.createGain();
          const atk = 0.002 + Math.random() * 0.005;
          const dec = 0.02 + Math.random() * 0.12;
          const peak = 0.1 + Math.random() * 0.4;
          pGain.gain.setValueAtTime(0, now);
          pGain.gain.linearRampToValueAtTime(peak, now + atk);
          pGain.gain.exponentialRampToValueAtTime(0.0001, now + atk + dec);
          const pFilter = ctx.createBiquadFilter();
          pFilter.type = 'peaking';
          pFilter.frequency.value = 800 + Math.random() * 4500;
          pFilter.gain.value = 12;
          const pSrc = ctx.createBufferSource();
          pSrc.buffer = noiseBuffer;
          pSrc.connect(pFilter); pFilter.connect(pGain); pGain.connect(masterGain);
          pSrc.start(now); pSrc.stop(now + atk + dec + 0.01);
        }
        setTimeout(scheduleWoodPop, nextMs);
      };
      scheduleWoodPop();

    } catch (e) {
      console.log("Audio play error", e);
    }
  };

  const stopFireSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
        }, 600);
      } catch (e) {}
    }
  };

  const handleStartBake = () => {
    setHasStarted(true);
    startFireSound();
  };

  // Dots typing cycle (every 400ms)
  useEffect(() => {
    if (!hasStarted) return;
    const dotInterval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dotsCycle.length);
    }, 400);
    return () => clearInterval(dotInterval);
  }, [hasStarted]);

  // 6-Second Progress Timer
  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // 50 steps * 120ms = 6000ms
      });
    }, 120);

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
      stopFireSound();
    }, 6000);

    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 6600);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
      stopFireSound();
    };
  }, [hasStarted, onLoadingComplete]);

  return (
    <div className={`premium-loader ${isFadingOut ? 'premium-loader--exit' : ''}`}>
      {/* Background Soft Floating Particles */}
      <div className="particles-container">
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
        <div className="particle p4"></div>
        <div className="particle p5"></div>
        <div className="particle p6"></div>
      </div>

      {/* Soft Yellow Glow Behind Center */}
      <div className="premium-loader__yellow-glow"></div>

      {!hasStarted ? (
        <div className="premium-loader__glass-card start-card">
          <div className="premium-loader__logo-wrapper">
            <div className="logo-ring-outer"></div>
            <div className="logo-ring-pulse"></div>
            <img src={logo} alt="Cargo Pizzeria" className="premium-loader__logo" />
          </div>

          <div className="premium-loader__brand-info">
            <h1 className="brand-title">CARGO PIZZERIA</h1>
            <p className="brand-tagline">WOODFIRED CRAFT PIZZA</p>
          </div>

          <button className="premium-start-btn" onClick={handleStartBake}>
            <span className="btn-glow"></span>
            <span className="btn-text">ENTER CARGO PIZZERIA</span>
          </button>
          <span className="start-subtext">Click to initialize experience</span>
        </div>
      ) : (
        <div className="premium-loader__glass-card progress-card">
          {/* Logo with Dual Concentric Spinning Rings */}
          <div className="premium-loader__logo-wrapper">
            <svg className="pizza-loading-svg" viewBox="0 0 200 200">
              <circle className="ring-track" cx="100" cy="100" r="88" />
              <circle className="ring-fill" cx="100" cy="100" r="88" />
            </svg>
            <svg className="pizza-loading-svg-inner" viewBox="0 0 200 200">
              <circle className="ring-fill-inner" cx="100" cy="100" r="70" />
            </svg>

            {/* Elegant Orbiting Gold Accent Nodes */}
            <div className="orbit-container">
              <span className="orbit-node node-1"></span>
              <span className="orbit-node node-2"></span>
              <span className="orbit-node node-3"></span>
              <span className="orbit-node node-4"></span>
            </div>

            <div className="logo-ambient-yellow"></div>
            <img src={logo} alt="Cargo Pizzeria" className="premium-loader__logo" />
          </div>

          {/* Animated Loading Text */}
          <div className="premium-loader__text-section">
            <h2 className="loading-main-text">
              PREPARING YOUR EXPERIENCE<span className="typing-dots">{dotsCycle[dotIndex]}</span>
            </h2>
            <p className="loading-sub-text">
              Crafting Authentic Woodfired Artisanal Pizza
            </p>
          </div>

          {/* Rounded Pro Progress Bar */}
          <div className="premium-progress-container">
            <div className="premium-progress-track">
              <div
                className="premium-progress-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-glow-tip"></div>
              </div>
            </div>
            <div className="progress-percentage-row">
              <span className="progress-label">HEATING WOODFIRED OVEN</span>
              <span className="progress-value">{progress}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;

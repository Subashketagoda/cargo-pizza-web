import React, { useEffect, useState, useRef } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';
import mascot from '../assets/mascot.png';

const loadingPhrases = [
  'Lighting the Woodfire Oven',
  'Stretching Fresh Dough',
  'Adding Premium Toppings',
  'Crafting Your Experience',
];

const Loading = ({ onLoadingComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [mascotVisible, setMascotVisible] = useState(false);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Mascot entrance delay
  useEffect(() => {
    const t = setTimeout(() => setMascotVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // ── Woodfire Sound Engine ──
  const startFireSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 1.2);
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
        nd[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.08;
        b6=w*0.115926;
      }

      // Deep Rumble
      const rumbleSrc = ctx.createBufferSource();
      rumbleSrc.buffer = noiseBuffer; rumbleSrc.loop = true;
      const rumbleLPF = ctx.createBiquadFilter();
      rumbleLPF.type = 'lowpass'; rumbleLPF.frequency.value = 100;
      const rumbleGain = ctx.createGain(); rumbleGain.gain.value = 0.45;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.4;
      const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.15;
      lfo.connect(lfoGain); lfoGain.connect(rumbleGain.gain); lfo.start();
      rumbleSrc.connect(rumbleLPF); rumbleLPF.connect(rumbleGain); rumbleGain.connect(masterGain);
      rumbleSrc.start();

      // Mid Hiss
      const hissSrc = ctx.createBufferSource();
      hissSrc.buffer = noiseBuffer; hissSrc.loop = true;
      const hissBPF = ctx.createBiquadFilter();
      hissBPF.type = 'bandpass'; hissBPF.frequency.value = 700; hissBPF.Q.value = 1.2;
      const hissGain = ctx.createGain(); hissGain.gain.value = 0.2;
      hissSrc.connect(hissBPF); hissBPF.connect(hissGain); hissGain.connect(masterGain);
      hissSrc.start();

      // Wood Pops
      const scheduleWoodPop = () => {
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;
        const nextMs = 50 + Math.random() * 250;
        if (Math.random() > 0.2) {
          const pGain = ctx.createGain();
          const atk = 0.002 + Math.random() * 0.004;
          const dec = 0.02 + Math.random() * 0.1;
          const peak = 0.08 + Math.random() * 0.3;
          pGain.gain.setValueAtTime(0, now);
          pGain.gain.linearRampToValueAtTime(peak, now + atk);
          pGain.gain.exponentialRampToValueAtTime(0.0001, now + atk + dec);
          const pFilter = ctx.createBiquadFilter();
          pFilter.type = 'peaking';
          pFilter.frequency.value = 900 + Math.random() * 4000;
          pFilter.gain.value = 10;
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

  // Progress & phrase cycling
  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 1300);

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
      stopFireSound();
    }, 5200);

    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 5900);

    return () => {
      clearInterval(interval);
      clearInterval(phraseTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
      stopFireSound();
    };
  }, [hasStarted, onLoadingComplete]);

  return (
    <div className={`cargo-loader ${isFadingOut ? 'cargo-loader--exit' : ''}`}>
      {/* Ambient fire glow */}
      <div className="cargo-loader__fire-glow"></div>
      <div className="cargo-loader__fire-glow cargo-loader__fire-glow--alt"></div>

      {/* Subtle grid lines */}
      <div className="cargo-loader__grid"></div>

      {/* Floating pizza slices */}
      <div className="cargo-loader__slices">
        <span className="floating-slice s1">🍕</span>
        <span className="floating-slice s2">🍕</span>
        <span className="floating-slice s3">🍕</span>
        <span className="floating-slice s4">🧀</span>
        <span className="floating-slice s5">🌶️</span>
        <span className="floating-slice s6">🍕</span>
      </div>

      {/* Spark embers */}
      <div className="cargo-loader__embers">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`ember ember-${i}`}></span>
        ))}
      </div>

      {!hasStarted ? (
        /* ═══════════════ SPLASH / WELCOME SCREEN ═══════════════ */
        <div className="cargo-splash">
          {/* Top badge */}
          <div className="cargo-splash__badge">
            <span className="badge-fire">🔥</span>
            WOODFIRED CRAFT PIZZA
          </div>

          {/* Logo */}
          <div className="cargo-splash__logo-area">
            <div className="cargo-splash__logo-glow"></div>
            <img src={logo} alt="Cargo Pizzeria" className="cargo-splash__logo" />
          </div>

          {/* Mascot with bounce */}
          <div className={`cargo-splash__mascot-area ${mascotVisible ? 'cargo-splash__mascot-area--visible' : ''}`}>
            <img src={mascot} alt="Cargo Pizza Mascot" className="cargo-splash__mascot" />
            <div className="cargo-splash__mascot-shadow"></div>
          </div>

          {/* Tagline */}
          <div className="cargo-splash__text">
            <h2 className="cargo-splash__tagline">
              It's Not Just A Pizza,<br />
              <span>An Experience.</span>
            </h2>
            <p className="cargo-splash__sub">Sri Jayawardenepura Kotte's Favorite Pizza</p>
          </div>

          {/* Glassmorphism card — Enter button + social proof */}
          <div className="cargo-splash__card">
            <button className="cargo-splash__enter-btn" onClick={handleStartBake}>
              <span className="enter-btn__icon">🍕</span>
              <span className="enter-btn__text">ENTER CARGO</span>
              <span className="enter-btn__arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </button>
            <span className="cargo-splash__hint">Tap to begin your pizza journey</span>
            <div className="cargo-splash__proof">
              <span className="cargo-splash__proof-stars">★★★★★</span>
              <span>1000+ happy customers</span>
            </div>
          </div>
        </div>
      ) : (
        /* ═══════════════ LOADING SCREEN ═══════════════ */
        <div className="cargo-loading">
          {/* Spinning pizza ring */}
          <div className="cargo-loading__ring-area">
            <div className="cargo-loading__ring">
              <svg viewBox="0 0 120 120">
                <circle className="ring-bg" cx="60" cy="60" r="54" />
                <circle
                  className="ring-progress"
                  cx="60" cy="60" r="54"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 54}`,
                    strokeDashoffset: `${2 * Math.PI * 54 * (1 - progress / 100)}`
                  }}
                />
              </svg>
            </div>
            <div className="cargo-loading__logo-center">
              <img src={logo} alt="Cargo Pizzeria" />
            </div>
            <div className="cargo-loading__percent">{progress}%</div>
          </div>

          {/* Loading phrase */}
          <div className="cargo-loading__phrase-area">
            <p className="cargo-loading__phrase" key={phraseIndex}>
              {loadingPhrases[phraseIndex]}
            </p>
            <div className="cargo-loading__dots">
              <span></span><span></span><span></span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="cargo-loading__bar-wrap">
            <div className="cargo-loading__bar-track">
              <div
                className="cargo-loading__bar-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="bar-fill__glow"></div>
              </div>
            </div>
          </div>

          <p className="cargo-loading__sub-phrase">Handcrafted with passion, served with love</p>
        </div>
      )}
    </div>
  );
};

export default Loading;

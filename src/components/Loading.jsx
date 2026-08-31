import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Loading.css';
import logoCircle from '../assets/logo-circle.png';
import logo from '../assets/logo.png';
import mascot from '../assets/mascot.png';
import initialPromoVideo from '../assets/initial-promo-video.mp4';

const TOTAL_LOADING_TIME_MS = 5000; // Exactly 5 seconds

const loadingPhrases = [
  "CRAFTING YOUR WOODFIRED EXPERIENCE",
  "PREPARING FRESH ARTISAN DOUGH",
  "HEATING STONE HEARTH OVEN TO 400°C",
  "TOPPING WITH 100% PURE MOZZARELLA",
  "PERFECTING CRUST & FLAVOR IN NAWALA",
  "WELCOME TO CARGO PIZZERIA 🔥"
];

const Loading = ({ onLoadingComplete }) => {
  // Stage: 'splash' -> 'loading' -> 'exit'
  const [stage, setStage] = useState('splash');
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const videoRef = useRef(null);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  // Video Autoplay across all browsers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x5-playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');

    const tryPlay = () => {
      if (video) {
        video.muted = true;
        video.defaultMuted = true;
        video.volume = 0;
        video.playsInline = true;
        const p = video.play();
        if (p !== undefined) p.catch(() => {});
      }
    };

    tryPlay();
    video.addEventListener('loadedmetadata', tryPlay, { once: true });
    video.addEventListener('canplay', tryPlay, { once: true });
  }, []);

  const handleTouchUnlock = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.playsInline = true;
      if (video.paused) video.play().catch(() => {});
    }
  };

  // Start 10-Second Loading Screen when user clicks ENTER CARGO
  const handleEnterCargo = () => {
    handleTouchUnlock();
    setStage('loading');
  };

  // 10-Second Progress Loop (Only runs during 'loading' stage)
  useEffect(() => {
    if (stage !== 'loading') return;

    startTimeRef.current = performance.now();

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current;
      const rawProgress = Math.min(elapsed / TOTAL_LOADING_TIME_MS, 1);
      
      const currentPct = Math.floor(rawProgress * 100);
      setProgress(currentPct);

      const currentIdx = Math.min(
        Math.floor(rawProgress * loadingPhrases.length),
        loadingPhrases.length - 1
      );
      setPhraseIndex(currentIdx);

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setIsCompleted(true);
        setProgress(100);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 350);
        }, 500);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [stage, onLoadingComplete]);

  const currentPhrase = isCompleted
    ? "WELCOME TO CARGO PIZZERIA 🔥"
    : loadingPhrases[phraseIndex];

  return (
    <div
      className={`cargo-loader ${isFadingOut ? 'cargo-loader--exit' : ''}`}
      role="dialog"
      aria-label="Welcome to Cargo Pizza"
    >
      {/* Background Video */}
      <div className="cargo-loader__bg-wrap">
        <video
          ref={videoRef}
          src={initialPromoVideo}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="metadata"
          className="cargo-loader__bg-video"
          aria-label="Cargo Pizzeria Promo Background Video"
        >
          <source src={initialPromoVideo} type="video/mp4" />
        </video>
        <div className="cargo-loader__bg-overlay"></div>
      </div>

      {/* Deep radial ambient background glow */}
      <div className="cargo-loader__glow"></div>
      
      {/* Subtle floating golden particles */}
      <div className="cargo-loader__particles">
        {[...Array(6)].map((_, i) => (
          <span key={i} className={`particle p-${i}`}></span>
        ))}
      </div>

      {/* ═══════════════ STEP 1: STARTING PAGE (SPLASH SCREEN) ═══════════════ */}
      {stage === 'splash' && (
        <div className="cargo-splash" onTouchStart={handleTouchUnlock} onClick={handleTouchUnlock}>
          {/* Top Badge */}
          <div className="cargo-splash__badge">
            <span className="badge-fire">🔥</span>
            #1 WOODFIRED PIZZA IN NAWALA
          </div>

          {/* Logo */}
          <div className="cargo-splash__logo-area">
            <img src={logo} alt="Cargo Pizzeria" className="cargo-splash__logo" width="260" height="90" />
          </div>

          {/* Mascot Character */}
          <div className="cargo-splash__mascot-area">
            <img src={mascot} alt="Cargo Pizza Mascot" className="cargo-splash__mascot" width="130" height="130" />
          </div>

          {/* Taglines */}
          <div className="cargo-splash__text">
            <h2 className="cargo-splash__tagline">
              IT'S NOT JUST A PIZZA,<br />
              <span>AN EXPERIENCE.</span>
            </h2>
            <p className="cargo-splash__sub">Freshly Made • Woodfired • Every Day in Nawala</p>
          </div>

          {/* Glass Card with Enter Cargo Button */}
          <div className="cargo-splash__card">
            <button
              type="button"
              className="cargo-splash__enter-btn"
              onTouchStart={handleTouchUnlock}
              onClick={handleEnterCargo}
            >
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
      )}

      {/* ═══════════════ STEP 2: 10-SECOND LOADING PAGE ═══════════════ */}
      {stage === 'loading' && (
        <div className="cargo-loader__container">
          {/* Top Badge */}
          <div className="cargo-splash__badge" style={{ marginBottom: '1.2rem' }}>
            <span className="badge-fire">🔥</span>
            #1 WOODFIRED PIZZA IN NAWALA
          </div>

          {/* Logo & Circular SVG Progress Ring */}
          <div className="cargo-loader__brand-wrap">
            <svg className="cargo-loader__ring-svg" viewBox="0 0 170 170">
              {/* Track */}
              <circle
                className="ring-track"
                cx="85"
                cy="85"
                r="76"
              />
              {/* Glowing Golden Ring */}
              <circle
                className="ring-bar"
                cx="85"
                cy="85"
                r="76"
                style={{
                  strokeDasharray: `${2 * Math.PI * 76}`,
                  strokeDashoffset: `${2 * Math.PI * 76 * (1 - progress / 100)}`
                }}
              />
            </svg>

            {/* Center Logo Badge */}
            <div className="cargo-loader__logo-box">
              <img
                src={logoCircle || logo}
                alt="Cargo Pizzeria"
                className="cargo-loader__logo"
                width="105"
                height="105"
              />
            </div>
          </div>

          {/* Percentage Counter */}
          <div className="cargo-loader__percentage">
            {progress}<span>%</span>
          </div>

          {/* Dynamic Rotating Message */}
          <div className="cargo-loader__message-box">
            <p className="cargo-loader__message" key={currentPhrase}>
              {currentPhrase}
            </p>
          </div>

          {/* Horizontal Progress Bar */}
          <div className="cargo-loader__bar-wrapper">
            <div className="cargo-loader__bar-track">
              <div
                className="cargo-loader__bar-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="bar-fill__accent"></div>
              </div>
            </div>
          </div>

          {/* Subtext */}
          <p className="cargo-loader__subtext" style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.75)', margin: '0' }}>
            Handcrafted dough • Baked at 400°C • Real hardwood fire
          </p>
        </div>
      )}
    </div>
  );
};

export default Loading;

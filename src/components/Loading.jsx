import React, { useEffect, useState, useRef } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';
import mascot from '../assets/mascot.png';
import initialPromoVideo from '../assets/initial-promo-video.mp4';

const loadingPhrases = [
  "CRAFTING YOUR EXPERIENCE",
  "PREPARING SOMETHING DELICIOUS",
  "FRESH FROM THE KITCHEN",
  "GETTING YOUR TABLE READY",
  "ALMOST READY TO SERVE",
  "WELCOME TO CARGO PIZZERIA"
];

const Loading = ({ onLoadingComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const videoRef = useRef(null);

  // Robust video autoplay across all browsers and devices
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
        if (p !== undefined) {
          p.catch(() => {});
        }
      }
    };

    tryPlay();

    // Event-based playback triggers
    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('canplaythrough', tryPlay);

    // Periodic retry for initial 4 seconds in case network buffer delays initial playback
    const interval = setInterval(() => {
      if (video && video.paused) {
        tryPlay();
      }
    }, 250);

    const stopIntervalTimer = setTimeout(() => {
      clearInterval(interval);
    }, 4000);

    // Fallback on first user interaction (touch/click/pointer/scroll)
    const handleFirstInteraction = () => {
      tryPlay();
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('touchend', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('touchend', handleFirstInteraction, { passive: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });

    return () => {
      clearInterval(interval);
      clearTimeout(stopIntervalTimer);
      if (video) {
        video.removeEventListener('loadedmetadata', tryPlay);
        video.removeEventListener('loadeddata', tryPlay);
        video.removeEventListener('canplay', tryPlay);
        video.removeEventListener('canplaythrough', tryPlay);
      }
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('touchend', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  const handleTouchUnlock = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.setAttribute('x5-playsinline', '');
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  };

  const handleEnterCargo = () => {
    handleTouchUnlock();
    setHasStarted(true);
  };

  // Smooth loading animation loop (duration ~5.5s)
  useEffect(() => {
    if (!hasStarted) return;

    const DURATION = 5500; // ms
    startTimeRef.current = performance.now();

    const animateProgress = (now) => {
      const elapsed = now - startTimeRef.current;
      const rawProgress = Math.min(100, Math.floor((elapsed / DURATION) * 100));

      setProgress(rawProgress);

      if (rawProgress < 100) {
        animFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        setIsCompleted(true);
        // Hold completion state briefly, then fade out
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 700); // match CSS fade transition duration
        }, 600);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hasStarted, onLoadingComplete]);

  // Rotate loading phrases smoothly
  useEffect(() => {
    if (!hasStarted || isCompleted) return;

    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % (loadingPhrases.length - 1));
    }, 1050);

    return () => clearInterval(interval);
  }, [hasStarted, isCompleted]);

  // Current phrase displayed (locked to final phrase when 100%)
  const currentPhrase = isCompleted
    ? "WELCOME TO CARGO PIZZERIA"
    : loadingPhrases[phraseIndex];

  return (
    <div
      className={`cargo-loader ${isFadingOut ? 'cargo-loader--exit' : ''}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      onTouchStart={handleTouchUnlock}
      onPointerDown={handleTouchUnlock}
      onClick={handleTouchUnlock}
    >
      {/* Background Video */}
      <div className="cargo-loader__bg-wrap">
        <video
          ref={(el) => {
            videoRef.current = el;
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
              el.volume = 0;
              el.playsInline = true;
              el.setAttribute('muted', '');
              el.setAttribute('autoplay', '');
              el.setAttribute('playsinline', '');
              el.setAttribute('webkit-playsinline', '');
              el.setAttribute('x5-playsinline', '');
              el.setAttribute('loop', '');
              const p = el.play();
              if (p !== undefined) p.catch(() => {});
            }
          }}
          src={initialPromoVideo}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="auto"
          onLoadedMetadata={(e) => {
            e.target.muted = true;
            e.target.defaultMuted = true;
            e.target.volume = 0;
            e.target.play().catch(() => {});
          }}
          onLoadedData={(e) => {
            e.target.muted = true;
            e.target.defaultMuted = true;
            e.target.volume = 0;
            e.target.play().catch(() => {});
          }}
          onCanPlay={(e) => {
            e.target.muted = true;
            e.target.defaultMuted = true;
            e.target.volume = 0;
            e.target.play().catch(() => {});
          }}
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
        {[...Array(14)].map((_, i) => (
          <span key={i} className={`particle p-${i}`}></span>
        ))}
      </div>

      {!hasStarted ? (
        /* ═══════════════ SPLASH / WELCOME SCREEN (IMAGE MATCH) ═══════════════ */
        <div className="cargo-splash" onTouchStart={handleTouchUnlock} onClick={handleTouchUnlock}>
          {/* Top Badge */}
          <div className="cargo-splash__badge">
            <span className="badge-fire">🔥</span>
            #1 WOODFIRED PIZZA IN NAWALA
          </div>

          {/* Logo */}
          <div className="cargo-splash__logo-area">
            <img src={logo} alt="Cargo Pizzeria" className="cargo-splash__logo" />
          </div>

          {/* Mascot Character */}
          <div className="cargo-splash__mascot-area">
            <img src={mascot} alt="Cargo Pizza Mascot" className="cargo-splash__mascot" />
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
              className="cargo-splash__enter-btn"
              onTouchStart={handleTouchUnlock}
              onClick={(e) => {
                handleTouchUnlock();
                handleEnterCargo();
              }}
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
      ) : (
        /* ═══════════════ CINEMATIC PROGRESS SCREEN ═══════════════ */
        <div className="cargo-loader__container">
          {/* Logo & Circular Ring Wrapper */}
          <div className="cargo-loader__brand-wrap">
            <svg className="cargo-loader__ring-svg" viewBox="0 0 160 160">
              {/* Dark translucent track */}
              <circle
                className="ring-track"
                cx="80"
                cy="80"
                r="72"
              />
              {/* Glowing gold progress ring */}
              <circle
                className="ring-bar"
                cx="80"
                cy="80"
                r="72"
                style={{
                  strokeDasharray: `${2 * Math.PI * 72}`,
                  strokeDashoffset: `${2 * Math.PI * 72 * (1 - progress / 100)}`
                }}
              />
            </svg>

            {/* Logo center */}
            <div className="cargo-loader__logo-box">
              <img src={logo} alt="Cargo Pizzeria" className="cargo-loader__logo" />
            </div>
          </div>

          {/* Percentage Display */}
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
                {/* Subtle leading accent spark */}
                <div className="bar-fill__accent"></div>
              </div>
            </div>
          </div>

          {/* Subtext */}
          <p className="cargo-loader__subtext">
            Handcrafted with passion, served with love
          </p>
        </div>
      )}
    </div>
  );
};

export default Loading;

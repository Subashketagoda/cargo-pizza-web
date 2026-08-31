import React, { useEffect, useState, useRef } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';
import mascot from '../assets/mascot.png';
import initialPromoVideo from '../assets/initial-promo-video.mp4';

const Loading = ({ onLoadingComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
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

    video.addEventListener('loadedmetadata', tryPlay, { once: true });
    video.addEventListener('canplay', tryPlay, { once: true });

    const handleFirstInteraction = () => {
      tryPlay();
    };

    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
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
    setIsFadingOut(true);
    setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 300);
  };

  // Auto-progress if left unattended (~2.5s smooth auto entry)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete();
      }, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`cargo-loader ${isFadingOut ? 'cargo-loader--exit' : ''}`}
      role="dialog"
      aria-label="Welcome to Cargo Pizza"
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
      
      {/* Subtle floating golden particles (Optimized) */}
      <div className="cargo-loader__particles">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`particle p-${i}`}></span>
        ))}
      </div>

      {/* ═══════════════ SPLASH / WELCOME SCREEN ═══════════════ */}
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
            onClick={() => {
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
          <span className="cargo-splash__hint">Tap to explore fresh woodfired pizzas</span>
          <div className="cargo-splash__proof">
            <span className="cargo-splash__proof-stars">★★★★★</span>
            <span>1000+ happy customers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

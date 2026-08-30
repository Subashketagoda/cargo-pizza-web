import React, { useRef, useState, useEffect } from 'react';
import './About.css';
import promoVideo from '../assets/promo-video.mp4';

const About = ({ audioUnlocked }) => {
  const videoRef = useRef(null);
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Auto-play video sound when loading completes / user interacts on mobile
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const attemptPlayAudio = () => {
      vid.muted = false;
      vid.volume = 0.5;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsSoundOn(true);
          })
          .catch(() => {
            // Mobile browser fallback: keep video playing muted until user taps sound button or screen
            vid.muted = true;
            setIsSoundOn(false);
          });
      }
    };

    if (audioUnlocked) {
      attemptPlayAudio();
    }

    // Mobile touch listener fallback to unlock audio on first touch if autoplay was restricted
    const handleMobileTouch = () => {
      if (vid && vid.muted) {
        attemptPlayAudio();
      }
    };

    window.addEventListener('touchstart', handleMobileTouch, { passive: true });
    window.addEventListener('click', handleMobileTouch, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleMobileTouch);
      window.removeEventListener('click', handleMobileTouch);
    };
  }, [audioUnlocked]);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const vid = videoRef.current;
    if (isSoundOn) {
      vid.muted = true;
      setIsSoundOn(false);
    } else {
      vid.muted = false;
      vid.volume = 0.65;
      vid.play()
        .then(() => setIsSoundOn(true))
        .catch(() => {
          setIsSoundOn(false);
        });
    }
  };

  return (
    <section id="about" className="about section" aria-label="About Cargo Pizza Kotte">
      <div className="container">
        {/* Section header */}
        <div className="about__header text-center">
          <span className="about__label">About Us</span>
          <h2 className="section-title">Why Choose <span style={{color: 'var(--red)'}}>Cargo?</span></h2>
          <p className="section-subtitle">We're Sri Jayawardenepura Kotte's premier woodfired pizza destination. Fresh daily dough, bold artisan flavors, and unbeatable value in every slice.</p>
        </div>

        {/* Feature cards */}
        <div className="about__features">
          <article className="feature-card feature-card--accent">
            <div className="feature-card__icon" aria-hidden="true">🍕</div>
            <h3>Fresh Dough Daily</h3>
            <p>Our pizza dough is crafted fresh every single morning — 100% natural, never frozen, always crispy.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__icon" aria-hidden="true">🔥</div>
            <h3>Stone-Fired Woodfire</h3>
            <p>Baked in our high-heat stone oven for that authentic crispy crust and smoky woodfire aroma.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__icon" aria-hidden="true">🧀</div>
            <h3>Premium Toppings</h3>
            <p>Only the finest ingredients — 100% real mozzarella, fresh local produce, and succulent meats.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__icon" aria-hidden="true">💰</div>
            <h3>Best Prices in Colombo</h3>
            <p>Big Heat, Small Bill — 20+ woodfired pizza varieties starting from just Rs. 1,800.</p>
          </article>
        </div>

        {/* Dine-in Promo Banner */}
        <div className="about__promo">
          <div className="promo__content">
            <span className="promo__badge">🎉 Visit Our Pizzeria</span>
            <h3 className="promo__title">Come & Enjoy The Experience!</h3>
            <p className="promo__desc">Walk in, sit back, and enjoy piping hot woodfired pizza right from our stone oven at 422A Nawala Road, Kotte. The ultimate hangout spot for family, friends, and late-night pizza lovers!</p>
            <div className="promo__options">
              <div className="promo__option">
                <div className="promo__option-icon-bg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                  </svg>
                </div>
                <span>Dine-In</span>
              </div>

              <div className="promo__option">
                <div className="promo__option-icon-bg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <span>Takeaway</span>
              </div>

              <div className="promo__option">
                <div className="promo__option-icon-bg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5.8 11.3 2.9 2.9m-2.9-2.9 8.5-8.5a2.12 2.12 0 1 1 3 3l-8.5 8.5m-3-3L3 17l4 1 1 4 2.7-2.8m8.5-12.7 1.4-1.4m-12.7 8.5-1.4 1.4"/>
                  </svg>
                </div>
                <span>Events</span>
              </div>
            </div>
          </div>
          <div className="promo__visual">
            <video
              ref={videoRef}
              src={promoVideo}
              autoPlay
              loop
              muted
              playsInline
              className="promo__video"
              aria-label="Cargo Pizza Woodfire Oven Experience Video"
            />
            <button
              className={`video-sound-toggle ${isSoundOn ? 'video-sound-toggle--on' : ''}`}
              onClick={toggleSound}
              aria-label={isSoundOn ? 'Mute video' : 'Unmute video'}
              title={isSoundOn ? 'Mute sound' : 'Turn on sound'}
            >
              {isSoundOn ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              )}
              <span>{isSoundOn ? 'Sound On' : 'Tap for Sound'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

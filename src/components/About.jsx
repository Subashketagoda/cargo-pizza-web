import React, { useRef, useState, useEffect } from 'react';
import './About.css';
import promoVideo from '../assets/promo-video.mp4';
import realOvenFire from '../assets/real-oven-fire.jpg';
import realOvenPeel from '../assets/real-oven-peel.jpg';
import realTakeawayBoxes from '../assets/real-takeaway-boxes.jpg';
import realDevilledChicken from '../assets/real-devilled-chicken.jpg';

const About = ({ audioUnlocked }) => {
  const videoRef = useRef(null);
  const [isSoundOn, setIsSoundOn] = useState(false);

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
            vid.muted = true;
            setIsSoundOn(false);
          });
      }
    };

    if (audioUnlocked) {
      attemptPlayAudio();
    }

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
    <section id="about" className="about section" aria-label="About Cargo Pizza Nawala">
      <div className="container">
        {/* Section header */}
        <div className="about__header text-center">
          <span className="badge-glow">🔥 THE CARGO DIFFERENCE</span>
          <h2 className="section-title">Why Choose <span style={{ color: 'var(--yellow)' }}>Cargo Pizzeria?</span></h2>
          <p className="section-subtitle">We're Nawala's premier artisan woodfired destination. Real hardwood fire, 400°C stone baking, and big heat for a small bill!</p>
        </div>

        {/* Feature cards */}
        <div className="about__features">
          <article className="feature-card feature-card--accent">
            <div className="feature-card__icon" aria-hidden="true">🍕</div>
            <h3>Fresh Dough Daily</h3>
            <p>Our pizza dough is handcrafted fresh every single morning — 100% natural, never frozen, always crispy.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__icon" aria-hidden="true">🔥</div>
            <h3>Stone-Fired Woodfire</h3>
            <p>Baked in our high-heat stone oven for that authentic crispy crust and smoky woodfire aroma.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__icon" aria-hidden="true">🧀</div>
            <h3>Premium Toppings</h3>
            <p>Only the finest ingredients — 100% real mozzarella, fresh local produce, and succulent spiced meats.</p>
          </article>
          <article className="feature-card">
            <div className="feature-card__icon" aria-hidden="true">💰</div>
            <h3>Best Value in Town</h3>
            <p>Big Heat, Small Bill — 20+ woodfired pizza varieties starting from just Rs. 1,800.</p>
          </article>
        </div>

        {/* Real Oven Craftsmanship Photo Strip */}
        <div className="about__gallery-strip">
          <div className="about__gallery-item">
            <img src={realOvenPeel} alt="Cargo Pizza Woodfire Stone Oven Peel" loading="lazy" />
            <div className="about__gallery-caption">
              <span>🔥 400°C Stone Oven</span>
              <p>Hand-stretched dough into the blazing hearth</p>
            </div>
          </div>

          <div className="about__gallery-item">
            <img src={realOvenFire} alt="Real Hardwood Woodfire Pizza Baking" loading="lazy" />
            <div className="about__gallery-caption">
              <span>🪵 Real Hardwood Fire</span>
              <p>Golden mozzarella melting over crispy crust</p>
            </div>
          </div>

          <div className="about__gallery-item">
            <img src={realTakeawayBoxes} alt="Cargo Pizza Fresh Takeaway Boxes" loading="lazy" />
            <div className="about__gallery-caption">
              <span>🚗 Hot Takeaway & Pick-Up</span>
              <p>Freshly sliced and boxed for friends & family</p>
            </div>
          </div>

          <div className="about__gallery-item">
            <img src={realDevilledChicken} alt="Sri Lankan Devilled Chicken Pizza" loading="lazy" />
            <div className="about__gallery-caption">
              <span>🌶️ Signature Devilled Pizza</span>
              <p>Sri Lankan spice blend with 100% mozzarella</p>
            </div>
          </div>
        </div>

        {/* Dine-in Promo Banner */}
        <div className="about__promo">
          <div className="promo__content">
            <span className="promo__badge">🎉 Visit Our Pizzeria</span>
            <h3 className="promo__title">Come & Enjoy The Live Woodfire Experience!</h3>
            <p className="promo__desc">Walk in, sit back, and enjoy piping hot woodfired pizza right from our stone oven at 422A Nawala Road, Nawala. The ultimate hangout spot for family, friends, and late-night pizza lovers!</p>
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
                <span>Takeaway / Pick-Up</span>
              </div>

              <div className="promo__option">
                <div className="promo__option-icon-bg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <span>Late Night Hangout</span>
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

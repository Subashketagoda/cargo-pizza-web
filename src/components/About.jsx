import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import promoVideo from '../assets/promo-video.mp4';
import realHeartPizza from '../assets/real-heart-pizza.jpg';
import realCheesePull from '../assets/real-cheese-pull.jpg';
import realOvenFire from '../assets/real-oven-fire.jpg';
import realTakeawayBoxes from '../assets/real-takeaway-boxes.jpg';

const About = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Lazy load video only when user scrolls near About section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
        }
      },
      { rootMargin: '250px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Robust autoplay once video is loaded
  useEffect(() => {
    if (!shouldLoadVideo) return;
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

    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('canplaythrough', tryPlay);

    const interval = setInterval(() => {
      if (video && video.paused) {
        tryPlay();
      }
    }, 300);

    const timer = setTimeout(() => clearInterval(interval), 4000);

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
      clearTimeout(timer);
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
  }, [shouldLoadVideo]);

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

  return (
    <section id="about" className="about section" ref={sectionRef} aria-label="About Cargo Pizza Nawala">
      <div className="container">
        {/* Section header */}
        <div className="about__header text-center">
          <span className="about__label">THE CARGO DIFFERENCE</span>
          <h2 className="section-title">Why Choose <span style={{ color: 'var(--red)' }}>Cargo Pizzeria?</span></h2>
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
            <h3>100% Real Mozzarella</h3>
            <p>Irresistible cheese pull moments with generous premium mozzarella and rich herb sauces.</p>
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
            <img src={realHeartPizza} alt="Handcrafted Heart Pizza with Cargo Sign" loading="lazy" decoding="async" width="400" height="300" />
            <div className="about__gallery-caption">
              <span>Heart-Shaped Pizza</span>
              <p>Special artisan crust baked under neon lights</p>
            </div>
          </div>

          <div className="about__gallery-item">
            <img src={realCheesePull} alt="Irresistible 100% Mozzarella Cheese Pull" loading="lazy" decoding="async" width="400" height="300" />
            <div className="about__gallery-caption">
              <span>100% Mozzarella Pull</span>
              <p>Thick stringy cheese on hot artisan slice</p>
            </div>
          </div>

          <div className="about__gallery-item">
            <img src={realOvenFire} alt="Real Hardwood Woodfire Pizza Baking" loading="lazy" decoding="async" width="400" height="300" />
            <div className="about__gallery-caption">
              <span>Real Hardwood Fire</span>
              <p>400°C stone hearth baking to perfection</p>
            </div>
          </div>

          <div className="about__gallery-item">
            <img src={realTakeawayBoxes} alt="Cargo Pizza Fresh Takeaway Boxes" loading="lazy" decoding="async" width="400" height="300" />
            <div className="about__gallery-caption">
              <span>Fresh Hot Takeaway</span>
              <p>Freshly sliced and boxed for pick-up</p>
            </div>
          </div>
        </div>

        {/* Dine-in Promo Banner */}
        <div className="about__promo">
          <div className="promo__content">
            <span className="promo__badge">Visit Our Pizzeria</span>
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

          <div className="promo__visual" onTouchStart={handleTouchUnlock} onClick={handleTouchUnlock}>
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
              src={promoVideo}
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
              preload="auto"
              poster={realOvenFire}
              onLoadedMetadata={(e) => {
                e.target.muted = true;
                e.target.defaultMuted = true;
                e.target.play().catch(() => {});
              }}
              onLoadedData={(e) => {
                e.target.muted = true;
                e.target.defaultMuted = true;
                e.target.play().catch(() => {});
              }}
              onCanPlay={(e) => {
                e.target.muted = true;
                e.target.defaultMuted = true;
                e.target.play().catch(() => {});
              }}
              className="promo__video"
              aria-label="Cargo Pizza Woodfire Oven Experience Video"
            >
              <source src={promoVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

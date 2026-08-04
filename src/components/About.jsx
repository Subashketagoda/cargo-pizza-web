import React from 'react';
import './About.css';
import promoVideo from '../assets/promo-video.mp4';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        {/* Section header */}
        <div className="about__header text-center">
          <span className="about__label">About Us</span>
          <h2 className="section-title">Why Choose <span style={{color: 'var(--red)'}}>Cargo?</span></h2>
          <p className="section-subtitle">We're not just a pizza place — we're a vibe. Fresh ingredients, bold flavors, and a whole lot of love in every slice.</p>
        </div>

        {/* Feature cards */}
        <div className="about__features">
          <div className="feature-card feature-card--accent">
            <div className="feature-card__icon">🍕</div>
            <h3>Fresh Dough Daily</h3>
            <p>Our dough is made fresh every single day — never frozen, always perfect.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">🔥</div>
            <h3>Stone-Fired</h3>
            <p>Cooked in our stone oven for that authentic crispy, smoky flavor.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">🧀</div>
            <h3>Premium Toppings</h3>
            <p>Only the finest ingredients — real mozzarella, fresh veggies, and quality meats.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">💰</div>
            <h3>Best Prices</h3>
            <p>Big Heat, Small Bill — quality pizza that won't break the bank.</p>
          </div>
        </div>

        {/* Dine-in Promo Banner */}
        <div className="about__promo">
          <div className="promo__content">
            <span className="promo__badge">🎉 Visit Us</span>
            <h3 className="promo__title">Come & Enjoy the Experience!</h3>
            <p className="promo__desc">Walk in, sit back, and enjoy freshly made pizza right from our stone oven. The perfect spot for family, friends, and good vibes!</p>
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
              src={promoVideo}
              autoPlay
              loop
              muted
              playsInline
              className="promo__video"
              aria-label="Cargo Pizza Woodfire Oven Experience Video"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

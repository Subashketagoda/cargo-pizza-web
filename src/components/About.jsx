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
                <span className="promo__option-icon">🍽️</span>
                <span>Dine-in</span>
              </div>
              <div className="promo__option">
                <span className="promo__option-icon">🏪</span>
                <span>Take Away</span>
              </div>
              <div className="promo__option">
                <span className="promo__option-icon">🎉</span>
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

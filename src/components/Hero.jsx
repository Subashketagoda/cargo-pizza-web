import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import logo from '../assets/logo.png';
import mascot from '../assets/mascot.png';
import pizzaHero from '../assets/pizza-hero.png';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero ${isVisible ? 'hero--visible' : ''}`} ref={heroRef} aria-label="Cargo Pizza - Best Pizza in Sri Jayawardenepura Kotte">
      {/* Background */}
      <div className="hero__bg">
        <img src={pizzaHero} alt="Fresh handcrafted Cargo Pizza with premium toppings" className="hero__bg-img" role="presentation" />
        <div className="hero__overlay"></div>
        {/* Animated grain texture */}
        <div className="hero__grain"></div>
      </div>

      {/* Decorative floating elements */}
      <div className="hero__decor">
        <span className="hero__decor-emoji d1">🍕</span>
        <span className="hero__decor-emoji d2">🧀</span>
        <span className="hero__decor-emoji d3">🌶️</span>
        <span className="hero__decor-emoji d4">🍅</span>
      </div>

      <div className="container hero__inner">
        {/* Left: Text Content */}
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot"></span>
            Freshly made • woodfired • everyday
          </div>

          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            🍕 #1 Pizza in Town
          </div>

          <h1 className="hero__title">
            Your craving.<br />
            <span className="hero__title--accent">Our pizza.</span>
          </h1>

          <p className="hero__desc">
            Handcrafted with passion, served with love. Fresh dough, premium toppings, and woodfire flavour that turns every craving into a proper Cargo Pizza moment.
          </p>

          <div className="hero__actions">
            <a href="#menu" className="btn btn-primary btn--lg hero__btn-menu">
              <span>View Our Menu</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="tel:0778817742" className="btn btn-yellow btn--lg hero__btn-call">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Order Now</span>
            </a>
          </div>

          <div className="hero__scroll" aria-label="Scroll to explore menu">
            <span>Scroll to explore</span>
            <div className="hero__scroll-line" aria-hidden="true"></div>
            <a href="#menu" aria-label="Scroll to menu section">↓</a>
          </div>

          {/* Stats strip */}
          <div className="hero__stats">
            <div className="hero__stat">
              <strong>1000+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <strong>20+</strong>
              <span>Pizza Varieties</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <strong>4.9⭐</strong>
              <span>Customer Rating</span>
            </div>
          </div>
        </div>

        {/* Right: Mascot with floating elements */}
        <div className="hero__visual">
          <div className="hero__mascot-glow"></div>
          <div className="hero__mascot-wrapper">
            <img src={mascot} alt="Cargo Pizza Mascot" className="hero__mascot" />
          </div>
          {/* Floating price tag */}
          <div className="hero__float hero__float--price">
            <span>Starting at</span>
            <strong>Rs.1800</strong>
          </div>
          {/* Floating tagline */}
          <div className="hero__float hero__float--tag">
            🔥 Big Heat Small Bill
          </div>
        </div>
      </div>

      {/* Wavy bottom divider */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 80 1440 80V100H0V40Z" fill="#FFD700"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

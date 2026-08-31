import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import mascot from '../assets/mascot.png';
import pizzaHero from '../assets/pizza-hero.png';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero ${isVisible ? 'hero--visible' : ''}`} ref={heroRef} aria-label="Cargo Pizza - Handcrafted Woodfired Pizza in Nawala">
      {/* Background Image */}
      <div className="hero__bg">
        <img
          src={pizzaHero}
          alt="Fresh handcrafted Cargo Pizza woodfired in stone oven with premium toppings"
          className="hero__bg-img"
          loading="eager"
          fetchPriority="high"
          width="1920"
          height="1080"
        />
        <div className="hero__overlay"></div>
        <div className="hero__ambient-glow"></div>
      </div>

      <div className="container hero__inner">
        {/* Left: Text & Action Area */}
        <div className="hero__content">
          <div className="hero__tagline-pill">
            <span className="pill-dot"></span>
            <span>NAWALA'S PREMIER WOODFIRED PIZZERIA</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title--gold">IT'S NOT JUST A PIZZA,</span>
            <span className="hero__title--white">AN EXPERIENCE.</span>
          </h1>

          <p className="hero__desc">
            Handcrafted fresh dough baked at 400°C with real hardwood fire and 100% premium mozzarella in Nawala. Big Heat, Small Bill!
          </p>

          <div className="hero__actions">
            <a href="#menu" className="btn btn-primary btn--lg hero__btn-menu">
              <span>Explore Our Menu</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="tel:0778817742" className="btn btn-yellow btn--lg hero__btn-call">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call: 077 881 7742</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="hero__stats">
            <div className="hero__stat">
              <strong>4.9 / 5</strong>
              <span>1000+ Reviews</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <strong>400°C</strong>
              <span>Stone Hearth Oven</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <strong>20+</strong>
              <span>Artisan Flavors</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <strong>Rs. 1,800</strong>
              <span>Starting Price</span>
            </div>
          </div>
        </div>

        {/* Right: Mascot & Floating Badges */}
        <div className="hero__visual">
          <div className="hero__mascot-aura"></div>
          <div className="hero__mascot-wrapper">
            <img
              src={mascot}
              alt="Cargo Pizza Chef Mascot - Best Pizza in Kotte"
              className="hero__mascot"
              width="400"
              height="400"
            />
          </div>

          {/* Floating price tag */}
          <div className="hero__float hero__float--price">
            <span>Starting at</span>
            <strong>Rs. 1800</strong>
          </div>

          {/* Floating tagline */}
          <div className="hero__float hero__float--tag">
            🔥 Big Heat Small Bill
          </div>
        </div>
      </div>

      {/* Elegant Bottom Wave Transition */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 80 1440 80V100H0V40Z" fill="#0a1128"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import './Hero.css';
import mascot from '../assets/mascot.png';
import pizzaHero from '../assets/pizza-hero.png';

const Hero = () => {
  return (
    <section className="hero">
      {/* Cinematic dark background */}
      <div className="hero__bg">
        <img src={pizzaHero} alt="Fresh Stone Fired Pizza" className="hero__bg-img" loading="eager" />
        <div className="hero__overlay"></div>
      </div>

      <div className="container hero__inner">
        {/* Left Content Column */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-fire">🔥</span>
            <span>#1 Pizza Restaurant in Nawala</span>
          </div>

          <h1 className="hero__title">
            It's Not Just Pizza,<br />
            <span className="hero__title--accent">It's An Experience.</span>
          </h1>

          <p className="hero__desc">
            Handcrafted stone-fired pizzas made fresh daily in Nawala. Premium mozzarella, gourmet toppings, and fast delivery to Rajagiriya, Kotte & Colombo!
          </p>

          <div className="hero__actions">
            <a href="#menu" className="btn btn-gold btn--lg">
              View Our Menu
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a 
              href="https://wa.me/94778817742?text=Hi%20Cargo%20Pizzeria!%20I%20want%20to%20place%20an%20order." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp btn--lg"
            >
              💬 WhatsApp Order
            </a>
          </div>

          {/* Stats Bar */}
          <div className="hero__stats">
            <div className="hero__stat">
              <strong>1,000+</strong>
              <span>Happy Foodies</span>
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

        {/* Right Visual Column */}
        <div className="hero__visual">
          <div className="hero__mascot-wrapper">
            <img src={mascot} alt="Cargo Pizzeria Mascot" className="hero__mascot" width="420" height="420" />
          </div>

          {/* Floating Price Pill */}
          <div className="hero__float hero__float--price">
            <span>Pizzas starting at</span>
            <strong>Rs. 1,800</strong>
          </div>

          {/* Floating Tagline */}
          <div className="hero__float hero__float--tag">
            🔥 Big Heat, Small Bill
          </div>
        </div>
      </div>

      {/* Bottom Wave Transition */}
      <div className="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 80 1440 80V100H0V40Z" fill="#13161c"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

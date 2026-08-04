import React from 'react';
import './About.css';
import interiorImg from '../assets/restaurant-interior.png';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        {/* Section Header */}
        <div className="about__header text-center">
          <span className="section-badge">Why Choose Cargo</span>
          <h2 className="section-title">The Ultimate <span className="text-gold">Pizza Restaurant</span> in Nawala</h2>
          <p className="section-subtitle">
            We are not just a pizza joint — we are a culinary vibe. Serving pizza lovers across Nawala, Rajagiriya, and Kotte with fresh ingredients, stone-fired craft, and unbeatable flavors.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="about__features">
          <div className="feature-card feature-card--accent">
            <div className="feature-card__icon">🍕</div>
            <h3>Fresh Dough Daily</h3>
            <p>Our pizza dough is kneaded fresh every morning. No preservatives, no freezing — just pure artisan dough.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">🔥</div>
            <h3>Stone-Fired Perfection</h3>
            <p>Baked in authentic high-heat stone ovens for that smoky flavor and irresistible crispy crust.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">🧀</div>
            <h3>Gourmet Ingredients</h3>
            <p>100% real mozzarella cheese, vine-ripened tomato sauces, and locally sourced fresh meats & veggies.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">💰</div>
            <h3>Big Heat, Small Bill</h3>
            <p>Generous portions, packed toppings, and budget-friendly prices for families, friends & students.</p>
          </div>
        </div>

        {/* Dine-in & Family Experience Banner */}
        <div className="about__promo">
          <div className="promo__content">
            <span className="promo__badge">🎉 Family Restaurant in Nawala</span>
            <h3 className="promo__title">Come & Experience the Vibe!</h3>
            <p className="promo__desc">
              Looking for a cozy family restaurant near Rajagiriya & Kotte? Visit Cargo Pizzeria for a warm atmosphere, freshly stone-baked pizzas, cold refreshers, and memory-making food!
            </p>

            <div className="promo__options">
              <div className="promo__option">
                <span className="promo__option-icon">🍽️</span>
                <span>Dine-In</span>
              </div>
              <div className="promo__option">
                <span className="promo__option-icon">🏪</span>
                <span>Takeaway</span>
              </div>
              <div className="promo__option">
                <span className="promo__option-icon">🛵</span>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          <div className="promo__visual">
            <img 
              src={interiorImg} 
              alt="Cargo Pizzeria Dining Area" 
              className="promo__img" 
              loading="lazy" 
              width="450" 
              height="280"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

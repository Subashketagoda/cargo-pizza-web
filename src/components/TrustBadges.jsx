import React from 'react';
import './TrustBadges.css';

const TrustBadges = () => {
  const badges = [
    {
      icon: '🍕',
      title: 'Fresh Dough Daily',
      desc: 'Handcrafted fresh every morning — never frozen.'
    },
    {
      icon: '🔥',
      title: 'Authentic Stone-Fired',
      desc: 'Baked to perfection for a crispy, smoky crust.'
    },
    {
      icon: '🚀',
      title: 'Fast Local Delivery',
      desc: 'Hot & fresh to Nawala, Rajagiriya & Kotte.'
    },
    {
      icon: '🧀',
      title: 'Premium Ingredients',
      desc: 'Real mozzarella, fresh herbs & quality meats.'
    }
  ];

  return (
    <section className="trust-badges">
      <div className="container">
        <div className="trust-badges__grid">
          {badges.map((badge, idx) => (
            <div key={idx} className="trust-card">
              <div className="trust-card__icon">{badge.icon}</div>
              <div className="trust-card__info">
                <h3 className="trust-card__title">{badge.title}</h3>
                <p className="trust-card__desc">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

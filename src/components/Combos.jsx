import React from 'react';
import './Combos.css';

const combosData = [
  {
    id: 1,
    title: "Double Pizza Party",
    badge: "POPULAR",
    price: "Rs. 3,850",
    oldPrice: "Rs. 4,350",
    desc: "Choose any 2 Large Handcrafted Pizzas + 1.5L Soft Drink.",
    icon: "🍕🍕",
    tagColor: "#e63946"
  },
  {
    id: 2,
    title: "Family Feast Combo",
    badge: "BEST VALUE",
    price: "Rs. 4,990",
    oldPrice: "Rs. 5,600",
    desc: "3 Medium Pizzas + Cheesy Garlic Bread + 1.5L Soft Drink.",
    icon: "🎉",
    tagColor: "#ffb703"
  },
  {
    id: 3,
    title: "Solo Craver Box",
    badge: "HOT DEAL",
    price: "Rs. 2,100",
    oldPrice: "Rs. 2,400",
    desc: "1 Personal Pizza + Fresh Garlic Knots + Chilled Beverage.",
    icon: "🥤",
    tagColor: "#2a3f8f"
  }
];

const Combos = () => {
  return (
    <section id="combos" className="combos-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center combos-header">
          <span className="combos-badge">🔥 Hot Deals & Offers</span>
          <h2 className="section-title" style={{ color: 'var(--blue-dark)' }}>
            Special <span style={{ color: 'var(--red)' }}>Cargo Combos</span>
          </h2>
          <p className="section-subtitle">
            Get more heat for less! Delicious combo savings handcrafted for friends, families, and solo cravings.
          </p>
        </div>

        {/* Combo Cards Grid */}
        <div className="combos-grid">
          {combosData.map((combo) => (
            <div key={combo.id} className="combo-card">
              <div className="combo-card__top">
                <span className="combo-card__badge" style={{ backgroundColor: combo.tagColor }}>
                  {combo.badge}
                </span>
                <div className="combo-card__icon">{combo.icon}</div>
              </div>

              <h3 className="combo-card__title">{combo.title}</h3>
              <p className="combo-card__desc">{combo.desc}</p>

              <div className="combo-card__pricing">
                <span className="combo-card__price">{combo.price}</span>
                {combo.oldPrice && <span className="combo-card__old-price">{combo.oldPrice}</span>}
              </div>

              <a href="tel:0778817742" className="btn btn-primary combo-card__btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Order This Combo
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Combos;

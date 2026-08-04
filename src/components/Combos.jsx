import React from 'react';
import './Combos.css';

const Combos = () => {
  const comboDeals = [
    {
      id: 1,
      name: 'Family Feast Combo',
      badge: '🔥 BEST SELLER',
      price: 'Rs. 5,400',
      savings: 'Save Rs. 800',
      description: '2 Large 12" Pizzas of your choice + 1 Garlic Bread Portion + 2 Cold Refreshers (Mojitos/Tea).',
      items: ['2x 12" Large Pizzas', '1x Garlic Bread', '2x Refreshers'],
      whatsappText: 'Hi Cargo Pizzeria! I would like to order the Family Feast Combo (Rs. 5,400).'
    },
    {
      id: 2,
      name: 'Couple Combo Deal',
      badge: 'POPULAR CHOICE',
      price: 'Rs. 3,600',
      savings: 'Save Rs. 500',
      description: '1 Large 12" Pizza + 1 Gourmet Hot Dog + 2 Drinks + 1 Chocolate Lava Cake.',
      items: ['1x 12" Large Pizza', '1x Gourmet Hot Dog', '2x Refreshers', '1x Lava Cake'],
      whatsappText: 'Hi Cargo Pizzeria! I would like to order the Couple Combo Deal (Rs. 3,600).'
    },
    {
      id: 3,
      name: 'Solo Craver Pack',
      badge: 'VALUE DEAL',
      price: 'Rs. 2,400',
      savings: 'Save Rs. 300',
      description: '1 Medium Pizza + 1 Fresh Mojito + 1 Dessert Slice. Perfect for a quick solo craving!',
      items: ['1x Medium Pizza', '1x Fresh Mojito', '1x Dessert Slice'],
      whatsappText: 'Hi Cargo Pizzeria! I would like to order the Solo Craver Pack (Rs. 2,400).'
    }
  ];

  return (
    <section id="combos" className="combos section">
      <div className="container">
        <div className="combos__header text-center">
          <span className="section-badge">Value Deals & Offers</span>
          <h2 className="section-title">Special <span className="text-gold">Combo Offers</span></h2>
          <p className="section-subtitle">
            Get more slice for your coin! Hand-crafted pizza bundles designed for families, couples, and party nights in Nawala & nearby areas.
          </p>
        </div>

        <div className="combos__grid">
          {comboDeals.map((combo) => (
            <div key={combo.id} className="combo-card">
              <div className="combo-card__header">
                <span className="combo-card__badge">{combo.badge}</span>
                <span className="combo-card__savings">{combo.savings}</span>
              </div>

              <h3 className="combo-card__name">{combo.name}</h3>
              <div className="combo-card__price">{combo.price}</div>
              <p className="combo-card__desc">{combo.description}</p>

              <ul className="combo-card__list">
                {combo.items.map((item, idx) => (
                  <li key={idx}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <a 
                href={`https://wa.me/94778817742?text=${encodeURIComponent(combo.whatsappText)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp combo-card__btn"
              >
                💬 Order This Combo
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Combos;

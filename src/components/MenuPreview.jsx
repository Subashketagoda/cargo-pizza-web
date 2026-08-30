import React, { useState } from 'react';
import './MenuPreview.css';

const menuItems = [
  { name: 'Veggie Delight', price: '1,900', category: 'pizzas', tag: 'VEGGIE DECK', vegetarian: true },
  { name: 'Margherita', price: '2,000', category: 'pizzas', tag: 'VEGGIE DECK', vegetarian: true },
  { name: 'Fungi Fiesta', price: '2,000', category: 'pizzas', tag: 'VEGGIE DECK', vegetarian: true },
  { name: 'Sausage Delight', price: '1,800', category: 'pizzas', tag: 'MEATY DECK' },
  { name: 'Devilled Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK' },
  { name: 'Tandoori Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK' },
  { name: 'BBQ Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK' },
  { name: 'Spicy Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK' },
  { name: 'Fungi Chicken', price: '2,200', category: 'pizzas', tag: 'MEATY DECK' },
  { name: 'Lamb Slam', price: '2,600', category: 'pizzas', tag: 'CARGO SPECIALS' },
  { name: 'Holy Prawn', price: '2,800', category: 'pizzas', tag: 'CARGO SPECIALS' },
  { name: 'Full Loaded Meat', price: '2,900', category: 'pizzas', tag: 'CARGO SPECIALS' },
  { name: 'Tuna', price: '2,700', category: 'pizzas', tag: 'CARGO SPECIALS' },
  { name: 'Lava Cake', price: '350', category: 'desserts', tag: 'DESSERTS' },
  { name: 'Iced Milo', price: '350', category: 'drinks', tag: 'BEVERAGES' },
  { name: 'Peached Ice Tea', price: '300', category: 'drinks', tag: 'BEVERAGES' },
  { name: 'Strawberry Mojito', price: '500', category: 'drinks', tag: 'BEVERAGES' },
  { name: 'Black Mojito', price: '500', category: 'drinks', tag: 'BEVERAGES' },
  { name: 'Passion Mojito', price: '500', category: 'drinks', tag: 'BEVERAGES' },
  { name: 'Lime Mojito', price: '500', category: 'drinks', tag: 'BEVERAGES' },
  { name: 'Extra Cheese', price: '300', category: 'addons', tag: 'ADD ONS' },
  { name: 'Extra Meat', price: '400', category: 'addons', tag: 'ADD ONS' },
  { name: 'Extra Veg', price: '200', category: 'addons', tag: 'ADD ONS' },
];

const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState('pizzas');

  const tabs = [
    { id: 'pizzas', label: 'Pizzas' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'addons', label: 'Add Ons' },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="menu-section" aria-label="Handcrafted Pizza Menu in Sri Jayawardenepura Kotte">
      <div className="menu-section__bg"></div>

      {/* Elegant Hero to Menu Scroll Divider */}
      <div className="menu-section__divider">
        <div className="menu-section__divider-line"></div>
        <div className="menu-section__divider-badge">
          <span className="divider-badge__dot"></span>
          CHOOSE YOUR FAVORITE
          <span className="divider-badge__dot"></span>
        </div>
        <div className="menu-section__divider-line"></div>
      </div>

      <div className="container menu-section__inner">
        {/* Header */}
        <div className="text-center menu-section__header">
          <span className="menu-section__label">HANDCRAFTED CARGO MENU</span>
          <h2 className="section-title" style={{color: 'var(--blue-dark)'}}>Discover Our <span style={{color: 'var(--red)'}}>Menu</span></h2>
          <p className="section-subtitle" style={{color: '#0f1b47'}}>Every item is handcrafted with premium ingredients, real mozzarella, and made fresh to order in Sri Jayawardenepura Kotte.</p>
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs" role="tablist" aria-label="Menu categories">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`menu-tab ${activeTab === tab.id ? 'menu-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', width: '100%', color: 'var(--blue-dark)' }}>
              No items in this category yet.
            </div>
          ) : (
            filteredItems.map((item, i) => (
              <article key={item.id || i} className="menu-card" aria-label={`${item.name} - Rs. ${item.price}`}>
                <div className="menu-card__content">
                  <div className="menu-card__header">
                    {item.tag && <span className="menu-card__tag">{item.tag}</span>}
                    <h3 className="menu-card__name">
                      {item.vegetarian && <span className="menu-card__veg-badge" title="Vegetarian" aria-label="Vegetarian">V</span>}
                      {item.name}
                      {item.category === 'pizzas' && <span className="menu-card__size">12&quot;</span>}
                    </h3>
                    {item.description && <p className="menu-card__description">{item.description}</p>}
                  </div>
                  
                  <div className="menu-card__action-row">
                    <div className="menu-card__prices">
                      {item.size9 ? <span><b>9&quot;</b> {item.size9}</span> : <span className="menu-card__price-val">Rs. {item.price}</span>}
                      {item.size14 && <span><b>14&quot;</b> {item.size14}</span>}
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;

import React, { useState } from 'react';
import './MenuPreview.css';

const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState('all');

  const menuItems = [
    { name: 'Veggie Delight', price: '1,900', category: 'veggie', tag: '🟢 Veg', popular: false },
    { name: 'Margherita', price: '2,000', category: 'veggie', tag: '🟢 Veg', popular: true },
    { name: 'Fungi Fiests', price: '2,000', category: 'veggie', tag: '🟢 Veg', popular: false },
    { name: 'Sausage Delight', price: '1,800', category: 'meaty', tag: '', popular: false },
    { name: 'Devilled Chicken', price: '2,100', category: 'meaty', tag: '🌶️ Spicy', popular: true },
    { name: 'Tandoori Chicken', price: '2,100', category: 'meaty', tag: '🌶️ Spicy', popular: false },
    { name: 'BBQ Chicken', price: '2,100', category: 'meaty', tag: '', popular: true },
    { name: 'Loaded Lamb', price: '2,600', category: 'meaty', tag: '⭐ Premium', popular: false },
    { name: 'Spicy Chicken', price: '2,100', category: 'meaty', tag: '🌶️ Spicy', popular: false },
    { name: 'Fungi Chicken', price: '2,200', category: 'meaty', tag: '', popular: false },
    { name: 'Lamb Slam', price: '2,600', category: 'specials', tag: '⭐ Premium', popular: true },
    { name: 'Holy Prawn', price: '2,800', category: 'specials', tag: '⭐ Premium', popular: false },
    { name: 'Full Loaded Meat', price: '2,900', category: 'specials', tag: '🏆 Best Seller', popular: true },
    { name: 'Tuna', price: '2,700', category: 'specials', tag: '', popular: false },
    { name: 'Strawberry Mojito', price: '500', category: 'drinks', tag: '', popular: true },
    { name: 'Black Mojito', price: '500', category: 'drinks', tag: '', popular: false },
    { name: 'Passion Mojito', price: '500', category: 'drinks', tag: '', popular: false },
    { name: 'Lime Mojito', price: '500', category: 'drinks', tag: '', popular: false },
    { name: 'Iced Milo', price: '350', category: 'drinks', tag: '', popular: false },
    { name: 'Peached Ice Tea', price: '300', category: 'drinks', tag: '', popular: false },
  ];

  const tabs = [
    { id: 'all', label: 'All', emoji: '🍽️' },
    { id: 'veggie', label: 'Veggie', emoji: '🥬' },
    { id: 'meaty', label: 'Meaty', emoji: '🍖' },
    { id: 'specials', label: 'Specials', emoji: '⭐' },
    { id: 'drinks', label: 'Drinks', emoji: '🍹' },
  ];

  const filteredItems = activeTab === 'all' ? menuItems : menuItems.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="menu-section">
      {/* Dark background */}
      <div className="menu-section__bg"></div>

      <div className="container menu-section__inner">
        {/* Header */}
        <div className="text-center menu-section__header">
          <span className="menu-section__label">Our Menu</span>
          <h2 className="section-title" style={{color: 'var(--white)'}}>Discover Our <span style={{color: 'var(--yellow)'}}>Pizzas</span></h2>
          <p className="section-subtitle" style={{color: 'rgba(255,255,255,0.6)'}}>Every pizza is handcrafted with premium ingredients. All pizzas are 12" and made fresh to order.</p>
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`menu-tab ${activeTab === tab.id ? 'menu-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="menu-tab__emoji">{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredItems.map((item, i) => (
            <div key={i} className="menu-card">
              <div className="menu-card__content">
                <div className="menu-card__top">
                  <h4 className="menu-card__name">{item.name}</h4>
                  {item.popular && <span className="menu-card__popular">🔥 Popular</span>}
                </div>
                {item.tag && <span className="menu-card__tag">{item.tag}</span>}
              </div>
              <div className="menu-card__price">
                <span className="menu-card__currency">Rs.</span>
                <span className="menu-card__amount">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="menu-addons">
          <h3 className="menu-addons__title">Add Ons</h3>
          <div className="menu-addons__list">
            <span className="menu-addon">🧀 Extra Cheese — Rs.300</span>
            <span className="menu-addon">🥩 Extra Meat — Rs.400</span>
            <span className="menu-addon">🥬 Extra Veg — Rs.200</span>
          </div>
        </div>

        {/* Dessert highlight */}
        <div className="menu-dessert">
          <div className="menu-dessert__content">
            <span>🍫</span>
            <div>
              <h4>Lava Cake</h4>
              <p>Molten chocolate goodness</p>
            </div>
          </div>
          <span className="menu-dessert__price">Rs.350</span>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;

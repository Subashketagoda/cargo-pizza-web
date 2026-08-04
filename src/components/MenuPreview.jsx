import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './MenuPreview.css';
import placeholderImg from '../assets/pizza-hero.png';

const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState('pizzas');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // High-quality static fallback items ensuring page is never empty or visually broken
  const fallbackMenu = [
    { id: 'f1', name: 'Margherita', price: '2,000', category: 'pizzas', tag: 'VEGGIE DECK 12"', popular: true, imageUrl: placeholderImg },
    { id: 'f2', name: 'Devilled Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK 12"', popular: true, imageUrl: placeholderImg },
    { id: 'f3', name: 'BBQ Chicken', price: '2,100', category: 'pizzas', tag: 'MEATY DECK 12"', popular: true, imageUrl: placeholderImg },
    { id: 'f4', name: 'Lamb Slam', price: '2,600', category: 'pizzas', tag: 'CARGO SPECIALS', popular: true, imageUrl: placeholderImg },
    { id: 'f5', name: 'Full Loaded Meat', price: '2,900', category: 'pizzas', tag: 'CARGO SPECIALS', popular: true, imageUrl: placeholderImg },
    { id: 'f6', name: 'Veggie Delight', price: '1,900', category: 'pizzas', tag: 'VEGGIE DECK 12"', popular: false, imageUrl: placeholderImg },
    { id: 'f7', name: 'Fungi Fiesta', price: '2,000', category: 'pizzas', tag: 'VEGGIE DECK 12"', popular: false, imageUrl: placeholderImg },
    { id: 'f8', name: 'Loaded Lamb', price: '2,600', category: 'pizzas', tag: 'MEATY DECK 12"', popular: false, imageUrl: placeholderImg },
    { id: 'f9', name: 'Strawberry Mojito', price: '500', category: 'drinks', tag: 'REFRESHERS', popular: true, imageUrl: placeholderImg },
    { id: 'f10', name: 'Black Mojito', price: '500', category: 'drinks', tag: 'REFRESHERS', popular: false, imageUrl: placeholderImg },
    { id: 'f11', name: 'Chocolate Lava Cake', price: '600', category: 'desserts', tag: 'DESSERTS', popular: true, imageUrl: placeholderImg },
    { id: 'f12', name: 'Classic Hot Dog', price: '850', category: 'hotdogs', tag: 'HOT DOGS', popular: true, imageUrl: placeholderImg }
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menuItems"));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        
        if (items.length > 0) {
          setMenuItems(items);
        } else {
          setMenuItems(fallbackMenu);
        }
      } catch (err) {
        console.error("Error fetching menu items from Firestore:", err);
        setMenuItems(fallbackMenu);
      }
      setLoading(false);
    };

    fetchMenuItems();
  }, []);

  const tabs = [
    { id: 'pizzas', label: '🍕 Pizzas' },
    { id: 'drinks', label: '🍹 Drinks & Refreshers' },
    { id: 'desserts', label: '🍰 Desserts' },
    { id: 'hotdogs', label: '🌭 Hot Dogs' }
  ];

  const filteredItems = menuItems.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="menu-section section">
      <div className="container">
        {/* Header */}
        <div className="text-center menu-section__header">
          <span className="section-badge">Handcrafted Selection</span>
          <h2 className="section-title">Discover Our <span className="text-gold">Featured Menu</span></h2>
          <p className="section-subtitle">
            Every pizza is baked fresh to order in our high-heat stone oven using authentic ingredients and secret spices.
          </p>
        </div>

        {/* Category Filter Tabs */}
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

        {/* Menu Items Grid */}
        <div className="menu-grid">
          {loading ? (
            <div className="menu-loading">
              <div className="menu-loading-spinner"></div>
              <p>Loading freshly baked menu...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="menu-empty">
              <p>No items found in this category.</p>
            </div>
          ) : (
            filteredItems.map((item, i) => {
              const orderText = `Hi Cargo Pizzeria! I would like to order 1x ${item.name} (Rs. ${item.price}).`;
              const isPopular = item.popular;

              return (
                <div key={item.id || i} className="menu-card">
                  <div className="menu-card__image-wrapper">
                    <img 
                      src={item.imageUrl || placeholderImg} 
                      alt={item.name} 
                      className="menu-card__img" 
                      loading="lazy" 
                      width="160"
                      height="160"
                    />
                    {isPopular && <span className="menu-card__popular-badge">🔥 BEST SELLER</span>}
                  </div>

                  <div className="menu-card__body">
                    {item.tag && <span className="menu-card__tag">{item.tag}</span>}
                    <h3 className="menu-card__name">{item.name}</h3>

                    <div className="menu-card__footer">
                      <div className="menu-card__price">Rs. {item.price}</div>
                      
                      <a 
                        href={`https://wa.me/94778817742?text=${encodeURIComponent(orderText)}`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="menu-card__order-btn"
                        aria-label={`Order ${item.name} on WhatsApp`}
                      >
                        Order 💬
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;

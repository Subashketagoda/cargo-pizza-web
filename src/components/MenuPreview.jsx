import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './MenuPreview.css';
import placeholderImg from '../assets/pizza-hero.png';

const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState('pizzas');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menuItems"));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        
        // If Firestore is empty, fallback to some initial data so the screen isn't broken
        if (items.length === 0) {
          setMenuItems([
            { name: 'Loading from Database...', price: '...', category: 'pizzas', tag: 'PLEASE WAIT' }
          ]);
        } else {
          setMenuItems(items);
        }
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setMenuItems([
          { name: 'Database Error', price: '...', category: 'pizzas', tag: 'ERROR' }
        ]);
      }
      setLoading(false);
    };

    fetchMenuItems();
  }, []);

  const tabs = [
    { id: 'pizzas', label: 'Pizzas' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'hotdogs', label: 'Hot Dogs' },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="menu-section">
      <div className="menu-section__bg"></div>

      <div className="container menu-section__inner">
        {/* Header */}
        <div className="text-center menu-section__header">
          <span className="menu-section__label">Our Menu</span>
          <h2 className="section-title" style={{color: 'var(--blue-dark)'}}>Discover Our <span style={{color: '#ffb703'}}>Menu</span></h2>
          <p className="section-subtitle" style={{color: 'rgba(26,45,109,0.6)'}}>Every item is handcrafted with premium ingredients and made fresh to order.</p>
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`menu-tab ${activeTab === tab.id ? 'menu-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {loading ? (
            <div style={{ textAlign: 'center', width: '100%', color: 'var(--blue-dark)' }}>
              Loading Menu from Database...
            </div>
          ) : filteredItems.length === 0 ? (
            <div style={{ textAlign: 'center', width: '100%', color: 'var(--blue-dark)' }}>
              No items in this category yet.
            </div>
          ) : (
            filteredItems.map((item, i) => (
              <div key={item.id || i} className="menu-card">
                {item.tag && <div className="menu-card__tag-pill">{item.tag}</div>}
                
                <img src={placeholderImg} alt={item.name} className="menu-card__img" />
                
                <h4 className="menu-card__name">{item.name}</h4>
                
                <div className="menu-card__price-pill">
                  Rs. {item.price}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;

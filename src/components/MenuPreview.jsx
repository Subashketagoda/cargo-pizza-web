import React, { useState } from 'react';
import './MenuPreview.css';

const menuItems = [
  { 
    name: 'Veggie Delight', 
    price: '1,900', 
    category: 'pizzas', 
    tag: 'VEGGIE DECK', 
    vegetarian: true,
    description: 'Crisp bell peppers, red onions, mushrooms, juicy tomatoes, and melted mozzarella on our artisan crust.'
  },
  { 
    name: 'Margherita', 
    price: '2,000', 
    category: 'pizzas', 
    tag: 'CLASSIC ITALIAN', 
    vegetarian: true,
    description: 'Classic tomato base, fragrant sweet basil, rich olive oil, and double-layer premium mozzarella.'
  },
  { 
    name: 'Fungi Fiesta', 
    price: '2,000', 
    category: 'pizzas', 
    tag: 'VEGGIE DECK', 
    vegetarian: true,
    description: 'Sautéed button mushrooms, aromatic garlic butter herbs, and stringy golden melted cheese.'
  },
  { 
    name: 'Sausage Delight', 
    price: '1,800', 
    category: 'pizzas', 
    tag: 'VALUE FAVORITE',
    description: 'Spiced chicken sausage slices, caramelized onions, herbs, and bubbly stone-baked mozzarella.'
  },
  { 
    name: 'Devilled Chicken', 
    price: '2,100', 
    category: 'pizzas', 
    tag: 'SRI LANKAN SPICY 🔥',
    description: 'Authentic Sri Lankan spicy devilled chicken, crunchy capsicum, banana peppers, and chili sauce.'
  },
  { 
    name: 'Tandoori Chicken', 
    price: '2,100', 
    category: 'pizzas', 
    tag: 'TANDOORI CHAR',
    description: 'Marinated tandoori chicken chunks, roasted peppers, red onion rings, and fresh coriander.'
  },
  { 
    name: 'BBQ Chicken', 
    price: '2,100', 
    category: 'pizzas', 
    tag: 'SMOKY BBQ',
    description: 'Tender chicken breast tossed in sweet & smoky barbecue sauce with charred onions.'
  },
  { 
    name: 'Spicy Chicken', 
    price: '2,100', 
    category: 'pizzas', 
    tag: 'FIERY BITE 🌶️',
    description: 'Crushed chili flakes, seasoned chicken breast, jalapeños, and spiced garlic oil.'
  },
  { 
    name: 'Fungi Chicken', 
    price: '2,200', 
    category: 'pizzas', 
    tag: 'CHEF PICK',
    description: 'Juicy roasted chicken combined with wild mushrooms, white garlic drizzle, and cheese.'
  },
  { 
    name: 'Lamb Slam', 
    price: '2,600', 
    category: 'pizzas', 
    tag: 'CARGO SPECIALS ⭐',
    description: 'Slow-cooked spiced minced lamb, roasted bell peppers, oregano, and generous mozzarella.'
  },
  { 
    name: 'Holy Prawn', 
    price: '2,800', 
    category: 'pizzas', 
    tag: 'SEAFOOD SPECIAL 🍤',
    description: 'Succulent pan-seared garlic butter prawns, capsicum, chili kick, and golden cheese.'
  },
  { 
    name: 'Full Loaded Meat', 
    price: '2,900', 
    category: 'pizzas', 
    tag: 'CARNIVORE FEAST',
    description: 'The ultimate meat lovers pizza! Loaded with spiced lamb, chicken, sausages, and double cheese.'
  },
  { 
    name: 'Tuna Melt', 
    price: '2,700', 
    category: 'pizzas', 
    tag: 'CARGO SPECIALS',
    description: 'Flaked tuna, sweet red onions, sweetcorn, and bubbling melted mozzarella.'
  },
  { 
    name: 'Molten Lava Cake', 
    price: '350', 
    category: 'desserts', 
    tag: 'DESSERT FAVORITE 🍫',
    description: 'Warm, decadent chocolate sponge cake with a rich oozing chocolate lava center.'
  },
  { 
    name: 'Iced Milo Dinosaur', 
    price: '350', 
    category: 'drinks', 
    tag: 'CHILLED DRINK',
    description: 'Creamy chilled iced Milo topped with generous heaps of extra chocolate malt powder.'
  },
  { 
    name: 'Peach Iced Tea', 
    price: '300', 
    category: 'drinks', 
    tag: 'REFRESHER',
    description: 'Brewed black tea infused with sweet peach essence and served over ice cubes.'
  },
  { 
    name: 'Strawberry Mojito', 
    price: '500', 
    category: 'drinks', 
    tag: 'SIGNATURE MOJITO 🍓',
    description: 'Muddled fresh mint leaves, crushed strawberries, lime juice, and sparkling soda.'
  },
  { 
    name: 'Black Mojito', 
    price: '500', 
    category: 'drinks', 
    tag: 'SPECIAL BLEND',
    description: 'Bold blackberry blend with zesty lime, crushed ice, fresh mint, and soda.'
  },
  { 
    name: 'Passion Mojito', 
    price: '500', 
    category: 'drinks', 
    tag: 'TROPICAL HIT',
    description: 'Tangy tropical passion fruit pulp, crushed mint, fresh lime, and sparkling soda.'
  },
  { 
    name: 'Lime Mojito', 
    price: '500', 
    category: 'drinks', 
    tag: 'CLASSIC REFRESHER',
    description: 'Classic zesty lime and crushed mint cooler with bubbly soda — the ultimate pizza pairing.'
  },
  { 
    name: 'Extra Cheese', 
    price: '300', 
    category: 'addons', 
    tag: 'TOPPING',
    description: 'Add an extra thick blanket of 100% real melted mozzarella to any pizza.'
  },
  { 
    name: 'Extra Meat', 
    price: '400', 
    category: 'addons', 
    tag: 'TOPPING',
    description: 'Add extra portion of roasted chicken, spiced sausage, or seasoned lamb.'
  },
  { 
    name: 'Extra Veggies', 
    price: '200', 
    category: 'addons', 
    tag: 'TOPPING',
    description: 'Add extra mushrooms, bell peppers, onions, or sweetcorn.'
  },
];

const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState('pizzas');

  const tabs = [
    { id: 'pizzas', label: '🍕 Pizzas (12")' },
    { id: 'drinks', label: '🍹 Refreshers' },
    { id: 'desserts', label: '🍫 Desserts' },
    { id: 'addons', label: '🧀 Extra Add-Ons' },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="menu-section" aria-label="Handcrafted Pizza Menu in Nawala">
      <div className="menu-section__bg"></div>

      <div className="container menu-section__inner">
        {/* Header */}
        <div className="text-center menu-section__header">
          <span className="menu-section__label">🍕 HANDCRAFTED WOODFIRED MENU</span>
          <h2 className="section-title" style={{ color: 'var(--blue-dark)' }}>
            Discover Our <span style={{ color: 'var(--red)' }}>Artisan Flavors</span>
          </h2>
          <p className="section-subtitle" style={{ color: '#0f1b47', fontWeight: '500' }}>
            Every 12-inch pizza is hand-stretched from fresh daily dough, baked at 400°C in our stone oven, and topped with 100% real mozzarella.
          </p>
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
          {filteredItems.map((item, i) => (
            <article key={item.name || i} className="menu-card" aria-label={`${item.name} - Rs. ${item.price}`}>
              <div className="menu-card__content">
                <div className="menu-card__header">
                  {item.tag && <span className="menu-card__tag">{item.tag}</span>}
                  <h3 className="menu-card__name">
                    {item.vegetarian && <span className="menu-card__veg-badge" title="100% Vegetarian">🌱</span>}
                    {item.name}
                    {item.category === 'pizzas' && <span className="menu-card__size-badge">12&quot;</span>}
                  </h3>
                  {item.description && <p className="menu-card__description">{item.description}</p>}
                </div>
                
                <div className="menu-card__action-row">
                  <div className="menu-card__price-box">
                    <span className="menu-card__price-label">Price</span>
                    <span className="menu-card__price-val">Rs. {item.price}</span>
                  </div>

                  <a
                    href={`https://wa.me/94778817742?text=Hi%20Cargo%20Pizza,%20I'd%20like%20to%20order%20the%20${encodeURIComponent(item.name)}%20(Rs.${item.price})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="menu-card__order-btn"
                    aria-label={`Order ${item.name} on WhatsApp`}
                  >
                    <span>Order Now</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;

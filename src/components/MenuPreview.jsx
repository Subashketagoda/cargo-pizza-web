import React, { useState } from 'react';
import './MenuPreview.css';

const menuItems = [
  { 
    name: 'Veggie Delight', 
    price: '1,900', 
    category: 'pizzas', 
    tag: 'VEGGIE DECK', 
    vegetarian: true,
    description: 'Crisp bell peppers, red onions, button mushrooms, juicy tomatoes & melted mozzarella.'
  },
  { 
    name: 'Margherita', 
    price: '2,000', 
    category: 'pizzas', 
    tag: 'VEGGIE DECK', 
    vegetarian: true,
    description: 'Rich herb tomato sauce, fresh fragrant sweet basil, olive oil & double premium mozzarella.'
  },
  { 
    name: 'Fungi Fiesta', 
    price: '2,000', 
    category: 'pizzas', 
    tag: 'VEGGIE DECK', 
    vegetarian: true,
    description: 'Pan-sautéed wild mushrooms, aromatic garlic butter herbs & golden bubbly cheese.'
  },
  { 
    name: 'Sausage Delight', 
    price: '1,800', 
    category: 'pizzas', 
    tag: 'MEATY DECK',
    description: 'Spiced chicken sausage slices, caramelized red onions & stone-baked mozzarella.'
  },
  { 
    name: 'Devilled Chicken', 
    price: '2,100', 
    category: 'pizzas', 
    tag: 'MEATY DECK',
    description: 'Authentic Sri Lankan spicy devilled chicken, crunchy capsicum & fiery chili glaze.'
  },
  { 
    name: 'Tandoori Chicken', 
    price: '2,100', 
    category: 'pizzas', 
    tag: 'MEATY DECK',
    description: 'Clay-oven spiced tandoori chicken chunks, roasted bell peppers & fresh coriander.'
  },
  { 
    name: 'BBQ Chicken', 
    price: '2,100', 
    category: 'pizzas', 
    tag: 'MEATY DECK',
    description: 'Tender chicken breast tossed in sweet & smoky barbecue sauce with charred onions.'
  },
  { 
    name: 'Spicy Chicken', 
    price: '2,100', 
    category: 'pizzas', 
    tag: 'MEATY DECK',
    description: 'Fiery crushed chili flakes, seasoned chicken breast, jalapeños & spiced garlic oil.'
  },
  { 
    name: 'Fungi Chicken', 
    price: '2,200', 
    category: 'pizzas', 
    tag: 'MEATY DECK',
    description: 'Juicy roasted chicken paired with wild button mushrooms & garlic herb drizzle.'
  },
  { 
    name: 'Lamb Slam', 
    price: '2,600', 
    category: 'pizzas', 
    tag: 'CARGO SPECIALS',
    description: 'Slow-cooked aromatic spiced minced lamb, roasted peppers, oregano & mozzarella.'
  },
  { 
    name: 'Holy Prawn', 
    price: '2,800', 
    category: 'pizzas', 
    tag: 'CARGO SPECIALS',
    description: 'Succulent garlic butter sautéed prawns, crunchy capsicum, chili kick & melted cheese.'
  },
  { 
    name: 'Full Loaded Meat', 
    price: '2,900', 
    category: 'pizzas', 
    tag: 'CARGO SPECIALS',
    description: 'The ultimate carnivore pizza! Loaded with spiced lamb, chicken, sausages & double cheese.'
  },
  { 
    name: 'Tuna', 
    price: '2,700', 
    category: 'pizzas', 
    tag: 'CARGO SPECIALS',
    description: 'Flaked oceanic tuna, sweet red onion rings, sweetcorn & melted mozzarella.'
  },
  { 
    name: 'Lava Cake', 
    price: '350', 
    category: 'desserts', 
    tag: 'DESSERTS',
    description: 'Warm, rich chocolate sponge cake with a decadent oozing molten chocolate lava center.'
  },
  { 
    name: 'Iced Milo', 
    price: '350', 
    category: 'drinks', 
    tag: 'BEVERAGES',
    description: 'Creamy chilled iced Milo topped with generous mounds of chocolate malt powder.'
  },
  { 
    name: 'Peached Ice Tea', 
    price: '300', 
    category: 'drinks', 
    tag: 'BEVERAGES',
    description: 'Freshly brewed black tea infused with sweet fragrant peach essence over ice cubes.'
  },
  { 
    name: 'Strawberry Mojito', 
    price: '500', 
    category: 'drinks', 
    tag: 'BEVERAGES',
    description: 'Muddled fresh garden mint, crushed strawberries, tangy lime juice & sparkling soda.'
  },
  { 
    name: 'Black Mojito', 
    price: '500', 
    category: 'drinks', 
    tag: 'BEVERAGES',
    description: 'Bold blackberry blend with zesty lime, crushed ice, garden mint & sparkling soda.'
  },
  { 
    name: 'Passion Mojito', 
    price: '500', 
    category: 'drinks', 
    tag: 'BEVERAGES',
    description: 'Tangy tropical passion fruit pulp, crushed garden mint, fresh lime & bubbly soda.'
  },
  { 
    name: 'Lime Mojito', 
    price: '500', 
    category: 'drinks', 
    tag: 'BEVERAGES',
    description: 'Classic zesty lime and crushed mint cooler with sparkling soda — the ultimate pizza pairing.'
  },
  { 
    name: 'Extra Cheese', 
    price: '300', 
    category: 'addons', 
    tag: 'ADD ONS',
    description: 'Add an extra thick blanket of 100% real stretchy melted mozzarella to your pizza.'
  },
  { 
    name: 'Extra Meat', 
    price: '400', 
    category: 'addons', 
    tag: 'ADD ONS',
    description: 'Add an extra generous portion of roasted chicken, spiced sausage, or seasoned lamb.'
  },
  { 
    name: 'Extra Veg', 
    price: '200', 
    category: 'addons', 
    tag: 'ADD ONS',
    description: 'Add extra fresh mushrooms, bell peppers, onions, or sweetcorn toppings.'
  },
];

const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState('pizzas');

  const tabs = [
    { id: 'pizzas', label: 'Pizzas', icon: '🍕' },
    { id: 'drinks', label: 'Drinks', icon: '🍹' },
    { id: 'desserts', label: 'Desserts', icon: '🍫' },
    { id: 'addons', label: 'Add Ons', icon: '🧀' },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeTab);

  const getTagClass = (tag) => {
    switch (tag) {
      case 'VEGGIE DECK': return 'menu-tag--green';
      case 'MEATY DECK': return 'menu-tag--red';
      case 'CARGO SPECIALS': return 'menu-tag--gold';
      case 'DESSERTS': return 'menu-tag--purple';
      case 'BEVERAGES': return 'menu-tag--blue';
      case 'ADD ONS': return 'menu-tag--yellow';
      default: return 'menu-tag--default';
    }
  };

  return (
    <section id="menu" className="menu-section" aria-label="Our Menu">
      {/* Decorative ambient background glows */}
      <div className="menu-section__glow menu-section__glow--top"></div>
      <div className="menu-section__glow menu-section__glow--bottom"></div>

      <div className="container menu-section__inner">
        {/* Section Header */}
        <div className="text-center menu-section__header">
          <div className="menu-badge-pill">
            <span className="menu-badge-pill__icon">🍕</span>
            <span>HANDCRAFTED CARGO MENU</span>
          </div>
          <h2 className="section-title menu-title">
            Discover Our <span className="menu-title__highlight">Artisan Menu</span>
          </h2>
          <p className="section-subtitle menu-subtitle">
            Every 12-inch pizza is hand-stretched from fresh daily dough, baked at 400°C in our stone oven, and topped with 100% real mozzarella.
          </p>
        </div>

        {/* Category Tabs Switcher */}
        <div className="menu-tabs-container">
          <div className="menu-tabs" role="tablist" aria-label="Menu categories">
            {tabs.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`menu-tab ${activeTab === tab.id ? 'menu-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="menu-tab__icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="menu-grid">
          {filteredItems.map((item, i) => (
            <article 
              key={item.name || i} 
              className="menu-card" 
              aria-label={`${item.name} - Rs. ${item.price}`}
            >
              <div className="menu-card__shimmer"></div>
              
              <div className="menu-card__body">
                {/* Tag & Size Badges */}
                <div className="menu-card__badges">
                  {item.tag && (
                    <span className={`menu-tag ${getTagClass(item.tag)}`}>
                      {item.tag}
                    </span>
                  )}
                  {item.category === 'pizzas' && (
                    <span className="menu-size-badge">
                      <span className="menu-size-badge__fire">🔥</span> 12&quot;
                    </span>
                  )}
                </div>

                {/* Name & Vegetarian indicator */}
                <h3 className="menu-card__name">
                  {item.vegetarian && (
                    <span className="menu-veg-icon" title="100% Vegetarian" aria-label="Vegetarian">
                      🌱
                    </span>
                  )}
                  <span>{item.name}</span>
                </h3>

                {/* Description */}
                {item.description && (
                  <p className="menu-card__desc">{item.description}</p>
                )}
              </div>

              {/* Price Row */}
              <div className="menu-card__bottom">
                <div className="menu-card__price-wrap">
                  <span className="menu-card__currency">Rs.</span>
                  <span className="menu-card__amount">{item.price}</span>
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

import React, { useState } from 'react';
import './FAQ.css';

const faqList = [
  {
    id: 1,
    question: "Where is Cargo Pizza located?",
    answer: "Cargo Pizza is conveniently located at 422A Nawala Road, Nawala 10107, Sri Lanka — easily accessible from Nawala, Rajagiriya, Nugegoda, Battaramulla, and central Colombo.",
    tag: "Location"
  },
  {
    id: 2,
    question: "Can I order takeaway or dine in at Cargo Pizza?",
    answer: "Yes! Cargo Pizza offers a welcoming dine-in setting and fast takeaway / pick-up service. You can call us at 077 881 77 42 or message us on WhatsApp in advance to have your handcrafted pizza freshly baked and ready for pickup!",
    tag: "Takeaway & Dine-In"
  },
  {
    id: 3,
    question: "When is the Buy 1 Get 1 Free (BOGO) Pizza offer available?",
    answer: "Our popular Buy 1 Get 1 Free promo is available every Tuesday and Thursday from 4:00 PM to Midnight! Order your favorite handcrafted 12\" woodfired pizza and get another one completely free.",
    tag: "Special Offers"
  },
  {
    id: 4,
    question: "What are your opening hours?",
    answer: "We are open daily to satisfy your pizza cravings:\n• Monday – Friday: 4:00 PM – 12:00 AM (Midnight)\n• Saturday – Sunday: 12:00 PM (Noon) – 12:00 AM (Midnight)",
    tag: "Hours"
  },
  {
    id: 5,
    question: "What are the most popular pizza varieties and starting prices?",
    answer: "Our handcrafted 12\" pizzas start from just Rs. 1,800. Crowd favorites include Devilled Chicken, Lamb Slam, Tandoori Chicken, BBQ Chicken, Holy Prawn, and vegetarian classics like Veggie Delight and Margherita.",
    tag: "Menu & Pricing"
  },
  {
    id: 6,
    question: "Can I dine in with family and friends?",
    answer: "Yes! Cargo Pizza features a relaxed, cozy dine-in experience with stone oven aroma and outdoor seating. Walk in anytime or call ahead for group gatherings.",
    tag: "Dine-In"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // first open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="faq-section" aria-label="Frequently Asked Questions">
      <div className="container">
        {/* Section Header */}
        <div className="text-center faq-header">
          <span className="faq-badge">
            <span className="faq-badge__icon">💡</span>
            GOT QUESTIONS?
          </span>
          <h2 className="section-title">
            Frequently Asked <span style={{ color: 'var(--red)' }}>Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about Cargo Pizza, takeaway orders, opening hours, and our weekly BOGO deals.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion" role="region" aria-label="Cargo Pizza FAQs">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <div className="faq-question-content">
                    <span className="faq-item__tag">{item.tag}</span>
                    <h3 className="faq-question-text">{item.question}</h3>
                  </div>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: isOpen ? '240px' : '0px',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Help Strip */}
        <div className="faq-help-strip">
          <div className="faq-help-left">
            <span className="faq-help-icon">🍕</span>
            <div>
              <h4>Still have a question?</h4>
              <p>Call our friendly team or reach out on WhatsApp for instant assistance.</p>
            </div>
          </div>
          <div className="faq-help-actions">
            <a href="tel:0778817742" className="btn btn-primary faq-call-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call: 077 881 77 42</span>
            </a>
            <a href="https://wa.me/94778817742" target="_blank" rel="noopener noreferrer" className="btn btn-yellow faq-wa-btn">
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

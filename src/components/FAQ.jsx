import React, { useState } from 'react';
import './FAQ.css';
import logoCircle from '../assets/logo-circle.png';

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
          <div className="faq-help-strip__shimmer"></div>
          
          <div className="faq-help-left">
            <div className="faq-help-avatar-box">
              <img src={logoCircle} alt="Cargo Pizza Logo" className="faq-help-logo" width="64" height="64" />
              <span className="faq-help-status-dot" title="Available for Orders"></span>
            </div>
            <div className="faq-help-text">
              <span className="faq-help-tag">💬 24/7 INSTANT ASSISTANCE</span>
              <h4>Still Have a Question?</h4>
              <p>Call our friendly team or reach out on WhatsApp for instant orders, reservations & inquiries.</p>
            </div>
          </div>

          <div className="faq-help-actions">
            <a href="tel:0778817742" className="faq-btn-call" aria-label="Call Cargo Pizza at 077 881 77 42">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call: 077 881 77 42</span>
            </a>
            <a 
              href="https://wa.me/94778817742?text=Hi%20Cargo%20Pizza,%20I%20have%20a%20question%20about%20your%20menu%20and%20orders!" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="faq-btn-wa"
              aria-label="Chat with Cargo Pizza on WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

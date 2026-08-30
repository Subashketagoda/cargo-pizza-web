import React from 'react';
import './Reviews.css';

const reviewsData = [
  {
    id: 1,
    name: "Nimali Perera",
    location: "Nawala",
    rating: 5,
    comment: "Best stone-fired pizza in Nawala! The crust is insanely crispy and the toppings are so generous and fresh.",
    avatar: "👩‍🍳",
    date: "Verified Customer"
  },
  {
    id: 2,
    name: "Kasun Wickramasinghe",
    location: "Nawala",
    rating: 5,
    comment: "Big Heat, Small Bill is 100% real! Unbeatable quality for the price. The woodfire smoky flavor is unbelievable.",
    avatar: "👨‍💻",
    date: "Verified Customer"
  },
  {
    id: 3,
    name: "Devinda Fernando",
    location: "Rajagiriya",
    rating: 5,
    comment: "Grabbed their Buy 1 Get 1 Free deal on Tuesday. Quick service, piping hot pizza, and awesome vibes when dining in!",
    avatar: "🍕",
    date: "Verified Customer"
  }
];

const Reviews = () => {
  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center reviews-header">
          <span className="reviews-badge">⭐ Customer Love</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>
            What Our <span style={{ color: 'var(--yellow)' }}>Foodies Say</span>
          </h2>
          <div className="reviews-rating-strip">
            <span className="rating-num">4.9</span>
            <div className="rating-stars">★★★★★</div>
            <span className="rating-count">(Over 1000+ 5-Star Reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviewsData.map((rev) => (
            <article key={rev.id} className="review-card" aria-label={`Review by ${rev.name}`}>
              <div className="review-card__header">
                <div className="review-card__avatar" aria-hidden="true">{rev.avatar}</div>
                <div className="review-card__meta">
                  <h3 className="review-card__name">{rev.name}</h3>
                  <span className="review-card__loc">📍 {rev.location}</span>
                </div>
              </div>

              <div className="review-card__stars" aria-label={`${rev.rating} out of 5 stars`}>
                {"⭐".repeat(rev.rating)}
              </div>

              <blockquote className="review-card__comment">
                <p>"{rev.comment}"</p>
              </blockquote>

              <div className="review-card__footer">
                <span className="review-card__badge">✓ {rev.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

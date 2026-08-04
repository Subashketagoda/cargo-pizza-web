import React from 'react';
import './Reviews.css';

const Reviews = () => {
  const reviewsList = [
    {
      id: 1,
      name: 'Tharindu Fernando',
      location: 'Nawala',
      rating: 5,
      comment: 'Hands down the best pizza in Nawala! The Devilled Chicken and Loaded Lamb pizzas were packed with flavor and the stone-fired crust was perfectly crisp.',
      date: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Anuki Samarasinghe',
      location: 'Rajagiriya',
      rating: 5,
      comment: 'Great family restaurant vibe near Rajagiriya. We ordered the Family Feast Combo and the portion sizes were fantastic! Big Heat, Small Bill is 100% real.',
      date: '1 month ago'
    },
    {
      id: 3,
      name: 'Dilshan Perera',
      location: 'Kotte',
      rating: 5,
      comment: 'Super fast delivery to Kotte! Pizza arrived piping hot with generous mozzarella cheese and crisp dough. The Strawberry Mojito was refreshing as well.',
      date: '3 weeks ago'
    }
  ];

  return (
    <section id="reviews" className="reviews section">
      <div className="container">
        <div className="reviews__header text-center">
          <span className="section-badge">Social Proof & Reviews</span>
          <h2 className="section-title">Loved by <span className="text-gold">Foodies in Nawala</span></h2>
          <p className="section-subtitle">
            See what our valued customers have to say about our stone-fired pizzas, fast delivery, and dining experience.
          </p>

          <div className="reviews__overall-badge">
            <span className="stars">⭐⭐⭐⭐⭐</span>
            <strong>4.9 / 5.0 Rating</strong>
            <span className="count">based on 250+ Google Reviews</span>
          </div>
        </div>

        <div className="reviews__grid">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-card__header">
                <div className="review-card__avatar">
                  {rev.name.charAt(0)}
                </div>
                <div className="review-card__user">
                  <h4>{rev.name}</h4>
                  <span>📍 {rev.location}</span>
                </div>
                <div className="review-card__stars">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="review-card__comment">"{rev.comment}"</p>
              <div className="review-card__date">{rev.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

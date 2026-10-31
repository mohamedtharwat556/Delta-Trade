import { createContext, useContext, useState } from 'react';
import { REVIEWS_KEY } from '../constants/reviews.js';

const ReviewsContext = createContext(null);

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(REVIEWS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return {};
  });

  const addReview = (productId, review) => {
    setReviews((prev) => {
      const productReviews = prev[productId] || [];
      const newReviews = {
        ...prev,
        [productId]: [...productReviews, { ...review, id: Date.now(), date: new Date().toISOString() }],
      };
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(newReviews));
      return newReviews;
    });
  };

  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  const getProductRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round(sum / productReviews.length);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getProductReviews, getProductRating }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewsProvider');
  }
  return context;
}

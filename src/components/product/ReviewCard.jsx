import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={star <= review.rating ? 'review-card__star--filled' : 'review-card__star--empty'}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="review-card__date">
          {new Date(review.date).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
      <p className="review-card__author">{review.author}</p>
      <p className="review-card__comment">{review.comment}</p>
    </div>
  );
}

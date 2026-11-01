import { useState } from 'react'
import { Star } from 'lucide-react'

export default function StarRating({ rating, onRate, readonly = false }) {
  const [hover, setHover] = useState(0)

  return (
    <div className='star-rating'>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star-rating__star ${star <= (hover || rating) ? 'is-filled' : ''}`}
          disabled={readonly}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          onClick={() => !readonly && onRate(star)}
        >
          <Star size={20} fill={star <= (hover || rating) ? '#fbbf24' : 'none'} />
        </button>
      ))}
    </div>
  )
}

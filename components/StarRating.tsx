'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  readonly?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ 
  rating, 
  readonly = false, 
  onRatingChange,
  size = 'md' 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = readonly 
          ? star <= rating 
          : star <= (hoverRating || rating);

        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            disabled={readonly}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                filled
                  ? 'fill-[#c8903a] text-[#c8903a]'
                  : 'fill-none text-[#6b7280]'
              }`}
            />
          </button>
        );
      })}
      
      {readonly && (
        <span className="ml-2 text-sm text-[#6b7280]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

import { ReviewCard } from '@/components/cards/ReviewCard';
import { Star } from 'lucide-react';

interface Review {
  id: string | number;
  name: string;
  country?: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

interface ReviewsSectionProps {
  reviews: Review[] | undefined;
  isLoading?: boolean;
  error?: string;
}

export function ReviewsSection({ reviews, isLoading, error }: ReviewsSectionProps) {
  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
        <p className="text-red-400 text-sm">⚠️ Failed to load reviews: {error}</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-[#161b22] rounded-lg p-12 border border-[#30363d] text-center">
        <Star className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
        <p className="text-[#8b949e]">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex">
          {/* Calculate average rating */}
          {[...Array(5)].map((_, i) => {
            const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            return (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(avgRating)
                    ? 'fill-[#e8a045] text-[#e8a045]'
                    : 'text-[#30363d]'
                }`}
              />
            );
          })}
        </div>
        <span className="text-[#8b949e] text-sm">
          {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)} out of 5
        </span>
      </div>

      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

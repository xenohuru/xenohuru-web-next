import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: {
    id: string | number;
    name: string;
    country?: string;
    rating: number;
    comment: string;
    createdAt?: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] hover:border-[#1a7a4a]/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-white">{review.name}</h4>
          {review.country && (
            <p className="text-[#8b949e] text-sm">🌍 {review.country}</p>
          )}
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'fill-[#e8a045] text-[#e8a045]'
                  : 'text-[#30363d]'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-[#e6edf3] leading-relaxed mb-3">{review.comment}</p>

      {review.createdAt && (
        <p className="text-[#8b949e] text-xs">
          {new Date(review.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      )}
    </div>
  );
}

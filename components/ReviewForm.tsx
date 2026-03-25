'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { StarRating } from './StarRating';
import toast from 'react-hot-toast';

interface ReviewFormProps {
  attractionSlug: string;
  onSuccess?: () => void;
}

export function ReviewForm({ attractionSlug, onSuccess }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    reviewer_name: '',
    reviewer_email: '',
    reviewer_country: '',
    rating: 0,
    title: '',
    body: '',
  });

  const submitReview = useMutation({
    mutationFn: (data: typeof formData) => 
      api.attractions.submitReview(attractionSlug, data),
    onSuccess: () => {
      toast.success('Review submitted successfully!');
      setFormData({ reviewer_name: '', reviewer_email: '', reviewer_country: '', rating: 0, title: '', body: '' });
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to submit review. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reviewer_name || !formData.reviewer_email || !formData.reviewer_country || formData.rating === 0 || !formData.title || !formData.body) {
      toast.error('Please fill in all fields');
      return;
    }

    submitReview.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#161b22] rounded-2xl p-6 border border-[#30363d]">
      <h3 className="font-display text-2xl font-bold text-white mb-6">
        Share Your Experience
      </h3>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#e6edf3] mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.reviewer_name}
            onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#1a7a4a] transition-colors"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#e6edf3] mb-2">
            Email * <span className="text-[#8b949e] text-xs">(not displayed publicly)</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.reviewer_email}
            onChange={(e) => setFormData({ ...formData, reviewer_email: e.target.value })}
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#1a7a4a] transition-colors"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-[#e6edf3] mb-2">
            Country *
          </label>
          <input
            type="text"
            id="country"
            value={formData.reviewer_country}
            onChange={(e) => setFormData({ ...formData, reviewer_country: e.target.value })}
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#1a7a4a] transition-colors"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-[#e6edf3] mb-2">
            Rating *
          </label>
          <StarRating
            rating={formData.rating}
            onRatingChange={(rating) => setFormData({ ...formData, rating })}
            readonly={false}
            size="lg"
          />
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#e6edf3] mb-2">
            Review Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#1a7a4a] transition-colors"
            placeholder="Summarize your experience..."
            required
          />
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-[#e6edf3] mb-2">
            Your Review *
          </label>
          <textarea
            id="comment"
            rows={5}
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-white focus:outline-none focus:border-[#1a7a4a] transition-colors resize-none"
            placeholder="Share your experience..."
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitReview.isPending}
          className="w-full bg-[#1a7a4a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#1a7a4a]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitReview.isPending ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}

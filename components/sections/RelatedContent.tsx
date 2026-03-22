'use client';

import { AttractionCard } from '@/components/AttractionCard';
import { MapPin } from 'lucide-react';
import { Attraction } from '@/lib/types';

interface RelatedContentProps {
  attractions: Attraction[] | undefined;
  isLoading?: boolean;
  error?: string;
  title?: string;
}

export function RelatedContent({ 
  attractions, 
  isLoading, 
  error, 
  title = 'Nearby Attractions' 
}: RelatedContentProps) {
  if (error) {
    return (
      <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
        <p className="text-[#8b949e] text-sm">ℹ️ Related content unavailable</p>
      </div>
    );
  }

  if (!attractions || attractions.length === 0) {
    return (
      <div className="bg-[#161b22] rounded-lg p-12 border border-[#30363d] text-center">
        <MapPin className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
        <p className="text-[#8b949e]">No related attractions found</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-white mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attractions.slice(0, 4).map((attraction) => (
          <div key={attraction.id} className="h-full">
            <AttractionCard attraction={attraction} compact />
          </div>
        ))}
      </div>
    </div>
  );
}

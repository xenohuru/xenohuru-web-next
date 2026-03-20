'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { RegionCard } from '@/components/RegionCard';
import { CardsSkeleton } from '@/components/LoadingSkeleton';
import { MapPin } from 'lucide-react';

export default function RegionsPage() {
  const { data: regions, isLoading, error } = useQuery({
    queryKey: ['regions'],
    queryFn: () => api.regions.list(),
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a4731] to-[#0a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-10 h-10 text-[#c8903a]" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              Tanzania <span className="text-[#c8903a]">Regions</span>
            </h1>
          </div>
          <p className="text-lg text-[#fafaf8]/80 max-w-2xl">
            Explore all 31 regions of Tanzania — each with unique attractions, cultures, and natural wonders.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <p className="text-red-400">
              Failed to load regions. Please try again later.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <CardsSkeleton count={9} />}

        {/* Regions Grid */}
        {regions && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <RegionCard key={region.id} region={region} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

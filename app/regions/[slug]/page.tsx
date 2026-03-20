'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import { AttractionCard } from '@/components/AttractionCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useState } from 'react';

export default function RegionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: region, isLoading, error, refetch } = useQuery({
    queryKey: ['region', slug],
    queryFn: () => api.regions.detail(slug),
  });

  const { data: attractions } = useQuery({
    queryKey: ['attractions-by-region', slug],
    queryFn: () => api.attractions.byRegion(slug),
    enabled: !!region,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSkeleton variant="page" />
        </div>
      </div>
    );
  }

  if (error || !region) {
    return (
      <div className="min-h-screen bg-[#0d1117] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">Region not found</h2>
            <button
              onClick={() => refetch()}
              className="bg-[#1a7a4a] text-white px-6 py-3 rounded-lg hover:bg-[#1a7a4a]/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredAttractions = selectedCategory
    ? attractions?.filter((a) => a.category === selectedCategory)
    : attractions;

  const categories = attractions
    ? Array.from(new Set(attractions.map((a) => a.category)))
    : [];

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12">
        {region.image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${region.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0d1117]" />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            {region.name}
          </h1>
          <p className="text-xl text-[#e6edf3]/80 max-w-3xl leading-relaxed">
            {region.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#1a7a4a]/20 backdrop-blur-sm border border-[#1a7a4a]/30 rounded-lg">
            <span className="text-[#1a7a4a] font-semibold">
              {region.attractionCount || attractions?.length || 0} Attractions
            </span>
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !selectedCategory
                    ? 'bg-[#1a7a4a] text-white'
                    : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#1a7a4a] text-white'
                      : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Attractions Grid */}
          {filteredAttractions && filteredAttractions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#8b949e] text-lg">
                No attractions found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

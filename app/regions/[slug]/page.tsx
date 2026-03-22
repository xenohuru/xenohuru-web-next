'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import { AttractionCard } from '@/components/AttractionCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { MapPin, TrendingUp, Mountain, Trees } from 'lucide-react';

const MapComponent = dynamic(() => import('@/components/MapComponent').then(mod => ({ default: mod.MapComponent })), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-[#161b22] rounded-2xl animate-pulse" />,
});

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
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-[#161b22]/50 border-y border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Attractions Count */}
            <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] hover:border-[#1a7a4a]/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[#8b949e] text-sm font-medium">Attractions</h3>
                <TrendingUp className="w-5 h-5 text-[#1a7a4a]" />
              </div>
              <p className="font-display text-3xl font-bold text-white">
                {region.attraction_count || attractions?.length || 0}
              </p>
              <p className="text-[#8b949e] text-xs mt-2">Places to explore</p>
            </div>

            {/* Location Info */}
            <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] hover:border-[#1a7a4a]/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[#8b949e] text-sm font-medium">Location</h3>
                <MapPin className="w-5 h-5 text-[#e8a045]" />
              </div>
              <p className="font-semibold text-white">
                {region.latitude && region.longitude
                  ? `${region.latitude.toFixed(3)}°, ${region.longitude.toFixed(3)}°`
                  : 'Coordinates unavailable'}
              </p>
              <p className="text-[#8b949e] text-xs mt-2">Geographic center</p>
            </div>

            {/* Category Count */}
            <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] hover:border-[#1a7a4a]/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[#8b949e] text-sm font-medium">Categories</h3>
                <Mountain className="w-5 h-5 text-purple-400" />
              </div>
              <p className="font-display text-3xl font-bold text-white">
                {categories.length}
              </p>
              <p className="text-[#8b949e] text-xs mt-2">Types of attractions</p>
            </div>

            {/* Featured Status */}
            <div className="bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/10 rounded-lg p-6 border border-[#1a7a4a]/30 hover:border-[#1a7a4a]/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[#8b949e] text-sm font-medium">Status</h3>
                <Trees className="w-5 h-5 text-[#1a7a4a]" />
              </div>
              <p className="font-semibold text-[#1a7a4a]">Active Region</p>
              <p className="text-[#8b949e] text-xs mt-2">Open to visitors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {(region.latitude && region.longitude) ? (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-white mb-6">
              <MapPin className="w-7 h-7 inline mr-2" />
              Location Map
            </h2>
            <div className="rounded-2xl overflow-hidden border border-[#30363d] shadow-2xl">
              <MapComponent
                center={[region.latitude, region.longitude]}
                zoom={9}
                markers={[
                  {
                    lat: region.latitude,
                    lng: region.longitude,
                    name: region.name,
                  },
                ]}
                className="h-[500px]"
              />
            </div>
            {region.latitude && region.longitude && (
              <p className="text-[#8b949e] text-sm mt-4">
                📍 Center coordinates: {region.latitude.toFixed(4)}°N, {region.longitude.toFixed(4)}°E
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#161b22] rounded-lg p-12 border border-[#30363d] text-center">
              <MapPin className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
              <p className="text-[#8b949e]">Map coordinates not available for this region</p>
            </div>
          </div>
        </section>
      )}

      {/* Attractions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-display text-3xl font-bold text-white mb-2">
              Attractions in {region.name}
            </h2>
            <p className="text-[#8b949e]">
              Discover {filteredAttractions?.length || 0} unique places to visit
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="mb-10">
              <p className="text-[#8b949e] text-sm font-medium mb-4">Filter by type:</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    !selectedCategory
                      ? 'bg-[#1a7a4a] text-white shadow-lg shadow-[#1a7a4a]/20'
                      : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                  }`}
                >
                  All Types ({attractions?.length || 0})
                </button>
                {categories.map((category) => {
                  const count = attractions?.filter((a) => a.category === category).length || 0;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#1a7a4a] text-white shadow-lg shadow-[#1a7a4a]/20'
                          : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
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
            <div className="bg-[#161b22] rounded-lg p-16 border border-[#30363d] text-center">
              <TrendingUp className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
              <p className="text-[#8b949e] text-lg mb-2">No attractions found</p>
              <p className="text-[#8b949e] text-sm">
                {selectedCategory ? `Try selecting a different category` : `Check back soon for new attractions!`}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

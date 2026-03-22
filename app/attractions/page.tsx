'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AttractionCard } from '@/components/AttractionCard';
import { SearchBar } from '@/components/SearchBar';
import { CardsSkeleton } from '@/components/LoadingSkeleton';
import { Filter, SlidersHorizontal, AlertCircle, RefreshCw, Mountain, Compass } from 'lucide-react';
import type { AttractionFilters } from '@/lib/types';

export default function AttractionsPage() {
  const [filters, setFilters] = useState<AttractionFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const { data: attractions, isLoading, error } = useQuery({
    queryKey: ['attractions', filters],
    queryFn: () => api.attractions.list(filters),
  });

  const handleSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search: search || undefined }));
  }, []);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ 
      ...prev, 
      category: category === 'all' ? undefined : category 
    }));
  };

  const handleDifficultyChange = (difficulty: string) => {
    setFilters(prev => ({ 
      ...prev, 
      difficulty: difficulty === 'all' ? undefined : difficulty 
    }));
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'national-park', label: 'National Parks' },
    { value: 'mountain', label: 'Mountains' },
    { value: 'beach', label: 'Beaches' },
    { value: 'cultural', label: 'Cultural Sites' },
    { value: 'wildlife', label: 'Wildlife' },
    { value: 'historical', label: 'Historical' },
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'challenging', label: 'Challenging' },
    { value: 'difficult', label: 'Difficult' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Message */}
      <div className="relative bg-gradient-to-br from-[#1a4731] via-[#0a0a0a] to-black py-12 overflow-hidden">
        {/* Background Gradient Animation */}
        <div className="absolute inset-0 opacity-30" style={{
          background: 'linear-gradient(135deg, rgba(26,71,49,0.6) 0%, rgba(200,144,58,0.3) 100%)',
          animation: 'gradient-shift 12s ease infinite',
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mountain className="w-8 h-8 text-[#c8903a]" />
              <span className="text-[#c8903a] font-mono uppercase tracking-widest text-xs">Tanzania's Wonders</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Explore <span className="text-[#c8903a]">Attractions</span>
            </h1>
            
            <p className="text-lg text-[#fafaf8]/80 max-w-2xl mx-auto mb-2">
              Discover Tanzania's incredible destinations — from world-famous national parks to hidden cultural gems.
            </p>
            
            <p className="text-sm text-[#8b949e] max-w-2xl mx-auto">
              Search through {attractions?.length || '18'} verified attractions with real-time weather, reviews, and travel information.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search attractions by name, location, or activity..."
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111827] text-white border border-[#c8903a]/20 rounded-lg hover:border-[#c8903a]/40 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-[#111827] border border-[#c8903a]/20 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category || 'all'}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#c8903a]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c8903a]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={filters.difficulty || 'all'}
                    onChange={(e) => handleDifficultyChange(e.target.value)}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#c8903a]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c8903a]"
                  >
                    {difficulties.map((diff) => (
                      <option key={diff.value} value={diff.value}>
                        {diff.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Free Entry Toggle */}
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.is_free || false}
                      onChange={(e) => setFilters(prev => ({ ...prev, is_free: e.target.checked || undefined }))}
                      className="w-5 h-5 rounded border-[#c8903a]/20 bg-[#0a0a0a] text-[#c8903a] focus:ring-[#c8903a]"
                    />
                    <span className="text-sm text-white">Free Entry Only</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        {attractions && !isLoading && (
          <div className="mb-6">
            <p className="text-[#6b7280] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#c8903a]" />
              {attractions.length} {attractions.length === 1 ? 'attraction' : 'attractions'} found
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center mb-6">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="font-bold text-white mb-2">Failed to Load Attractions</h3>
            <p className="text-red-400 text-sm mb-4">
              {error instanceof Error ? error.message : 'Unable to fetch attractions. Please check your connection and try again.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <CardsSkeleton count={9} />}

        {/* Attractions Grid */}
        {attractions && !isLoading && (
          <>
            {attractions.length === 0 ? (
              <div className="bg-[#111827] border border-[#c8903a]/20 rounded-lg p-12 text-center">
                <Filter className="w-12 h-12 text-[#6b7280] mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  No attractions found
                </h3>
                <p className="text-[#6b7280]">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attractions.map((attraction) => (
                  <AttractionCard key={attraction.id} attraction={attraction} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

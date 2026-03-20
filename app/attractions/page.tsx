'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AttractionCard } from '@/components/AttractionCard';
import { SearchBar } from '@/components/SearchBar';
import { CardsSkeleton } from '@/components/LoadingSkeleton';
import { Filter, SlidersHorizontal } from 'lucide-react';
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
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a4731] to-[#0a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Explore <span className="text-[#c8903a]">Attractions</span>
          </h1>
          <p className="text-lg text-[#fafaf8]/80 max-w-2xl">
            Discover Tanzania's incredible destinations — from world-famous national parks to hidden cultural gems.
          </p>
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
            <p className="text-[#6b7280]">
              {attractions.length} {attractions.length === 1 ? 'attraction' : 'attractions'} found
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <p className="text-red-400">
              Failed to load attractions. Please try again later.
            </p>
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

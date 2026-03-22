'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { RegionCard } from '@/components/RegionCard';
import { CardsSkeleton } from '@/components/LoadingSkeleton';
import { MapPin, Compass, AlertCircle, RefreshCw } from 'lucide-react';

export default function RegionsPage() {
  const { data: regionsData, isLoading, error } = useQuery({
    queryKey: ['regions'],
    queryFn: () => api.regions.list(),
  });

  // Handle both paginated response and array response
  const regions: any[] = Array.isArray(regionsData)
    ? regionsData
    : (regionsData as any)?.results || [];

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
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-[#c8903a]" />
              <span className="text-[#c8903a] font-mono uppercase tracking-widest text-xs">Geographic Guide</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Tanzania <span className="text-[#c8903a]">Regions</span>
            </h1>
            
            <p className="text-lg text-[#fafaf8]/80 max-w-2xl mx-auto mb-2">
              Discover all {regions?.length || '31'} regions of Tanzania — each with unique attractions, cultures, and natural wonders.
            </p>
            
            <p className="text-sm text-[#8b949e] max-w-2xl mx-auto">
              From the snow-capped peaks of Kilimanjaro to the pristine shores of Zanzibar, explore every corner of the world's most diverse nation.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Info */}
        {regions && !isLoading && (
          <div className="mb-8 flex items-center gap-2 text-[#8b949e]">
            <Compass className="w-4 h-4 text-[#c8903a]" />
            <p>{regions.length} regions available</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center mb-6">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="font-bold text-white mb-2">Failed to Load Regions</h3>
            <p className="text-red-400 text-sm mb-4">
              {error instanceof Error ? error.message : 'Unable to fetch regions. Please try again.'}
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

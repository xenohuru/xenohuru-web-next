'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useState, useMemo } from 'react';
import { Image as ImageIcon, Play, Grid3x3, List, Filter, MapPin } from 'lucide-react';

interface MediaItem {
  id: string | number;
  url: string;
  type: 'image' | 'video';
  title?: string;
  attraction?: {
    name: string;
    slug: string;
  };
  region?: string;
  createdAt?: string;
}

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video'>('all');
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);

  const { data: attractions = [] } = useQuery({
    queryKey: ['attractions'],
    queryFn: () => api.attractions.list(),
  });

  // Extract media from attractions
  const allMedia: MediaItem[] = useMemo(() => {
    const media: MediaItem[] = [];

    attractions.forEach((attraction) => {
      // Add featured image
      if (attraction.featured_image) {
        media.push({
          id: `${attraction.id}-featured`,
          url: attraction.featured_image,
          type: 'image',
          title: `${attraction.name} - Featured`,
          attraction: {
            name: attraction.name,
            slug: attraction.slug,
          },
          region: typeof attraction.region === "object" ? attraction.region.name : String(attraction.region || "Unknown"),
        });
      }

      // Add additional images
      if (attraction.images && Array.isArray(attraction.images)) {
        attraction.images.forEach((img, idx) => {
          if (typeof img === 'string') {
            media.push({
              id: `${attraction.id}-img-${idx}`,
              url: img,
              type: 'image',
              title: `${attraction.name} - Image ${idx + 1}`,
              attraction: {
                name: attraction.name,
                slug: attraction.slug,
              },
              region: typeof attraction.region === "object" ? attraction.region.name : String(attraction.region || "Unknown"),
            });
          } else if (img.image) {
            media.push({
              id: `${attraction.id}-img-${idx}`,
              url: img.image,
              type: 'image',
              title: img.caption || `${attraction.name} - Image ${idx + 1}`,
              attraction: {
                name: attraction.name,
                slug: attraction.slug,
              },
              region: typeof attraction.region === "object" ? attraction.region.name : String(attraction.region || "Unknown"),
            });
          }
        });
      }
    });

    return media;
  }, [attractions]);

  const filteredMedia = useMemo(() => {
    return allMedia.filter((media) => {
      if (selectedType !== 'all' && media.type !== selectedType) return false;
      if (selectedAttraction && media.attraction?.slug !== selectedAttraction) return false;
      return true;
    });
  }, [allMedia, selectedType, selectedAttraction]);

  const imageCount = allMedia.filter((m) => m.type === 'image').length;
  const videoCount = allMedia.filter((m) => m.type === 'video').length;
  const attractionsList = Array.from(new Set(allMedia.map((m) => m.attraction?.slug).filter(Boolean))) as string[];

  if (attractions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0d1117] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSkeleton variant="page" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/5 border-b border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              Explore Tanzania
            </h1>
            <p className="text-xl text-[#8b949e] max-w-3xl mx-auto">
              Browse stunning photos and videos from attractions across Tanzania
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] text-center">
              <ImageIcon className="w-8 h-8 text-[#e8a045] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{imageCount}</p>
              <p className="text-[#8b949e] text-sm">Photos</p>
            </div>
            <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] text-center">
              <Play className="w-8 h-8 text-[#1a7a4a] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{videoCount}</p>
              <p className="text-[#8b949e] text-sm">Videos</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/10 rounded-lg p-6 border border-[#1a7a4a]/30 text-center">
              <MapPin className="w-8 h-8 text-[#1a7a4a] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{attractions.length}</p>
              <p className="text-[#8b949e] text-sm">Attractions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Controls */}
      <section className="py-6 bg-[#161b22]/50 border-b border-[#30363d] sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Type Filter */}
            <div>
              <p className="text-[#8b949e] text-sm font-medium mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by type:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === 'all'
                      ? 'bg-[#1a7a4a] text-white'
                      : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                  }`}
                >
                  All ({allMedia.length})
                </button>
                <button
                  onClick={() => setSelectedType('image')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    selectedType === 'image'
                      ? 'bg-[#1a7a4a] text-white'
                      : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  Images ({imageCount})
                </button>
                <button
                  onClick={() => setSelectedType('video')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    selectedType === 'video'
                      ? 'bg-[#1a7a4a] text-white'
                      : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  Videos ({videoCount})
                </button>
              </div>
            </div>

            {/* Attraction Filter */}
            {attractionsList.length > 0 && (
              <div>
                <p className="text-[#8b949e] text-sm font-medium mb-3">Filter by attraction:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedAttraction(null)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      !selectedAttraction
                        ? 'bg-[#e8a045] text-[#0d1117]'
                        : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#e8a045]'
                    }`}
                  >
                    All Attractions
                  </button>
                  {attractionsList.map((slug) => {
                    const attraction = attractions.find((a) => a.slug === slug);
                    return (
                      <button
                        key={slug}
                        onClick={() => setSelectedAttraction(selectedAttraction === slug ? null : slug)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          selectedAttraction === slug
                            ? 'bg-[#e8a045] text-[#0d1117]'
                            : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#e8a045]'
                        }`}
                      >
                        {attraction?.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-[#8b949e] text-sm">
                Showing {filteredMedia.length} of {allMedia.length} items
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#1a7a4a] text-white'
                      : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                  }`}
                  title="Grid view"
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#1a7a4a] text-white'
                      : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                  }`}
                  title="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMedia.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMedia.map((media) => (
                    <div
                      key={media.id}
                      className="group relative overflow-hidden rounded-lg border border-[#30363d] hover:border-[#1a7a4a] transition-all duration-300 bg-[#161b22]"
                    >
                      {/* Image */}
                      <div className="aspect-video overflow-hidden bg-black">
                        <img
                          src={media.url}
                          alt={media.title || 'Media'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {media.type === 'video' ? (
                            <Play className="w-12 h-12 text-[#e8a045] fill-[#e8a045]" />
                          ) : (
                            <ImageIcon className="w-12 h-12 text-[#e8a045]" />
                          )}
                        </div>
                      </div>

                      {/* Badge */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-2 py-1 bg-[#1a7a4a]/90 text-white text-xs rounded-full backdrop-blur-sm">
                          {media.type === 'video' ? '🎬 Video' : '📷 Photo'}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {media.attraction && (
                          <p className="text-[#1a7a4a] text-xs font-medium mb-1">
                            {media.attraction.name}
                          </p>
                        )}
                        {media.title && (
                          <p className="text-white text-sm font-medium line-clamp-2">
                            {media.title}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMedia.map((media) => (
                    <div
                      key={media.id}
                      className="flex gap-4 p-4 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#1a7a4a] transition-colors group"
                    >
                      {/* Thumbnail */}
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-black">
                        <img
                          src={media.url}
                          alt={media.title || 'Media'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {media.attraction && (
                            <a
                              href={`/attractions/${media.attraction.slug}`}
                              className="text-[#1a7a4a] text-sm font-medium hover:text-[#e8a045] transition-colors"
                            >
                              {media.attraction.name}
                            </a>
                          )}
                          {media.title && (
                            <p className="text-white font-medium mt-1">{media.title}</p>
                          )}
                          {media.region && (
                            <p className="text-[#8b949e] text-sm flex items-center gap-1 mt-2">
                              <MapPin className="w-3 h-3" />
                              {media.region}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="flex items-center">
                        <span className="px-3 py-1 bg-[#1a7a4a]/20 text-[#1a7a4a] text-xs rounded-full border border-[#1a7a4a]/30">
                          {media.type === 'video' ? '🎬 Video' : '📷 Photo'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="bg-[#161b22] rounded-lg p-16 border border-[#30363d] text-center">
              <ImageIcon className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
              <p className="text-[#8b949e] text-lg">No media found</p>
              <p className="text-[#8b949e] text-sm mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

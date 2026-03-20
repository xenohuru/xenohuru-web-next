'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { BlogCard } from '@/components/BlogCard';
import { SearchBar } from '@/components/SearchBar';
import { CardsSkeleton } from '@/components/LoadingSkeleton';
import { BookOpen } from 'lucide-react';
import type { BlogFilters } from '@/lib/types';

export default function BlogPage() {
  const [filters, setFilters] = useState<BlogFilters>({});

  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['blog', filters],
    queryFn: () => api.blog.list(filters),
  });

  const handleSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search: search || undefined }));
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a4731] to-[#0a0a0a] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-[#c8903a]" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              Travel <span className="text-[#c8903a]">Blog</span>
            </h1>
          </div>
          <p className="text-lg text-[#fafaf8]/80 max-w-2xl">
            Stories, guides, and tips from Tanzania — your ultimate resource for planning an unforgettable adventure.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search articles by title, topic, or keyword..."
          />
        </div>

        {/* Results Count */}
        {articles && !isLoading && (
          <div className="mb-6">
            <p className="text-[#6b7280]">
              {articles.length} {articles.length === 1 ? 'article' : 'articles'} found
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <p className="text-red-400">
              Failed to load articles. Please try again later.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <CardsSkeleton count={6} />}

        {/* Articles Grid */}
        {articles && !isLoading && (
          <>
            {articles.length === 0 ? (
              <div className="bg-[#111827] border border-[#c8903a]/20 rounded-lg p-12 text-center">
                <BookOpen className="w-12 h-12 text-[#6b7280] mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  No articles found
                </h3>
                <p className="text-[#6b7280]">
                  Try a different search term or check back later for new content.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

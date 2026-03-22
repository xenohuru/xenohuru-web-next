'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useState, useMemo } from 'react';
import { Search, MapPin, Filter, Grid3x3, List, TrendingUp } from 'lucide-react';
import { AttractionCard } from '@/components/AttractionCard';
import { BlogCard } from '@/components/BlogCard';
import { RegionCard } from '@/components/RegionCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'attractions' | 'regions' | 'blog'>('all');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'name'>('relevance');

  const { data: attractionsData = [] } = useQuery({
    queryKey: ['attractions-search'],
    queryFn: () => api.attractions.list(),
  });

  const { data: regionsData = [] } = useQuery({
    queryKey: ['regions-search'],
    queryFn: () => api.regions.list(),
  });

  const { data: articlesData = [] } = useQuery({
    queryKey: ['articles-search'],
    queryFn: () => api.blog.list(),
  });

  const attractions: any[] = Array.isArray(attractionsData) ? attractionsData : (attractionsData as any)?.results || [];
  const regions: any[] = Array.isArray(regionsData) ? regionsData : (regionsData as any)?.results || [];
  const articles: any[] = Array.isArray(articlesData) ? articlesData : (articlesData as any)?.results || [];

  // Filter attractions
  const filteredAttractions = useMemo(() => {
    let results = attractions.filter(a => {
      const matchQuery = !query || a.name.toLowerCase().includes(query.toLowerCase()) || 
                         (a.short_description && a.short_description.toLowerCase().includes(query.toLowerCase()));
      const matchCat = !category || a.category === category;
      const matchDiff = !difficulty || a.difficulty_level === difficulty;
      const matchPrice = priceFilter === 'all' || (priceFilter === 'free' ? a.is_free : !a.is_free);
      return matchQuery && matchCat && matchDiff && matchPrice;
    });

    // Sort
    if (sortBy === 'rating') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  }, [attractions, query, category, difficulty, priceFilter, sortBy]);

  // Filter regions
  const filteredRegions = useMemo(() => {
    return regions.filter(r => {
      return !query || r.name.toLowerCase().includes(query.toLowerCase()) || 
             r.description.toLowerCase().includes(query.toLowerCase());
    });
  }, [regions, query]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      return !query || a.title.toLowerCase().includes(query.toLowerCase()) || 
             (a.content && a.content.toLowerCase().includes(query.toLowerCase()));
    });
  }, [articles, query]);

  const categories = [...new Set(attractions.map(a => a.category))];
  const difficulties = ['easy', 'moderate', 'challenging', 'difficult'];

  const totalResults = (searchType === 'all' ? 
    filteredAttractions.length + filteredRegions.length + filteredArticles.length :
    searchType === 'attractions' ? filteredAttractions.length :
    searchType === 'regions' ? filteredRegions.length :
    filteredArticles.length);

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Hero Search Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/5 border-b border-[#30363d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              Explore Tanzania
            </h1>
            <p className="text-xl text-[#8b949e]">
              Search attractions, regions, and travel guides
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-4 w-5 h-5 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Search attractions, regions, guides..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-white placeholder-[#8b949e] focus:outline-none focus:border-[#1a7a4a] transition-colors"
              autoFocus
            />
          </div>

          {/* Search Type Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSearchType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                searchType === 'all'
                  ? 'bg-[#1a7a4a] text-white'
                  : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
              }`}
            >
              All Results
            </button>
            <button
              onClick={() => setSearchType('attractions')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                searchType === 'attractions'
                  ? 'bg-[#1a7a4a] text-white'
                  : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
              }`}
            >
              Attractions ({filteredAttractions.length})
            </button>
            <button
              onClick={() => setSearchType('regions')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                searchType === 'regions'
                  ? 'bg-[#1a7a4a] text-white'
                  : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
              }`}
            >
              Regions ({filteredRegions.length})
            </button>
            <button
              onClick={() => setSearchType('blog')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                searchType === 'blog'
                  ? 'bg-[#1a7a4a] text-white'
                  : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
              }`}
            >
              Blog ({filteredArticles.length})
            </button>
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      {(searchType === 'all' || searchType === 'attractions') && (
        <section className="py-6 bg-[#161b22]/50 border-b border-[#30363d] sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {/* Filter Row */}
              <div className="flex flex-wrap gap-3 items-center">
                <Filter className="w-4 h-4 text-[#8b949e]" />
                <p className="text-[#8b949e] text-sm font-medium">Filters:</p>

                {/* Category */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-lg text-[#8b949e] text-sm hover:border-[#1a7a4a] transition-colors"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {/* Difficulty */}
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-lg text-[#8b949e] text-sm hover:border-[#1a7a4a] transition-colors"
                >
                  <option value="">All Difficulty</option>
                  {difficulties.map((d) => (
                    <option key={d} value={d}>
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </option>
                  ))}
                </select>

                {/* Price */}
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-lg text-[#8b949e] text-sm hover:border-[#1a7a4a] transition-colors"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free Only</option>
                  <option value="paid">Paid Only</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-lg text-[#8b949e] text-sm hover:border-[#1a7a4a] transition-colors ml-auto"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name (A-Z)</option>
                </select>

                {/* View Toggle */}
                <div className="flex gap-1 ml-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-[#1a7a4a] text-white'
                        : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-[#1a7a4a] text-white'
                        : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Results count */}
              <p className="text-[#8b949e] text-sm">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                {totalResults} results found
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {totalResults === 0 ? (
            <div className="bg-[#161b22] rounded-lg p-16 border border-[#30363d] text-center">
              <Search className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
              <p className="text-[#8b949e] text-lg">No results found</p>
              <p className="text-[#8b949e] text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Attractions */}
              {(searchType === 'all' || searchType === 'attractions') && filteredAttractions.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Attractions ({filteredAttractions.length})
                  </h2>
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredAttractions.map((a) => (
                        <AttractionCard key={a.id} attraction={a} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredAttractions.map((a) => (
                        <a
                          key={a.id}
                          href={`/attractions/${a.slug}`}
                          className="flex gap-4 p-4 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#1a7a4a] transition-colors group"
                        >
                          {a.featured_image && (
                            <img
                              src={a.featured_image}
                              alt={a.name}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-white font-semibold group-hover:text-[#1a7a4a] transition-colors">
                              {a.name}
                            </h3>
                            <p className="text-[#8b949e] text-sm line-clamp-2 mt-1">
                              {a.short_description}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="px-2 py-1 bg-[#1a7a4a]/20 text-[#1a7a4a] text-xs rounded">
                                {a.category}
                              </span>
                              {a.difficulty_level && (
                                <span className="px-2 py-1 bg-[#e8a045]/20 text-[#e8a045] text-xs rounded">
                                  {a.difficulty_level}
                                </span>
                              )}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Regions */}
              {(searchType === 'all' || searchType === 'regions') && filteredRegions.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Regions ({filteredRegions.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRegions.map((r) => (
                      <RegionCard key={r.id} region={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Articles */}
              {(searchType === 'all' || searchType === 'blog') && filteredArticles.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Blog Articles ({filteredArticles.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((a) => (
                      <BlogCard key={a.id} article={a} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

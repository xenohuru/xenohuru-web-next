'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { Star, MapPin, Mail, Phone, Globe, Award, Users } from 'lucide-react';
import { useState } from 'react';

export default function OperatorsPage() {
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');
  
  const { data: operatorsData = [], isLoading } = useQuery({
    queryKey: ['operators'],
    queryFn: () => api.operators.list(),
  });

  const operators: any[] = Array.isArray(operatorsData) ? operatorsData : (operatorsData as any)?.results || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSkeleton variant="page" />
        </div>
      </div>
    );
  }

  const sortedOperators = [...operators].sort((a, b) => {
    if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    return a.name.localeCompare(b.name);
  });

  const verifiedCount = operators.filter((o) => o.is_verified).length;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/5 border-b border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              Tour Operators
            </h1>
            <p className="text-xl text-[#8b949e] max-w-3xl mx-auto">
              Discover verified tour operators and travel agencies specializing in Tanzania tourism experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] text-center">
              <Users className="w-8 h-8 text-[#e8a045] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{operators.length}</p>
              <p className="text-[#8b949e] text-sm">Professional Operators</p>
            </div>
            <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] text-center">
              <Award className="w-8 h-8 text-[#1a7a4a] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{verifiedCount}</p>
              <p className="text-[#8b949e] text-sm">Verified Operators</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/10 rounded-lg p-6 border border-[#1a7a4a]/30 text-center">
              <Star className="w-8 h-8 text-[#e8a045] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">4.8★</p>
              <p className="text-[#8b949e] text-sm">Avg. Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sort Section */}
      <section className="py-6 bg-[#161b22]/50 border-b border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-[#8b949e] text-sm">Sort by:</p>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'rating'
                  ? 'bg-[#1a7a4a] text-white'
                  : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
              }`}
            >
              ⭐ Highest Rated
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'name'
                  ? 'bg-[#1a7a4a] text-white'
                  : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
              }`}
            >
              A-Z Name
            </button>
          </div>
        </div>
      </section>

      {/* Operators Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedOperators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedOperators.map((operator) => (
                <div
                  key={operator.id}
                  className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] hover:border-[#1a7a4a]/50 transition-all duration-300 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-[#1a7a4a] transition-colors">
                        {operator.name}
                      </h3>
                      {operator.rating && (
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(operator.rating!)
                                  ? 'fill-[#e8a045] text-[#e8a045]'
                                  : 'text-[#30363d]'
                              }`}
                            />
                          ))}
                          <span className="text-[#8b949e] text-sm ml-2">
                            {operator.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                    {operator.is_verified && (
                      <div className="px-3 py-1 bg-[#1a7a4a]/20 border border-[#1a7a4a]/30 rounded-full">
                        <Award className="w-4 h-4 text-[#1a7a4a]" />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[#8b949e] text-sm mb-4 line-clamp-2">
                    {operator.description}
                  </p>

                  {/* Specialties */}
                  {operator.specialties && operator.specialties.length > 0 && (
                    <div className="mb-4">
                      <p className="text-[#8b949e] text-xs font-medium mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-2">
                        {operator.specialties.slice(0, 3).map((specialty: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-[#1a7a4a]/10 text-[#1a7a4a] text-xs rounded border border-[#1a7a4a]/20"
                          >
                            {specialty}
                          </span>
                        ))}
                        {operator.specialties.length > 3 && (
                          <span className="px-2 py-1 bg-[#30363d]/50 text-[#8b949e] text-xs rounded">
                            +{operator.specialties.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="space-y-2 pt-4 border-t border-[#30363d]">
                    {operator.contact_email && (
                      <a
                        href={`mailto:${operator.contact_email}`}
                        className="flex items-center gap-2 text-[#8b949e] hover:text-[#1a7a4a] transition-colors text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        {operator.contact_email}
                      </a>
                    )}
                    {operator.contact_phone && (
                      <a
                        href={`tel:${operator.contact_phone}`}
                        className="flex items-center gap-2 text-[#8b949e] hover:text-[#1a7a4a] transition-colors text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        {operator.contact_phone}
                      </a>
                    )}
                    {operator.website && (
                      <a
                        href={operator.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#1a7a4a] hover:text-[#e8a045] transition-colors text-sm font-medium"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#161b22] rounded-lg p-16 border border-[#30363d] text-center">
              <Users className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
              <p className="text-[#8b949e] text-lg">No operators found</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/5 border-t border-[#30363d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-[#8b949e] mb-6">
            Contact us and we'll connect you with the right tour operator for your Tanzania adventure.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a7a4a] text-white rounded-lg hover:bg-[#1a7a4a]/90 transition-colors font-medium"
          >
            <Mail className="w-4 h-4" />
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}

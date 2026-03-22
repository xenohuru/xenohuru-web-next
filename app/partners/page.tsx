'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ExternalLink, MapPin, Award, Zap } from 'lucide-react';
import { useState } from 'react';

const PARTNER_TYPE_ICONS = {
  sponsor: '💰',
  media: '📰',
  tourism_board: '🏛️',
  conservation: '🌿',
  other: '🤝',
};

const PARTNER_TYPE_COLORS = {
  sponsor: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
  media: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
  tourism_board: 'from-green-500/20 to-green-500/5 border-green-500/30',
  conservation: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
  other: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30',
};

export default function PartnersPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: () => api.partners.list(),
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

  const filteredPartners = selectedType
    ? partners.filter((p) => p.partner_type === selectedType)
    : partners;

  const partnerTypes = Array.from(new Set(partners.map((p) => p.partner_type)));

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/5 border-b border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              Our Partners
            </h1>
            <p className="text-xl text-[#8b949e] max-w-3xl mx-auto">
              Xenohuru collaborates with leading organizations, tourism boards, conservation efforts, and technology partners to create the most comprehensive Tanzania tourism platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] text-center">
              <Award className="w-8 h-8 text-[#e8a045] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{partners.length}</p>
              <p className="text-[#8b949e] text-sm">Active Partners</p>
            </div>
            <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] text-center">
              <MapPin className="w-8 h-8 text-[#1a7a4a] mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{partnerTypes.length}</p>
              <p className="text-[#8b949e] text-sm">Partnership Types</p>
            </div>
            <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">24/7</p>
              <p className="text-[#8b949e] text-sm">Support Available</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/10 rounded-lg p-6 border border-[#1a7a4a]/30 text-center">
              <Award className="w-8 h-8 text-[#1a7a4a] mx-auto mb-2" />
              <p className="text-2xl font-bold text-[#1a7a4a]">100%</p>
              <p className="text-[#8b949e] text-sm">Verified Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      {partnerTypes.length > 1 && (
        <section className="py-8 bg-[#161b22]/50 border-b border-[#30363d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#8b949e] text-sm font-medium mb-4">Filter by type:</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !selectedType
                    ? 'bg-[#1a7a4a] text-white'
                    : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                }`}
              >
                All ({partners.length})
              </button>
              {partnerTypes.map((type) => {
                const count = partners.filter((p) => p.partner_type === type).length;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-[#1a7a4a] text-white'
                        : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a]'
                    }`}
                  >
                    {PARTNER_TYPE_ICONS[type as keyof typeof PARTNER_TYPE_ICONS]} {type.replace('_', ' ')} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Partners Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map((partner) => (
                <div
                  key={partner.id}
                  className={`bg-gradient-to-br ${PARTNER_TYPE_COLORS[partner.partner_type as keyof typeof PARTNER_TYPE_COLORS] || PARTNER_TYPE_COLORS.other} rounded-lg p-6 border backdrop-blur-sm hover:shadow-lg hover:shadow-[#1a7a4a]/10 transition-all duration-300 group`}
                >
                  {/* Logo */}
                  {partner.logo && (
                    <div className="h-32 flex items-center justify-center mb-6 bg-white/5 rounded-lg overflow-hidden group-hover:bg-white/10 transition-colors">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#1a7a4a] transition-colors">
                    {partner.name}
                  </h3>

                  <p className="text-[#8b949e] text-sm mb-4 line-clamp-3">
                    {partner.description}
                  </p>

                  {/* Type Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#1a7a4a]/20 text-[#1a7a4a] text-xs rounded-full border border-[#1a7a4a]/30">
                      {PARTNER_TYPE_ICONS[partner.partner_type as keyof typeof PARTNER_TYPE_ICONS]}{' '}
                      {partner.partner_type?.replace(/_/g, ' ') || 'Partner'}
                    </span>
                  </div>

                  {/* Website Link */}
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#1a7a4a] hover:text-[#e8a045] transition-colors font-medium text-sm"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#161b22] rounded-lg p-16 border border-[#30363d] text-center">
              <Award className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
              <p className="text-[#8b949e] text-lg">No partners found</p>
            </div>
          )}
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-12 bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/5 border-t border-[#30363d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Interested in Partnership?
          </h2>
          <p className="text-[#8b949e] mb-6">
            Xenohuru welcomes partnerships with tourism boards, conservation organizations, and technology companies.
          </p>
          <a
            href="/contact?subject=partnership"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a7a4a] text-white rounded-lg hover:bg-[#1a7a4a]/90 transition-colors font-medium"
          >
            Get in Touch
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}

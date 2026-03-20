'use client';

import { useQuery } from '@tantml:query/react-query';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Plane,
  Share2,
  ChevronDown,
  Star
} from 'lucide-react';
import { AttractionCard } from '@/components/AttractionCard';
import { WeatherWidget } from '@/components/WeatherWidget';
import { ReviewForm } from '@/components/ReviewForm';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { useState } from 'react';
import toast from 'react-hot-toast';

const MapComponent = dynamic(() => import('@/components/MapComponent').then(mod => ({ default: mod.MapComponent })), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-[#161b22] rounded-2xl animate-pulse" />,
});

const DIFFICULTY_COLORS = {
  easy: 'bg-green-500/10 text-green-500 border-green-500/20',
  moderate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  difficult: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  extreme: 'bg-red-500/10 text-red-500 border-red-500/20',
};

const CONSERVATION_STATUS_COLORS = {
  'Least Concern': 'bg-green-500/10 text-green-500',
  'Near Threatened': 'bg-yellow-500/10 text-yellow-500',
  'Vulnerable': 'bg-orange-500/10 text-orange-500',
  'Endangered': 'bg-red-500/10 text-red-500',
  'Critically Endangered': 'bg-red-700/10 text-red-700',
};

export default function AttractionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [tipsOpen, setTipsOpen] = useState(false);
  const [citationsOpen, setCitationsOpen] = useState(false);

  const { data: attraction, isLoading, error, refetch } = useQuery({
    queryKey: ['attraction', slug],
    queryFn: () => api.attractions.detail(slug),
  });

  const { data: reviews, refetch: refetchReviews } = useQuery({
    queryKey: ['reviews', slug],
    queryFn: () => api.attractions.reviews(slug),
    enabled: !!attraction,
  });

  const { data: endemicSpecies } = useQuery({
    queryKey: ['endemic', slug],
    queryFn: () => api.attractions.endemic(slug),
    enabled: !!attraction,
  });

  const { data: transport } = useQuery({
    queryKey: ['transport', slug],
    queryFn: () => api.attractions.transport(slug),
    enabled: !!attraction,
  });

  const { data: boundary } = useQuery({
    queryKey: ['boundary', slug],
    queryFn: () => api.attractions.boundary(slug),
    enabled: !!attraction,
  });

  const { data: weather } = useQuery({
    queryKey: ['weather', attraction?.latitude, attraction?.longitude],
    queryFn: () => api.weather.current(attraction!.latitude, attraction!.longitude),
    enabled: !!attraction?.latitude && !!attraction?.longitude,
  });

  const { data: nearby } = useQuery({
    queryKey: ['nearby', attraction?.latitude, attraction?.longitude],
    queryFn: () => api.attractions.nearby(attraction!.latitude, attraction!.longitude),
    enabled: !!attraction?.latitude && !!attraction?.longitude,
  });

  const handleShare = async () => {
    if (navigator.share && attraction) {
      try {
        await navigator.share({
          title: attraction.name,
          text: attraction.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSkeleton variant="page" />
        </div>
      </div>
    );
  }

  if (error || !attraction) {
    return (
      <div className="min-h-screen bg-[#0d1117] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">Attraction not found</h2>
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

  const images = attraction.images || [attraction.featuredImage];

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Image Gallery */}
      <section className="pt-20">
        <Splide
          options={{
            type: 'loop',
            perPage: 1,
            perMove: 1,
            gap: '0',
            pagination: true,
            arrows: true,
            height: '60vh',
            cover: true,
          }}
        >
          {images.map((image, index) => (
            <SplideSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </SplideSlide>
          ))}
        </Splide>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-[#1a7a4a]/10 text-[#1a7a4a] text-sm font-medium rounded-full border border-[#1a7a4a]/20">
                  {attraction.category}
                </span>
                <span className="px-3 py-1 bg-[#161b22] text-[#8b949e] text-sm rounded-full border border-[#30363d]">
                  {attraction.region}
                </span>
                {attraction.difficultyLevel && (
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${DIFFICULTY_COLORS[attraction.difficultyLevel as keyof typeof DIFFICULTY_COLORS]}`}>
                    {attraction.difficultyLevel}
                  </span>
                )}
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                {attraction.name}
              </h1>

              <div className="flex items-center gap-2 text-[#8b949e] mb-6">
                <MapPin className="w-5 h-5" />
                <span>{attraction.region}, Tanzania</span>
              </div>

              {attraction.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(attraction.rating!)
                            ? 'fill-[#e8a045] text-[#e8a045]'
                            : 'text-[#30363d]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#8b949e]">
                    {attraction.rating.toFixed(1)} ({reviews?.length || 0} reviews)
                  </span>
                </div>
              )}

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] text-[#e6edf3] rounded-lg border border-[#30363d] hover:border-[#1a7a4a] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                About
              </h2>
              <p className="text-[#8b949e] leading-relaxed whitespace-pre-wrap">
                {attraction.description}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {attraction.estimatedDuration && (
                <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
                  <Clock className="w-5 h-5 text-[#1a7a4a] mb-2" />
                  <div className="text-[#8b949e] text-sm mb-1">Duration</div>
                  <div className="text-white font-semibold">{attraction.estimatedDuration}</div>
                </div>
              )}

              {attraction.bestTimeToVisit && (
                <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
                  <Calendar className="w-5 h-5 text-[#1a7a4a] mb-2" />
                  <div className="text-[#8b949e] text-sm mb-1">Best Time</div>
                  <div className="text-white font-semibold">{attraction.bestTimeToVisit}</div>
                </div>
              )}

              <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
                <DollarSign className="w-5 h-5 text-[#1a7a4a] mb-2" />
                <div className="text-[#8b949e] text-sm mb-1">Entrance Fee</div>
                <div className="text-white font-semibold">
                  {attraction.isFree ? 'Free' : attraction.entranceFee || 'Varies'}
                </div>
              </div>

              {attraction.difficultyLevel && (
                <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d]">
                  <TrendingUp className="w-5 h-5 text-[#1a7a4a] mb-2" />
                  <div className="text-[#8b949e] text-sm mb-1">Difficulty</div>
                  <div className="text-white font-semibold capitalize">{attraction.difficultyLevel}</div>
                </div>
              )}
            </div>

            {/* Map */}
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                Location
              </h2>
              <MapComponent
                center={[attraction.latitude, attraction.longitude]}
                zoom={12}
                markers={[
                  {
                    lat: attraction.latitude,
                    lng: attraction.longitude,
                    name: attraction.name,
                  },
                ]}
                boundary={boundary}
                className="h-[400px] rounded-2xl"
              />
            </div>

            {/* Endemic Species */}
            {endemicSpecies && endemicSpecies.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  Endemic Species
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {endemicSpecies.map((species) => (
                    <div
                      key={species.id}
                      className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] hover:border-[#1a7a4a] transition-colors"
                    >
                      {species.image && (
                        <img
                          src={species.image}
                          alt={species.commonName}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <h3 className="font-semibold text-white mb-1">
                        {species.commonName}
                      </h3>
                      <p className="text-[#8b949e] text-sm italic mb-2">
                        {species.scientificName}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          CONSERVATION_STATUS_COLORS[
                            species.conservationStatus as keyof typeof CONSERVATION_STATUS_COLORS
                          ]
                        }`}
                      >
                        {species.conservationStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transport */}
            {transport && transport.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  Getting There
                </h2>
                <div className="bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#0d1117]">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#e6edf3]">
                          <Plane className="w-4 h-4 inline mr-2" />
                          From
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-[#e6edf3]">
                          Distance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30363d]">
                      {transport.map((t) => (
                        <tr key={t.id}>
                          <td className="px-4 py-3 text-[#e6edf3]">{t.name}</td>
                          <td className="px-4 py-3 text-[#8b949e]">{t.distanceKm} km</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tips Accordion */}
            {attraction.tips && (
              <div>
                <button
                  onClick={() => setTipsOpen(!tipsOpen)}
                  className="w-full flex items-center justify-between bg-[#161b22] rounded-lg p-4 border border-[#30363d] hover:border-[#1a7a4a] transition-colors"
                >
                  <h2 className="font-display text-xl font-bold text-white">
                    Tips for Visitors
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8b949e] transition-transform ${
                      tipsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {tipsOpen && (
                  <div className="mt-4 bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
                    <p className="text-[#8b949e] whitespace-pre-wrap">{attraction.tips}</p>
                  </div>
                )}
              </div>
            )}

            {/* Citations */}
            {attraction.citations && (
              <div>
                <button
                  onClick={() => setCitationsOpen(!citationsOpen)}
                  className="w-full flex items-center justify-between bg-[#161b22] rounded-lg p-4 border border-[#30363d] hover:border-[#1a7a4a] transition-colors"
                >
                  <h2 className="font-display text-xl font-bold text-white">
                    Sources & Citations
                  </h2>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8b949e] transition-transform ${
                      citationsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {citationsOpen && (
                  <div className="mt-4 bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
                    <p className="text-[#8b949e] text-sm whitespace-pre-wrap">
                      {attraction.citations}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Reviews */}
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-6">
                Reviews ({reviews?.length || 0})
              </h2>

              {/* Review Form */}
              <ReviewForm attractionSlug={slug} onSuccess={() => refetchReviews()} />

              {/* Reviews List */}
              {reviews && reviews.length > 0 && (
                <div className="mt-8 space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-[#161b22] rounded-lg p-6 border border-[#30363d]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white">{review.name}</h4>
                          <p className="text-[#8b949e] text-sm">{review.country}</p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-[#e8a045] text-[#e8a045]'
                                  : 'text-[#30363d]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#e6edf3] leading-relaxed">{review.comment}</p>
                      <p className="text-[#8b949e] text-sm mt-3">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget */}
            {weather && <WeatherWidget weather={weather} />}

            {/* Nearby Attractions */}
            {nearby && nearby.length > 0 && (
              <div className="bg-[#161b22] rounded-2xl p-6 border border-[#30363d]">
                <h3 className="font-display text-xl font-bold text-white mb-4">
                  Nearby Attractions
                </h3>
                <div className="space-y-4">
                  {nearby.slice(0, 3).map((attr) => (
                    <AttractionCard key={attr.id} attraction={attr} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

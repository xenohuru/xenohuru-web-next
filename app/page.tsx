'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AttractionCard } from '@/components/AttractionCard';
import { WeatherForecastCard } from '@/components/cards/WeatherForecastCard';
import { Compass, ArrowRight, ChevronsDown, Building2, Plane, Mountain, MapPin, Cloud, Heart, Mail } from 'lucide-react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

// Swahili quotes that rotate
const SWAHILI_QUOTES = [
  { sw: "Hakuna Matata", en: "No worries" },
  { sw: "Safari njema", en: "Have a good journey" },
  { sw: "Karibu Tanzania", en: "Welcome to Tanzania" },
  { sw: "Pole pole", en: "Slowly, slowly" },
  { sw: "Jambo", en: "Hello" },
  { sw: "Asante sana", en: "Thank you very much" },
  { sw: "Twende", en: "Let's go" },
  { sw: "Pamoja", en: "Together" },
];

// Animated Counter Component
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

// Rotating Swahili Quote Component
function RotatingSwahiliQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SWAHILI_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const quote = SWAHILI_QUOTES[index];

  return (
    <p className="text-2xl sm:text-3xl font-display text-[#8b5e3c] transition-opacity duration-500">
      "{quote.sw}" — {quote.en}
    </p>
  );
}

export default function HomePage() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const { data: featuredData } = useQuery({
    queryKey: ['featured-attractions'],
    queryFn: () => api.attractions.featured(),
  });

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.stats.get(),
  });

  const { data: partnersData } = useQuery({
    queryKey: ['partners'],
    queryFn: () => api.partners.list(),
  });

  const { data: regionsData } = useQuery({
    queryKey: ['regions-preview'],
    queryFn: () => api.regions.list(),
  });

  const { data: blogData } = useQuery({
    queryKey: ['blog-preview'],
    queryFn: () => api.blog.list(),
  });

  const { data: operatorsData } = useQuery({
    queryKey: ['operators-preview'],
    queryFn: () => api.operators.list(),
  });

  const featured: any[] = Array.isArray(featuredData) ? featuredData : (featuredData as any)?.results || [];
  const partners: any[] = Array.isArray(partnersData) ? partnersData : (partnersData as any)?.results || [];
  const regions: any[] = Array.isArray(regionsData) ? regionsData : (regionsData as any)?.results || [];
  const blogArticles: any[] = Array.isArray(blogData) ? blogData : (blogData as any)?.results || [];
  const operators: any[] = Array.isArray(operatorsData) ? operatorsData : (operatorsData as any)?.results || [];

  // Dar es Salaam coordinates for weather forecast
  const { data: weatherForecast } = useQuery({
    queryKey: ['weather-forecast'],
    queryFn: () => api.weather.forecast(-6.8, 39.3) as Promise<any[]>,
  });

  // Rotate hero quote
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % SWAHILI_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroQuote = SWAHILI_QUOTES[quoteIndex];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4731] via-gray-900 to-black" />
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(26,71,49,0.88) 0%, rgba(30,111,168,0.55) 50%, rgba(200,144,58,0.4) 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 12s ease infinite',
          }}
        />
        
        {/* Grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: '128px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          {/* Rotating Swahili Quote */}
          <p className="text-[#c8903a] text-base sm:text-lg mb-2 opacity-90 transition-opacity duration-500">
            "{heroQuote.sw}"
          </p>
          
          {/* Eyebrow */}
          <p className="font-mono text-white/60 uppercase tracking-widest text-xs mb-6">
            Discover Tanzania
          </p>
          
          {/* Main Title */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.05] mb-6">
            Explore the Wild<br className="hidden sm:block" /> Heart of Africa
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            From the snows of Kilimanjaro to the turquoise shores of Zanzibar — safari, hiking, cultural tours and more.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/attractions"
              className="inline-flex items-center justify-center gap-2 bg-[#c8903a] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#c8903a]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5" />
              Browse Attractions
            </a>
            <a
              href="/regions"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/80 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            >
              Explore Regions
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a 
          href="#stats"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronsDown className="w-7 h-7" />
        </a>
      </section>

      {/* STATS BAR */}
      <section id="stats" className="bg-[#1a4731] text-white relative overflow-hidden" data-aos="fade-up">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div data-aos="zoom-in" data-aos-delay="100">
              <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Attractions</div>
              <div className="text-4xl sm:text-5xl font-display font-bold">
                {stats ? <AnimatedCounter target={stats.attractionCount} /> : '0'}
                <span className="text-white/40 text-xs">+</span>
              </div>
            </div>
            <div data-aos="zoom-in" data-aos-delay="200">
              <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Regions</div>
              <div className="text-4xl sm:text-5xl font-display font-bold">
                {stats ? <AnimatedCounter target={stats.regionCount} /> : '0'}
              </div>
            </div>
            <div data-aos="zoom-in" data-aos-delay="300">
              <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Kilimanjaro Peak</div>
              <div className="text-4xl sm:text-5xl font-display font-bold">
                <AnimatedCounter target={5895} />
                <span className="text-white/40 text-xs">m</span>
              </div>
            </div>
            <div data-aos="zoom-in" data-aos-delay="400">
              <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Year-Round</div>
              <div className="text-4xl sm:text-5xl font-display font-bold">Open</div>
            </div>
          </div>
        </div>
      </section>

      {/* SWAHILI QUOTE BANNER */}
      <section className="bg-[#f5e6c8]/60 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <RotatingSwahiliQuote />
        </div>
      </section>

      {/* FEATURED ATTRACTIONS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-aos="fade-up">
        <div className="text-center mb-14" data-aos="fade-down">
          <p className="font-mono text-xs tracking-widest text-[#c8903a] uppercase mb-3">
            Handpicked Highlights
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
            Featured Attractions
          </h2>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            Discover Tanzania's most iconic destinations
          </p>
        </div>

        {featured && featured.length > 0 ? (
          <Splide
            options={{
              type: 'loop',
              perPage: 3,
              perMove: 1,
              gap: '1.5rem',
              pagination: true,
              autoplay: true,
              pauseOnHover: true,
              interval: 4000,
              breakpoints: {
                1024: { perPage: 2 },
                640: { perPage: 1 },
              },
            }}
          >
            {featured.map((attraction, index) => (
              <SplideSlide key={attraction.id}>
                <div data-aos="fade-up" data-aos-delay={index * 100}>
                  <AttractionCard attraction={attraction} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-[#111827] rounded-2xl animate-pulse" />
            ))}
          </div>
        )}
      </section>

      {/* REGIONS PREVIEW */}
      {regions && regions.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-aos="fade-up">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-widest text-[#c8903a] uppercase mb-3">
              Discover Destinations
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              Explore Regions
            </h2>
            <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
              From coastal paradises to mountain peaks, discover Tanzania's diverse regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regions.slice(0, 3).map((region: any, idx: number) => (
              <a
                key={region.id}
                href={`/regions/${region.slug}`}
                className="group relative h-80 rounded-xl overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                {region.featured_image && (
                  <img
                    src={region.featured_image}
                    alt={region.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {region.name}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-2 mb-3">
                    {region.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#1a7a4a] text-sm font-medium">
                    Explore Region
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/regions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a7a4a]/20 border border-[#1a7a4a]/30 text-[#1a7a4a] rounded-lg hover:bg-[#1a7a4a]/30 transition-colors font-medium"
            >
              View All Regions
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      )}

      {/* BLOG PREVIEW */}
      {blogArticles && blogArticles.length > 0 && (
        <section className="py-20 bg-[#161b22]/50" data-aos="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="font-mono text-xs tracking-widest text-[#c8903a] uppercase mb-3">
                Stories & Insights
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
                Latest from Our Blog
              </h2>
              <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
                Travel tips, cultural insights, and adventure stories from Tanzania
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogArticles.slice(0, 3).map((article: any, idx: number) => (
                <a
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden hover:border-[#1a7a4a]/50 transition-all"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  {article.featured_image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.featured_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-[#1a7a4a] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[#8b949e] text-sm line-clamp-3 mb-4">
                      {article.excerpt || article.content?.substring(0, 150)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#8b949e]">
                      <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                      <span className="text-[#1a7a4a]">Read more →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a7a4a]/20 border border-[#1a7a4a]/30 text-[#1a7a4a] rounded-lg hover:bg-[#1a7a4a]/30 transition-colors font-medium"
              >
                View All Articles
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* TOUR OPERATORS PREVIEW */}
      {operators && operators.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-aos="fade-up">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-widest text-[#c8903a] uppercase mb-3">
              Trusted Partners
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              Tour Operators
            </h2>
            <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
              Licensed and verified tour operators to guide your adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {operators.slice(0, 4).map((operator: any, idx: number) => (
              <div
                key={operator.id}
                className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-[#1a7a4a]/50 transition-all"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {operator.logo && (
                  <div className="h-16 flex items-center justify-center mb-4 bg-white/5 rounded-lg">
                    <img
                      src={operator.logo}
                      alt={operator.name}
                      className="h-12 object-contain"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1">
                  {operator.name}
                </h3>
                <p className="text-xs text-[#8b949e] line-clamp-2">
                  {operator.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/operators"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a7a4a]/20 border border-[#1a7a4a]/30 text-[#1a7a4a] rounded-lg hover:bg-[#1a7a4a]/30 transition-colors font-medium"
            >
              View All Operators
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      )}

      {/* DISTANCE REFERENCE */}
      <section className="py-20 bg-[#111827]" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-aos="fade-down">
            <p className="font-mono text-xs tracking-widest text-[#c8903a] uppercase mb-3">
              Plan Your Route
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              Distance from Key Locations
            </h2>
            <p className="text-[#6b7280] text-lg">
              Know how far each destination is from popular hubs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#c8903a]/10 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300" data-aos="flip-left" data-aos-delay="100">
              <div className="w-14 h-14 rounded-2xl bg-[#1e6fa8]/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-7 h-7 text-[#1e6fa8]" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-1">Dar es Salaam</h3>
              <p className="text-[#6b7280] text-sm">Commercial Capital</p>
            </div>

            <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#c8903a]/10 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300" data-aos="flip-left" data-aos-delay="200">
              <div className="w-14 h-14 rounded-2xl bg-[#c8903a]/10 flex items-center justify-center mx-auto mb-4">
                <Plane className="w-7 h-7 text-[#c8903a]" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-1">Kilimanjaro Airport</h3>
              <p className="text-[#6b7280] text-sm">International Gateway</p>
            </div>

            <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#c8903a]/10 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300" data-aos="flip-left" data-aos-delay="300">
              <div className="w-14 h-14 rounded-2xl bg-[#1a4731]/30 flex items-center justify-center mx-auto mb-4">
                <Mountain className="w-7 h-7 text-[#1a4731]" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-1">Arusha</h3>
              <p className="text-[#6b7280] text-sm">Safari Capital</p>
            </div>

            <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-[#c8903a]/10 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300" data-aos="flip-left" data-aos-delay="400">
              <div className="w-14 h-14 rounded-2xl bg-[#1e6fa8]/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-[#1e6fa8]" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-1">Zanzibar</h3>
              <p className="text-[#6b7280] text-sm">Island Paradise</p>
            </div>
          </div>
        </div>
      </section>

      {/* WEATHER FORECAST SECTION */}
      {weatherForecast && weatherForecast.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-down">
            <p className="font-mono text-xs tracking-widest text-[#1a7a4a] uppercase mb-3 flex items-center justify-center gap-2">
              <Cloud className="w-4 h-4" />
              Weather & Climate
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              5-Day Forecast
            </h2>
            <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
              Plan your adventure with our weather outlook for Tanzania's major regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {weatherForecast.slice(0, 5).map((forecast, idx) => (
              <div key={idx} data-aos="fade-up" data-aos-delay={idx * 50}>
                <WeatherForecastCard forecast={forecast} minimal />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="/weather"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a7a4a]/20 border border-[#1a7a4a]/30 text-[#1a7a4a] rounded-lg hover:bg-[#1a7a4a]/30 transition-colors font-medium"
            >
              View Full Weather
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      )}

      {/* PARTNERS SECTION */}
      {partners && partners.length > 0 && (
        <section className="py-20 bg-[#161b22]/50 border-t border-b border-[#30363d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Our Partners
              </h2>
              <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
                Collaborating with leading tourism boards, conservation organizations, and technology partners
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partners.slice(0, 8).map((partner) => (
                <a
                  key={partner.id}
                  href={partner.website || `/partners`}
                  target={partner.website ? "_blank" : undefined}
                  rel={partner.website ? "noopener noreferrer" : undefined}
                  className="group bg-[#161b22] rounded-lg p-6 border border-[#30363d] hover:border-[#1a7a4a]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#1a7a4a]/10"
                  data-aos="zoom-in"
                >
                  {partner.logo && (
                    <div className="h-24 flex items-center justify-center mb-4 bg-white/5 rounded-lg overflow-hidden group-hover:bg-white/10 transition-colors">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-16 object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-white mb-2 group-hover:text-[#1a7a4a] transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-[#8b949e] line-clamp-2 mb-3">
                    {partner.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-[#1a7a4a]/10 text-[#1a7a4a] text-xs rounded-full border border-[#1a7a4a]/20">
                    {partner.partner_type || 'Partner'}
                  </span>
                </a>
              ))}
            </div>

            {partners.length > 8 && (
              <div className="text-center mt-12">
                <a
                  href="/partners"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a7a4a]/20 border border-[#1a7a4a]/30 text-[#1a7a4a] rounded-lg hover:bg-[#1a7a4a]/30 transition-colors font-medium"
                >
                  View All Partners
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      <section className="py-20 bg-[#161b22]/50" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-widest text-[#c8903a] uppercase mb-3">
              Have Questions?
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do I need a visa to visit Tanzania?",
                a: "Most visitors need a visa. You can obtain it online before travel or on arrival. Check with your local Tanzanian embassy for specific requirements."
              },
              {
                q: "What's the best time to visit Tanzania?",
                a: "June to October for wildlife viewing during the dry season. December to March for the Great Migration calving season. Zanzibar is great year-round."
              },
              {
                q: "Is Tanzania safe for tourists?",
                a: "Yes! Tanzania is one of the safest countries in East Africa. Always follow local advice, use licensed operators, and take standard travel precautions."
              },
              {
                q: "What currency is used in Tanzania?",
                a: "Tanzanian Shilling (TZS). US Dollars are widely accepted. Credit cards work in cities, but carry cash for rural areas."
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-[#0d1117] border border-[#30363d] rounded-lg p-6 hover:border-[#1a7a4a]/50 transition-all"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <summary className="font-semibold text-white cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <span className="text-[#1a7a4a] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-[#8b949e] text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-[#1a7a4a] hover:text-[#e8a045] transition-colors"
            >
              More about Xenohuru
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SPONSOR CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-aos="fade-up">
        <div className="bg-gradient-to-br from-[#1a4731] to-[#0d1117] rounded-2xl p-12 border border-[#1a7a4a]/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold text-white mb-6">
              Support Open Tourism Data
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Help us keep Xenohuru free and open. We need support for API hosting, database storage, domain, and infrastructure. Every contribution helps local developers maintain this platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/sponsor"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e8a045] text-white font-semibold rounded-lg hover:bg-[#e8a045]/90 transition-all shadow-lg"
              >
                <Heart className="w-5 h-5" />
                Become a Sponsor
              </a>
              <a
                href="/contributors"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                View Contributors
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-20 bg-[#161b22]/50" data-aos="fade-up">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-6">
            Need Help Planning Your Trip?
          </h2>
          <p className="text-lg text-[#8b949e] mb-8">
            Our team is here to help. Get in touch for travel advice, tour bookings, or partnership inquiries.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a7a4a] text-white font-semibold rounded-lg hover:bg-[#1a7a4a]/90 transition-all shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </a>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-[#1a4731] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-[#fafaf8]/80 mb-8">
            Join us in exploring Tanzania's incredible attractions, from majestic mountains to pristine beaches.
          </p>
          <a
            href="/attractions"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-[#c8903a] rounded-full hover:bg-[#c8903a]/90 transition-all shadow-lg hover:shadow-xl"
          >
            <Compass className="w-5 h-5" />
            Start Exploring
          </a>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

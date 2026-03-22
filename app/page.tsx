'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AttractionCard } from '@/components/AttractionCard';
import { WeatherForecastCard } from '@/components/cards/WeatherForecastCard';
import { Compass, ArrowRight, ChevronsDown, Building2, Plane, Mountain, MapPin, Cloud } from 'lucide-react';
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

  const { data: featured } = useQuery({
    queryKey: ['featured-attractions'],
    queryFn: () => api.attractions.featured(),
  });

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.stats.get(),
  });

  const { data: partners } = useQuery({
    queryKey: ['partners'],
    queryFn: () => api.partners.list(),
  });

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

'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function WeatherPage() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const [selectedRegion, setSelectedRegion] = useState(-3.3869);

  const { data: weather } = useQuery({
    queryKey: ['weather', selectedRegion],
    queryFn: () => api.weather.current(selectedRegion, 36.6822),
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="py-20 px-4 bg-gradient-to-br from-[#1e6fa8] to-[#0a0a0a]">
        <h1 className="font-display text-5xl font-bold text-white text-center mb-4">Weather in Tanzania</h1>
        <p className="text-center text-[#8b949e]">Current conditions across attractions</p>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="bg-[#111827] rounded-2xl p-8 border border-[#c8903a]/10">
          {weather ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <Sun className="w-24 h-24 text-[#c8903a] mx-auto mb-4" />
                <div className="text-5xl font-bold text-white mb-2">{Math.round(weather.temperature)}°C</div>
                <p className="text-xl text-[#8b949e] mb-8">{weather.condition}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-lg">
                  <Droplets className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-[#8b949e] text-sm">Humidity</p>
                    <p className="text-white font-bold">{weather.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-lg">
                  <Wind className="w-6 h-6 text-cyan-400" />
                  <div>
                    <p className="text-[#8b949e] text-sm">Wind</p>
                    <p className="text-white font-bold">{weather.wind_speed || 'N/A'} km/h</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Cloud className="w-16 h-16 text-[#8b949e] mx-auto mb-4 animate-pulse" />
              <p className="text-[#8b949e]">Loading weather data...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';
import { WeatherForecast } from '@/lib/types';

interface WeatherForecastCardProps {
  forecast: WeatherForecast;
  minimal?: boolean;
}

export function WeatherForecastCard({ forecast, minimal = false }: WeatherForecastCardProps) {
  const getWeatherIcon = (condition: string) => {
    const cond = condition?.toLowerCase() || '';
    if (cond.includes('rain')) return <CloudRain className="w-6 h-6 text-blue-400" />;
    if (cond.includes('cloud')) return <Cloud className="w-6 h-6 text-gray-400" />;
    return <Sun className="w-6 h-6 text-yellow-400" />;
  };

  if (minimal) {
    return (
      <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] hover:border-[#1a7a4a]/50 transition-colors">
        <p className="text-[#8b949e] text-xs mb-2">
          {new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getWeatherIcon(forecast.condition)}
              <span className="text-white font-semibold">{forecast.temperature_max}°C</span>
            </div>
            <p className="text-[#8b949e] text-xs">{forecast.condition}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/10 rounded-lg p-6 border border-[#1a7a4a]/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[#8b949e] text-sm">
            {new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-white font-semibold mt-1">{forecast.condition}</p>
        </div>
        <div className="text-4xl">
          {getWeatherIcon(forecast.condition)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[#8b949e] text-xs mb-1">High / Low</p>
          <p className="text-white font-semibold">
            {forecast.temperature_max}° / {forecast.temperature_min}°
          </p>
        </div>
        {forecast.humidity && (
          <div>
            <p className="text-[#8b949e] text-xs mb-1 flex items-center gap-1">
              <Droplets className="w-3 h-3" /> Humidity
            </p>
            <p className="text-white font-semibold">{forecast.humidity}%</p>
          </div>
        )}
        {forecast.precipitation_chance && (
          <div>
            <p className="text-[#8b949e] text-xs mb-1 flex items-center gap-1">
              <CloudRain className="w-3 h-3" /> Rain
            </p>
            <p className="text-white font-semibold">{forecast.precipitation_chance}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

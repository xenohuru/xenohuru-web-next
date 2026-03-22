import { Cloud, CloudRain, Sun, Wind, Droplets, Eye } from 'lucide-react';

interface WeatherCardProps {
  weather: {
    temperature?: number;
    condition?: string;
    humidity?: number;
    windSpeed?: number;
    visibility?: number;
    feelsLike?: number;
  };
}

export function WeatherCard({ weather }: WeatherCardProps) {
  if (!weather) {
    return (
      <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
        <p className="text-[#8b949e] text-sm">Weather data unavailable</p>
      </div>
    );
  }

  const getWeatherIcon = (condition: string) => {
    const cond = condition?.toLowerCase() || '';
    if (cond.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (cond.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-400" />;
    return <Sun className="w-8 h-8 text-yellow-400" />;
  };

  return (
    <div className="bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/10 rounded-lg p-6 border border-[#1a7a4a]/30">
      <h3 className="font-display text-xl font-bold text-white mb-4">
        Current Weather
      </h3>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-4xl font-bold text-white">
            {weather.temperature ? `${Math.round(weather.temperature)}°C` : 'N/A'}
          </div>
          <p className="text-[#8b949e] text-sm mt-1">
            {weather.condition || 'Conditions unknown'}
          </p>
          {weather.feelsLike && (
            <p className="text-[#8b949e] text-xs mt-1">
              Feels like {Math.round(weather.feelsLike)}°C
            </p>
          )}
        </div>
        <div className="text-yellow-400">
          {getWeatherIcon(weather.condition || '')}
        </div>
      </div>

      <div className="space-y-3">
        {weather.humidity && (
          <div className="flex items-center gap-3">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span className="text-[#8b949e] text-sm">
              Humidity: <span className="text-[#e6edf3]">{weather.humidity}%</span>
            </span>
          </div>
        )}

        {weather.windSpeed && (
          <div className="flex items-center gap-3">
            <Wind className="w-4 h-4 text-teal-400" />
            <span className="text-[#8b949e] text-sm">
              Wind: <span className="text-[#e6edf3]">{weather.windSpeed} km/h</span>
            </span>
          </div>
        )}

        {weather.visibility && (
          <div className="flex items-center gap-3">
            <Eye className="w-4 h-4 text-purple-400" />
            <span className="text-[#8b949e] text-sm">
              Visibility: <span className="text-[#e6edf3]">{weather.visibility} km</span>
            </span>
          </div>
        )}
      </div>

      <p className="text-[#8b949e] text-xs mt-6 pt-4 border-t border-[#30363d]">
        💡 Weather conditions may affect visiting conditions. Always check with local operators.
      </p>
    </div>
  );
}

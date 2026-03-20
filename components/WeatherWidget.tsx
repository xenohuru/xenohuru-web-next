'use client';

import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed?: number;
  forecast?: Array<{
    date: string;
    tempHigh: number;
    tempLow: number;
    condition: string;
  }>;
}

interface WeatherWidgetProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes('rain')) return <CloudRain className="w-12 h-12 text-[#1a7a4a]" />;
  if (lower.includes('cloud')) return <Cloud className="w-12 h-12 text-[#8b949e]" />;
  if (lower.includes('wind')) return <Wind className="w-12 h-12 text-[#1a7a4a]" />;
  return <Sun className="w-12 h-12 text-[#e8a045]" />;
};

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <div className="bg-[#161b22] rounded-2xl p-6 border border-[#30363d]">
      <h3 className="font-display text-xl font-bold text-white mb-6">
        Current Weather
      </h3>

      {/* Current Conditions */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-6xl font-bold text-white mb-2">
            {weather.temperature}°C
          </div>
          <div className="text-[#8b949e] text-lg capitalize">
            {weather.condition}
          </div>
        </div>
        <div>{getWeatherIcon(weather.condition)}</div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#0d1117] rounded-lg p-4">
          <div className="text-[#8b949e] text-sm mb-1">Humidity</div>
          <div className="text-white text-2xl font-bold">{weather.humidity}%</div>
        </div>
        {weather.windSpeed && (
          <div className="bg-[#0d1117] rounded-lg p-4">
            <div className="text-[#8b949e] text-sm mb-1">Wind Speed</div>
            <div className="text-white text-2xl font-bold">{weather.windSpeed} km/h</div>
          </div>
        )}
      </div>

      {/* 7-Day Forecast */}
      {weather.forecast && weather.forecast.length > 0 && (
        <div>
          <h4 className="font-semibold text-white mb-4">7-Day Forecast</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weather.forecast}>
              <XAxis
                dataKey="date"
                stroke="#8b949e"
                tick={{ fill: '#8b949e', fontSize: 12 }}
              />
              <YAxis stroke="#8b949e" tick={{ fill: '#8b949e' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '8px',
                  color: '#e6edf3',
                }}
              />
              <Bar dataKey="tempHigh" fill="#e8a045" radius={[8, 8, 0, 0]} />
              <Bar dataKey="tempLow" fill="#1a7a4a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

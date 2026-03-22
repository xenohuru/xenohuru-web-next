import { Plane, Compass } from 'lucide-react';

interface TransportCardProps {
  transport: {
    id: string | number;
    name: string;
    distanceKm?: number;
    duration?: string;
    cost?: string;
    type?: string;
  };
}

export function TransportCard({ transport }: TransportCardProps) {
  return (
    <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] hover:border-[#1a7a4a]/50 transition-colors">
      <div className="flex items-start gap-3">
        <Compass className="w-5 h-5 text-[#1a7a4a] flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h4 className="font-semibold text-white">{transport.name}</h4>
          
          <div className="mt-2 space-y-1 text-sm">
            {transport.distanceKm && (
              <p className="text-[#8b949e]">
                <span className="text-[#1a7a4a]">📍 Distance:</span> {transport.distanceKm} km
              </p>
            )}
            {transport.duration && (
              <p className="text-[#8b949e]">
                <span className="text-[#1a7a4a]">⏱️ Duration:</span> {transport.duration}
              </p>
            )}
            {transport.cost && (
              <p className="text-[#e8a045]">
                <span className="text-[#1a7a4a]">💰 Cost:</span> {transport.cost}
              </p>
            )}
            {transport.type && (
              <p className="text-[#8b949e]">
                <span className="text-[#1a7a4a]">🚗 Type:</span> {transport.type}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

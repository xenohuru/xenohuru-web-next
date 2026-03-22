import { TransportCard } from '@/components/cards/TransportCard';
import { Plane } from 'lucide-react';

interface Transport {
  id: string | number;
  name: string;
  distanceKm?: number;
  duration?: string;
  cost?: string;
  type?: string;
}

interface TransportSectionProps {
  transport: Transport[] | undefined;
  isLoading?: boolean;
  error?: string;
}

export function TransportSection({ transport, isLoading, error }: TransportSectionProps) {
  if (error) {
    return (
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
        <p className="text-yellow-400 text-sm">⚠️ Transport information unavailable</p>
      </div>
    );
  }

  if (!transport || transport.length === 0) {
    return (
      <div className="bg-[#161b22] rounded-lg p-12 border border-[#30363d] text-center">
        <Plane className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
        <p className="text-[#8b949e]">Transport options not available</p>
        <p className="text-[#8b949e] text-sm mt-2">
          Contact local operators for getting there information
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transport.map((t) => (
        <TransportCard key={t.id} transport={t} />
      ))}
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import type { Region } from '@/lib/types';
import { MapPin } from 'lucide-react';
import { PLACEHOLDER_SMALL_DATA_URI } from '@/lib/placeholders';

interface RegionCardProps {
  region: Region;
}

export function RegionCard({ region }: RegionCardProps) {
  const imageSrc = region.image || PLACEHOLDER_SMALL_DATA_URI;

  return (
    <Link href={`/regions/${region.slug}`}>
      <div className="group bg-[#111827] rounded-lg overflow-hidden border border-[#c8903a]/10 hover:border-[#c8903a]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#c8903a]/20">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageSrc}
            alt={region.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Region Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-display text-xl font-bold text-white group-hover:text-[#c8903a] transition-colors">
              {region.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Description */}
          <p className="text-sm text-[#6b7280] mb-3 line-clamp-2">
            {region.description}
          </p>

          {/* Attraction Count */}
          {region.attraction_count !== undefined && (
            <div className="flex items-center gap-2 text-sm text-[#c8903a]">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">
                {region.attraction_count} {region.attraction_count === 1 ? 'Attraction' : 'Attractions'}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

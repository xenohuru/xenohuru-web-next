import Link from 'next/link';
import Image from 'next/image';
import type { Region } from '@/lib/types';
import { MapPin } from 'lucide-react';

interface RegionCardProps {
  region: Region;
}

// Placeholder SVG for missing images
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxYTQ3MzE7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlOGEwNDU7c3RvcC1vcGFjaXR5OjAuOCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIENvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==';

export function RegionCard({ region }: RegionCardProps) {
  const imageSrc = region.image || PLACEHOLDER_IMAGE;

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

import Link from 'next/link';
import Image from 'next/image';
import type { Attraction } from '@/lib/types';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { StarRating } from './StarRating';

interface AttractionCardProps {
  attraction: Attraction;
  compact?: boolean;
}

// Placeholder SVG for missing images
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxYTQ3MzE7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlOGEwNDU7c3RvcC1vcGFjaXR5OjAuOCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIENvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==';

export function AttractionCard({ attraction, compact = false }: AttractionCardProps) {
  const difficultyColors = {
    easy: 'bg-green-500',
    moderate: 'bg-yellow-500',
    challenging: 'bg-orange-500',
    difficult: 'bg-red-500',
  };

  // Use placeholder if image is null or empty
  const imageSrc = attraction.featured_image || PLACEHOLDER_IMAGE;

  if (compact) {
    return (
      <Link href={`/attractions/${attraction.slug}`}>
        <div className="flex gap-3 p-3 bg-[#0d1117] rounded-lg border border-[#30363d] hover:border-[#1a7a4a] transition-colors">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={imageSrc}
              alt={attraction.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white text-sm mb-1 truncate">
              {attraction.name}
            </h4>
            <p className="text-[#8b949e] text-xs mb-1 truncate">
              {typeof attraction.region === 'object' ? attraction.region.name : attraction.region_name || attraction.region}
            </p>
            {attraction.rating && (
              <StarRating rating={attraction.rating} size="sm" />
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/attractions/${attraction.slug}`}>
      <div className="group bg-[#111827] rounded-lg overflow-hidden border border-[#c8903a]/10 hover:border-[#c8903a]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#c8903a]/20 hover:scale-105">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageSrc}
            alt={attraction.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {attraction.is_featured && (
            <div className="absolute top-2 right-2 bg-[#c8903a] text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-[#c8903a] transition-colors">
            {attraction.name}
          </h3>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {/* Category */}
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#1a4731] text-[#c8903a]">
              {attraction.category_display || attraction.category}
            </span>

            {/* Difficulty */}
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${
                difficultyColors[attraction.difficulty_level]
              }`}
            >
              {attraction.difficulty_level}
            </span>
          </div>

          {/* Region */}
          {attraction.region_name && (
            <div className="flex items-center gap-1 text-sm text-[#6b7280] mb-2">
              <MapPin className="w-4 h-4" />
              <span>{attraction.region_name}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-[#6b7280] mb-3 line-clamp-2">
            {attraction.short_description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-[#6b7280]">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{attraction.estimated_duration}</span>
            </div>

            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>{attraction.is_free ? 'Free' : attraction.entrance_fee}</span>
            </div>
          </div>

          {/* Rating */}
          {attraction.rating && (
            <div className="mt-3 pt-3 border-t border-[#c8903a]/10">
              <StarRating rating={attraction.rating} readonly />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

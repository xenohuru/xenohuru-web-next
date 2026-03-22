'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getPlaceholderDataUri } from '@/lib/placeholders';

interface OptimizedImageProps {
  src: string | null | undefined;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  sizes?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  objectFit = 'cover',
  sizes,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use placeholder if no src or error
  const displaySrc = !src || hasError 
    ? getPlaceholderDataUri(width > 800 ? 'hero' : 'small') 
    : src;

  return (
    <div className={`relative overflow-hidden bg-[#161b22] ${className}`}>
      <Image
        src={displaySrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ objectFit }}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#161b22] via-[#1e2633] to-[#161b22] animate-pulse" />
      )}
    </div>
  );
}

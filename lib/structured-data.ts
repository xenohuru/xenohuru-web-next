import type { Attraction, Region, Article } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://x.xenohuru.workers.dev';

export function generateAttractionSchema(attraction: Attraction) {
  const regionName = typeof attraction.region === 'string' 
    ? attraction.region 
    : (typeof attraction.region === 'object' && attraction.region?.name)
      ? attraction.region.name
      : 'Tanzania';

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: attraction.name,
    description: attraction.short_description,
    image: attraction.featured_image,
    url: `${SITE_URL}/attractions/${attraction.slug}`,
    location: {
      '@type': 'Place',
      name: regionName,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: attraction.latitude,
        longitude: attraction.longitude,
      },
    },
    aggregateRating: attraction.rating ? {
      '@type': 'AggregateRating',
      ratingValue: attraction.rating,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    priceRange: attraction.entrance_fee ? `USD ${attraction.entrance_fee}` : 'Free',
  };
}

export function generateRegionSchema(region: Region) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: region.name,
    description: region.description,
    image: region.image,
    url: `${SITE_URL}/regions/${region.slug}`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: region.latitude,
      longitude: region.longitude,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Xenohuru',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: 'Open-source Tanzania tourism platform',
    sameAs: [
      'https://twitter.com/xenohuru',
      'https://github.com/xenohuru',
    ],
  };
}

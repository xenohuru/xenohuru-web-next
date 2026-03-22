import { Metadata } from 'next';
import type { Attraction, Region, Article } from './types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://x.xenohuru.workers.dev';

export function generateAttractionMetadata(attraction: Attraction): Metadata {
  const description = attraction.short_description || `Discover ${attraction.name} in Tanzania`;
  const imageUrl = attraction.featured_image || `${SITE_URL}/og-image.png`;

  return {
    title: `${attraction.name} - Attractions in Tanzania | Xenohuru`,
    description,
    keywords: [
      attraction.name,
      attraction.category,
      'Tanzania',
      'attractions',
      'tourism',
      'travel',
    ].filter(Boolean),
    openGraph: {
      title: attraction.name,
      description,
      url: `${SITE_URL}/attractions/${attraction.slug}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: attraction.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: attraction.name,
      description,
      images: [imageUrl],
    },
  };
}

export function generateRegionMetadata(region: Region): Metadata {
  const description = region.description || `Explore ${region.name} region in Tanzania`;
  const imageUrl = region.image || `${SITE_URL}/og-image.png`;

  return {
    title: `${region.name} Region - Tanzania Tourism | Xenohuru`,
    description,
    keywords: [
      region.name,
      'Tanzania',
      'region',
      'tourism',
      'travel',
      'attractions',
    ],
    openGraph: {
      title: region.name,
      description,
      url: `${SITE_URL}/regions/${region.slug}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: region.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: region.name,
      description,
      images: [imageUrl],
    },
  };
}

export function generateArticleMetadata(article: Article): Metadata {
  const description = article.excerpt || article.content?.substring(0, 160);
  const imageUrl = article.featured_image || `${SITE_URL}/og-image.png`;

  return {
    title: `${article.title} - Travel Guide | Xenohuru`,
    description,
    keywords: [
      ...article.tags,
      'Tanzania',
      'travel',
      'guide',
      'blog',
    ],
    openGraph: {
      title: article.title,
      description,
      url: `${SITE_URL}/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.published_at,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: [imageUrl],
    },
  };
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Xenohuru - Discover Tanzania',
    template: '%s | Xenohuru',
  },
  description: 'Explore Tanzania\'s incredible attractions, regions, and travel experiences',
  keywords: [
    'Tanzania',
    'tourism',
    'attractions',
    'travel',
    'safari',
    'Kilimanjaro',
    'Serengeti',
    'Zanzibar',
    'travel guide',
  ],
  authors: [{ name: 'Xenohuru' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Xenohuru',
    title: 'Xenohuru - Discover Tanzania',
    description: 'Explore Tanzania\'s incredible attractions, regions, and travel experiences',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Xenohuru - Discover Tanzania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xenohuru - Discover Tanzania',
    description: 'Explore Tanzania\'s incredible attractions, regions, and travel experiences',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

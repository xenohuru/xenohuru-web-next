import { MetadataRoute } from 'next';
import { api } from '@/lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://x.xenohuru.workers.dev';

// Static pages
const staticPages = [
  { url: '', priority: 1.0, changefreq: 'weekly' as const },
  { url: 'attractions', priority: 0.9, changefreq: 'weekly' as const },
  { url: 'regions', priority: 0.9, changefreq: 'weekly' as const },
  { url: 'blog', priority: 0.8, changefreq: 'weekly' as const },
  { url: 'weather', priority: 0.8, changefreq: 'daily' as const },
  { url: 'search', priority: 0.7, changefreq: 'weekly' as const },
  { url: 'operators', priority: 0.7, changefreq: 'monthly' as const },
  { url: 'partners', priority: 0.6, changefreq: 'monthly' as const },
  { url: 'contributors', priority: 0.6, changefreq: 'monthly' as const },
  { url: 'explore', priority: 0.7, changefreq: 'weekly' as const },
  { url: 'map', priority: 0.6, changefreq: 'monthly' as const },
  { url: 'about', priority: 0.6, changefreq: 'monthly' as const },
  { url: 'privacy', priority: 0.5, changefreq: 'yearly' as const },
  { url: 'contact', priority: 0.5, changefreq: 'yearly' as const },
  { url: 'sponsor', priority: 0.4, changefreq: 'monthly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Add static pages
  staticPages.forEach(({ url, priority, changefreq }) => {
    entries.push({
      url: url ? `${SITE_URL}/${url}` : SITE_URL,
      lastModified: new Date(),
      changeFrequency: changefreq,
      priority,
    });
  });

  // Add dynamic attraction pages (gracefully handle API errors)
  try {
    const attractionsResult = await api.attractions.list();
    const attractionsArray = Array.isArray(attractionsResult) ? attractionsResult : [];
    attractionsArray.forEach((attraction) => {
      entries.push({
        url: `${SITE_URL}/attractions/${attraction.slug}`,
        lastModified: new Date(attraction.updated_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error('Skipping attractions for sitemap');
  }

  // Add dynamic region pages (gracefully handle API errors)
  try {
    const regionsResult = await api.regions.list();
    const regionsArray = Array.isArray(regionsResult) ? regionsResult : [];
    regionsArray.forEach((region) => {
      entries.push({
        url: `${SITE_URL}/regions/${region.slug}`,
        lastModified: new Date(region.created_at || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error('Skipping regions for sitemap');
  }

  // Add dynamic blog pages (gracefully handle API errors)
  try {
    const articlesResult = await api.blog.list();
    const articlesArray = Array.isArray(articlesResult) ? articlesResult : [];
    articlesArray.forEach((article) => {
      entries.push({
        url: `${SITE_URL}/blog/${article.slug}`,
        lastModified: new Date(article.updated_at || article.published_at),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  } catch (error) {
    console.error('Skipping articles for sitemap');
  }

  return entries;
}

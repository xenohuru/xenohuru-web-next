import { MetadataRoute } from 'next';
import { api } from '@/lib/api';
import { generateAttractionMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const attraction = await api.attractions.detail(params.slug);
    return generateAttractionMetadata(attraction);
  } catch (error) {
    return {
      title: 'Attraction Details | Xenohuru',
      description: 'Explore this amazing Tanzania attraction',
    };
  }
}

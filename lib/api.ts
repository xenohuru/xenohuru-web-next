// ============================================
// Xenohuru API Client
// ============================================

import type {
  Attraction,
  Region,
  Article,
  Review,
  ReviewSubmission,
  Weather,
  WeatherForecast,
  SeasonalPattern,
  EndemicSpecies,
  Transport,
  Feedback,
  TourOperator,
  Partner,
  Contributor,
  GeoJSONFeatureCollection,
  PaginatedResponse,
  Stats,
  AttractionFilters,
  BlogFilters,
} from './types';

// Hardcoded API URL - use IP address since domain API not responding
const API_BASE = 'http://159.65.119.182:8000';

console.log('🔗 API Configuration:', {
  base: API_BASE,
  production: true,
});

// Generic fetch wrapper with error handling
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  console.log('📡 API Request:', url);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      next: { revalidate: options?.cache === 'no-store' ? 0 : 300 }, // 5 min cache default
    });

    console.log('✅ Response:', response.status, response.statusText);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      console.error('❌ API Error:', error);
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Data received for:', endpoint);
    return data;
  } catch (error) {
    console.error(`🔥 API Error (${endpoint}):`, error);
    throw error;
  }
}

// ============================================
// ATTRACTIONS
// ============================================

export const attractionsAPI = {
  /**
   * Get all attractions with optional filters
   */
  list: async (filters?: AttractionFilters): Promise<Attraction[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.region) params.append('region', filters.region);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.is_free !== undefined) params.append('is_free', String(filters.is_free));
    if (filters?.is_featured !== undefined) params.append('is_featured', String(filters.is_featured));
    if (filters?.page) params.append('page', String(filters.page));

    const query = params.toString();
    return fetchAPI<Attraction[]>(`/api/v1/attractions/${query ? '?' + query : ''}`);
  },

  /**
   * Get attraction detail by slug
   */
  detail: async (slug: string): Promise<Attraction> => {
    return fetchAPI<Attraction>(`/api/v1/attractions/${slug}/`);
  },

  /**
   * Get featured attractions
   */
  featured: async (): Promise<Attraction[]> => {
    return fetchAPI<Attraction[]>('/api/v1/attractions/featured/');
  },

  /**
   * Get attractions by region
   */
  byRegion: async (regionSlug: string): Promise<Attraction[]> => {
    return fetchAPI<Attraction[]>(`/api/v1/attractions/by_region/?region=${regionSlug}`);
  },

  /**
   * Get attractions by category
   */
  byCategory: async (category: string): Promise<Attraction[]> => {
    return fetchAPI<Attraction[]>(`/api/v1/attractions/by_category/?category=${category}`);
  },

  /**
   * Get nearby attractions
   */
  nearby: async (lat: number, lng: number, radius: number = 50): Promise<Attraction[]> => {
    return fetchAPI<Attraction[]>(
      `/api/v1/attractions/nearby/?lat=${lat}&lng=${lng}&radius=${radius}`
    );
  },

  /**
   * Get attraction reviews
   */
  reviews: async (slug: string): Promise<Review[]> => {
    return fetchAPI<Review[]>(`/api/v1/attractions/${slug}/reviews/`);
  },

  /**
   * Submit a review for an attraction
   */
  submitReview: async (slug: string, data: ReviewSubmission): Promise<Review> => {
    return fetchAPI<Review>(`/api/v1/attractions/${slug}/reviews/`, {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-store',
    });
  },

  /**
   * Get current weather for an attraction
   */
  weather: async (lat: number, lng: number): Promise<Weather> => {
    return fetchAPI<Weather>(`/api/v1/weather/current/?lat=${lat}&lng=${lng}`);
  },

  /**
   * Get weather forecast
   */
  forecast: async (lat: number, lng: number): Promise<WeatherForecast[]> => {
    return fetchAPI<WeatherForecast[]>(`/api/v1/weather/forecast/?lat=${lat}&lng=${lng}`);
  },

  /**
   * Get seasonal patterns
   */
  seasonal: async (slug?: string): Promise<SeasonalPattern[]> => {
    const endpoint = slug 
      ? `/api/v1/weather/seasonal/?attraction=${slug}`
      : '/api/v1/weather/seasonal/';
    return fetchAPI<SeasonalPattern[]>(endpoint);
  },

  /**
   * Get endemic species for an attraction
   */
  endemic: async (slug: string): Promise<EndemicSpecies[]> => {
    return fetchAPI<EndemicSpecies[]>(`/api/v1/attractions/${slug}/endemic-species/`);
  },

  /**
   * Get transport facilities
   */
  transport: async (slug: string): Promise<Transport[]> => {
    return fetchAPI<Transport[]>(`/api/v1/attractions/${slug}/transport/`);
  },

  /**
   * Get attraction boundary GeoJSON
   */
  boundary: async (slug: string): Promise<GeoJSONFeatureCollection> => {
    return fetchAPI<GeoJSONFeatureCollection>(`/api/v1/attractions/${slug}/boundary/geojson/`);
  },
};

// ============================================
// REGIONS
// ============================================

export const regionsAPI = {
  /**
   * Get all regions
   */
  list: async (): Promise<Region[]> => {
    return fetchAPI<Region[]>('/api/v1/regions/');
  },

  /**
   * Get region detail by slug
   */
  detail: async (slug: string): Promise<Region> => {
    return fetchAPI<Region>(`/api/v1/regions/${slug}/`);
  },
};

// ============================================
// BLOG
// ============================================

export const blogAPI = {
  /**
   * Get all blog posts with optional filters
   */
  list: async (filters?: BlogFilters): Promise<Article[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.tag) params.append('tag', filters.tag);
    if (filters?.author) params.append('author', filters.author);
    if (filters?.page) params.append('page', String(filters.page));

    const query = params.toString();
    return fetchAPI<Article[]>(`/api/v1/blog/${query ? '?' + query : ''}`);
  },

  /**
   * Get blog post by slug
   */
  detail: async (slug: string): Promise<Article> => {
    return fetchAPI<Article>(`/api/v1/blog/${slug}/`);
  },
};

// ============================================
// TOUR OPERATORS
// ============================================

export const operatorsAPI = {
  /**
   * Get all tour operators
   */
  list: async (): Promise<TourOperator[]> => {
    return fetchAPI<TourOperator[]>('/api/v1/operators/');
  },

  /**
   * Get tour operator by slug
   */
  detail: async (slug: string): Promise<TourOperator> => {
    return fetchAPI<TourOperator>(`/api/v1/operators/${slug}/`);
  },

  /**
   * Get operators by attraction
   */
  byAttraction: async (attractionSlug: string): Promise<TourOperator[]> => {
    return fetchAPI<TourOperator[]>(
      `/api/v1/operators/by_attraction/?attraction=${attractionSlug}`
    );
  },
};

// ============================================
// PARTNERS
// ============================================

export const partnersAPI = {
  /**
   * Get all partners
   */
  list: async (): Promise<Partner[]> => {
    return fetchAPI<Partner[]>('/api/v1/partners/');
  },

  /**
   * Get partner by slug
   */
  detail: async (slug: string): Promise<Partner> => {
    return fetchAPI<Partner>(`/api/v1/partners/${slug}/`);
  },
};

// ============================================
// CONTRIBUTORS
// ============================================

export const contributorsAPI = {
  /**
   * Get all contributors
   */
  list: async (): Promise<Contributor[]> => {
    return fetchAPI<Contributor[]>('/api/v1/contributors/');
  },
};

// ============================================
// FEEDBACK
// ============================================

export const feedbackAPI = {
  /**
   * Submit feedback
   */
  submit: async (data: Feedback): Promise<{ success: boolean; message: string }> => {
    return fetchAPI<{ success: boolean; message: string }>('/api/v1/feedback/submit/', {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-store',
    });
  },
};

// ============================================
// WEATHER
// ============================================

export const weatherAPI = {
  /**
   * Get current weather for coordinates
   */
  current: async (lat: number, lng: number): Promise<any> => {
    return fetchAPI<any>(`/api/v1/weather/current/?lat=${lat}&lng=${lng}`);
  },

  /**
   * Get weather forecast for coordinates
   */
  forecast: async (lat: number, lng: number): Promise<any> => {
    return fetchAPI<any>(`/api/v1/weather/forecast/?lat=${lat}&lng=${lng}`);
  },
};

// ============================================
// STATS
// ============================================

export const statsAPI = {
  /**
   * Get platform stats
   */
  get: async (): Promise<Stats> => {
    const [attractions, regions, contributors] = await Promise.allSettled([
      attractionsAPI.list(),
      regionsAPI.list(),
      contributorsAPI.list(),
    ]);

    return {
      attractionCount:
        attractions.status === 'fulfilled' ? attractions.value.length : 0,
      regionCount: regions.status === 'fulfilled' ? regions.value.length : 0,
      contributorCount:
        contributors.status === 'fulfilled' ? contributors.value.length : 0,
    };
  },
};

// Export all as single API object
export const api = {
  attractions: attractionsAPI,
  regions: regionsAPI,
  blog: blogAPI,
  operators: operatorsAPI,
  partners: partnersAPI,
  contributors: contributorsAPI,
  weather: weatherAPI,
  feedback: feedbackAPI,
  stats: statsAPI,
};

export default api;

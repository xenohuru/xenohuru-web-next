// ============================================
// Xenohuru TypeScript Type Definitions
// ============================================

export interface Attraction {
  id: number;
  slug: string;
  name: string;
  category: string;
  category_display?: string;
  region: Region | number;  // Can be Region object (detail) or number (list)
  region_name?: string;
  region_slug?: string;
  short_description: string;
  description: string;
  difficulty_level: 'easy' | 'moderate' | 'challenging' | 'difficult';
  best_time_to_visit: string;
  estimated_duration: string;
  entrance_fee: string;
  is_free: boolean;
  latitude: number;
  longitude: number;
  featured_image: string | null;
  images?: AttractionImage[];
  tags: string[];
  rating?: number;
  is_featured: boolean;
  nearest_airport?: string;
  tips?: string[];
  citations?: Citation[];
  created_at?: string;
  updated_at?: string;
}

export interface AttractionImage {
  id: number;
  image: string;
  caption?: string;
  is_primary: boolean;
}

export interface Citation {
  id: number;
  source_name: string;
  source_url?: string;
  accessed_date?: string;
}

export interface Region {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  attraction_count?: number;
  latitude?: number;
  longitude?: number;
  created_at?: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  author_name?: string;
  published_at: string;
  featured_image: string;
  tags: string[];
  read_time?: number;
  views?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Review {
  id: number;
  attraction?: number;
  name: string;
  email: string; // Not displayed publicly
  country: string;
  rating: number; // 1-5
  comment: string;
  created_at: string;
  is_verified?: boolean;
}

export interface ReviewSubmission {
  name: string;
  email: string;
  country: string;
  rating: number;
  comment: string;
}

export interface Weather {
  temperature: number;
  feels_like?: number;
  condition: string;
  condition_code?: string;
  icon?: string;
  humidity: number;
  wind_speed?: number;
  pressure?: number;
  visibility?: number;
  description?: string;
  forecast?: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  day: string;
  temperature_max: number;
  temperature_min: number;
  condition: string;
  icon?: string;
  precipitation_chance?: number;
  humidity?: number;
}

export interface SeasonalPattern {
  month: string;
  avg_temperature: number;
  avg_rainfall: number;
  description: string;
}

export interface EndemicSpecies {
  id: number;
  common_name: string;
  scientific_name: string;
  conservation_status: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX'; // IUCN categories
  image: string;
  description?: string;
  habitat?: string;
}

export interface Transport {
  id: number;
  transport_type: 'airport' | 'bus' | 'train' | 'ferry' | 'taxi' | 'car_rental';
  name: string;
  distance_km: number;
  travel_time?: string;
  cost_estimate?: string;
  description?: string;
}

export interface Feedback {
  name: string;
  email: string;
  feedback_type: 'general' | 'bug' | 'suggestion' | 'partnership';
  message: string;
}

export interface TourOperator {
  id: number;
  slug: string;
  name: string;
  description: string;
  logo?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  specialties: string[];
  rating?: number;
  is_verified: boolean;
}

export interface Partner {
  id: number;
  slug: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
  partner_type: 'sponsor' | 'media' | 'tourism_board' | 'conservation' | 'other';
  is_active: boolean;
}

export interface Contributor {
  id: number;
  name: string;
  github_username?: string;
  avatar_url?: string;
  contributions: number;
  role?: string;
}

export interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon' | 'Point' | 'LineString';
    coordinates: number[][] | number[][][] | number[];
  };
  properties: {
    name?: string;
    [key: string]: any;
  };
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface APIError {
  detail: string;
  code?: string;
  field_errors?: Record<string, string[]>;
}

export interface Stats {
  attractionCount: number;
  regionCount: number;
  contributorCount?: number;
  blogCount?: number;
}

// Search and filter types
export interface AttractionFilters {
  search?: string;
  category?: string;
  region?: string;
  difficulty?: string;
  is_free?: boolean;
  is_featured?: boolean;
  page?: number;
}

export interface BlogFilters {
  search?: string;
  tag?: string;
  author?: string;
  page?: number;
}

// Conservation status display names
export const CONSERVATION_STATUS: Record<string, string> = {
  LC: 'Least Concern',
  NT: 'Near Threatened',
  VU: 'Vulnerable',
  EN: 'Endangered',
  CR: 'Critically Endangered',
  EW: 'Extinct in the Wild',
  EX: 'Extinct',
};

// Difficulty level colors
export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'bg-green-500',
  moderate: 'bg-yellow-500',
  challenging: 'bg-orange-500',
  difficult: 'bg-red-500',
};

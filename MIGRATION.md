# Xenohuru Migration: Vanilla JS → Next.js 15

## Overview
This document outlines the refactoring needed to migrate from the vanilla HTML/CSS/JS codebase to the modern Next.js 15 TypeScript application.

---

## Architecture Comparison

### Old Architecture (Vanilla JS)
```
src/
├── index.html
├── attractions.html
├── regions.html
├── blog.html
├── weather.html
├── contact.html
├── js/
│   ├── api.js          # API client with mock fallback
│   ├── mockdata.js     # Mock data for offline
│   ├── home.js         # Page-specific logic
│   ├── attractions.js
│   ├── regions.js
│   └── ...
├── css/
│   └── styles.css
└── sw.js               # Service Worker

worker.js              # Cloudflare Worker for API proxy
```

### New Architecture (Next.js 15)
```
app/
├── page.tsx                    # Home page (/)
├── layout.tsx                  # Root layout
├── attractions/
│   ├── page.tsx               # Listings (/attractions)
│   └── [slug]/page.tsx        # Detail (/attractions/[slug])
├── regions/
│   ├── page.tsx               # Listings (/regions)
│   └── [slug]/page.tsx        # Detail (/regions/[slug])
├── blog/
│   ├── page.tsx               # Listings (/blog)
│   └── [slug]/page.tsx        # Detail (/blog/[slug])
├── map/page.tsx               # Full-page map
└── contact/page.tsx           # Feedback form

components/
├── ui/                        # shadcn/ui components
├── AttractionCard.tsx
├── RegionCard.tsx
├── BlogCard.tsx
├── StarRating.tsx
├── WeatherWidget.tsx
├── MapComponent.tsx
└── ...

lib/
├── types.ts                   # TypeScript interfaces
├── api.ts                     # Typed API client
└── utils.ts                   # Utilities
```

---

## Page-by-Page Migration Guide

### 1. Home Page (`index.html` → `app/page.tsx`)

**Old Implementation:**
- `src/index.html` - Static HTML with sections
- `src/js/home.js` - DOM manipulation, Splide carousel, fetch calls
- Inline `<script>` tags for initialization

**New Implementation:**
```typescript
// app/page.tsx
import { api } from '@/lib/api';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import RegionsPreview from '@/components/RegionsPreview';
import BlogPreview from '@/components/BlogPreview';
import StatsBar from '@/components/StatsBar';

export default async function HomePage() {
  const [featured, regions, blogs, stats] = await Promise.all([
    api.attractions.featured(),
    api.regions.list(),
    api.blog.list(),
    api.stats.get(),
  ]);

  return (
    <main>
      <Hero />
      <FeaturedCarousel attractions={featured} />
      <RegionsPreview regions={regions.slice(0, 6)} />
      <BlogPreview blogs={blogs.slice(0, 3)} />
      <StatsBar stats={stats} />
    </main>
  );
}
```

**Migration Tasks:**
- [ ] Convert hero section to React component
- [ ] Replace Splide vanilla JS with `@splidejs/react-splide`
- [ ] Use Server Components for initial data fetching
- [ ] Remove manual DOM manipulation
- [ ] Use TypeScript interfaces for type safety

---

### 2. Attractions Listing (`attractions.html` → `app/attractions/page.tsx`)

**Old Implementation:**
- `src/attractions.html` - Static grid
- `src/js/attractions.js` - Fetch, filter, search, pagination logic
- Manual DOM updates with `innerHTML`

**New Implementation:**
```typescript
// app/attractions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import AttractionCard from '@/components/AttractionCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';

export default function AttractionsPage() {
  const [filters, setFilters] = useState({});
  const { data: attractions, isLoading } = useQuery({
    queryKey: ['attractions', filters],
    queryFn: () => api.attractions.list(filters),
  });

  return (
    <div>
      <SearchBar onSearch={(q) => setFilters({ ...filters, search: q })} />
      <FilterPanel filters={filters} onChange={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions?.map(a => <AttractionCard key={a.id} attraction={a} />)}
      </div>
    </div>
  );
}
```

**Migration Tasks:**
- [ ] Convert to Client Component (uses `useState`, `useQuery`)
- [ ] Replace vanilla fetch with React Query
- [ ] Create reusable `AttractionCard` component
- [ ] Implement debounced search with `useDebouncedValue` hook
- [ ] Use URL search params for filter state (optional)

---

### 3. Attraction Detail (`attraction.html` → `app/attractions/[slug]/page.tsx`)

**Old Implementation:**
- `src/attraction.html` - Detail template
- `src/js/attraction.js` - Multiple fetch calls, Splide gallery, Leaflet map initialization
- Manual DOM insertion for reviews, endemic species, transport

**New Implementation:**
```typescript
// app/attractions/[slug]/page.tsx
import { api } from '@/lib/api';
import ImageGallery from '@/components/ImageGallery';
import MapComponent from '@/components/MapComponent';
import WeatherWidget from '@/components/WeatherWidget';
import ReviewsSection from '@/components/ReviewsSection';
import EndemicSpecies from '@/components/EndemicSpecies';

export default async function AttractionDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const attraction = await api.attractions.detail(params.slug);
  const [reviews, endemic, transport, boundary] = await Promise.all([
    api.attractions.reviews(params.slug),
    api.attractions.endemic(params.slug),
    api.attractions.transport(params.slug),
    api.attractions.boundary(params.slug),
  ]);

  return (
    <div>
      <ImageGallery images={attraction.images} />
      <h1>{attraction.name}</h1>
      <MapComponent 
        center={[attraction.latitude, attraction.longitude]}
        boundary={boundary}
      />
      <WeatherWidget lat={attraction.latitude} lng={attraction.longitude} />
      <EndemicSpecies species={endemic} />
      <ReviewsSection reviews={reviews} attractionSlug={params.slug} />
    </div>
  );
}
```

**Migration Tasks:**
- [ ] Use dynamic route `[slug]`
- [ ] Server Component for initial data
- [ ] Dynamic import for `MapComponent` (Leaflet requires `window`)
- [ ] Replace Splide vanilla with React Splide
- [ ] Extract reviews form to separate Client Component
- [ ] Handle GeoJSON rendering in MapComponent

---

### 4. Map Page (`map.html` → `app/map/page.tsx`)

**Old Implementation:**
- `src/map.html` - Full-page template
- Inline Leaflet initialization
- Manual marker clustering

**New Implementation:**
```typescript
// app/map/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const Map = dynamic(() => import('@/components/FullPageMap'), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

export default function MapPage() {
  const { data: attractions } = useQuery({
    queryKey: ['attractions'],
    queryFn: () => api.attractions.list(),
  });

  return <Map attractions={attractions || []} />;
}
```

**Migration Tasks:**
- [ ] Use `dynamic` import with `ssr: false` for Leaflet
- [ ] Install `react-leaflet` and `leaflet.markercluster`
- [ ] Create `FullPageMap` component with clustering
- [ ] Add category filter sidebar
- [ ] Implement "Near Me" GPS button

---

### 5. API Layer Refactoring

**Old API (`src/js/api.js`):**
```javascript
// Vanilla JS with fetch
export const api = {
  getAttractions: () => apiFetch('/api/v1/attractions/', () => MOCK_DATA.attractions),
  getAttraction: (slug) => apiFetch(`/api/v1/attractions/${slug}/`, ...),
  // ... with mock fallback
};
```

**New API (`lib/api.ts`):**
```typescript
// Typed API client
export const attractionsAPI = {
  list: async (filters?: AttractionFilters): Promise<Attraction[]> => {
    return fetchAPI<Attraction[]>('/api/v1/attractions/');
  },
  detail: async (slug: string): Promise<Attraction> => {
    return fetchAPI<Attraction>(`/api/v1/attractions/${slug}/`);
  },
};
```

**Migration Tasks:**
- [ ] Remove mock data fallback (Next.js handles errors differently)
- [ ] Add TypeScript types for all responses
- [ ] Use Next.js `fetch` with `revalidate` for caching
- [ ] Error boundaries for error handling instead of fallbacks

---

## Component Migration

### Carousel: Splide Vanilla → React Splide

**Old:**
```javascript
// src/js/home.js
const splide = new Splide('.splide', { type: 'loop', perPage: 3 });
splide.mount();
```

**New:**
```typescript
// components/FeaturedCarousel.tsx
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function FeaturedCarousel({ attractions }) {
  return (
    <Splide options={{ type: 'loop', perPage: 3 }}>
      {attractions.map(a => (
        <SplideSlide key={a.id}>
          <AttractionCard attraction={a} />
        </SplideSlide>
      ))}
    </Splide>
  );
}
```

---

### Map: Leaflet Vanilla → react-leaflet

**Old:**
```javascript
// src/js/attraction.js
const map = L.map('map').setView([lat, lng], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([lat, lng]).addTo(map);
```

**New:**
```typescript
// components/MapComponent.tsx
'use client';

import { MapContainer, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent({ center, boundary }) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center} />
      {boundary && <GeoJSON data={boundary} />}
    </MapContainer>
  );
}
```

---

## Styling Migration

**Old:**
```html
<!-- src/index.html -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display..." />
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<style type="text/tailwindcss">
  @theme {
    --color-tz-forest: #1A4731;
    --color-tz-savanna: #C8903A;
  }
</style>
```

**New:**
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'tz-forest': '#1A4731',
        'tz-savanna': '#C8903A',
        'tz-sky': '#1E6FA8',
        'tz-sand': '#F5E6C8',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
};
```

---

## Data Fetching Patterns

| Pattern | Old (Vanilla) | New (Next.js) |
|---------|---------------|---------------|
| **Static data** | `fetch()` on page load | Server Components (SSG) |
| **Dynamic data** | `fetch()` with loading states | `useQuery` (React Query) |
| **Mutations** | `fetch()` POST with manual error handling | `useMutation` + toast |
| **Caching** | Manual localStorage | React Query cache + Next.js `revalidate` |
| **Loading** | Manual spinners | `<Suspense>` + `loading.tsx` |
| **Errors** | Try/catch + manual UI | Error boundaries + `error.tsx` |

---

## Environment Variables

**Old:**
```javascript
// src/js/api.js
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:8002'
  : '';
```

**New:**
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://159.65.119.182:8000
```

```typescript
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
```

---

## Deployment Changes

### Old: Cloudflare Workers
```javascript
// worker.js
export default {
  async fetch(request, env) {
    // Proxy /api/* to backend
    // Serve static assets
  }
};
```

### New: Cloudflare Pages
```bash
# Build for static export
npm run build

# Deploys to Cloudflare Pages
# _headers and _redirects handle API proxy
```

**Note:** API proxy needs to be configured in Cloudflare Pages settings or via `_headers` file.

---

## Testing Strategy

**Old:** No tests (manual testing only)

**New:** 
- [ ] Add Playwright for E2E tests
- [ ] Add Vitest for component tests
- [ ] Add TypeScript for compile-time checks

---

## Progressive Enhancement Checklist

- [x] Core functionality works without JS (Server Components)
- [ ] Forms work with JS disabled (use Server Actions)
- [ ] Images have proper `alt` text
- [ ] Semantic HTML throughout
- [ ] ARIA labels for accessibility
- [ ] Meta tags for SEO

---

## Performance Improvements

| Feature | Old | New | Benefit |
|---------|-----|-----|---------|
| **Code splitting** | Single bundle | Automatic per-route | Faster initial load |
| **Image optimization** | Manual Cloudinary | `next/image` wrapper | Lazy loading, WebP |
| **Fonts** | CDN | `next/font` | No layout shift |
| **Caching** | None | React Query + ISR | Faster navigation |
| **Bundle size** | ~500KB | ~200KB (initial) | 60% reduction |

---

## Migration Priority

### Phase 1: Foundation ✅
- [x] Initialize Next.js 15 project
- [x] Install dependencies
- [x] Create TypeScript types
- [x] Build API client layer
- [x] Configure deployment

### Phase 2: Core Pages
- [ ] Home page with carousel
- [ ] Attractions listing + detail
- [ ] Regions listing + detail

### Phase 3: Advanced Features
- [ ] Full-page map with clustering
- [ ] Weather widget with charts
- [ ] Reviews system
- [ ] Contact form

### Phase 4: Polish
- [ ] Loading states
- [ ] Error boundaries
- [ ] Accessibility audit
- [ ] Performance optimization

---

## Key Differences Summary

| Aspect | Vanilla JS | Next.js 15 |
|--------|------------|------------|
| **Routing** | Static HTML files | File-based App Router |
| **State** | Manual DOM updates | React state + React Query |
| **Styling** | CDN Tailwind | Compiled Tailwind |
| **Data** | Client-side fetch | Server Components + React Query |
| **Types** | JSDoc comments | TypeScript |
| **Build** | None (static files) | `next build` (static export) |
| **Dev Server** | Any HTTP server | `next dev` with HMR |

---

## Breaking Changes to Note

1. **No more `window` in Server Components** → Use Client Components for browser APIs
2. **No direct DOM access** → Use React refs
3. **Async Server Components** → Can directly `await` data
4. **CSS-in-JS removed** → Use Tailwind only
5. **Service Worker** → Not included in this migration (add PWA separately if needed)

---

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [React Query Docs](https://tanstack.com/query/latest)
- [react-leaflet Docs](https://react-leaflet.js.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)

---

**Last Updated:** 2026-03-20

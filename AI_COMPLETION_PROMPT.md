# Complete Xenohuru Next.js Platform - Remaining Features

## Context
This is a **continuation project**. A Tanzania tourism platform called Xenohuru is being rebuilt from vanilla HTML/CSS/JS to Next.js 15 TypeScript. The foundation is complete, but several key features remain.

**Live Reference Sites:**
- **Current Next.js Build**: `/home/cleven/Public/xenohuru-web-nextjs/`
- **Original Vanilla Site** (for reference): https://x.xenohuru.workers.dev/
- **API Backend**: http://159.65.119.182:8000

---

## ✅ Already Implemented (DO NOT REBUILD)

### Core Infrastructure
- ✅ Next.js 15 project setup with TypeScript
- ✅ Tailwind CSS + custom Tanzania theme
- ✅ React Query for data fetching
- ✅ Complete API client (`lib/api.ts`) with all endpoints
- ✅ TypeScript interfaces (`lib/types.ts`) for all data models
- ✅ Providers setup (React Query + AOS)

### Components Already Built
- ✅ Navbar with glassmorphism scroll effect
- ✅ Footer with links and social
- ✅ AttractionCard (image, badges, difficulty, rating)
- ✅ RegionCard (image overlay)
- ✅ BlogCard (meta info)
- ✅ StarRating (display + interactive modes)
- ✅ SearchBar (debounced 300ms)
- ✅ LoadingSkeleton (multiple variants)
- ✅ BackToTop button (appears after 400px scroll)

### Pages Already Complete
- ✅ **Home** (`/`) - Hero, rotating Swahili quotes, animated stats, featured grid, distance reference
- ✅ **Attractions Listing** (`/attractions`) - Search, filters (category/difficulty/free), grid
- ✅ **Regions Listing** (`/regions`) - Grid of all 31 Tanzania regions
- ✅ **Blog Listing** (`/blog`) - Search, grid, pagination
- ✅ **Contact** (`/contact`) - Feedback form with toast notifications

### Features Already Working
- ✅ Glassmorphism navbar (transparent → white on scroll)
- ✅ Rotating Swahili quotes (8 phrases, 5s interval)
- ✅ Animated stat counters (count from 0 to target)
- ✅ Hero gradient animation (12s loop)
- ✅ Grain texture overlay
- ✅ Mobile drawer with overlay
- ✅ Active link highlighting
- ✅ PWA manifest.json
- ✅ Scroll-to-top button
- ✅ AOS library installed and configured

---

## 🎯 YOUR MISSION: Complete These Remaining Features

### Priority 1: Detail Pages (CRITICAL)

#### 1. **Attraction Detail Page** (`app/attractions/[slug]/page.tsx`)

**API Endpoints to Use:**
- `GET /api/v1/attractions/{slug}/` - Main attraction data
- `GET /api/v1/attractions/{slug}/reviews/` - Reviews list
- `POST /api/v1/attractions/{slug}/reviews/` - Submit review
- `GET /api/v1/attractions/{slug}/endemic-species/` - Endemic wildlife
- `GET /api/v1/attractions/{slug}/transport/` - Transport facilities
- `GET /api/v1/attractions/{slug}/boundary/geojson/` - GeoJSON boundary
- `GET /api/v1/weather/current/?latitude={lat}&longitude={lng}` - Weather data
- `GET /api/v1/attractions/nearby/?latitude={lat}&longitude={lng}` - Nearby attractions

**Must Include:**
- ✨ **Image Gallery** - Use `@splidejs/react-splide` carousel (loop, thumbnails, zoom)
- 🗺️ **Interactive Map** - Use `react-leaflet` with GeoJSON boundary layer (dynamic import, `ssr: false`)
- 🌤️ **Weather Widget** - Current conditions + 7-day forecast using `recharts`
- 🦁 **Endemic Species Cards** - Grid with conservation status badges
- 🚗 **Transport Table** - Distance from airports, cities
- 📝 **Reviews Section** - List + ReviewForm (name, email, country, star rating, comment)
- 🔗 **Nearby Attractions** - Horizontal scroll cards
- 🏷️ **Info Grid** - Duration, best time, entrance fee, difficulty
- 💡 **Tips Accordion** - Collapsible sections
- 📚 **Citations** - Sources collapsible
- 🔄 **Share Button** - Web Share API

**Design Requirements:**
- Dark theme (#0a0a0a background)
- Tanzania colors: Green (#1a4731), Gold (#c8903a), Blue (#1e6fa8)
- Responsive: 1 column mobile, 2 column tablet, 3 column desktop
- Loading skeletons while data fetches
- Error states with retry buttons

---

#### 2. **Region Detail Page** (`app/regions/[slug]/page.tsx`)

**API Endpoints:**
- `GET /api/v1/regions/{slug}/` - Region data
- `GET /api/v1/attractions/by_region/?region={slug}` - Attractions in region

**Must Include:**
- Hero section with region image
- Region description
- Stats (attraction count)
- Grid of attractions in region (reuse AttractionCard)
- Filter by category
- Map showing all attractions in region

---

#### 3. **Blog Detail Page** (`app/blog/[slug]/page.tsx`)

**API Endpoints:**
- `GET /api/v1/blog/{slug}/` - Article data

**Must Include:**
- Featured image (full width)
- Title, author, published date
- Read time estimate
- Full article content (Markdown or HTML)
- Tags
- Share button (Web Share API)
- Related articles (optional)

---

### Priority 2: Interactive Map Page

#### 4. **Full-Screen Map** (`app/map/page.tsx`)

**API Endpoints:**
- `GET /api/v1/attractions/` - All attractions with coordinates

**Must Include:**
- ✨ Full-screen Leaflet map (use `react-leaflet`)
- 📍 Clustered markers for attractions (use `react-leaflet-cluster`)
- 🔍 Click marker → popup with:
  - Attraction image
  - Name
  - Category badge
  - "View Details" link
- 🎛️ **Category Filter Sidebar** - Chips to filter by category
- 📍 **"Near Me" Button** - Use Geolocation API
- 🗺️ Use OpenStreetMap tiles
- 💾 Dynamic import with `ssr: false`

**Example:**
```tsx
const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});
```

---

### Priority 3: Enhanced Animations & UX

#### 5. **Splide Carousel for Featured Attractions** (Update `app/page.tsx`)

**Current State:** Featured attractions are in a plain grid  
**Required:** Replace with Splide carousel

**Features:**
- Loop mode
- 3 slides per page (desktop), 2 (tablet), 1 (mobile)
- Autoplay with pause on hover
- Navigation arrows
- Pagination dots
- Slide transition: 400ms ease

**Example:**
```tsx
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

<Splide
  options={{
    perPage: 3,
    perMove: 1,
    gap: '1.5rem',
    pagination: true,
    autoplay: true,
    pauseOnHover: true,
    breakpoints: {
      1024: { perPage: 2 },
      640: { perPage: 1 },
    },
  }}
>
  {featured.map((attraction) => (
    <SplideSlide key={attraction.id}>
      <AttractionCard attraction={attraction} />
    </SplideSlide>
  ))}
</Splide>
```

---

#### 6. **Add AOS Scroll Animations** (Multiple pages)

AOS is already installed. Add `data-aos` attributes to sections:

**Animations to Add:**
- Stats bar: `data-aos="fade-up"`
- Featured section heading: `data-aos="fade-down"`
- Attraction cards: `data-aos="fade-up" data-aos-delay="100"` (stagger)
- Region cards: `data-aos="zoom-in"`
- Blog cards: `data-aos="fade-left"`
- Distance reference cards: `data-aos="flip-left"`

**Example:**
```tsx
<section data-aos="fade-up" className="py-20">
  {/* Content */}
</section>
```

---

#### 7. **Card Hover Effects** (All card components)

Add hover scale and shadow transitions:

```tsx
className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
```

Apply to:
- AttractionCard
- RegionCard
- BlogCard

---

#### 8. **Preloader Component** (`components/Preloader.tsx`)

Create a Tanzania-themed loading spinner that shows on initial page load:

**Design:**
- Circular spinner with Tanzania flag colors
- Green (#1a4731) → Gold (#c8903a) → Blue (#1e6fa8) gradient
- Fades out after page load
- 3 second timeout fallback

**Implementation:**
```tsx
'use client';

import { useEffect, useState } from 'react';

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-[#1a4731] border-t-[#c8903a] rounded-full animate-spin" />
    </div>
  );
}
```

Add to `app/layout.tsx`:
```tsx
import { Preloader } from '@/components/Preloader';

// Inside <body>:
<Preloader />
```

---

### Priority 4: Missing Components

#### 9. **WeatherWidget Component** (`components/WeatherWidget.tsx`)

**API Data:**
```typescript
interface Weather {
  temperature: number;
  condition: string;
  humidity: number;
  forecast: Array<{
    date: string;
    temp_high: number;
    temp_low: number;
    condition: string;
  }>;
}
```

**Must Include:**
- Current temperature (large display)
- Condition icon (sunny/cloudy/rainy)
- Humidity percentage
- 7-day forecast bar chart using `recharts`

**Example:**
```tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function WeatherWidget({ weather }: { weather: Weather }) {
  return (
    <div className="bg-[#111827] rounded-2xl p-6">
      <div className="text-6xl font-bold">{weather.temperature}°C</div>
      <div className="text-gray-400">{weather.condition}</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weather.forecast}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="temp_high" fill="#c8903a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

#### 10. **MapComponent** (`components/MapComponent.tsx`)

Reusable Leaflet map wrapper:

```tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapComponentProps {
  center: [number, number];
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; name: string }>;
  boundary?: GeoJSON.FeatureCollection;
}

export function MapComponent({ center, zoom = 13, markers, boundary }: MapComponentProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-[400px] rounded-2xl"
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {markers?.map((marker, i) => (
        <Marker key={i} position={[marker.lat, marker.lng]}>
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
      {boundary && <GeoJSON data={boundary} style={{ color: '#c8903a', weight: 2 }} />}
    </MapContainer>
  );
}
```

**Import in pages:**
```tsx
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-800 rounded-2xl animate-pulse" />
});
```

---

#### 11. **ReviewForm Component** (`components/ReviewForm.tsx`)

**Fields:**
- Name (text, required)
- Email (email, required, not displayed publicly)
- Country (text, required)
- Rating (1-5 stars, required)
- Comment (textarea, required)

**Submit to:** `POST /api/v1/attractions/{slug}/reviews/`

**Response:** Success toast → reset form

---

### Priority 5: PWA Completion

#### 12. **Service Worker** (`public/sw.js`)

Implement offline caching:

**Strategy:**
- Cache-first for static assets (CSS, JS, images)
- Network-first for API calls
- Offline fallback page

**Reference:** `/home/cleven/Public/xenohuru-web/src/sw.js` (original site)

---

#### 13. **PWA Icons** (`public/icon-*.png`)

Create actual PNG icons:
- `icon-192.png` - 192x192 pixels
- `icon-512.png` - 512x512 pixels

**Design:**
- Tanzania flag colors
- "TZ" text or compass icon
- Transparent or green background

---

### Priority 6: Final Polish

#### 14. **Parallax Hero Effect** (`app/page.tsx`)

Add subtle parallax scroll to hero section:

```tsx
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Apply transform
<div style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
  {/* Hero content */}
</div>
```

---

#### 15. **Image Lazy Loading**

Ensure all images use:
```tsx
<img loading="lazy" alt="..." />
```

Add placeholder on error:
```tsx
onError={(e) => {
  e.currentTarget.src = '/placeholder.svg';
}}
```

---

## 🎨 Design System (MUST FOLLOW)

### Colors
```css
--forest-green: #1a4731;    /* Primary brand */
--savanna-gold: #c8903a;    /* CTA buttons, accents */
--sky-blue: #1e6fa8;        /* Secondary */
--sand: #f5e6c8;            /* Light accent */
--earth: #8b5e3c;           /* Brown accents */
--dark: #111827;            /* Cards/panels */
--background: #0a0a0a;      /* Page background */
--foreground: #fafaf8;      /* Text */
```

### Typography
- **Display**: Playfair Display (headings)
- **Body**: DM Sans (content)
- **Mono**: Space Mono (stats, code)

### Spacing
- Section padding: `py-20` (desktop), `py-12` (mobile)
- Card gap: `gap-6`
- Max width: `max-w-7xl mx-auto`

---

## 🔧 Technical Requirements

### Next.js Configuration (`next.config.ts`)
```typescript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
```

### Environment Variables (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://159.65.119.182:8000
```

### No Authentication
- All pages are public
- Review submission is open (name, email, country only)
- No login/register anywhere

---

## 📦 Dependencies Already Installed

```json
{
  "@tanstack/react-query": "^5.91.3",
  "@splidejs/react-splide": "^0.7.12",
  "leaflet": "^1.9.4",
  "react-leaflet": "^5.0.0",
  "recharts": "^3.8.0",
  "react-hot-toast": "^2.6.0",
  "lucide-react": "^0.577.0",
  "aos": "^2.3.4"
}
```

**If needed:**
```bash
npm install react-leaflet-cluster
npm install @types/leaflet
```

---

## 🧪 Testing Checklist

After completing features, verify:

### Functionality
- [ ] All detail pages load correctly
- [ ] Image carousels work (Splide)
- [ ] Maps render (Leaflet)
- [ ] Weather widget displays forecast
- [ ] Review form submits successfully
- [ ] Search and filters work
- [ ] Navigation works across all pages

### Performance
- [ ] Page load < 3 seconds
- [ ] Images lazy load
- [ ] No console errors
- [ ] Smooth animations (60fps)

### Responsive
- [ ] Mobile (320px - 640px)
- [ ] Tablet (641px - 1024px)
- [ ] Desktop (1025px+)

### PWA
- [ ] Manifest loads
- [ ] Icons display
- [ ] Installable on mobile
- [ ] Offline fallback works (if service worker implemented)

---

## 📁 File Structure

```
xenohuru-web-nextjs/
├── app/
│   ├── page.tsx                    [✅ DONE - enhance with Splide]
│   ├── attractions/
│   │   ├── page.tsx                [✅ DONE]
│   │   └── [slug]/page.tsx         [❌ BUILD THIS]
│   ├── regions/
│   │   ├── page.tsx                [✅ DONE]
│   │   └── [slug]/page.tsx         [❌ BUILD THIS]
│   ├── blog/
│   │   ├── page.tsx                [✅ DONE]
│   │   └── [slug]/page.tsx         [❌ BUILD THIS]
│   ├── map/page.tsx                [❌ BUILD THIS]
│   └── contact/page.tsx            [✅ DONE]
├── components/
│   ├── AttractionCard.tsx          [✅ DONE - add hover effect]
│   ├── RegionCard.tsx              [✅ DONE - add hover effect]
│   ├── BlogCard.tsx                [✅ DONE - add hover effect]
│   ├── Navbar.tsx                  [✅ DONE]
│   ├── Footer.tsx                  [✅ DONE]
│   ├── BackToTop.tsx               [✅ DONE]
│   ├── WeatherWidget.tsx           [❌ BUILD THIS]
│   ├── MapComponent.tsx            [❌ BUILD THIS]
│   ├── ReviewForm.tsx              [❌ BUILD THIS]
│   ├── Preloader.tsx               [❌ BUILD THIS]
│   └── ...
├── lib/
│   ├── api.ts                      [✅ DONE]
│   └── types.ts                    [✅ DONE]
└── public/
    ├── manifest.json               [✅ DONE]
    ├── sw.js                       [❌ BUILD THIS]
    ├── icon-192.png                [❌ CREATE THIS]
    └── icon-512.png                [❌ CREATE THIS]
```

---

## 🚀 Deployment

When complete, build and deploy:

```bash
# Build static export
npm run build

# Deploy to Cloudflare Pages
# Output is in /out directory
```

---

## ⚠️ Common Pitfalls to Avoid

1. **Leaflet SSR Error** - Always use `dynamic(() => import(...), { ssr: false })`
2. **Image URLs** - API returns Cloudinary URLs, use them as-is
3. **CORS** - API allows cross-origin requests
4. **GeoJSON** - Check if boundary exists before rendering
5. **Review Form** - Email is required but NOT displayed publicly
6. **Static Export** - No server-side features (API routes, etc.)

---

## 📚 Reference Files

**Original Vanilla Site Code:**
- `/home/cleven/Public/xenohuru-web/src/index.html`
- `/home/cleven/Public/xenohuru-web/src/css/styles.css`
- `/home/cleven/Public/xenohuru-web/src/js/home.js`
- `/home/cleven/Public/xenohuru-web/src/js/attraction.js`

**Current Next.js Build:**
- `/home/cleven/Public/xenohuru-web-nextjs/`
- `OLD_SITE_FEATURES.md` - Feature checklist
- `FEATURES_IMPLEMENTED.md` - What's already done

---

## 🎯 Success Criteria

The project is complete when:

1. ✅ All 3 detail pages work (attraction, region, blog)
2. ✅ Map page with clustering and filters
3. ✅ Splide carousel on homepage
4. ✅ AOS animations on all sections
5. ✅ Weather widget displays data
6. ✅ Review form submits successfully
7. ✅ All cards have hover effects
8. ✅ PWA manifest works
9. ✅ No console errors
10. ✅ Mobile responsive (all pages)

---

## 💬 Questions?

If anything is unclear:
1. Check `FEATURES_IMPLEMENTED.md` for what's done
2. Reference original site: https://x.xenohuru.workers.dev/
3. Check API docs: http://159.65.119.182:8000/api/v1/
4. Look at existing code in `/home/cleven/Public/xenohuru-web-nextjs/`

---

**Good luck! Build something amazing for Tanzania! 🇹🇿✨**

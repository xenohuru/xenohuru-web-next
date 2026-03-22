# Xenohuru Frontend Development Guide

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Python 3.8+ (for API server)
- PostgreSQL (for API database)

### Setup

#### 1. Frontend Server
```bash
cd /home/cleven/Public/xenohuru-web-nextjs
npm install  # if first time
npm run dev  # starts on http://localhost:3000
```

#### 2. API Server  
```bash
cd /home/cleven/Private/cleven-github/xenohuru-api
source venv/bin/activate
python manage.py runserver  # starts on http://127.0.0.1:8000
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### API (.env)
Located at: `/home/cleven/Private/cleven-github/xenohuru-api/.env`

Key configs:
- `DEBUG=0` - Production mode
- `ALLOWED_HOSTS=localhost,127.0.0.1,...`
- `CORS_ALLOW_ALL_ORIGINS=True` - Allow frontend requests
- `DB_*` - PostgreSQL connection details

## Available Pages (21 total)

### Public Pages
- `/` - Homepage with featured attractions
- `/attractions` - Browse all attractions
- `/regions` - Explore regions
- `/blog` - Travel guides & articles
- `/weather` - Weather forecasts
- `/search` - Global search with filters
- `/explore` - Media gallery

### Directory Pages
- `/operators` - Tour operators
- `/partners` - Tourism partners
- `/contributors` - GitHub & team contributors

### Info Pages
- `/about` - About Xenohuru
- `/privacy` - Privacy & data disclaimers
- `/contact` - Contact form
- `/sponsor` - Sponsorship info

### Dynamic Detail Pages
- `/attractions/[slug]` - Attraction details
- `/regions/[slug]` - Region details
- `/blog/[slug]` - Article details

### Resource Pages
- `/map` - Interactive map
- `/sitemap.xml` - XML sitemap (SEO)
- `/robots.txt` - Robots directives

## API Endpoints (Used)

### Attractions
- `GET /api/v1/attractions/` - List all
- `GET /api/v1/attractions/{slug}/` - Detail
- `GET /api/v1/attractions/{slug}/reviews/` - Reviews
- `GET /api/v1/attractions/{slug}/weather/` - Weather
- `GET /api/v1/attractions/{slug}/transport/` - Transport
- `GET /api/v1/attractions/{slug}/endemic-species/` - Flora/Fauna
- `GET /api/v1/attractions/nearby/` - Nearby attractions
- `GET /api/v1/attractions/{slug}/boundary/geojson/` - GeoJSON boundary

### Regions
- `GET /api/v1/regions/` - List all
- `GET /api/v1/regions/{slug}/` - Detail

### Weather
- `GET /api/v1/weather/current/` - Current weather (lat/lng)
- `GET /api/v1/weather/forecast/` - 5-day forecast

### Blog
- `GET /api/v1/blog/` - List articles
- `GET /api/v1/blog/{slug}/` - Article detail

### Other
- `GET /api/v1/partners/` - Partners list
- `GET /api/v1/operators/` - Tour operators
- `GET /api/v1/stats/` - Site statistics

## Key Components

### Cards
- `AttractionCard` - Attraction preview
- `RegionCard` - Region preview
- `BlogCard` - Article preview
- `WeatherCard` - Current weather display
- `ReviewCard` - User review
- `WeatherForecastCard` - 5-day forecast
- `TransportCard` - Transport option
- `CitationCard` - Source citation
- `CreatorCard` - Creator profile

### Sections
- `ReviewsSection` - Aggregate reviews
- `TransportSection` - Transport options
- `CitationsSection` - Sources & references
- `RelatedContent` - Nearby attractions

### Utilities
- `EmptyState` - Empty data state UI
- `ErrorBoundary` - Error catching
- `RetryButton` - Manual retry trigger
- `OptimizedImage` - Image optimization
- `LoadingSkeleton` - Loading state

## Hooks

### Data Fetching
- `useWithRetry` - Auto-retry with backoff
- `useStructuredData` - JSON-LD injection

### React Query
- Automatic caching
- Deduplication
- Stale-while-revalidate
- Error handling

## Building for Production

```bash
npm run build   # Creates optimized build
npm run start   # Serves production build
```

## Testing

### Homepage
```bash
curl http://localhost:3000
```

### Attractions API
```bash
curl http://127.0.0.1:8000/api/v1/attractions/
```

### Specific Attraction
```bash
curl http://127.0.0.1:8000/api/v1/attractions/mount-kilimanjaro-uhuru-peak/
```

## Troubleshooting

### Port Already in Use
- Frontend tries port 3000, falls back to 3001
- Check: `ss -tlnp | grep 3000`
- Kill process: Check process ID and use kill command

### API Connection Failed
- Ensure Django server running: `python manage.py runserver`
- Check `.env.local` API_URL
- Verify CORS settings in Django

### Build Errors
- Clear cache: `rm -rf .next node_modules && npm install`
- Check Node version: `node --version` (need 18+)
- Update dependencies: `npm update`

### TypeScript Errors
- Verify types are up to date: `npm run type-check`
- Check API types match responses

## Performance Tips

1. **Image Optimization**
   - Using SVG placeholders (400x300, 1200x500)
   - Next.js Image component with blur

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Lazy loading with suspense

3. **Caching**
   - React Query caching
   - Browser cache headers

4. **Bundle Size**
   - 101 kB shared JS (gzipped)
   - Per-page: 3-8 kB typical

## SEO & Meta

- Dynamic meta tags for each page
- JSON-LD structured data
- Sitemap generation
- Robots.txt configuration
- Open Graph + Twitter cards

## Deployment

- Static export compatible
- Cloudflare Pages ready
- Environment-based configuration
- CORS-enabled for cross-origin requests

## Git Workflow

```bash
# Feature branch
git checkout -b feature/name

# Commit with co-author
git commit -m "Message

Co-authored-by: Paul <paulinewangu@proton.me>"

# Push and create PR
git push origin feature/name
```

## Resources

- **Frontend**: Next.js 15.2, TypeScript, Tailwind CSS
- **API**: Django REST Framework, PostgreSQL
- **UI**: Lucide icons, AOS animations, Splide carousel
- **Data**: React Query, Axios
- **Maps**: Leaflet
- **Forms**: React Hook Form

---

**Last Updated**: 2026-03-22  
**Status**: Production Ready ✅

# Testing Guide

## Local Setup Complete ✓

**API Server:** http://127.0.0.1:8000  
**Next.js Dev:** http://localhost:3000  
**Environment:** Updated to use local API

## What Changed

### 1. API Configuration
- Updated `.env.local` to use `http://127.0.0.1:8000`
- Server will now fetch from your local Django API

### 2. Image Loading Improvements
All card components now have:
- **Placeholder images** with Tanzania branding when no image exists
- **Loading states** with animated skeleton
- **Error handling** - shows placeholder on image load failure
- **Smooth transitions** - fade in when loaded

Components updated:
- `AttractionCard` - Shows "Xenohuru" placeholder in brand colors
- `RegionCard` - Same placeholder system
- `BlogCard` - Same placeholder system

### 3. Image Behavior
```typescript
// Placeholder SVG (Tanzania green background, gold text)
const PLACEHOLDER = 'data:image/svg+xml,...Xenohuru...'

// States:
- Loading: Animated pulse + "Loading..." text
- Success: Smooth fade-in with hover effects
- Error: Fallback to placeholder
```

## Testing Checklist

### API Connection
- [ ] Check API is running: `curl http://127.0.0.1:8000/api/v1/attractions/`
- [ ] Verify attractions have data
- [ ] Check if images have URLs (featured_image field)

### Frontend Pages
- [ ] Home page loads http://localhost:3000
- [ ] Attractions page shows cards with placeholders
- [ ] Click attraction → detail page loads
- [ ] Images fade in smoothly when available
- [ ] Placeholders show when no image

### Image Loading
1. **With images** - Should fade in smoothly after load
2. **Without images** - Should show green/gold Xenohuru placeholder
3. **Broken URLs** - Should fallback to placeholder

## Pagination Notes

The API returns a simple array, not a paginated envelope:
```json
[
  {"id": 1, "name": "Mount Kilimanjaro", ...},
  {"id": 2, "name": "Serengeti", ...}
]
```

If you need pagination later, check if the API has:
- `?page=2` query parameter support
- `count`, `next`, `previous` fields in response

## Next Steps

1. **Test all pages** - Home, Attractions, Regions, Blog, Map, Contact
2. **Check image loading** - Verify placeholders work
3. **Verify API data** - Make sure local Django returns proper data
4. **Test forms** - Contact form, review submission

## Troubleshooting

**Issue:** Images not loading  
**Fix:** Check `featured_image` field in API response

**Issue:** "Failed to fetch" errors  
**Fix:** Ensure Django dev server is running on port 8000

**Issue:** CORS errors  
**Fix:** Add CORS headers in Django settings:
```python
CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]
```

**Issue:** Slow loading  
**Fix:** Normal - first load fetches all data. React Query caches after.

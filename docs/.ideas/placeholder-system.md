# Image Placeholder System

## Overview
Xenohuru uses an elegant SVG-based placeholder system for missing images. This is based on proven patterns from the original Xenohuru platform and provides a professional, branded fallback experience.

## Design Philosophy
- **Tanzanian Colors**: Green (#1a4731) and gold (#e8a045) gradients
- **Topographic Pattern**: Grid/tile overlay suggesting map/navigation theme
- **Camera Icon**: Visual metaphor for image/photography
- **Accessibility**: Full SVG, no external dependencies

## Usage

### In Components
```typescript
import { PLACEHOLDER_SMALL_DATA_URI, PLACEHOLDER_HERO_DATA_URI } from '@/lib/placeholders';

// For card images (400x300)
<Image src={imageSrc || PLACEHOLDER_SMALL_DATA_URI} />

// For hero sections (1200x500)
<Image src={imageSrc || PLACEHOLDER_HERO_DATA_URI} />
```

### Getting Data URIs
```typescript
import { getPlaceholderDataUri } from '@/lib/placeholders';

// Small placeholder
const small = getPlaceholderDataUri('small', 'Optional Label');

// Hero placeholder
const hero = getPlaceholderDataUri('hero', 'Optional Label');
```

## Components Using Placeholders
- **AttractionCard.tsx** - Card images
- **RegionCard.tsx** - Region images
- **BlogCard.tsx** - Blog post images
- Attraction detail page (hero images, gallery fallback)
- Region detail page (hero images)
- Blog detail page (featured images)

## Variants

### Small (400x300)
Used for card images throughout the site
- Grid pattern overlay
- Camera icon
- Gradient: Green to gold

### Hero (1200x500)
Used for page headers and hero sections
- Topographic pattern
- Larger scale camera icon
- Green gradient (darker)

## Adding Labels
Both placeholders support optional labels:
```typescript
getPlaceholderDataUri('small', 'Coming Soon')
```
Label appears above "Image not available" text

## Future Improvements
- [ ] Add loading skeleton variants
- [ ] Generate placeholder variants for different aspect ratios
- [ ] Create animation variants (pulsing, fade-in)
- [ ] Add theme color customization

## Color Reference
- Primary Green: `#1a4731`
- Gold/Accent: `#e8a045`
- Muted Earth: `#8B5E3C`
- Light Tan: `#F5E6C8`
- Grid Color: `#D6C4A0`

## Performance
- Pure SVG data URIs (no external requests)
- ~2.5KB per SVG unencoded
- Compressed in production (GZIP ~800 bytes)
- No layout shift (fixed dimensions)
- Instant rendering (no lazy load needed)

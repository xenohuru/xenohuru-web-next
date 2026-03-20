# 🎯 Old Site Features to Implement

## ✅ Features from Original Xenohuru Web

### 1. **Animations & Effects**
- [x] Page entrance fade-in animation
- [ ] AOS (Animate On Scroll) for all sections
- [ ] Navbar glassmorphism on scroll
- [ ] Hero gradient animation (12s loop)
- [ ] Hero grain texture overlay
- [ ] Parallax effect on hero
- [ ] Hover scale on cards (1.05x zoom)
- [ ] Active nav link underline animation
- [ ] Counter animation on stats
- [ ] Mobile drawer slide-in animation

### 2. **Navbar Features**
- [ ] Glassmorphism backdrop blur on scroll
- [ ] Color changes on scroll (transparent → white)
- [ ] Active link highlighting with underline
- [ ] Time display (EAT timezone)
- [ ] Language switcher (EN/SW)
- [ ] Mobile drawer with overlay
- [ ] Close on Escape key

### 3. **Hero Section**
- [ ] Rotating Swahili quotes (changes every 5s)
- [ ] Gradient animation background
- [ ] Grain texture overlay
- [ ] Scroll indicator with bounce
- [ ] Two CTA buttons with icons
- [ ] Eyebrow text ("Discover Tanzania")

### 4. **Stats Bar**
- [ ] Animated counter (0 → final number)
- [ ] Live API data (attractions/regions count)
- [ ] 4 stats: Attractions, Regions, Kilimanjaro Peak, Year-Round
- [ ] Pattern overlay background

### 5. **Swahili Features**
- [ ] Rotating quotes banner
- [ ] Multiple Swahili phrases with translations
- [ ] Changes every 5-7 seconds
- [ ] Smooth fade transition

### 6. **Featured Carousel**
- [ ] Splide.js integration
- [ ] Loop mode
- [ ] 3 slides on desktop, 2 on tablet, 1 on mobile
- [ ] Auto-scroll with pause on hover
- [ ] Difficulty badges with colors
- [ ] Category badges
- [ ] Image zoom on hover

### 7. **Distance Reference Section**
- [ ] Distance from key cities
- [ ] Icons for each location type
- [ ] 4-column grid

### 8. **PWA Features**
- [ ] manifest.json configured
- [ ] Service Worker for offline
- [ ] Cache-first strategy
- [ ] App shortcuts
- [ ] Installable

### 9. **Preloader**
- [ ] Tanzania flag colors spinner
- [ ] Auto-hide on load
- [ ] 3s timeout fallback

### 10. **Back to Top Button**
- [ ] Appears after 400px scroll
- [ ] Smooth scroll behavior
- [ ] Circle with arrow icon

### 11. **Image Handling**
- [ ] Lazy loading
- [ ] Placeholder on error
- [ ] Aspect ratio preserved

---

## 🗣️ Swahili Quotes System

Quotes should rotate every 5-7 seconds:

```javascript
const swahiliQuotes = [
  { sw: "Hakuna Matata", en: "No worries" },
  { sw: "Safari njema", en: "Have a good journey" },
  { sw: "Karibu Tanzania", en: "Welcome to Tanzania" },
  { sw: "Pole pole", en: "Slowly, slowly" },
  { sw: "Jambo", en: "Hello" },
  { sw: "Asante sana", en: "Thank you very much" },
  { sw: "Twende", en: "Let's go" },
  { sw: "Pamoja", en: "Together" },
];
```

---

## 📱 PWA Configuration

```json
{
  "name": "Xenohuru",
  "short_name": "Xenohuru",
  "theme_color": "#1A4731",
  "background_color": "#FAFAF8",
  "display": "standalone",
  "shortcuts": [
    "Attractions",
    "Regions", 
    "Weather",
    "Blog",
    "Operators"
  ]
}
```

---

## 🎨 Design Tokens (Already Implemented)

- Forest Green: `#1A4731`
- Savanna Gold: `#C8903A`
- Sky Blue: `#1E6FA8`
- Sand: `#F5E6C8`
- Earth: `#8B5E3C`

---

## 🏗️ Components to Build

1. **RotatingSwahiliQuote** - Client component with interval
2. **AnimatedCounter** - Number animation
3. **GlassmorphNav** - Navbar with scroll detection
4. **PreloaderSpinner** - Tanzania colors spinner
5. **BackToTop** - Floating button
6. **FeaturedCarousel** - Splide integration

---

## 📝 Content Changes

### Remove:
- ❌ "Why Choose Xenohuru?" section
- ❌ Business-focused language

### Add:
- ✅ Swahili quote banner
- ✅ Distance reference section
- ✅ PWA focus
- ✅ Cultural elements

---

## Priority Implementation Order

1. **Phase 1** - Core animations & PWA
2. **Phase 2** - Swahili quotes & counters
3. **Phase 3** - Splide carousel
4. **Phase 4** - Navbar glassmorphism
5. **Phase 5** - Service worker

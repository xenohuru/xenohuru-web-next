/**
 * Xenohuru Image Placeholder Utilities
 * Based on proven patterns from the original Xenohuru platform
 * Provides SVG placeholders with Tanzanian colors and grid patterns
 */

export const PLACEHOLDER_SVG_SMALL = (label = '') => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D6C4A0" stroke-width="0.5" opacity="0.6"/>
    </pattern>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a4731;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e8a045;stop-opacity:0.8" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <rect width="400" height="300" fill="url(#grid)"/>
  <rect width="400" height="300" fill="none" stroke="#C8903A" stroke-width="1" opacity="0.3"/>
  <g transform="translate(176, 110)" opacity="0.4">
    <rect x="0" y="10" width="48" height="34" rx="5" fill="#8B5E3C"/>
    <circle cx="24" cy="27" r="11" fill="#6B4A2C"/>
    <circle cx="24" cy="27" r="7" fill="#8B5E3C" opacity="0.7"/>
    <circle cx="24" cy="27" r="4" fill="#C8903A" opacity="0.5"/>
    <rect x="6" y="5" width="10" height="7" rx="2" fill="#8B5E3C"/>
    <circle cx="38" cy="14" r="3" fill="#8B5E3C"/>
  </g>
  ${label ? `<text x="200" y="220" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="13" fill="#8B5E3C" opacity="0.7">${label}</text>` : ''}
  <text x="200" y="${label ? '240' : '230'}" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="12" fill="#8B5E3C" opacity="0.5">Image not available</text>
</svg>
`;

export const PLACEHOLDER_SVG_HERO = (label = '') => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500" width="1200" height="500">
  <defs>
    <pattern id="topo" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C8903A" stroke-width="0.4" opacity="0.25"/>
      <circle cx="20" cy="20" r="8" fill="none" stroke="#C8903A" stroke-width="0.3" opacity="0.2"/>
    </pattern>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1A4731;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2D6A4F;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="500" fill="url(#heroBg)"/>
  <rect width="1200" height="500" fill="url(#topo)"/>
  <g transform="translate(572, 185)" opacity="0.25">
    <rect x="0" y="12" width="56" height="40" rx="6" fill="white"/>
    <circle cx="28" cy="32" r="13" fill="white" opacity="0.8"/>
    <circle cx="28" cy="32" r="8" fill="#1A4731" opacity="0.6"/>
    <rect x="8" y="5" width="12" height="9" rx="3" fill="white"/>
  </g>
  ${label ? `<text x="600" y="285" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="16" fill="white" opacity="0.5">${label}</text>` : ''}
  <text x="600" y="${label ? '310' : '295'}" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="13" fill="white" opacity="0.35">Image coming soon</text>
</svg>
`;

export function getPlaceholderDataUri(type: 'small' | 'hero' = 'small', label = ''): string {
  const svg = type === 'hero' ? PLACEHOLDER_SVG_HERO(label) : PLACEHOLDER_SVG_SMALL(label);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const PLACEHOLDER_SMALL_DATA_URI = getPlaceholderDataUri('small');
export const PLACEHOLDER_HERO_DATA_URI = getPlaceholderDataUri('hero');

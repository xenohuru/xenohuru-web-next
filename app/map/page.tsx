'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Navigation, X, Loader2 } from 'lucide-react';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const MarkerClusterGroup = dynamic(
  () => import('react-leaflet-cluster'),
  { ssr: false }
);

import 'leaflet/dist/leaflet.css';

// Tanzania bounds (including Zanzibar)
const TANZANIA_BOUNDS: [[number, number], [number, number]] = [
  [-11.75, 29.34], // Southwest
  [-0.99, 40.50]   // Northeast
];

// Tanzania center
const TANZANIA_CENTER: [number, number] = [-6.3690, 34.8888];

// Fix Leaflet icon
if (typeof window !== 'undefined') {
  const L = require('leaflet');
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const CATEGORIES = [
  'National Park',
  'Beach',
  'Mountain',
  'Historical Site',
  'Wildlife Reserve',
  'Cultural Site',
  'Island',
  'Lake',
  'Waterfall',
  'City',
];

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data: attractions, isLoading } = useQuery({
    queryKey: ['attractions-map'],
    queryFn: () => api.attractions.list(),
  });

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Check if location is within Tanzania bounds
        if (lat >= TANZANIA_BOUNDS[0][0] && lat <= TANZANIA_BOUNDS[1][0] &&
            lng >= TANZANIA_BOUNDS[0][1] && lng <= TANZANIA_BOUNDS[1][1]) {
          setUserLocation([lat, lng]);
        } else {
          alert('Your location is outside Tanzania. Showing all attractions.');
        }
        setIsLocating(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to retrieve your location');
        setIsLocating(false);
      }
    );
  };

  const filteredAttractions = selectedCategory
    ? attractions?.filter((a) => a.category === selectedCategory)
    : attractions;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <LoadingSkeleton variant="page" />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden absolute top-24 left-4 z-[1001] bg-[#161b22] border border-[#30363d] rounded-lg p-3 shadow-xl"
      >
        {sidebarOpen ? <X className="w-5 h-5 text-white" /> : <Navigation className="w-5 h-5 text-white" />}
      </button>

      {/* Sidebar */}
      <div className={`absolute top-20 left-4 z-[1000] w-72 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1rem)] lg:translate-x-0'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-[#30363d]">
          <h2 className="font-display text-lg font-bold text-white">
            Filter Attractions
          </h2>
          <p className="text-[#8b949e] text-sm mt-1">
            {filteredAttractions?.length || 0} locations
          </p>
        </div>

        {/* Categories */}
        <div className="p-4 max-h-[50vh] overflow-y-auto">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full text-left px-3 py-2 rounded-lg mb-2 transition-colors ${
              !selectedCategory
                ? 'bg-[#1a7a4a] text-white'
                : 'text-[#8b949e] hover:bg-[#0d1117]'
            }`}
          >
            All Categories
          </button>

          {CATEGORIES.map((category) => {
            const count = attractions?.filter((a) => a.category === category).length || 0;
            if (count === 0) return null;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg mb-2 transition-colors flex items-center justify-between ${
                  selectedCategory === category
                    ? 'bg-[#1a7a4a] text-white'
                    : 'text-[#8b949e] hover:bg-[#0d1117]'
                }`}
              >
                <span className="text-sm">{category}</span>
                <span className="text-xs opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Near Me Button */}
        <div className="p-4 border-t border-[#30363d]">
          <button
            onClick={handleNearMe}
            disabled={isLocating}
            className="w-full bg-[#e8a045] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#e8a045]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLocating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Locating...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4" />
                Near Me
              </>
            )}
          </button>
        </div>
      </div>

      {/* Map */}
      {typeof window !== 'undefined' && (
        <MapContainer
          center={userLocation || TANZANIA_CENTER}
          zoom={userLocation ? 10 : 6}
          maxBounds={TANZANIA_BOUNDS}
          maxBoundsViscosity={1.0}
          minZoom={6}
          maxZoom={18}
          className="h-full w-full"
          style={{ zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <MarkerClusterGroup chunkedLoading>
            {filteredAttractions?.map((attraction) => (
              <Marker
                key={attraction.id}
                position={[attraction.latitude, attraction.longitude]}
              >
                <Popup maxWidth={250}>
                  <div className="min-w-[200px]">
                    {attraction.featured_image && (
                      <img
                        src={attraction.featured_image}
                        alt={attraction.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                    )}
                    <h3 className="font-bold text-sm mb-1">{attraction.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {typeof attraction.region === 'object' ? attraction.region.name : attraction.region}
                    </p>
                    <span className="inline-block px-2 py-1 bg-[#1a7a4a] text-white text-xs rounded-full mb-3">
                      {attraction.category}
                    </span>
                    <a
                      href={`/attractions/${attraction.slug}`}
                      className="block w-full text-center bg-[#e8a045] text-white text-sm font-semibold py-2 rounded hover:bg-[#e8a045]/90 transition-colors"
                    >
                      View Details →
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* User Location Marker */}
            {userLocation && (
              <Marker position={userLocation}>
                <Popup>
                  <div className="text-center">
                    <p className="font-bold">You are here</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MarkerClusterGroup>
        </MapContainer>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-[#161b22] border border-[#30363d] rounded-lg p-4 shadow-xl">
        <div className="text-white text-sm font-semibold mb-2">Legend</div>
        <div className="flex items-center gap-2 text-[#8b949e] text-xs mb-1">
          <div className="w-3 h-3 bg-[#1a7a4a] rounded-full"></div>
          <span>Attraction</span>
        </div>
        {userLocation && (
          <div className="flex items-center gap-2 text-[#8b949e] text-xs">
            <div className="w-3 h-3 bg-[#e8a045] rounded-full"></div>
            <span>Your Location</span>
          </div>
        )}
      </div>
    </div>
  );
}

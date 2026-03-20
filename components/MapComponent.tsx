'use client';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapComponentProps {
  center: [number, number];
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    name: string;
    description?: string;
    link?: string;
  }>;
  boundary?: any; // GeoJSON FeatureCollection
  className?: string;
}

export function MapComponent({
  center,
  zoom = 13,
  markers,
  boundary,
  className = 'h-[400px] rounded-2xl',
}: MapComponentProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {markers?.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{marker.name}</h3>
              {marker.description && <p className="text-gray-600">{marker.description}</p>}
              {marker.link && (
                <a href={marker.link} className="text-[#1a7a4a] hover:underline">
                  View Details →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      
      {boundary && (
        <GeoJSON
          data={boundary}
          style={{
            color: '#e8a045',
            weight: 2,
            fillColor: '#1a7a4a',
            fillOpacity: 0.1,
          }}
        />
      )}
    </MapContainer>
  );
}

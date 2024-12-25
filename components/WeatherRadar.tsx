'use client';

import { MapContainer, TileLayer } from 'react-leaflet';

const WeatherRadar = () => {
  // Get coordinates from environment variables
  const lat = process.env.NEXT_PUBLIC_RADAR_LAT ? parseFloat(process.env.NEXT_PUBLIC_RADAR_LAT) : 37.0965;
  const lon = process.env.NEXT_PUBLIC_RADAR_LON ? parseFloat(process.env.NEXT_PUBLIC_RADAR_LON) : -113.5684;

  return (
    <div className="h-full w-full min-h-[400px] glass-panel overflow-hidden">
      <MapContainer
        center={[lat, lon]}
        zoom={8}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Add your weather radar overlay here */}
      </MapContainer>
    </div>
  );
};

export default WeatherRadar;
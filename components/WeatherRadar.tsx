'use client';

import { useEffect, useState } from 'react';
import { Card } from './Card';

interface RadarFrame {
  time: number;
  path: string;
}

interface RadarData {
  version: string;
  generated: number;
  host: string;
  radar: {
    past: RadarFrame[];
    nowcast: RadarFrame[];
  };
}

export default function WeatherRadar() {
  const [data, setData] = useState<RadarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRadarData() {
      try {
        const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
        const json = await response.json();
        console.log('Radar API response:', json);
        setData(json);
        setLoading(false);
      } catch (err) {
        console.error('Radar fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch radar');
        setLoading(false);
      }
    }

    fetchRadarData();
  }, []);

  // Update frame every 500ms
  useEffect(() => {
    if (!data) return;

    const frames = [...data.radar.past, ...data.radar.nowcast];
    console.log('Total frames:', frames.length);
    console.log('Current frame:', frames[currentFrame]);

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 500);

    return () => clearInterval(interval);
  }, [data, currentFrame]);

  if (loading) return <Card>Loading radar...</Card>;
  if (error) return <Card>Error: {error}</Card>;
  if (!data) return <Card>No radar data available</Card>;

  const frames = [...data.radar.past, ...data.radar.nowcast];
  const frame = frames[currentFrame];
  const imageUrl = `${data.host}${frame.path}/256/7/40.7608/-111.8910/1/1_1.png`;
  console.log('Image URL:', imageUrl);

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-lg">Weather Radar</p>
          <p className="text-sm text-gray-400">
            {new Date(frame.time * 1000).toLocaleTimeString()}
          </p>
        </div>
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-red-500">
              {imageError}
            </div>
          )}
          <img 
            src={imageUrl}
            alt="Weather Radar"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image load error:', e);
              setImageError('Failed to load radar image');
            }}
            onLoad={() => {
              console.log('Image loaded successfully');
              setImageError(null);
            }}
          />
        </div>
        <div className="text-xs text-gray-400">
          Frame {currentFrame + 1} of {frames.length}
        </div>
      </div>
    </Card>
  );
} 
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

  useEffect(() => {
    async function fetchRadarData() {
      try {
        const response = await fetch('https://api.rainviewer.com/public/weather-maps.json');
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
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
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 500);

    return () => clearInterval(interval);
  }, [data]);

  if (loading) return <Card>Loading radar...</Card>;
  if (error) return <Card>Error: {error}</Card>;
  if (!data) return <Card>No radar data available</Card>;

  const frames = [...data.radar.past, ...data.radar.nowcast];
  const frame = frames[currentFrame];
  const imageUrl = `${data.host}${frame.path}/256/7/40.7608/-111.8910/1/1_1.png`;

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
          <img 
            src={imageUrl}
            alt="Weather Radar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Card>
  );
} 
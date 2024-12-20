'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from './Card';

interface WeatherConditions {
  air_temperature: number;
  feels_like: number;
  conditions: string;
  relative_humidity: number;
  wind_avg: number;
  uv: number;
}

interface ForecastDay {
  air_temp_high: number;
  air_temp_low: number;
  precip_probability: number;
}

interface WeatherData {
  current_conditions: WeatherConditions;
  forecast: {
    daily: ForecastDay[];
  };
}

interface WeatherQuipProps {
  weatherData: WeatherData;
}

export function WeatherQuip({ weatherData }: WeatherQuipProps) {
  const [quip, setQuip] = useState<string | null>(null);
  const [showQuip, setShowQuip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getQuip = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post('/api/analyze', {
          current: weatherData.current_conditions,
          forecast: weatherData.forecast
        });
        setQuip(response.data.message);
        // Set a 750ms delay before showing the quip
        setTimeout(() => {
          setShowQuip(true);
          setIsLoading(false);
        }, 750);
      } catch (error) {
        console.error('Error getting weather quip:', error);
        setQuip('Weather so nice, even my AI is speechless! 🤐');
        setIsLoading(false);
      }
    };

    getQuip();
  }, [weatherData]);

  if (!quip || !showQuip) return null;

  return (
    <div 
      className="fixed bottom-3 right-3 max-w-[80%] md:max-w-xs z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`
        transition-all duration-300 
        ${isHovered ? 'transform scale-105' : ''}
        bg-gradient-to-br from-weather-blue/20 to-weather-purple/20
        backdrop-blur-lg border border-white/10
        w-full md:w-auto
      `}>
        <div className="flex items-start gap-2">
          <div className="relative flex-shrink-0">
            <div className={`
              text-2xl transform transition-transform duration-500
              ${isHovered ? 'rotate-12 scale-110' : ''}
              ${isLoading ? 'animate-bounce' : ''}
            `}>
              {isLoading ? '🤔' : '🤖'}
            </div>
            <div className={`
              absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-green-400 rounded-full
              ${isLoading ? 'animate-ping' : ''}
            `} />
          </div>
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="space-y-1.5">
                <div className="animate-pulse h-3 w-36 bg-white/10 rounded" />
                <div className="animate-pulse h-3 w-24 bg-white/10 rounded" />
              </div>
            ) : (
              <div className="relative">
                <div className="text-xs font-medium leading-snug">
                  {quip}
                </div>
                <div className="absolute -bottom-3 right-0 text-[10px] text-gray-400 opacity-60">
                  AI Weather Assistant
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
} 
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from './Card';

interface WeatherQuipProps {
  weatherData: {
    current_conditions: {
      air_temperature: number;
      feels_like: number;
      conditions: string;
      relative_humidity: number;
      wind_avg: number;
      uv: number;
    };
    forecast: {
      daily: Array<{
        air_temp_high: number;
        air_temp_low: number;
        precip_probability: number;
      }>;
    };
  };
}

export function WeatherQuip({ weatherData }: WeatherQuipProps) {
  const [quip, setQuip] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getQuip = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post('/api/analyze', {
          current: weatherData.current_conditions,
          forecast: weatherData.forecast
        });
        setQuip(response.data.message);
      } catch (error) {
        console.error('Error getting weather quip:', error);
        setQuip('Weather so nice, even my AI is speechless! 🤐');
      } finally {
        setIsLoading(false);
      }
    };

    if (weatherData) {
      getQuip();
    }
  }, [weatherData]);

  return (
    <div 
      className="fixed bottom-4 right-4 max-w-sm z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`
        transition-all duration-300 
        ${isHovered ? 'transform scale-105' : ''}
        bg-gradient-to-br from-weather-blue/20 to-weather-purple/20
        backdrop-blur-lg border border-white/10
      `}>
        <div className="flex items-start gap-3">
          <div className="relative">
            <div className={`
              text-4xl transform transition-transform duration-500
              ${isHovered ? 'rotate-12 scale-110' : ''}
              ${isLoading ? 'animate-bounce' : ''}
            `}>
              {isLoading ? '🤔' : '🤖'}
            </div>
            <div className={`
              absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full
              ${isLoading ? 'animate-ping' : ''}
            `} />
          </div>
          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-2">
                <div className="animate-pulse h-4 w-48 bg-white/10 rounded" />
                <div className="animate-pulse h-4 w-32 bg-white/10 rounded" />
              </div>
            ) : (
              <div className="relative">
                <div className={`
                  text-sm font-medium leading-snug
                  transform transition-all duration-300
                  ${isHovered ? 'scale-102' : ''}
                `}>
                  {quip}
                </div>
                <div className="absolute -bottom-4 right-0 text-xs text-gray-400 opacity-60">
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
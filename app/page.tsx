'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { WeatherMetric } from '@/components/WeatherMetric';
import { WeatherIcon, IconType, getWeatherEmoji } from '@/components/WeatherIcon';
import dynamic from 'next/dynamic';
import axios from 'axios';

interface WeatherData {
  current_conditions: {
    air_temperature: number;
    feels_like: number;
    relative_humidity: number;
    wind_avg: number;
    wind_direction: number;
    station_pressure: number;
    pressure_trend: string;
    uv: number;
    brightness: number;
    conditions: string;
    icon: string;
    timestamp: number;
  };
  forecast: {
    daily: Array<{
      day_num: number;
      month_num: number;
      conditions: string;
      icon: string;
      air_temp_high: number;
      air_temp_low: number;
      precip_probability: number;
      precip_type: string;
      sunrise: number;
    }>;
  };
}

// Dynamically import WeatherRadar with no SSR
const WeatherRadar = dynamic(
  () => import('@/components/WeatherRadar'),
  { ssr: false }
);

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/weather');
        setWeatherData(response.data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
    
    // Set up interval for API updates
    const fetchInterval = setInterval(fetchData, 60000); // Update data every minute

    // Clean up interval
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  if (!weatherData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-weather-blue"></div>
      </div>
    );
  }

  const current = weatherData.current_conditions;

  return (
    <main className="min-h-screen p-2 md:p-4 max-w-7xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-weather-blue/30 to-weather-purple/30 rounded-xl blur-2xl" />

        <div className="relative">
          {/* Main Grid - 2 Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Left Column: Current Conditions */}
            <div className="h-full flex flex-col">
              <Card className="text-center flex-1">
                <div className="flex flex-col h-full p-4">
                  {/* Grid of 4 equal cards */}
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {/* Temperature Card */}
                    <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center justify-center">
                      <div className="text-[100px] md:text-[120px] font-medium leading-none tracking-tight">
                        {Math.round(current.air_temperature)}°
                      </div>
                      <div className="text-2xl md:text-3xl font-light text-gray-300 mt-3">
                        Feels like {Math.round(current.feels_like)}°
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <WeatherIcon 
                          type={current.icon as IconType} 
                          className="w-6 h-6"
                        />
                        <span className="text-lg">{current.conditions}</span>
                      </div>
                    </div>

                    {/* Humidity Card */}
                    <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center justify-center">
                      <div className="relative mb-2">
                        <span className="text-5xl">💧</span>
                        <span className="absolute -top-2 -right-2 text-3xl">💧</span>
                      </div>
                      <div className="text-3xl md:text-4xl font-medium">
                        {current.relative_humidity}%
                      </div>
                      <div className="text-lg text-gray-400">
                        Humidity
                      </div>
                    </div>

                    {/* Pressure Card */}
                    <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center justify-center">
                      <span className="text-5xl mb-2 bg-gradient-to-br from-red-400 to-orange-500 text-transparent bg-clip-text">🌡️</span>
                      <div className="text-3xl md:text-4xl font-medium">
                        {current.station_pressure.toFixed(2)}
                      </div>
                      <div className="text-lg text-gray-400">
                        Pressure ({current.pressure_trend})
                      </div>
                    </div>

                    {/* Wind Speed Card */}
                    <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center justify-center">
                      <span className="text-5xl mb-2 bg-gradient-to-br from-gray-300 to-gray-500 text-transparent bg-clip-text">🌪️</span>
                      <div className="text-3xl md:text-4xl font-medium">
                        {current.wind_avg} mph
                      </div>
                      <div className="text-lg text-gray-400">
                        Wind Speed
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Weather Map */}
            <WeatherRadar />
          </div>

          {/* Forecast Section */}
          <section className="space-y-3 mb-6">
            <h2 className="text-base font-light px-2">5-Day Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {weatherData.forecast.daily.slice(0, 5).map((day) => (
                <Card
                  key={`${day.day_num}-${day.month_num}`}
                  className="text-center"
                >
                  <div className="text-gray-400 text-xs">
                    {new Date(day.sunrise * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="flex flex-col items-center gap-1 my-1">
                    <div className="text-xl">
                      {getWeatherEmoji(day.conditions, day.air_temp_high, day.precip_probability)}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 text-xl md:text-2xl font-medium">
                    <span>{Math.round(day.air_temp_high)}°</span>
                    <span className="text-gray-400">{Math.round(day.air_temp_low)}°</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <div className="mt-4 text-sm text-gray-400 text-center">
            Last updated: {lastUpdated ? 
              new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }).format(lastUpdated)
              : 'Updating...'
            }
          </div>
        </div>
      </div>
    </main>
  );
}

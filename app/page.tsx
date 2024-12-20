'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { WeatherIcon, IconType } from '@/components/WeatherIcon';
import { Card } from '@/components/Card';
import { WeatherMetric } from '@/components/WeatherMetric';
import { useWeatherSocket } from './hooks/useWeatherSocket';
import { WeatherQuip } from '@/components/WeatherQuip';
import { WeatherCharts } from '@/components/WeatherCharts';
import { getWeatherEmoji } from '@/components/WeatherIcon';

interface WeatherData {
  current_conditions: {
    air_temperature: number;
    relative_humidity: number;
    station_pressure: number;
    wind_avg: number;
    wind_direction: number;
    wind_gust: number;
    solar_radiation: number;
    uv: number;
    brightness: number;
    feels_like: number;
    dew_point: number;
    wet_bulb_temperature: number;
    conditions: string;
    icon: string;
    pressure_trend: string;
    timestamp: number;
  };
  forecast: {
    daily: Array<{
      day_num: number;
      month_num: number;
      conditions: string;
      icon: string;
      sunrise: number;
      sunset: number;
      air_temp_high: number;
      air_temp_low: number;
      precip_probability: number;
      precip_icon: string;
      precip_type: string;
    }>;
  };
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [weatherRes, historicalRes] = await Promise.all([
        axios.get('/api/weather'),
        axios.get('/api/historical')
      ]);
      setWeatherData(weatherRes.data);
      setHistoricalData(historicalRes.data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // WebSocket updates
  useWeatherSocket((data: { type: string; obs?: number[][] }) => {
    if (data.type === 'obs_st') {
      fetchData();
    }
  });

  if (error) return <div className="text-red-500">{error}</div>;
  if (!weatherData) return <div>Loading...</div>;

  const current = weatherData.current_conditions;

  return (
    <main className="min-h-screen p-2 md:p-4 max-w-5xl mx-auto">
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-weather-blue/30 to-weather-purple/30 rounded-xl blur-2xl" />

        {/* Content */}
        <div className="relative">
          {/* Current Conditions */}
          <section className="mb-6">
            <Card className="text-center mb-4">
              <div className="flex flex-col items-center">
                <div className="text-[70px] md:text-[105px] font-light leading-none tracking-tight">
                  {Math.round(current.air_temperature)}°
                </div>
                <div className="text-base md:text-lg font-light text-gray-300">
                  Feels like {Math.round(current.feels_like)}°
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <WeatherIcon 
                    type={current.icon as IconType} 
                    className="w-5 h-5" 
                  />
                  <span className="text-base">{current.conditions}</span>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <WeatherMetric
                icon="💧"
                value={`${current.relative_humidity}%`}
                label="Humidity"
                iconClassName="text-blue-400"
              />
              <WeatherMetric
                icon="🌡️"
                value={`${current.station_pressure.toFixed(2)}`}
                label={`Pressure (${current.pressure_trend})`}
                iconClassName="text-gray-400"
              />
              <WeatherMetric
                icon="🌪️"
                value={`${current.wind_avg} mph`}
                label="Wind Speed"
                iconClassName="text-yellow-400"
              />
              <WeatherMetric
                icon="☀️"
                value={current.uv}
                label="UV Index"
                iconClassName="text-yellow-500"
              />
            </div>
          </section>

          {/* Forecast */}
          <section className="space-y-3 mb-6">
            <h2 className="text-base font-light px-2">5-Day Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {weatherData.forecast.daily.slice(0, 5).map((day) => (
                <Card
                  key={`${day.day_num}-${day.month_num}`}
                  className="text-center transition-transform hover:scale-105"
                >
                  <div className="text-gray-400 text-xs">
                    {new Date(day.sunrise * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="flex flex-col items-center gap-1 my-1">
                    <WeatherIcon type={day.icon as IconType} className="w-6 h-6" />
                    <div className="text-xl">
                      {getWeatherEmoji(day.conditions, day.air_temp_high, day.precip_probability)}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 text-sm font-medium">
                    <span>{Math.round(day.air_temp_high)}°</span>
                    <span className="text-gray-400">{Math.round(day.air_temp_low)}°</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {day.precip_probability}% {day.precip_type}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Historical Charts */}
          {historicalData && <WeatherCharts data={historicalData} />}

          <div className="mt-6 text-xs text-gray-400 text-center">
            Last updated: {new Date(current.timestamp * 1000).toLocaleString()}
          </div>
        </div>
      </div>
      
      {weatherData && <WeatherQuip weatherData={weatherData} />}
    </main>
  );
}
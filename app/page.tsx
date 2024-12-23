'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { WeatherMetric } from '@/components/WeatherMetric';
import { WeatherIcon, IconType, getWeatherEmoji } from '@/components/WeatherIcon';
import { WeatherCharts } from '@/components/WeatherCharts';
import { MonthlyInsights } from '@/components/MonthlyInsights';
import { TimeLapse } from '@/components/TimeLapse';
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
  const [chartData, setChartData] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'current' | 'charts' | 'monthly' | 'timelapse'>('current');

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
    
    const fetchInterval = setInterval(fetchData, 60000);
    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    if (activeTab === 'charts') {
      setChartData(null);
      axios.get('/api/historical')
        .then(response => {
          if (response.data && response.data.obs) {
            setChartData(response.data);
          } else {
            console.error('Invalid data format received');
          }
        })
        .catch(error => {
          console.error('Error fetching chart data:', error);
        });
    }
  }, [activeTab]);

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
      {/* Fixed position tabs */}
      <div className="fixed top-[5.6rem] left-0 right-0 z-40 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between py-4">
            {/* Left side - Tab buttons */}
            <div className="flex gap-2">
              {['current', 'charts', 'monthly', 'timelapse'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`
                    px-4 py-2 rounded-lg transition-all
                    ${activeTab === tab 
                      ? 'bg-indigo-500/90 text-white font-medium shadow-lg shadow-indigo-500/20' 
                      : 'bg-gray-900/90 text-white/70 hover:bg-gray-800/90 hover:text-white'
                    }
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Right side - Station Name - adjusted margin */}
            <div className="text-sm sm:text-base md:text-lg 
                            font-light tracking-wide text-gray-300/80
                            flex items-center gap-2 ml-12">
              <span className="text-lg md:text-xl">📍</span>
              <span className="font-medium">Salt Lake City Station&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content with proper spacing */}
      <div className="pt-24">
        {/* Content Area */}
        {activeTab === 'current' && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-weather-blue/30 to-weather-purple/30 rounded-xl blur-2xl" />
            <div className="relative">
              {/* Main Grid */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* Current Conditions */}
                <div className="flex-1 min-h-[40vh] lg:min-h-[50vh]">
                  <Card variant="glass" className="text-center h-full p-3 md:p-4">
                    <div className="flex flex-col h-full gap-4">
                      {/* Temperature Card */}
                      <div className="glass-panel p-4 flex flex-col items-center justify-between">
                        <div className="text-[4rem] md:text-[5.5rem] font-medium leading-none tracking-tight text-white">
                          {Math.round(current.air_temperature)}°
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="text-xl md:text-2xl font-light text-gray-300">
                            Feels like {Math.round(current.feels_like)}°
                          </div>
                          <div className="text-base md:text-lg font-light text-gray-400">
                            {current.conditions}
                          </div>
                        </div>
                      </div>

                      {/* Metric Cards Grid */}
                      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
                        <WeatherMetric
                          icon="💧"
                          value={`${current.relative_humidity}%`}
                          label="Humidity"
                          size="default"
                        />
                        <WeatherMetric
                          icon="🌡️"
                          value={`${current.station_pressure.toFixed(2)}`}
                          label={`Pressure (${current.pressure_trend})`}
                          size="default"
                        />
                        <WeatherMetric
                          icon="🌪️"
                          value={`${current.wind_avg} mph`}
                          label="Wind Speed"
                          size="default"
                        />
                        <WeatherMetric
                          icon="☀️"
                          value={`${current.uv}`}
                          label="UV Index"
                          size="default"
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Weather Map */}
                <div className="flex-1 min-h-[40vh] lg:min-h-[50vh]">
                  <WeatherRadar />
                </div>
              </div>

              {/* Forecast Section */}
              <section className="space-y-3 mb-6">
                <h2 className="text-base font-light px-2">5-Day Forecast</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {weatherData.forecast.daily.slice(0, 5).map((day) => (
                    <Card
                      key={`${day.day_num}-${day.month_num}`}
                      variant="metric"
                      className="text-center p-4 flex flex-col items-center rounded-2xl"
                    >
                      <div className="text-gray-400 text-sm font-light">
                        {new Date(day.sunrise * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-4xl my-4">
                        {getWeatherEmoji(day.conditions, day.air_temp_high, day.precip_probability)}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl">{Math.round(day.air_temp_high)}°</span>
                        <span className="text-2xl text-gray-500">{Math.round(day.air_temp_low)}°</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'charts' && <WeatherCharts data={chartData} showOnly={['temperature', 'humidity', 'rain']} />}
        {activeTab === 'monthly' && <MonthlyInsights />}
        {activeTab === 'timelapse' && <TimeLapse />}

        {/* Last Updated */}
        {activeTab === 'current' && (
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
        )}
      </div>
    </main>
  );
}
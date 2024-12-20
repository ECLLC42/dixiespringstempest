import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeatherObservation {
  timestamp: number;
  temperature: number;
  humidity: number;
  rain: number;
}

interface WeatherChartsProps {
  data: {
    obs: WeatherObservation[];
    summary: {
      start_time: number;
      end_time: number;
    };
  };
  showOnly?: ('temperature' | 'humidity' | 'rain')[];
}

export function WeatherCharts({ data, showOnly }: WeatherChartsProps) {
  const chartData = data.obs;

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 9
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          maxTicksLimit: 6,
          font: {
            size: 9
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 10
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {(!showOnly || showOnly.includes('temperature')) && (
        <div className="space-y-2">
          <h3 className="text-sm font-light">Temperature History</h3>
          <Line 
            options={options} 
            data={{
              labels: chartData.map(d => format(d.timestamp, 'MMM d')),
              datasets: [{
                label: 'Temperature (°F)',
                data: chartData.map(d => d.temperature),
                borderColor: 'rgb(96, 165, 250)',
                backgroundColor: 'rgba(96, 165, 250, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
              }]
            }} 
          />
        </div>
      )}

      {(!showOnly || showOnly.includes('humidity')) && (
        <div className="space-y-2">
          <h3 className="text-sm font-light">Humidity History</h3>
          <Line 
            options={options} 
            data={{
              labels: chartData.map(d => format(d.timestamp, 'MMM d')),
              datasets: [{
                label: 'Humidity (%)',
                data: chartData.map(d => d.humidity),
                borderColor: 'rgb(52, 211, 153)',
                backgroundColor: 'rgba(52, 211, 153, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
              }]
            }} 
          />
        </div>
      )}

      {(!showOnly || showOnly.includes('rain')) && (
        <div className="space-y-2">
          <h3 className="text-sm font-light">Rain History</h3>
          <Line 
            options={options} 
            data={{
              labels: chartData.map(d => format(d.timestamp, 'MMM d')),
              datasets: [{
                label: 'Rain Accumulation (in)',
                data: chartData.map(d => d.rain),
                borderColor: 'rgb(129, 140, 248)',
                backgroundColor: 'rgba(129, 140, 248, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
              }]
            }} 
          />
        </div>
      )}
    </div>
  );
} 
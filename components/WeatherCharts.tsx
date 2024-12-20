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
}

export function WeatherCharts({ data }: WeatherChartsProps) {
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
    <div className="mt-8 space-y-6">
      <h2 className="text-base font-light px-2">Historical Data (5 Days)</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
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
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
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
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
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
      </div>
    </div>
  );
} 
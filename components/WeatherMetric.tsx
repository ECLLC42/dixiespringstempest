import { Card } from '@/components/Card';

interface WeatherMetricProps {
  icon: string;
  value: string;
  label: string;
  size?: 'small' | 'default';
}

export const WeatherMetric = ({ icon, value, label, size = 'default' }: WeatherMetricProps) => {
  return (
    <div className="glass-panel p-2 flex flex-col items-center justify-center">
      <span className={size === 'small' ? 'text-base' : 'text-xl'}>{icon}</span>
      <span className={`metric-value ${size === 'small' ? 'text-lg' : 'text-2xl'}`}>
        {value}
      </span>
      <span className={`metric-label ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
        {label}
      </span>
    </div>
  );
}; 
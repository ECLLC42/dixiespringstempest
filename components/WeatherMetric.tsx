import { Card } from '@/components/Card';

interface WeatherMetricProps {
  icon: string;
  value: string | number;
  label: string;
  trend?: 'up' | 'down';
  className?: string;
  size?: 'default' | 'large';
}

export function WeatherMetric({ 
  icon, 
  value, 
  label,
  trend,
  className = '',
  size = 'default'
}: WeatherMetricProps) {
  const sizeClasses = {
    default: {
      icon: 'text-4xl',
      value: 'text-3xl',
      label: 'text-lg'
    },
    large: {
      icon: 'text-6xl',
      value: 'text-5xl',
      label: 'text-xl'
    }
  };

  return (
    <Card 
      variant="metric" 
      className={`animate-fade-in ${className}`}
    >
      <div className="flex items-center gap-6">
        <div className={`${sizeClasses[size].icon} opacity-80`}>
          {icon}
        </div>
        <div>
          <div className={`
            ${sizeClasses[size].value} 
            font-light tracking-tight
            flex items-center gap-2
          `}>
            {value}
            {trend && (
              <span className={`
                text-2xl
                ${trend === 'up' ? 'text-orange-400' : 'text-blue-400'}
              `}>
                {trend === 'up' ? '↑' : '↓'}
              </span>
            )}
          </div>
          <div className={`
            ${sizeClasses[size].label}
            text-white/60
          `}>
            {label}
          </div>
        </div>
      </div>
    </Card>
  );
} 
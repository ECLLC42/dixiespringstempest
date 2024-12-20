import { Card } from '@/components/Card';

interface WeatherMetricProps {
  icon: string;
  value: string | number;
  label: string;
  iconClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export function WeatherMetric({ 
  icon, 
  value, 
  label, 
  iconClassName = '',
  valueClassName = '',
  labelClassName = ''
}: WeatherMetricProps) {
  return (
    <Card className="flex items-center gap-3">
      <div className={`text-3xl md:text-4xl ${iconClassName}`}>{icon}</div>
      <div>
        <div className={`font-medium ${valueClassName}`}>{value}</div>
        <div className={`text-gray-400 ${labelClassName}`}>{label}</div>
      </div>
    </Card>
  );
} 
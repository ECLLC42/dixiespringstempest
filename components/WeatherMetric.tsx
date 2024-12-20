import { Card } from '@/components/Card';

interface WeatherMetricProps {
  icon: string;
  value: string | number;
  label: string;
  iconClassName?: string;
}

export function WeatherMetric({ icon, value, label, iconClassName = '' }: WeatherMetricProps) {
  return (
    <Card className="flex items-center gap-2">
      <div className={`text-xl ${iconClassName}`}>{icon}</div>
      <div>
        <div className="text-lg font-medium">{value}</div>
        <div className="text-gray-400 text-xs">{label}</div>
      </div>
    </Card>
  );
} 
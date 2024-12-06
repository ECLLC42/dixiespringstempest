import { Card } from '@/components/Card';

interface WeatherMetricProps {
  icon: string;
  value: string | number;
  label: string;
  iconClassName?: string;
}

export function WeatherMetric({ icon, value, label, iconClassName = '' }: WeatherMetricProps) {
  return (
    <Card className="flex items-center gap-3">
      <div className={`text-2xl ${iconClassName}`}>{icon}</div>
      <div>
        <div className="text-2xl font-medium">{value}</div>
        <div className="text-gray-400 text-sm">{label}</div>
      </div>
    </Card>
  );
} 
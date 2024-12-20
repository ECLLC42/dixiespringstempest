export function WeatherLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span className="text-2xl absolute -left-1 top-0 text-weather-blue">☀️</span>
      <span className="text-xl absolute -left-2 top-1 text-weather-purple opacity-80">☁️</span>
    </div>
  );
} 
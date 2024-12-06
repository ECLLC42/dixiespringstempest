type IconType = 'partly-cloudy' | 'clear' | 'cloudy';

interface WeatherIconProps {
  type: IconType;
  className?: string;
}

export function WeatherIcon({ type, className = "w-16 h-16" }: WeatherIconProps) {
  const icons: Record<IconType, JSX.Element> = {
    'partly-cloudy': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 4V2M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 16H16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8H15.5C15.1768 6.71776 14.4118 5.58876 13.3701 4.80945C12.3284 4.03013 11.0533 3.64236 9.75 3.69434C8.44666 3.74632 7.20493 4.23503 6.22882 5.08745C5.25272 5.93987 4.59736 7.10516 4.36001 8.382C3.49827 8.85655 2.7979 9.57641 2.3384 10.4517C1.8789 11.327 1.67851 12.3168 1.75907 13.3043C1.83963 14.2919 2.19806 15.2317 2.79262 16.0065C3.38718 16.7814 4.19227 17.3604 5.10001 17.667"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    'clear': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 5V3M12 21V19M5 12H3M21 12H19M7.05 7.05L5.636 5.636M18.364 18.364L16.95 16.95M7.05 16.95L5.636 18.364M18.364 5.636L16.95 7.05" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
    ),
    'cloudy': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 18H16C18.2091 18 20 16.2091 20 14C20 11.7909 18.2091 10 16 10H15.5C15.1768 8.71776 14.4118 7.58876 13.3701 6.80945C12.3284 6.03013 11.0533 5.64236 9.75 5.69434C8.44666 5.74632 7.20493 6.23503 6.22882 7.08745C5.25272 7.93987 4.59736 9.10516 4.36001 10.382C3.49827 10.8565 2.7979 11.5764 2.3384 12.4517C1.8789 13.327 1.67851 14.3168 1.75907 15.3043C1.83963 16.2919 2.19806 17.2317 2.79262 18.0065C3.38718 18.7814 4.19227 19.3604 5.10001 19.667"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  };

  return icons[type] || null;
} 
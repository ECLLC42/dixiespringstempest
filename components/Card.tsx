interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
} 
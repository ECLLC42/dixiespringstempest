interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'metric';
  highlight?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  highlight = false
}: CardProps) {
  const variants = {
    default: 'bg-black/30 backdrop-blur-xl border-2 border-white/10',
    glass: 'bg-gradient-to-br from-white/20 to-transparent backdrop-blur-xl border-2 border-white/10',
    metric: 'bg-black/40 backdrop-blur-lg border-2 border-white/10'
  };

  const highlightClass = highlight ? 'ring-4 ring-white/30 ring-offset-4 ring-offset-transparent' : '';

  return (
    <div className={`
      rounded-2xl p-6 
      shadow-2xl shadow-black/20
      transition-all duration-300
      ${variants[variant]}
      ${highlightClass}
      ${className}
    `}>
      {children}
    </div>
  );
} 
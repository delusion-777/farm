import React from 'react';

interface KrishiMitraLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function KrishiMitraLogo({ size = 'md', showText = true }: KrishiMitraLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Farmer Avatar */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Face */}
          <circle cx="50" cy="45" r="25" fill="#D2691E" stroke="#8B4513" strokeWidth="2"/>
          
          {/* Mustache */}
          <ellipse cx="50" cy="52" rx="8" ry="3" fill="#2F1B14"/>
          
          {/* Eyes */}
          <circle cx="43" cy="40" r="2" fill="#000"/>
          <circle cx="57" cy="40" r="2" fill="#000"/>
          
          {/* Nose */}
          <ellipse cx="50" cy="45" rx="1.5" ry="3" fill="#B8860B"/>
          
          {/* Head cloth (Gamcha/Angavastram) */}
          <path 
            d="M25 35 Q25 20 50 25 Q75 20 75 35 L75 45 Q50 50 25 45 Z" 
            fill="#FF6B35" 
            stroke="#E55100" 
            strokeWidth="1"
          />
          
          {/* Cloth pattern */}
          <circle cx="35" cy="32" r="2" fill="#FFE0B2" opacity="0.7"/>
          <circle cx="50" cy="30" r="2" fill="#FFE0B2" opacity="0.7"/>
          <circle cx="65" cy="32" r="2" fill="#FFE0B2" opacity="0.7"/>
          
          {/* Cloth knot */}
          <circle cx="50" cy="25" r="3" fill="#E55100"/>
          
          {/* Body (simple shirt) */}
          <rect x="35" y="70" width="30" height="25" fill="#4CAF50" rx="5"/>
          
          {/* Traditional collar */}
          <path d="M45 70 Q50 65 55 70" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1"/>
        </svg>
      </div>
      
      {/* Platform Name */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold text-green-700 tracking-tight`}>
            Krishi Mitra
          </h1>
          <p className="text-xs text-green-600 font-medium -mt-1">
            कृषि मित्र
          </p>
        </div>
      )}
    </div>
  );
}
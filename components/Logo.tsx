import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`${className} relative group`}>
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl blur-sm opacity-40 group-hover:opacity-75 transition duration-500"></div>
      
      {/* Main Icon Container */}
      <div className="relative h-full w-full bg-slate-950 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
        <svg viewBox="0 0 100 100" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stylized '<' */}
          <path 
            d="M30 35L15 50L30 65" 
            stroke="url(#grad1)" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Stylized '>' */}
          <path 
            d="M70 35L85 50L70 65" 
            stroke="url(#grad1)" 
            strokeWidth="10" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Stylized '+' in the center */}
          <path 
            d="M50 35V65M35 50H65" 
            stroke="white" 
            strokeWidth="12" 
            strokeLinecap="round" 
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          />

          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Logo;

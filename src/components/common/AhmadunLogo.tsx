import React from 'react';

interface AhmadunLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
}

export const AhmadunLogo: React.FC<AhmadunLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
}) => {
  // Dimension presets
  const sizeMap = {
    sm: { container: 'p-1.5 rounded-lg', svgWidth: 32, svgHeight: 32, fontSize: 'text-base' },
    md: { container: 'p-2 rounded-xl', svgWidth: 44, svgHeight: 44, fontSize: 'text-xl' },
    lg: { container: 'p-3 rounded-2xl', svgWidth: 64, svgHeight: 64, fontSize: 'text-2xl' },
    xl: { container: 'p-4 rounded-2xl', svgWidth: 84, svgHeight: 84, fontSize: 'text-3xl' },
  };

  const current = sizeMap[size];

  return (
    <div
      className={`inline-flex items-center gap-2.5 bg-[#FBFAF4] border border-[#E4E7E1]/80 shadow-xs transition-transform duration-200 ${current.container} ${className}`}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={current.svgWidth}
          height={current.svgHeight}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Subtle golden sun in the arch */}
          <circle cx="52" cy="54" r="14" fill="url(#sunGrad)" />

          {/* Background terrace/agricultural field furrow curves */}
          <path
            d="M 28 66 C 36 60, 48 58, 62 64 C 68 67, 74 72, 80 73 C 65 72, 48 71, 35 77 Z"
            fill="#1B5A2B"
          />
          <path
            d="M 33 72 C 42 66, 56 65, 70 70 C 58 75, 46 78, 38 82 Z"
            fill="#0F4420"
          />
          <path
            d="M 40 76 C 50 72, 60 72, 72 74 C 60 79, 52 82, 46 84 Z"
            fill="#2E7D32"
          />

          {/* Left main leaf forming the left stem of the 'A' */}
          <path
            d="M 52 14 C 44 26, 32 38, 24 50 C 22 53, 27 55, 30 52 C 38 42, 46 32, 52 22 Z"
            fill="url(#leafLightGrad)"
          />
          <path
            d="M 24 48 C 22 42, 26 36, 34 32 C 38 34, 38 38, 35 44 C 32 50, 27 52, 24 48 Z"
            fill="#43A047"
          />

          {/* Right soaring leaf forming the main spine and right curve of the 'A' */}
          <path
            d="M 52 14 C 54 28, 62 42, 70 54 C 76 63, 84 68, 88 67 C 82 66, 74 61, 68 52 C 60 40, 55 26, 52 14 Z"
            fill="url(#leafMainGrad)"
          />

          {/* Overlapping lush front leaf arch bridging across the 'A' */}
          <path
            d="M 22 62 C 34 50, 48 44, 66 43 C 74 42, 78 45, 74 48 C 60 49, 44 54, 30 68 C 26 72, 20 70, 22 62 Z"
            fill="url(#leafFrontGrad)"
          />

          {/* Inner shade & detail accents */}
          <path
            d="M 45 45 C 50 43, 56 43, 62 45 C 55 49, 48 52, 42 56 Z"
            fill="#0F4420"
            opacity="0.85"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="sunGrad" x1="52" y1="40" x2="52" y2="68" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F2C94C" />
              <stop offset="1" stopColor="#E5A823" />
            </linearGradient>

            <linearGradient id="leafMainGrad" x1="52" y1="14" x2="84" y2="67" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1B5A2B" />
              <stop offset="0.6" stopColor="#0F4420" />
              <stop offset="1" stopColor="#061E0E" />
            </linearGradient>

            <linearGradient id="leafFrontGrad" x1="22" y1="45" x2="74" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2E7D32" />
              <stop offset="0.5" stopColor="#1B5A2B" />
              <stop offset="1" stopColor="#0F4420" />
            </linearGradient>

            <linearGradient id="leafLightGrad" x1="52" y1="14" x2="24" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#43A047" />
              <stop offset="1" stopColor="#1B5A2B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none select-none">
          <span
            className={`font-serif-brand font-bold tracking-tight text-[#0F4420] ${current.fontSize}`}
          >
            Ahmadun
          </span>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#E5A823] mt-0.5">
            Agro
          </span>
        </div>
      )}
    </div>
  );
};

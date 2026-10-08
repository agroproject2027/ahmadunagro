import React, { useState, useEffect, useRef } from 'react';
import { Upload } from 'lucide-react';

interface AhmadunLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
  allowDirectUpload?: boolean;
}

export const AhmadunLogo: React.FC<AhmadunLogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  allowDirectUpload = false,
}) => {
  const [logoSrc, setLogoSrc] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ahmadun_custom_logo') || '/logo.png';
    }
    return '/logo.png';
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('ahmadun_custom_logo');
      if (saved) setLogoSrc(saved);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setLogoSrc(dataUrl);
        localStorage.setItem('ahmadun_custom_logo', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Dimension presets
  const sizeMap = {
    sm: { container: 'p-1.5 rounded-xl', heightClass: 'h-9', fontSize: 'text-base', subSize: 'text-[9px]' },
    md: { container: 'p-2 rounded-xl', heightClass: 'h-12', fontSize: 'text-xl', subSize: 'text-[10px]' },
    lg: { container: 'p-2.5 rounded-2xl', heightClass: 'h-16', fontSize: 'text-2xl', subSize: 'text-xs' },
    xl: { container: 'p-3 rounded-2xl', heightClass: 'h-24', fontSize: 'text-3xl', subSize: 'text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div
      className={`relative group inline-flex items-center gap-2.5 bg-[#FBFAF4] border border-[#E4E7E1] shadow-2xs transition-transform duration-150 select-none ${current.container} ${className}`}
      title="Ahmadun Agro Logo"
    >
      {/* Hidden file input for direct 1-click upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Main logo rendering */}
      {logoSrc ? (
        <div className={`relative flex items-center justify-center shrink-0 ${current.heightClass} max-w-[200px]`}>
          <img
            src={logoSrc}
            alt="Ahmadun Agro"
            className="h-full w-auto max-w-full object-contain"
            onError={() => {
              // If /logo.png fails, fallback to clean vector
              if (logoSrc === '/logo.png') {
                setLogoSrc(null);
              }
            }}
          />
        </div>
      ) : (
        /* Clean Vector representation with proper leaf "A" typography */
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center shrink-0 w-10 h-10">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="52" cy="54" r="14" fill="#E5A823" />
              <path d="M 28 66 C 36 60, 48 58, 62 64 C 68 67, 74 72, 80 73 C 65 72, 48 71, 35 77 Z" fill="#1B5A2B" />
              <path d="M 33 72 C 42 66, 56 65, 70 70 C 58 75, 46 78, 38 82 Z" fill="#0F4420" />
              <path d="M 52 14 C 44 26, 32 38, 24 50 C 22 53, 27 55, 30 52 C 38 42, 46 32, 52 22 Z" fill="#43A047" />
              <path d="M 52 14 C 54 28, 62 42, 70 54 C 76 63, 84 68, 88 67 C 82 66, 74 61, 68 52 C 60 40, 55 26, 52 14 Z" fill="#0F4420" />
              <path d="M 22 62 C 34 50, 48 44, 66 43 C 74 42, 78 45, 74 48 C 60 49, 44 54, 30 68 C 26 72, 20 70, 22 62 Z" fill="#2E7D32" />
            </svg>
          </div>
          {showWordmark && (
            <div className="flex flex-col leading-none">
              <span
                className={`font-serif-brand font-bold tracking-tight text-[#0F4420] dark:text-[#EAF0EC] ${current.fontSize}`}
              >
                Ahmadun
              </span>
              <span className={`uppercase font-bold tracking-[0.2em] text-[#E5A823] mt-0.5 ${current.subSize}`}>
                Agro
              </span>
            </div>
          )}
        </div>
      )}

      {/* Upload hover button for quick custom logo replacement */}
      {allowDirectUpload && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
              fileInputRef.current?.click();
            }
          }}
          className="absolute -top-1 -right-1 p-1 rounded-full bg-[#0F4420] text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-xs cursor-pointer"
          title="আপনার আসল লোগো ফাইল আপলোড করুন"
        >
          <Upload className="w-3 h-3" />
        </span>
      )}
    </div>
  );
};

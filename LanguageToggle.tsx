import React from 'react';
import { useLanguage } from '../../i18n';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-1 rounded-lg bg-[#FBFAF4] border border-[#E4E7E1] dark:bg-[#0B1910] dark:border-[#1E3827] shadow-2xs ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer ${
          language === 'en'
            ? 'bg-[#0F4420] text-white shadow-xs'
            : 'text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC]'
        }`}
        aria-pressed={language === 'en'}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer ${
          language === 'bn'
            ? 'bg-[#0F4420] text-white shadow-xs'
            : 'text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC]'
        }`}
        aria-pressed={language === 'bn'}
      >
        বাংলা
      </button>
    </div>
  );
};

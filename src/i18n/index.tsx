import React, { createContext, useContext, useState, useEffect } from 'react';
import { en, TranslationKey } from './en';
import { bn } from './bn';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  formatCurrency: (amount: number) => string;
  formatNumber: (num: number) => string;
  formatDate: (dateStr: string) => string;
  toBengaliDigits: (input: string | number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const toBengaliDigits = (input: string | number): string => {
  return String(input).replace(/[0-9]/g, (w) => BENGALI_DIGITS[+w]);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ahmadun_lang') as Language | null;
    if (saved === 'en' || saved === 'bn') return saved;
    // Check Bangladesh timezone or locale
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const navLang = navigator.language || '';
      if (tz === 'Asia/Dhaka' || navLang.startsWith('bn')) {
        return 'bn';
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('ahmadun_lang', language);
    document.documentElement.lang = language;
    if (language === 'bn') {
      document.title = "আহমাদুন এগ্রো | বাংলাদেশে কৃষি বিনিয়োগ প্ল্যাটফর্ম";
    } else {
      document.title = "Ahmadun Agro | Agriculture Investment Bangladesh";
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const dict = language === 'bn' ? bn : en;
    let str = dict[key] || en[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        const valStr = language === 'bn' && typeof v === 'number' ? toBengaliDigits(v) : String(v);
        str = str.replace(new RegExp(`{${k}}`, 'g'), valStr);
      });
    }
    return str;
  };

  const formatCurrency = (amount: number): string => {
    if (language === 'bn') {
      const formatted = new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0,
      }).format(amount);
      return `৳ ${toBengaliDigits(formatted)}`;
    } else {
      const formatted = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
      }).format(amount);
      return `৳ ${formatted}`;
    }
  };

  const formatNumber = (num: number): string => {
    if (language === 'bn') {
      const formatted = new Intl.NumberFormat('en-IN').format(num);
      return toBengaliDigits(formatted);
    }
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDate = (dateStr: string): string => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      if (language === 'bn') {
        const monthsBn = [
          'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
          'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
        ];
        const day = toBengaliDigits(d.getDate());
        const month = monthsBn[d.getMonth()];
        const year = toBengaliDigits(d.getFullYear());
        return `${day} ${month}, ${year}`;
      } else {
        return d.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
      }
    } catch {
      return dateStr;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        formatCurrency,
        formatNumber,
        formatDate,
        toBengaliDigits,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../i18n';

export const RiskBanner: React.FC<{ compact?: boolean; className?: string }> = ({
  compact = false,
  className = '',
}) => {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div
        className={`flex items-center gap-2 py-2 px-3 text-xs rounded-lg bg-[#F3EAD0]/70 border border-[#E5A823]/30 text-[#6B5116] dark:bg-[#382D13]/40 dark:border-[#E5A823]/20 dark:text-[#F2C94C] ${className}`}
      >
        <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-[#E5A823]" />
        <span>{t('riskDisclosure')}</span>
      </div>
    );
  }

  return (
    <div
      className={`p-3.5 rounded-xl bg-[#F3EAD0]/60 border border-[#E5A823]/30 text-[#6B5116] dark:bg-[#2A2312]/70 dark:border-[#E5A823]/30 dark:text-[#F2C94C] flex items-start gap-3 text-xs leading-relaxed ${className}`}
    >
      <ShieldAlert className="w-4 h-4 shrink-0 text-[#E5A823] mt-0.5" />
      <div>
        <strong className="font-semibold block mb-0.5">{t('riskDisclosure')}</strong>
        <p className="opacity-90">{t('riskDisclosureFull')}</p>
      </div>
    </div>
  );
};

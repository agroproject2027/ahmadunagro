import React from 'react';
import { X, Calendar, MapPin, TrendingUp, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onInvestClick: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onInvestClick,
}) => {
  const { t, language, formatCurrency, toBengaliDigits } = useLanguage();
  const { currentUser } = useApp();

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-8 rounded-2xl bg-[#FBFAF4] dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-2xl overflow-hidden text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/60 text-[#1B2420] dark:text-white hover:bg-white dark:hover:bg-black cursor-pointer shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Image Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
          <img
            src={project.images[0]}
            alt={project.name_en}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-[#E5A823] text-[#0F4420] mb-2">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-brand leading-tight">
              {language === 'bn' ? project.name_bn : project.name_en}
            </h2>
            <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#F2C94C]" />
              <span>{language === 'bn' ? project.location_bn : project.location_en}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827]">
            <div>
              <span className="text-[11px] text-[#5C6660] dark:text-[#95A69B] block">
                {t('targetFund')}
              </span>
              <span className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#F2C94C]">
                {formatCurrency(project.target_amount)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#5C6660] dark:text-[#95A69B] block">
                {t('minEntry')}
              </span>
              <span className="text-base font-bold text-[#1B2420] dark:text-[#EAF0EC]">
                {formatCurrency(project.min_investment)}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#5C6660] dark:text-[#95A69B] block">
                {t('expectedYield')}
              </span>
              <span className="text-base font-bold text-[#0F4420] dark:text-[#F2C94C] flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-[#E5A823]" />
                {language === 'bn' ? `${toBengaliDigits(project.expected_return)}%` : `${project.expected_return}%`}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#5C6660] dark:text-[#95A69B] block">
                {t('duration')}
              </span>
              <span className="text-base font-bold text-[#1B2420] dark:text-[#EAF0EC] flex items-center gap-1">
                <Calendar className="w-4 h-4 text-[#5C6660]" />
                {language === 'bn' ? `${toBengaliDigits(project.duration_months)} ${t('months')}` : `${project.duration_months} ${t('months')}`}
              </span>
            </div>
          </div>

          {/* Funding Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                {t('fundedSoFar')}: {formatCurrency(project.funded_amount)} ({language === 'bn' ? `${toBengaliDigits(project.progress)}%` : `${project.progress}%`})
              </span>
              <span className="text-[#5C6660] dark:text-[#95A69B]">
                {formatCurrency(project.target_amount - project.funded_amount)} {language === 'bn' ? 'অবশিষ্ট' : 'remaining'}
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full bg-[#0F4420] dark:bg-[#E5A823] transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, project.progress)}%` }}
              />
            </div>
          </div>

          {/* Project Description */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F4420] dark:text-[#F2C94C] mb-2">
              {language === 'bn' ? 'প্রকল্পের বিবরণ ও রূপরেখা' : 'Project Scope & Feasibility'}
            </h4>
            <p className="text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
              {language === 'bn' ? project.description_bn : project.description_en}
            </p>
          </div>

          {/* Operational Updates */}
          {project.updates && project.updates.length > 0 && (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F4420] dark:text-[#F2C94C] mb-3">
                {language === 'bn' ? 'খামারের বাস্তব অগ্রগতি' : 'Operational Farm Updates'}
              </h4>
              <div className="space-y-3">
                {project.updates.map((upd) => (
                  <div
                    key={upd.id}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F4420] dark:text-[#F2C94C]" />
                        {language === 'bn' ? upd.title_bn : upd.title_en}
                      </span>
                      <span className="text-[10px] text-[#5C6660] dark:text-[#95A69B]">
                        {upd.date}
                      </span>
                    </div>
                    <p className="text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
                      {language === 'bn' ? upd.content_bn : upd.content_en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risk Note */}
          <div className="p-3.5 rounded-xl bg-[#F3EAD0]/50 dark:bg-[#382D13]/40 border border-[#E5A823]/30 text-xs text-[#6B5116] dark:text-[#F2C94C] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#E5A823] mt-0.5" />
            <div>
              <strong className="font-semibold block">{t('riskDisclosure')}</strong>
              <p className="opacity-90">{t('riskDisclosureFull')}</p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E4E7E1] dark:border-[#1E3827]">
            <div className="flex items-center gap-2 text-xs text-[#5C6660] dark:text-[#95A69B]">
              <ShieldCheck className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C]" />
              <span>{language === 'bn' ? 'নোটারি চুক্তিপত্র ও আইনি দলিলপত্র অন্তর্ভুক্ত' : 'Notarized partnership deed included'}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] text-xs font-semibold text-[#5C6660] dark:text-[#95A69B] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
              >
                {t('close')}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onInvestClick(project);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                {currentUser?.role === 'investor' ? t('investNowBtn') : t('heroCtaPrimary')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

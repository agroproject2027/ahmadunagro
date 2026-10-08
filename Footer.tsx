import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';
import { AhmadunLogo } from './AhmadunLogo';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#FBFAF4] dark:bg-[#07130B] border-t border-[#E4E7E1] dark:border-[#1E3827] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E4E7E1] dark:border-[#1E3827]">
          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigateTo('home')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') navigateTo('home');
              }}
              className="inline-block cursor-pointer text-left focus:outline-hidden"
              aria-label="Ahmadun Agro Home"
            >
              <AhmadunLogo size="sm" showWordmark={true} />
            </div>
            <p className="text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed max-w-md">
              {t('footerAbout')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#E3EFD5] text-[#0F4420] dark:bg-[#1B3F24] dark:text-[#F2C94C]">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Shariah Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#F3EAD0] text-[#6B5116] dark:bg-[#382D13] dark:text-[#F2C94C]">
                <HeartHandshake className="w-3.5 h-3.5" />
                Asset-Backed Farmland
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F4420] dark:text-[#F2C94C] mb-4">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {['home', 'projects', 'how-it-works', 'investors', 'about', 'contact'].map((view) => (
                <li key={view}>
                  <button
                    type="button"
                    onClick={() => navigateTo(view)}
                    className="text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC] transition-colors cursor-pointer"
                  >
                    {t(
                      view === 'home'
                        ? 'navHome'
                        : view === 'projects'
                        ? 'navProjects'
                        : view === 'how-it-works'
                        ? 'navHowItWorks'
                        : view === 'investors'
                        ? 'navInvestors'
                        : view === 'about'
                        ? 'navAbout'
                        : 'navContact'
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F4420] dark:text-[#F2C94C] mb-4">
              {t('footerLegal')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('privacy')}
                  className="text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC] transition-colors cursor-pointer"
                >
                  {t('navPrivacy')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('terms')}
                  className="text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC] transition-colors cursor-pointer"
                >
                  {t('navTerms')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('login')}
                  className="text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC] transition-colors cursor-pointer"
                >
                  {t('navLogin')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F4420] dark:text-[#F2C94C] mb-4">
              {t('officeAddressTitle')}
            </h4>
            <ul className="space-y-3 text-xs text-[#5C6660] dark:text-[#95A69B]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C] shrink-0 mt-0.5" />
                <span>{t('officeAddress')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C] shrink-0" />
                <span>{t('contactPhone')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C] shrink-0" />
                <span>{t('contactEmail')}</span>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-[#E4E7E1] dark:border-[#1E3827]">
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Risk Disclaimer Box */}
        <div className="my-8 p-4 rounded-xl bg-[#F3EAD0]/60 dark:bg-[#1E2E1D]/50 border border-[#E5A823]/30 text-xs text-[#6B5116] dark:text-[#F2C94C] leading-relaxed">
          <strong className="font-semibold block mb-1">
            {t('riskDisclosure')}
          </strong>
          <p className="opacity-90">{t('footerNotice')}</p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C6660] dark:text-[#95A69B] gap-4">
          <p>© {new Date().getFullYear()} {t('footerRights')}</p>
          <p className="text-[11px] opacity-75">
            Registered with Registrar of Joint Stock Companies and Firms (RJSC), Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
};

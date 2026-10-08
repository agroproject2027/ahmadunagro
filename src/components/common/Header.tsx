import React, { useState } from 'react';
import { Menu, X, Moon, Sun, ArrowRight, User } from 'lucide-react';
import { AhmadunLogo } from './AhmadunLogo';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser, currentView, navigateTo, darkMode, toggleDarkMode, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { view: 'home', label: t('navHome') },
    { view: 'projects', label: t('navProjects') },
    { view: 'how-it-works', label: t('navHowItWorks') },
    { view: 'investors', label: t('navInvestors') },
    { view: 'about', label: t('navAbout') },
    { view: 'contact', label: t('navContact') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBFAF4]/95 dark:bg-[#0B1910]/95 backdrop-blur-md border-b border-[#E4E7E1] dark:border-[#1E3827] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0F4420] rounded-xl"
            aria-label="Ahmadun Agro Home"
          >
            <AhmadunLogo size="sm" showWordmark={true} />
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  type="button"
                  onClick={() => navigateTo(link.view)}
                  className={`transition-colors cursor-pointer py-1 border-b-2 ${
                    isActive
                      ? 'text-[#0F4420] dark:text-[#F2C94C] border-[#0F4420] dark:border-[#F2C94C] font-semibold'
                      : 'text-[#5C6660] dark:text-[#95A69B] border-transparent hover:text-[#0F4420] dark:hover:text-[#EAF0EC]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />

            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#E5A823]" /> : <Moon className="w-4 h-4" />}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    currentUser.role === 'admin'
                      ? navigateTo('admin', { adminTab: 'overview' })
                      : navigateTo('portal', { investorTab: 'portfolio' })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F4420] text-white hover:bg-[#1B5A2B] transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>
                    {currentUser.role === 'admin' ? t('navAdminLogin') : t('navPortal')}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-2 text-xs text-[#5C6660] dark:text-[#95A69B] hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                >
                  {t('signOut')}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F4420] text-white hover:bg-[#1B5A2B] transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                <span>{t('navLogin')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E4E7E1] dark:border-[#1E3827] bg-[#FBFAF4] dark:bg-[#0B1910] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.view}
                type="button"
                onClick={() => {
                  navigateTo(link.view);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                  currentView === link.view
                    ? 'bg-[#E3EFD5] text-[#0F4420] dark:bg-[#1B3F24] dark:text-[#F2C94C] font-semibold'
                    : 'text-[#5C6660] dark:text-[#95A69B] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E4E7E1] dark:border-[#1E3827] flex items-center justify-between">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="flex items-center gap-2 text-xs text-[#5C6660] dark:text-[#95A69B]"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#E5A823]" /> : <Moon className="w-4 h-4" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  if (currentUser.role === 'admin') {
                    navigateTo('admin');
                  } else {
                    navigateTo('portal');
                  }
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F4420] text-white"
              >
                {currentUser.role === 'admin' ? t('navAdminLogin') : t('navPortal')}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  navigateTo('login');
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F4420] text-white"
              >
                {t('navLogin')}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

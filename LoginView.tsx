import React, { useState } from 'react';
import { AhmadunLogo } from '../common/AhmadunLogo';
import { LanguageToggle } from '../common/LanguageToggle';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { Lock, Mail, AlertCircle, ArrowLeft, CheckCircle2, X } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { t, language } = useLanguage();
  const { login, navigateTo } = useApp();

  const [role, setRole] = useState<Role>('investor');
  const [email, setEmail] = useState('tariq@investor.com');
  const [password, setPassword] = useState('investor123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = login(email, password, role);
      if (!res.success) {
        setError(res.error || t('authErrorInvalid'));
        setIsLoading(false);
      }
    }, 200);
  };

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setError(null);
    if (newRole === 'admin') {
      setEmail('admin@ahmadunagro.com');
      setPassword('admin123');
    } else {
      setEmail('tariq@investor.com');
      setPassword('investor123');
    }
  };

  const handleQuickFill = (quickEmail: string, quickPass: string, quickRole: Role) => {
    setRole(quickRole);
    setEmail(quickEmail);
    setPassword(quickPass);
    setError(null);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FBFAF4] dark:bg-[#0B1910] flex flex-col justify-between p-4 sm:p-6 transition-colors">
      {/* Top Bar with Language Toggle & Back to site */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </button>

        <LanguageToggle />
      </div>

      {/* Center Auth Card */}
      <div className="w-full max-w-md mx-auto my-auto py-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo on cream rounded container */}
          <AhmadunLogo size="lg" showWordmark={true} allowDirectUpload={true} />

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
              {t('authWelcome')}
            </h1>
            <p className="text-sm text-[#5C6660] dark:text-[#95A69B]">
              {t('authSignInSubtitle')}
            </p>
          </div>

          {/* Segmented Role Selector: Investor | Admin */}
          <div className="inline-flex p-1 rounded-xl bg-stone-200/60 dark:bg-stone-800/80 border border-[#E4E7E1] dark:border-[#1E3827] w-full max-w-xs">
            <button
              type="button"
              onClick={() => handleRoleChange('investor')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                role === 'investor'
                  ? 'bg-[#0F4420] text-white shadow-xs'
                  : 'text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC]'
              }`}
            >
              {t('authTabInvestor')}
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                role === 'admin'
                  ? 'bg-[#0F4420] text-white shadow-xs'
                  : 'text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC]'
              }`}
            >
              {t('authTabAdmin')}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-xs text-red-700 dark:text-red-300 flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] mb-1">
                {t('authEmail')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('authEmailPlaceholder')}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] text-sm text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                  {t('authPassword')}
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs text-[#0F4420] dark:text-[#F2C94C] hover:underline cursor-pointer"
                >
                  {t('authForgotPassword')}
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('authPasswordPlaceholder')}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] text-sm text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#0F4420] text-white text-sm font-bold hover:bg-[#1B5A2B] disabled:opacity-50 transition-colors cursor-pointer shadow-xs mt-2"
            >
              {isLoading ? t('authSigningIn') : t('authSignInBtn')}
            </button>
          </form>

          {/* Quick Fill Demo Pills */}
          <div className="w-full pt-4 border-t border-[#E4E7E1] dark:border-[#1E3827] text-left space-y-2">
            <span className="text-[11px] font-semibold text-[#5C6660] dark:text-[#95A69B] block">
              {t('authQuickFill')}
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@ahmadunagro.com', 'admin123', 'admin')}
                className="px-2.5 py-1.5 rounded-lg bg-[#E3EFD5] text-[#0F4420] dark:bg-[#1B3F24] dark:text-[#F2C94C] hover:opacity-90 font-medium cursor-pointer"
              >
                Admin (Kazi Raqibul)
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('tariq@investor.com', 'investor123', 'investor')}
                className="px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-[#1B2420] dark:text-[#EAF0EC] hover:bg-stone-200 dark:hover:bg-stone-700 font-medium cursor-pointer"
              >
                Investor 1 (Tariqul)
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('nusrat@investor.com', 'investor123', 'investor')}
                className="px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-[#1B2420] dark:text-[#EAF0EC] hover:bg-stone-200 dark:hover:bg-stone-700 font-medium cursor-pointer"
              >
                Investor 2 (Nusrat)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] p-6 text-left shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setIsForgotModalOpen(false);
                setForgotSubmitted(false);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg text-[#5C6660] hover:text-[#0F4420] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {forgotSubmitted ? (
              <div className="text-center py-4 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#0F4420] dark:text-[#F2C94C] mx-auto" />
                <h3 className="font-bold text-base text-[#0F4420] dark:text-[#F2C94C]">
                  {t('authResetSent')}
                </h3>
                <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                  {forgotEmail}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setForgotSubmitted(false);
                  }}
                  className="w-full py-2 rounded-xl bg-[#0F4420] text-white text-xs font-bold"
                >
                  {t('close')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <h3 className="font-bold text-base font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                    {t('authResetPassTitle')}
                  </h3>
                  <p className="text-xs text-[#5C6660] dark:text-[#95A69B] mt-1">
                    {t('authResetPassDesc')}
                  </p>
                </div>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0F4420] text-white text-xs font-bold"
                >
                  {t('submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer copyright note */}
      <div className="text-center text-xs text-[#5C6660] dark:text-[#95A69B] py-2">
        <p>© {new Date().getFullYear()} {t('brandName')}. {t('riskDisclosure')}</p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Download,
  FileText,
  User,
  ArrowRight,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Plus,
  ShieldCheck,
  Building,
  Menu,
  X,
  CreditCard,
} from 'lucide-react';
import { AhmadunLogo } from '../common/AhmadunLogo';
import { LanguageToggle } from '../common/LanguageToggle';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { RiskBanner } from '../common/RiskBanner';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Project, Investment, Payout, DocumentItem } from '../../types';

export const InvestorPortal: React.FC = () => {
  const { t, language, formatCurrency, toBengaliDigits, formatDate } = useLanguage();
  const {
    currentUser,
    logout,
    navigateTo,
    investments,
    payouts,
    documents,
    projects,
    requestNewInvestment,
    updateCurrentUser,
    investorTab,
    setInvestorTab,
  } = useApp();

  const [isInvestMoreOpen, setIsInvestMoreOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [investAmount, setInvestAmount] = useState<number>(100000);
  const [investNote, setInvestNote] = useState<string>('');
  const [investError, setInvestError] = useState<string | null>(null);
  const [investSuccess, setInvestSuccess] = useState(false);

  // Profile edit state
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileAddress, setProfileAddress] = useState(currentUser?.address || '');
  const [profileBank, setProfileBank] = useState(currentUser?.bankDetails || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // Period filter for returns chart
  const [period, setPeriod] = useState<'6M' | '1Y' | 'All'>('6M');

  // Filter investor data
  const myInvestments = investments.filter((i) => i.investor_id === currentUser?.id);
  const myPayouts = payouts.filter((p) => p.investor_id === currentUser?.id);
  const myDocuments = documents.filter((d) => d.investor_id === currentUser?.id);

  // Calculations for portfolio
  const activeInvestments = myInvestments.filter((i) => i.status === 'Active' || i.status === 'Completed');
  const totalInvested = activeInvestments.reduce((sum, i) => sum + i.amount, 0);
  const totalReturnsEarned = myPayouts
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPortfolioValue = totalInvested + totalReturnsEarned;

  // Next payout
  const upcomingPayouts = myPayouts.filter((p) => p.status === 'Scheduled' || p.status === 'Pending');
  const nextPayout = upcomingPayouts.length > 0 ? upcomingPayouts[0] : null;

  const navTabs = [
    { key: 'portfolio', label: t('tabPortfolio') },
    { key: 'investments', label: t('tabInvestments') },
    { key: 'returns', label: t('tabReturns') },
    { key: 'documents', label: t('tabDocuments') },
    { key: 'profile', label: t('tabProfile') },
  ];

  const handleOpenInvestMore = (defaultProjId?: string) => {
    setSelectedProjectId(defaultProjId || (projects.length > 0 ? projects[0].id : ''));
    const p = projects.find((pr) => pr.id === (defaultProjId || projects[0]?.id));
    setInvestAmount(p ? p.min_investment : 100000);
    setInvestError(null);
    setInvestSuccess(false);
    setIsInvestMoreOpen(true);
  };

  const handleInvestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInvestError(null);
    const res = requestNewInvestment(selectedProjectId, Number(investAmount), investNote);
    if (!res.success) {
      setInvestError(res.error || 'Unable to process allocation');
    } else {
      setInvestSuccess(true);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      phone: profilePhone,
      address: profileAddress,
      bankDetails: profileBank,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleDownloadStatement = () => {
    const headers = 'Project,Amount,Due Date,Paid Date,Status,Reference\n';
    const rows = myPayouts
      .map(
        (p) =>
          `"${p.project_name_en}",${p.amount},"${p.due_date}","${p.paid_date || ''}","${p.status}","${p.reference || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahmadun_statement_${currentUser?.name.replace(/\s+/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Bar chart simulated heights for returns over time
  const barData = [
    { label: 'May', height: '35%', amount: 18500 },
    { label: 'Jun', height: '45%', amount: 24000 },
    { label: 'Jul', height: '40%', amount: 22000 },
    { label: 'Aug', height: '60%', amount: 32000 },
    { label: 'Sep', height: '70%', amount: 38500 },
    { label: 'Oct', height: '90%', amount: 48500, current: true },
  ];

  return (
    <div className="min-h-screen bg-[#FBFAF4] dark:bg-[#07130B] flex flex-col transition-colors text-left">
      {/* 1. Top Navigation Bar (Matches Screenshot 2) */}
      <header className="sticky top-0 z-40 bg-[#FBFAF4]/95 dark:bg-[#07130B]/95 backdrop-blur-md border-b border-[#E4E7E1] dark:border-[#1E3827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Ahmadun Logo on cream container */}
            <div className="flex items-center gap-8">
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigateTo('home')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') navigateTo('home');
                }}
                className="cursor-pointer text-left focus:outline-hidden"
                aria-label="Ahmadun Agro Home"
              >
                <AhmadunLogo size="sm" showWordmark={true} />
              </div>

              {/* Navigation Tabs */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
                {navTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setInvestorTab(tab.key)}
                    className={`py-1 border-b-2 transition-colors cursor-pointer ${
                      investorTab === tab.key
                        ? 'border-[#0F4420] text-[#0F4420] dark:border-[#F2C94C] dark:text-[#F2C94C]'
                        : 'border-transparent text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right: Language toggle & Investor profile */}
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <NotificationDropdown />

              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#E4E7E1] dark:border-[#1E3827]">
                <span className="text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                  [{currentUser?.name || 'Tariqul Islam'}]
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="p-1.5 rounded-lg text-[#5C6660] hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                  title={t('signOut')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Submenu Tabs */}
        <div className="md:hidden flex items-center justify-around border-t border-[#E4E7E1] dark:border-[#1E3827] px-2 py-2 text-xs font-semibold overflow-x-auto scrollbar-none">
          {navTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setInvestorTab(tab.key)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
                investorTab === tab.key
                  ? 'bg-[#0F4420] text-white'
                  : 'text-[#5C6660] dark:text-[#95A69B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* 2. Main Portal Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* A. PORTFOLIO TAB (Matches Screenshot 2) */}
        {investorTab === 'portfolio' && (
          <div className="space-y-8">
            {/* Deep Green Hero Card */}
            <div className="rounded-3xl bg-[#0F4420] text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                {/* Left: Total portfolio value */}
                <div className="space-y-2">
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#F2C94C]/80 block">
                    {t('welcomeBack')}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif-brand">
                    {t('yourPortfolio')}
                  </h2>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif-brand text-[#E5A823] gold-glow tabular-nums pt-1">
                    {formatCurrency(totalPortfolioValue)}
                  </div>
                </div>

                {/* Right: Invested, Returns, and Invest More button */}
                <div className="flex flex-wrap items-end gap-6 sm:gap-10">
                  <div>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/70 block">
                      {t('portfolioInvested')}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-serif-brand text-white tabular-nums">
                      {formatCurrency(totalInvested)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/70 block">
                      {t('portfolioReturnsEarned')}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-serif-brand text-white tabular-nums">
                      {formatCurrency(totalReturnsEarned)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenInvestMore()}
                    className="px-6 py-3 rounded-xl bg-[#E5A823] text-[#0F4420] text-xs font-bold hover:bg-[#F2C94C] transition-colors cursor-pointer shadow-md whitespace-nowrap"
                  >
                    {t('investMoreBtn')}
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Row: Returns Over Time & Next Payout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Returns Over Time Bar Chart */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                    {t('returnsOverTime')}
                  </h3>
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-[10px] font-semibold text-[#5C6660]">
                    {(['6M', '1Y', 'All'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPeriod(p)}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          period === p ? 'bg-white dark:bg-[#122419] text-[#0F4420] shadow-2xs font-bold' : ''
                        }`}
                      >
                        [{p}]
                      </button>
                    ))}
                  </div>
                </div>

                {/* Minimalist Bar Chart */}
                <div className="h-44 flex items-end justify-between gap-3 pt-6 px-4">
                  {barData.map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="relative w-full flex items-end justify-center h-full">
                        <div
                          className={`w-full max-w-[48px] rounded-t-lg transition-all duration-300 ${
                            bar.current
                              ? 'bg-[#0F4420] dark:bg-[#E5A823]'
                              : 'bg-[#E3EFD5] dark:bg-[#1B3F24] hover:bg-[#0F4420]/60'
                          }`}
                          style={{ height: bar.height }}
                        />
                      </div>
                      <span className="text-[11px] text-[#5C6660] dark:text-[#95A69B] font-medium">
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Payout Card */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                    {t('nextPayout')}
                  </h3>
                  <div className="text-3xl font-bold font-serif-brand text-[#0F4420] dark:text-[#F2C94C] tabular-nums">
                    {nextPayout ? formatCurrency(nextPayout.amount) : formatCurrency(38500)}
                  </div>
                  <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                    {t('expectedOn')}{' '}
                    <strong className="text-[#1B2420] dark:text-[#EAF0EC]">
                      [{nextPayout ? formatDate(nextPayout.due_date) : '15 Nov, 2026'}]
                    </strong>
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4E7E1]/50 dark:border-[#1E3827]/50">
                  <button
                    type="button"
                    onClick={() => setInvestorTab('returns')}
                    className="text-xs font-semibold text-[#0F4420] dark:text-[#F2C94C] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>{t('viewSchedule')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section: My Investments Summary Table */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                  {t('myInvestments')}
                </h3>
                <button
                  type="button"
                  onClick={() => setInvestorTab('investments')}
                  className="text-xs font-semibold text-[#0F4420] dark:text-[#F2C94C] hover:underline cursor-pointer"
                >
                  {t('viewAll')}
                </button>
              </div>

              {myInvestments.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#5C6660]">
                  {t('noInvestmentsYet')}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-[#E4E7E1]/50 dark:divide-[#1E3827]/50">
                      {myInvestments.map((inv) => (
                        <tr key={inv.id} className="hover:bg-stone-50 dark:hover:bg-[#1B3F24]/20 transition-colors">
                          <td className="py-4 px-2">
                            <span className="font-bold text-sm text-[#1B2420] dark:text-[#EAF0EC] block font-serif-brand">
                              [{language === 'bn' ? inv.project_name_bn : inv.project_name_en}]
                            </span>
                            <span className="text-[11px] text-[#5C6660] dark:text-[#95A69B]">
                              [{inv.category}] · {language === 'bn' ? `শুরু: ${inv.requested_at}` : `Since ${inv.requested_at}`}
                            </span>
                          </td>
                          <td className="py-4 px-2 font-bold text-sm text-[#0F4420] dark:text-[#F2C94C] tabular-nums">
                            {formatCurrency(inv.amount)}
                          </td>
                          <td className="py-4 px-2 text-right">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                                inv.status === 'Active' || inv.status === 'Approved'
                                  ? 'bg-[#E3EFD5] text-[#0F4420] dark:bg-[#1B3F24] dark:text-[#F2C94C]'
                                  : inv.status === 'Pending'
                                  ? 'bg-[#F3EAD0] text-[#6B5116] dark:bg-[#382D13] dark:text-[#F2C94C]'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {t(
                                inv.status === 'Active' || inv.status === 'Approved'
                                  ? 'active'
                                  : inv.status === 'Pending'
                                  ? 'inReview'
                                  : 'rejected'
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <RiskBanner />
          </div>
        )}

        {/* B. INVESTMENTS TAB */}
        {investorTab === 'investments' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                  {t('tabInvestments')}
                </h3>
                <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                  {language === 'bn' ? 'আপনার সকল চলমান বরাদ্দ এবং প্রকল্পের সার্বিক অগ্রগতি' : 'Your allocated capital and agronomist inspection reports'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenInvestMore()}
                className="px-5 py-2.5 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer shadow-xs whitespace-nowrap self-start"
              >
                + {t('investMoreBtn')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myInvestments.map((inv) => {
                const project = projects.find((p) => p.id === inv.project_id);
                return (
                  <div
                    key={inv.id}
                    className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#E3EFD5] text-[#0F4420]">
                        {inv.category}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          inv.status === 'Active' ? 'bg-[#E3EFD5] text-[#0F4420]' : 'bg-[#F3EAD0] text-[#6B5116]'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold font-serif-brand text-[#1B2420] dark:text-[#EAF0EC]">
                        {language === 'bn' ? inv.project_name_bn : inv.project_name_en}
                      </h4>
                      <span className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                        Requested on {inv.requested_at}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-stone-50 dark:bg-[#0B1910] text-xs">
                      <div>
                        <span className="text-[10px] text-[#5C6660] block">Allocated Capital</span>
                        <strong className="text-sm text-[#0F4420] dark:text-[#F2C94C]">
                          {formatCurrency(inv.amount)}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#5C6660] block">Target Yield</span>
                        <strong className="text-sm text-[#1B2420] dark:text-[#EAF0EC]">
                          {inv.expected_return_pct}% Annual
                        </strong>
                      </div>
                    </div>

                    {project?.updates && project.updates.length > 0 && (
                      <div className="pt-2 border-t border-[#E4E7E1]/60 dark:border-[#1E3827]/60 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6660] block">
                          Latest Field Report
                        </span>
                        <p className="text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                          {language === 'bn' ? project.updates[0].title_bn : project.updates[0].title_en}
                        </p>
                        <p className="text-[11px] text-[#5C6660] dark:text-[#95A69B] line-clamp-2">
                          {language === 'bn' ? project.updates[0].content_bn : project.updates[0].content_en}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* C. RETURNS TAB */}
        {investorTab === 'returns' && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                  {t('tabReturns')}
                </h3>
                <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                  {language === 'bn' ? 'পরিশোধিত লভ্যাংশ ও আসন্ন পে-আউট সূচি' : 'Disbursed profits and upcoming distribution calendar'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadStatement}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'স্টেটমেন্ট ডাউনলোড (CSV)' : 'Download Statement (CSV)'}</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#E4E7E1] dark:border-[#1E3827] text-[#5C6660] dark:text-[#95A69B] uppercase font-bold text-[10px]">
                    <th className="py-3 px-3">Project</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Due Date</th>
                    <th className="py-3 px-3">Paid Date</th>
                    <th className="py-3 px-3">Reference</th>
                    <th className="py-3 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E7E1]/50 dark:divide-[#1E3827]/50">
                  {myPayouts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-[#1B3F24]/20 transition-colors">
                      <td className="py-3.5 px-3 font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                        {language === 'bn' ? p.project_name_bn : p.project_name_en}
                      </td>
                      <td className="py-3.5 px-3 font-bold text-[#0F4420] dark:text-[#F2C94C]">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                        {formatDate(p.due_date)}
                      </td>
                      <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                        {p.paid_date ? formatDate(p.paid_date) : '-'}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[11px] text-[#5C6660] dark:text-[#95A69B]">
                        {p.reference || '-'}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            p.status === 'Paid'
                              ? 'bg-[#E3EFD5] text-[#0F4420]'
                              : 'bg-[#F3EAD0] text-[#6B5116]'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* D. DOCUMENTS TAB */}
        {investorTab === 'documents' && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                {t('tabDocuments')}
              </h3>
              <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                {language === 'bn' ? 'নোটারি করা চুক্তিপত্র, অডিট রিপোর্ট ও কর প্রত্যয়নপত্র' : 'Notarized agreements, quarterly audit statements, and tax deduction certificates'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-[#FBFAF4] dark:bg-[#0B1910] flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E3EFD5] dark:bg-[#1B3F24] text-[#0F4420] dark:text-[#F2C94C] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1B2420] dark:text-[#EAF0EC] line-clamp-1">
                        {doc.title}
                      </h4>
                      <span className="text-[10px] text-[#5C6660] dark:text-[#95A69B] block">
                        {doc.category} · {doc.file_size} · {doc.uploaded_at}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Simulating secure download for ${doc.title}`)}
                    className="p-2 rounded-lg text-[#0F4420] dark:text-[#F2C94C] hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer"
                    title={t('download')}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* E. PROFILE TAB */}
        {investorTab === 'profile' && (
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-6">
            <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
              {t('tabProfile')}
            </h3>

            {profileSaved && (
              <div className="p-3 rounded-xl bg-[#E3EFD5] text-[#0F4420] text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('updateProfileSuccess')}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-[#5C6660] block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled
                  value={currentUser?.name || ''}
                  className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-[#E4E7E1] dark:border-[#1E3827]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#5C6660] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={currentUser?.email || ''}
                  className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-[#E4E7E1] dark:border-[#1E3827]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#1B2420] dark:text-[#EAF0EC] block mb-1">
                  Phone / Mobile
                </label>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#1B2420] dark:text-[#EAF0EC] block mb-1">
                  Postal Address
                </label>
                <input
                  type="text"
                  value={profileAddress}
                  onChange={(e) => setProfileAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#1B2420] dark:text-[#EAF0EC] block mb-1">
                  Bank / MFS Payment Account Details
                </label>
                <input
                  type="text"
                  value={profileBank}
                  onChange={(e) => setProfileBank(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Invest More Modal */}
      {isInvestMoreOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] p-6 text-left shadow-2xl">
            <button
              type="button"
              onClick={() => setIsInvestMoreOpen(false)}
              className="absolute top-4 right-4 p-1 text-[#5C6660] hover:text-[#0F4420] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {investSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#0F4420] dark:text-[#F2C94C] mx-auto" />
                <h3 className="font-bold text-lg font-serif-brand text-[#0F4420] dark:text-[#F2C94C]">
                  {language === 'bn' ? 'বরাদ্দ আবেদন সফলভাবে গৃহীত হয়েছে' : 'Allocation Request Submitted'}
                </h3>
                <p className="text-xs text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
                  {t('investRequestSuccess')}
                </p>
                <button
                  type="button"
                  onClick={() => setIsInvestMoreOpen(false)}
                  className="px-6 py-2 rounded-xl bg-[#0F4420] text-white text-xs font-bold"
                >
                  {t('close')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleInvestSubmit} className="space-y-4 text-xs">
                <div>
                  <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                    {t('modalInvestMoreTitle')}
                  </h3>
                  <p className="text-[11px] text-[#5C6660] dark:text-[#95A69B] mt-0.5">
                    {t('selectProjectPrompt')}
                  </p>
                </div>

                {investError && (
                  <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{investError}</span>
                  </div>
                )}

                <div>
                  <label className="font-semibold block mb-1">Project</label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => {
                      setSelectedProjectId(e.target.value);
                      const pr = projects.find((p) => p.id === e.target.value);
                      if (pr) setInvestAmount(pr.min_investment);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  >
                    {projects
                      .filter((p) => p.status === 'Active')
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {language === 'bn' ? p.name_bn : p.name_en} ({p.expected_return}% Yield)
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">{t('enterInvestmentAmount')}</label>
                  <input
                    type="number"
                    step="5000"
                    required
                    value={investAmount}
                    onChange={(e) => setInvestAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910] text-sm font-bold text-[#0F4420] dark:text-[#F2C94C]"
                  />
                  {projects.find((p) => p.id === selectedProjectId) && (
                    <span className="text-[10px] text-[#5C6660] block mt-1">
                      {t('minAllowedNote')}{' '}
                      {formatCurrency(
                        projects.find((p) => p.id === selectedProjectId)!.min_investment
                      )}
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-semibold block mb-1">Notes / Wire Reference</label>
                  <input
                    type="text"
                    value={investNote}
                    onChange={(e) => setInvestNote(e.target.value)}
                    placeholder="e.g. Bank transfer reference or plan"
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer shadow-xs"
                  >
                    {t('submitInvestmentRequest')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

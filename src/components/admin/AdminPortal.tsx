import React, { useState } from 'react';
import {
  Users,
  FolderKanban,
  FileText,
  BadgeDollarSign,
  Inbox,
  Settings,
  LayoutDashboard,
  LogOut,
  Search,
  Plus,
  Check,
  X,
  Eye,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Building,
  UserCheck,
  UserX,
  Menu,
} from 'lucide-react';
import { AhmadunLogo } from '../common/AhmadunLogo';
import { LanguageToggle } from '../common/LanguageToggle';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Project, UserProfile, Investment, Payout, DocumentItem, Lead } from '../../types';

export const AdminPortal: React.FC = () => {
  const { t, language, formatCurrency, toBengaliDigits, formatDate } = useLanguage();
  const {
    currentUser,
    logout,
    navigateTo,
    profiles,
    projects,
    investments,
    payouts,
    documents,
    leads,
    auditLogs,
    adminTab,
    setAdminTab,
    addInvestor,
    updateInvestorStatus,
    saveProject,
    approveInvestmentRequest,
    rejectInvestmentRequest,
    schedulePayoutAction,
    markPayoutAsPaid,
    uploadDocumentAction,
    updateLeadStatusAction,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modals
  const [isAddInvestorOpen, setIsAddInvestorOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isSchedulePayoutOpen, setIsSchedulePayoutOpen] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedInvestorDetail, setSelectedInvestorDetail] = useState<UserProfile | null>(null);

  // Approve / Reject modal state
  const [actionReq, setActionReq] = useState<{ id: string; type: 'approve' | 'reject'; name: string } | null>(null);
  const [actionNote, setActionNote] = useState('');

  // Mark Paid state
  const [payoutToPay, setPayoutToPay] = useState<Payout | null>(null);
  const [payRef, setPayRef] = useState('');

  // Forms
  const [newInvName, setNewInvName] = useState('');
  const [newInvEmail, setNewInvEmail] = useState('');
  const [newInvPhone, setNewInvPhone] = useState('');
  const [newInvAddress, setNewInvAddress] = useState('');
  const [newInvNid, setNewInvNid] = useState('');
  const [newInvBank, setNewInvBank] = useState('');
  const [newInvNotes, setNewInvNotes] = useState('');

  // Project form state
  const [projNameEn, setProjNameEn] = useState('');
  const [projNameBn, setProjNameBn] = useState('');
  const [projCategory, setProjCategory] = useState<Project['category']>('Tea Plantation');
  const [projTarget, setProjTarget] = useState(10000000);
  const [projMin, setProjMin] = useState(100000);
  const [projDuration, setProjDuration] = useState(24);
  const [projReturn, setProjReturn] = useState(18.5);
  const [projLocEn, setProjLocEn] = useState('Sylhet');
  const [projLocBn, setProjLocBn] = useState('সিলেট');
  const [projDescEn, setProjDescEn] = useState('');
  const [projDescBn, setProjDescBn] = useState('');
  const [projPublished, setProjPublished] = useState(true);

  // Payout form state
  const [schedInvestorId, setSchedInvestorId] = useState('');
  const [schedProjectId, setSchedProjectId] = useState('');
  const [schedAmount, setSchedAmount] = useState(25000);
  const [schedDate, setSchedDate] = useState('2026-12-15');
  const [schedRef, setSchedRef] = useState('PAY-Q4-REF');

  // Doc form state
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<DocumentItem['category']>('Agreement');
  const [docInvestorId, setDocInvestorId] = useState('');

  // Totals for Overview
  const totalCapitalInvested = investments
    .filter((i) => i.status === 'Active' || i.status === 'Completed')
    .reduce((sum, i) => sum + i.amount, 0);

  const activeInvestorsCount = profiles.filter((p) => p.role === 'investor' && p.active).length;
  const activeProjectsCount = projects.filter((p) => p.status === 'Active').length;
  const pendingPayoutsTotal = payouts
    .filter((p) => p.status === 'Pending' || p.status === 'Scheduled')
    .reduce((sum, p) => sum + p.amount, 0);

  const recentRequests = investments.slice(0, 5);

  const navMenuItems = [
    { key: 'overview', label: t('adminOverview'), icon: LayoutDashboard },
    { key: 'investors', label: t('adminInvestors'), icon: Users },
    { key: 'projects', label: t('adminProjects'), icon: FolderKanban },
    { key: 'requests', label: t('adminRequests'), icon: FileCheck },
    { key: 'payouts', label: t('adminPayouts'), icon: BadgeDollarSign },
    { key: 'documents', label: t('adminDocuments'), icon: FileText },
    { key: 'leads', label: t('adminLeads'), icon: Inbox },
    { key: 'settings', label: t('adminSettings'), icon: Settings },
  ];

  const handleOpenAddInvestor = () => {
    setNewInvName('');
    setNewInvEmail('');
    setNewInvPhone('');
    setNewInvAddress('');
    setNewInvNid('');
    setNewInvBank('');
    setNewInvNotes('');
    setIsAddInvestorOpen(true);
  };

  const handleSaveInvestor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvName || !newInvEmail) return;
    addInvestor({
      name: newInvName,
      email: newInvEmail,
      phone: newInvPhone,
      address: newInvAddress,
      language: 'bn',
      nid: newInvNid,
      bankDetails: newInvBank,
      notes: newInvNotes,
    });
    setIsAddInvestorOpen(false);
  };

  const handleOpenAddProject = (p?: Project) => {
    if (p) {
      setEditingProject(p);
      setProjNameEn(p.name_en);
      setProjNameBn(p.name_bn);
      setProjCategory(p.category);
      setProjTarget(p.target_amount);
      setProjMin(p.min_investment);
      setProjDuration(p.duration_months);
      setProjReturn(p.expected_return);
      setProjLocEn(p.location_en);
      setProjLocBn(p.location_bn);
      setProjDescEn(p.description_en);
      setProjDescBn(p.description_bn);
      setProjPublished(p.published);
    } else {
      setEditingProject(null);
      setProjNameEn('');
      setProjNameBn('');
      setProjCategory('Tea Plantation');
      setProjTarget(10000000);
      setProjMin(100000);
      setProjDuration(24);
      setProjReturn(18.5);
      setProjLocEn('Sylhet');
      setProjLocBn('সিলেট');
      setProjDescEn('');
      setProjDescBn('');
      setProjPublished(true);
    }
    setIsAddProjectOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    saveProject({
      id: editingProject?.id,
      name_en: projNameEn,
      name_bn: projNameBn,
      category: projCategory,
      target_amount: Number(projTarget),
      min_investment: Number(projMin),
      duration_months: Number(projDuration),
      expected_return: Number(projReturn),
      location_en: projLocEn,
      location_bn: projLocBn,
      description_en: projDescEn,
      description_bn: projDescBn,
      published: projPublished,
    });
    setIsAddProjectOpen(false);
  };

  const handleConfirmActionReq = () => {
    if (!actionReq) return;
    if (actionReq.type === 'approve') {
      approveInvestmentRequest(actionReq.id, actionNote);
    } else {
      rejectInvestmentRequest(actionReq.id, actionNote);
    }
    setActionReq(null);
    setActionNote('');
  };

  const handleSchedulePayout = (e: React.FormEvent) => {
    e.preventDefault();
    const inv = profiles.find((p) => p.id === schedInvestorId);
    const prj = projects.find((p) => p.id === schedProjectId);
    if (!inv || !prj) return;

    schedulePayoutAction({
      investor_id: inv.id,
      investor_name: inv.name,
      project_id: prj.id,
      project_name_en: prj.name_en,
      project_name_bn: prj.name_bn,
      amount: Number(schedAmount),
      due_date: schedDate,
      reference: schedRef,
    });
    setIsSchedulePayoutOpen(false);
  };

  const handleConfirmMarkPaid = () => {
    if (!payoutToPay) return;
    markPayoutAsPaid(payoutToPay.id, payRef || `TXN-REF-${Date.now().toString().slice(-6)}`);
    setPayoutToPay(null);
    setPayRef('');
  };

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    const inv = profiles.find((p) => p.id === docInvestorId);
    if (!inv) return;

    uploadDocumentAction({
      investor_id: inv.id,
      investor_name: inv.name,
      title: docTitle,
      category: docCategory,
      file_path: `/documents/${docTitle.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      file_size: '1.4 MB',
    });
    setIsUploadDocOpen(false);
    setDocTitle('');
  };

  const handleExportPayoutsCsv = () => {
    const headers = 'ID,Investor,Project,Amount,Due Date,Paid Date,Status,Reference\n';
    const rows = payouts
      .map(
        (p) =>
          `"${p.id}","${p.investor_name}","${p.project_name_en}",${p.amount},"${p.due_date}","${p.paid_date || ''}","${p.status}","${p.reference || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahmadun_agro_payouts_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex bg-[#FBFAF4] dark:bg-[#07130B] transition-colors text-left">
      {/* 1. Deep Green Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0F4420] text-white flex flex-col justify-between p-4 transform transition-transform duration-200 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-120'
        }`}
      >
        <div className="space-y-6">
          {/* Logo placed inside cream rounded container per brand rules */}
          <div className="pt-2">
            <AhmadunLogo size="md" showWordmark={true} />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setAdminTab(item.key);
                    setSelectedInvestorDetail(null);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#1B5A2B] text-white shadow-xs'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-[#F2C94C]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Admin profile */}
        <div className="pt-4 border-t border-white/15 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="truncate pr-2">
              <span className="block text-[10px] text-white/60">
                {currentUser?.role === 'admin' ? 'Admin' : 'User'}
              </span>
              <span className="font-semibold text-white truncate block">
                {currentUser?.name || 'Kazi Raqibul Hasan'}
              </span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="p-1.5 rounded-lg text-white/70 hover:text-red-300 hover:bg-white/10 cursor-pointer"
              title={t('signOut')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="w-full text-center text-[10px] text-white/60 hover:text-white py-1 block cursor-pointer"
          >
            ← {language === 'bn' ? 'পাবলিক ওয়েবসাইটে যান' : 'Go to Public Website'}
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* 2. Main Content Area */}
      <main className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#FBFAF4]/90 dark:bg-[#07130B]/90 backdrop-blur-md border-b border-[#E4E7E1] dark:border-[#1E3827] px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg lg:hidden text-[#5C6660] hover:text-[#0F4420]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#5C6660] dark:text-[#95A69B] block">
                {t('adminPortalTitle')}
              </span>
              <h1 className="text-2xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC] leading-tight">
                {t(
                  adminTab === 'overview'
                    ? 'adminOverview'
                    : adminTab === 'investors'
                    ? 'adminInvestors'
                    : adminTab === 'projects'
                    ? 'adminProjects'
                    : adminTab === 'requests'
                    ? 'adminRequests'
                    : adminTab === 'payouts'
                    ? 'adminPayouts'
                    : adminTab === 'documents'
                    ? 'adminDocuments'
                    : adminTab === 'leads'
                    ? 'adminLeads'
                    : 'adminSettings'
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <LanguageToggle />

            {/* Notification bell */}
            <NotificationDropdown />

            {/* Add investor action button */}
            <button
              type="button"
              onClick={handleOpenAddInvestor}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('adminAddInvestor')}</span>
            </button>
          </div>
        </header>

        {/* Content View Router */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* A. OVERVIEW TAB (Matches Screenshot 1) */}
          {adminTab === 'overview' && (
            <div className="space-y-8">
              {/* 4 Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Capital */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6660] dark:text-[#95A69B]">
                    {t('statTotalCapital')}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-serif-brand text-[#0F4420] dark:text-[#F2C94C] tabular-nums">
                    {formatCurrency(totalCapitalInvested)}
                  </div>
                </div>

                {/* Active Investors */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6660] dark:text-[#95A69B]">
                    {t('statActiveInvestors')}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-serif-brand text-[#1B2420] dark:text-[#EAF0EC] tabular-nums">
                    [{language === 'bn' ? toBengaliDigits(activeInvestorsCount) : activeInvestorsCount.toString().padStart(2, '0')}]
                  </div>
                </div>

                {/* Active Projects */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6660] dark:text-[#95A69B]">
                    {t('statActiveProjects')}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-serif-brand text-[#1B2420] dark:text-[#EAF0EC] tabular-nums">
                    [{language === 'bn' ? toBengaliDigits(activeProjectsCount) : activeProjectsCount.toString().padStart(2, '0')}]
                  </div>
                </div>

                {/* Pending Payouts */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6660] dark:text-[#95A69B]">
                    {t('statPendingPayouts')}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-serif-brand text-[#E5A823] dark:text-[#F2C94C] tabular-nums">
                    {formatCurrency(pendingPayoutsTotal)}
                  </div>
                </div>
              </div>

              {/* Lower Section: Recent Requests & Project Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Recent Investment Requests Table */}
                <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                      {t('recentRequestsTitle')}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setAdminTab('requests')}
                      className="text-xs font-semibold text-[#0F4420] dark:text-[#F2C94C] hover:underline cursor-pointer"
                    >
                      {t('viewAll')}
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-[#E4E7E1] dark:border-[#1E3827] text-[#5C6660] dark:text-[#95A69B] uppercase font-bold text-[10px]">
                          <th className="pb-3 px-2">{t('colInvestor')}</th>
                          <th className="pb-3 px-2">{t('colProject')}</th>
                          <th className="pb-3 px-2">{t('colAmount')}</th>
                          <th className="pb-3 px-2">{t('colStatus')}</th>
                          <th className="pb-3 px-2 text-right">{t('actions')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E7E1]/50 dark:divide-[#1E3827]/50">
                        {recentRequests.map((req) => (
                          <tr key={req.id} className="hover:bg-stone-50 dark:hover:bg-[#1B3F24]/20 transition-colors">
                            <td className="py-3 px-2 font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                              [{req.investor_name}]
                            </td>
                            <td className="py-3 px-2 text-[#5C6660] dark:text-[#95A69B]">
                              [{language === 'bn' ? req.project_name_bn : req.project_name_en}]
                            </td>
                            <td className="py-3 px-2 font-bold text-[#0F4420] dark:text-[#F2C94C] tabular-nums">
                              {formatCurrency(req.amount)}
                            </td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                                  req.status === 'Active' || req.status === 'Approved'
                                    ? 'bg-[#E3EFD5] text-[#0F4420] dark:bg-[#1B3F24] dark:text-[#F2C94C]'
                                    : req.status === 'Pending'
                                    ? 'bg-[#F3EAD0] text-[#6B5116] dark:bg-[#382D13] dark:text-[#F2C94C]'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {t(
                                  req.status === 'Active' || req.status === 'Approved'
                                    ? 'approved'
                                    : req.status === 'Pending'
                                    ? 'pending'
                                    : 'rejected'
                                )}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right space-x-1">
                              {req.status === 'Pending' && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setActionReq({ id: req.id, type: 'approve', name: req.investor_name })
                                    }
                                    className="p-1 rounded-md text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
                                    title={t('approveBtn')}
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setActionReq({ id: req.id, type: 'reject', name: req.investor_name })
                                    }
                                    className="p-1 rounded-md text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                                    title={t('rejectBtn')}
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Project Progress Widget */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-5">
                  <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                    {t('projectProgressTitle')}
                  </h3>

                  <div className="space-y-4">
                    {projects.map((proj, idx) => (
                      <div key={proj.id} className="space-y-1.5 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[#1B2420] dark:text-[#EAF0EC] line-clamp-1 pr-2">
                            [{language === 'bn' ? proj.name_bn : proj.name_en}]
                          </span>
                          <span className="text-[#5C6660] dark:text-[#95A69B] tabular-nums shrink-0">
                            [{language === 'bn' ? `${toBengaliDigits(proj.progress)}%` : `${proj.progress}%`}]
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              idx % 2 === 0 ? 'bg-[#0F4420]' : 'bg-[#E5A823]'
                            }`}
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenAddProject()}
                      className="w-full py-2.5 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] text-xs font-semibold text-[#0F4420] dark:text-[#F2C94C] hover:bg-stone-50 dark:hover:bg-[#1B3F24]/30 cursor-pointer"
                    >
                      + {t('addProjectBtn')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* B. INVESTORS TAB */}
          {adminTab === 'investors' && (
            <div className="space-y-6">
              {/* If an investor detail is selected */}
              {selectedInvestorDetail ? (
                <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-6">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedInvestorDetail(null)}
                      className="text-xs font-semibold text-[#0F4420] dark:text-[#F2C94C] hover:underline cursor-pointer"
                    >
                      ← {t('back')} {t('adminInvestors')}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updateInvestorStatus(selectedInvestorDetail.id, !selectedInvestorDetail.active);
                        setSelectedInvestorDetail({
                          ...selectedInvestorDetail,
                          active: !selectedInvestorDetail.active,
                        });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        selectedInvestorDetail.active
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {selectedInvestorDetail.active ? 'Deactivate Account' : 'Activate Account'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div className="space-y-1">
                      <span className="text-[11px] text-[#5C6660] block">{t('fieldFullName')}</span>
                      <strong className="text-base text-[#1B2420] dark:text-[#EAF0EC]">
                        {selectedInvestorDetail.name}
                      </strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] text-[#5C6660] block">{t('fieldEmail')}</span>
                      <strong className="text-sm text-[#1B2420] dark:text-[#EAF0EC]">
                        {selectedInvestorDetail.email}
                      </strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] text-[#5C6660] block">{t('fieldPhone')}</span>
                      <strong className="text-sm text-[#1B2420] dark:text-[#EAF0EC]">
                        {selectedInvestorDetail.phone}
                      </strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] text-[#5C6660] block">{t('fieldAddress')}</span>
                      <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                        {selectedInvestorDetail.address}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] text-[#5C6660] block">{t('fieldNid')}</span>
                      <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                        {selectedInvestorDetail.nid || 'N/A'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] text-[#5C6660] block">{t('fieldBank')}</span>
                      <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                        {selectedInvestorDetail.bankDetails || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Investor's active investments */}
                  <div className="pt-4 border-t border-[#E4E7E1] dark:border-[#1E3827] space-y-3">
                    <h4 className="text-sm font-bold text-[#0F4420] dark:text-[#EAF0EC]">
                      {t('myInvestments')}
                    </h4>
                    <div className="space-y-2">
                      {investments
                        .filter((i) => i.investor_id === selectedInvestorDetail.id)
                        .map((inv) => (
                          <div
                            key={inv.id}
                            className="p-3 rounded-xl bg-stone-50 dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] flex items-center justify-between text-xs"
                          >
                            <div>
                              <strong className="block text-[#1B2420] dark:text-[#EAF0EC]">
                                {language === 'bn' ? inv.project_name_bn : inv.project_name_en}
                              </strong>
                              <span className="text-[10px] text-[#5C6660]">
                                {inv.category} · {inv.requested_at}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-[#0F4420] dark:text-[#F2C94C] block">
                                {formatCurrency(inv.amount)}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E3EFD5] text-[#0F4420]">
                                {inv.status}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Investor List Table */
                <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6660]" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('searchPlaceholder')}
                        className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] text-xs bg-stone-50 dark:bg-[#0B1910]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleOpenAddInvestor}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer whitespace-nowrap"
                    >
                      + {t('adminAddInvestor')}
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-[#E4E7E1] dark:border-[#1E3827] text-[#5C6660] dark:text-[#95A69B] uppercase font-bold text-[10px]">
                          <th className="py-3 px-3">{t('fieldFullName')}</th>
                          <th className="py-3 px-3">{t('fieldEmail')}</th>
                          <th className="py-3 px-3">{t('colPhone')}</th>
                          <th className="py-3 px-3">{t('colStatus')}</th>
                          <th className="py-3 px-3">{t('colJoined')}</th>
                          <th className="py-3 px-3 text-right">{t('actions')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E7E1]/50 dark:divide-[#1E3827]/50">
                        {profiles
                          .filter(
                            (p) =>
                              p.role === 'investor' &&
                              (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                p.email.toLowerCase().includes(searchQuery.toLowerCase()))
                          )
                          .map((inv) => (
                            <tr key={inv.id} className="hover:bg-stone-50 dark:hover:bg-[#1B3F24]/20 transition-colors">
                              <td className="py-3.5 px-3 font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                                {inv.name}
                              </td>
                              <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                                {inv.email}
                              </td>
                              <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                                {inv.phone}
                              </td>
                              <td className="py-3.5 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                    inv.active
                                      ? 'bg-[#E3EFD5] text-[#0F4420]'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {inv.active ? t('active') : 'Inactive'}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                                {inv.joinedDate}
                              </td>
                              <td className="py-3.5 px-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => setSelectedInvestorDetail(inv)}
                                  className="px-2.5 py-1 rounded-lg border border-[#E4E7E1] dark:border-[#1E3827] text-xs font-semibold text-[#0F4420] dark:text-[#F2C94C] hover:bg-stone-100 dark:hover:bg-[#1B3F24]/30 cursor-pointer"
                                >
                                  {t('details')}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* C. PROJECTS TAB */}
          {adminTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                  {t('adminProjects')}
                </h3>
                <button
                  type="button"
                  onClick={() => handleOpenAddProject()}
                  className="px-4 py-2 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer"
                >
                  + {t('addProjectBtn')}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-[#E3EFD5] text-[#0F4420]">
                        {proj.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          proj.published ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {proj.published ? '● Published' : '○ Draft'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold font-serif-brand text-[#1B2420] dark:text-[#EAF0EC]">
                        {language === 'bn' ? proj.name_bn : proj.name_en}
                      </h4>
                      <p className="text-xs text-[#5C6660] dark:text-[#95A69B] line-clamp-2 mt-1">
                        {language === 'bn' ? proj.description_bn : proj.description_en}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#5C6660]">{t('targetFund')}</span>
                        <strong className="text-[#0F4420] dark:text-[#F2C94C]">
                          {formatCurrency(proj.target_amount)}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5C6660]">{t('fundedSoFar')}</span>
                        <span>{formatCurrency(proj.funded_amount)} ({proj.progress}%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5C6660]">{t('expectedYield')}</span>
                        <span className="font-semibold">{proj.expected_return}%</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E4E7E1] dark:border-[#1E3827] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          saveProject({ id: proj.id, published: !proj.published })
                        }
                        className="text-xs text-[#5C6660] dark:text-[#95A69B] hover:underline cursor-pointer"
                      >
                        {proj.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenAddProject(proj)}
                        className="px-3 py-1.5 rounded-lg border border-[#E4E7E1] dark:border-[#1E3827] text-xs font-semibold text-[#0F4420] dark:text-[#F2C94C] hover:bg-stone-50 cursor-pointer"
                      >
                        {t('edit')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* D. INVESTMENT REQUESTS TAB */}
          {adminTab === 'requests' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-4">
              <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                {t('adminRequests')}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#E4E7E1] dark:border-[#1E3827] text-[#5C6660] dark:text-[#95A69B] uppercase font-bold text-[10px]">
                      <th className="py-3 px-3">{t('colInvestor')}</th>
                      <th className="py-3 px-3">{t('colProject')}</th>
                      <th className="py-3 px-3">{t('colAmount')}</th>
                      <th className="py-3 px-3">{t('date')}</th>
                      <th className="py-3 px-3">{t('colStatus')}</th>
                      <th className="py-3 px-3 text-right">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E7E1]/50 dark:divide-[#1E3827]/50">
                    {investments.map((inv) => (
                      <tr key={inv.id} className="hover:bg-stone-50 dark:hover:bg-[#1B3F24]/20 transition-colors">
                        <td className="py-3.5 px-3 font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                          {inv.investor_name}
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                          {language === 'bn' ? inv.project_name_bn : inv.project_name_en}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-[#0F4420] dark:text-[#F2C94C]">
                          {formatCurrency(inv.amount)}
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                          {inv.requested_at}
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              inv.status === 'Active' || inv.status === 'Approved'
                                ? 'bg-[#E3EFD5] text-[#0F4420]'
                                : inv.status === 'Pending'
                                ? 'bg-[#F3EAD0] text-[#6B5116]'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right space-x-2">
                          {inv.status === 'Pending' ? (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  setActionReq({ id: inv.id, type: 'approve', name: inv.investor_name })
                                }
                                className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-[11px] font-bold hover:bg-emerald-800 cursor-pointer"
                              >
                                {t('approveBtn')}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setActionReq({ id: inv.id, type: 'reject', name: inv.investor_name })
                                }
                                className="px-2.5 py-1 rounded-lg bg-red-700 text-white text-[11px] font-bold hover:bg-red-800 cursor-pointer"
                              >
                                {t('rejectBtn')}
                              </button>
                            </>
                          ) : (
                            <span className="text-[11px] text-[#5C6660]">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* E. PAYOUTS TAB */}
          {adminTab === 'payouts' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                  {t('adminPayouts')}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportPayoutsCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] hover:bg-stone-50 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('exportCsv')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (profiles.length > 1) setSchedInvestorId(profiles[1].id);
                      if (projects.length > 0) setSchedProjectId(projects[0].id);
                      setIsSchedulePayoutOpen(true);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer"
                  >
                    + {t('schedulePayoutBtn')}
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#E4E7E1] dark:border-[#1E3827] text-[#5C6660] dark:text-[#95A69B] uppercase font-bold text-[10px]">
                      <th className="py-3 px-3">{t('colInvestor')}</th>
                      <th className="py-3 px-3">{t('colProject')}</th>
                      <th className="py-3 px-3">{t('colAmount')}</th>
                      <th className="py-3 px-3">{t('colDueDate')}</th>
                      <th className="py-3 px-3">{t('colPaidDate')}</th>
                      <th className="py-3 px-3">{t('colRef')}</th>
                      <th className="py-3 px-3">{t('colStatus')}</th>
                      <th className="py-3 px-3 text-right">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E7E1]/50 dark:divide-[#1E3827]/50">
                    {payouts.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-[#1B3F24]/20 transition-colors">
                        <td className="py-3.5 px-3 font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                          {p.investor_name}
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                          {language === 'bn' ? p.project_name_bn : p.project_name_en}
                        </td>
                        <td className="py-3.5 px-3 font-bold text-[#0F4420] dark:text-[#F2C94C]">
                          {formatCurrency(p.amount)}
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                          {p.due_date}
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                          {p.paid_date || '-'}
                        </td>
                        <td className="py-3.5 px-3 font-mono text-[11px] text-[#5C6660] dark:text-[#95A69B]">
                          {p.reference || '-'}
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              p.status === 'Paid'
                                ? 'bg-[#E3EFD5] text-[#0F4420]'
                                : 'bg-[#F3EAD0] text-[#6B5116]'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          {p.status !== 'Paid' && (
                            <button
                              type="button"
                              onClick={() => {
                                setPayoutToPay(p);
                                setPayRef(`TXN-BEFTN-${Date.now().toString().slice(-6)}`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#0F4420] text-white text-[11px] font-bold hover:bg-[#1B5A2B] cursor-pointer"
                            >
                              {t('markPaidBtn')}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* F. DOCUMENTS TAB */}
          {adminTab === 'documents' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                  {t('adminDocuments')}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    if (profiles.length > 1) setDocInvestorId(profiles[1].id);
                    setIsUploadDocOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer"
                >
                  + {t('uploadDocBtn')}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#E4E7E1] dark:border-[#1E3827] text-[#5C6660] dark:text-[#95A69B] uppercase font-bold text-[10px]">
                      <th className="py-3 px-3">Title</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Investor</th>
                      <th className="py-3 px-3">Size</th>
                      <th className="py-3 px-3">Uploaded</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E7E1]/50 dark:divide-[#1E3827]/50">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-stone-50 dark:hover:bg-[#1B3F24]/20 transition-colors">
                        <td className="py-3.5 px-3 font-semibold text-[#1B2420] dark:text-[#EAF0EC] flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C] shrink-0" />
                          <span>{doc.title}</span>
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                          {doc.category}
                        </td>
                        <td className="py-3.5 px-3 text-[#1B2420] dark:text-[#EAF0EC]">
                          {doc.investor_name}
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                          {doc.file_size}
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                          {doc.uploaded_at}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Simulating secure PDF download: ${doc.title}`);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F4420] dark:text-[#F2C94C] hover:underline"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* G. LEADS & MESSAGES TAB */}
          {adminTab === 'leads' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-4">
              <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                {t('adminLeads')}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#E4E7E1] dark:border-[#1E3827] text-[#5C6660] dark:text-[#95A69B] uppercase font-bold text-[10px]">
                      <th className="py-3 px-3">Type</th>
                      <th className="py-3 px-3">Name</th>
                      <th className="py-3 px-3">Contact</th>
                      <th className="py-3 px-3">Message / Project</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E7E1]/50 dark:divide-[#1E3827]/50">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-stone-50 dark:hover:bg-[#1B3F24]/20 transition-colors">
                        <td className="py-3.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              l.type === 'Investor Request'
                                ? 'bg-[#E5A823]/20 text-[#6B5116]'
                                : 'bg-stone-100 dark:bg-stone-800 text-[#5C6660]'
                            }`}
                          >
                            {l.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                          {l.name}
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                          <div>{l.phone}</div>
                          <div className="text-[10px] opacity-80">{l.email}</div>
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B] max-w-xs">
                          {l.message}
                          {l.interest_project && (
                            <span className="block text-[10px] text-[#0F4420] dark:text-[#F2C94C] font-semibold">
                              Target: {l.interest_project}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-[#5C6660] dark:text-[#95A69B]">
                          {l.created_at}
                        </td>
                        <td className="py-3.5 px-3">
                          <select
                            value={l.status}
                            onChange={(e) => updateLeadStatusAction(l.id, e.target.value as Lead['status'])}
                            className="px-2 py-1 rounded-lg border border-[#E4E7E1] dark:border-[#1E3827] text-[11px] font-semibold bg-white dark:bg-[#0B1910]"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* H. SETTINGS TAB */}
          {adminTab === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {/* Profile Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-4">
                <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                  Admin Profile
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] text-[#5C6660] block">Name</label>
                    <input
                      type="text"
                      disabled
                      value={currentUser?.name || 'Kazi Raqibul Hasan'}
                      className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-[#E4E7E1] dark:border-[#1E3827]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#5C6660] block">Email</label>
                    <input
                      type="email"
                      disabled
                      value={currentUser?.email || 'admin@ahmadunagro.com'}
                      className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-[#E4E7E1] dark:border-[#1E3827]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#5C6660] block">Role</label>
                    <input
                      type="text"
                      disabled
                      value="Platform Superadmin"
                      className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-[#E4E7E1] dark:border-[#1E3827]"
                    />
                  </div>
                </div>
              </div>

              {/* Audit Log Feed */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-4">
                <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                  System Audit Trail
                </h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-[#0F4420] dark:text-[#F2C94C]">{log.action}</span>
                        <span className="text-[10px] text-[#5C6660]">{log.created_at}</span>
                      </div>
                      <p className="text-[#5C6660] dark:text-[#95A69B] text-[11px]">{log.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODALS */}

      {/* 1. Add Investor Modal */}
      {isAddInvestorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] p-6 text-left shadow-2xl">
            <button
              type="button"
              onClick={() => setIsAddInvestorOpen(false)}
              className="absolute top-4 right-4 p-1 text-[#5C6660] hover:text-[#0F4420]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC] mb-4">
              {t('modalAddInvestorTitle')}
            </h3>

            <form onSubmit={handleSaveInvestor} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">{t('fieldFullName')} *</label>
                <input
                  type="text"
                  required
                  value={newInvName}
                  onChange={(e) => setNewInvName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">{t('fieldEmail')} *</label>
                  <input
                    type="email"
                    required
                    value={newInvEmail}
                    onChange={(e) => setNewInvEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">{t('fieldPhone')} *</label>
                  <input
                    type="tel"
                    required
                    value={newInvPhone}
                    onChange={(e) => setNewInvPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">{t('fieldAddress')}</label>
                <input
                  type="text"
                  value={newInvAddress}
                  onChange={(e) => setNewInvAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">{t('fieldNid')}</label>
                  <input
                    type="text"
                    value={newInvNid}
                    onChange={(e) => setNewInvNid(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">{t('fieldBank')}</label>
                  <input
                    type="text"
                    value={newInvBank}
                    onChange={(e) => setNewInvBank(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">{t('fieldNotes')}</label>
                <input
                  type="text"
                  value={newInvNotes}
                  onChange={(e) => setNewInvNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0F4420] text-white font-bold hover:bg-[#1B5A2B] cursor-pointer"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add / Edit Project Modal */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg my-8 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] p-6 text-left shadow-2xl">
            <button
              type="button"
              onClick={() => setIsAddProjectOpen(false)}
              className="absolute top-4 right-4 p-1 text-[#5C6660] hover:text-[#0F4420]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC] mb-4">
              {t('modalProjectTitle')}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">{t('fieldProjectNameEn')} *</label>
                  <input
                    type="text"
                    required
                    value={projNameEn}
                    onChange={(e) => setProjNameEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">{t('fieldProjectNameBn')} *</label>
                  <input
                    type="text"
                    required
                    value={projNameBn}
                    onChange={(e) => setProjNameBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">{t('colCategory')}</label>
                <select
                  value={projCategory}
                  onChange={(e) => setProjCategory(e.target.value as Project['category'])}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                >
                  <option value="Tea Plantation">{t('categoryTea')}</option>
                  <option value="Organic Fruit Orchard">{t('categoryOrchard')}</option>
                  <option value="Dairy & Livestock">{t('categoryDairy')}</option>
                  <option value="Fisheries & Aquaculture">{t('categoryFishery')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">{t('fieldTargetAmount')}</label>
                  <input
                    type="number"
                    value={projTarget}
                    onChange={(e) => setProjTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">{t('fieldMinInvestment')}</label>
                  <input
                    type="number"
                    value={projMin}
                    onChange={(e) => setProjMin(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">{t('fieldExpectedReturn')}</label>
                  <input
                    type="number"
                    step="0.5"
                    value={projReturn}
                    onChange={(e) => setProjReturn(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">{t('fieldDurationMonths')}</label>
                  <input
                    type="number"
                    value={projDuration}
                    onChange={(e) => setProjDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">{t('fieldLocationEn')}</label>
                  <input
                    type="text"
                    value={projLocEn}
                    onChange={(e) => setProjLocEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">{t('fieldLocationBn')}</label>
                  <input
                    type="text"
                    value={projLocBn}
                    onChange={(e) => setProjLocBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">{t('fieldDescEn')}</label>
                <textarea
                  rows={2}
                  value={projDescEn}
                  onChange={(e) => setProjDescEn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">{t('fieldDescBn')}</label>
                <textarea
                  rows={2}
                  value={projDescBn}
                  onChange={(e) => setProjDescBn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={projPublished}
                  onChange={(e) => setProjPublished(e.target.checked)}
                />
                <label htmlFor="pubCheck" className="text-xs font-semibold">
                  {t('fieldPublished')}
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0F4420] text-white font-bold hover:bg-[#1B5A2B] cursor-pointer"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Approve / Reject Note Modal */}
      {actionReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] p-6 text-left shadow-2xl space-y-4">
            <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
              {actionReq.type === 'approve' ? t('modalApproveTitle') : t('modalRejectTitle')}
            </h3>
            <p className="text-xs text-[#5C6660]">
              Investor: <strong>{actionReq.name}</strong>
            </p>
            <div>
              <label className="text-xs font-semibold block mb-1">
                {t('approvalNotePrompt')}
              </label>
              <textarea
                rows={2}
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                placeholder="Reference or reason..."
                className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] text-xs bg-white dark:bg-[#0B1910]"
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActionReq(null)}
                className="flex-1 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] text-xs"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmActionReq}
                className={`flex-1 py-2 rounded-xl text-white text-xs font-bold ${
                  actionReq.type === 'approve' ? 'bg-[#0F4420]' : 'bg-red-700'
                }`}
              >
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Mark Paid Modal */}
      {payoutToPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] p-6 text-left shadow-2xl space-y-4">
            <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
              Record Payout Disbursement
            </h3>
            <p className="text-xs text-[#5C6660]">
              Amount: <strong>{formatCurrency(payoutToPay.amount)}</strong> to {payoutToPay.investor_name}
            </p>
            <div>
              <label className="text-xs font-semibold block mb-1">{t('fieldPayoutRef')}</label>
              <input
                type="text"
                value={payRef}
                onChange={(e) => setPayRef(e.target.value)}
                placeholder="BEFTN / NPSB / Cheque reference"
                className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] text-xs"
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPayoutToPay(null)}
                className="flex-1 py-2 rounded-xl border border-[#E4E7E1] text-xs"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmMarkPaid}
                className="flex-1 py-2 rounded-xl bg-[#0F4420] text-white text-xs font-bold"
              >
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Schedule Payout Modal */}
      {isSchedulePayoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] p-6 text-left shadow-2xl space-y-3 text-xs">
            <button
              type="button"
              onClick={() => setIsSchedulePayoutOpen(false)}
              className="absolute top-4 right-4 p-1 text-[#5C6660]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC] mb-2">
              {t('modalSchedulePayoutTitle')}
            </h3>

            <form onSubmit={handleSchedulePayout} className="space-y-3">
              <div>
                <label className="font-semibold block mb-1">{t('fieldSelectInvestor')}</label>
                <select
                  value={schedInvestorId}
                  onChange={(e) => setSchedInvestorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                >
                  {profiles
                    .filter((p) => p.role === 'investor')
                    .map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.name} ({inv.email})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">{t('fieldSelectProject')}</label>
                <select
                  value={schedProjectId}
                  onChange={(e) => setSchedProjectId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                >
                  {projects.map((prj) => (
                    <option key={prj.id} value={prj.id}>
                      {language === 'bn' ? prj.name_bn : prj.name_en}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">{t('fieldPayoutAmount')}</label>
                <input
                  type="number"
                  value={schedAmount}
                  onChange={(e) => setSchedAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">{t('fieldPayoutDueDate')}</label>
                <input
                  type="date"
                  value={schedDate}
                  onChange={(e) => setSchedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0F4420] text-white font-bold cursor-pointer"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Upload Document Modal */}
      {isUploadDocOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] p-6 text-left shadow-2xl space-y-3 text-xs">
            <button
              type="button"
              onClick={() => setIsUploadDocOpen(false)}
              className="absolute top-4 right-4 p-1 text-[#5C6660]"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC] mb-2">
              Upload Investor PDF
            </h3>

            <form onSubmit={handleUploadDoc} className="space-y-3">
              <div>
                <label className="font-semibold block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. Q3 2026 Audit Report"
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value as DocumentItem['category'])}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                >
                  <option value="Agreement">Agreement</option>
                  <option value="Statement">Statement</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Tax Certificate">Tax Certificate</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Assign to Investor</label>
                <select
                  value={docInvestorId}
                  onChange={(e) => setDocInvestorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#0B1910]"
                >
                  {profiles
                    .filter((p) => p.role === 'investor')
                    .map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0F4420] text-white font-bold cursor-pointer"
                >
                  {t('uploadDocBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

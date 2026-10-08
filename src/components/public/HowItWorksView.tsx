import React, { useState } from 'react';
import { ShieldCheck, FileCheck, Landmark, Eye, HeartHandshake, ArrowRight, Lock } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { BecomeInvestorModal } from './BecomeInvestorModal';
import { RiskBanner } from '../common/RiskBanner';

export const HowItWorksView: React.FC = () => {
  const { t, language } = useLanguage();
  const { currentUser, navigateTo } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStart = () => {
    if (currentUser?.role === 'investor') {
      navigateTo('portal', { investorTab: 'portfolio' });
    } else {
      setIsModalOpen(true);
    }
  };

  const detailedSteps = [
    {
      num: '01',
      icon: FileCheck,
      title: t('step1Title'),
      desc: t('step1Desc'),
      detailsEn: 'Identity KYC compliance includes National ID (NID) or Passport verification and source of funds validation under Bangladesh Bank regulatory directives.',
      detailsBn: 'বাংলাদেশ ব্যাংকের নির্দেশনা অনুযায়ী জাতীয় পরিচয়পত্র (NID) বা পাসপোর্ট এবং তহবিলের বৈধ উৎস যাচাইকরণ নিশ্চিত করা হয়।',
    },
    {
      num: '02',
      icon: Eye,
      title: t('step2Title'),
      desc: t('step2Desc'),
      detailsEn: 'Access complete project agronomy dossiers, soil pH analyses, rainfall records, and 5-year cash-flow forecasts before committing capital.',
      detailsBn: 'বিনিয়োগের পূর্বে মাটির বিশ্লেষণ, বৃষ্টিপাতের ইতিহাস এবং ৫ বছরের আর্থিক নগদ প্রবাহ পূর্বাভাস প্রতিবেদন পর্যালোচনার পূর্ণ সুযোগ।',
    },
    {
      num: '03',
      icon: Landmark,
      title: t('step3Title'),
      desc: t('step3Desc'),
      detailsEn: 'Bank transfer directly to segregated project escrow accounts. Receive non-judicial stamped partnership covenants signed by company directors.',
      detailsBn: 'নির্ধারিত আলাদা ব্যাংক অ্যাকাউন্টে তহবিল জমা দিন এবং কোম্পানির ব্যবস্থাপনা পরিচালকের স্বাক্ষরিত আইনি স্ট্যাম্পযুক্ত অংশীদারিত্ব চুক্তিপত্র পান।',
    },
    {
      num: '04',
      icon: HeartHandshake,
      title: t('step4Title'),
      desc: t('step4Desc'),
      detailsEn: 'Audited harvest sales proceeds are distributed on scheduled quarterly or bi-annual dates directly to your bank account with tax deduction certificates.',
      detailsBn: 'ফসল বা পণ্য বিক্রির পর নির্ধারিত প্রান্তিকে সরাসরি আপনার ব্যাংক অ্যাকাউন্টে মুনাফা পাঠানো হয় এবং কর প্রত্যয়নপত্র প্রদান করা হয়।',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14 text-left">
      <BecomeInvestorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
          {language === 'bn' ? 'কার্যপদ্ধতি ও নিরাপত্তা' : 'Operational Workflow'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
          {language === 'bn' ? 'কৃষি অংশীদারিত্ব কীভাবে পরিচালিত হয়' : 'How Farmland Partnership Works'}
        </h1>
        <p className="text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
          {language === 'bn'
            ? 'আহমাদুন এগ্রো জটিল কৃষিকাজকে প্রাতিষ্ঠানিক জবাবদিহিতা ও ডিজিটাল স্বচ্ছতার মাধ্যমে সহজ করে তুলেছে।'
            : 'A transparent, asset-backed model designed to bring institutional rigor to Bangladesh agriculture. Track your farms from seed to harvest with total peace of mind.'}
        </p>
      </div>

      <RiskBanner />

      {/* 4 Detailed Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {detailedSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-4 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#E3EFD5] dark:bg-[#1B3F24] text-[#0F4420] dark:text-[#F2C94C] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-mono text-2xl font-bold text-[#E5A823] tabular-nums">
                  {step.num}
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                {step.title}
              </h3>
              <p className="text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
                {step.desc}
              </p>
              <div className="pt-3 border-t border-[#E4E7E1]/60 dark:border-[#1E3827]/60 text-xs text-[#0F4420] dark:text-[#F2C94C] leading-relaxed">
                <strong>{language === 'bn' ? 'নিরাপত্তা দিক:' : 'Security Detail:'}</strong>{' '}
                {language === 'bn' ? step.detailsBn : step.detailsEn}
              </div>
            </div>
          );
        })}
      </div>

      {/* Shariah and Legal Safeguards */}
      <div className="p-8 rounded-2xl bg-[#FBFAF4] dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
            {language === 'bn' ? 'আইনি ও শরিয়াহ সুরক্ষা' : 'Governance & Safeguards'}
          </span>
          <h2 className="text-2xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
            {language === 'bn' ? 'আমাদের ৩ স্তরের বিনিয়োগকারী সুরক্ষা' : 'Our 3-Tiered Investor Protection Model'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#5C6660] dark:text-[#95A69B]">
          <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827]">
            <ShieldCheck className="w-6 h-6 text-[#0F4420] dark:text-[#F2C94C]" />
            <h4 className="font-bold text-sm text-[#1B2420] dark:text-[#EAF0EC]">
              {language === 'bn' ? 'বাস্তব জমি ও জীবজন্তু বন্ধক' : 'Physical Farmland Holding'}
            </h4>
            <p className="leading-relaxed">
              {language === 'bn'
                ? 'বিনিয়োগের অর্থ কোনো কাগজের ডেরিভেটিভ নয়—বরং শ্রীমঙ্গল ও রাজশাহীর নিবন্ধিত জমির দীর্ঘমেয়াদী লিজ ও জীবন্ত খামারের ওপর সরাসরি সংরক্ষিত।'
                : 'Capital is tied to actual physical assets: high-grade tea bush cultivars, registered Friesian heifers, and multi-year land leases.'}
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827]">
            <Lock className="w-6 h-6 text-[#0F4420] dark:text-[#F2C94C]" />
            <h4 className="font-bold text-sm text-[#1B2420] dark:text-[#EAF0EC]">
              {language === 'bn' ? 'স্বতন্ত্র অডিট নিরীক্ষা' : 'Independent Financial Audits'}
            </h4>
            <p className="leading-relaxed">
              {language === 'bn'
                ? 'আইসিএবি (ICAB) নিবন্ধিত অডিটর কর্তৃক বাৎসরিক আয়-ব্যয়ের হিসাব ও স্টক ব্যালেন্স নিরীক্ষা এবং সরাসরি অনলাইনে পোর্টাল নথিতে প্রকাশ।'
                : 'Annual financial balance sheets and harvest yield registers are reviewed by chartered accountants and accessible via the portal.'}
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827]">
            <Landmark className="w-6 h-6 text-[#0F4420] dark:text-[#F2C94C]" />
            <h4 className="font-bold text-sm text-[#1B2420] dark:text-[#EAF0EC]">
              {language === 'bn' ? 'শরিয়াহ কাউন্সিল অনুমোদন' : 'Shariah Advisory Board'}
            </h4>
            <p className="leading-relaxed">
              {language === 'bn'
                ? 'কোনো প্রকার সুদ বা নিষিদ্ধ লেনদেন ব্যতিরেকে নিখাদ মুদারাবা (লাভ-ক্ষতি অংশীদারিত্ব) নিয়মে পরিচালিত।'
                : 'Certified zero-interest profit-loss sharing structure reviewed by Islamic banking advisors.'}
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-start">
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer shadow-xs"
          >
            <span>{t('heroCtaPrimary')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, HelpCircle, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { BecomeInvestorModal } from './BecomeInvestorModal';
import { RiskBanner } from '../common/RiskBanner';

export const InvestorsView: React.FC = () => {
  const { t, language } = useLanguage();
  const { currentUser, navigateTo } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleStart = () => {
    if (currentUser?.role === 'investor') {
      navigateTo('portal', { investorTab: 'portfolio' });
    } else {
      setIsModalOpen(true);
    }
  };

  const reasons = [
    {
      titleEn: 'Inflation-Resistant Real Asset',
      titleBn: 'মুদ্রাস্ফীতির বিপরীতে সুরক্ষিত বাস্তব সম্পদ',
      descEn: 'Unlike depreciating fiat savings, agricultural output values naturally track and outpace domestic consumer price inflation in Bangladesh.',
      descBn: 'সাধারণ ব্যাংক সঞ্চয়ের মান মুদ্রাস্ফীতিতে কমলেও, কৃষিপণ্য ও খাদ্য উৎপাদনের বাজারমূল্য মুদ্রাস্ফীতির সাথে সরাসরি সামঞ্জস্য রেখে বাড়ে।',
    },
    {
      titleEn: 'Surging Urban & Export Demand',
      titleBn: 'ক্রমবর্ধমান দেশীয় ও আন্তর্জাতিক রফতানি চাহিদা',
      descEn: 'With 170M+ consumers and rising middle-class purchasing power, high-grade organic tea, dairy, and fruits command premium supermarket pricing.',
      descBn: '১৭ কোটিরও বেশি মানুষের দেশে নিরাপদ খাদ্য, অর্গানিক চা, খাঁটি দুধ ও রফতানিযোগ্য আমের চাহিদা অপ্রতিরোধ্য হারে বাড়ছে।',
    },
    {
      titleEn: 'Ethical Halal Wealth Accumulation',
      titleBn: 'নৈতিক ও হালাল উপায়ে সম্পদ বৃদ্ধি',
      descEn: 'Structured under classical Mudarabah covenants ensuring zero interest (riba) and pure profit-loss alignment backed by biological crops.',
      descBn: 'সুদবিহীন নিখাদ মুদারাবা চুক্তির অধীনে পরিচালিত হওয়ায় দ্বীনি সচেতন অংশীদারদের জন্য পূর্ণ মানসিক তৃপ্তির সুযোগ।',
    },
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14 text-left">
      <BecomeInvestorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
          {language === 'bn' ? 'বিনিয়োগ অংশীদারিত্ব' : 'Investor Relations'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
          {language === 'bn' ? 'কেন বাংলাদেশের কৃষিতে বিনিয়োগ করবেন?' : 'Why Invest in Bangladesh Agriculture?'}
        </h1>
        <p className="text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
          {language === 'bn'
            ? 'উচ্চ উর্বর মাটি, ১২ মাসের বহুমুখী উৎপাদন এবং দ্রুত সম্প্রসারণশীল খাদ্য বাজার বাংলাদেশকে বিশ্বের অন্যতম সেরা কৃষি বিনিয়োগ সম্ভাবনায় পরিণত করেছে।'
            : 'Explore how Ahmadun Agro bridges high-net-worth individuals, NRBs, and institutions with managed agro-farming ventures that generate tangible, sustainable cash flows.'}
        </p>
      </div>

      <RiskBanner />

      {/* 3 Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((r, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E3EFD5] dark:bg-[#1B3F24] text-[#0F4420] dark:text-[#F2C94C] flex items-center justify-center font-bold font-mono">
              0{idx + 1}
            </div>
            <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
              {language === 'bn' ? r.titleBn : r.titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
              {language === 'bn' ? r.descBn : r.descEn}
            </p>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="p-8 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
            {language === 'bn' ? 'বিনিয়োগ মাধ্যমের তুলনামূলক চিত্র' : 'Asset Class Comparison in Bangladesh'}
          </h3>
          <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
            {language === 'bn' ? 'প্রচলিত বিকল্পের সাথে আহমাদুন এগ্রোর কাঠামোগত তুলনা' : 'How managed agricultural farmland compares to conventional wealth instruments'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#E4E7E1] dark:border-[#1E3827] text-[#5C6660] dark:text-[#95A69B] uppercase font-bold text-[10px]">
                <th className="py-3 px-4">{language === 'bn' ? 'বৈশিষ্ট্য' : 'Attributes'}</th>
                <th className="py-3 px-4 text-[#0F4420] dark:text-[#F2C94C] font-extrabold bg-[#E3EFD5]/40 dark:bg-[#1B3F24]/30 rounded-t-lg">
                  {t('brandName')}
                </th>
                <th className="py-3 px-4">{language === 'bn' ? 'ব্যাংক ডিপিএস / এফডিআর' : 'Bank FDR / Savings'}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'পুঁজিবাজার (স্টক)' : 'Public Equities'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7E1]/50 dark:divide-[#1E3827]/50">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                  {language === 'bn' ? 'টার্গেট বাৎসরিক রিটার্ন' : 'Target Annual Yield'}
                </td>
                <td className="py-3.5 px-4 font-bold text-[#0F4420] dark:text-[#F2C94C] bg-[#E3EFD5]/40 dark:bg-[#1B3F24]/30">
                  16% - 22%
                </td>
                <td className="py-3.5 px-4 text-[#5C6660]">7% - 9%</td>
                <td className="py-3.5 px-4 text-[#5C6660]">Highly Volatile (-15% to +20%)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                  {language === 'bn' ? 'শরিয়াহ সম্মত' : 'Shariah Compliance'}
                </td>
                <td className="py-3.5 px-4 font-bold text-[#0F4420] dark:text-[#F2C94C] bg-[#E3EFD5]/40 dark:bg-[#1B3F24]/30">
                  100% Verified Mudarabah
                </td>
                <td className="py-3.5 px-4 text-[#5C6660]">Fixed Interest (Riba)</td>
                <td className="py-3.5 px-4 text-[#5C6660]">Requires Complex Screening</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                  {language === 'bn' ? 'বাস্তব সম্পদ ব্যাকআপ' : 'Tangible Asset Backing'}
                </td>
                <td className="py-3.5 px-4 font-bold text-[#0F4420] dark:text-[#F2C94C] bg-[#E3EFD5]/40 dark:bg-[#1B3F24]/30">
                  Farmland Leases & Livestock
                </td>
                <td className="py-3.5 px-4 text-[#5C6660]">Unsecured Bank Debt</td>
                <td className="py-3.5 px-4 text-[#5C6660]">Paper Share Certificates</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                  {language === 'bn' ? 'মুদ্রাস্ফীতি প্রতিরোধ' : 'Inflation Hedge'}
                </td>
                <td className="py-3.5 px-4 font-bold text-[#0F4420] dark:text-[#F2C94C] bg-[#E3EFD5]/40 dark:bg-[#1B3F24]/30">
                  High (Food Commodity Pricing)
                </td>
                <td className="py-3.5 px-4 text-[#5C6660]">Negative Real Returns</td>
                <td className="py-3.5 px-4 text-[#5C6660]">Medium / Macro Dependent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
            {language === 'bn' ? 'সাধারণ প্রশ্নাবলী' : 'Investor Queries'}
          </span>
          <h2 className="text-2xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
            {t('faqTitle')}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] bg-white dark:bg-[#122419] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#1B2420] dark:text-[#EAF0EC] hover:bg-stone-50 dark:hover:bg-[#1B3F24]/20 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#0F4420] dark:text-[#F2C94C] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed border-t border-[#E4E7E1]/50 dark:border-[#1E3827]/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl bg-[#0F4420] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-serif-brand">
            {language === 'bn' ? 'বিনিয়োগকারী হিসেবে তালিকাভুক্ত হতে চান?' : 'Ready to Request Your Investor Profile?'}
          </h3>
          <p className="text-xs text-white/80">
            {language === 'bn'
              ? 'সাধারণ তথ্য পূরণ করে প্রস্তাবনা পাঠান, আমাদের টিম দ্রুত যোগাযোগ করবে।'
              : 'Submit an investor request to receive contract agreements and operational feasibility summaries.'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleStart}
          className="px-6 py-3 rounded-xl bg-[#E5A823] text-[#0F4420] text-xs font-bold hover:bg-[#F2C94C] transition-colors cursor-pointer whitespace-nowrap"
        >
          {t('heroCtaPrimary')}
        </button>
      </div>
    </div>
  );
};

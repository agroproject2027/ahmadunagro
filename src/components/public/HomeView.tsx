import React, { useState } from 'react';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Calendar,
  ChevronDown,
  Sprout,
  Scale,
  Cpu,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import { BecomeInvestorModal } from './BecomeInvestorModal';
import { ProjectDetailModal } from './ProjectDetailModal';

export const HomeView: React.FC = () => {
  const { t, language, formatCurrency, toBengaliDigits } = useLanguage();
  const { projects, navigateTo, currentUser } = useApp();

  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [preselectedProjectName, setPreselectedProjectName] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const publishedProjects = projects.filter((p) => p.published).slice(0, 3);

  const handleOpenInvest = (project?: Project) => {
    if (project) {
      setPreselectedProjectName(language === 'bn' ? project.name_bn : project.name_en);
    } else {
      setPreselectedProjectName('');
    }
    if (currentUser?.role === 'investor') {
      navigateTo('portal', { investorTab: 'portfolio' });
    } else {
      setIsInvestorModalOpen(true);
    }
  };

  const trustMetrics = [
    { label: t('trustTotalAum'), val: t('trustTotalAumVal') },
    { label: t('trustInvestorsCount'), val: t('trustInvestorsVal') },
    { label: t('trustLandArea'), val: t('trustLandAreaVal') },
    { label: t('trustAvgReturn'), val: t('trustAvgReturnVal') },
  ];

  const whatWeDoCards = [
    {
      icon: Sprout,
      title: t('whatWeDoCard1Title'),
      desc: t('whatWeDoCard1Desc'),
      highlight: language === 'bn' ? '১০০% ভৌত জমি ও ফলজ বাগান' : '100% Tangible Land Leases',
    },
    {
      icon: Scale,
      title: t('whatWeDoCard2Title'),
      desc: t('whatWeDoCard2Desc'),
      highlight: language === 'bn' ? 'মুদারাবা ও মুশারাকা নীতিমালা' : 'Zero-Interest Profit Sharing',
    },
    {
      icon: Cpu,
      title: t('whatWeDoCard3Title'),
      desc: t('whatWeDoCard3Desc'),
      highlight: language === 'bn' ? 'ড্রিপ ইরিগেশন ও বায়োফ্লক' : 'Precision Sensor Telemetry',
    },
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* Modals */}
      <BecomeInvestorModal
        isOpen={isInvestorModalOpen}
        onClose={() => setIsInvestorModalOpen(false)}
        preselectedProjectName={preselectedProjectName}
      />
      <ProjectDetailModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
        onInvestClick={(p) => handleOpenInvest(p)}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EFD5] text-[#0F4420] dark:bg-[#1B3F24] dark:text-[#F2C94C] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C]" />
              <span>{t('brandTagline')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC] tracking-tight leading-[1.15]">
              {t('heroHeadline')}
            </h1>

            <p className="text-base sm:text-lg text-[#5C6660] dark:text-[#95A69B] leading-relaxed max-w-2xl">
              {t('heroSubtext')}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleOpenInvest()}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0F4420] text-white text-sm font-bold hover:bg-[#1B5A2B] transition-all duration-150 shadow-md cursor-pointer whitespace-nowrap"
              >
                <span>{t('heroCtaPrimary')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] text-sm font-semibold text-[#1B2420] dark:text-[#EAF0EC] hover:bg-stone-50 dark:hover:bg-[#1B3F24]/40 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{t('heroCtaSecondary')}</span>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-[#5C6660] dark:text-[#95A69B]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C]" />
                {language === 'bn' ? 'কোনো গোপন বা লুকানো ফি নেই' : 'No hidden management fees'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C]" />
                {language === 'bn' ? 'সরাসরি জমি ও ফসল মালিকানা' : 'Physical Farmland Backing'}
              </span>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E4E7E1] dark:border-[#1E3827] shadow-xl bg-stone-100 dark:bg-stone-900 group">
              <img
                src="/src/assets/images/ahmadun_tea_estate_1791464452726.jpg"
                alt="Ahmadun Organic Tea Estate Sylhet"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F2C94C] block mb-1">
                  Sreemangal, Sylhet
                </span>
                <h3 className="text-lg font-bold font-serif-brand">
                  {language === 'bn' ? 'আহমাদুন ভ্যালি অর্গানিক চা বাগান' : 'Ahmadun Valley Organic Tea Estate'}
                </h3>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-xs text-white/90">
                  <span>{language === 'bn' ? 'বাৎসরিক গড় রিটার্ন: ১৮.৫%' : 'Target Annual Yield: 18.5%'}</span>
                  <span className="font-semibold text-[#F2C94C]">78% Funded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <section className="bg-white dark:bg-[#122419] border-y border-[#E4E7E1] dark:border-[#1E3827] py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustMetrics.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-brand text-[#0F4420] dark:text-[#F2C94C] tabular-nums block">
                  {item.val}
                </span>
                <span className="text-xs sm:text-sm text-[#5C6660] dark:text-[#95A69B] font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What We Do (3 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
            {language === 'bn' ? 'আমাদের কার্যপ্রণালী' : 'Core Capabilities'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
            {t('whatWeDoTitle')}
          </h2>
          <p className="text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
            {t('whatWeDoSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whatWeDoCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] hover:border-[#0F4420]/40 dark:hover:border-[#F2C94C]/40 transition-all duration-200 space-y-4 text-left shadow-2xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E3EFD5] dark:bg-[#1B3F24] text-[#0F4420] dark:text-[#F2C94C] flex items-center justify-center transition-transform group-hover:scale-105">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#E5A823] block mb-1">
                    {card.highlight}
                  </span>
                  <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Projects (3 Cards with Progress Bar) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
              {language === 'bn' ? 'চলমান সুযোগ' : 'Active Allocations'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
              {t('featuredProjectsTitle')}
            </h2>
            <p className="text-sm text-[#5C6660] dark:text-[#95A69B]">
              {t('featuredProjectsSub')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('projects')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4420] dark:text-[#F2C94C] hover:underline cursor-pointer self-start md:self-end whitespace-nowrap"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs flex flex-col text-left group hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                <img
                  src={project.images[0]}
                  alt={project.name_en}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FBFAF4]/90 dark:bg-[#0B1910]/90 text-[#0F4420] dark:text-[#F2C94C] backdrop-blur-xs">
                  {project.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#E5A823] text-[#0F4420]">
                  {language === 'bn' ? `${toBengaliDigits(project.expected_return)}% বাৎসরিক` : `${project.expected_return}% ROI`}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC] line-clamp-1">
                    {language === 'bn' ? project.name_bn : project.name_en}
                  </h3>
                  <p className="text-xs text-[#5C6660] dark:text-[#95A69B] line-clamp-2 mt-1 leading-relaxed">
                    {language === 'bn' ? project.description_bn : project.description_en}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2 border-t border-[#E4E7E1]/60 dark:border-[#1E3827]/60">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#5C6660] dark:text-[#95A69B]">
                      {t('fundedSoFar')}
                    </span>
                    <span className="font-semibold text-[#0F4420] dark:text-[#F2C94C]">
                      {formatCurrency(project.funded_amount)} ({language === 'bn' ? `${toBengaliDigits(project.progress)}%` : `${project.progress}%`})
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-[#0F4420] dark:bg-[#E5A823] rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#5C6660] dark:text-[#95A69B]">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#5C6660] dark:text-[#95A69B]">
                      {t('minEntry')}
                    </span>
                    <span className="font-bold text-[#1B2420] dark:text-[#EAF0EC]">
                      {formatCurrency(project.min_investment)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#5C6660] dark:text-[#95A69B]">
                      {t('duration')}
                    </span>
                    <span className="font-bold text-[#1B2420] dark:text-[#EAF0EC]">
                      {language === 'bn' ? `${toBengaliDigits(project.duration_months)} ${t('months')}` : `${project.duration_months} ${t('months')}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProjectForModal(project)}
                    className="flex-1 py-2.5 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] hover:bg-stone-50 dark:hover:bg-[#1B3F24]/30 cursor-pointer"
                  >
                    {t('viewProjectBtn')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenInvest(project)}
                    className="flex-1 py-2.5 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    {t('investNowBtn')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How It Works (4 Steps) */}
      <section className="bg-white dark:bg-[#122419] border-y border-[#E4E7E1] dark:border-[#1E3827] py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
              {language === 'bn' ? 'স্বচ্ছ পদ্ধতি' : 'Streamlined Workflow'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
              {t('howItWorksTitle')}
            </h2>
            <p className="text-sm text-[#5C6660] dark:text-[#95A69B]">
              {t('howItWorksSub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative text-left">
            {[
              { title: t('step1Title'), desc: t('step1Desc') },
              { title: t('step2Title'), desc: t('step2Desc') },
              { title: t('step3Title'), desc: t('step3Desc') },
              { title: t('step4Title'), desc: t('step4Desc') },
            ].map((step, idx) => (
              <div key={idx} className="space-y-3 p-5 rounded-2xl bg-[#FBFAF4] dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827]">
                <div className="w-8 h-8 rounded-full bg-[#0F4420] text-white dark:bg-[#F2C94C] dark:text-[#0F4420] font-bold text-xs flex items-center justify-center font-mono">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
                  {step.title}
                </h3>
                <p className="text-xs text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Risk Points Strip */}
          <div className="mt-12 p-6 rounded-2xl bg-[#E3EFD5]/40 dark:bg-[#1B3F24]/30 border border-[#0F4420]/15 dark:border-[#1E3827] text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F4420] dark:text-[#F2C94C] mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              {t('riskTransparencyTitle')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#1B2420] dark:text-[#EAF0EC]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C] shrink-0 mt-0.5" />
                <span>{t('riskPoint1')}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C] shrink-0 mt-0.5" />
                <span>{t('riskPoint2')}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C] shrink-0 mt-0.5" />
                <span>{t('riskPoint3')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
            {language === 'bn' ? 'অংশীদারদের অভিজ্ঞতা' : 'Partner Perspectives'}
          </span>
          <h2 className="text-3xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
            {t('testimonialsTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-8 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-4">
            <p className="text-sm sm:text-base text-[#1B2420] dark:text-[#EAF0EC] font-serif-brand italic leading-relaxed">
              "{t('testimonial1Quote')}"
            </p>
            <div className="pt-2 border-t border-[#E4E7E1]/50 dark:border-[#1E3827]/50">
              <h4 className="text-sm font-bold text-[#0F4420] dark:text-[#F2C94C]">
                {t('testimonial1Author')}
              </h4>
              <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                {t('testimonial1Role')}
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs space-y-4">
            <p className="text-sm sm:text-base text-[#1B2420] dark:text-[#EAF0EC] font-serif-brand italic leading-relaxed">
              "{t('testimonial2Quote')}"
            </p>
            <div className="pt-2 border-t border-[#E4E7E1]/50 dark:border-[#1E3827]/50">
              <h4 className="text-sm font-bold text-[#0F4420] dark:text-[#F2C94C]">
                {t('testimonial2Author')}
              </h4>
              <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
                {t('testimonial2Role')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
            {language === 'bn' ? 'স্বচ্ছতা ও তথ্য' : 'Transparency'}
          </span>
          <h2 className="text-3xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
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
      </section>

      {/* 8. Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#0F4420] text-white p-8 sm:p-14 text-center space-y-6 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F2C94C]">
              {language === 'bn' ? 'আহমাদুন এগ্রো পার্টনারশিপ' : 'Ahmadun Agro Partnership'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-brand leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              {t('ctaSub')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleOpenInvest()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E5A823] text-[#0F4420] text-xs font-bold hover:bg-[#F2C94C] transition-colors cursor-pointer shadow-md whitespace-nowrap"
            >
              {t('ctaButton')}
            </button>
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              {t('navContact')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

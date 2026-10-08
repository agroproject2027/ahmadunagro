import React from 'react';
import { useLanguage } from '../../i18n';
import { RiskBanner } from '../common/RiskBanner';

export const PrivacyView: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
          {language === 'bn' ? 'আইনি ও নীতিমালা' : 'Legal & Compliance'}
        </span>
        <h1 className="text-3xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
          {t('navPrivacy')}
        </h1>
        <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
          {language === 'bn' ? 'সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬' : 'Last Updated: October 2026'}
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-[#5C6660] dark:text-[#95A69B] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B2420] dark:text-[#EAF0EC]">
            {language === 'bn' ? '১. তথ্যের সংগ্রহ ও উদ্দেশ্য' : '1. Information Collection & Usage'}
          </h2>
          <p>
            {language === 'bn'
              ? 'আহমাদুন এগ্রো বিনিয়োগকারীদের জাতীয় পরিচয়পত্র (NID), ব্যাংক বিবরণ এবং যোগাযোগের তথ্য শুধুমাত্র বাংলাদেশ ব্যাংক ও মানি লন্ডারিং প্রতিরোধ আইনের কড়া নির্দেশিকা পালনের উদ্দেশ্যে সংগ্রহ করে।'
              : 'Ahmadun Agro collects investor National Identification (NID) details, banking credentials, and contact records strictly for KYC verification, legal notarization of partnership contracts, and compliance with anti-money laundering regulations in Bangladesh.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B2420] dark:text-[#EAF0EC]">
            {language === 'bn' ? '২. তথ্যের নিরাপত্তা ও ডেটা প্রটেকশন' : '2. Data Protection & Storage'}
          </h2>
          <p>
            {language === 'bn'
              ? 'আমরা কোনো অবস্থাতেই বিনিয়োগকারীদের ব্যক্তিগত ও আর্থিক তথ্য তৃতীয় কোনো বাণিজ্যিক পক্ষের কাছে বিক্রি বা শেয়ার করি না।'
              : 'We implement bank-grade encryption protocols for private documents, investor registries, and payout histories. Under no circumstances is personal data sold or leased to third-party commercial entities.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B2420] dark:text-[#EAF0EC]">
            {language === 'bn' ? '৩. অডিট ও সরকারি নির্দেশনা' : '3. Statutory Audits & Disclosures'}
          </h2>
          <p>
            {language === 'bn'
              ? 'আইনগত কারণে আদালত বা বাংলাদেশ ব্যাংকের নিয়ন্ত্রক কর্তৃপক্ষের নির্দেশ থাকলে শুধুমাত্র অনুমোদিত প্রাতিষ্ঠানিক সংস্থার নিকট প্রয়োজনীয় হিসাব প্রদর্শিত হতে পারে।'
              : 'Disclosures are made solely where compelled by judicial order or statutory oversight bodies registered under the laws of Bangladesh.'}
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsView: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left">
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
          {language === 'bn' ? 'আইনি ও নীতিমালা' : 'Legal & Compliance'}
        </span>
        <h1 className="text-3xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
          {t('navTerms')}
        </h1>
        <p className="text-xs text-[#5C6660] dark:text-[#95A69B]">
          {language === 'bn' ? 'সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬' : 'Last Updated: October 2026'}
        </p>
      </div>

      <RiskBanner />

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-[#5C6660] dark:text-[#95A69B] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B2420] dark:text-[#EAF0EC]">
            {language === 'bn' ? '১. অংশীদারিত্বের প্রকৃতি (মুদারাবা)' : '1. Nature of Partnership (Mudarabah)'}
          </h2>
          <p>
            {language === 'bn'
              ? 'আহমাদুন এগ্রো কোনো সাধারণ ফিক্সড ডিপোজিট বা সুদি প্রতিষ্ঠান নয়। বিনিয়োগকারী হলেন সাহিব আল-মাল (পুঁজি প্রদানকারী) এবং আহমাদুন এগ্রো হলো মুদারিব (ব্যবস্থাপক)। ফসল বা কৃষিপণ্য বিক্রয়লব্ধ প্রকৃত মুনাফা পূর্বনির্ধারিত হারে বণ্টন করা হয়।'
              : 'Ahmadun Agro operates under Islamic Mudarabah principles where the investor acts as Rabb-ul-Mal (capital provider) and Ahmadun Agro acts as Mudarib (manager). Returns reflect actual net harvests and commercial sales.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B2420] dark:text-[#EAF0EC]">
            {language === 'bn' ? '২. ঝুঁকি ও প্রাকৃতিক বিপর্যয়' : '2. Inherent Agricultural Risks'}
          </h2>
          <p>
            {language === 'bn'
              ? 'কৃষি উৎপাদনে আবহাওয়া, প্রাকৃতিক দুর্যোগ এবং বাজারের ওঠানামা স্বাভাবিক বাস্তবতা। আহমাদুন এগ্রো বীমা ও আধুনিক প্রযুক্তির মাধ্যমে ঝুঁকি নিয়ন্ত্রণ করলেও কোনো রিটার্ন অপরিবর্তনীয় হিসেবে গ্যারান্টি প্রদান করে না।'
              : 'Investments involve risk. Natural events, climate variance, and agricultural commodity cycles may affect yields. Projected yields are based on historical agronomy benchmarks and are not guaranteed.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#1B2420] dark:text-[#EAF0EC]">
            {language === 'bn' ? '৩. মেয়াদের পূর্বে প্রত্যাহার' : '3. Liquidity & Tenures'}
          </h2>
          <p>
            {language === 'bn'
              ? 'কৃষি প্রকল্পের জৈবিক মেয়াদের পূর্বে মূলধন প্রত্যাহার সংশ্লিষ্ট প্রজেক্টের হার্ভেস্ট সাইকেল সম্পন্ন হওয়ার ওপর নির্ভরশীল এবং চুক্তিপত্রের ধারা অনুযায়ী নিষ্পন্ন হবে।'
              : 'Early redemption is subject to biological harvest cycles and secondary market assignment as defined in each specific project deed.'}
          </p>
        </section>
      </div>
    </div>
  );
};

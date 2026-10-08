import React from 'react';
import { Target, Compass, Award, Users, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';

export const AboutView: React.FC = () => {
  const { t, language } = useLanguage();
  const { navigateTo } = useApp();

  const team = [
    {
      name: t('team1Name'),
      role: t('team1Role'),
      bio: t('team1Bio'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: t('team2Name'),
      role: t('team2Role'),
      bio: t('team2Bio'),
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: t('team3Name'),
      role: t('team3Role'),
      bio: t('team3Bio'),
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
          {t('aboutTitle')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
          {t('aboutSub')}
        </h1>
        <p className="text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
          {t('brandSubtitle')}
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4 text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
          <h2 className="text-2xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
            {t('storyTitle')}
          </h2>
          <p>{t('storyP1')}</p>
          <p>{t('storyP2')}</p>
        </div>
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#E4E7E1] dark:border-[#1E3827] shadow-lg">
          <img
            src="/src/assets/images/ahmadun_mango_orchard_1791464463340.jpg"
            alt="Ahmadun Organic Agro Orchard"
            referrerPolicy="no-referrer"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
            <span className="font-semibold block">{language === 'bn' ? 'রাজশাহী আম বাগান প্রকল্প' : 'Rajshahi Orchard Harvest'}</span>
            <span className="opacity-80 text-[11px]">{language === 'bn' ? 'টেকসই কৃষি ও গ্রামীণ কর্মসংস্থান' : 'Sustainable Farmland Stewardship'}</span>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E3EFD5] dark:bg-[#1B3F24] text-[#0F4420] dark:text-[#F2C94C] flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
            {t('missionTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
            {t('missionDesc')}
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F3EAD0] dark:bg-[#382D13] text-[#6B5116] dark:text-[#F2C94C] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
            {t('visionTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
            {t('visionDesc')}
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
            {t('valuesTitle')}
          </span>
          <h2 className="text-2xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
            {language === 'bn' ? 'আমাদের পরিচালন মূলনীতিসমূহ' : 'Our Guiding Principles'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#0F4420] dark:text-[#F2C94C]" />
            <h4 className="font-bold text-base text-[#1B2420] dark:text-[#EAF0EC]">
              {t('val1Title')}
            </h4>
            <p className="text-xs text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
              {t('val1Desc')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-2">
            <Heart className="w-6 h-6 text-[#0F4420] dark:text-[#F2C94C]" />
            <h4 className="font-bold text-base text-[#1B2420] dark:text-[#EAF0EC]">
              {t('val2Title')}
            </h4>
            <p className="text-xs text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
              {t('val2Desc')}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-2">
            <Award className="w-6 h-6 text-[#0F4420] dark:text-[#F2C94C]" />
            <h4 className="font-bold text-base text-[#1B2420] dark:text-[#EAF0EC]">
              {t('val3Title')}
            </h4>
            <p className="text-xs text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
              {t('val3Desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
            {language === 'bn' ? 'নেতৃত্ব ও গভর্ন্যান্স' : 'Leadership & Governance'}
          </span>
          <h2 className="text-2xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
            {t('teamTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs p-6 space-y-4"
            >
              <img
                src={member.image}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#E4E7E1] dark:border-[#1E3827]"
              />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#0F4420] dark:text-[#F2C94C]">
                  {member.name}
                </h4>
                <p className="text-xs font-semibold text-[#5C6660] dark:text-[#95A69B]">
                  {member.role}
                </p>
                <p className="text-xs text-[#5C6660] dark:text-[#95A69B] leading-relaxed pt-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

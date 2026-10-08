import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';
import { Project, ProjectCategory } from '../../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { BecomeInvestorModal } from './BecomeInvestorModal';
import { RiskBanner } from '../common/RiskBanner';

export const ProjectsView: React.FC = () => {
  const { t, language, formatCurrency, toBengaliDigits } = useLanguage();
  const { projects, currentUser, navigateTo } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [preselectedProjectName, setPreselectedProjectName] = useState('');

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: t('categoryAll') },
    { key: 'Tea Plantation', label: t('categoryTea') },
    { key: 'Organic Fruit Orchard', label: t('categoryOrchard') },
    { key: 'Dairy & Livestock', label: t('categoryDairy') },
    { key: 'Fisheries & Aquaculture', label: t('categoryFishery') },
  ];

  const filteredProjects = projects.filter((p) => {
    if (!p.published) return false;
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.name_en.toLowerCase().includes(searchLower) ||
      p.name_bn.toLowerCase().includes(searchLower) ||
      p.location_en.toLowerCase().includes(searchLower) ||
      p.location_bn.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  const handleInvestAction = (proj: Project) => {
    if (currentUser?.role === 'investor') {
      navigateTo('portal', { investorTab: 'portfolio' });
    } else {
      setPreselectedProjectName(language === 'bn' ? proj.name_bn : proj.name_en);
      setIsInvestorModalOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-left">
      <BecomeInvestorModal
        isOpen={isInvestorModalOpen}
        onClose={() => setIsInvestorModalOpen(false)}
        preselectedProjectName={preselectedProjectName}
      />
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInvestClick={handleInvestAction}
      />

      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
          {language === 'bn' ? 'আমাদের প্রকল্পসমূহ' : 'Investment Portfolio'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
          {language === 'bn' ? 'যাচাইকৃত সক্রিয় কৃষি খামার প্রকল্পসমূহ' : 'Audited Active Agro Farming Ventures'}
        </h1>
        <p className="text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
          {language === 'bn'
            ? 'আহমাদুন এগ্রোর সকল প্রকল্প সরাসরি নিবন্ধিত কৃষিজমিতে প্রতিষ্ঠিত এবং পেশাদার কৃষিবিদ ও পশু চিকিৎসকদের দ্বারা সার্বক্ষণিক পরিচালিত।'
            : 'Explore asset-backed, Shariah-compliant agricultural projects across Bangladesh. Each project undergoes rigorous soil studies, commercial yield testing, and third-party accounting audits.'}
        </p>
      </div>

      <RiskBanner />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827]">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-[#0F4420] text-white shadow-xs'
                  : 'text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6660]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'প্রকল্প বা এলাকা খুঁজুন...' : 'Search ventures by name or district...'}
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-stone-50 dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-xs text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
          />
        </div>
      </div>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#122419] rounded-2xl border border-[#E4E7E1] dark:border-[#1E3827]">
          <p className="text-sm text-[#5C6660] dark:text-[#95A69B]">{t('noData')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl overflow-hidden bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div className="relative h-52 w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                <img
                  src={project.images[0]}
                  alt={project.name_en}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FBFAF4]/95 dark:bg-[#0B1910]/95 text-[#0F4420] dark:text-[#F2C94C] backdrop-blur-xs">
                  {project.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#E5A823] text-[#0F4420]">
                  {language === 'bn' ? `${toBengaliDigits(project.expected_return)}% বাৎসরিক` : `${project.expected_return}% Yield`}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#5C6660] dark:text-[#95A69B] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0F4420] dark:text-[#F2C94C]" />
                    <span>{language === 'bn' ? project.location_bn : project.location_en}</span>
                  </div>
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
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 py-2.5 rounded-xl border border-[#E4E7E1] dark:border-[#1E3827] text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] hover:bg-stone-50 dark:hover:bg-[#1B3F24]/30 cursor-pointer"
                  >
                    {t('viewProjectBtn')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInvestAction(project)}
                    className="flex-1 py-2.5 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    {t('investNowBtn')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

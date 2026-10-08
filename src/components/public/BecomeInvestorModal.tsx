import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';

interface BecomeInvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProjectName?: string;
}

export const BecomeInvestorModal: React.FC<BecomeInvestorModalProps> = ({
  isOpen,
  onClose,
  preselectedProjectName,
}) => {
  const { t, language } = useLanguage();
  const { submitLead, projects } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectInterest, setProjectInterest] = useState(preselectedProjectName || '');
  const [targetAmount, setTargetAmount] = useState('100,000');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    submitLead({
      type: 'Investor Request',
      name,
      phone,
      email,
      interest_project: projectInterest || 'General Portfolio',
      message: `${message ? message + ' | ' : ''}Target Allocation: ৳ ${targetAmount}`,
    });

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#FBFAF4] dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-2xl p-6 sm:p-8 overflow-hidden text-left">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#E3EFD5] dark:bg-[#1B3F24] flex items-center justify-center text-[#0F4420] dark:text-[#F2C94C]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#F2C94C]">
              {language === 'bn' ? 'আবেদন সফলভাবে গৃহীত হয়েছে' : 'Application Received'}
            </h3>
            <p className="text-sm text-[#5C6660] dark:text-[#95A69B] max-w-sm mx-auto leading-relaxed">
              {language === 'bn'
                ? 'ধন্যবাদ! আমাদের কমপ্লায়েন্স টিম আপনার তথ্য যাচাই করে ২৪ ঘণ্টার মধ্যে লগইন ক্রেডেনশিয়াল ও নোটারি চুক্তিপত্র পাঠাবে।'
                : 'Thank you! Our compliance director will review your details and issue your secure private investor credentials within 24 hours.'}
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl bg-[#0F4420] text-white text-xs font-semibold hover:bg-[#1B5A2B] transition-colors cursor-pointer"
            >
              {t('close')}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5A823]">
                {language === 'bn' ? 'অংশীদারিত্ব আবেদন' : 'Partnership Application'}
              </span>
              <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#F2C94C] mt-1">
                {language === 'bn' ? 'আহমাদুন এগ্রো বিনিয়োগকারী হোন' : 'Become an Ahmadun Agro Investor'}
              </h3>
              <p className="text-xs text-[#5C6660] dark:text-[#95A69B] mt-1">
                {language === 'bn'
                  ? 'শরিয়াহসম্মত ও বাস্তব সম্পদযুক্ত কৃষি প্রকল্পে নির্ভরযোগ্য রিটার্ন অর্জন করুন।'
                  : 'Submit your request for private allocation and verified documentation.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] mb-1">
                  {t('formName')} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: মোহাম্মদ তানভীর আলম' : 'e.g. Tariqul Islam'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-sm text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] mb-1">
                    {t('formPhone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1711-XXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-sm text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] mb-1">
                    {t('formEmail')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-sm text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] mb-1">
                    {language === 'bn' ? 'আগ্রহের প্রকল্প' : 'Project of Interest'}
                  </label>
                  <select
                    value={projectInterest}
                    onChange={(e) => setProjectInterest(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-xs text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
                  >
                    <option value="">{language === 'bn' ? 'যেকোনো উপযুক্ত প্রকল্প' : 'Any suitable project'}</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.name_en}>
                        {language === 'bn' ? p.name_bn : p.name_en}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] mb-1">
                    {language === 'bn' ? 'সম্ভাব্য বিনিয়োগ বাজেট (৳)' : 'Planned Investment (৳)'}
                  </label>
                  <select
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-xs text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
                  >
                    <option value="50,000 - 100,000">৳ 50,000 - ৳ 100,000</option>
                    <option value="100,000 - 500,000">৳ 100,000 - ৳ 500,000</option>
                    <option value="500,000 - 1,500,000">৳ 500,000 - ৳ 1,500,000</option>
                    <option value="1,500,000+">৳ 1,500,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] mb-1">
                  {language === 'bn' ? 'বিশেষ বার্তা বা প্রশ্ন' : 'Notes / Special Requests'}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    language === 'bn'
                      ? 'আপনার কোনো বিশেষ প্রশ্ন বা আগ্রহ থাকলে জানান...'
                      : 'Any specific questions or allocation preferences...'
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-sm text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#5C6660] dark:text-[#95A69B]">
                <ShieldCheck className="w-4 h-4 text-[#0F4420] dark:text-[#F2C94C] shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'আপনার ব্যক্তিগত তথ্য সুরক্ষিত এবং শুধুমাত্র যাচাইকরণে ব্যবহৃত হবে।'
                    : 'Your information is confidential and will only be used for compliance verification.'}
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] transition-colors cursor-pointer shadow-xs"
                >
                  {language === 'bn' ? 'আবেদন জমা দিন' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

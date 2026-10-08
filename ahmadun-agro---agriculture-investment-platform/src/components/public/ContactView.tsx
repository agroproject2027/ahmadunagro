import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { useApp } from '../../context/AppContext';

export const ContactView: React.FC = () => {
  const { t, language } = useLanguage();
  const { submitLead, projects } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestType, setInterestType] = useState('General Agricultural Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    submitLead({
      type: interestType.includes('Investor') ? 'Investor Request' : 'Contact Query',
      name,
      phone,
      email,
      message,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E5A823]">
          {t('contactTitle')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
          {language === 'bn' ? 'সরাসরি আমাদের সাথে কথা বলুন' : 'Connect with Ahmadun Agro'}
        </h1>
        <p className="text-sm text-[#5C6660] dark:text-[#95A69B] leading-relaxed">
          {t('contactSub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-[#122419] p-8 rounded-2xl border border-[#E4E7E1] dark:border-[#1E3827] shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#E3EFD5] dark:bg-[#1B3F24] flex items-center justify-center text-[#0F4420] dark:text-[#F2C94C]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif-brand text-[#0F4420] dark:text-[#F2C94C]">
                {language === 'bn' ? 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে' : 'Message Received'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6660] dark:text-[#95A69B] max-w-sm mx-auto leading-relaxed">
                {t('formSuccess')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-6 py-2.5 rounded-xl bg-[#0F4420] text-white text-xs font-semibold hover:bg-[#1B5A2B] transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC] mb-2">
                {language === 'bn' ? 'যোগাযোগের ফর্ম' : 'Inquiry Form'}
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] mb-1">
                  {t('formName')} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'bn' ? 'আপনার পূর্ণ নাম লিখুন' : 'e.g. Tariqul Islam'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-sm text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-sm text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
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
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-sm text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] mb-1">
                  {t('formInterest')}
                </label>
                <select
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-xs text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
                >
                  <option value="General Agricultural Inquiry">{t('formInterestGeneral')}</option>
                  <option value="Request to Become an Investor">{t('formInterestInvestor')}</option>
                  <option value="Specific Project Query">{t('formInterestProject')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] mb-1">
                  {t('formMessage')} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    language === 'bn'
                      ? 'আপনার প্রশ্ন বা প্রস্তাবনা বিস্তারিত লিখুন...'
                      : 'Please describe your query or investment allocation timeline...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] text-sm text-[#1B2420] dark:text-[#EAF0EC] focus:outline-2 focus:outline-[#0F4420]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0F4420] text-white text-xs font-bold hover:bg-[#1B5A2B] transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{t('submit')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Office & Direct Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] space-y-6">
            <h3 className="text-lg font-bold font-serif-brand text-[#0F4420] dark:text-[#EAF0EC]">
              {t('officeAddressTitle')}
            </h3>

            <div className="space-y-4 text-xs text-[#5C6660] dark:text-[#95A69B]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0F4420] dark:text-[#F2C94C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                    {language === 'bn' ? 'কর্পোরেট প্রধান কার্যালয়' : 'Banani & Gulshan-2 HQ'}
                  </strong>
                  <span>{t('officeAddress')}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0F4420] dark:text-[#F2C94C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                    {language === 'bn' ? 'সরাসরি টেলিফোন' : 'Direct Telephone'}
                  </strong>
                  <span>{t('contactPhone')}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0F4420] dark:text-[#F2C94C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                    {language === 'bn' ? 'অফিসিয়াল ইমেইল' : 'Investor Relations Email'}
                  </strong>
                  <span>{t('contactEmail')}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0F4420] dark:text-[#F2C94C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-[#1B2420] dark:text-[#EAF0EC]">
                    {language === 'bn' ? 'কার্যদিবস' : 'Working Hours'}
                  </strong>
                  <span>{t('officeHours')}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Action Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/8801711234567"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('whatsAppChat')}</span>
              </a>
            </div>
          </div>

          {/* Styled Map Representation */}
          <div className="p-6 rounded-2xl bg-[#FBFAF4] dark:bg-[#0B1910] border border-[#E4E7E1] dark:border-[#1E3827] space-y-3">
            <span className="text-[11px] font-bold uppercase text-[#E5A823] tracking-wider block">
              {language === 'bn' ? 'অবস্থান মানচিত্র' : 'Location Blueprint'}
            </span>
            <div className="h-36 rounded-xl bg-stone-200 dark:bg-stone-800 flex items-center justify-center border border-[#E4E7E1] dark:border-[#1E3827] text-xs text-[#5C6660] dark:text-[#95A69B]">
              <div className="text-center space-y-1">
                <MapPin className="w-6 h-6 mx-auto text-[#0F4420] dark:text-[#F2C94C]" />
                <span className="font-semibold block text-[#1B2420] dark:text-[#EAF0EC]">
                  Road 11, Banani, Dhaka-1213
                </span>
                <span className="text-[10px] text-[#5C6660]">{language === 'bn' ? 'কামাল আতাতুর্ক এভিনিউ সংলগ্ন' : 'Near Kemal Ataturk Avenue'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n';

export const NotificationDropdown: React.FC = () => {
  const { currentUser, notifications, markNotificationRead, markAllNotificationsRead, navigateTo } = useApp();
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userNotifications = notifications.filter(
    (n) => n.user_id === currentUser?.id || (currentUser?.role === 'admin' && n.user_id === 'usr-admin-1')
  );

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#EAF0EC] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#E5A823] text-[#0F4420] text-[10px] font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#122419] border border-[#E4E7E1] dark:border-[#1E3827] shadow-xl z-50 overflow-hidden animate-in fade-in duration-150">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E7E1] dark:border-[#1E3827] bg-[#FBFAF4]/60 dark:bg-[#0B1910]/40">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#0F4420] dark:text-[#F2C94C]">
                {t('notificationsTitle')}
              </span>
              {unreadCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#E3EFD5] text-[#0F4420] font-medium">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className="text-xs text-[#5C6660] dark:text-[#95A69B] hover:text-[#0F4420] dark:hover:text-[#F2C94C] flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-3 h-3" />
                {t('markAllRead')}
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-[#E4E7E1]/50 dark:divide-[#1E3827]/50">
            {userNotifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#5C6660] dark:text-[#95A69B] px-4">
                {t('noNotifications')}
              </div>
            ) : (
              userNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    markNotificationRead(n.id);
                    if (currentUser?.role === 'admin') {
                      navigateTo('admin', { adminTab: 'requests' });
                    }
                    setIsOpen(false);
                  }}
                  className={`p-3.5 hover:bg-[#FBFAF4] dark:hover:bg-[#1B3F24]/30 transition-colors cursor-pointer text-left ${
                    !n.read ? 'bg-[#E3EFD5]/20 dark:bg-[#1B3F24]/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-xs font-semibold text-[#1B2420] dark:text-[#EAF0EC] line-clamp-1">
                      {language === 'bn' ? n.title_bn : n.title_en}
                    </h4>
                    <span className="text-[10px] text-[#5C6660] dark:text-[#95A69B] shrink-0">
                      {n.created_at}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C6660] dark:text-[#95A69B] leading-snug line-clamp-2">
                    {language === 'bn' ? n.body_bn : n.body_en}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LanguageProvider } from './i18n';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/public/HomeView';
import { ProjectsView } from './components/public/ProjectsView';
import { HowItWorksView } from './components/public/HowItWorksView';
import { InvestorsView } from './components/public/InvestorsView';
import { AboutView } from './components/public/AboutView';
import { ContactView } from './components/public/ContactView';
import { PrivacyView, TermsView } from './components/public/LegalViews';
import { LoginView } from './components/auth/LoginView';
import { AdminPortal } from './components/admin/AdminPortal';
import { InvestorPortal } from './components/investor/InvestorPortal';

const MainRouter: React.FC = () => {
  const { currentView, currentUser } = useApp();

  // If in admin view
  if (currentView === 'admin') {
    if (currentUser?.role !== 'admin') {
      return <LoginView />;
    }
    return <AdminPortal />;
  }

  // If in investor portal view
  if (currentView === 'portal') {
    if (!currentUser || currentUser.role !== 'investor') {
      return <LoginView />;
    }
    return <InvestorPortal />;
  }

  // If in login view
  if (currentView === 'login') {
    return <LoginView />;
  }

  // Public Website Shell
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFAF4] dark:bg-[#07130B] text-[#1B2420] dark:text-[#EAF0EC] transition-colors">
      <Header />
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'projects' && <ProjectsView />}
        {currentView === 'how-it-works' && <HowItWorksView />}
        {currentView === 'investors' && <InvestorsView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'privacy' && <PrivacyView />}
        {currentView === 'terms' && <TermsView />}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainRouter />
      </AppProvider>
    </LanguageProvider>
  );
}

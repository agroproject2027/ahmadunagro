import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Project,
  Investment,
  Payout,
  DocumentItem,
  Lead,
  NotificationItem,
  AuditLogItem,
  Role,
} from '../types';
import {
  INITIAL_PROFILES,
  INITIAL_PROJECTS,
  INITIAL_INVESTMENTS,
  INITIAL_PAYOUTS,
  INITIAL_DOCUMENTS,
  INITIAL_LEADS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOG,
} from '../data/seedData';
import { useLanguage } from '../i18n';

interface AppContextType {
  currentUser: UserProfile | null;
  profiles: UserProfile[];
  projects: Project[];
  investments: Investment[];
  payouts: Payout[];
  documents: DocumentItem[];
  leads: Lead[];
  notifications: NotificationItem[];
  auditLogs: AuditLogItem[];
  darkMode: boolean;
  toggleDarkMode: () => void;

  // View state & Routing
  currentView: string;
  selectedProjectId: string | null;
  adminTab: string;
  investorTab: string;
  selectedInvestorDetailId: string | null;
  setAdminTab: (tab: string) => void;
  setInvestorTab: (tab: string) => void;
  setSelectedInvestorDetailId: (id: string | null) => void;
  navigateTo: (view: string, options?: { projectId?: string; investorId?: string; adminTab?: string; investorTab?: string }) => void;

  // Auth
  login: (email: string, pass: string, role: Role) => { success: boolean; error?: string };
  logout: () => void;
  logoutAll: () => void;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;

  // Admin actions
  addInvestor: (data: Omit<UserProfile, 'id' | 'role' | 'active' | 'joinedDate'>) => void;
  updateInvestorStatus: (id: string, active: boolean) => void;
  saveProject: (project: Partial<Project> & { id?: string }) => void;
  approveInvestmentRequest: (investmentId: string, note?: string) => void;
  rejectInvestmentRequest: (investmentId: string, note?: string) => void;
  schedulePayoutAction: (data: Omit<Payout, 'id' | 'status'>) => void;
  markPayoutAsPaid: (payoutId: string, reference: string) => void;
  uploadDocumentAction: (doc: Omit<DocumentItem, 'id' | 'uploaded_at'>) => void;
  updateLeadStatusAction: (leadId: string, status: Lead['status']) => void;

  // Investor / Public actions
  submitLead: (lead: Omit<Lead, 'id' | 'status' | 'created_at'>) => void;
  requestNewInvestment: (projectId: string, amount: number, note?: string) => { success: boolean; error?: string };
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setLanguage } = useLanguage();

  // Load state with fallback to seed data
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ahmadun_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('ahmadun_profiles');
    return saved ? JSON.parse(saved) : INITIAL_PROFILES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('ahmadun_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [investments, setInvestments] = useState<Investment[]>(() => {
    const saved = localStorage.getItem('ahmadun_investments');
    return saved ? JSON.parse(saved) : INITIAL_INVESTMENTS;
  });

  const [payouts, setPayouts] = useState<Payout[]>(() => {
    const saved = localStorage.getItem('ahmadun_payouts');
    return saved ? JSON.parse(saved) : INITIAL_PAYOUTS;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('ahmadun_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('ahmadun_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ahmadun_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('ahmadun_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOG;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('ahmadun_dark_mode') === 'true';
  });

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [adminTab, setAdminTab] = useState<string>('overview');
  const [investorTab, setInvestorTab] = useState<string>('portfolio');
  const [selectedInvestorDetailId, setSelectedInvestorDetailId] = useState<string | null>(null);

  // Sync with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ahmadun_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ahmadun_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ahmadun_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('ahmadun_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ahmadun_investments', JSON.stringify(investments));
  }, [investments]);

  useEffect(() => {
    localStorage.setItem('ahmadun_payouts', JSON.stringify(payouts));
  }, [payouts]);

  useEffect(() => {
    localStorage.setItem('ahmadun_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('ahmadun_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('ahmadun_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ahmadun_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('ahmadun_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const navigateTo = (
    view: string,
    options?: { projectId?: string; investorId?: string; adminTab?: string; investorTab?: string }
  ) => {
    setCurrentView(view);
    if (options?.projectId !== undefined) setSelectedProjectId(options.projectId);
    if (options?.investorId !== undefined) setSelectedInvestorDetailId(options.investorId);
    if (options?.adminTab) setAdminTab(options.adminTab);
    if (options?.investorTab) setInvestorTab(options.investorTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth methods
  const login = (email: string, pass: string, role: Role) => {
    const cleanEmail = email.trim().toLowerCase();
    const user = profiles.find(
      (p) => p.email.toLowerCase() === cleanEmail && p.role === role && p.active
    );

    if (!user) {
      return { success: false, error: 'Invalid email, role, or inactive account.' };
    }

    // Demo password check (allow any non-empty or preset passwords)
    if (!pass || pass.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    setCurrentUser(user);
    if (user.language) {
      setLanguage(user.language);
    }

    if (role === 'admin') {
      navigateTo('admin', { adminTab: 'overview' });
    } else {
      navigateTo('portal', { investorTab: 'portfolio' });
    }

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    navigateTo('home');
  };

  const logoutAll = () => {
    setCurrentUser(null);
    navigateTo('home');
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (updates.language) {
      setLanguage(updates.language);
    }
  };

  // Admin Actions
  const addInvestor = (data: Omit<UserProfile, 'id' | 'role' | 'active' | 'joinedDate'>) => {
    const newId = `usr-inv-${Date.now().toString().slice(-4)}`;
    const newInvestor: UserProfile = {
      ...data,
      id: newId,
      role: 'investor',
      active: true,
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };

    setProfiles((prev) => [newInvestor, ...prev]);

    // Add audit log
    const audit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      admin_id: currentUser?.id || 'admin',
      admin_name: currentUser?.name || 'Administrator',
      action: 'Created Investor Account',
      entity: 'UserProfile',
      entity_id: newId,
      created_at: new Date().toLocaleString(),
      details: `Added new investor ${data.name} (${data.email})`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const updateInvestorStatus = (id: string, active: boolean) => {
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, active } : p)));
    const audit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      admin_id: currentUser?.id || 'admin',
      admin_name: currentUser?.name || 'Administrator',
      action: active ? 'Activated Investor' : 'Deactivated Investor',
      entity: 'UserProfile',
      entity_id: id,
      created_at: new Date().toLocaleString(),
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const saveProject = (projData: Partial<Project> & { id?: string }) => {
    if (projData.id) {
      // Edit
      setProjects((prev) =>
        prev.map((p) => (p.id === projData.id ? ({ ...p, ...projData } as Project) : p))
      );
      const audit: AuditLogItem = {
        id: `aud-${Date.now()}`,
        admin_id: currentUser?.id || 'admin',
        admin_name: currentUser?.name || 'Administrator',
        action: 'Updated Project',
        entity: 'Project',
        entity_id: projData.id,
        created_at: new Date().toLocaleString(),
        details: `Updated details for ${projData.name_en || projData.id}`,
      };
      setAuditLogs((prev) => [audit, ...prev]);
    } else {
      // Create new
      const newId = `prj-${Date.now().toString().slice(-4)}`;
      const newProj: Project = {
        id: newId,
        name_en: projData.name_en || 'New Agro Project',
        name_bn: projData.name_bn || 'নতুন কৃষি প্রকল্প',
        category: projData.category || 'Tea Plantation',
        description_en: projData.description_en || '',
        description_bn: projData.description_bn || '',
        target_amount: projData.target_amount || 5000000,
        min_investment: projData.min_investment || 50000,
        funded_amount: 0,
        start_date: projData.start_date || new Date().toISOString().split('T')[0],
        duration_months: projData.duration_months || 12,
        expected_return: projData.expected_return || 18,
        status: projData.status || 'Active',
        progress: 0,
        published: projData.published ?? true,
        location_en: projData.location_en || 'Bangladesh',
        location_bn: projData.location_bn || 'বাংলাদেশ',
        images: projData.images || ['/src/assets/images/ahmadun_tea_estate_1791464452726.jpg'],
        updates: [],
      };
      setProjects((prev) => [newProj, ...prev]);
      const audit: AuditLogItem = {
        id: `aud-${Date.now()}`,
        admin_id: currentUser?.id || 'admin',
        admin_name: currentUser?.name || 'Administrator',
        action: 'Created New Project',
        entity: 'Project',
        entity_id: newId,
        created_at: new Date().toLocaleString(),
        details: `Added ${newProj.name_en}`,
      };
      setAuditLogs((prev) => [audit, ...prev]);
    }
  };

  const approveInvestmentRequest = (investmentId: string, note?: string) => {
    const inv = investments.find((i) => i.id === investmentId);
    if (!inv) return;

    const approvedAt = new Date().toISOString().split('T')[0];

    // Update investment
    setInvestments((prev) =>
      prev.map((i) =>
        i.id === investmentId
          ? {
              ...i,
              status: 'Active',
              approved_at: approvedAt,
              note: note ? `${i.note ? i.note + ' | ' : ''}${note}` : i.note,
            }
          : i
      )
    );

    // Update project funded amount & progress
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === inv.project_id) {
          const newFunded = p.funded_amount + inv.amount;
          const newProgress = Math.min(100, Math.round((newFunded / p.target_amount) * 100));
          return {
            ...p,
            funded_amount: newFunded,
            progress: newProgress,
          };
        }
        return p;
      })
    );

    // Create investor notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: inv.investor_id,
      title_en: `Investment Approved: ৳ ${inv.amount.toLocaleString()}`,
      title_bn: `বিনিয়োগ আবেদন অনুমোদিত: ৳ ${inv.amount.toLocaleString()}`,
      body_en: `Your investment of ৳ ${inv.amount.toLocaleString()} in ${inv.project_name_en} has been approved and activated.`,
      body_bn: `${inv.project_name_bn}-এ আপনার ৳ ${inv.amount.toLocaleString()} টাকার বরাদ্দ অনুমোদন ও সক্রিয় হয়েছে।`,
      read: false,
      created_at: approvedAt,
    };
    setNotifications((prev) => [notif, ...prev]);

    // Audit log
    const audit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      admin_id: currentUser?.id || 'admin',
      admin_name: currentUser?.name || 'Administrator',
      action: 'Approved Investment',
      entity: 'Investment',
      entity_id: investmentId,
      created_at: new Date().toLocaleString(),
      details: `Approved ৳ ${inv.amount.toLocaleString()} for ${inv.investor_name} in ${inv.project_name_en}`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const rejectInvestmentRequest = (investmentId: string, note?: string) => {
    const inv = investments.find((i) => i.id === investmentId);
    if (!inv) return;

    setInvestments((prev) =>
      prev.map((i) =>
        i.id === investmentId
          ? {
              ...i,
              status: 'Rejected',
              note: note ? `${i.note ? i.note + ' | Rejected: ' : 'Rejected: '}${note}` : i.note,
            }
          : i
      )
    );

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: inv.investor_id,
      title_en: 'Investment Request Declined',
      title_bn: 'বিনিয়োগ আবেদন প্রত্যাখ্যান',
      body_en: `Your request for ৳ ${inv.amount.toLocaleString()} in ${inv.project_name_en} was not approved.${note ? ' Reason: ' + note : ''}`,
      body_bn: `${inv.project_name_bn}-এ ৳ ${inv.amount.toLocaleString()} টাকার বরাদ্দ আবেদন গৃহীত হয়নি।${note ? ' কারণ: ' + note : ''}`,
      read: false,
      created_at: new Date().toISOString().split('T')[0],
    };
    setNotifications((prev) => [notif, ...prev]);

    const audit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      admin_id: currentUser?.id || 'admin',
      admin_name: currentUser?.name || 'Administrator',
      action: 'Rejected Investment',
      entity: 'Investment',
      entity_id: investmentId,
      created_at: new Date().toLocaleString(),
      details: `Declined ৳ ${inv.amount.toLocaleString()} for ${inv.investor_name}`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const schedulePayoutAction = (data: Omit<Payout, 'id' | 'status'>) => {
    const newId = `pay-${Date.now().toString().slice(-4)}`;
    const newPayout: Payout = {
      ...data,
      id: newId,
      status: 'Scheduled',
    };

    setPayouts((prev) => [newPayout, ...prev]);

    // Notification for investor
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: data.investor_id,
      title_en: `Payout Scheduled: ৳ ${data.amount.toLocaleString()}`,
      title_bn: `পে-আউট নির্ধারিত: ৳ ${data.amount.toLocaleString()}`,
      body_en: `A profit payout of ৳ ${data.amount.toLocaleString()} for ${data.project_name_en} is scheduled for ${data.due_date}.`,
      body_bn: `${data.project_name_bn}-এর জন্য ৳ ${data.amount.toLocaleString()} টাকার লভ্যাংশ ${data.due_date} তারিখে নির্ধারিত হয়েছে।`,
      read: false,
      created_at: new Date().toISOString().split('T')[0],
    };
    setNotifications((prev) => [notif, ...prev]);

    const audit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      admin_id: currentUser?.id || 'admin',
      admin_name: currentUser?.name || 'Administrator',
      action: 'Scheduled Payout',
      entity: 'Payout',
      entity_id: newId,
      created_at: new Date().toLocaleString(),
      details: `Scheduled ৳ ${data.amount.toLocaleString()} for ${data.investor_name}`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const markPayoutAsPaid = (payoutId: string, reference: string) => {
    const today = new Date().toISOString().split('T')[0];
    const payout = payouts.find((p) => p.id === payoutId);
    if (!payout) return;

    setPayouts((prev) =>
      prev.map((p) =>
        p.id === payoutId ? { ...p, status: 'Paid', paid_date: today, reference } : p
      )
    );

    // Update investment returns_paid
    setInvestments((prev) =>
      prev.map((i) => {
        if (i.investor_id === payout.investor_id && i.project_id === payout.project_id) {
          return {
            ...i,
            total_returns_paid: (i.total_returns_paid || 0) + payout.amount,
          };
        }
        return i;
      })
    );

    // Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: payout.investor_id,
      title_en: `Payout Transferred: ৳ ${payout.amount.toLocaleString()}`,
      title_bn: `পে-আউট সফলভাবে পরিশোধিত: ৳ ${payout.amount.toLocaleString()}`,
      body_en: `Your return of ৳ ${payout.amount.toLocaleString()} has been dispatched. Ref: ${reference}`,
      body_bn: `আপনার ৳ ${payout.amount.toLocaleString()} টাকার মুনাফা ব্যাংকে পাঠানো হয়েছে। রেফারেন্স: ${reference}`,
      read: false,
      created_at: today,
    };
    setNotifications((prev) => [notif, ...prev]);

    const audit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      admin_id: currentUser?.id || 'admin',
      admin_name: currentUser?.name || 'Administrator',
      action: 'Paid Payout',
      entity: 'Payout',
      entity_id: payoutId,
      created_at: new Date().toLocaleString(),
      details: `Processed payment of ৳ ${payout.amount.toLocaleString()} (Ref: ${reference})`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const uploadDocumentAction = (doc: Omit<DocumentItem, 'id' | 'uploaded_at'>) => {
    const newId = `doc-${Date.now().toString().slice(-4)}`;
    const newDoc: DocumentItem = {
      ...doc,
      id: newId,
      uploaded_at: new Date().toISOString().split('T')[0],
    };

    setDocuments((prev) => [newDoc, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      user_id: doc.investor_id,
      title_en: `New Document: ${doc.title}`,
      title_bn: `নতুন নথি যুক্ত হয়েছে: ${doc.title}`,
      body_en: `A new ${doc.category} document is available for download in your portal.`,
      body_bn: `আপনার পোর্টালে একটি নতুন ${doc.category} নথি ডাউনলোডের জন্য উপলব্ধ।`,
      read: false,
      created_at: newDoc.uploaded_at,
    };
    setNotifications((prev) => [notif, ...prev]);

    const audit: AuditLogItem = {
      id: `aud-${Date.now()}`,
      admin_id: currentUser?.id || 'admin',
      admin_name: currentUser?.name || 'Administrator',
      action: 'Uploaded Document',
      entity: 'DocumentItem',
      entity_id: newId,
      created_at: new Date().toLocaleString(),
      details: `Uploaded ${doc.title} for ${doc.investor_name}`,
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const updateLeadStatusAction = (leadId: string, status: Lead['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
  };

  const submitLead = (leadData: Omit<Lead, 'id' | 'status' | 'created_at'>) => {
    const newId = `lead-${Date.now().toString().slice(-4)}`;
    const newLead: Lead = {
      ...leadData,
      id: newId,
      status: 'New',
      created_at: new Date().toISOString().split('T')[0],
    };
    setLeads((prev) => [newLead, ...prev]);

    // Admin notification
    const adminProfiles = profiles.filter((p) => p.role === 'admin');
    adminProfiles.forEach((adm) => {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}-${adm.id}`,
        user_id: adm.id,
        title_en: `New Inbound Lead: ${leadData.name}`,
        title_bn: `নতুন লিড / অনুরোধ: ${leadData.name}`,
        body_en: `${leadData.type} received from ${leadData.name} (${leadData.phone})`,
        body_bn: `${leadData.name} (${leadData.phone})-এর কাছ থেকে ${leadData.type} বার্তা এসেছে।`,
        read: false,
        created_at: newLead.created_at,
      };
      setNotifications((prev) => [notif, ...prev]);
    });
  };

  const requestNewInvestment = (projectId: string, amount: number, note?: string) => {
    if (!currentUser) return { success: false, error: 'Must be logged in' };
    const proj = projects.find((p) => p.id === projectId);
    if (!proj) return { success: false, error: 'Project not found' };

    if (amount < proj.min_investment) {
      return {
        success: false,
        error: `Minimum allocation is ৳ ${proj.min_investment.toLocaleString()}`,
      };
    }

    const newId = `inv-${Date.now().toString().slice(-4)}`;
    const newInv: Investment = {
      id: newId,
      investor_id: currentUser.id,
      investor_name: currentUser.name,
      project_id: proj.id,
      project_name_en: proj.name_en,
      project_name_bn: proj.name_bn,
      category: proj.category,
      amount,
      status: 'Pending',
      requested_at: new Date().toISOString().split('T')[0],
      expected_return_pct: proj.expected_return,
      total_returns_paid: 0,
      note: note || 'Online investment request',
    };

    setInvestments((prev) => [newInv, ...prev]);

    // Notify admins
    const adminProfiles = profiles.filter((p) => p.role === 'admin');
    adminProfiles.forEach((adm) => {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}-${adm.id}`,
        user_id: adm.id,
        title_en: `New Investment Request: ৳ ${amount.toLocaleString()}`,
        title_bn: `নতুন বিনিয়োগের আবেদন: ৳ ${amount.toLocaleString()}`,
        body_en: `${currentUser.name} requested ৳ ${amount.toLocaleString()} in ${proj.name_en}`,
        body_bn: `${currentUser.name} ${proj.name_bn}-এ ৳ ${amount.toLocaleString()} টাকার বরাদ্দের আবেদন করেছেন।`,
        read: false,
        created_at: newInv.requested_at,
      };
      setNotifications((prev) => [notif, ...prev]);
    });

    return { success: true };
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    if (!currentUser) return;
    setNotifications((prev) =>
      prev.map((n) => (n.user_id === currentUser.id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        profiles,
        projects,
        investments,
        payouts,
        documents,
        leads,
        notifications,
        auditLogs,
        darkMode,
        toggleDarkMode,
        currentView,
        selectedProjectId,
        adminTab,
        investorTab,
        selectedInvestorDetailId,
        setAdminTab,
        setInvestorTab,
        setSelectedInvestorDetailId,
        navigateTo,
        login,
        logout,
        logoutAll,
        updateCurrentUser,
        addInvestor,
        updateInvestorStatus,
        saveProject,
        approveInvestmentRequest,
        rejectInvestmentRequest,
        schedulePayoutAction,
        markPayoutAsPaid,
        uploadDocumentAction,
        updateLeadStatusAction,
        submitLead,
        requestNewInvestment,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

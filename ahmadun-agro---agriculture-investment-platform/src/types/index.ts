export type Role = 'admin' | 'investor';
export type Language = 'en' | 'bn';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: Role;
  language: Language;
  active: boolean;
  nid?: string;
  bankDetails?: string;
  notes?: string;
  joinedDate: string;
  avatar?: string;
}

export type ProjectCategory = 
  | 'Tea Plantation'
  | 'Organic Fruit Orchard'
  | 'Dairy & Livestock'
  | 'Fisheries & Aquaculture'
  | 'Smart Agro-Greenhouse';

export type ProjectStatus = 'Active' | 'Upcoming' | 'Funded' | 'Completed';

export interface ProjectUpdate {
  id: string;
  date: string;
  title_en: string;
  title_bn: string;
  content_en: string;
  content_bn: string;
}

export interface Project {
  id: string;
  name_en: string;
  name_bn: string;
  category: ProjectCategory;
  description_en: string;
  description_bn: string;
  target_amount: number;
  min_investment: number;
  funded_amount: number;
  start_date: string;
  duration_months: number;
  expected_return: number; // annual percentage e.g. 18.5
  status: ProjectStatus;
  progress: number; // percentage e.g. 78
  published: boolean;
  images: string[];
  location_en: string;
  location_bn: string;
  updates: ProjectUpdate[];
}

export type InvestmentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Active' | 'Completed';

export interface Investment {
  id: string;
  investor_id: string;
  investor_name: string;
  project_id: string;
  project_name_en: string;
  project_name_bn: string;
  category: ProjectCategory;
  amount: number;
  status: InvestmentStatus;
  requested_at: string;
  approved_at?: string;
  expected_return_pct: number;
  total_returns_paid: number;
  note?: string;
}

export type PayoutStatus = 'Scheduled' | 'Pending' | 'Paid';

export interface Payout {
  id: string;
  investor_id: string;
  investor_name: string;
  project_id: string;
  project_name_en: string;
  project_name_bn: string;
  amount: number;
  due_date: string;
  paid_date?: string;
  status: PayoutStatus;
  reference?: string;
}

export type DocumentCategory = 'Agreement' | 'Statement' | 'Certificate' | 'Tax Certificate';

export interface DocumentItem {
  id: string;
  investor_id: string;
  investor_name: string;
  title: string;
  category: DocumentCategory;
  file_path: string;
  file_size: string;
  uploaded_at: string;
}

export type LeadType = 'Investor Request' | 'Contact Query' | 'Project Inquiry';
export type LeadStatus = 'New' | 'Contacted' | 'Converted';

export interface Lead {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  email: string;
  message: string;
  interest_project?: string;
  status: LeadStatus;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title_en: string;
  title_bn: string;
  body_en: string;
  body_bn: string;
  read: boolean;
  created_at: string;
  link?: string;
}

export interface AuditLogItem {
  id: string;
  admin_id: string;
  admin_name: string;
  action: string;
  entity: string;
  entity_id: string;
  created_at: string;
  details?: string;
}

import { UserProfile, Project, Investment, Payout, DocumentItem, Lead, NotificationItem, AuditLogItem } from '../types';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'usr-admin-1',
    name: 'Kazi Raqibul Hasan',
    email: 'admin@ahmadunagro.com',
    phone: '+880 1711-234567',
    address: 'House 42, Road 11, Banani, Dhaka-1213',
    role: 'admin',
    language: 'bn',
    active: true,
    joinedDate: '2024-01-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    notes: 'Managing Director & Platform Superadmin'
  },
  {
    id: 'usr-inv-1',
    name: 'Tariqul Islam',
    email: 'tariq@investor.com',
    phone: '+880 1819-876543',
    address: 'Flat 4B, Road 14, Sector 7, Uttara, Dhaka',
    role: 'investor',
    language: 'bn',
    active: true,
    nid: 'NID-198826912384912',
    bankDetails: 'City Bank Ltd, Gulshan Br, A/C: 1102847291001 (Routing: 225271829)',
    joinedDate: '2024-06-15',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    notes: 'High-net-worth partner. Preference for plantation and horticulture ventures.'
  },
  {
    id: 'usr-inv-2',
    name: 'Nusrat Jahan',
    email: 'nusrat@investor.com',
    phone: '+880 1712-445566',
    address: 'House 18, Road 27, Dhanmondi R/A, Dhaka',
    role: 'investor',
    language: 'en',
    active: true,
    nid: 'NID-199226955891234',
    bankDetails: 'Eastern Bank Ltd, Dhanmondi Br, A/C: 104106098231',
    joinedDate: '2024-08-20',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    notes: 'Software Engineering Director. Allocates quarterly savings to dairy.'
  },
  {
    id: 'usr-inv-3',
    name: 'Farhan Ahmed',
    email: 'farhan@investor.com',
    phone: '+880 1911-332211',
    address: 'Sonadanga R/A, Mujgunni Main Road, Khulna',
    role: 'investor',
    language: 'bn',
    active: true,
    nid: 'NID-198526978901238',
    bankDetails: 'BRAC Bank PLC, Khulna Br, A/C: 1501209384728',
    joinedDate: '2024-11-05',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    notes: 'Renewable energy entrepreneur. Focus on bio-floc fisheries.'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'prj-tea-1',
    name_en: 'Ahmadun Valley Organic Tea Estate',
    name_bn: 'আহমাদুন ভ্যালি অর্গানিক চা বাগান',
    category: 'Tea Plantation',
    description_en: '120-acre certified organic black and green tea plantation in Sreemangal hills with state-of-the-art leaf processing machinery and zero chemical pesticides.',
    description_bn: 'শ্রীমঙ্গলের পাহাড়ি অঞ্চলে ১২০ একর জমিতে রাসায়নিক কীটনাশকমুক্ত জৈব কালো ও সবুজ চা উৎপাদন এবং স্বয়ংক্রিয় প্রক্রিয়াজাতকরণ প্ল্যান্ট।',
    target_amount: 15000000,
    min_investment: 100000,
    funded_amount: 11700000,
    start_date: '2025-03-01',
    duration_months: 24,
    expected_return: 18.5,
    status: 'Active',
    progress: 78,
    published: true,
    location_en: 'Sreemangal, Moulvibazar, Sylhet',
    location_bn: 'শ্রীমঙ্গল, মৌলভীবাজার, সিলেট',
    images: ['/src/assets/images/ahmadun_tea_estate_1791464452726.jpg'],
    updates: [
      {
        id: 'upd-1',
        date: '2026-09-15',
        title_en: 'Third Flush Harvest Commenced',
        title_bn: 'তৃতীয় মৌসুমের চা পাতা আহরণ শুরু',
        content_en: 'Tea plucking across sector 3 and 4 completed with a 14% yield increase over initial agronomy estimates.',
        content_bn: '৩ ও ৪ নম্বর সেক্টরের পাতা সংগ্রহ সম্পন্ন হয়েছে এবং অনুমানের চেয়ে ১৪% বেশি উৎপাদন পাওয়া গেছে।'
      },
      {
        id: 'upd-2',
        date: '2026-07-10',
        title_en: 'Bio-Organic Composting Expansion',
        title_bn: 'জৈব কম্পোস্টিং প্ল্যান্ট সম্প্রসারণ',
        content_en: 'Commissioned our proprietary vermicompost center, eliminating 100% of external fertilizer dependency.',
        content_bn: 'নিজস্ব কেঁচো সার কেন্দ্র চালু হয়েছে, যার ফলে বাইরের সারের ওপর কোনো নির্ভরতা থাকবে না।'
      }
    ]
  },
  {
    id: 'prj-mango-2',
    name_en: 'Rajshahi Export-Grade Mango Orchards',
    name_bn: 'রাজশাহী রফতানিযোগ্য আম বাগান',
    category: 'Organic Fruit Orchard',
    description_en: 'Commercial fruit-bagged organic mango production covering Khirshapat, Amrapali, and Haribhanga varieties with dedicated cold-storage chain.',
    description_bn: 'ক্ষীরশাপাত, আম্রপালি ও হাঁড়িভাঙা জাতের উন্নত নিরাপদ ব্যাগিং পদ্ধতির আম বাগান এবং সরাসরি ইউরোপে রফতানি উপযোগী কোল্ড-স্টোরেজ নেটওয়ার্ক।',
    target_amount: 8500000,
    min_investment: 50000,
    funded_amount: 7820000,
    start_date: '2025-05-15',
    duration_months: 12,
    expected_return: 21.0,
    status: 'Active',
    progress: 92,
    published: true,
    location_en: 'Bagha & Charghat, Rajshahi',
    location_bn: 'বাঘা ও চারঘাট, রাজশাহী',
    images: ['/src/assets/images/ahmadun_mango_orchard_1791464463340.jpg'],
    updates: [
      {
        id: 'upd-3',
        date: '2026-08-20',
        title_en: 'Export Consignment Dispatched to UK & UAE',
        title_bn: 'যুক্তরাজ্য ও সংযুক্ত আরব আমিরাতে রফতানি চালান পাঠানো হয়েছে',
        content_en: 'GlobalGAP certification verified; first 42 tons of prime Khirshapat successfully delivered with 28% premium over domestic market pricing.',
        content_bn: 'গ্লোবালগ্যাপ সনদের মাধ্যমে প্রথম ৪২ টন ক্ষীরশাপাত সফলভাবে রফতানি করা হয়েছে যা দেশীয় বাজারের চেয়ে ২৮% বেশি মূল্যে বিক্রি হয়েছে।'
      }
    ]
  },
  {
    id: 'prj-dairy-3',
    name_en: 'Shariatpur Modern High-Yield Dairy',
    name_bn: 'শরীয়তপুর আধুনিক ডেইরি ও ডেইরি শিল্প',
    category: 'Dairy & Livestock',
    description_en: 'Climate-controlled high-welfare dairy farm housing 250 Friesian-cross heifers, automated milking parlor, biogas generation, and fodder cultivation.',
    description_bn: '২৫০টি উন্নত জাতের ফ্রিজিয়ান গাভীর আধুনিক শেড, স্বয়ংক্রিয় মিল্কিং পার্লার, বায়োগ্যাস বিদ্যুৎ এবং পুষ্টিকর ঘাস চাষের পূর্ণাঙ্গ ডেইরি প্রকল্প।',
    target_amount: 12000000,
    min_investment: 200000,
    funded_amount: 7800000,
    start_date: '2025-08-01',
    duration_months: 18,
    expected_return: 17.0,
    status: 'Active',
    progress: 65,
    published: true,
    location_en: 'Zajira, Shariatpur',
    location_bn: 'জাজিরা, শরীয়তপুর',
    images: ['/src/assets/images/ahmadun_dairy_farm_1791464474306.jpg'],
    updates: [
      {
        id: 'upd-4',
        date: '2026-09-01',
        title_en: 'Milk Yield Hits 3,200 Liters/Day',
        title_bn: 'দৈনিক দুধ উৎপাদন ৩,২০০ লিটার ছাড়িয়েছে',
        content_en: 'Signed supply contract with national dairy processor at guaranteed floor price.',
        content_bn: 'জাতীয় শীর্ষ প্রক্রিয়াজাতকরণ প্রতিষ্ঠানের সাথে দীর্ঘমেয়াদী সরবরাহ চুক্তি স্বাক্ষরিত হয়েছে।'
      }
    ]
  },
  {
    id: 'prj-fish-4',
    name_en: 'Bhaluka Smart Aquaculture & Bio-Floc',
    name_bn: 'ভালুকা স্মার্ট মৎস্য হ্যাচারি ও বায়োফ্লক',
    category: 'Fisheries & Aquaculture',
    description_en: 'High-density Shing, Magur, and Tilapia rearing using circular bio-floc tanks, automated dissolved oxygen monitors, and solar aeration.',
    description_bn: 'আধুনিক বায়োফ্লক ট্যাংক ও সৌরচালিত অক্সিজেনেশন প্রযুক্তির মাধ্যমে শিং, মাগুর ও উন্নত তেলাপিয়ার নিবিড় চাষ প্রকল্প।',
    target_amount: 6000000,
    min_investment: 75000,
    funded_amount: 2520000,
    start_date: '2026-01-10',
    duration_months: 15,
    expected_return: 19.5,
    status: 'Active',
    progress: 42,
    published: true,
    location_en: 'Bhaluka, Mymensingh',
    location_bn: 'ভালুকা, ময়মনসিংহ',
    images: ['/src/assets/images/ahmadun_smart_fisheries_1791464486815.jpg'],
    updates: []
  }
];

export const INITIAL_INVESTMENTS: Investment[] = [
  {
    id: 'inv-101',
    investor_id: 'usr-inv-1',
    investor_name: 'Tariqul Islam',
    project_id: 'prj-tea-1',
    project_name_en: 'Ahmadun Valley Organic Tea Estate',
    project_name_bn: 'আহমাদুন ভ্যালি অর্গানিক চা বাগান',
    category: 'Tea Plantation',
    amount: 750000,
    status: 'Active',
    requested_at: '2025-03-05',
    approved_at: '2025-03-06',
    expected_return_pct: 18.5,
    total_returns_paid: 112500,
    note: 'Initial 7.5L allocation via City Bank wire.'
  },
  {
    id: 'inv-102',
    investor_id: 'usr-inv-1',
    investor_name: 'Tariqul Islam',
    project_id: 'prj-mango-2',
    project_name_en: 'Rajshahi Export-Grade Mango Orchards',
    project_name_bn: 'রাজশাহী রফতানিযোগ্য আম বাগান',
    category: 'Organic Fruit Orchard',
    amount: 500000,
    status: 'Active',
    requested_at: '2025-05-18',
    approved_at: '2025-05-20',
    expected_return_pct: 21.0,
    total_returns_paid: 72500,
    note: '5L allocation for export batch 2025-26.'
  },
  {
    id: 'inv-103',
    investor_id: 'usr-inv-1',
    investor_name: 'Tariqul Islam',
    project_id: 'prj-dairy-3',
    project_name_en: 'Shariatpur Modern High-Yield Dairy',
    project_name_bn: 'শরীয়তপুর আধুনিক ডেইরি ও ডেইরি শিল্প',
    category: 'Dairy & Livestock',
    amount: 300000,
    status: 'Pending',
    requested_at: '2026-10-02',
    expected_return_pct: 17.0,
    total_returns_paid: 0,
    note: 'New reinvestment request waiting for admin approval.'
  },
  {
    id: 'inv-104',
    investor_id: 'usr-inv-2',
    investor_name: 'Nusrat Jahan',
    project_id: 'prj-dairy-3',
    project_name_en: 'Shariatpur Modern High-Yield Dairy',
    project_name_bn: 'শরীয়তপুর আধুনিক ডেইরি ও ডেইরি শিল্প',
    category: 'Dairy & Livestock',
    amount: 800000,
    status: 'Active',
    requested_at: '2025-08-05',
    approved_at: '2025-08-06',
    expected_return_pct: 17.0,
    total_returns_paid: 68000,
    note: 'Eastern Bank online transfer confirmed.'
  },
  {
    id: 'inv-105',
    investor_id: 'usr-inv-3',
    investor_name: 'Farhan Ahmed',
    project_id: 'prj-fish-4',
    project_name_en: 'Bhaluka Smart Aquaculture & Bio-Floc',
    project_name_bn: 'ভালুকা স্মার্ট মৎস্য হ্যাচারি ও বায়োফ্লক',
    category: 'Fisheries & Aquaculture',
    amount: 500000,
    status: 'Active',
    requested_at: '2026-01-15',
    approved_at: '2026-01-16',
    expected_return_pct: 19.5,
    total_returns_paid: 24375,
    note: 'BRAC bank transfer.'
  },
  {
    id: 'inv-106',
    investor_id: 'usr-inv-2',
    investor_name: 'Nusrat Jahan',
    project_id: 'prj-tea-1',
    project_name_en: 'Ahmadun Valley Organic Tea Estate',
    project_name_bn: 'আহমাদুন ভ্যালি অর্গানিক চা বাগান',
    category: 'Tea Plantation',
    amount: 250000,
    status: 'Pending',
    requested_at: '2026-10-05',
    expected_return_pct: 18.5,
    total_returns_paid: 0,
    note: 'Additional allocation request.'
  }
];

export const INITIAL_PAYOUTS: Payout[] = [
  {
    id: 'pay-001',
    investor_id: 'usr-inv-1',
    investor_name: 'Tariqul Islam',
    project_id: 'prj-tea-1',
    project_name_en: 'Ahmadun Valley Organic Tea Estate',
    project_name_bn: 'আহমাদুন ভ্যালি অর্গানিক চা বাগান',
    amount: 34687,
    due_date: '2026-06-30',
    paid_date: '2026-06-30',
    status: 'Paid',
    reference: 'BEFTN-CB-88392109'
  },
  {
    id: 'pay-002',
    investor_id: 'usr-inv-1',
    investor_name: 'Tariqul Islam',
    project_id: 'prj-mango-2',
    project_name_en: 'Rajshahi Export-Grade Mango Orchards',
    project_name_bn: 'রাজশাহী রফতানিযোগ্য আম বাগান',
    amount: 26250,
    due_date: '2026-08-31',
    paid_date: '2026-08-31',
    status: 'Paid',
    reference: 'BEFTN-CB-99401244'
  },
  {
    id: 'pay-003',
    investor_id: 'usr-inv-1',
    investor_name: 'Tariqul Islam',
    project_id: 'prj-tea-1',
    project_name_en: 'Ahmadun Valley Organic Tea Estate',
    project_name_bn: 'আহমাদুন ভ্যালি অর্গানিক চা বাগান',
    amount: 38500,
    due_date: '2026-11-15',
    status: 'Scheduled',
    reference: 'PAY-SCHED-Q4-TEA'
  },
  {
    id: 'pay-004',
    investor_id: 'usr-inv-2',
    investor_name: 'Nusrat Jahan',
    project_id: 'prj-dairy-3',
    project_name_en: 'Shariatpur Modern High-Yield Dairy',
    project_name_bn: 'শরীয়তপুর আধুনিক ডেইরি ও ডেইরি শিল্প',
    amount: 34000,
    due_date: '2026-09-30',
    paid_date: '2026-09-30',
    status: 'Paid',
    reference: 'NPSB-EB-47201992'
  },
  {
    id: 'pay-005',
    investor_id: 'usr-inv-2',
    investor_name: 'Nusrat Jahan',
    project_id: 'prj-dairy-3',
    project_name_en: 'Shariatpur Modern High-Yield Dairy',
    project_name_bn: 'শরীয়তপুর আধুনিক ডেইরি ও ডেইরি শিল্প',
    amount: 34000,
    due_date: '2026-12-31',
    status: 'Scheduled',
    reference: 'PAY-SCHED-Q4-DAIRY'
  },
  {
    id: 'pay-006',
    investor_id: 'usr-inv-3',
    investor_name: 'Farhan Ahmed',
    project_id: 'prj-fish-4',
    project_name_en: 'Bhaluka Smart Aquaculture & Bio-Floc',
    project_name_bn: 'ভালুকা স্মার্ট মৎস্য হ্যাচারি ও বায়োফ্লক',
    amount: 24375,
    due_date: '2026-10-31',
    status: 'Pending',
    reference: 'PAY-Q3-FISH-PEND'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-001',
    investor_id: 'usr-inv-1',
    investor_name: 'Tariqul Islam',
    title: 'Mudarabah Investment Partnership Agreement - Tea Estate',
    category: 'Agreement',
    file_path: '/documents/mudarabah_tea_ahmadun_2025.pdf',
    file_size: '2.4 MB',
    uploaded_at: '2025-03-06'
  },
  {
    id: 'doc-002',
    investor_id: 'usr-inv-1',
    investor_name: 'Tariqul Islam',
    title: 'Certified Q2 2026 Farmland Returns & Audit Statement',
    category: 'Statement',
    file_path: '/documents/q2_2026_audit_statement.pdf',
    file_size: '1.8 MB',
    uploaded_at: '2026-07-05'
  },
  {
    id: 'doc-003',
    investor_id: 'usr-inv-1',
    investor_name: 'Tariqul Islam',
    title: 'Islamic Finance & Shariah Board Compliance Certificate',
    category: 'Certificate',
    file_path: '/documents/shariah_board_certificate_ahmadun.pdf',
    file_size: '890 KB',
    uploaded_at: '2025-01-15'
  },
  {
    id: 'doc-004',
    investor_id: 'usr-inv-1',
    investor_name: 'Tariqul Islam',
    title: 'Annual Agricultural Tax Deduction Certificate (FY 2025-26)',
    category: 'Tax Certificate',
    file_path: '/documents/tax_certificate_tariqul_2025_26.pdf',
    file_size: '1.1 MB',
    uploaded_at: '2026-08-01'
  },
  {
    id: 'doc-005',
    investor_id: 'usr-inv-2',
    investor_name: 'Nusrat Jahan',
    title: 'Dairy Asset Deed & Shariah Partnership Agreement',
    category: 'Agreement',
    file_path: '/documents/dairy_partnership_nusrat.pdf',
    file_size: '2.1 MB',
    uploaded_at: '2025-08-07'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-001',
    type: 'Investor Request',
    name: 'Mohammad Shahidul Alam',
    phone: '+880 1715-998877',
    email: 'shahidul.alam@eximbank.com.bd',
    message: 'Interested in allocating ৳ 1,500,000 across the Sylhet Tea and Rajshahi Mango ventures. Please contact with contract draft.',
    interest_project: 'Ahmadun Valley Organic Tea Estate',
    status: 'New',
    created_at: '2026-10-06'
  },
  {
    id: 'lead-002',
    type: 'Contact Query',
    name: 'Shamim Ara Begum',
    phone: '+880 1819-223344',
    email: 'shamim.ara@gmail.com',
    message: 'Can non-resident Bangladeshis (NRBs) in North America invest and receive payout via foreign currency wire?',
    status: 'Contacted',
    created_at: '2026-10-04'
  },
  {
    id: 'lead-003',
    type: 'Investor Request',
    name: 'Engr. Tanvir Ahmed',
    phone: '+880 1912-887766',
    email: 'tanvir@texsol.com.bd',
    message: 'Wish to register as an institutional partner for the modern dairy farm project.',
    interest_project: 'Shariatpur Modern High-Yield Dairy',
    status: 'Converted',
    created_at: '2026-09-28'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    user_id: 'usr-inv-1',
    title_en: 'Payout Scheduled: ৳ 38,500',
    title_bn: 'পে-আউট নির্ধারিত: ৳ ৩৮,৫০০',
    body_en: 'Your Q3 profit distribution for Ahmadun Valley Tea Estate is scheduled for 15 Nov, 2026.',
    body_bn: 'আহমাদুন ভ্যালি চা বাগানের তৃতীয় প্রান্তিকের লভ্যাংশ ১৫ নভেম্বর, ২০২৬ তারিখে ব্যাংকে প্রদান করা হবে।',
    read: false,
    created_at: '2026-10-06'
  },
  {
    id: 'notif-2',
    user_id: 'usr-inv-1',
    title_en: 'New Document Uploaded',
    title_bn: 'নতুন নথি আপলোড করা হয়েছে',
    body_en: 'Your Annual Tax Deduction Certificate for FY 2025-26 is now ready for download.',
    body_bn: 'আপনার ২০২৫-২৬ করবর্ষের কৃষি কর প্রত্যয়নপত্র এখন ডাউনলোডের জন্য প্রস্তুত।',
    read: true,
    created_at: '2026-08-01'
  },
  {
    id: 'notif-3',
    user_id: 'usr-admin-1',
    title_en: 'New Investment Request Received',
    title_bn: 'নতুন বিনিয়োগের আবেদন জমা হয়েছে',
    body_en: 'Tariqul Islam submitted a request for ৳ 300,000 in Shariatpur Modern High-Yield Dairy.',
    body_bn: 'তারিকুল ইসলাম শরীয়তপুর আধুনিক ডেইরি খামারে ৩,০০,০০০ টাকার বরাদ্দ আবেদন করেছেন।',
    read: false,
    created_at: '2026-10-02'
  }
];

export const INITIAL_AUDIT_LOG: AuditLogItem[] = [
  {
    id: 'aud-1',
    admin_id: 'usr-admin-1',
    admin_name: 'Kazi Raqibul Hasan',
    action: 'Created Investor Account',
    entity: 'UserProfile',
    entity_id: 'usr-inv-3',
    created_at: '2024-11-05 14:22:10',
    details: 'Issued credentials to Farhan Ahmed (farhan@investor.com)'
  },
  {
    id: 'aud-2',
    admin_id: 'usr-admin-1',
    admin_name: 'Kazi Raqibul Hasan',
    action: 'Approved Investment',
    entity: 'Investment',
    entity_id: 'inv-105',
    created_at: '2026-01-16 10:15:44',
    details: 'Approved ৳ 500,000 allocation in Bhaluka Smart Aquaculture'
  },
  {
    id: 'aud-3',
    admin_id: 'usr-admin-1',
    admin_name: 'Kazi Raqibul Hasan',
    action: 'Processed Payout',
    entity: 'Payout',
    entity_id: 'pay-002',
    created_at: '2026-08-31 16:45:00',
    details: 'Marked ৳ 26,250 as Paid to Tariqul Islam (Ref: BEFTN-CB-99401244)'
  }
];

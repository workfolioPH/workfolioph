export interface Inquiry {
  id?: number;
  ref_code: string;
  full_name: string;
  email: string;
  phone: string;
  contact_method: 'WhatsApp' | 'Viber' | 'Email' | 'Phone';
  profession: string;
  package_name: string;
  selected_addons: string[];
  total_price: number;
  custom_domain?: string;
  notes?: string;
  status: 'New' | 'Assets Received' | 'In Progress' | 'Reviewing' | 'Live' | 'Completed';
  created_at?: string;
}

export interface PortfolioSample {
  id?: number;
  name: string;
  title: string;
  industry: string;
  subdomain: string;
  avatar_url: string;
  cover_url: string;
  experience_years: string;
  location: string;
  bio: string;
  key_skills: string[];
  certifications: string[];
  photo_count: number;
  video_count: number;
  has_custom_domain: boolean;
  featured: boolean;
}

export interface Review {
  id?: number;
  client_name: string;
  profession: string;
  rating: number;
  review_text: string;
  portfolio_url?: string;
  verified: boolean;
  created_at?: string;
}

export interface FaqItem {
  id?: number;
  category: 'General' | 'Domain & Hosting' | 'Payments' | 'CV & Media' | 'Guarantee';
  question: string;
  answer: string;
}

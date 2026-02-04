import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  matricule: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  action: string;
  observation: string;
  created_at: string;
  profiles?: Profile;
}

export interface DailyMetric {
  id: string;
  date: string;
  total_sales: number;
  total_orders: number;
  supply_cost: number;
  profit: number;
  sales_growth: number;
  orders_growth: number;
  supply_growth: number;
  profit_growth: number;
}

import { createClient } from '@supabase/supabase-js';
import dns from 'dns';

// Force Node.js to use IPv4 DNS resolution first to fix ENOTFOUND issues on Windows
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (error) {
  // fallback if not supported
}

export function createServerSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createClient(supabaseUrl, supabaseAnonKey);
}

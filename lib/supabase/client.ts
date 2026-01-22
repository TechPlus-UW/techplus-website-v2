import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set');
}

// Ensure we're using the anon key, not the service role key
if (supabaseAnonKey.includes('service_role') || supabaseAnonKey.length > 200) {
  console.error(
    'ERROR: You are using the service role key instead of the anon key! ' +
    'The service role key should NEVER be used in the browser. ' +
    'Please use NEXT_PUBLIC_SUPABASE_ANON_KEY from your Supabase project settings.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'supabase.auth.token',
  },
});

export interface Env {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  NEXT_PUBLIC_FLAGSMITH_ENV_KEY: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

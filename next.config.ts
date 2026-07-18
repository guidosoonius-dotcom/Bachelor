import type { NextConfig } from "next";

// NEXT_PUBLIC_SUPABASE_URL/ANON_KEY are public-by-design (RLS protects the data,
// not the key), so a fallback here keeps the app working even if the Vercel
// project's own env vars aren't configured.
const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://mqnqinwockdngfwngknw.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      "sb_publishable_3WXXtDTHisJZgtX31-aZXQ_dLW09pJO",
  },
};

export default nextConfig;

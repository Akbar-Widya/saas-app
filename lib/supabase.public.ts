// lib/supabase.public.ts
import { createClient } from "@supabase/supabase-js"

export const createPublicSupabaseClient = () => {
   return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   );
};

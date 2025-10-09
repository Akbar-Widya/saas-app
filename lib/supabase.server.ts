// lib/supabase.server.ts
import { createServerClient } from '@supabase/ssr' // Import from the correct package
import { cookies } from 'next/headers'

// not used, still figuring out jwt auth superbase, currently only using client-side superbase client
export const createSupabaseServerClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
      },
    },
  )
}

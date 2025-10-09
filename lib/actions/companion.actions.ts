'use server'

import { auth } from '@clerk/nextjs/server'
import { createSupabaseClient } from '../supabase'
import { createSupabaseServerClient } from '../supabase.server'

// Fungsi utama untuk mengambil data companions terbaru milik pengguna saat ini.
// not used, still figuring the jwt auth superbase
export async function fetchLatestCompanionsForCurrentUser(limit: number = 10) {
  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    return []
  }

  const { data, error } = await supabase.rpc('get_latest_companions_for_current_user', {
    limit_count: limit,
  })

  if (error) {
    console.error('Error fetching latest companions:', error)
    return []
  }

  return data
}


export const createCompanion = async (formData: CreateCompanion) => {
   const { userId: author } = await auth();
   const supabase = createSupabaseClient();

   const { data, error } = await supabase
      .from("companions")
      .insert({ ...formData, author })
      .select();
   
   if(error || !data) throw new Error(error?.message || 'Failed to create a companion')

   return data[0]
};

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
   const supabase = createSupabaseClient()

   let query = supabase.from('companions').select()

   if(subject && topic) {
      query = query.ilike('subject', `%${subject}%`)
         .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
   } else if(subject) {
      query = query.ilike('subject', `%${subject}%`)
   } else if(topic) {
      query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
   }

   query = query.range((page - 1) * limit, page * limit -1)

   const { data: companions, error } = await query

   if(error) throw new Error(error.message)

   return companions
}

export const getCompanion = async (id: string) => {
   const supabase = createSupabaseClient()

   const { data, error } = await supabase
      .from('companions')
      .select()
      .eq('id', id)
   
   if(error) return console.log(error)

   return data[0]
}

export const addToSessionHistory = async (companionId: string) => {
   const { userId } = await auth()
   const supabase = createSupabaseClient()
   const { data, error } = await supabase.from('session_history')
      .insert({
         companion_id: companionId,
         user_id: userId,
      })
   
   if(error) throw new Error(error.message)

   return data
}

// not used, duplicacy, key issue, found better function
export const getRecentSessions = async (limit = 10) => {
   const supabase = createSupabaseClient()
   const { data, error } = await supabase
      .from('session_history')
      .select(`companions:companion_id (*)`)
      .order('created_at', { ascending: false })
      .limit(limit)

   if(error) throw new Error(error.message)

   return data.map(({ companions }) => companions)
}

//i love using it, it has no duplicacy, and no jwt auth superbase required
export const getRecentUniqueSessions = async (limit = 10) => {
   const supabase = createSupabaseClient()
   const { data, error } = await supabase
      .rpc('get_latest_companions_full', {limit_count: limit})

   if(error) throw new Error(error.message)
   return data

   // return data.map(({ companions }) => companions)
}

// not-used, no duplicacy
export const getUserRecentUniqueSessions = async (limit = 10) => {
   const supabase = createSupabaseClient()
   const { data, error } = await supabase
      .rpc('get_latest_companions_full', {limit_count: limit})

   if(error) throw new Error(error.message)
   return data

   // return data.map(({ companions }) => companions)
}

// not-used, for global session table, originally from tutorial, has duplicacy, has limit
export const getUserSession = async (userId: string, limit = 10) => {
   const supabase = createSupabaseClient()
   const { data, error } = await supabase
      .from('session_history')
      .select(`companions:companion_id (*)`)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

   if(error) throw new Error(error.message)

   return data.map(({ companions }) => companions)
}
//used, for user session table, originally from tutorial, has duplicacy, all user sessions, key issue solved
export const getAllUserSessions = async (userId: string) => {
   const supabase = createSupabaseClient()
   const { data, error } = await supabase
      .from('session_history')
      .select(`id, companions:companion_id (*)`)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

   if(error) throw new Error(error.message)

   return data
   // return data.map(({ companions }) => companions)
}

//used, for companion card, originally from tutorial, has duplicacy
export const getAllUserCompanions = async (userId: string) => {
   const supabase = createSupabaseClient()
   const { data, error } = await supabase
      .from('companions')
      .select()
      .eq('author', userId)

   if(error) throw new Error(error.message)

   return data
}
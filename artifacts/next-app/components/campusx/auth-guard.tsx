'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isSupabaseConfigured, createClient } from '@/lib/supabase/client'

const ALLOWED_DOMAIN = '@iitp.ac.in'

export default function AuthGuard() {
  const router = useRouter()

  useEffect(() => {
    if (!isSupabaseConfigured) return

    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const user = session?.user
        if (user && !user.email?.endsWith(ALLOWED_DOMAIN)) {
          await supabase.auth.signOut()
          router.replace('/?error=access_denied')
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [router])

  return null
}

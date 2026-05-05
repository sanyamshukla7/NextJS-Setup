'use client'

import { useState, useCallback } from 'react'
import Navbar from './navbar'
import Hero from './hero'
import MainContent from './main-content'
import Footer from './footer'
import SellModal from './sell-modal'
import AuthModal from './auth-modal'
import { isSupabaseConfigured, createClient } from '@/lib/supabase/client'

export default function MarketplaceClient() {
  const [showSell, setShowSell] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [listingsRefresh, setListingsRefresh] = useState(0)

  const handleSellClick = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setShowAuth(true)
      return
    }
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setShowAuth(true)
    } else {
      setShowSell(true)
    }
  }, [])

  const handleListingSuccess = useCallback(() => {
    // Bump refresh counter so Listings re-fetches
    setListingsRefresh(n => n + 1)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar onSell={handleSellClick} />
      <Hero onSell={handleSellClick} />
      <MainContent onSell={handleSellClick} listingsRefresh={listingsRefresh} />
      <Footer />

      {showSell && (
        <SellModal
          onClose={() => setShowSell(false)}
          onSuccess={handleListingSuccess}
        />
      )}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  )
}

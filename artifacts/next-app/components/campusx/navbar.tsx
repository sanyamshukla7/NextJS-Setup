'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, Search, Bell, LogOut, User } from 'lucide-react'
import { isSupabaseConfigured, createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import AuthModal from './auth-modal'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )
    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    if (!isSupabaseConfigured) return
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Campus<span className="text-pink-500">X</span>
              </span>
            </div>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-8 md:flex">
              <a href="#" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">Browse</a>
              <a href="#" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">Books</a>
              <a href="#" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">Electronics</a>
              <a href="#" className="text-sm font-medium text-gray-400 transition-colors hover:text-white">Rent</a>
            </div>

            {/* Right actions */}
            <div className="hidden items-center gap-3 md:flex">
              <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white">
                <Search className="h-5 w-5" />
              </button>
              <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white">
                <Bell className="h-5 w-5" />
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5">
                    <User className="h-4 w-4 text-pink-400" />
                    <span className="max-w-[160px] truncate text-xs text-gray-300">{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="rounded-lg border border-white/20 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Log in
                </button>
              )}

              <button
                onClick={() => setShowAuth(true)}
                className="rounded-lg bg-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-pink-400 hover:shadow-pink-500/30 active:scale-95"
              >
                Sell
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-gray-950 px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-2">
              <a href="#" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10">Browse</a>
              <a href="#" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10">Books</a>
              <a href="#" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10">Electronics</a>
              <a href="#" className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10">Rent</a>
              {user ? (
                <div className="mt-2 flex flex-col gap-2">
                  <div className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400">{user.email}</div>
                  <button onClick={handleSignOut} className="rounded-lg border border-white/20 py-2 text-sm font-medium text-white hover:bg-white/10">
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex gap-2">
                  <button onClick={() => { setShowAuth(true); setMenuOpen(false) }} className="flex-1 rounded-lg border border-white/20 py-2 text-sm font-medium text-white hover:bg-white/10">
                    Log in
                  </button>
                  <button onClick={() => { setShowAuth(true); setMenuOpen(false) }} className="flex-1 rounded-lg bg-pink-500 py-2 text-sm font-semibold text-white hover:bg-pink-400">
                    Sell
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}

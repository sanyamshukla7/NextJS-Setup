'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Mail, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react'

interface AuthModalProps {
  onClose: () => void
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.endsWith('@iitp.ac.in')) {
      setError('Only @iitp.ac.in email addresses are allowed.')
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    setLoading(false)

    if (authError) {
      setError(authError.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-gray-900 p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-500 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {sent ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500/20">
              <Mail className="h-7 w-7 text-pink-400" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-white">Check your inbox</h2>
            <p className="text-sm text-gray-400">
              We sent a magic link to <span className="font-medium text-white">{email}</span>.
              Click it to sign in — no password needed.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500/20">
                <ShieldCheck className="h-7 w-7 text-pink-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Sign in to CampusX</h2>
              <p className="mt-1 text-sm text-gray-400">
                Exclusive to IIT Patna students
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  IITP Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@iitp.ac.in"
                  required
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/40"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-pink-500 py-3 text-sm font-semibold text-white transition-all hover:bg-pink-400 disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending link…</>
                ) : (
                  <><Mail className="h-4 w-4" /> Send Magic Link</>
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-600">
              Only <span className="text-gray-400">@iitp.ac.in</span> addresses are accepted.
              Non-IITP users will be automatically signed out.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

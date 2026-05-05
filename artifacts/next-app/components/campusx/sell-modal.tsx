'use client'

import { useState } from 'react'
import { X, Tag, Loader2, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react'
import { isSupabaseConfigured, createClient } from '@/lib/supabase/client'

interface SellModalProps {
  onClose: () => void
  onSuccess?: () => void
}

const CATEGORIES = ['Books & Notes', 'Electronics', 'Cycles & Sports', 'Clothing', 'Furniture', 'Fitness', 'Other']
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair']

export default function SellModal({ onClose, onSuccess }: SellModalProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    listing_type: 'sale' as 'sale' | 'rent',
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!isSupabaseConfigured) {
      setError('Auth not configured — add Supabase credentials.')
      return
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be signed in with your @iitp.ac.in email to list an item.')
      return
    }

    const price = parseFloat(form.price)
    if (isNaN(price) || price <= 0) {
      setError('Enter a valid price greater than ₹0.')
      return
    }
    if (!form.category) {
      setError('Please select a category.')
      return
    }
    if (!form.condition) {
      setError('Please select the item condition.')
      return
    }

    setLoading(true)
    const { error: insertError } = await supabase.from('items').insert({
      user_id: user.id,
      seller_email: user.email,
      title: form.title.trim(),
      description: form.description.trim() || null,
      price,
      category: form.category,
      condition: form.condition,
      listing_type: form.listing_type,
      status: 'active',
    })
    setLoading(false)

    if (insertError) {
      setError(insertError.message)
    } else {
      setDone(true)
      onSuccess?.()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-gray-900 p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-500 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {done ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle className="h-7 w-7 text-green-400" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-white">Listing Published!</h2>
            <p className="text-sm text-gray-400 mb-6">
              Your item is now live on the CampusX marketplace for all IITP students to see.
            </p>
            <button
              onClick={onClose}
              className="rounded-lg bg-pink-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-pink-400 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/20">
                  <Tag className="h-4 w-4 text-pink-400" />
                </div>
                <h2 className="text-xl font-bold text-white">List an Item</h2>
              </div>
              <p className="text-sm text-gray-500 ml-10">Reach 2,400+ IITP students instantly</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Listing type toggle */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">Listing Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['sale', 'rent'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => set('listing_type', type)}
                      className={`rounded-lg border py-2.5 text-sm font-semibold transition-all ${
                        form.listing_type === type
                          ? type === 'sale'
                            ? 'border-pink-500/60 bg-pink-500/20 text-pink-300'
                            : 'border-blue-500/60 bg-blue-500/20 text-blue-300'
                          : 'border-white/15 bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {type === 'sale' ? 'For Sale' : 'For Rent'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">Item Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  placeholder="e.g. Engineering Mathematics Vol. 1"
                  required
                  maxLength={120}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/40"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">Description <span className="text-gray-600">(optional)</span></label>
                <textarea
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Describe condition, edition, any defects…"
                  rows={3}
                  maxLength={500}
                  className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/40"
                />
              </div>

              {/* Category + Condition row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-400">Category *</label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={e => set('category', e.target.value)}
                      required
                      className="w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 pr-8 text-sm text-white outline-none transition-all focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/40 [&>option]:bg-gray-900"
                    >
                      <option value="" disabled>Select…</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-400">Condition *</label>
                  <div className="relative">
                    <select
                      value={form.condition}
                      onChange={e => set('condition', e.target.value)}
                      required
                      className="w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 pr-8 text-sm text-white outline-none transition-all focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/40 [&>option]:bg-gray-900"
                    >
                      <option value="" disabled>Select…</option>
                      {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-400">
                  Price * {form.listing_type === 'rent' && <span className="text-gray-500">— per month</span>}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">₹</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => set('price', e.target.value)}
                    placeholder="0"
                    required
                    min="1"
                    step="1"
                    className="w-full rounded-lg border border-white/15 bg-white/5 py-3 pl-8 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/40"
                  />
                </div>
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
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-pink-500 py-3 text-sm font-semibold text-white transition-all hover:bg-pink-400 disabled:opacity-60 active:scale-[0.98]"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Publishing…</>
                ) : (
                  <><Tag className="h-4 w-4" /> Publish Listing</>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

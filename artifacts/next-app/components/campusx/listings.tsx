'use client'

import { useEffect, useState, useCallback } from 'react'
import { Clock, RefreshCcw } from 'lucide-react'
import { isSupabaseConfigured, createClient } from '@/lib/supabase/client'

interface Item {
  id: string
  created_at: string
  title: string
  description: string | null
  price: number
  category: string
  condition: string | null
  listing_type: 'sale' | 'rent'
  seller_email: string
  status: string
}

const SAMPLE_LISTINGS = [
  { id: 's1', created_at: '', title: 'Engineering Mathematics Vol. 1 & 2', price: 280, listing_type: 'sale' as const, condition: 'Good', seller_email: 'rahul@iitp.ac.in', category: 'Books & Notes', description: null, status: 'active' },
  { id: 's2', created_at: '', title: 'HP Laptop 15s (8 GB, 512 GB SSD)', price: 32000, listing_type: 'sale' as const, condition: 'Like New', seller_email: 'priya@iitp.ac.in', category: 'Electronics', description: null, status: 'active' },
  { id: 's3', created_at: '', title: 'Hero Sprint 26" Mountain Cycle', price: 150, listing_type: 'rent' as const, condition: 'Good', seller_email: 'aditya@iitp.ac.in', category: 'Cycles & Sports', description: null, status: 'active' },
  { id: 's4', created_at: '', title: 'Data Structures by Cormen (CLRS)', price: 450, listing_type: 'sale' as const, condition: 'Fair', seller_email: 'sneha@iitp.ac.in', category: 'Books & Notes', description: null, status: 'active' },
  { id: 's5', created_at: '', title: 'Casio FX-991ES Scientific Calculator', price: 600, listing_type: 'sale' as const, condition: 'Like New', seller_email: 'arjun@iitp.ac.in', category: 'Electronics', description: null, status: 'active' },
  { id: 's6', created_at: '', title: 'Study Chair — cushioned armrest', price: 200, listing_type: 'rent' as const, condition: 'Good', seller_email: 'kavya@iitp.ac.in', category: 'Furniture', description: null, status: 'active' },
]

const tagStyle: Record<string, string> = {
  sale: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  rent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

function timeAgo(iso: string) {
  if (!iso) return 'sample'
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function sellerInitial(email: string) {
  return email?.[0]?.toUpperCase() ?? '?'
}

function sellerName(email: string) {
  return email?.split('@')[0] ?? 'IITP Student'
}

interface ListingsProps {
  refresh?: number
}

export default function Listings({ refresh = 0 }: ListingsProps) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'sale' | 'rent'>('all')
  const [isReal, setIsReal] = useState(false)

  const fetchItems = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setItems(SAMPLE_LISTINGS)
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(30)

    if (error || !data || data.length === 0) {
      setItems(SAMPLE_LISTINGS)
      setIsReal(false)
    } else {
      setItems(data as Item[])
      setIsReal(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchItems() }, [fetchItems, refresh])

  const filtered = filter === 'all' ? items : items.filter(i => i.listing_type === filter)

  return (
    <section id="listings" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">
            {isReal ? 'Live Listings' : 'Recent Listings'}
          </h2>
          {isReal && (
            <button onClick={() => { setLoading(true); fetchItems() }} className="rounded-lg p-1.5 text-gray-500 hover:text-gray-300 hover:bg-white/10 transition-colors">
              <RefreshCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {(['all', 'sale', 'rent'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg border px-3 py-1.5 text-xs transition-all ${
                filter === f
                  ? f === 'all'
                    ? 'border-white/30 bg-white/10 text-white'
                    : f === 'sale'
                    ? 'border-pink-500/40 bg-pink-500/10 text-pink-400'
                    : 'border-blue-500/40 bg-blue-500/10 text-blue-400'
                  : 'border-white/15 text-gray-400 hover:bg-white/10'
              }`}
            >
              {f === 'all' ? 'All' : f === 'sale' ? 'For Sale' : 'For Rent'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map(n => (
            <div key={n} className="h-52 animate-pulse rounded-xl border border-white/10 bg-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-gray-500">No listings found. Be the first to list something!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(item => (
            <div
              key={item.id}
              className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-pink-500/5"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagStyle[item.listing_type]}`}>
                  {item.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-400">
                  {item.category}
                </span>
              </div>

              <h3 className="mb-1 line-clamp-2 font-semibold leading-snug text-white transition-colors group-hover:text-pink-300">
                {item.title}
              </h3>
              {item.condition && (
                <p className="mb-4 text-xs text-gray-500">Condition: {item.condition}</p>
              )}

              <p className="mb-4 text-2xl font-bold text-pink-400">
                ₹{item.price.toLocaleString('en-IN')}
                {item.listing_type === 'rent' && <span className="text-sm font-normal text-gray-500">/mo</span>}
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500/20 text-xs font-bold text-pink-400">
                    {sellerInitial(item.seller_email)}
                  </div>
                  <p className="text-xs font-medium text-gray-300">{sellerName(item.seller_email)}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  {timeAgo(item.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => { setLoading(true); fetchItems() }}
            className="rounded-lg border border-white/15 px-8 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10"
          >
            Refresh listings
          </button>
        </div>
      )}
    </section>
  )
}

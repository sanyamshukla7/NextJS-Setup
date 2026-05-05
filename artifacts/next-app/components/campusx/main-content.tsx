'use client'

import { BookOpen, Cpu, Bike, Shirt, Sofa, Dumbbell, Tag, ArrowRight } from 'lucide-react'
import Listings from './listings'

const categories = [
  { icon: BookOpen, label: 'Books & Notes',   color: 'bg-pink-500/20 text-pink-400' },
  { icon: Cpu,      label: 'Electronics',      color: 'bg-purple-500/20 text-purple-400' },
  { icon: Bike,     label: 'Cycles & Sports',  color: 'bg-blue-500/20 text-blue-400' },
  { icon: Shirt,    label: 'Clothing',          color: 'bg-emerald-500/20 text-emerald-400' },
  { icon: Sofa,     label: 'Furniture',         color: 'bg-amber-500/20 text-amber-400' },
  { icon: Dumbbell, label: 'Fitness',           color: 'bg-rose-500/20 text-rose-400' },
]

interface MainContentProps {
  onSell?: () => void
  listingsRefresh?: number
}

export default function MainContent({ onSell, listingsRefresh = 0 }: MainContentProps) {
  return (
    <div className="bg-gray-950 pb-20">
      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Browse by Category</h2>
          <a href="#listings" className="flex items-center gap-1 text-sm text-pink-400 hover:text-pink-300">
            See all <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-white">{label}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Live listings — client component with Supabase fetch */}
      <Listings refresh={listingsRefresh} />

      {/* Sell CTA banner */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-transparent p-8 sm:p-12">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-400">
                <Tag className="h-3 w-3" /> Quick &amp; Easy
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Got something to sell?</h2>
              <p className="mt-1 text-gray-400">
                List your item in under 2 minutes and reach 2,400+ IITP students.
              </p>
            </div>
            <button
              onClick={onSell}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-pink-500 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-pink-500/30 transition-all hover:bg-pink-400 hover:shadow-pink-400/40 active:scale-95"
            >
              <Tag className="h-5 w-5" />
              Sell Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

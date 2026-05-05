import { Search, ArrowRight, Tag, Users, ShieldCheck } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-950 pb-20 pt-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-600/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-sm text-pink-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink-400" />
          Exclusively for IITP students
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your Campus,{' '}
          <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
            Your Marketplace
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
          Buy, rent, or sell anything — textbooks, electronics, furniture, and more — with verified IITP students you can trust.
        </p>

        {/* Search bar */}
        <div className="mx-auto mb-8 flex max-w-xl overflow-hidden rounded-xl border border-white/15 bg-white/5 ring-1 ring-white/5 focus-within:ring-pink-500/50">
          <div className="flex items-center pl-4 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search textbooks, laptops, cycles…"
            className="flex-1 bg-transparent px-3 py-3.5 text-sm text-white placeholder-gray-500 outline-none"
          />
          <button className="m-1.5 rounded-lg bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-400 transition-colors">
            Search
          </button>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#listings"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Browse Items
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            id="sell"
            href="#sell"
            className="inline-flex items-center gap-2 rounded-lg bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 hover:bg-pink-400 transition-all active:scale-95"
          >
            <Tag className="h-4 w-4" />
            Sell Something
          </a>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: Users, value: '2,400+', label: 'Active Students' },
            { icon: Tag, value: '1,800+', label: 'Items Listed' },
            { icon: ShieldCheck, value: '100%', label: 'Verified IITPians' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="mb-1 h-5 w-5 text-pink-400" />
              <span className="text-2xl font-bold text-white">{value}</span>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

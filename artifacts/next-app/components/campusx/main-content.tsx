import { BookOpen, Cpu, Bike, Shirt, Sofa, Dumbbell, Tag, Clock, ArrowRight } from 'lucide-react'

const categories = [
  { icon: BookOpen, label: 'Books & Notes', count: 342, color: 'bg-pink-500/20 text-pink-400' },
  { icon: Cpu, label: 'Electronics', count: 218, color: 'bg-purple-500/20 text-purple-400' },
  { icon: Bike, label: 'Cycles & Sports', count: 94, color: 'bg-blue-500/20 text-blue-400' },
  { icon: Shirt, label: 'Clothing', count: 156, color: 'bg-emerald-500/20 text-emerald-400' },
  { icon: Sofa, label: 'Furniture', count: 73, color: 'bg-amber-500/20 text-amber-400' },
  { icon: Dumbbell, label: 'Fitness', count: 45, color: 'bg-rose-500/20 text-rose-400' },
]

const listings = [
  { title: 'Engineering Mathematics Vol. 1 & 2', price: '₹280', tag: 'For Sale', condition: 'Good', seller: 'Rahul K.', batch: 'B.Tech CSE', time: '2h ago', badge: 'Books' },
  { title: 'HP Laptop 15s (8GB, 512GB SSD)', price: '₹32,000', tag: 'For Sale', condition: 'Like New', seller: 'Priya M.', batch: 'B.Tech EE', time: '5h ago', badge: 'Electronics' },
  { title: 'Cycle — Hero Sprint 26" Mountain', price: '₹150/mo', tag: 'For Rent', condition: 'Good', seller: 'Aditya S.', batch: 'B.Tech ME', time: '1d ago', badge: 'Cycles' },
  { title: 'Data Structures by Cormen (CLRS)', price: '₹450', tag: 'For Sale', condition: 'Fair', seller: 'Sneha R.', batch: 'B.Tech CSE', time: '3h ago', badge: 'Books' },
  { title: 'Scientific Calculator Casio FX-991', price: '₹600', tag: 'For Sale', condition: 'Like New', seller: 'Arjun P.', batch: 'B.Tech MA', time: '6h ago', badge: 'Electronics' },
  { title: 'Study Chair — cushioned armrest', price: '₹200/mo', tag: 'For Rent', condition: 'Good', seller: 'Kavya T.', batch: 'M.Tech CS', time: '2d ago', badge: 'Furniture' },
]

const tagColors: Record<string, string> = {
  'For Sale': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'For Rent': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

export default function MainContent() {
  return (
    <div className="bg-gray-950 pb-20">
      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Browse by Category</h2>
          <a href="#" className="flex items-center gap-1 text-sm text-pink-400 hover:text-pink-300">
            See all <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ icon: Icon, label, count, color }) => (
            <button
              key={label}
              className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-gray-500">{count} items</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Listings</h2>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-gray-400 hover:bg-white/10">All</button>
            <button className="rounded-lg border border-pink-500/40 bg-pink-500/10 px-3 py-1.5 text-xs text-pink-400">For Sale</button>
            <button className="rounded-lg border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-400">For Rent</button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((item) => (
            <div
              key={item.title}
              className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-pink-500/5"
            >
              {/* Header row */}
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagColors[item.tag]}`}>
                  {item.tag}
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-gray-400">{item.badge}</span>
              </div>

              {/* Title */}
              <h3 className="mb-1 font-semibold leading-snug text-white group-hover:text-pink-300 transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="mb-4 text-xs text-gray-500">Condition: {item.condition}</p>

              {/* Price */}
              <p className="mb-4 text-2xl font-bold text-pink-400">{item.price}</p>

              {/* Seller */}
              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500/20 text-xs font-bold text-pink-400">
                    {item.seller[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-300">{item.seller}</p>
                    <p className="text-xs text-gray-600">{item.batch}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-8 text-center">
          <button className="rounded-lg border border-white/15 px-8 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10">
            Load more listings
          </button>
        </div>
      </section>

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
            <a
              href="#sell"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-pink-500 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-pink-500/30 transition-all hover:bg-pink-400 hover:shadow-pink-400/40 active:scale-95"
            >
              <Tag className="h-5 w-5" />
              Sell Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

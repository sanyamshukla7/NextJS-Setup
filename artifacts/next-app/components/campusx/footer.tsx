import { ShoppingBag, Github, Twitter, Instagram } from 'lucide-react'

const links = {
  Marketplace: ['Browse All', 'Books & Notes', 'Electronics', 'Furniture', 'Cycles & Sports'],
  Support: ['How it Works', 'Safety Tips', 'Report an Item', 'Contact Us'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Campus<span className="text-pink-500">X</span>
              </span>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-500">
              The trusted peer-to-peer marketplace built exclusively for IIT Patna students. Buy, rent, or sell — all within your campus community.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-500 transition-colors hover:border-white/20 hover:text-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="mb-4 text-sm font-semibold text-white">{heading}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-500 transition-colors hover:text-gray-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">© 2025 CampusX. Made with ❤️ for IITP students.</p>
          <p className="text-xs text-gray-600">IIT Patna, Bihta, Bihar 801106</p>
        </div>
      </div>
    </footer>
  )
}

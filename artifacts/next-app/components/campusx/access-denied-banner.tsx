'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ShieldX, X } from 'lucide-react'

export default function AccessDeniedBanner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (searchParams.get('error') === 'access_denied') {
      setVisible(true)
    }
  }, [searchParams])

  function dismiss() {
    setVisible(false)
    // Remove the ?error= param from the URL cleanly
    router.replace('/', { scroll: false })
  }

  if (!visible) return null

  return (
    <div className="fixed left-1/2 top-20 z-50 w-full max-w-md -translate-x-1/2 px-4">
      <div className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950 p-4 shadow-2xl">
        <ShieldX className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
        <div className="flex-1">
          <p className="font-semibold text-red-300">Exclusive to IITP Students</p>
          <p className="mt-0.5 text-sm text-red-400/90">
            This platform is only accessible with an <strong className="text-red-300">@iitp.ac.in</strong> email address.
            You have been signed out automatically.
          </p>
        </div>
        <button
          onClick={dismiss}
          className="rounded p-0.5 text-red-500 hover:text-red-300 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

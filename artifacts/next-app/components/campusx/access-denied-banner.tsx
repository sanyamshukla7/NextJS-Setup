'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertTriangle, X } from 'lucide-react'

export default function AccessDeniedBanner() {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (searchParams.get('error') === 'access_denied') {
      setVisible(true)
    }
  }, [searchParams])

  if (!visible) return null

  return (
    <div className="fixed left-1/2 top-20 z-50 w-full max-w-lg -translate-x-1/2 px-4">
      <div className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950/90 p-4 shadow-2xl backdrop-blur-sm">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
        <div className="flex-1">
          <p className="font-semibold text-red-300">Access Denied</p>
          <p className="mt-0.5 text-sm text-red-400">
            This platform is exclusive to IIT Patna students. Only <strong>@iitp.ac.in</strong> email addresses are allowed.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="rounded p-0.5 text-red-400 hover:text-red-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

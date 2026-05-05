import { NextResponse, type NextRequest } from 'next/server'

// Middleware only refreshes cookies — domain enforcement is handled by:
// 1. auth-modal.tsx  (blocks non-@iitp.ac.in before magic link is sent)
// 2. app/auth/callback/route.ts  (Node.js runtime, signs out violators server-side)
// 3. components/campusx/auth-guard.tsx (client-side, signs out any session with wrong domain)
export async function middleware(request: NextRequest) {
  return NextResponse.next({ request })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

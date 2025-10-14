import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Check for subdomain
  const hostname = request.headers.get('host') || 'tawf.xyz'
  const subdomain = hostname.split('.')[0]

  // If accessing portal subdomain, rewrite to portal page
  // Handle both production and localhost portal subdomain
  if (
    (subdomain === 'portal' && (hostname.endsWith('.localhost') || hostname.endsWith('.tawf.xyz')))
    || hostname === 'portal.localhost'
  ) {
    url.pathname = `/portal${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

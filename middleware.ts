import { NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get("host") || ""

  // Get the subdomain from the hostname
  // Examples:
  // - governance.tawf.xyz -> governance
  // - dashboard.tawf.xyz -> dashboard
  // - transparency.tawf.xyz -> transparency
  // - localhost:3000 -> (none)
  // - governance.localhost:3000 -> governance

  // Extract subdomain (supports both production and localhost)
  let subdomain: string | null = null

  // For localhost development (e.g., governance.localhost:3000)
  if (hostname.includes("localhost")) {
    const parts = hostname.split(".")
    if (parts.length > 1 && parts[0] !== "localhost") {
      subdomain = parts[0]
    }
  } else {
    // For production domains (e.g., governance.tawf.xyz)
    const parts = hostname.split(".")
    // Check if it's a subdomain (more than 2 parts for .app, or more than 3 for .co.uk etc)
    if (parts.length > 2) {
      subdomain = parts[0]
    }
  }

  // Route based on subdomain
  if (subdomain === "governance") {
    // Rewrite to /governance path
    return NextResponse.rewrite(new URL(`/governance${url.pathname}`, req.url))
  }

  if (subdomain === "dashboard") {
    // Rewrite to /dashboard path
    return NextResponse.rewrite(new URL(`/dashboard${url.pathname}`, req.url))
  }

  if (subdomain === "transparency") {
    // Rewrite to /transparency path
    return NextResponse.rewrite(new URL(`/transparency${url.pathname}`, req.url))
  }

  // For main domain or no subdomain, continue normally
  return NextResponse.next()
}

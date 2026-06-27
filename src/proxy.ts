import { type NextRequest, NextResponse } from 'next/server';

// ── Supabase session refresh (disabled by default) ─────────────────────────
// Uncomment the block below when enabling Supabase auth.
// See README "Enabling Supabase" for full setup instructions.
//
// import { createMiddlewareSupabaseClient } from '@/libs/supabase';

export const proxy = (request: NextRequest) => {
  // ── Supabase auth guard (disabled by default) ─────────────────────────────
  // To enable:
  //   1. Follow the README "Enabling Supabase" steps.
  //   2. Uncomment the import above and replace this function body with:
  //
  // const { supabase, supabaseResponse } = createMiddlewareSupabaseClient(request);
  //
  // // Refresh session — use getUser() not getSession() (server-validated).
  // const { data: { user } } = await supabase.auth.getUser();
  //
  // const { pathname } = request.nextUrl;
  // const isAuthRoute = pathname.startsWith('/auth');
  // const isProtected = pathname.startsWith('/dashboard') || pathname === '/';
  //
  // if (!user && isProtected) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/auth/login';
  //   return NextResponse.redirect(url);
  // }
  //
  // if (user && isAuthRoute) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/dashboard';
  //   return NextResponse.redirect(url);
  // }
  //
  // return supabaseResponse;

  return NextResponse.next({ request });
};

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - static asset extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

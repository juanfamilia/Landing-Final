import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // If root path, redirect to /en
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next|api|favicon.ico).*)']
};
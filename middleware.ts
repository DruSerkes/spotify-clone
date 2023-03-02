import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;
  if (pathname === '/login' && token) return NextResponse.redirect(new URL('/', req.url))
  if (pathname.includes('/api/auth') || token) return NextResponse.next()
  if (pathname !== ('/login') && !token) return NextResponse.redirect(new URL("/login", req.url));
};

export const config = {
  matcher: "/",
};
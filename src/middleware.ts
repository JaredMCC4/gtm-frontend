import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/auth/login",
  "/auth/registro",
  "/auth/callback",
];

const PROTECTED_PATH_PREFIXES = [
  "/dashboard",
  "/tareas",
  "/calendario",
  "/etiquetas",
  "/perfil",
  "/admin",
];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  if (pathname.startsWith("/auth/callback/")) return true;
  return false;
}

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check for auth token in cookies
  const accessToken = request.cookies.get("gtm_access_token")?.value;
  const isAuthenticated = Boolean(accessToken);

  // If trying to access protected route without auth, redirect to login
  if (isProtectedPath(pathname) && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated user tries to access login/register, redirect to dashboard
  if (isAuthenticated && (pathname === "/auth/login" || pathname === "/auth/registro")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};

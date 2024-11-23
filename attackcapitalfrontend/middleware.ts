import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  // protected routes
  const protectedRoutes = ["/dashboard", "/createPost", "/"];

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Applying middleware to specific routes
export const config = {
  matcher: ["/dashboard", "/createPost", "/"], // Protect these routes
};

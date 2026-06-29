import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // 1. Check if path is admin page (excluding /admin/login)
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";

  // 2. Check if path is protected API route
  const isProtectedApi =
    pathname.startsWith("/api/projects") ||
    pathname.startsWith("/api/services") ||
    pathname.startsWith("/api/team-members") ||
    (pathname.startsWith("/api/enquiries") && method !== "POST"); // Allow public POST for contact form

  if (isAdminPage || isProtectedApi) {
    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      if (isProtectedApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      if (isProtectedApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/projects",
    "/api/projects/:path*",
    "/api/services",
    "/api/services/:path*",
    "/api/team-members",
    "/api/team-members/:path*",
    "/api/enquiries",
    "/api/enquiries/:path*",
  ],
};

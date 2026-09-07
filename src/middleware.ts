import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    const role = token?.role;

    // Direct dashboard root routes to appropriate role view if someone lands on /dashboard
    if (pathname === "/dashboard") {
      if (role === "STUDENT") {
        return NextResponse.redirect(new URL("/student", req.url));
      } else if (role === "ACADEMICIAN" || role === "MENTOR") {
        return NextResponse.redirect(new URL("/academician", req.url));
      } else if (role === "INDUSTRY") {
        return NextResponse.redirect(new URL("/industry", req.url));
      } else if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role-specific route boundaries
    if (pathname.startsWith("/student") && role !== "STUDENT" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      pathname.startsWith("/academician") &&
      role !== "ACADEMICIAN" &&
      role !== "MENTOR" &&
      role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/industry") && role !== "INDUSTRY" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        // Public pages don't require auth
        if (
          pathname === "/" ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register") ||
          pathname.startsWith("/unauthorized") ||
          pathname.startsWith("/api/auth")
        ) {
          return true;
        }
        // All protected dashboard and profile routes require a valid token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/student/:path*",
    "/academician/:path*",
    "/industry/:path*",
    "/admin/:path*",
  ],
};

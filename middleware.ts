import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

// Middleware function to handle authentication and routing logic
export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session;
  console.log("isLoggedIn: ", isLoggedIn); // Check if the user is logged in

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api");
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === "/[projectName]") {
      // Match any single-segment path that's not in authRoutes
      return (
        /^\/[^/]+$/.test(nextUrl.pathname) &&
        !authRoutes.includes(nextUrl.pathname)
      );
    }
    return route === nextUrl.pathname;
  });
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow API routes to proceed without redirection
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Handle authentication routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      // Redirect logged-in users to the default login redirect page
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access non-public routes
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search; // Include query parameters in the callback URL
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // Handle logged-in users accessing the "/projects" route
  if (isLoggedIn) {
    if (nextUrl.pathname === "/projects") {
      try {
        const userId = session.user?.id;
        // Fetch the last active project for the user
        const response = await fetch(`${nextUrl.origin}/api/projects/exist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userId}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch last active project: ${await response.text()}`
          );
        }

        const { projectId } = await response.json();
        if (!projectId) {
          // Redirect to project creation if no active project exists
          return NextResponse.redirect(new URL("/projects/create", req.url));
        } else {
          // Redirect to the overview of the last active project
          return NextResponse.redirect(
            new URL(`/projects/${projectId}/overview`, req.url)
          );
        }
      } catch (error) {
        console.error("Error checking for last active project:", error);
        // Redirect to an error page if fetching the project fails
        return NextResponse.redirect(new URL("/login/error", req.url));
      }
    }
  }

  return NextResponse.next();
});

// Configuration for the middleware matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

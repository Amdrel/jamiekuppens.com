import redirects from "./redirects.json";

export const config = {
  matcher: "/posts/:slug*",
};

/**
 * This middleware handles dynamic redirects. These Redirects are generated at
 * build time and are placed into a 'redirects.json' file.
 */
export default function middleware(request: Request) {
  const url = new URL(request.url);

  for (const [path, redirectUrl] of Object.entries(redirects)) {
    if (url.pathname === path) {
      return Response.redirect(redirectUrl, 301);
    }
  }
}

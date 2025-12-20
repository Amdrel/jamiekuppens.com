import redirects from "./redirects.json";

export const config = {
  matcher: "/posts/:slug*",
};

/**
 * This middleware handles dynamic redirects.
 *
 * These Redirects are generated at build time and are placed into a
 * 'redirects.json' file. We can't use Astro redirects as those only support
 * redirects on the same domain.
 *
 * Full discussion: https://github.com/withastro/roadmap/discussions/847
 */
export default function middleware(request: Request) {
  const url = new URL(request.url);

  for (const [path, redirectUrl] of Object.entries(redirects)) {
    if (url.pathname === path || url.pathname === path + "/") {
      return Response.redirect(redirectUrl, 308);
    }
  }
}

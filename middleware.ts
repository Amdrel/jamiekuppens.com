import redirects from "./redirects.json";

export const config = {
  matcher: "/posts/:slug*",
};

export default function middleware(request: Request) {
  const url = new URL(request.url);

  for (const [path, redirectUrl] of Object.entries(redirects)) {
    if (url.pathname.startsWith(path)) {
      return Response.redirect(redirectUrl, 301);
    }
  }
}

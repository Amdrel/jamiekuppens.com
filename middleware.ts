export const config = {
  matcher: "/posts/:slug*",
};

export default function middleware(request: Request): Response {
  return Response.redirect("https://www.jamiekuppens.com", 301);
}

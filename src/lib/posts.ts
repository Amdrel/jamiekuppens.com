import type { PostLayoutProps } from "../types";

export function getPosts(): Record<string, PostLayoutProps> {
  return import.meta.glob("../pages/posts/*.mdx", { eager: true });
}

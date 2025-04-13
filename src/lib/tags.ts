import { getPosts } from "./posts";

/**
 * Finds all unique tags used in all blog content on the site.
 */
export async function getUniqueTags(tags?: string[]) {
  return new Set(
    tags ??
      Object.values(await getPosts())
        .map((post) => post.data.tags)
        .flat(),
  );
}

/**
 * Returns all tags sorted alphanumerically.
 */
export async function getSortedTags(tags?: string[]) {
  return [...(await getUniqueTags(tags))].sort((a, b) => a.localeCompare(b));
}

/**
 * Map tag slugs to human-readable tag names.
 */
export function getTagName(tag: string) {
  switch (tag) {
    case "app-engine":
      return "App Engine";
    case "css":
      return "CSS";
    case "devtools":
      return "Developer Tools";
    case "github-actions":
      return "GitHub Actions";
    case "golang":
      return "Go";
    case "graphql":
      return "GraphQL";
    case "html":
      return "HTML";
    case "javascript":
      return "JavaScript";
    case "mdx":
      return "MDX";
    case "node":
      return "Node.js";
    case "npm":
      return "npm";
    case "postgresql":
      return "PostgreSQL";
    case "pwa":
      return "PWA";
    case "shadow-dom":
      return "Shadow DOM";
    case "typescript":
      return "TypeScript";
    case "ci":
      return "CI / CD";
    default:
      return tag
        .replaceAll("-", " ")
        .split(" ")
        .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
        .join(" ");
  }
}

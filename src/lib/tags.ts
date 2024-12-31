export function getTagName(tag: string): string | null {
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
    default:
      return null;
  }
}

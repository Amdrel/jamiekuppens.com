type Post = {
  url: string;
  frontmatter: {
    layout: string;
    title: string;
    pubDate: string;
    description: string;
    author: string;
    image?: {
      url: string;
      alt?: string;
    };
    tags: string[];
    affiliateLink?: string;
  };
};

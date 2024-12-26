type Page = {
  url: string;
  frontmatter: {
    layout: string;
    title: string;
    description: string;
    image?: {
      url: string;
      alt?: string;
    };
  };
};

type Post = Page & {
  frontmatter: {
    pubDate: string;
    author: string;
    tags: string[];
    affiliateLink?: string;
  };
};

type BaseLayoutProps = {
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
  redirectUrl?: boolean;
};

type PostLayoutProps = BaseLayoutProps & {
  frontmatter: {
    pubDate: string;
    author: string;
    tags: string[];
    affiliateLink?: string;
  };
};

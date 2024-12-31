import type { Thing, WithContext } from "schema-dts";

export type BaseLayoutProps = {
  site: string;
  url: string;
  frontmatter: {
    layout?: string;
    title: string;
    description: string;
    image?: {
      url: string;
      alt?: string;
    };
  };
  headings?: {
    depth: number;
    text: string;
    slug: string;
  }[];
  schemas?: WithContext<Thing>[];
};

export type PostLayoutProps = BaseLayoutProps & {
  frontmatter: {
    pubDate: string;
    author: string;
    tags: string[];
    affiliateLink?: string;
  };
};

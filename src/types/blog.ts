export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
  heroImageUrl: string;
  readingTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

export interface BlogIndexProps {
  posts: BlogPost[];
}

export interface BlogPostPageProps {
  post: BlogPostWithContent;
} 
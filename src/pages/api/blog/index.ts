import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tag: string;
  heroImg: string;
  readingTime: string;
};

type BlogResponse = {
  success: boolean;
  message?: string;
  posts?: BlogPost[];
};

// For a real application, you would typically fetch this from a database
// This is mocked for simplicity - we're using the data from BlogSection.tsx
const mockBlogPosts: BlogPost[] = [
  {
    slug: "future-of-work-deep-tech",
    title: "170 mln nowych ról deep-tech: jak uplasować się po jasnej stronie mocy?",
    date: "2025-05-20",
    category: "AI & Future-of-Work",
    excerpt: "WEF ostrzega i motywuje: automatyzacja zabierze 92 mln etatów, ale stworzy znacznie więcej. Pokażę Ci mapę kompetencji, które dają przewagę.",
    tag: "FutureWork",
    heroImg: "/img/future.webp",
    readingTime: "7 min"
  },
  {
    slug: "sysml-v2-kotlin",
    title: "SysML v2 w praktyce: od diagramu do deploy'u w Kotlin-native",
    date: "2025-06-02",
    category: "MBSE / SysML v2",
    excerpt: "Beta-specyfikacja SysML v2 już jest, a OMG zapowiada finalizację w tym roku. Robimy POC na realnym module IoT (grzałki).",
    tag: "MBSE",
    heroImg: "/img/future.webp",
    readingTime: "9 min"
  },
  {
    slug: "developer-experience-devops",
    title: "Developer Experience > DevOps? Case study z platformy serwisowej",
    date: "2025-06-15",
    category: "DevEx & Platform Engineering",
    excerpt: "Jak przerobiłem wewnętrzne CI/CD na self-service portal i zyskaliśmy +38 % przepustowości story points (mierzone w Flow Framework).",
    tag: "DevEx",
    heroImg: "/img/future.webp",
    readingTime: "6 min"
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Please use GET.'
    });
  }

  try {
    return res.status(200).json({
      success: true,
      posts: mockBlogPosts
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts.'
    });
  }
} 
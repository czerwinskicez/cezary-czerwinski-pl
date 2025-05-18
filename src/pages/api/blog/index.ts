import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
  heroImageUrl: string;
  readingTime: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
};

type BlogResponse = {
  success: boolean;
  message?: string;
  posts?: BlogPost[];
};

export default async function handler(
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
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const posts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        slug: data.slug,
        title: data.title,
        date: data.date.toDate().toISOString(),
        category: data.category,
        excerpt: data.excerpt,
        tags: data.tags || [],
        heroImageUrl: data.heroImageUrl,
        readingTime: data.readingTime,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt.toDate().toISOString()
      });
    });

    return res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts.'
    });
  }
} 
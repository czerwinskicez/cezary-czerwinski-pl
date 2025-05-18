import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { BlogPost } from './index';

type BlogPostResponse = {
  success: boolean;
  message?: string;
  post?: BlogPost;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogPostResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Please use GET.'
    });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Missing or invalid post slug'
    });
  }

  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    const post: BlogPost = {
      slug: data.slug,
      title: data.title,
      date: data.date.toDate().toISOString(),
      category: data.category,
      excerpt: data.excerpt,
      tags: data.tags || [],
      heroImageUrl: data.heroImageUrl,
      readingTime: data.readingTime,
      content: data.content,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString()
    };

    return res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post.'
    });
  }
} 
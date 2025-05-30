import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { BlogPostPageProps, BlogPostWithContent } from '../../types/blog';

const ShareButtons = ({ url, title, excerpt }: { url: string; title: string; excerpt: string }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    // facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodeURIComponent(excerpt)}&source=${encodeURIComponent('Cezary Czerwiński Blog')}`,
    // whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };

  return (
    <div className="flex space-x-4">
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-red-600 transition-colors"
        aria-label="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </a>
      {/* <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#4267B2] transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a> */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-red-600 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      {/* <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#25D366] transition-colors"
        aria-label="Share on WhatsApp"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a> */}
    </div>
  );
};

export default function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) {
    return (
      <Layout>
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Post not found</h1>
            <p className="mt-4 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog" className="px-6 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - Cezary Czerwiński Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.heroImageUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:tag" content={post.tags.join(', ')} />
      </Head>
      <Layout>
        <Header />
        <article className="pt-10 pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-gray-400 hover:text-red-600 mb-8 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to all articles
            </Link>
            
            <div className="mb-6">
              <span className="text-red-600 text-sm font-medium">{post.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-400 text-sm">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</time>
                <span className="mx-2">•</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
            
            {post.heroImageUrl && (
              <div className="relative w-full aspect-square mb-8 rounded-lg overflow-hidden">
                <Image 
                  src={post.heroImageUrl} 
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}
            
            <div className="prose prose-lg prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <span className="text-sm text-gray-400">Category:</span>
                  <Link href={`/blog#${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="ml-2 text-sm text-red-600 hover:underline">
                    {post.category}
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-4">Share:</span>
                  <ShareButtons 
                    url={typeof window !== 'undefined' ? window.location.href : ''} 
                    title={post.title}
                    excerpt={post.excerpt}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
        <Footer />
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsRef = collection(db, 'posts');
  const querySnapshot = await getDocs(postsRef);
  
  const paths = querySnapshot.docs.map(doc => ({
    params: { slug: doc.data().slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    
    if (!slug) {
      return { notFound: true };
    }

    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { notFound: true };
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    const post: BlogPostWithContent = {
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

    return {
      props: {
        post,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { notFound: true };
  }
}; 
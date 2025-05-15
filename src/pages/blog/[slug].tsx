import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { BlogPost } from '../api/blog';

interface BlogPostPageProps {
  post: BlogPost & { content: string };
}

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
        <meta property="og:image" content={post.heroImg} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:tag" content={post.tag} />
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
            
            {post.heroImg && (
              <div className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
                <Image 
                  src={post.heroImg} 
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}
            
            <div className="prose prose-lg prose-invert max-w-none">
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <span className="text-sm text-gray-400">Posted in</span>
                  <Link href={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="ml-2 text-sm text-red-600 hover:underline">
                    {post.category}
                  </Link>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-4">Share:</span>
                  <div className="flex space-x-4">
                    {/* Social sharing buttons would go here */}
                  </div>
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
  // In a production environment, we would fetch this from an API
  console.log("process.env.NEXT_PUBLIC_BASE_URL", process.env.NEXT_PUBLIC_BASE_URL);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog`);
  const data = await res.json();
  
  const paths = data.posts.map((post: BlogPost) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // or true if you want to handle loading states
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug;
    
    if (!slug) {
      return {
        notFound: true,
      };
    }

    // In a production environment, we would fetch this from an API
  console.log("process.env.NEXT_PUBLIC_BASE_URL", process.env.NEXT_PUBLIC_BASE_URL);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${slug}`);
    
    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    const data = await res.json();
    
    return {
      props: {
        post: data.post,
      },
      revalidate: 60 * 60, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return {
      notFound: true,
    };
  }
}; 
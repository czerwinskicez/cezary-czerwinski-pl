import React, { useEffect, useState } from 'react';
import { BlogCard } from './BlogCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { BlogPost } from '../pages/api/blog';

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        if (data.success) {
          setBlogPosts(data.posts.slice(0, 3)); // Get only first 3 posts
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="pt-0 pb-20 bg-zinc-900 relative">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return <section id="blog" className="pt-0 pb-20 bg-zinc-900 relative">
      <div className="absolute -top-10 left-0 w-full h-32 bg-black transform -skew-y-2" />
      <div className="absolute -bottom-16 right-0 w-full h-32 bg-black transform skew-y-2 -z-0" />
      <div className="container mx-auto max-w-6xl px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Articles
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Insights and analysis on the latest technology trends and how
            they're reshaping the business landscape.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard 
              key={index} 
              title={post.title} 
              excerpt={post.excerpt} 
              date={new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} 
              readTime={post.readingTime} 
              category={post.category} 
              image={post.heroImageUrl}
              slug={post.slug}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/blog" className="px-6 py-3 border border-red-600 text-red-600 font-medium hover:bg-red-600 hover:text-white transition-colors inline-flex items-center group">
            Read More
            <ArrowRightIcon className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>;
}
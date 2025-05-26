import React from 'react';
import { BlogCard } from './BlogCard';
import { BlogPost } from '../pages/api/blog';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  if (!posts || posts.length === 0) {
    return (
      <section id="blog" className="py-20 bg-zinc-900/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-xl mx-auto">
              No articles found. Check back later for new content!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-zinc-900/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Dive into my latest articles covering technology insights, development strategies, and industry news.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="text-center">
          <Link href="/blog" className="px-6 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors inline-flex items-center group">
            View All Articles
            <ArrowRightIcon size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
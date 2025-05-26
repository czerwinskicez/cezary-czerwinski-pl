import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { BlogPost } from '../pages/api/blog'; // Assuming BlogPost type is exported from here

export interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article key={post.slug} className="bg-zinc-900 hover:bg-zinc-800 transition-colors">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.heroImageUrl || '/img/placeholder.jpg'}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
          />
          {post.tags && post.tags.length > 0 && (
            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1">
              {post.tags[0]}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center text-gray-400 text-sm mb-3">
            <time dateTime={post.date}>{
              new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            }</time>
            <span className="mx-2">•</span>
            <span>{post.readingTime}</span>
          </div>
          <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
          <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
          <span className="text-red-600 inline-flex items-center">
            Read more
            <ArrowRightIcon className="ml-2 w-4 h-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
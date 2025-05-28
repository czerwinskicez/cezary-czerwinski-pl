import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from 'lucide-react';
import { BlogPost } from '../pages/api/blog';

export interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-zinc-900 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-red-600/20 transition-all group">
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <Image
          src={post.heroImageUrl || '/img/placeholder.jpg'}
          alt={post.title}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0 gtm-track-click"
          data-gtm-event-category="BlogCard"
          data-gtm-event-action="click"
          data-gtm-event-label={`Image - ${post.title}`}
        />
        {post.category && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white text-xs font-medium z-20 gtm-track-click cursor-pointer"
                data-gtm-event-category="BlogCard"
                data-gtm-event-action="click"
                data-gtm-event-label={`Category - ${post.category}`}>
            {post.category} 
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col h-[280px]">
        <div className="flex justify-between items-center mb-3 text-gray-400 text-sm">
          <div className="flex items-center">
            <CalendarIcon size={14} className="mr-1" />
            <time dateTime={post.date}>{
              new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            }</time>
          </div>
          <div className="flex items-center">
            <ClockIcon size={14} className="mr-1" />
            <span>{post.readingTime}</span>
          </div>
        </div>
        <Link href={`/blog/${post.slug}`} 
              className="block gtm-track-click"
              data-gtm-event-category="BlogCard"
              data-gtm-event-action="click"
              data-gtm-event-label={`Title - ${post.title}`}>
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
        <div className="mt-auto flex justify-end">
          <Link href={`/blog/${post.slug}`} 
                className="border border-red-600 text-red-600 px-4 py-2 font-medium hover:bg-red-600 hover:text-white transition-colors inline-flex items-center gap-1 group/read gtm-track-click"
                data-gtm-event-category="BlogCard"
                data-gtm-event-action="click"
                data-gtm-event-label={`Read More - ${post.title}`}>
            Read
            <ArrowRightIcon className="w-4 h-4 transform group-hover/read:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
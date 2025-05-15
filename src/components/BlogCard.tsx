import React from 'react';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}
export function BlogCard({
  title,
  excerpt,
  date,
  readTime,
  category,
  image
}: BlogCardProps) {
  return <div className="bg-zinc-900 overflow-hidden shadow-lg hover:shadow-red-600/20 transition-all group">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
        <span className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white text-xs font-medium z-20">
          {category}
        </span>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3 text-gray-400">
          <div className="flex items-center">
            <CalendarIcon size={14} className="mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <ClockIcon size={14} className="mr-1" />
            {readTime}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex justify-between items-center">
          <a href="#" className="text-red-500 font-medium hover:text-red-400 transition-colors inline-flex items-center group">
            Read More
            <ArrowRightIcon size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>;
}
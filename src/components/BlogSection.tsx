import React from 'react';
import { BlogCard } from './BlogCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
export function BlogSection() {
  const blogPosts = [{
    title: 'Cloud Migration Strategies for Enterprise Applications',
    excerpt: 'A comprehensive guide to planning and executing successful cloud migrations for large-scale enterprise applications while minimizing downtime and risk.',
    date: 'Oct 15, 2023',
    readTime: '8 min read',
    category: 'Cloud Computing',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }, {
    title: 'The Future of AI in Business Decision Making',
    excerpt: 'Exploring how artificial intelligence is revolutionizing business intelligence and enabling more data-driven decision making across industries.',
    date: 'Sep 28, 2023',
    readTime: '6 min read',
    category: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }, {
    title: 'Implementing Zero Trust Security Models',
    excerpt: 'A practical approach to implementing zero trust security architecture in modern organizations, with real-world case studies and best practices.',
    date: 'Sep 10, 2023',
    readTime: '10 min read',
    category: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }, {
    title: 'Digital Transformation Roadmap for Traditional Industries',
    excerpt: 'Strategic framework for traditional businesses looking to embrace digital transformation without disrupting their core operations.',
    date: 'Aug 22, 2023',
    readTime: '7 min read',
    category: 'Digital Strategy',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }, {
    title: 'Building Scalable Microservices Architectures',
    excerpt: 'Technical deep dive into designing, implementing, and managing microservices architectures that can scale with your business needs.',
    date: 'Aug 05, 2023',
    readTime: '9 min read',
    category: 'Software Architecture',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }, {
    title: 'The Role of Edge Computing in IoT Ecosystems',
    excerpt: 'Examining how edge computing is transforming IoT implementations by reducing latency and enhancing real-time processing capabilities.',
    date: 'Jul 19, 2023',
    readTime: '5 min read',
    category: 'IoT',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }];
  return <section id="blog" className="py-20 bg-zinc-900 relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-black transform -skew-y-2" />
      <div className="absolute bottom-0 right-0 w-full h-32 bg-black transform skew-y-2" />
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
          {blogPosts.map((post, index) => <BlogCard key={index} title={post.title} excerpt={post.excerpt} date={post.date} readTime={post.readTime} category={post.category} image={post.image} />)}
        </div>
        <div className="text-center mt-12">
          <a href="#" className="px-6 py-3 border border-red-600 text-red-600 font-medium hover:bg-red-600 hover:text-white transition-colors inline-flex items-center group">
            View All Articles
            <ArrowRightIcon size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>;
}
import React from 'react';
import { BlogCard } from './BlogCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function BlogSection() {
  const blogPosts = [
  {
    "slug": "future-of-work-deep-tech",
    "title": "170 mln nowych ról deep-tech: jak uplasować się po jasnej stronie mocy?",
    "date": "2025-05-20",
    "category": "Future-of-Work",
    "excerpt": "WEF ostrzega i motywuje: automatyzacja zabierze 92 mln etatów, ale stworzy znacznie więcej. Pokażę Ci mapę kompetencji, które dają przewagę.",
    "tag": "FutureWork",
    "heroImg": "/img/future.webp",
    "readingTime": "7 min"
  },
  {
    "slug": "sysml-v2-kotlin",
    "title": "SysML v2 w praktyce: od diagramu do deploy'u w Kotlin-native",
    "date": "2025-06-02",
    "category": "MBSE / SysML v2",
    "excerpt": "Beta-specyfikacja SysML v2 już jest, a OMG zapowiada finalizację w tym roku. Robimy POC na realnym module IoT (grzałki).",
    "tag": "MBSE",
    "heroImg": "/img/future.webp",
    "readingTime": "9 min"
  },
  {
    "slug": "developer-experience-devops",
    "title": "Developer Experience > DevOps? Case study z platformy serwisowej",
    "date": "2025-06-15",
    "category": "DevEx & Platform Engineering",
    "excerpt": "Jak przerobiłem wewnętrzne CI/CD na self-service portal i zyskaliśmy +38 % przepustowości story points (mierzone w Flow Framework).",
    "tag": "DevEx",
    "heroImg": "/img/future.webp",
    "readingTime": "6 min"
  }
];

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
              date={post.date} 
              readTime={post.readingTime} 
              category={post.category} 
              image={post.heroImg}
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
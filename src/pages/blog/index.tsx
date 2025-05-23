import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BlogPost } from '../api/blog';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { db } from '../../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

interface BlogIndexProps {
  posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <>
      <Head>
        <title>Blog - Cezary Czerwiński</title>
        <meta 
          name="description" 
          content="Articles and insights on technology, software development, and digital transformation by Cezary Czerwiński."
        />
      </Head>
      <Layout>
        <Header />
        <section className="py-20 bg-black">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Blog
              </h1>
              <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Insights and analysis on the latest technology trends and how
                they're reshaping the business landscape.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <article key={post.slug} className="bg-zinc-900 hover:bg-zinc-800 transition-colors">
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.heroImageUrl || '/img/placeholder.jpg'}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1">
                        {post.tags[0]}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</time>
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
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const posts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        slug: data.slug,
        title: data.title,
        date: data.date.toDate().toISOString(),
        category: data.category,
        excerpt: data.excerpt,
        tags: data.tags || [],
        heroImageUrl: data.heroImageUrl,
        readingTime: data.readingTime,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt.toDate().toISOString()
      });
    });

    return {
      props: {
        posts,
      },
      revalidate: 60 * 10,
    };
  } catch (error) {
    console.error('Error with blog posts:', error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60,
    };
  }
}; 
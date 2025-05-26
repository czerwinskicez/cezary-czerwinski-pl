import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
// import Link from 'next/link'; // No longer needed directly
// import Image from 'next/image'; // No longer needed directly
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { BlogPost } from '../api/blog';
// import { ArrowRightIcon } from '@heroicons/react/24/outline'; // No longer needed directly
import { db } from '../../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { BlogCard } from '../../components/BlogCard'; // Import the new component

interface BlogIndexProps {
  posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  console.log('BlogIndex - Received posts:', posts); // Log received posts
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">No blog posts found. Check back later!</p>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  console.log('BlogIndex - getStaticProps: Fetching posts...');
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    console.log('BlogIndex - getStaticProps: querySnapshot empty?', querySnapshot.empty);
    console.log('BlogIndex - getStaticProps: querySnapshot size:', querySnapshot.size);

    const posts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('BlogIndex - getStaticProps: Processing doc:', doc.id, data);
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
    console.log('BlogIndex - getStaticProps: Processed posts:', posts);

    return {
      props: {
        posts,
      },
      revalidate: 60 * 10, // Revalidate every 10 minutes
    };
  } catch (error) {
    console.error('Error fetching blog posts for blog index page:', error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60, // Revalidate every 1 minute in case of error
    };
  }
}; 
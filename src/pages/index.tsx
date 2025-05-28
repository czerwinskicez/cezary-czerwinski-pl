import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { BlogSection } from '../components/BlogSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { BlogPost } from './api/blog'; // Assuming BlogPost type is exported from here
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';

interface HomeProps {
  latestPosts: BlogPost[];
}

// Define the Home page component
export default function Home({ latestPosts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Cezary Czerwiński - Technology Consultant & Developer</title>
        <meta name="description" content="Cezary Czerwiński - Technology consultant specialized in software architecture, cloud solutions, and digital transformation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TMDJZ4VF');`
          }}
        />
      </Head>
      <Layout>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TMDJZ4VF"
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>

        <Header />
        <Hero />
        <About />
        <BlogSection posts={latestPosts} />
        <ContactSection />
        <Footer />
      </Layout>
    </>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  try {
    const postsRef = collection(db, 'posts');
    // Query for the 3 newest posts
    const q = query(postsRef, orderBy('date', 'desc'), limit(3));
    const querySnapshot = await getDocs(q);
    
    const latestPosts: BlogPost[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      latestPosts.push({
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
        latestPosts,
      },
      // Re-generate the page at most once per day
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Error fetching latest posts for home page:', error);
    return {
      props: {
        latestPosts: [],
      },
      revalidate: 60 * 5, // Revalidate every 5 minutes in case of error
    };
  }
}; 
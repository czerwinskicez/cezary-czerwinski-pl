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

// Define the Home page component
export default function Home() {
  return (
    <>
      <Head>
        <title>Cezary Czerwiński - Technology Consultant & Developer</title>
        <meta name="description" content="Cezary Czerwiński - Technology consultant specialized in software architecture, cloud solutions, and digital transformation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header />
        <Hero />
        <About />
        <BlogSection />
        <ContactSection />
        <Footer />
      </Layout>
    </>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    // Re-generate the page at most once per day
    revalidate: 86400,
  };
}; 
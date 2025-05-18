import React from 'react';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Analytics } from "@vercel/analytics/next"

export function App() {
  return <Layout>
      <Analytics />
      <Header />
      <Hero />
      <About />
      <BlogSection />
      <ContactSection />
      <Footer />
    </Layout>;
}
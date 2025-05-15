import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Cezary Czerwiński</title>
        <meta name="description" content="Privacy Policy for Cezary Czerwiński's website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header />
        <div className="container mx-auto px-4 py-20 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
            <p>This Privacy Policy explains how Cezary Czerwiński ("I", "me", or "my") collects, uses, and protects your personal information when you visit my website or interact with my services.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information I Collect</h2>
            <p>I may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Personal Information</strong>: When you subscribe to my newsletter or contact me via the contact form, I collect your name and email address.</li>
              <li><strong>Usage Data</strong>: Information about how you interact with my website, including browser type, pages visited, time spent, and referring pages.</li>
              <li><strong>Cookies</strong>: My website uses cookies to enhance your browsing experience. You can control cookies through your browser settings.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">How I Use Your Information</h2>
            <p>I use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>To send you newsletters, updates, and marketing communications (only with your explicit consent)</li>
              <li>To respond to your inquiries and provide requested information</li>
              <li>To improve my website and services based on usage patterns</li>
              <li>To comply with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
            <p>I implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
            <p>I may use third-party services (such as email marketing platforms, analytics providers, and hosting services) that collect, monitor, and analyze this information. These third parties have their own privacy policies addressing how they use such information.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Erasure of your data</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            <p>To exercise these rights, please contact me using the information provided at the end of this policy.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>I may update this Privacy Policy from time to time. I will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information</h2>
            <p>If you have any questions about this Privacy Policy, please contact me at:</p>
            <p>Email: czerwinskicez@gmail.com</p>
          </div>
          
          <div className="mt-12">
            <Link href="/" className="px-6 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
} 
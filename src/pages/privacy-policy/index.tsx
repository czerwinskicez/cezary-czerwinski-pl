import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from './../../components/Layout';
import { Header } from './../../components/Header';
import { Footer } from './../../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Cezary Czerwiński</title>
        <meta name="description" content="How I handle your data under GDPR - Privacy Policy for Cezary Czerwiński" />
        <meta property="og:title" content="Privacy Policy - Cezary Czerwiński" />
        <meta property="og:description" content="How I handle your data under GDPR." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header />
        <div className="container mx-auto px-6 py-20 max-w-4xl text-white">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-10">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <article className="prose prose-invert prose-lg max-w-none leading-relaxed">
            <h2>Introduction</h2>
            <p>
              GDPR can be a pain — but it exists to protect us. So while I might not love cookie banners, I respect your privacy and take data protection seriously.
            </p>
            <p>
              This Privacy Policy explains how I (Cezary Czerwiński — a single human being, not a faceless company) collect, use, and protect your personal data when you browse this site, use my contact form, or subscribe to my newsletter.
            </p>

            <h2>What I Collect (and Why)</h2>
            <ul>
              <li><strong>Personal Information:</strong> Your email and optionally your name, if you contact me or subscribe.</li>
              <li><strong>Usage Data:</strong> Anonymous statistics like which pages were visited and for how long — strictly for improvement purposes.</li>
              <li><strong>Cookies:</strong> To enable smooth browsing and basic analytics. You can manage cookies in your browser anytime.</li>
            </ul>

            <h2>How I Use Your Data</h2>
            <ul>
              <li>To send updates or newsletters — but only if you opted in.</li>
              <li>To respond when you contact me.</li>
              <li>To understand how the website is used and improve it.</li>
              <li>To comply with applicable laws.</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              I use trusted services and solid security practices to store your data. But no system is perfect — so please don’t send passwords or confidential info via contact forms.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              I use a few external services (like hosting, analytics, email platforms) that may process your data — always under GDPR-compliant terms and only on my behalf.
            </p>

            <h2>Your Rights</h2>
            <p>Under the General Data Protection Regulation (EU 2016/679), you can:</p>
            <ul>
              <li>Access your data</li>
              <li>Correct incorrect data</li>
              <li>Request deletion ("right to be forgotten")</li>
              <li>Restrict or object to how your data is used</li>
              <li>Request a copy of your data (data portability)</li>
            </ul>
            <p>
              To exercise any of these rights, just send me a message at <strong>czerwinskicez@gmail.com</strong>. No red tape.
            </p>

            <h2>Retention</h2>
            <p>
              I don’t keep your data forever — only as long as it's necessary for the purpose it was collected. After that, it’s deleted or anonymized.
            </p>

            <h2>Policy Changes</h2>
            <p>
              If anything changes, I’ll update this page and bump the date above. I won’t spam your inbox or surprise you with shady practices.
            </p>

            <h2>Contact</h2>
            <p>
              Have questions or want your data removed?  
              Email me at <strong>czerwinskicez@gmail.com</strong>.
            </p>
          </article>

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

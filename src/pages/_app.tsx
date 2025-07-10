import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 800, // values from 0 to 3000, with step 50ms
      easing: 'ease-in-out-quad', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      // Cconsider adding offset or delay if needed globally, or apply per-element
    });
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
} 
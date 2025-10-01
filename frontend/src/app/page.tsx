import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import Benefits from '@/components/sections/Benefits';
import Product from '@/components/sections/Product';
import Research from '@/components/sections/Research';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Siete CX - Customer Experience Platform | Video Mystery Shopping & Call Analysis',
  description: 'Transform your customer experience with Siete CX. Measure, analyze, and improve CX with video mystery shopping and call analysis. Book your free demo today.',
  keywords: 'customer experience, mystery shopping, call analysis, CX platform, customer satisfaction, NPS, CSAT',
  authors: [{ name: 'Siete Inteligencia Creativa' }],
  openGraph: {
    title: 'Siete CX - Customer Experience Platform',
    description: 'Transform your customer experience with Siete CX. Measure, analyze, and improve CX with video mystery shopping and call analysis.',
    url: 'https://siete-cx.com',
    siteName: 'Siete CX',
    images: [
      {
        url: 'https://customer-assets.emergentagent.com/job_premium-cx/artifacts/p2reh895_Logo%20Siete%20CX.png',
        width: 1200,
        height: 630,
        alt: 'Siete CX Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siete CX - Customer Experience Platform',
    description: 'Transform your customer experience with Siete CX.',
    images: ['https://customer-assets.emergentagent.com/job_premium-cx/artifacts/p2reh895_Logo%20Siete%20CX.png'],
  },
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Benefits />
        <Product />
        <Research />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
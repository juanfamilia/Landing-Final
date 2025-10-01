import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import Benefits from '@/components/sections/Benefits';
import Product from '@/components/sections/Product';
import Research from '@/components/sections/Research';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Siete Inteligencia Creativa' }],
    openGraph: {
      title: t('title'),
      description: t('description'),
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
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://customer-assets.emergentagent.com/job_premium-cx/artifacts/p2reh895_Logo%20Siete%20CX.png'],
    },
  };
}

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
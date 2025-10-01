import Navigation from '@/components/sections/NavigationSimple';
import Hero from '@/components/sections/Hero';
import Benefits from '@/components/sections/Benefits';
import Product from '@/components/sections/Product';
import Research from '@/components/sections/Research';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import { Metadata } from 'next';

interface TranslationData {
  title: string;
  description: string;
  keywords: string;
}

interface Translations {
  en: TranslationData;
  es: TranslationData;
}

const isSpanish = false; // We'll make this dynamic based on the route

const getTranslations = (locale: string): TranslationData => {
  const translations: Translations = {
    en: {
      title: 'Siete CX - Customer Experience Platform | Video Mystery Shopping & Call Analysis',
      description: 'Transform your customer experience with Siete CX. Measure, analyze, and improve CX with video mystery shopping and call analysis. Book your free demo today.',
      keywords: 'customer experience, mystery shopping, call analysis, CX platform, customer satisfaction, NPS, CSAT'
    },
    es: {
      title: 'Siete CX - Plataforma de Experiencia del Cliente | Video Mystery Shopping y Análisis de Llamadas',
      description: 'Transforma tu experiencia del cliente con Siete CX. Mide, analiza y mejora la CX con video mystery shopping y análisis de llamadas. Reserva tu demo gratuito hoy.',
      keywords: 'experiencia del cliente, mystery shopping, análisis de llamadas, plataforma CX, satisfacción del cliente, NPS, CSAT'
    }
  };
  return translations[locale as keyof Translations];
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = isSpanish ? 'es' : 'en';
  const t = getTranslations(locale);

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Siete Inteligencia Creativa' }],
    openGraph: {
      title: t.title,
      description: t.description,
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
      title: t.title,
      description: t.description,
      images: ['https://customer-assets.emergentagent.com/job_premium-cx/artifacts/p2reh895_Logo%20Siete%20CX.png'],
    },
  };
}

export default async function Home() {
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
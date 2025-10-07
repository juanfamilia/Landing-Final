import { Inter } from 'next/font/google';
import '../globals.css';
import { isValidLocale } from '@/i18n';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        {/* ----- INICIO: Google Analytics 4 ----- */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZTT75599MP"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZTT75599MP', { page_path: window.location.pathname });
            `,
          }}
        />
        {/* ----- FIN: Google Analytics 4 ----- */}

        {/* ----- INICIO: HubSpot Tracking ----- */}
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/47559443.js"
        ></script>
        {/* ----- FIN: HubSpot Tracking ----- */}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

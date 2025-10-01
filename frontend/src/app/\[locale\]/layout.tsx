import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Inter } from "next/font/google";
import { notFound } from 'next/navigation';
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const locales = ['en', 'es'];

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params: {locale}}: Props) {
  const messages = await getMessages({locale});
  const meta = (messages as any).meta || {};

  return {
    title: meta.title || 'Siete CX - Customer Experience Platform',
    description: meta.description || 'Transform your customer experience with Siete CX',
    openGraph: {
      title: meta.title || 'Siete CX - Customer Experience Platform',
      description: meta.description || 'Transform your customer experience with Siete CX',
      locale: locale,
      type: 'website',
    }
  };
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_TRACKING_ID');
            `,
          }}
        />
        {/* HubSpot Tracking Code */}
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/YOUR_HUB_ID.js"
        ></script>
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
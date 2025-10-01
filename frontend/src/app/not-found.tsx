import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/en" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Go to English Version
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
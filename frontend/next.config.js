const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: '/app/frontend',
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['customer-assets.emergentagent.com'],
  },
};
 
module.exports = withNextIntl(nextConfig);
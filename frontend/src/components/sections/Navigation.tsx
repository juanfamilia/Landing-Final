'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    { name: t('benefits'), href: '#benefits' },
    { name: t('product'), href: '#product' },
    { name: t('research'), href: '#research' },
    { name: t('contact'), href: '#contact' },
  ];

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setShowLangMenu(false);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Made larger as requested */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-3">
              <Image
                src="https://customer-assets.emergentagent.com/job_premium-cx/artifacts/p2reh895_Logo%20Siete%20CX.png"
                alt="Siete CX Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{locale}</span>
              </button>
              
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200/20 overflow-hidden"
                >
                  <button
                    onClick={() => switchLocale('en')}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors",
                      locale === 'en' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    )}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => switchLocale('es')}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors",
                      locale === 'es' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    )}
                  >
                    🇪🇸 Español
                  </button>
                </motion.div>
              )}
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {t('requestDemo')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-2 px-3 py-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <button
                onClick={() => switchLocale('en')}
                className={cn(
                  "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                  locale === 'en' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('es')}
                className={cn(
                  "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                  locale === 'es' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                ES
              </button>
            </div>
            
            {/* Mobile CTA */}
            <div className="px-3 pt-2">
              <Button
                onClick={() => scrollToSection('#contact')}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-full font-semibold"
              >
                {t('requestDemo')}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
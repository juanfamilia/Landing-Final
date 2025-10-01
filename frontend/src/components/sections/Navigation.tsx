'use client';

import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [locale] = useState('en');

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Made larger as requested */}
          <div className="flex items-center">
            <Image
              src="https://customer-assets.emergentagent.com/job_premium-cx/artifacts/p2reh895_Logo%20Siete%20CX.png"
              alt="Siete CX Logo"
              width={180}
              height={60}
              className="h-16 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('#benefits')} className="text-gray-700 hover:text-blue-600 font-medium">
              Benefits
            </button>
            <button onClick={() => scrollToSection('#product')} className="text-gray-700 hover:text-blue-600 font-medium">
              Product
            </button>
            <button onClick={() => scrollToSection('#research')} className="text-gray-700 hover:text-blue-600 font-medium">
              Research
            </button>
            <button onClick={() => scrollToSection('#contact')} className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </button>
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <button className={`px-2 py-1 rounded text-sm font-medium ${locale === 'en' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}>
                EN
              </button>
              <button className={`px-2 py-1 rounded text-sm font-medium ${locale === 'es' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}>
                ES
              </button>
            </div>
            <button
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Request Demo
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('#benefits')} className="block w-full text-left px-3 py-2">Benefits</button>
              <button onClick={() => scrollToSection('#product')} className="block w-full text-left px-3 py-2">Product</button>
              <button onClick={() => scrollToSection('#research')} className="block w-full text-left px-3 py-2">Research</button>
              <button onClick={() => scrollToSection('#contact')} className="block w-full text-left px-3 py-2">Contact</button>
              <div className="px-3 pt-2">
                <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-semibold py-2">
                  Request Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
'use client';

import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Image
              src="https://customer-assets.emergentagent.com/job_premium-cx/artifacts/p2reh895_Logo%20Siete%20CX.png"
              alt="Siete CX Logo"
              width={150}
              height={50}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 mb-6 max-w-md">
              {t('description')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <div className="space-y-3">
              <a href="mailto:info@sieteic.com" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-3" />
                info@sieteic.com
              </a>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3" />
                +1 829 961 0082
              </div>
              <div className="flex items-start text-gray-400">
                <MapPin className="w-4 h-4 mr-3 mt-1" />
                <span>Distrito Nacional,<br />Santo Domingo,<br />República Dominicana</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('links')}</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">{t('about')}</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">{t('privacy')}</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">{t('terms')}</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">{t('support')}</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
'use client';

import { CheckCircle, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CTA() {
  const t = useTranslations('cta');

  return (
    <section id="contact" className="py-24 bg-gradient-to-r from-gray-900 via-blue-900 to-teal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('subtitle')}
          </p>
          
          <div className="space-y-4 mb-8">
            {t.raw('features').map((feature: string, index: number) => (
              <div key={index} className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-lg text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
          
          <button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
            <Calendar className="w-5 h-5 mr-2" />
            {t('button')}
          </button>
        </div>
      </div>
    </section>
  );
}
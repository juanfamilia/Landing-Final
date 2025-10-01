'use client';

import { Play, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import DemoForm from '../DemoForm';

export default function Hero() {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const pathname = usePathname();
  const isSpanish = pathname.startsWith('/es');
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = (key: string) => {
    const translations: any = {
      en: {
        badge: "Premium Customer Experience Platform",
        title: "Siete CX –",
        titleAccent: "Customer Experience Platform",
        subtitle: "Measure, analyze, and improve customer experience with video mystery shopping and call analysis.",
        requestDemo: "Request a Demo",
        learnMore: "Learn More",
        trustedBy: "Trusted by 500+ companies",
        rating: "4.9/5 Customer Rating",
        dashboardTitle: "Siete CX Dashboard"
      },
      es: {
        badge: "Plataforma Premium de Experiencia del Cliente",
        title: "Siete CX –",
        titleAccent: "Plataforma de Experiencia del Cliente",
        subtitle: "Mide, analiza y mejora la experiencia del cliente con video mystery shopping y análisis de llamadas.",
        requestDemo: "Solicitar Demo",
        learnMore: "Saber Más",
        trustedBy: "Confiado por más de 500 empresas",
        rating: "4.9/5 Calificación de Clientes",
        dashboardTitle: "Panel de Control Siete CX"
      }
    };
    return translations[isSpanish ? 'es' : 'en'][key] || key;
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center pt-20 bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-6">
                {t('badge')}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span className="block">{t('title')}</span>
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  {t('titleAccent')}
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                {t('subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => setIsDemoFormOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t('requestDemo')}
                </button>
                
                <button
                  onClick={() => scrollToSection('#benefits')}
                  className="px-8 py-4 text-lg rounded-full font-semibold border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 bg-white/80 backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
                >
                  {t('learnMore')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">A</div>
                    <div className="w-8 h-8 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">B</div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">C</div>
                  </div>
                  <span>{t('trustedBy')}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span>{t('rating')}</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Visual */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl p-6 w-full max-w-md mx-auto rounded-2xl">
                {/* Mock Dashboard */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-600">{t('dashboardTitle')}</div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-end h-32 space-x-2">
                    {[40, 70, 45, 80, 60, 90, 75].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-blue-500 to-teal-500 rounded-t-sm flex-1 min-h-2"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-xs text-green-700">CSAT Score</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">85%</div>
                    <div className="text-xs text-blue-700">NPS Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoForm 
        isOpen={isDemoFormOpen}
        onClose={() => setIsDemoFormOpen(false)}
      />
    </>
  );
}
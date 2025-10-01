'use client';

import { CheckCircle, Calendar } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import DemoForm from '../DemoForm';

export default function CTA() {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const pathname = usePathname();
  const isSpanish = pathname.startsWith('/es');

  const t = (key: string) => {
    const translations: any = {
      en: {
        title: "Ready to Transform Your Customer Experience?",
        subtitle: "Join leading companies that use Siete CX to drive growth and customer satisfaction",
        features: [
          "30-minute personalized demo",
          "Free CX assessment", 
          "Custom implementation roadmap",
          "No commitment required"
        ],
        button: "Book your free demo now"
      },
      es: {
        title: "¿Listo para Transformar Tu Experiencia del Cliente?",
        subtitle: "Únete a empresas líderes que usan Siete CX para impulsar el crecimiento y la satisfacción del cliente",
        features: [
          "Demo personalizado de 30 minutos",
          "Evaluación gratuita de CX",
          "Hoja de ruta de implementación personalizada",
          "No se requiere compromiso"
        ],
        button: "Reserva tu demo gratuito ahora"
      }
    };
    return translations[isSpanish ? 'es' : 'en'][key];
  };

  const data = t();

  return (
    <>
      <section id="contact" className="py-24 bg-gradient-to-r from-gray-900 via-blue-900 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {data.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {data.subtitle}
            </p>
            
            <div className="space-y-4 mb-8">
              {data.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-lg text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setIsDemoFormOpen(true)}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
            >
              <Calendar className="w-5 h-5 mr-2" />
              {data.button}
            </button>
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
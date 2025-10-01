'use client';

import { Quote } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Research() {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith('/es');

  const t = (key: string) => {
    const translations: any = {
      en: {
        title: "Backed by Industry Research",
        subtitle: "Leading organizations trust customer experience as their competitive advantage",
        quotes: [
          {
            text: "Companies that skillfully manage the entire customer experience can realize a 20% improvement in customer satisfaction, a 15% increase in sales conversion, and a 30% lower cost-to-serve.",
            source: "Harvard Business Review",
            author: "Harvard Business Review Research"
          },
          {
            text: "More than two-thirds of companies now compete primarily on the basis of customer experience, up from only 36% in 2010.",
            source: "Gartner",
            author: "Gartner Research"
          },
          {
            text: "Organizations that prioritize customer experience achieve revenue growth rates 4%–8% above their market.",
            source: "McKinsey & Company",
            author: "McKinsey Research"
          }
        ],
        stats: {
          title: "The Research is Clear",
          subtitle: "Customer experience is the new competitive battleground",
          compete: "of companies now compete on CX",
          competeSub: "vs 36% in 2010",
          growth: "higher revenue growth",
          growthSub: "for CX-focused companies",
          improvement: "improvement in satisfaction",
          improvementSub: "with proper CX management"
        }
      },
      es: {
        title: "Respaldado por Investigación de la Industria",
        subtitle: "Las organizaciones líderes confían en la experiencia del cliente como su ventaja competitiva",
        quotes: [
          {
            text: "Las empresas que gestionan hábilmente toda la experiencia del cliente pueden lograr una mejora del 20% en la satisfacción del cliente, un aumento del 15% en la conversión de ventas y un 30% menos en el costo de servicio.",
            source: "Harvard Business Review",
            author: "Investigación Harvard Business Review"
          },
          {
            text: "Más de dos tercios de las empresas ahora compiten principalmente en base a la experiencia del cliente, aumentando del solo 36% en 2010.",
            source: "Gartner",
            author: "Investigación Gartner"
          },
          {
            text: "Las organizaciones que priorizan la experiencia del cliente logran tasas de crecimiento de ingresos 4%-8% por encima de su mercado.",
            source: "McKinsey & Company",
            author: "Investigación McKinsey"
          }
        ],
        stats: {
          title: "La Investigación es Clara",
          subtitle: "La experiencia del cliente es el nuevo campo de batalla competitivo",
          compete: "de las empresas ahora compiten en CX",
          competeSub: "vs 36% en 2010",
          growth: "mayor crecimiento de ingresos",
          growthSub: "para empresas enfocadas en CX",
          improvement: "mejora en satisfacción",
          improvementSub: "con gestión adecuada de CX"
        }
      }
    };
    return translations[isSpanish ? 'es' : 'en'][key];
  };

  const data = t();

  return (
    <section id="research" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Research Quotes */}
        <div className="space-y-12">
          {data.quotes.map((quote: any, index: number) => (
            <div key={index} className={`flex items-center ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl p-8 lg:p-12 relative rounded-2xl">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                      <Quote className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 italic">
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>

                  {/* Attribution */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{quote.author}</div>
                      <div className="text-blue-600 font-medium">{quote.source}</div>
                    </div>

                    {/* Company Logo Placeholder */}
                    <div className="hidden sm:flex items-center justify-center w-24 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
                      <span className="text-xs font-bold text-gray-600 text-center leading-tight">
                        {quote.source.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer for desktop layout */}
              <div className={`hidden lg:block w-32 ${index % 2 === 1 ? 'order-first' : ''}`}>
                <div className="relative">
                  {/* Connection Line */}
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-blue-300 to-teal-300"></div>
                  
                  {/* Center Circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statistics */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{data.stats.title}</h3>
            <p className="text-blue-100 text-lg">{data.stats.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-300">67%</div>
              <div className="text-blue-100">{data.stats.compete}</div>
              <div className="text-xs text-blue-200">{data.stats.competeSub}</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-300">4-8%</div>
              <div className="text-blue-100">{data.stats.growth}</div>
              <div className="text-xs text-blue-200">{data.stats.growthSub}</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-300">20%</div>
              <div className="text-blue-100">{data.stats.improvement}</div>
              <div className="text-xs text-blue-200">{data.stats.improvementSub}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import { TrendingDown, TrendingUp, Phone, BarChart3 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BenefitItem, StatsData } from '@/types/translations';

interface BenefitsTranslations {
  title: string;
  subtitle: string;
  items: BenefitItem[];
  stats: StatsData;
}

export default function Benefits() {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith('/es');
  const icons = [TrendingDown, TrendingUp, Phone, BarChart3];

  const t = (): BenefitsTranslations => {
    const translations: Record<string, BenefitsTranslations> = {
      en: {
        title: "Transform Your Customer Experience",
        subtitle: "Powerful insights to drive real business results",
        items: [
          {
            title: "Reduce Churn",
            description: "Identify friction points before customers leave and improve retention rates."
          },
          {
            title: "Increase CSAT",
            description: "Boost customer satisfaction scores with data-driven experience improvements."
          },
          {
            title: "Real Call Insights",
            description: "Get actionable intelligence from actual customer interactions and calls."
          },
          {
            title: "Actionable Analytics",
            description: "Turn customer experience data into strategic business decisions."
          }
        ],
        stats: {
          companies: "Companies Trust Us",
          csatIncrease: "Average CSAT Increase",
          satisfaction: "Customer Satisfaction"
        }
      },
      es: {
        title: "Transforma Tu Experiencia del Cliente",
        subtitle: "Insights poderosos para impulsar resultados reales de negocio",
        items: [
          {
            title: "Reducir Abandono",
            description: "Identifica puntos de fricción antes de que los clientes se vayan y mejora las tasas de retención."
          },
          {
            title: "Aumentar CSAT",
            description: "Aumenta los puntajes de satisfacción del cliente con mejoras de experiencia basadas en datos."
          },
          {
            title: "Insights de Llamadas Reales",
            description: "Obtén inteligencia accionable de las interacciones y llamadas reales de clientes."
          },
          {
            title: "Analítica Accionable",
            description: "Convierte los datos de experiencia del cliente en decisiones estratégicas de negocio."
          }
        ],
        stats: {
          companies: "Empresas Nos Confían",
          csatIncrease: "Aumento Promedio de CSAT",
          satisfaction: "Satisfacción del Cliente"
        }
      }
    };
    return translations[isSpanish ? 'es' : 'en'];
  };

  const data = t();

  return (
    <section id="benefits" className="py-24 bg-white">
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

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.items.map((benefit: BenefitItem, index: number) => {
            const Icon = icons[index];
            return (
              <div key={index} className="group">
                <div className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl p-8 text-center h-full hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-gray-300">{data.stats.companies}</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">25%</div>
              <div className="text-gray-300">{data.stats.csatIncrease}</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">92%</div>
              <div className="text-gray-300">{data.stats.satisfaction}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
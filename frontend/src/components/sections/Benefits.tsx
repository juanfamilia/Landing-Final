'use client';

import { ClockArrowDown, Zap, Eye, ChartColumnIncreasing } from 'lucide-react';
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
  const icons = [ClockArrowDown, Zap, Eye, ChartColumnIncreasing];

  const t = (): BenefitsTranslations => {
    const translations: Record<string, BenefitsTranslations> = {
      en: {
        title: "Elevate Your CX Intelligence",
        subtitle: "Eliminate delays. Strengthen insights. Drive action with clarity.",
        items: [
          {
            title: "Faster Decision Cycles",
            description: "Reduce the gap between data collection, analysis, and execution."
          },
          {
            title: "Operational Efficiency",
            description: "Cut unnecessary field time and focus resources where they create the most value."
          },
          {
            title: "Strategic Visibility",
            description: "Access clear, real-time intelligence that turns experience data into business advantage."
          },
          {
            title: "Actionable Analytics",
            description: "Turn customer experience data into strategic business decisions."
          }
        ],
        stats: {
          companies: "Leaders Transforming CX Operations",
          csatIncrease: "Cycle Time Reductio",
          satisfaction: "Insight Reliability"
        }
      },
      es: {
        title: "Eleva tu Inteligencia en Experiencia del Cliente",
        subtitle: "Insights poderosos para impulsar resultados reales de negocio",
        items: [
          {
            title: "Visibilidad estratégica",
            description: "Accede a inteligencia en tiempo real que convierte los datos de experiencia en ventaja competitiva."
          },
          {
            title: "Analítica accionable",
            description: "Transforma la información del cliente en decisiones estratégicas de negocio."
          },
          {
            title: "Trazabilidad",
            description: "Observa la evolución de tus indicadores con precisión y claridad estratégica."
          },
          {
            title: "Analítica Accionable",
            description: "Convierte los datos de experiencia del cliente en decisiones estratégicas de negocio."
          }
        ],
        stats: {
          companies: "Líderes transformando la gestión de CX",
          csatIncrease: "Reducción del ciclo de análisis",
          satisfaction: "Confiabilidad de los insights"
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

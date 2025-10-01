'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Research() {
  const t = useTranslations('research');

  const researchLogos = [
    {
      name: 'Harvard Business Review',
      logo: '/logos/hbr-logo.svg', // Placeholder - would need actual logos
      fallback: 'HBR'
    },
    {
      name: 'Gartner',
      logo: '/logos/gartner-logo.svg',
      fallback: 'GARTNER'
    },
    {
      name: 'McKinsey & Company',
      logo: '/logos/mckinsey-logo.svg',
      fallback: 'McKINSEY'
    }
  ];

  return (
    <section id="research" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Research Quotes */}
        <div className="space-y-12">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex items-center ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <div className="siete-card p-8 lg:p-12 relative">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                      <Quote className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 italic">
                    "{t(`quotes.${index}.text`)}"
                  </blockquote>

                  {/* Attribution */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {t(`quotes.${index}.author`)}
                      </div>
                      <div className="text-blue-600 font-medium">
                        {t(`quotes.${index}.source`)}
                      </div>
                    </div>

                    {/* Company Logo Placeholder */}
                    <div className="hidden sm:flex items-center justify-center w-24 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
                      <span className="text-xs font-bold text-gray-600 text-center leading-tight">
                        {researchLogos[index].fallback}
                      </span>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full opacity-30 -z-10"></div>
                </div>
              </div>

              {/* Spacer for desktop layout */}
              <div className={`hidden lg:block w-32 ${index % 2 === 1 ? 'order-first' : ''}`}>
                <div className="relative">
                  {/* Connection Line */}
                  <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-blue-300 to-teal-300"></div>
                  
                  {/* Center Circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                      className="w-4 h-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              The Research is Clear
            </h3>
            <p className="text-blue-100 text-lg">
              Customer experience is the new competitive battleground
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold text-yellow-300">67%</div>
              <div className="text-blue-100">of companies now compete on CX</div>
              <div className="text-xs text-blue-200">vs 36% in 2010</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold text-green-300">4-8%</div>
              <div className="text-blue-100">higher revenue growth</div>
              <div className="text-xs text-blue-200">for CX-focused companies</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold text-orange-300">20%</div>
              <div className="text-blue-100">improvement in satisfaction</div>
              <div className="text-xs text-blue-200">with proper CX management</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
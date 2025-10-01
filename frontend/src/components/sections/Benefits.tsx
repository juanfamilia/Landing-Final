'use client';

import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Phone, BarChart3 } from 'lucide-react';

export default function Benefits() {

  const benefits = [
    {
      icon: TrendingDown,
      key: 'churn',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      key: 'csat',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Phone,
      key: 'insights',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: BarChart3,
      key: 'analytics',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-white">
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

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative siete-card p-8 text-center h-full hover:shadow-2xl transition-all duration-300">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t(`items.${benefit.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`items.${benefit.key}.description`)}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-10"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-white"
            >
              <div className="text-4xl font-bold siete-text-gradient mb-2">500+</div>
              <div className="text-gray-300">Companies Trust Us</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-white"
            >
              <div className="text-4xl font-bold siete-text-gradient mb-2">25%</div>
              <div className="text-gray-300">Average CSAT Increase</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-white"
            >
              <div className="text-4xl font-bold siete-text-gradient mb-2">92%</div>
              <div className="text-gray-300">Customer Satisfaction</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
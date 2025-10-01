'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Monitor, BarChart, FileText, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Product() {
  const t = useTranslations('product');
  const [activeSlide, setActiveSlide] = useState(0);

  const features = [
    {
      key: 'dashboard',
      icon: Monitor,
      color: 'from-blue-500 to-blue-600'
    },
    {
      key: 'analytics',
      icon: BarChart,
      color: 'from-green-500 to-green-600'
    },
    {
      key: 'reporting',
      icon: FileText,
      color: 'from-purple-500 to-purple-600'
    },
    {
      key: 'integration',
      icon: Zap,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const dashboardScreens = [
    {
      title: "Real-time Dashboard",
      description: "Monitor customer experience metrics in real-time",
      metrics: [
        { label: "CSAT Score", value: "4.8/5", trend: "+12%" },
        { label: "NPS", value: "72", trend: "+8%" },
        { label: "Response Time", value: "2.3s", trend: "-15%" },
        { label: "Resolution Rate", value: "94%", trend: "+5%" }
      ]
    },
    {
      title: "Analytics Engine",
      description: "Deep insights from customer interactions",
      metrics: [
        { label: "Interactions", value: "15,234", trend: "+23%" },
        { label: "Sentiment", value: "87%", trend: "+9%" },
        { label: "Call Quality", value: "9.2/10", trend: "+6%" },
        { label: "Issue Types", value: "12", trend: "-3%" }
      ]
    },
    {
      title: "Automated Reports",
      description: "Generate comprehensive CX reports automatically",
      metrics: [
        { label: "Reports Generated", value: "156", trend: "+18%" },
        { label: "Time Saved", value: "40hrs", trend: "+25%" },
        { label: "Accuracy", value: "98.5%", trend: "+2%" },
        { label: "Insights Found", value: "89", trend: "+31%" }
      ]
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % dashboardScreens.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + dashboardScreens.length) % dashboardScreens.length);
  };

  return (
    <section id="product" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
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

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 group cursor-pointer"
                  onClick={() => setActiveSlide(index % dashboardScreens.length)}
                >
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {t(`features.${feature.key}`)}
                    </h3>
                    <p className="text-gray-600">
                      Advanced {feature.key} capabilities that drive real business results.
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Dashboard Mockup Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="siete-card p-8 bg-white/90 backdrop-blur-sm">
              {/* Browser Chrome */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-100 rounded-lg px-3 py-1 text-sm text-gray-500 text-center">
                    siete-cx.com/dashboard
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevSlide}
                    className="w-8 h-8 p-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextSlide}
                    className="w-8 h-8 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Dashboard Content */}
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {dashboardScreens[activeSlide].title}
                    </h3>
                    <p className="text-gray-600">
                      {dashboardScreens[activeSlide].description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {dashboardScreens[activeSlide].metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl"
                    >
                      <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                      <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                      <div className={`text-xs font-medium ${
                        metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend} vs last month
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-xl">
                  <div className="flex items-end justify-between h-32 space-x-2">
                    {[65, 78, 52, 89, 74, 95, 68, 82].map((height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        className="bg-gradient-to-t from-blue-500 to-teal-500 rounded-t-sm flex-1 min-h-2"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Slide Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {dashboardScreens.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === activeSlide ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
            >
              Real-time Updates
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
            >
              AI-Powered Insights
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
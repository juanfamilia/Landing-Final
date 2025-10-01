'use client';

import { TrendingDown, TrendingUp, Phone, BarChart3 } from 'lucide-react';

export default function Benefits() {
  const benefits = [
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
  ];

  const icons = [TrendingDown, TrendingUp, Phone, BarChart3];

  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Customer Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful insights to drive real business results
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
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
              <div className="text-gray-300">Companies Trust Us</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">25%</div>
              <div className="text-gray-300">Average CSAT Increase</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">92%</div>
              <div className="text-gray-300">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
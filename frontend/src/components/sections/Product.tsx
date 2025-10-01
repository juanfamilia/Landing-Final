'use client';

import { Monitor, BarChart, FileText, Zap } from 'lucide-react';

export default function Product() {
  return (
    <section id="product" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See Siete CX in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive dashboards and analytics for complete customer experience visibility
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features List */}
          <div className="space-y-8">
            {[
              { icon: Monitor, title: "Real-time CX Dashboard", color: "from-blue-500 to-blue-600" },
              { icon: BarChart, title: "Advanced Analytics Engine", color: "from-green-500 to-green-600" },
              { icon: FileText, title: "Automated Reporting", color: "from-purple-500 to-purple-600" },
              { icon: Zap, title: "Seamless Integrations", color: "from-orange-500 to-orange-600" }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-4 group cursor-pointer">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      Advanced capabilities that drive real business results.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dashboard Mockup */}
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
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
              </div>

              {/* Dashboard Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Real-time Dashboard</h3>
                    <p className="text-gray-600">Monitor customer experience metrics</p>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "CSAT Score", value: "4.8/5", trend: "+12%" },
                    { label: "NPS", value: "72", trend: "+8%" },
                    { label: "Response Time", value: "2.3s", trend: "-15%" },
                    { label: "Resolution Rate", value: "94%", trend: "+5%" }
                  ].map((metric, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                      <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                      <div className={`text-xs font-medium ${
                        metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend} vs last month
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-xl">
                  <div className="flex items-end justify-between h-32 space-x-2">
                    {[65, 78, 52, 89, 74, 95, 68, 82].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-blue-500 to-teal-500 rounded-t-sm flex-1 min-h-2"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
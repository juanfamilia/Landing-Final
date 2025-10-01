'use client';

import { Quote } from 'lucide-react';

export default function Research() {
  const quotes = [
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
  ];

  return (
    <section id="research" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Backed by Industry Research
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading organizations trust customer experience as their competitive advantage
          </p>
        </div>

        {/* Research Quotes */}
        <div className="space-y-12">
          {quotes.map((quote, index) => (
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
            <h3 className="text-3xl font-bold mb-4">The Research is Clear</h3>
            <p className="text-blue-100 text-lg">Customer experience is the new competitive battleground</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-300">67%</div>
              <div className="text-blue-100">of companies now compete on CX</div>
              <div className="text-xs text-blue-200">vs 36% in 2010</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-300">4-8%</div>
              <div className="text-blue-100">higher revenue growth</div>
              <div className="text-xs text-blue-200">for CX-focused companies</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-300">20%</div>
              <div className="text-blue-100">improvement in satisfaction</div>
              <div className="text-xs text-blue-200">with proper CX management</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
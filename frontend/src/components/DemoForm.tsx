'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle, X, User, Mail, Building, Phone, MessageSquare } from 'lucide-react';
// 🔹 CAMBIO: importar getGAClientId aquí (no dentro de handleSubmit)
import { getGAClientId, trackDemoRequest } from '@/lib/analytics';
import { usePathname } from 'next/navigation';
import { submitToHubSpot } from '@/lib/hubspot';
interface DemoFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoForm({ isOpen, onClose }: DemoFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    sector: '',
    message: '',
    
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const pathname = usePathname();
  const currentLocale = pathname.startsWith('/es') ? 'es' : 'en';

  const sectors = [
    'Banking & Financial Services',
    'Retail & E-commerce', 
    'Healthcare',
    'Telecommunications',
    'Insurance',
    'Technology',
    'Government',
    'Other'
  ];

  const [selectedDateTime, setSelectedDateTime] = useState('')
  const isStep2Valid = selectedDateTime !== '' 
;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // 🔹 CAMBIO: obtener GA Client ID
      const clientId = getGAClientId();
     
      // Submit to HubSpot
      const success = await submitToHubSpot({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: `Sector: ${formData.sector}\nPreferred Time: ${selectedDateTime}\n\nMessage: ${formData.message}`,
        locale: currentLocale,
        // 🔹 CAMBIO: agregar gaClientId
        gaClientId: clientId,
      });

      if (success) {
        // Track analytics
        trackDemoRequest(currentLocale);
        
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          // Reset form after closing
          setTimeout(() => {
            setStep(1);
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              phone: '',
              sector: '',
              message: '',
            });
            setSelectedDateTime('');
          }, 500);
        }, 2000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.name && formData.email && formData.company && formData.sector;
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {currentLocale === 'es' ? 'Agendar Demo Personalizada' : 'Schedule Personalized Demo'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {currentLocale === 'es' ? '¡Demo Agendada!' : 'Demo Scheduled!'}
              </h3>
              <p className="text-gray-600">
                {currentLocale === 'es' 
                  ? 'Te contactaremos pronto para confirmar tu demo personalizada.'
                  : "We'll contact you soon to confirm your personalized demo."
                }
              </p>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLocale === 'es' ? 'Información de Contacto' : 'Contact Information'}
              </h3>
              
              <div className="relative">
                
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder={currentLocale === 'es' ? 'Nombre completo' : 'Full name'}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder={currentLocale === 'es' ? 'Correo electrónico' : 'Email address'}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="company"
                  placeholder={currentLocale === 'es' ? 'Empresa' : 'Company'}
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  placeholder={currentLocale === 'es' ? 'Teléfono (opcional)' : 'Phone (optional)'}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">
                  {currentLocale === 'es' ? 'Selecciona tu sector' : 'Select your sector'}
                </option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
              
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  name="message"
                  placeholder={currentLocale === 'es' ? 'Mensaje adicional (opcional)' : 'Additional message (optional)'}
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLocale === 'es' ? 'Selecciona tu Horario Preferido' : 'Select Your Preferred Time'}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4">
                {currentLocale === 'es' 
                  ? 'Elige el mejor horario para tu demo personalizada de 30 minutos'
                  : 'Choose the best time for your 30-minute personalized demo'
                }
              </p>
              
              <div className="relative">
                <input
                  type="datetime-local"
                  value={selectedDateTime}
                  onChange={(e) => setSelectedDateTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="flex justify-between items-center p-6 border-t border-gray-200">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                {currentLocale === 'es' ? 'Atrás' : 'Back'}
              </button>
            )}
            
            <div className="ml-auto">
              {step === 1 ? (
                <button
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentLocale === 'es' ? 'Continuar' : 'Continue'}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStep2Valid || isSubmitting}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {currentLocale === 'es' ? 'Enviando...' : 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 mr-2" />
                      {currentLocale === 'es' ? 'Confirmar Demo' : 'Confirm Demo'}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

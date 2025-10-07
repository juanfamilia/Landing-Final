'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, X, User, Mail, Building, Phone, MessageSquare } from 'lucide-react';
import { submitToHubSpot } from '@/lib/hubspot';
import { trackDemoRequest } from '@/lib/analytics';
import { usePathname } from 'next/navigation';

export default function DemoForm({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    sector: '',
    message: '',
    date: '',
    timeSlot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

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
    'Other',
  ];

  // 🔹 Generar próximos 14 días hábiles
  useEffect(() => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay(); // 0=Dom, 6=Sáb
      if (dayOfWeek >= 1 && dayOfWeek <= 5) days.push(date.toISOString().split('T')[0]);
    }
    setAvailableDates(days);
  }, []);

  // 🔹 Generar horarios 9:00 a 17:30 cada 30 min
  useEffect(() => {
    const times = [];
    for (let h = 9; h <= 17; h++) {
      times.push(`${h.toString().padStart(2, '0')}:00`);
      times.push(`${h.toString().padStart(2, '0')}:30`);
    }
    setAvailableTimes(times);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.date || !formData.timeSlot) return;
    setIsSubmitting(true);

    try {
      await submitToHubSpot({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: `Sector: ${formData.sector}\nFecha: ${formData.date}\nHorario: ${formData.timeSlot}\n\nMensaje: ${formData.message}`,
        locale: currentLocale,
      });

      trackDemoRequest(currentLocale);
      setIsSubmitted(true);

      setTimeout(() => {
        onClose();
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
            date: '',
            timeSlot: '',
          });
        }, 500);
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Hubo un error al enviar el formulario. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid = formData.name && formData.email && formData.company && formData.sector;
  const isStep2Valid = formData.date && formData.timeSlot;

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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
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
                {currentLocale === 'es' ? 'Te contactaremos pronto para confirmar tu demo personalizada.' : "We'll contact you soon to confirm your personalized demo."}
              </p>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLocale === 'es' ? 'Información de Contacto' : 'Contact Information'}
              </h3>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" name="name" placeholder={currentLocale === 'es' ? 'Nombre completo' : 'Full name'} value={formData.name} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="email" name="email" placeholder={currentLocale === 'es' ? 'Correo electrónico' : 'Email address'} value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" name="company" placeholder={currentLocale === 'es' ? 'Empresa' : 'Company'} value={formData.company} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="tel" name="phone" placeholder={currentLocale === 'es' ? 'Teléfono (opcional)' : 'Phone (optional)'} value={formData.phone} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <select name="sector" value={formData.sector} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">{currentLocale === 'es' ? 'Selecciona tu sector' : 'Select your sector'}</option>
                {sectors.map((sector) => <option key={sector} value={sector}>{sector}</option>)}
              </select>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea name="message" placeholder={currentLocale === 'es' ? 'Mensaje adicional (opcional)' : 'Additional message (optional)'} value={formData.message} onChange={handleInputChange} rows={3} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentLocale === 'es' ? 'Selecciona tu Fecha y Horario' : 'Select Date & Time'}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <label className="block">
                  <span className="text-sm text-gray-600">{currentLocale === 'es' ? 'Fecha' : 'Date'}</span>
                  <select name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">{currentLocale === 'es' ? 'Selecciona una fecha' : 'Select a date'}</option>
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString(currentLocale === 'es' ? 'es-ES' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </option>
                    ))}
                  </select>
                </label>
                <span className="text-sm text-gray-600">{currentLocale === 'es' ? 'Horario' : 'Time Slot'}</span>
                <div className="grid grid-cols-1 gap-2">
                  {availableTimes.map((slot) => (
                    <button type="button" key={slot} onClick={() => setFormData({ ...formData, timeSlot: slot })} className={`p-3 border rounded-lg text-left transition-colors ${formData.timeSlot === slot ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'}`}>
                      <Calendar className="w-4 h-4 inline mr-2" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSubmitted && (
          <div className="flex justify-between items-center p-6 border-t border-gray-200">
            {step === 2 && <button onClick={() => setStep(1)} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">{currentLocale === 'es' ? 'Atrás' : 'Back'}</button>}
            <div className="ml-auto">
              {step === 1 ? (
                <button onClick={() => setStep(2)} disabled={!isStep1Valid} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  {currentLocale === 'es' ? 'Continuar' : 'Continue'}
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!isStep2Valid || isSubmitting} className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
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

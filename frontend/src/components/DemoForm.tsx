'use client';

import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, X, User, Mail, Building, Phone, MessageSquare } from 'lucide-react';
import { submitToHubSpot } from '@/lib/hubspot';
import { trackDemoRequest } from '@/lib/analytics';
import { usePathname } from 'next/navigation';

interface DemoFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  sector: string;
  message: string;
  date: string;
  timeSlot: string;
}

export default function DemoForm({ isOpen, onClose }: DemoFormProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    sector: '',
    message: '',
    date: '',
    timeSlot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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

  const availableDates: string[] = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const availableTimes: string[] = Array.from({ length: 18 - 9 }, (_, h) => {
    const hour = h + 9;
    return [`${hour.toString().padStart(2, '0')}:00`, `${hour.toString().padStart(2, '0')}:30`];
  }).flat();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.company || !formData.sector || !formData.date || !formData.timeSlot) return;

    setIsSubmitting(true);
    try {
      const success = await submitToHubSpot({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: `Sector: ${formData.sector}\nFecha: ${formData.date}\nHora: ${formData.timeSlot}\n\nMensaje: ${formData.message}`,
        locale: currentLocale,
      });

      if (success) {
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
      }
    } catch (error) {
      console.error('Form submission error:', error);
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
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{currentLocale === 'es' ? 'Agendar Demo' : 'Schedule Demo'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-4 flex items-center space-x-4">
          {[1, 2].map(n => (
            <div key={n} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= n ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{n}</div>
          ))}
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{currentLocale === 'es' ? '¡Demo Agendada!' : 'Demo Scheduled!'}</h3>
            </div>
          ) : step === 1 ? (
            <>
              {['name', 'email', 'company', 'phone'].map(field => (
                <div key={field} className="mb-4">
                  <input
                    name={field}
                    value={formData[field as keyof FormData] as string}
                    onChange={handleInputChange}
                    placeholder={field}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              ))}
              <select name="sector" value={formData.sector} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg mb-4">
                <option value="">{currentLocale === 'es' ? 'Selecciona sector' : 'Select sector'}</option>
                {sectors.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <textarea name="message" value={formData.message} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" placeholder="Mensaje (opcional)" />
            </>
          ) : (
            <>
              {availableDates.map(date => (
                <button key={date} onClick={() => setFormData(prev => ({ ...prev, date }))} className={`p-2 border rounded mb-2 ${formData.date === date ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}>
                  {date}
                </button>
              ))}
              {availableTimes.map(time => (
                <button key={time} onClick={() => setFormData(prev => ({ ...prev, timeSlot: time }))} className={`p-2 border rounded mb-2 ${formData.timeSlot === time ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}>
                  {time}
                </button>
              ))}
            </>
          )}
        </div>

        {!isSubmitted && (
          <div className="flex justify-between items-center p-6 border-t border-gray-200">
            {step === 2 && <button onClick={() => setStep(1)}>Atrás</button>}
            <button onClick={step === 1 ? () => setStep(2) : handleSubmit} disabled={step === 1 ? !isStep1Valid : !isStep2Valid || isSubmitting}>
              {step === 1 ? 'Continuar' : isSubmitting ? 'Enviando...' : 'Confirmar Demo'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

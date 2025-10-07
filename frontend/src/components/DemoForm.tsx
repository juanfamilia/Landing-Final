'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, X, User, Mail, Building, Phone, MessageSquare } from 'lucide-react';
import { submitToHubSpot } from '@/lib/hubspot';

interface DemoFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  date: string;
  timeSlot: string;
}

export default function DemoForm({ isOpen, onClose }: DemoFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    date: '',
    timeSlot: '',
  });

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generar fechas disponibles (lunes a viernes próximos 14 días)
  useEffect(() => {
    const today = new Date();
    const days: string[] = [];

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        days.push(date.toISOString().split('T')[0]);
      }
    }

    setAvailableDates(days);
  }, []);

  // Generar horarios de 9:00 a 18:00 cada 30 minutos
  useEffect(() => {
    const times: string[] = [];
    for (let hour = 9; hour < 18; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`);
      times.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    setAvailableTimes(times);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitToHubSpot({
        ...formData,
        hs_context: JSON.stringify({
          pageName: document.title,
          pageUri: window.location.href,
        }),
      });

      setSuccess(true);
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        date: '',
        timeSlot: '',
      });
    } catch (error) {
      console.error('Error enviando datos a HubSpot:', error);
      alert('Hubo un error al enviar el formulario. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {success ? (
          <div className="flex flex-col items-center text-center py-10">
            <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold">¡Solicitud enviada!</h2>
            <p className="text-gray-600 mt-2">
              Nos pondremos en contacto contigo para confirmar tu cita.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4">Agenda tu demostración</h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="firstname"
                  placeholder="Nombre"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="pl-10 p-2 border rounded-lg w-full"
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Apellido"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="pl-10 p-2 border rounded-lg w-full"
                />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 p-2 border rounded-lg w-full"
              />
            </div>

            <div className="relative">
              <Building className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="company"
                placeholder="Empresa"
                value={formData.company}
                onChange={handleChange}
                className="pl-10 p-2 border rounded-lg w-full"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 p-2 border rounded-lg w-full"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
              <select
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="pl-10 p-2 border rounded-lg w-full"
              >
                <option value="">Selecciona una fecha</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
                className="pl-10 p-2 border rounded-lg w-full"
              >
                <option value="">Selecciona una hora</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea
                name="message"
                placeholder="Mensaje (opcional)"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="pl-10 p-2 border rounded-lg w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-semibold transition"
            >
              {loading ? 'Enviando...' : 'Agendar demostración'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  X,
  User,
  Mail,
  Building,
  Phone,
  MessageSquare,
} from "lucide-react";
import { submitToHubSpot } from "@/lib/hubspot";

export default function DemoForm({ isOpen, onClose }) {
  const initialFormState = {
    firstname: "",
    lastname: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    date: "",
    timeSlot: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔹 Fechas hábiles (próximos 14 días, lunes a viernes)
  useEffect(() => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const day = d.getDay();
      if (day >= 1 && day <= 5) {
        dates.push(d.toISOString().split("T")[0]);
      }
    }
    setAvailableDates(dates);
  }, []);

  // 🔹 Horarios: 9:00 - 18:00 cada 30 min
  useEffect(() => {
    const times = [];
    for (let h = 9; h < 18; h++) {
      times.push(`${String(h).padStart(2, "0")}:00`);
      times.push(`${String(h).padStart(2, "0")}:30`);
    }
    setAvailableTimes(times);
  }, []);

  // 🔹 Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  // 🔹 Envío a HubSpot
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.timeSlot) {
      alert("Por favor selecciona una fecha y hora disponibles.");
      return;
    }

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
      setFormData(initialFormState);
    } catch (err) {
      console.error("❌ Error enviando datos a HubSpot:", err);
      alert("Ocurrió un error al enviar el formulario. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
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
            <h2 className="text-2xl font-bold text-center mb-4">
              Agenda tu demostración
            </h2>

            {/* Nombre y Apellido */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "firstname", placeholder: "Nombre" },
                { name: "lastname", placeholder: "Apellido" },
              ].map((f) => (
                <div className="relative" key={f.name}>
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    name={f.name}
                    placeholder={f.placeholder}
                    value={formData[f.name]}
                    onChange={handleChange}
                    required
                    className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Empresa */}
            <div className="relative">
              <Building className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="company"
                placeholder="Empresa"
                value={formData.company}
                onChange={handleChange}
                className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Teléfono */}
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Fecha */}
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
              <select
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona una fecha</option>
                {availableDates.map((d) => (
                  <option key={d} value={d}>
                    {new Date(d).toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Hora */}
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                required
                className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona una hora</option>
                {availableTimes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Mensaje */}
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea
                name="message"
                placeholder="Mensaje (opcional)"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Enviando..." : "Agendar demostración"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

'use client';

import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith('/es');

  const t = () => {
    const translations: any = {
      en: {
        description: "Transforming customer experience through intelligent analytics and mystery shopping.",
        contact: "Contact",
        links: "Links",
        about: "About Us",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        support: "Support",
        copyright: "© 2024 Siete Inteligencia Creativa. All rights reserved."
      },
      es: {
        description: "Transformando la experiencia del cliente a través de análisis inteligente y mystery shopping.",
        contact: "Contacto",
        links: "Enlaces",
        about: "Acerca de Nosotros",
        privacy: "Política de Privacidad",
        terms: "Términos de Servicio",
        support: "Soporte",
        copyright: "© 2024 Siete Inteligencia Creativa. Todos los derechos reservados."
      }
    };
    return translations[isSpanish ? 'es' : 'en'];
  };

  const data = t();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Image
              src="https://customer-assets.emergentagent.com/job_premium-cx/artifacts/p2reh895_Logo%20Siete%20CX.png"
              alt="Siete CX Logo"
              width={150}
              height={50}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 mb-6 max-w-md">
              {data.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{data.contact}</h3>
            <div className="space-y-3">
              <a href="mailto:info@sieteic.com" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-3" />
                info@sieteic.com
              </a>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3" />
                +1 829 961 0082
              </div>
              <div className="flex items-start text-gray-400">
                <MapPin className="w-4 h-4 mr-3 mt-1" />
                <span>Distrito Nacional,<br />Santo Domingo,<br />República Dominicana</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{data.links}</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">{data.about}</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">{data.privacy}</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">{data.terms}</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">{data.support}</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            {data.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
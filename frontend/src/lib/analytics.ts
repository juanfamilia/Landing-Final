// Google Analytics 4 Integration
// Ready for configuration once GA4 Measurement ID is provided

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track demo requests
export const trackDemoRequest = (locale: string) => {
  event({
    action: 'demo_request',
    category: 'conversion',
    label: `demo_request_${locale}`,
  });
};

// Track language switches
export const trackLanguageSwitch = (from: string, to: string) => {
  event({
    action: 'language_switch',
    category: 'engagement',
    label: `${from}_to_${to}`,
  });
};

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not configured');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.gtag = window.gtag || function () {
    (window.gtag as any).q = (window.gtag as any).q || [];
    (window.gtag as any).q.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};
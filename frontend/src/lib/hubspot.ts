// HubSpot Integration
// Ready for configuration once HubSpot Portal ID is provided

export const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '';
export const HUBSPOT_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || '';

export interface HubSpotFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
  locale?: string;
}

// Submit form to HubSpot
export const submitToHubSpot = async (formData: HubSpotFormData): Promise<boolean> => {
  if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_ID) {
    console.warn('HubSpot configuration missing. Form data:', formData);
    // Return mock success for now
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  }

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: formData.name.split(' ')[0] || formData.name },
            { name: 'lastname', value: formData.name.split(' ').slice(1).join(' ') || '' },
            { name: 'email', value: formData.email },
            { name: 'company', value: formData.company },
            { name: 'phone', value: formData.phone || '' },
            { name: 'message', value: formData.message || '' },
            { name: 'hs_language', value: formData.locale === 'es' ? 'es' : 'en' },
          ],
          context: {
            pageUri: window.location.href,
            pageName: document.title,
            hutk: getHubSpotCookie(),
          },
        }),
      }
    );

    if (response.ok) {
      console.log('HubSpot form submitted successfully');
      return true;
    } else {
      console.error('HubSpot form submission failed:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error submitting to HubSpot:', error);
    return false;
  }
};

// Get HubSpot tracking cookie
const getHubSpotCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  const name = 'hubspotutk=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

// Initialize HubSpot tracking
export const initHubSpot = () => {
  if (!HUBSPOT_PORTAL_ID) {
    console.warn('HubSpot Portal ID not configured');
    return;
  }

  // Load HubSpot tracking code
  const script = document.createElement('script');
  script.src = `//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

// Track page views in HubSpot
export const trackHubSpotPageView = (path: string) => {
  if (typeof window !== 'undefined' && (window as any)._hsq) {
    (window as any)._hsq.push(['trackPageView']);
  }
};

// Track custom events in HubSpot
export const trackHubSpotEvent = (eventName: string, properties: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any)._hsq) {
    (window as any)._hsq.push([
      'trackEvent',
      {
        id: eventName,
        ...properties,
      },
    ]);
  }
};
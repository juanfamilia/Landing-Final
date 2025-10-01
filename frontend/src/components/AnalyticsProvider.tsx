'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initGA, pageview } from '@/lib/analytics';
import { initHubSpot, trackHubSpotPageView } from '@/lib/hubspot';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize analytics on mount
    initGA();
    initHubSpot();
  }, []);

  useEffect(() => {
    // Track page views on route changes
    pageview(pathname);
    trackHubSpotPageView(pathname);
  }, [pathname]);

  return <>{children}</>;
}
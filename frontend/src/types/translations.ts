// Types for translation objects
export interface BenefitItem {
  title: string;
  description: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ResearchQuote {
  text: string;
  source: string;
  author: string;
}

export interface StatsData {
  companies: string;
  csatIncrease: string;
  satisfaction: string;
}

export interface ResearchStats {
  title: string;
  subtitle: string;
  compete: string;
  competeSub: string;
  growth: string;
  growthSub: string;
  improvement: string;
  improvementSub: string;
}

export interface DashboardMetrics {
  csat: string;
  nps: string;
  responseTime: string;
  resolutionRate: string;
}

export interface DashboardTrends {
  vsLastMonth: string;
}

export interface DashboardData {
  title: string;
  subtitle: string;
  live: string;
  metrics: DashboardMetrics;
  trends: DashboardTrends;
}
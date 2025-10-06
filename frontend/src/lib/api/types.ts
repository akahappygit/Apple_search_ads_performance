export interface MetricSnapshot {
  date: string;
  spend: number;
  impressions: number;
  taps: number;
  conversions: number;
  cpa: number;
  roas: number;
  ctr: number;
}

export interface CampaignRow {
  id: string;
  campaignName: string;
  adGroup: string;
  keyword: string;
  matchType: "exact" | "phrase" | "broad";
  impressions: number;
  spend: number;
  conversions: number;
  status: "active" | "paused";
}

export interface Filters {
  dateRange: {from: string;to: string;};
  accountIds: string[];
  campaignStatus: "all" | "active" | "paused";
  searchTerm: string;
}
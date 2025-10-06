import { MetricSnapshot, CampaignRow } from "@/lib/api/types";
import { fmtDate, daysAgo } from "@/lib/utils/date";

export const accounts = Array.from({ length: 5 }, (_, i) => ({ id: `acc-${i + 1}`, name: `Account ${i + 1}` }));

export function generateDailyMetrics(days = 90, opts?: {accountId?: string;status?: "all" | "active" | "paused";}): MetricSnapshot[] {
  const baseSeed = (opts?.accountId ?? "acc-1").split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  const statusMul = opts?.status === "paused" ? 0.6 : opts?.status === "active" ? 1.1 : 1.0;
  const baseSpend = 50 + baseSeed % 10;
  return Array.from({ length: days }, (_, i) => {
    const date = fmtDate(daysAgo(days - i));
    const seasonal = 1 + 0.2 * Math.sin(i / 14 * Math.PI + baseSeed);
    const spend = +(baseSpend * seasonal * statusMul + Math.random() * 20).toFixed(2);
    const impressions = Math.floor(1000 * seasonal * statusMul + Math.random() * 500);
    const taps = Math.floor(impressions * (0.03 + Math.random() * 0.02));
    const conversions = Math.floor(taps * (0.05 + Math.random() * 0.03));
    const ctr = taps / Math.max(impressions, 1);
    const cpa = conversions ? +(spend / conversions).toFixed(2) : 0;
    const roas = +(Math.random() * 3).toFixed(2);
    return { date, spend, impressions, taps, conversions, ctr, cpa, roas };
  });
}

export function generateCampaignRows(count = 60, opts?: {accountId?: string;status?: "all" | "active" | "paused";}): CampaignRow[] {
  const matchTypes: CampaignRow["matchType"][] = ["exact", "phrase", "broad"];
  const statuses: CampaignRow["status"][] = ["active", "paused"];
  const baseSeed = (opts?.accountId ?? "acc-1").split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  const statusMul = opts?.status === "paused" ? 0.6 : opts?.status === "active" ? 1.1 : 1.0;
  return Array.from({ length: count }, (_, i) => ({
    id: `cmp-${i + 1}`,
    campaignName: `Campaign ${i + 1}`,
    adGroup: `Ad Group ${i % 10 + 1}`,
    keyword: `keyword_${i + 1}`,
    matchType: matchTypes[i % matchTypes.length],
    impressions: Math.floor((2000 + baseSeed % 500) * statusMul + Math.random() * 8000),
    spend: +((50 + baseSeed % 50) * statusMul + Math.random() * 500).toFixed(2),
    conversions: Math.floor(Math.random() * 100),
    status: opts?.status && opts.status !== "all" ? opts.status : statuses[i % statuses.length]
  }));
}
import { useQuery } from "@tanstack/react-query";
import { generateDailyMetrics, generateCampaignRows } from "@/data/mock-data";
import type { MetricSnapshot, CampaignRow } from "@/lib/api/types";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/root-reducer";

export function useDailyMetrics() {
  const filters = useSelector((s: RootState) => s.filters);
  const accountId = filters.accountIds[0] ?? "acc-1";
  const status = filters.campaignStatus;
  return useQuery<MetricSnapshot[]>({
    queryKey: ["daily-metrics", accountId, status],
    queryFn: async () => {

      try {
        const res = await fetch("/api/daily-metrics", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const series = await res.json();
        return series as MetricSnapshot[];
      } catch (e) {
        await new Promise((r) => setTimeout(r, 120));
        return generateDailyMetrics(90, { accountId, status });
      }
    }
  });
}

export function useCampaignRows() {
  const filters = useSelector((s: RootState) => s.filters);
  const accountId = filters.accountIds[0] ?? "acc-1";
  const status = filters.campaignStatus;
  return useQuery<CampaignRow[]>({
    queryKey: ["campaign-rows", accountId, status],
    queryFn: async () => {

      try {
        const res = await fetch("/api/campaign-rows", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const rows = await res.json();
        return rows as CampaignRow[];
      } catch (e) {
        await new Promise((r) => setTimeout(r, 120));
        return generateCampaignRows(60, { accountId, status });
      }
    }
  });
}
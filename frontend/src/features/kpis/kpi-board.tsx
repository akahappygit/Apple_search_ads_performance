"use client";
import KPIcard from "@/components/charts/kpi-card";
import { useDailyMetrics } from "@/features/dashboard/hooks/useDashboardData";
import { useMemo } from "react";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils/format";

export default function KPIboard() {
  const { data } = useDailyMetrics();
  const latest = data?.[data.length - 1];
  const prev = data?.[data.length - 2];

  const spark = useMemo(() => data ? data.map((d) => ({ date: d.date, value: d.impressions })) : undefined, [data]);

  function pct(key: keyof typeof latest) {
    if (!latest || !prev) return undefined;
    const a = latest[key] as any as number;
    const b = prev[key] as any as number;
    if (!b) return 0;
    return (a - b) / b * 100;
  }

  return (
    <div className="kpi-grid">
      <KPIcard label="Total Spend" metricKey="spend" value={latest ? formatCurrency(latest.spend) : "—"} deltaPct={pct("spend")} spark={spark} />
      <KPIcard label="Impressions" metricKey="impressions" value={latest ? formatNumber(latest.impressions) : "—"} deltaPct={pct("impressions")} />
      <KPIcard label="Taps" metricKey="taps" value={latest ? formatNumber(latest.taps) : "—"} deltaPct={pct("taps")} />
      <KPIcard label="Conversions" metricKey="conversions" value={latest ? formatNumber(latest.conversions) : "—"} deltaPct={pct("conversions")} />
      <KPIcard label="CTR" metricKey="ctr" value={latest ? formatPercent(latest.ctr) : "—"} deltaPct={pct("ctr")} />
      <KPIcard label="CPA" metricKey="cpa" value={latest ? formatCurrency(latest.cpa) : "—"} deltaPct={pct("cpa")} />
    </div>);

}
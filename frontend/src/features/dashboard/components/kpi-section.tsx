"use client";
import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import Badge from "@/components/ui/badge";
import { useDailyMetrics } from "../hooks/useDashboardData";
import { METRICS } from "@/lib/constants/metrics";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils/format";
import LiveRegion from "@/components/a11y/live-region";
import type { MetricSnapshot } from "@/lib/api/types";

function formatMetric(key: string, value: number) {
  switch (key) {
    case "spend":
      return formatCurrency(value);
    case "ctr":
      return formatPercent(value);
    case "cpa":
      return formatCurrency(value);
    default:
      return formatNumber(value);
  }
}

export default function KPISection() {
  const { data, isLoading, error } = useDailyMetrics();
  const snapshots = data as MetricSnapshot[] | undefined;
  const latest = snapshots?.[snapshots.length - 1];
  const prev = snapshots?.[snapshots.length - 2];

  function percentChange(key: string) {
    if (!latest || !prev) return 0;
    const a = (latest as any)[key] as number;
    const b = (prev as any)[key] as number;
    if (!b) return 0;
    return (a - b) / b * 100;
  }

  return (
    <div className="kpi-grid">
      {error && <Card className="p-3">Failed to load KPIs.</Card>}
      <LiveRegion message={latest ? `KPIs updated for ${latest.date}` : ""} />
      {METRICS.map((m) =>
      <Card key={m.key}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-[var(--color-text-secondary)]">{m.label}</div>
              <div className="mt-1 text-2xl font-semibold">
                {isLoading || !latest ? <Skeleton className="h-7 w-24" /> : formatMetric(m.key, latest[m.key as keyof MetricSnapshot] as number)}
              </div>
            </div>
            {isLoading || !latest ?
          <Skeleton className="h-6 w-12" /> :

          (() => {
            const pct = percentChange(m.key);
            const sign = pct >= 0 ? "+" : "";
            const variant = pct >= 0 ? "success" : "error" as const;
            return <Badge variant={variant}>
                  <span aria-label={`${m.label} ${sign}${Math.abs(pct).toFixed(0)} percent`}>{`${sign}${Math.abs(pct).toFixed(0)}%`}</span>
                </Badge>;
          })()
          }
          </div>
        </Card>
      )}
    </div>);

}
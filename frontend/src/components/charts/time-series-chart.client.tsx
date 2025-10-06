"use client";
import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import TimeSeriesChart from "./time-series-chart";
import { useDailyMetrics } from "@/features/dashboard/hooks/useDashboardData";

export default function TimeSeriesChartClient() {
  const { data, isLoading } = useDailyMetrics();

  if (isLoading || !data) {
    return (
      <Card>
        <Skeleton className="h-[360px]" />
      </Card>);

  }

  const series = data.map((d) => ({ date: d.date, a: d.taps, b: d.conversions }));

  return (
    <TimeSeriesChart
      data={series}
      aKey="a"
      bKey="b"
      title="Daily Trends: Taps vs Conversions" />);


}
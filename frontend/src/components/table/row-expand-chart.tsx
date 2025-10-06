"use client";
import MiniOverviewChart from "@/components/charts/mini-overview-chart";

export default function RowExpandChart({ data }: {data: {date: string;value: number;}[];}) {
  return (
    <div className="p-3 bg-[var(--color-card)] rounded">
      <MiniOverviewChart data={data} />
    </div>);

}
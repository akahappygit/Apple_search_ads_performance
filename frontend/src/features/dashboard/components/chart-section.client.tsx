"use client";
import dynamic from "next/dynamic";
import Card from "@/components/ui/card";

const Chart = dynamic(() => import("./chart-section"), {
  ssr: false,
  loading: () => <Card className="h-[360px]"><div className="p-4">Loading chart…</div></Card>
});

export default function ChartSectionClient() {
  return <Chart />;
}
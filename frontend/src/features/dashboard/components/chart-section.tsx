"use client";
import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import { useDailyMetrics } from "../hooks/useDashboardData";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format } from "date-fns";
import VisuallyHidden from "@/components/a11y/visually-hidden";

export default function ChartSection() {
  const { data, isLoading } = useDailyMetrics();

  return (
    <Card className="h-[420px]" role="img" aria-label="Daily trends of impressions, taps, and conversions">
      <div className="mb-3 text-sm text-[var(--color-text-secondary)]">Daily Trends</div>
      {isLoading || !data ?
      <Skeleton className="h-80" /> :

      <ResponsiveContainer width="100%" height={340}>
          <LineChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} interval={6} minTickGap={24} tickFormatter={(d: string) => {
            try {return format(new Date(d), "MMM d");} catch {return d;}
          }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => v.toLocaleString()} labelFormatter={(l: string) => `Date: ${l}`} />
            <Legend />
            <Line type="monotone" strokeWidth={3} dataKey="impressions" stroke="#94A3B8" dot={false} name="Impressions" isAnimationActive={false} />
            <Line type="monotone" strokeWidth={3} dataKey="taps" stroke="#FF6B35" dot={false} name="Taps" isAnimationActive={false} />
            <Line type="monotone" strokeWidth={3} dataKey="conversions" stroke="#10B981" dot={false} name="Conversions" isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      }
      <VisuallyHidden>
        Line chart visualization summarizing 90 days of daily impressions, taps, and conversions.
      </VisuallyHidden>
    </Card>);

}
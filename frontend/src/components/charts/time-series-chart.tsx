"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ReferenceDot } from "recharts";
import Card from "@/components/ui/card";

export interface TimeSeriesDatum {date: string;a: number;b?: number;}

export default function TimeSeriesChart({ data, aKey = "a", bKey = "b", title = "Trend", annotations = [] as {x: string;y?: number;label?: string;}[] }: {data: TimeSeriesDatum[];aKey?: keyof TimeSeriesDatum;bKey?: keyof TimeSeriesDatum;title?: string;annotations?: {x: string;y?: number;label?: string;}[];}) {
  return (
    <Card className="h-[360px]">
      <div className="mb-3 text-sm text-[var(--color-text-secondary)]">{title}</div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey={aKey as string} stroke="#FF6B35" dot={false} name="Series A" isAnimationActive={false} />
          {bKey && <Line type="monotone" dataKey={bKey as string} stroke="#64748B" dot={false} name="Series B" isAnimationActive={false} />}
          {annotations.map((a, i) =>
          <ReferenceDot key={i} x={a.x} y={a.y} r={3} stroke="#10B981" />
          )}
          <Brush dataKey="date" travellerWidth={8} />
        </LineChart>
      </ResponsiveContainer>
    </Card>);

}
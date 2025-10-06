"use client";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function MiniOverviewChart({ data }: {data: {date: string;value: number;}[];}) {
  return (
    <div className="h-16">
      <ResponsiveContainer width="100%" height={64}>
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#FF9E65" fill="#FF9E65" fillOpacity={0.2} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>);

}
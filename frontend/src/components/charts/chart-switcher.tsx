"use client";
import React from "react";
import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import Select from "@/components/ui/select";
import { useDailyMetrics } from "@/features/dashboard/hooks/useDashboardData";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Cell, Legend, AreaChart, Area, ScatterChart, Scatter, ZAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap, RadialBarChart, RadialBar, ComposedChart, ReferenceLine } from "recharts";
import { format } from "date-fns";

type ChartType = "pie" | "donut" | "line" | "area" | "bar" | "stackedBar";
const chartTypes: {value: ChartType;label: string;}[] = [
{ value: "pie", label: "Pie" },
{ value: "donut", label: "Donut" },
{ value: "line", label: "Line" },
{ value: "area", label: "Area" },
{ value: "bar", label: "Bar" },
{ value: "stackedBar", label: "Stacked Bar" }];


const metrics = [
{ key: "spend", label: "Total Spend" },
{ key: "impressions", label: "Impressions" },
{ key: "taps", label: "Taps" },
{ key: "conversions", label: "Conversions" },
{ key: "ctr", label: "CTR" },
{ key: "cpa", label: "CPA" }];


export default function ChartSwitcher({ defaultMetric, defaultChart = "pie", lockMetric = false, embedded = false, compactLegend = false, maxGroups }: {defaultMetric?: string;defaultChart?: ChartType;lockMetric?: boolean;embedded?: boolean;compactLegend?: boolean;maxGroups?: number;}) {
  const { data, isLoading } = useDailyMetrics();
  const [chart, setChart] = React.useState<ChartType>(defaultChart);
  const [metric, setMetric] = React.useState<string>(defaultMetric ?? metrics[0].key);


  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) setContainerWidth(Math.round(rect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (isLoading || !data) return embedded ? <Skeleton className="h-[240px]" /> : <Card><Skeleton className="h-[360px]" /></Card>;


  const weeklyAll = Array.from({ length: Math.ceil(data.length / 7) }, (_, w) => {
    const start = w * 7;
    const slice = data.slice(start, start + 7);
    const sum = slice.reduce((s, d) => s + (d as any)[metric], 0);
    return { name: `W${w + 1}`, value: sum };
  });
  const groupsLimit = typeof maxGroups === "number" ? maxGroups : embedded ? 8 : 12;
  const weekly = weeklyAll.slice(-groupsLimit);

  const colors = ["#FF6B35", "#06B6D4", "#14B8A6", "#64748B", "#F59E0B", "#10B981"];


  const pointsCount = data.length;
  const desiredTicks = Math.max(3, Math.floor(containerWidth / 120));
  const xInterval = Math.max(0, Math.ceil(pointsCount / desiredTicks));
  const baseHeight = embedded ? 320 : 420;
  const height = containerWidth > 0 ?
  Math.max(baseHeight, Math.min(embedded ? 480 : 540, Math.round(containerWidth * (embedded ? 0.55 : 0.6)))) :
  baseHeight;
  const barSize = Math.max(10, Math.min(48, Math.floor((Math.max(240, containerWidth) - 64) / Math.min(pointsCount, 24))));
  const strokeW = containerWidth >= 900 ? 4 : containerWidth >= 600 ? 3 : 2;
  const pieOuter = Math.max(110, Math.min(Math.floor(height / 2) - 20, Math.floor(Math.max(240, containerWidth) / 2.6)));
  const pieInner = Math.floor(pieOuter * 0.62);
  const bubbleRangeMin = Math.max(40, Math.floor(Math.max(240, containerWidth) * 0.06));
  const bubbleRangeMax = Math.max(140, Math.floor(Math.max(240, containerWidth) * 0.40));


  const formatNumber = (v: any) => {
    const n = Number(v);
    if (!Number.isFinite(n)) return String(v);
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${Math.round(n).toLocaleString()}`;
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };
  const metricLabel = metrics.find((m) => m.key === metric)?.label || metric;
  const firstDate = data.length ? data[0].date : undefined;
  const lastDate = data.length ? data[data.length - 1].date : undefined;
  const rangeText = firstDate && lastDate ?
  (() => {try {return `${format(new Date(firstDate), "MMM d")} – ${format(new Date(lastDate), "MMM d")}`;} catch {return `${firstDate} – ${lastDate}`;}})() :
  "";
  const captionText = chart === "pie" || chart === "donut" ?
  `Weekly totals • ${metricLabel} • ${weekly.length} groups` :
  `Daily ${metricLabel} • ${rangeText}`;


  const captionH = 22;
  const extraLegendH = chart === "pie" && !compactLegend ?
  Math.ceil(weekly.length / 2) * 24 + 8 :
  0;
  const totalHeight = height + captionH + extraLegendH;

  const chartElement = (() => {
    switch (chart) {
      case "pie":
        return (
          <PieChart>
            <Tooltip formatter={(v: any) => formatNumber(v)} />
            <Pie data={weekly} dataKey="value" nameKey="name" outerRadius={pieOuter}>
              {weekly.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Pie>
            {!compactLegend && <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />}
          </PieChart>);

      case "donut":
        return (
          <PieChart>
            <Tooltip formatter={(v: any) => formatNumber(v)} />
            <Pie data={weekly} dataKey="value" nameKey="name" innerRadius={pieInner} outerRadius={pieOuter}>
              {weekly.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Pie>
            {!compactLegend && <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />}
          </PieChart>);

      case "line":
        return (
          <LineChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis dataKey="date" interval={xInterval} minTickGap={24} tickFormatter={(d: string) => {
              try {return format(new Date(d), "MMM d");} catch {return d;}
            }} />
            <YAxis />
            <Tooltip formatter={(v: any) => formatNumber(v)} labelFormatter={(l: string) => `Date: ${l}`} />
            <Line type="monotone" strokeWidth={strokeW} dataKey={metric} stroke="#FF6B35" dot={false} />
          </LineChart>);

      case "area":
        return (
          <AreaChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis dataKey="date" interval={xInterval} minTickGap={24} tickFormatter={(d: string) => {try {return format(new Date(d), "MMM d");} catch {return d;}}} />
            <YAxis />
            <Tooltip formatter={(v: any) => formatNumber(v)} labelFormatter={(l: string) => `Date: ${l}`} />
            <Area type="monotone" dataKey={metric} stroke="#FF6B35" strokeWidth={strokeW} fill="#FF6B35" fillOpacity={0.22} />
          </AreaChart>);

      case "stackedArea":
        return (
          <AreaChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis dataKey="date" interval={xInterval} minTickGap={24} tickFormatter={(d: string) => {try {return format(new Date(d), "MMM d");} catch {return d;}}} />
            <YAxis />
            <Tooltip formatter={(v: any) => formatNumber(v)} labelFormatter={(l: string) => `Date: ${l}`} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            <Area type="monotone" dataKey="taps" stackId="1" stroke="#FF6B35" strokeWidth={strokeW} fill="#FF6B35" fillOpacity={0.22} name="Taps" />
            <Area type="monotone" dataKey="conversions" stackId="1" stroke="#10B981" strokeWidth={strokeW} fill="#10B981" fillOpacity={0.22} name="Conversions" />
          </AreaChart>);

      case "bar":
      default:
        return (
          <BarChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis dataKey="date" interval={xInterval} minTickGap={24} tickFormatter={(d: string) => {
              try {return format(new Date(d), "MMM d");} catch {return d;}
            }} />
            <YAxis />
            <Tooltip formatter={(v: any) => formatNumber(v)} labelFormatter={(l: string) => `Date: ${l}`} />
            <Bar dataKey={metric} fill="#FF6B35" barSize={barSize} />
          </BarChart>);

      case "column":
        return (
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="date" interval={xInterval} tickFormatter={(d: string) => {try {return format(new Date(d), "MMM d");} catch {return d;}}} />
            <Tooltip formatter={(v: any) => formatNumber(v)} />
            <Bar dataKey={metric} fill="#FF6B35" barSize={barSize} />
          </BarChart>);

      case "stackedBar":
        return (
          <BarChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis dataKey="date" interval={xInterval} minTickGap={24} tickFormatter={(d: string) => {try {return format(new Date(d), "MMM d");} catch {return d;}}} />
            <YAxis />
            <Tooltip formatter={(v: any) => formatNumber(v)} labelFormatter={(l: string) => `Date: ${l}`} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            <Bar dataKey="taps" stackId="a" fill="#FF6B35" name="Taps" barSize={barSize} />
            <Bar dataKey="conversions" stackId="a" fill="#10B981" name="Conversions" barSize={barSize} />
          </BarChart>);

      case "scatter":
        return (
          <ScatterChart margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis dataKey="impressions" name="Impressions" />
            <YAxis dataKey={metric} name={metric} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} fill="#FF6B35" />
          </ScatterChart>);

      case "bubble":
        return (
          <ScatterChart margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis dataKey="impressions" name="Impressions" />
            <YAxis dataKey="taps" name="Taps" />
            <ZAxis dataKey="conversions" range={[bubbleRangeMin, bubbleRangeMax]} name="Conversions" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={data} fill="#06B6D4" />
          </ScatterChart>);

      case "heatmap":

        const last30 = data.slice(-30);
        const maxVal = Math.max(...last30.map((d: any) => d[metric] as number));
        return (
          <div className="grid grid-cols-10 gap-1 p-2">
            {last30.map((d: any, i: number) =>
            <div key={i} title={`${d.date}: ${d[metric]}`}
            className="w-full rounded"
            style={{ height: Math.max(18, Math.min(32, Math.floor(height / 12))), backgroundColor: `rgba(255,107,53,${Math.max(0.15, (d[metric] as number) / Math.max(1, maxVal))})` }} />
            )}
          </div>);

      case "radar":
        return (
          <RadarChart cx="50%" cy="50%" outerRadius={Math.max(100, Math.min(140, Math.floor(Math.min(containerWidth, height) / 2.4)))} data={metrics.map((m) => ({ subject: m.label, val: (data as any).reduce((s: number, d: any) => s + d[m.key], 0) }))}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Total" dataKey="val" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.22} />
            <Tooltip />
          </RadarChart>);

      case "bullet":
        const avg = (data as any).reduce((s: number, d: any) => s + d[metric], 0) / data.length;
        const latestVal = (data as any)[data.length - 1][metric];
        return (
          <ComposedChart data={[{ name: metric, value: latestVal }]} layout="vertical" margin={{ left: 20, right: 16, top: 8, bottom: 8 }}>
            <XAxis type="number" domain={[0, Math.max(latestVal, avg) * 1.2]} />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" barSize={Math.max(24, barSize)} fill="#FF6B35" />
            <ReferenceLine x={avg} stroke="#64748B" label="Avg" />
          </ComposedChart>);

      case "gauge":
        const pct = Math.min(100, Math.round((data as any).reduce((s: number, d: any) => s + d[metric], 0) % 100));
        return (
          <RadialBarChart innerRadius={Math.max(70, Math.floor(pieOuter * 0.66))} outerRadius={pieOuter} data={[{ name: metric, value: pct }]} startAngle={180} endAngle={0}>
            <RadialBar minAngle={15} clockWise dataKey="value" fill="#FF6B35" />
            <Tooltip />
            <Legend />
          </RadialBarChart>);

      case "waterfall":
        const wf = data.map((d: any, i: number) => ({ date: d.date, delta: i === 0 ? d[metric] : d[metric] - (data as any)[i - 1][metric] }));
        return (
          <BarChart data={wf} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis dataKey="date" interval={xInterval} minTickGap={24} tickFormatter={(d: string) => {try {return format(new Date(d), "MMM d");} catch {return d;}}} />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke="#64748B" />
            <Bar dataKey="delta" fill="#FF6B35" barSize={barSize} />
          </BarChart>);

      case "histogram":
        const values = data.map((d) => (d as any)[metric] as number);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const bins = 10;
        const step = (max - min) / bins || 1;
        const hist = Array.from({ length: bins }, (_, i) => ({ bin: `${Math.round(min + i * step)}-${Math.round(min + (i + 1) * step)}`, count: 0 }));
        values.forEach((v) => {const idx = Math.min(Math.floor((v - min) / step), bins - 1);hist[idx].count += 1;});
        return (
          <BarChart data={hist} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 2" opacity={0.2} />
            <XAxis dataKey="bin" interval={0} tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#FF6B35" barSize={barSize} />
          </BarChart>);

      case "treemap":
        return (
          <Treemap data={weekly} dataKey="value" nameKey="name" stroke="#fff">
            {weekly.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
          </Treemap>);

      case "boxPlot":
        const sorted = [...values].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const median = sorted[Math.floor(sorted.length * 0.5)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const minVal = sorted[0];
        const maxVal2 = sorted[sorted.length - 1];
        return (
          <svg viewBox="0 0 300 120" className="w-full h-full">
            <line x1="20" y1="60" x2="280" y2="60" stroke="#64748B" />
            <line x1={20 + minVal / max * 260} y1="40" x2={20 + minVal / max * 260} y2="80" stroke="#94A3B8" />
            <rect x={20 + q1 / max * 260} y={40} width={(q3 - q1) / max * 260} height={40} fill="#FF6B35" fillOpacity={0.2} stroke="#FF6B35" />
            <line x1={20 + median / max * 260} y1="40" x2={20 + median / max * 260} y2="80" stroke="#FF6B35" />
            <line x1={20 + maxVal2 / max * 260} y1="40" x2={20 + maxVal2 / max * 260} y2="80" stroke="#94A3B8" />
          </svg>);

      case "funnel":
        const totals = {
          impressions: (data as any).reduce((s: number, d: any) => s + d.impressions, 0),
          taps: (data as any).reduce((s: number, d: any) => s + d.taps, 0),
          conversions: (data as any).reduce((s: number, d: any) => s + d.conversions, 0)
        };
        const funnelData = [
        { name: "Impressions", value: totals.impressions },
        { name: "Taps", value: totals.taps },
        { name: "Conversions", value: totals.conversions }];

        return (
          <BarChart data={funnelData} layout="vertical" margin={{ left: 20, right: 16, top: 8, bottom: 8 }}>
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#FF6B35" radius={[0, 20, 20, 0]} />
          </BarChart>);

    }
  })();

  const content =
  <div ref={containerRef} className="h-auto" style={{ height: totalHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        {chartElement}
      </ResponsiveContainer>
      <div className="mt-2 text-xs text-[var(--color-text-secondary)]">{captionText}</div>
      {chart === "pie" && !compactLegend &&
    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {weekly.map((w, i) =>
      <div key={i} className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: colors[i % colors.length] }} />
              <span>{w.name}</span>
              <span className="ml-auto font-medium">{formatNumber(w.value)}</span>
            </div>
      )}
        </div>
    }
    </div>;


  if (embedded) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {!lockMetric &&
          <>
              <div className="text-xs text-[var(--color-text-secondary)]">Metric</div>
              <Select value={metric} onChange={(e) => setMetric(e.target.value)} className="w-36">
                {metrics.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
              </Select>
            </>
          }
          <div className="text-xs text-[var(--color-text-secondary)] ml-auto">Chart</div>
          <Select value={chart} onChange={(e) => setChart(e.target.value as ChartType)} className="w-36">
            {chartTypes.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </Select>
        </div>
        {content}
      </div>);

  }

  return (
    <Card className="p-3">
      <div className="flex items-center gap-3 mb-3">
        {!lockMetric &&
        <>
            <div className="text-sm text-[var(--color-text-secondary)]">Metric</div>
            <Select value={metric} onChange={(e) => setMetric(e.target.value)} className="w-40">
              {metrics.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
            </Select>
          </>
        }
        <div className="text-sm text-[var(--color-text-secondary)] ml-4">Chart</div>
        <Select value={chart} onChange={(e) => setChart(e.target.value as ChartType)} className="w-44">
          {chartTypes.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </Select>
      </div>
      {content}
    </Card>);

}
import { NextResponse } from "next/server";
import { generateDailyMetrics } from "@/data/mock-data";
import type { MetricSnapshot } from "@/lib/api/types";

export async function GET() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=90", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json: any = await res.json();
    const prices: [number, number][] = json?.prices ?? [];
    const vols: [number, number][] = json?.total_volumes ?? [];
    const series: MetricSnapshot[] = prices.map((p, i) => {
      const ts = p[0];
      const price = p[1];
      const vol = vols[i]?.[1] ?? price * 1000;
      const impressions = Math.max(1000, Math.floor(vol / 10000));
      const taps = Math.floor(impressions * (0.03 + Math.random() * 0.02));
      const conversions = Math.floor(taps * (0.06 + Math.random() * 0.04));
      const spend = +(price / 100 + Math.random() * 40).toFixed(2);
      const ctr = taps / Math.max(impressions, 1);
      const cpa = conversions ? +(spend / conversions).toFixed(2) : 0;
      const roas = +(Math.random() * 3).toFixed(2);
      return {
        date: new Date(ts).toISOString().slice(0, 10),
        spend, impressions, taps, conversions, ctr, cpa, roas
      } as MetricSnapshot;
    });
    return NextResponse.json(series);
  } catch (e) {
    const fallback = generateDailyMetrics(90);
    return NextResponse.json(fallback);
  }
}
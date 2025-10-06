import { NextResponse } from "next/server";
import { generateCampaignRows } from "@/data/mock-data";
import type { CampaignRow } from "@/lib/api/types";

export async function GET() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=60&select=title,brand,category,price,stock,rating", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json: any = await res.json();
    const matchTypes: CampaignRow["matchType"][] = ["exact", "phrase", "broad"];
    const statuses: CampaignRow["status"][] = ["active", "paused"];
    const rows: CampaignRow[] = (json?.products ?? []).map((p: any, i: number) => ({
      id: `cmp-${i + 1}`,
      campaignName: p.brand || p.title,
      adGroup: p.category,
      keyword: String(p.title).toLowerCase().split(" ")[0] || `keyword_${i + 1}`,
      matchType: matchTypes[i % matchTypes.length],
      impressions: Math.floor((p.stock ?? 50) * 120 + Math.random() * 8000),
      spend: +((p.price ?? 50) * (0.6 + Math.random() * 1.4)).toFixed(2),
      conversions: Math.floor((p.rating ?? 3) * 12 + Math.random() * 40),
      status: statuses[i % statuses.length]
    }));
    return NextResponse.json(rows);
  } catch (e) {
    const fallback = generateCampaignRows(60);
    return NextResponse.json(fallback);
  }
}
export const METRICS = [
{ key: "spend", label: "Total Spend" },
{ key: "impressions", label: "Impressions" },
{ key: "taps", label: "Taps" },
{ key: "conversions", label: "Conversions" },
{ key: "ctr", label: "CTR" },
{ key: "cpa", label: "CPA" }] as
const;

export type MetricKey = typeof METRICS[number]["key"];
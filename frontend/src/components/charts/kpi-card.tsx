import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";


export default function KPIcard({ label, value, deltaPct, spark, metricKey }: {label: string;value: string;deltaPct?: number;spark?: {date: string;value: number;}[];metricKey?: string;}) {
  const variant = typeof deltaPct === "number" ? deltaPct >= 0 ? "success" : "error" : "default";
  const sign = typeof deltaPct === "number" ? deltaPct >= 0 ? "+" : "" : "";
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-[var(--color-text-secondary)]">{label}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
        </div>
        {typeof deltaPct === "number" &&
        <Badge variant={variant as any}><span aria-label={`${label} ${sign}${Math.abs(deltaPct).toFixed(0)} percent`}>{`${sign}${Math.abs(deltaPct).toFixed(0)}%`}</span></Badge>
        }
      </div>
    </Card>);

}
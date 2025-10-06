import Card from "@/components/ui/card";

export default function DashboardHeader() {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">Performance Overview</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">Apple Search Ads metrics, trends, and campaign insights</p>
      </div>
      <div className="text-sm text-[var(--color-text-secondary)]">Last 90 days</div>
    </Card>);

}
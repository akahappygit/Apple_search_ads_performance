import DashboardHeader from "@/features/dashboard/components/dashboard-header";
import KPIboard from "@/features/kpis/kpi-board";
import TableSection from "@/features/dashboard/components/table-section";
import Card from "@/components/ui/card";
import ErrorBoundary from "@/components/util/error-boundary";
import ChartSectionClient from "@/features/dashboard/components/chart-section.client";
import FilterBar from "@/features/filters/components/filter-bar";
import ChartSwitcher from "@/components/charts/chart-switcher";

export default function Home() {
  return (
    <div className="container py-6 space-y-6">
      <DashboardHeader />
      <FilterBar />
      <ErrorBoundary fallback={<Card className="p-4">Failed to load KPIs.</Card>}>
        <KPIboard />
      </ErrorBoundary>
      <ErrorBoundary fallback={<Card className="p-4">Failed to load chart.</Card>}>
        <ChartSectionClient />
      </ErrorBoundary>
      <ErrorBoundary fallback={<Card className="p-4">Failed to load chart options.</Card>}>
        <ChartSwitcher defaultChart="line" />
      </ErrorBoundary>
      <ErrorBoundary fallback={<Card className="p-4">Failed to load table.</Card>}>
        <TableSection />
      </ErrorBoundary>
    </div>);

}
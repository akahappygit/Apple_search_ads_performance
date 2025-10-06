"use client";
import Card from "@/components/ui/card";
import Skeleton from "@/components/ui/skeleton";
import { useCampaignRows } from "../hooks/useDashboardData";
import RowExpandChart from "@/components/table/row-expand-chart";
import React, { useState } from "react";

export default function TableSection() {
  const { data, isLoading } = useCampaignRows();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Card>
      <div className="mb-3 text-sm text-[var(--color-text-secondary)]">Top Campaigns</div>
      {isLoading || !data ?
      <div className="space-y-2">
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
        </div> :

      <div className="overflow-x-auto">
          <table className="min-w-full text-sm" aria-label="Top campaigns table">
            <thead>
              <tr className="text-left border-b border-[var(--color-border)]">
                <th className="py-2" scope="col">Campaign</th>
                <th className="py-2" scope="col">Ad Group</th>
                <th className="py-2" scope="col">Keyword</th>
                <th className="py-2" scope="col">Match</th>
                <th className="py-2" scope="col">Impressions</th>
                <th className="py-2" scope="col">Spend</th>
                <th className="py-2" scope="col">Conversions</th>
                <th className="py-2" scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 12).map((row) =>
            <React.Fragment key={row.id}>
                  <tr className="border-b border-[var(--color-border)] cursor-pointer" onClick={() => setExpanded(expanded === row.id ? null : row.id)}>
                    <td className="py-2">{row.campaignName}</td>
                    <td className="py-2">{row.adGroup}</td>
                    <td className="py-2">{row.keyword}</td>
                    <td className="py-2 capitalize">{row.matchType}</td>
                    <td className="py-2">{row.impressions.toLocaleString()}</td>
                    <td className="py-2">${row.spend.toLocaleString()}</td>
                    <td className="py-2">{row.conversions}</td>
                    <td className="py-2 capitalize">{row.status}</td>
                  </tr>
                  {expanded === row.id &&
              <tr aria-hidden>
                      <td colSpan={8} className="py-2">
                        <RowExpandChart data={[{ date: "D1", value: row.impressions * 0.9 }, { date: "D2", value: row.impressions }, { date: "D3", value: row.impressions * 1.1 }]} />
                      </td>
                    </tr>
              }
                </React.Fragment>
            )}
            </tbody>
          </table>
        </div>
      }
    </Card>);

}
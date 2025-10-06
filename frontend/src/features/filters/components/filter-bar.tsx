"use client";
import Card from "@/components/ui/card";
import Select from "@/components/ui/select";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/root-reducer";
import { setCampaignStatus, setSearchTerm, setAccountIds } from "../store/filters.slice";
import { accounts } from "@/data/mock-data";

export default function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector((s: RootState) => s.filters);

  const selectedAccount = filters.accountIds[0] ?? accounts[0].id;
  return (
    <Card className="flex flex-wrap items-end gap-3" aria-label="Filter bar">
      <div className="w-48">
        <label htmlFor="account-select" className="block text-xs text-[var(--color-text-secondary)] mb-1">Account</label>
        <Select id="account-select" value={selectedAccount} onChange={(e) => dispatch(setAccountIds([e.target.value]))}>
          {accounts.map((a) =>
          <option key={a.id} value={a.id}>{a.name}</option>
          )}
        </Select>
      </div>
      <div className="w-48">
        <label htmlFor="status-select" className="block text-xs text-[var(--color-text-secondary)] mb-1">Status</label>
        <Select id="status-select" value={filters.campaignStatus} onChange={(e) => dispatch(setCampaignStatus(e.target.value as any))}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </Select>
      </div>
      <div className="grow min-w-[220px]">
        <label htmlFor="search-input" className="block text-xs text-[var(--color-text-secondary)] mb-1">Search</label>
        <Input id="search-input" placeholder="Search campaigns or keywords" value={filters.searchTerm} onChange={(e) => dispatch(setSearchTerm(e.target.value))} />
      </div>
      <Button className="ml-auto" aria-label="Apply filters">Apply</Button>
    </Card>);

}
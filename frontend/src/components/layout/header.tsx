"use client";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/root-reducer";
import { setSidebarCollapsed } from "@/lib/store/ui.slice";

export default function Header() {
  const collapsed = useSelector((s: RootState) => s.ui.sidebarCollapsed);
  const dispatch = useDispatch();
  return (
    <header className="sticky top-0 z-30 h-[64px] border-b border-[var(--color-border)] bg-[var(--color-background)] flex items-center">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-primary font-bold">Apple Search Ads</div>
          <Breadcrumbs items={["Dashboard", "Overview"]} />
        </div>
        <button
          aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
          aria-pressed={!collapsed}
          className="h-9 w-9 rounded-xl bg-[var(--color-card)] shadow flex flex-col items-center justify-center gap-[3px] hover:bg-white/80 transition-colors"
          onClick={() => dispatch(setSidebarCollapsed(!collapsed))}>

          <span className="block w-5 h-[2px] bg-[var(--color-text-secondary)]" />
          <span className="block w-5 h-[2px] bg-[var(--color-text-secondary)]" />
          <span className="block w-5 h-[2px] bg-[var(--color-text-secondary)]" />
        </button>
      </div>
    </header>);

}
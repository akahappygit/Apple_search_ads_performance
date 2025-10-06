"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/root-reducer";
import { setSidebarCollapsed } from "@/lib/store/ui.slice";
import { motion } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";

const navItems = [
{ label: "Overview" },
{ label: "Campaigns" },
{ label: "Keywords" },
{ label: "Reports" }];


export default function Sidebar() {
  const { sidebarCollapsed: collapsed } = useSelector((s: RootState) => s.ui);
  const dispatch = useDispatch();
  const { isMobile } = useResponsive();




  useEffect(() => {
    if (isMobile && !collapsed) {
      dispatch(setSidebarCollapsed(true));
    }
  }, [isMobile]);

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: collapsed ? 0 : 256 }}
      className={(collapsed ? "" : "border-r border-[var(--color-border)] ") + "bg-[var(--color-background)] overflow-hidden"}
      aria-label="Primary navigation"
      aria-expanded={!collapsed}
      aria-hidden={collapsed}>

      <div className="h-[64px] flex items-center px-4">
        {}
      </div>
      <motion.nav
        initial={{ width: 256 }}
        animate={{ width: collapsed ? 0 : 256 }}
        className="overflow-hidden">

        <ul className="p-2 space-y-1">
          {navItems.map((n) =>
          <li
            key={n.label}
            className="px-3 py-2 rounded hover:bg-[var(--hover-bg)] cursor-pointer">

              {n.label}
            </li>
          )}
        </ul>
      </motion.nav>
    </motion.aside>);

}
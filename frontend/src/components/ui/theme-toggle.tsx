"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/root-reducer";
import { setTheme } from "@/lib/store/ui.slice";

export default function ThemeToggle() {
  const theme = useSelector((s: RootState) => s.ui.theme);
  const dispatch = useDispatch();
  const dark = theme === "dark";
  return (
    <button
      className="rounded-md border px-2 py-1 text-sm"
      onClick={() => dispatch(setTheme(dark ? "light" : "dark"))}>

      {dark ? "Light" : "Dark"}
    </button>);

}
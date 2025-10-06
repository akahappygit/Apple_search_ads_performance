import { useEffect, useState } from "react";

export function useResponsive() {
  const [width, setWidth] = useState<number | undefined>(undefined);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = (width ?? 0) < 640;
  const isTablet = (width ?? 0) >= 640 && (width ?? 0) < 1024;
  const isDesktop = (width ?? 0) >= 1024;
  return { width, isMobile, isTablet, isDesktop };
}
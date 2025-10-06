import { useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  const timeout = useRef<number | undefined>(undefined);
  useEffect(() => {
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timeout.current);
  }, [value, delay]);
  return debounced;
}
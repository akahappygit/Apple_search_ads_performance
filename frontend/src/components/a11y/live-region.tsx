"use client";
import { useEffect, useRef, useState } from "react";

export default function LiveRegion({
  message,
  polite = true



}: {message: string;polite?: boolean;}) {
  const [text, setText] = useState("");
  const prev = useRef<string>("");
  useEffect(() => {
    if (message && message !== prev.current) {
      prev.current = message;
      setText(message);
    }
  }, [message]);
  return (
    <span aria-live={polite ? "polite" : "assertive"} aria-atomic="true" className="sr-only">
      {text}
    </span>);

}
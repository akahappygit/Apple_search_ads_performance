"use client";
import { HTMLAttributes } from "react";
import clsx from "clsx";

export default function VisuallyHidden({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={clsx(
        "sr-only",
        className
      )} />);


}
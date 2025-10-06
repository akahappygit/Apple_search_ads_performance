import { SelectHTMLAttributes } from "react";
import clsx from "clsx";

export default function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={clsx(
        "block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm",
        className
      )}>

      {children}
    </select>);

}
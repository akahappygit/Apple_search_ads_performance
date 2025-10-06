import clsx from "clsx";

export default function Badge({ children, variant = "default" }: {children: React.ReactNode;variant?: "default" | "success" | "warning" | "error";}) {
  const styles = {
    default: "bg-[var(--badge-default-bg)]",
    success: "bg-[var(--color-success)]/15 text-[var(--color-success)]",
    warning: "bg-[var(--color-warning)]/15 text-[var(--color-warning)]",
    error: "bg-[var(--color-error)]/15 text-[var(--color-error)]"
  }[variant];
  return <span className={clsx("inline-flex items-center rounded px-2 py-1 text-xs", styles)}>{children}</span>;
}
import { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-orange-50 text-orange-700 ring-orange-100 dark:bg-orange-500/20 dark:text-orange-100",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100",
  warning: "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-500/20 dark:text-amber-100",
  danger: "bg-rose-50 text-rose-700 ring-rose-100 dark:bg-rose-500/20 dark:text-rose-100",
  info: "bg-sky-50 text-sky-700 ring-sky-100 dark:bg-sky-500/20 dark:text-sky-100",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

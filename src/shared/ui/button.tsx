import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)] focus-visible:outline-[var(--accent)]",
  outline:
    "border border-[var(--border)] text-[var(--text-primary)] hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-[var(--accent)] dark:text-[var(--text-primary)] dark:hover:border-orange-500/50 dark:hover:bg-orange-500/10 dark:hover:text-orange-300",
  ghost:
    "text-[var(--text-primary)] hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-[var(--accent)] dark:hover:bg-orange-500/10 dark:hover:text-orange-300",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant = "primary", ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

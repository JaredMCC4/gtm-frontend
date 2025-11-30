"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className, ...props }, ref) {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={cn(
            "w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 pr-10 text-sm text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--glow)] disabled:bg-white/50 dark:disabled:bg-slate-800",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--text-muted)] transition-all duration-200 hover:bg-[var(--muted-soft)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          <div className="relative h-4 w-4">
            <Eye
              className={cn(
                "absolute inset-0 h-4 w-4 transition-all duration-200",
                showPassword ? "scale-0 opacity-0" : "scale-100 opacity-100"
              )}
            />
            <EyeOff
              className={cn(
                "absolute inset-0 h-4 w-4 transition-all duration-200",
                showPassword ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )}
            />
          </div>
        </button>
      </div>
    );
  }
);

import { ReactNode } from "react";
import { AppNav } from "@/shared/components/app-nav";
import { cn } from "@/lib/cn";
import { SiteFooter } from "@/shared/components/site-footer";

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn("min-h-screen bg-[var(--background)] text-[var(--foreground)]", className)}>
      <AppNav />
      <main className="mx-auto max-w-6xl px-6 py-8 space-y-6">{children}</main>
      <SiteFooter />
    </div>
  );
}

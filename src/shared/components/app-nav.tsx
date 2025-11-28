"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/providers/language-provider";

export function AppNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t("dashboard"), href: routes.protected.dashboard },
    { label: t("tasks"), href: routes.protected.tasks },
    { label: t("calendar"), href: routes.protected.calendar },
    { label: t("labels"), href: routes.protected.labels },
    { label: t("profile"), href: routes.protected.profile },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--card)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href={routes.protected.dashboard}
          className="text-lg font-semibold tracking-tight text-[var(--foreground)] transition hover:text-[var(--accent)]"
        >
          {t("brand")}
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium">
          {navItems.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 transition hover:-translate-y-0.5",
                  isActive
                    ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] text-white shadow-lg shadow-[var(--glow)]"
                    : "text-[var(--foreground)] hover:bg-[var(--muted-soft)] dark:hover:bg-slate-800",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

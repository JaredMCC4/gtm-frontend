"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "../components/theme-toggle";
import { LanguageSwitcher } from "../components/language-switcher";
import { useLanguage } from "@/providers/language-provider";
import { SiteFooter } from "../components/site-footer";
import { ScrollToTopButton } from "../components/scroll-to-top";

interface PublicPageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PublicPageLayout({
  children,
  className,
}: PublicPageLayoutProps) {
  const { t } = useLanguage();
  const navItems = [
    { label: t("home"), href: routes.public.home },
    { label: t("pricing"), href: "#precios" },
    { label: t("contact"), href: "#contacto" },
  ];
  return (
    <div className={cn("min-h-screen text-[var(--foreground)]", className)}>
      <header className="border-b border-[var(--border)] bg-[var(--card)] backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href={routes.public.home}
            className="group flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <span className="text-2xl font-black tracking-[0.25em] bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-[0.35em] group-hover:from-orange-400 group-hover:via-orange-500 group-hover:to-orange-400">
              GTM
            </span>
            <span className="text-[8px] font-medium tracking-[0.15em] text-[var(--text-muted)] transition-all duration-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">
              GESTOR DE TAREAS MODERNO
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium">
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-zinc-800 dark:hover:text-orange-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href={routes.public.login}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:bg-orange-100 hover:text-orange-700 hover:border-orange-300 dark:hover:bg-zinc-800 dark:hover:text-orange-400"
            >
              {t("login")}
            </Link>
            <Link
              href={routes.public.register}
              className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--glow)] transition hover:-translate-y-0.5"
            >
              {t("register")}
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      <SiteFooter />
      <ScrollToTopButton />
    </div>
  );
}

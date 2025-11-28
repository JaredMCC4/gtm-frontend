"use client";

import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/providers/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-10 border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            {t("footerTitle")}
          </p>
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            {t("footerDesc")}
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Organiza tus tareas, recordatorios, etiquetas y archivos en un solo lugar para trabajar con claridad.
          </p>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)]" />
        </div>

        <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--muted-soft)] p-5 shadow-lg shadow-[var(--glow)] transition hover:-translate-y-1">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {t("contact")}
          </p>
          <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
            <Mail className="h-4 w-4 text-[var(--accent)]" />
            <a href="mailto:jaredjosue888@gmail.com" className="hover:underline">
              jaredjosue888@gmail.com
            </a>
          </div>
          <Link
            href="https://github.com/JaredMCC4"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] transition hover:-translate-y-0.5 hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-zinc-800 dark:hover:text-orange-400"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <p className="text-xs text-[var(--text-muted)]">
            Hecho con foco en seguridad, accesibilidad y rendimiento para equipos modernos.
          </p>
        </div>
      </div>
    </footer>
  );
}

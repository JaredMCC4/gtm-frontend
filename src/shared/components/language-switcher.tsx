"use client";

import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/cn";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
    >
      <span className="text-[var(--text-secondary)]">{t("language")}</span>
      <div className="flex overflow-hidden rounded-full border border-[var(--border)] bg-[var(--muted-soft)] text-xs">
        <button
          type="button"
          onClick={() => setLang("es")}
          className={cn(
            "flex items-center gap-1 px-3 py-1 transition",
            lang === "es"
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--text-secondary)] hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-zinc-700 dark:hover:text-orange-300",
          )}
        >
          <Image
            src="/images/sp.png"
            alt="Español"
            width={16}
            height={16}
            className="rounded-full"
          />
          ES
        </button>
        <button
          type="button"
          onClick={() => setLang("en")}
          className={cn(
            "flex items-center gap-1 px-3 py-1 transition",
            lang === "en"
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--text-secondary)] hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-zinc-700 dark:hover:text-orange-300",
          )}
        >
          <Image
            src="/images/en.png"
            alt="English"
            width={16}
            height={16}
            className="rounded-full"
          />
          EN
        </button>
      </div>
    </div>
  );
}

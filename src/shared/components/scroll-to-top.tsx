"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface ScrollToTopButtonProps {
  className?: string;
}

export function ScrollToTopButton({ className }: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 240);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Volver al inicio"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--text-primary)] shadow-lg shadow-[var(--glow)] transition hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 dark:hover:border-orange-500/50 dark:hover:bg-orange-500/10 dark:hover:text-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
        className,
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

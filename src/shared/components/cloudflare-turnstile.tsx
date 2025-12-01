"use client";

import { useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/providers/language-provider";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          language?: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

interface CloudflareTurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "light" | "dark" | "auto";
}

export function CloudflareTurnstile({
  siteKey,
  onVerify,
  onExpire,
  onError,
  theme = "auto",
}: CloudflareTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const { lang } = useLanguage();

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      "expired-callback": onExpire,
      "error-callback": onError,
      theme,
      language: lang,
    });
  }, [siteKey, onVerify, onExpire, onError, theme, lang]);

  useEffect(() => {
    // Si Turnstile ya está cargado, renderizar inmediatamente
    if (window.turnstile) {
      renderWidget();
      return;
    }

    // Configurar callback para cuando se cargue el script
    window.onTurnstileLoad = renderWidget;

    // Cargar el script si no existe
    const existingScript = document.querySelector(
      'script[src*="turnstile"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center"
      data-testid="turnstile-container"
    />
  );
}

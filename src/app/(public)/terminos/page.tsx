"use client";

import Link from "next/link";
import { useLanguage } from "@/providers/language-provider";
import { routes } from "@/config/routes";
import { Card } from "@/shared/ui/card";

export default function TermsOfServicePage() {
  const { t, lang } = useLanguage();
  const lastUpdated = lang === "es" ? "1 de diciembre de 2025" : "December 1, 2025";

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden border-[var(--border)] bg-[var(--card)] shadow-xl shadow-[var(--glow)]">
          <div className="bg-gradient-to-r from-[var(--accent)]/5 to-transparent px-8 py-10 sm:px-12 sm:py-12 border-b border-[var(--border)]">
            <Link
              href={routes.public.home}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
            >
              ← {t("tosBackToHome")}
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {t("tosTitle")}
            </h1>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              {t("tosLastUpdated")}: {lastUpdated}
            </p>
          </div>

          <div className="px-8 py-10 sm:px-12 sm:py-12">
            <div className="space-y-12 text-[var(--text-secondary)]">
              {/* Introducción */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">
                  {t("tosIntroTitle")}
                </h2>
                <p className="leading-relaxed text-base">{t("tosIntroText")}</p>
              </section>

              {/* Aceptación */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">
                  {t("tosAcceptanceTitle")}
                </h2>
                <p className="leading-relaxed text-base">{t("tosAcceptanceText")}</p>
              </section>

              {/* Uso del servicio */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">
                  {t("tosServiceUseTitle")}
                </h2>
                <p className="mb-4 leading-relaxed text-base">{t("tosServiceUseText")}</p>
                <ul className="list-inside list-disc space-y-2 pl-4 text-base marker:text-[var(--accent)]">
                  <li>{t("tosServiceUseItem1")}</li>
                  <li>{t("tosServiceUseItem2")}</li>
                  <li>{t("tosServiceUseItem3")}</li>
                  <li>{t("tosServiceUseItem4")}</li>
                </ul>
              </section>

              {/* Cuenta de usuario */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">
                  {t("tosAccountTitle")}
                </h2>
                <p className="leading-relaxed text-base">{t("tosAccountText")}</p>
              </section>

              {/* Privacidad */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">
                  {t("tosPrivacyTitle")}
                </h2>
                <p className="leading-relaxed text-base">{t("tosPrivacyText")}</p>
              </section>

              {/* Propiedad intelectual */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">
                  {t("tosIntellectualTitle")}
                </h2>
                <p className="leading-relaxed text-base">{t("tosIntellectualText")}</p>
              </section>

              {/* Limitación de responsabilidad */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">
                  {t("tosLiabilityTitle")}
                </h2>
                <p className="leading-relaxed text-base">{t("tosLiabilityText")}</p>
              </section>

              {/* Modificaciones */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-[var(--text-primary)]">
                  {t("tosModificationsTitle")}
                </h2>
                <p className="leading-relaxed text-base">{t("tosModificationsText")}</p>
              </section>

              {/* Contacto */}
              <section className="rounded-lg bg-[var(--muted-soft)] p-6 border border-[var(--border)]">
                <h2 className="mb-3 text-lg font-bold text-[var(--text-primary)]">
                  {t("tosContactTitle")}
                </h2>
                <p className="leading-relaxed text-base">
                  {t("tosContactText")}{" "}
                  <a
                    href="mailto:jaredjosue888@gmail.com"
                    className="font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)] hover:underline"
                  >
                    jaredjosue888@gmail.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Github,
  GraduationCap,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  Zap,
} from "lucide-react";
import { routes } from "@/config/routes";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { useLanguage } from "@/providers/language-provider";

export default function HomePage() {
  const { t, lang } = useLanguage();

  const capabilityCards = [
    {
      title: t("feature1Title"),
      description: t("feature1Desc"),
      icon: <ListChecks className="h-5 w-5" />,
    },
    {
      title: t("feature2Title"),
      description: t("feature2Desc"),
      icon: <Bell className="h-5 w-5" />,
    },
    {
      title: t("feature3Title"),
      description: t("feature3Desc"),
      icon: <CalendarClock className="h-5 w-5" />,
    },
    {
      title: t("feature4Title"),
      description: t("feature4Desc"),
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: t("feature5Title"),
      description: t("feature5Desc"),
      icon: <Upload className="h-5 w-5" />,
    },
    {
      title: t("feature6Title"),
      description: t("feature6Desc"),
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];

  const reasonsToChoose = [
    {
      title: t("reason1Title"),
      subtitle: t("reason1Subtitle"),
      points: [t("reason1Point1"), t("reason1Point2"), t("reason1Point3")],
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: t("reason2Title"),
      subtitle: t("reason2Subtitle"),
      points: [t("reason2Point1"), t("reason2Point2"), t("reason2Point3")],
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: t("reason3Title"),
      subtitle: t("reason3Subtitle"),
      points: [t("reason3Point1"), t("reason3Point2"), t("reason3Point3")],
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];

  const weekDays = lang === "es" ? ["L", "M", "M", "J", "V"] : ["M", "T", "W", "T", "F"];

  return (
    <div className="space-y-20">
      <section
        id="inicio"
        className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 shadow-xl shadow-[var(--glow)] transition hover:-translate-y-1"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(234,88,12,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(234,88,12,0.05),transparent_30%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(251,146,60,0.06),transparent_30%)]" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-[var(--text-primary)] lg:text-5xl text-center">
              {t("heroTitle")}
            </h1>
            <p className="max-w-3xl text-lg text-[var(--text-secondary)] text-center mx-auto">
              {t("heroDescription")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href={routes.public.register}>
                <Button className="rounded-full px-8 py-3 text-base shadow-lg shadow-[var(--glow)]">
                  {t("heroCtaPrimary")}
                </Button>
              </Link>
              <Link href={routes.public.login}>
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-3 text-base transition hover:-translate-y-0.5"
                >
                  {t("heroCtaSecondary")}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: t("statQuickRegister"), value: "< 2 min", accent: "bg-orange-50 dark:bg-orange-500/15" },
                { label: t("statPrice"), value: t("statPriceValue"), accent: "bg-emerald-50 dark:bg-emerald-500/15" },
                { label: t("statFor"), value: t("statForValue"), accent: "bg-sky-50 dark:bg-sky-500/15" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-2xl border border-[var(--border)] ${item.accent} px-4 py-3 shadow-sm`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-orange-400/20 blur-3xl dark:bg-orange-500/10" />
            <Card className="relative overflow-hidden border-[var(--border)] bg-[var(--card)] p-0 shadow-2xl shadow-[var(--glow)]">
              <CardContent className="space-y-5 p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                      {t("heroCardTitle")}
                    </p>
                    <p className="text-lg font-bold text-[var(--text-primary)]">{t("heroCardDay")}</p>
                  </div>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/20 dark:text-orange-300">
                    {t("heroCardToday")}
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { title: t("heroTask1"), time: "11:00", tag: t("heroTask1Tag") },
                    { title: t("heroTask2"), time: "15:00", tag: t("heroTask2Tag") },
                    { title: t("heroTask3"), time: "18:00", tag: t("heroTask3Tag") },
                  ].map((task) => (
                    <div
                      key={task.title}
                      className="flex items-start justify-between rounded-xl border border-[var(--border)] bg-[var(--muted-soft)] px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{task.title}</p>
                        <p className="text-xs text-[var(--text-muted)]">{task.tag}</p>
                      </div>
                      <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">{task.time}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-zinc-700 bg-zinc-900 text-white shadow-inner dark:border-zinc-600 dark:bg-zinc-800">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-orange-300">{t("heroWeekLabel")}</p>
                      <p className="text-sm font-semibold text-white">{t("heroWeekTitle")}</p>
                    </div>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                      {t("heroPending")}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 border-t border-white/10 px-4 py-3 text-center text-xs uppercase tracking-wide">
                    {weekDays.map((day, idx) => (
                      <span
                        key={day + idx}
                        className={`rounded-full px-2 py-1 ${idx === 2 ? "bg-white/20 text-white" : "text-zinc-300"}`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            {t("featuresLabel")}
          </p>
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {t("featuresTitle")}
          </h2>
          <p className="max-w-3xl text-base text-[var(--text-secondary)]">
            {t("featuresDescription")}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilityCards.map((feature) => (
            <Card
              key={feature.title}
              className="h-full border-[var(--border)] bg-[var(--card)] shadow-lg shadow-[var(--glow)] transition hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="space-y-3 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="porque" className="space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            {t("whyLabel")}
          </p>
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {t("whyTitle")}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-[var(--text-secondary)]">
            {t("whyDescription")}
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {reasonsToChoose.map((reason) => (
            <Card
              key={reason.title}
              className="relative overflow-hidden border-[var(--border)] bg-[var(--card)] shadow-md shadow-[var(--glow)]"
            >
              <CardContent className="flex h-full flex-col space-y-3 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                    {reason.icon}
                  </span>
                  <div>
                    <p className="text-base font-bold text-[var(--text-primary)]">{reason.title}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{reason.subtitle}</p>
                  </div>
                </div>
                <ul className="flex-1 space-y-2 pt-2 text-sm text-[var(--text-secondary)]">
                  {reason.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="precios" className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{t("pricingLabel")}</p>
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {t("pricingTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[var(--text-secondary)]">
            {t("pricingDescription")}
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-2">
          <Card className="relative overflow-hidden border-[var(--border)] bg-[var(--card)] shadow-lg shadow-[var(--glow)]">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">{t("planStudentName")}</p>
                <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">
                  {t("planStudentBadge")}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)]">{t("planStudentPrice")}</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("planStudentDesc")}
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {t("planStudentFeature1")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {t("planStudentFeature2")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {t("planStudentFeature3")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {t("planStudentFeature4")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {t("planStudentFeature5")}
                </li>
              </ul>
              <Link href={routes.public.register}>
                <Button className="w-full rounded-full">{t("planStudentCta")}</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-orange-500 bg-[var(--card)] shadow-xl shadow-[var(--glow)]">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">{t("planContributorName")}</p>
                <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                  {t("planContributorBadge")}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{t("planContributorPrice")}</h3>
                <span className="text-sm text-[var(--text-muted)]">{t("planContributorPriceSuffix")}</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                {t("planContributorDesc")}
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {t("planContributorFeature1")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {t("planContributorFeature2")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {t("planContributorFeature3")}
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">{t("planContributorFeature4Coming")}</span> {t("planContributorFeature4")}
                </li>
              </ul>
              <Link href={routes.public.register}>
                <Button className="w-full rounded-full bg-[var(--accent)] text-white shadow-lg shadow-[var(--glow)]">
                  {t("planContributorCta")}
                </Button>
              </Link>
              <p className="pt-3 text-center text-xs text-[var(--text-muted)]">
                {t("planContributorNote")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        id="contacto"
        className="rounded-3xl border border-[var(--border)] bg-[var(--card)] px-8 py-10 shadow-lg shadow-[var(--glow)] transition hover:-translate-y-1"
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              {t("contactLabel")}
            </p>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">{t("contactTitle")}</h3>
            <p className="text-base text-[var(--text-secondary)]">
              {t("contactDescription")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="mailto:jaredjosue888@gmail.com">
                <Button className="rounded-full px-5 py-3 text-base">{t("contactCtaEmail")}</Button>
              </Link>
              <Link href="https://github.com/JaredMCC4" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full px-5 py-3 text-base">
                  <Github className="h-4 w-4" />
                  {t("contactCtaGithub")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--muted-soft)] p-6 text-sm text-[var(--text-secondary)] shadow-sm">
            <p className="font-semibold text-[var(--text-primary)]">{t("contactInfoTitle")}</p>
            <p>{t("contactInfoEmail")}</p>
            <p>{t("contactInfoGithub")}</p>
            <p>{t("contactInfoResponse")}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] px-8 py-10 text-center shadow-lg shadow-[var(--glow)] transition hover:-translate-y-1">
        <GraduationCap className="mx-auto h-12 w-12 text-orange-500" />
        <h3 className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
          {t("ctaTitle")}
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-base text-[var(--text-secondary)] text-center">
          {t("ctaDescription")}
        </p>
        <div className="mt-5">
          <Link href={routes.public.register}>
            <Button className="rounded-full px-8 py-3 text-base shadow-lg shadow-[var(--glow)]">
              {t("ctaButton")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

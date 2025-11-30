import Link from "next/link";
import { ReactNode } from "react";
import { routes } from "@/config/routes";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";

interface AuthCardProps {
  title: string;
  description?: string;
  alternateCta?: {
    label: string;
    href: string;
  };
  children: ReactNode;
  appName: string;
  securityNote: string;
  homeLabel: string;
}

export function AuthCard({
  title,
  description,
  alternateCta,
  children,
  appName,
  securityNote,
  homeLabel,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md shadow-lg sm:max-w-lg">
      <CardHeader className="pb-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            {appName}
          </p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h1>
          {description ? (
            <p className="text-sm text-[var(--text-secondary)]">{description}</p>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-6 sm:px-8">{children}</CardContent>
      <CardFooter className="flex-col gap-2 text-center text-sm sm:flex-row sm:justify-between sm:text-left">
        <span className="text-[var(--text-muted)]">{securityNote}</span>
        {alternateCta ? (
          <Link
            href={alternateCta.href}
            className="font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)] hover:underline"
          >
            {alternateCta.label}
          </Link>
        ) : (
          <Link
            href={routes.public.home}
            className="font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)] hover:underline"
          >
            {homeLabel}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

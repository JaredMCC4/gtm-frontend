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
}

export function AuthCard({
  title,
  description,
  alternateCta,
  children,
}: AuthCardProps) {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Gestor de Tareas Moderno
          </p>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          {description ? (
            <p className="text-sm text-slate-600">{description}</p>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      <CardFooter className="justify-between text-sm text-slate-600">
        <span>Protege tus credenciales. Nunca compartas tu token.</span>
        {alternateCta ? (
          <Link
            href={alternateCta.href}
            className="font-medium text-slate-900 hover:underline"
          >
            {alternateCta.label}
          </Link>
        ) : (
          <Link
            href={routes.public.home}
            className="font-medium text-slate-900 hover:underline"
          >
            Inicio
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

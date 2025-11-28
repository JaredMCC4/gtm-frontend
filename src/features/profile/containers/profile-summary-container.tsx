"use client";

import { useMemo } from "react";
import { useAuth } from "@/providers/auth-provider";
import { ProfileSummary } from "../components/profile-summary";
import type { UserProfile } from "@/types/user";

export function ProfileSummaryContainer() {
  const { session } = useAuth();

  const profile = useMemo<UserProfile>(
    () => ({
      id: session.user?.id ?? "usuario-demo",
      displayName: session.user?.displayName ?? "Usuario GTM",
      email: session.user?.email ?? "demo@gtm.local",
      timezone: session.user?.timezone ?? "America/Costa_Rica",
      roles: session.user?.roles ?? ["USER"],
    }),
    [session],
  );

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Perfil
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Preferencias de usuario
        </h2>
        <p className="text-sm text-slate-600">
          Sincroniza esta vista con el endpoint /api/v1/usuarios para permitir
          edición segura.
        </p>
      </div>
      <ProfileSummary profile={profile} />
    </section>
  );
}

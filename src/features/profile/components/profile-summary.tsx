import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { UserProfile } from "@/types/user";

interface ProfileSummaryProps {
  profile: UserProfile;
}

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Perfil
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            Datos del usuario
          </h3>
          <p className="text-sm text-slate-600">
            Edita nombre visible, zona horaria y notificaciones según RF-11.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-slate-700">
        <div className="grid gap-1">
          <span className="text-xs uppercase tracking-wide text-slate-500">
            Nombre visible
          </span>
          <span className="font-medium text-slate-900">
            {profile.displayName}
          </span>
        </div>
        <div className="grid gap-1">
          <span className="text-xs uppercase tracking-wide text-slate-500">
            Correo
          </span>
          <span className="font-medium text-slate-900">{profile.email}</span>
        </div>
        <div className="grid gap-1">
          <span className="text-xs uppercase tracking-wide text-slate-500">
            Zona horaria
          </span>
          <span className="font-medium text-slate-900">
            {profile.timezone ?? "Sin configurar"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

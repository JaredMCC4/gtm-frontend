import { Card, CardContent, CardHeader } from "@/shared/ui/card";

interface HealthStatusProps {
  status: "UP" | "DOWN" | "DEGRADED";
  details?: Record<string, string | number | boolean>;
}

export function HealthStatus({ status, details }: HealthStatusProps) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Observabilidad
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            Health / Metrics
          </h3>
          <p className="text-sm text-slate-600">
            Consumiremos /actuator/health protegido para admins (HU-15).
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{
              backgroundColor:
                status === "UP"
                  ? "#22C55E"
                  : status === "DEGRADED"
                    ? "#F59E0B"
                    : "#EF4444",
            }}
          />
          <span className="font-medium">{status}</span>
        </div>
        {details ? (
          <div className="space-y-1">
            {Object.entries(details).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-slate-600">{key}</span>
                <span className="font-medium text-slate-900">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">
            Sin detalles adicionales. Integraremos métricas y latencia aquí.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

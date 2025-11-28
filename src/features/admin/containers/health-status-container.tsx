"use client";

import { useState } from "react";
import { HealthStatus } from "../components/health-status";

export function HealthStatusContainer() {
  const [status] = useState<"UP" | "DOWN" | "DEGRADED">("UP");

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Administración
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Estado del backend
        </h2>
        <p className="text-sm text-slate-600">
          Esta vista consultará /actuator/health (público) y métricas
          protegidas para asegurar disponibilidad.
        </p>
      </div>
      <HealthStatus
        status={status}
        details={{
          version: "1.0.0",
          latencyMs: 120,
        }}
      />
    </section>
  );
}

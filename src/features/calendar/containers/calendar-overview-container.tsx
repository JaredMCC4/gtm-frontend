"use client";

import { useMemo } from "react";
import { CalendarPreview } from "../components/calendar-preview";
import type { Task } from "@/types/task";

export function CalendarOverviewContainer() {
  const tasks = useMemo<Task[]>(
    () => [
      {
        id: "t1",
        title: "Entrega sprint",
        priority: "ALTA",
        status: "EN_PROGRESO",
        dueDate: "2025-11-14",
      },
      {
        id: "t2",
        title: "Revisión de adjuntos",
        priority: "MEDIA",
        status: "PENDIENTE",
        dueDate: "2025-11-18",
      },
    ],
    [],
  );

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Calendario
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Vista de vencimientos
        </h2>
        <p className="text-sm text-slate-600">
          Integraremos aquí la vista mensual/semanal/día para HU-09 y HU-10.
        </p>
      </div>
      <CalendarPreview tasks={tasks} />
    </section>
  );
}

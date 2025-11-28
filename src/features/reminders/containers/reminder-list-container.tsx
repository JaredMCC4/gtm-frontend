"use client";

import { useMemo } from "react";
import { ReminderList } from "../components/reminder-list";
import type { Reminder } from "@/types/reminder";

export function ReminderListContainer() {
  const reminders = useMemo<Reminder[]>(
    () => [
      {
        id: "r1",
        taskId: "tarea-1",
        remindAt: "2025-11-09T09:00:00Z",
        channel: "EMAIL",
      },
      {
        id: "r2",
        taskId: "tarea-2",
        remindAt: "2025-11-10T13:00:00Z",
        channel: "IN_APP",
      },
    ],
    [],
  );

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Recordatorios
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Alertas programadas
        </h2>
        <p className="text-sm text-slate-600">
          Conectaremos estos datos al endpoint de recordatorios para notificar
          vencimientos y checklist pendientes.
        </p>
      </div>
      <ReminderList reminders={reminders} />
    </section>
  );
}

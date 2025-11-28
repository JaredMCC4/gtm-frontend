"use client";

import { useMemo } from "react";
import { TaskDetail } from "../components/task-detail";
import type { Task } from "@/types/task";

interface TaskDetailContainerProps {
  taskId: string;
}

export function TaskDetailContainer({ taskId }: TaskDetailContainerProps) {
  const mockTask = useMemo<Task>(
    () => ({
      id: taskId,
      title: "Tarea de ejemplo",
      description: "Detalle de la tarea. Incluye adjuntos y subtareas.",
      priority: "ALTA",
      status: "EN_PROGRESO",
      dueDate: "2025-11-12",
      labels: [{ id: "l1", name: "Backend", color: "#0EA5E9" }],
      subtasks: [
        { id: "s1", taskId, title: "Revisar criterios de aceptación", completed: true },
        { id: "s2", taskId, title: "Cargar adjuntos y checklist", completed: false },
      ],
      reminders: [
        { id: "r1", taskId, remindAt: "2025-11-10T09:00:00Z", channel: "IN_APP" },
        { id: "r2", taskId, remindAt: "2025-11-11T09:00:00Z", channel: "EMAIL" },
      ],
      attachments: [
        {
          id: "a1",
          taskId,
          fileName: "brief.pdf",
          sizeBytes: 2_000_000,
          contentType: "application/pdf",
        },
      ],
    }),
    [taskId],
  );

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Detalle de tarea
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Estado completo y checklist
        </h2>
        <p className="text-sm text-slate-600">
          Aquí conectaremos subtareas, etiquetas, recordatorios y adjuntos
          provenientes de la API para cumplir HU-04 a HU-12.
        </p>
      </div>
      <TaskDetail task={mockTask} />
    </section>
  );
}

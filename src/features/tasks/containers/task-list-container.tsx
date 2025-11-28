"use client";

import { useMemo } from "react";
import { TaskList } from "../components/task-list";
import type { Task } from "@/types/task";

export function TaskListContainer() {
  const mockTasks = useMemo<Task[]>(
    () => [
      {
        id: "tarea-1",
        title: "Redactar propuesta",
        description: "Agregar alcance, entregables y cronograma",
        priority: "ALTA",
        status: "EN_PROGRESO",
        dueDate: "2025-11-10",
        labels: [
          { id: "l1", name: "Trabajo", color: "#2563EB" },
          { id: "l2", name: "Prioritario", color: "#E11D48" },
        ],
        reminders: [{ id: "r1", taskId: "tarea-1", remindAt: "2025-11-09", channel: "IN_APP" }],
      },
      {
        id: "tarea-2",
        title: "Configurar recordatorios",
        priority: "MEDIA",
        status: "PENDIENTE",
        dueDate: "2025-11-15",
        labels: [{ id: "l3", name: "Personal", color: "#10B981" }],
      },
    ],
    [],
  );

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Lista de tareas
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Tus tareas y pendientes
        </h2>
        <p className="text-sm text-slate-600">
          Esta sección se conectará al endpoint /api/v1/tareas con filtros,
          paginación y búsqueda. Por ahora muestra datos de ejemplo.
        </p>
      </div>
      <TaskList tasks={mockTasks} />
    </section>
  );
}

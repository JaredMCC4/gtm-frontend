import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Task } from "@/types/task";

interface CalendarPreviewProps {
  tasks: Task[];
}

export function CalendarPreview({ tasks }: CalendarPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Calendario
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            Vencimientos próximos
          </h3>
          <p className="text-sm text-slate-600">
            Esta vista consumirá /api/v1/tareas con rango de fechas para mostrar
            mes/semana/día.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-slate-700">
        {tasks.length ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2"
            >
              <div>
                <p className="font-medium text-slate-900">{task.title}</p>
                <p className="text-xs text-slate-600">
                  {task.dueDate ?? "Sin fecha"}
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {task.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-600">
            No hay tareas con fecha asignada.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

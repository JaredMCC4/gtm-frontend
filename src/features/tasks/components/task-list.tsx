import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
}

function statusVariant(status: Task["status"]) {
  switch (status) {
    case "COMPLETADA":
      return "success" as const;
    case "EN_PROGRESO":
      return "info" as const;
    case "CANCELADA":
      return "danger" as const;
    default:
      return "neutral" as const;
  }
}

function priorityLabel(priority: Task["priority"]) {
  switch (priority) {
    case "CRITICA":
      return "Crítica";
    case "ALTA":
      return "Alta";
    case "MEDIA":
      return "Media";
    case "BAJA":
      return "Baja";
  }
}

export function TaskList({ tasks }: TaskListProps) {
  if (!tasks.length) {
    return (
      <Card>
        <CardContent className="py-6 text-sm text-slate-600">
          No hay tareas. Cuando crees una, la verás aquí con su estado,
          etiquetas y fecha límite.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {priorityLabel(task.priority)}
              </p>
              <h3 className="text-lg font-semibold text-slate-900">
                {task.title}
              </h3>
              {task.description ? (
                <p className="text-sm text-slate-600">{task.description}</p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusVariant(task.status)}>
                {task.status.replace("_", " ")}
              </Badge>
              {task.dueDate ? (
                <Badge variant="info">Vence: {task.dueDate}</Badge>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            {task.labels?.length ? (
              task.labels.map((label) => (
                <span
                  key={label.id}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: `${label.color}1A` }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: label.color }}
                  />
                  {label.name}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">Sin etiquetas</span>
            )}
            {task.reminders?.length ? (
              <Badge variant="warning">
                {task.reminders.length} recordatorio(s)
              </Badge>
            ) : null}
            {task.attachments?.length ? (
              <Badge variant="neutral">
                {task.attachments.length} adjunto(s)
              </Badge>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

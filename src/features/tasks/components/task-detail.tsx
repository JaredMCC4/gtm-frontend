import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Task } from "@/types/task";

interface TaskDetailProps {
  task: Task;
}

export function TaskDetail({ task }: TaskDetailProps) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold text-slate-900">
            {task.title}
          </h1>
          <Badge variant="info">{task.priority}</Badge>
          <Badge>{task.status}</Badge>
          {task.dueDate ? (
            <Badge variant="warning">Vence {task.dueDate}</Badge>
          ) : null}
        </div>
        {task.description ? (
          <p className="text-sm text-slate-700">{task.description}</p>
        ) : (
          <p className="text-sm text-slate-500">Sin descripción</p>
        )}
        <div className="flex flex-wrap gap-2 text-xs">
          {task.labels?.map((label) => (
            <span
              key={label.id}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 font-medium"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: label.color }}
              />
              {label.name}
            </span>
          )) ?? <span className="text-slate-500">Sin etiquetas</span>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-800">Subtareas</h2>
          <ul className="space-y-2">
            {task.subtasks?.length ? (
              task.subtasks.map((subtask) => (
                <li
                  key={subtask.id}
                  className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2"
                >
                  <span
                    className="h-3 w-3 rounded-full border border-slate-400"
                    aria-hidden
                    style={{
                      backgroundColor: subtask.completed ? "#10B981" : "transparent",
                    }}
                  />
                  <span
                    className={
                      subtask.completed ? "text-slate-500 line-through" : "text-slate-800"
                    }
                  >
                    {subtask.title}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500">Aún no hay subtareas.</li>
            )}
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-800">Recordatorios</h2>
          <ul className="space-y-2">
            {task.reminders?.length ? (
              task.reminders.map((reminder) => (
                <li
                  key={reminder.id}
                  className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm"
                >
                  <span>{reminder.remindAt}</span>
                  <Badge variant={reminder.channel === "EMAIL" ? "info" : "neutral"}>
                    {reminder.channel === "EMAIL" ? "Correo" : "In-app"}
                  </Badge>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500">Sin recordatorios aún.</li>
            )}
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-800">Adjuntos</h2>
          <ul className="space-y-2">
            {task.attachments?.length ? (
              task.attachments.map((file) => (
                <li
                  key={file.id}
                  className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm"
                >
                  <span className="font-medium text-slate-800">
                    {file.fileName}
                  </span>
                  {file.sizeBytes ? (
                    <span className="text-xs text-slate-500">
                      {(file.sizeBytes / 1024 / 1024).toFixed(1)} MB
                    </span>
                  ) : null}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500">Aún no hay archivos.</li>
            )}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}

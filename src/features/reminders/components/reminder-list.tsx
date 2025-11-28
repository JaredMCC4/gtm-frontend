import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Reminder } from "@/types/reminder";

interface ReminderListProps {
  reminders: Reminder[];
}

export function ReminderList({ reminders }: ReminderListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Recordatorios
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            Próximas alertas
          </h3>
          <p className="text-sm text-slate-600">
            Configura recordatorios para cumplir HU-12. Aquí mostraremos los que
            devuelve la API.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {reminders.length ? (
          reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm"
            >
              <div className="space-y-1">
                <p className="font-medium text-slate-800">
                  {reminder.remindAt}
                </p>
                <p className="text-xs text-slate-600">Tarea: {reminder.taskId}</p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {reminder.channel === "EMAIL" ? "Correo" : "In-app"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-600">
            Aún no hay recordatorios configurados.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

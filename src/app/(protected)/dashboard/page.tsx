import { AttachmentManagerContainer } from "@/features/attachments/containers/attachment-manager-container";
import { CalendarOverviewContainer } from "@/features/calendar/containers/calendar-overview-container";
import { ReminderListContainer } from "@/features/reminders/containers/reminder-list-container";
import { TaskListContainer } from "@/features/tasks/containers/task-list-container";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Panel
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Resumen operativo
        </h1>
        <p className="text-sm text-slate-600">
          Punto de entrada para tareas, recordatorios y adjuntos. Usa este
          dashboard para validar rápidamente la salud del sistema y el flujo de
          usuario autenticado.
        </p>
      </div>
      <TaskListContainer />
      <div className="grid gap-4 md:grid-cols-2">
        <CalendarOverviewContainer />
        <ReminderListContainer />
      </div>
      <AttachmentManagerContainer />
    </div>
  );
}

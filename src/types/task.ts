import { Attachment } from "./attachment";
import { Label } from "./label";
import { Reminder } from "./reminder";

export type TaskPriority = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";
export type TaskStatus = "PENDIENTE" | "EN_PROGRESO" | "COMPLETADA" | "CANCELADA";

export interface Subtask {
  id: string;
  taskId: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriority;
  status: TaskStatus;
  labels?: Label[];
  subtasks?: Subtask[];
  reminders?: Reminder[];
  attachments?: Attachment[];
  completedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

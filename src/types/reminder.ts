export type ReminderChannel = "IN_APP" | "EMAIL";

export interface Reminder {
  id: string;
  taskId: string;
  remindAt: string;
  channel: ReminderChannel;
  sent?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

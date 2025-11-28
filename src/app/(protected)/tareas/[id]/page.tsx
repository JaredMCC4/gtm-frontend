import { TaskDetailContainer } from "@/features/tasks/containers/task-detail-container";

export default function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <TaskDetailContainer taskId={params.id} />;
}

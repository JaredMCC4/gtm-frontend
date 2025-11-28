export interface Attachment {
  id: string;
  taskId: string;
  fileName: string;
  contentType?: string;
  sizeBytes?: number;
  url?: string;
  createdAt?: string;
}

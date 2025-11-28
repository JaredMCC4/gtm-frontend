import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Attachment } from "@/types/attachment";

interface AttachmentListProps {
  attachments: Attachment[];
}

export function AttachmentList({ attachments }: AttachmentListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Adjuntos
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            Archivos vinculados
          </h3>
          <p className="text-sm text-slate-600">
            Validaremos tamaño y tipo de archivo antes de enviarlo al backend.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {attachments.length ? (
          attachments.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm"
            >
              <span className="font-medium text-slate-800">
                {file.fileName}
              </span>
              <span className="text-xs text-slate-500">
                {file.contentType ?? "Tipo desconocido"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-600">
            Aún no hay archivos. Esta sección consumirá POST/GET
            /api/v1/tareas/&#123;id&#125;/adjuntos.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

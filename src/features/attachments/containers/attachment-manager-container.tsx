"use client";

import { useMemo } from "react";
import { AttachmentList } from "../components/attachment-list";
import type { Attachment } from "@/types/attachment";

export function AttachmentManagerContainer() {
  const attachments = useMemo<Attachment[]>(
    () => [
      {
        id: "a1",
        taskId: "t1",
        fileName: "requerimientos.pdf",
        contentType: "application/pdf",
      },
      {
        id: "a2",
        taskId: "t1",
        fileName: "captura.png",
        contentType: "image/png",
      },
    ],
    [],
  );

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Adjuntos
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Evidencias y archivos
        </h2>
        <p className="text-sm text-slate-600">
          Gestionaremos validación de tamaño y tipos permitidos (pdf, png, jpg,
          txt) antes de enviar al backend.
        </p>
      </div>
      <AttachmentList attachments={attachments} />
    </section>
  );
}

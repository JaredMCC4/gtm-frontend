"use client";

import { useMemo } from "react";
import { LabelBoard } from "../components/label-board";
import type { Label } from "@/types/label";

export function LabelBoardContainer() {
  const labels = useMemo<Label[]>(
    () => [
      { id: "l1", name: "Prioritario", color: "#F97316" },
      { id: "l2", name: "Trabajo", color: "#2563EB" },
      { id: "l3", name: "Personal", color: "#10B981" },
    ],
    [],
  );

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Etiquetas
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Clasificación visual
        </h2>
        <p className="text-sm text-slate-600">
          Crea etiquetas con validaciones de color hexadecimal y unicidad. En
          esta fase solo mostramos ejemplos.
        </p>
      </div>
      <LabelBoard labels={labels} />
    </section>
  );
}

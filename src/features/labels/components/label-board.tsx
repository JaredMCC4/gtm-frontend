import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import type { Label } from "@/types/label";

interface LabelBoardProps {
  labels: Label[];
}

export function LabelBoard({ labels }: LabelBoardProps) {
  if (!labels.length) {
    return (
      <Card>
        <CardContent className="py-6 text-sm text-slate-600">
          Sin etiquetas aún. Crea etiquetas con nombre único y color válido.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {labels.map((label) => (
        <Card key={label.id}>
          <CardHeader className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Etiqueta
              </p>
              <h3 className="text-lg font-semibold text-slate-900">
                {label.name}
              </h3>
            </div>
            <span
              aria-hidden
              className="h-8 w-8 rounded-full border border-slate-200"
              style={{ backgroundColor: label.color }}
            />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              {label.description ?? "Sin descripción"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

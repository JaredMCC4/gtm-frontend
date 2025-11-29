interface AuthDividerProps {
  label?: string;
}

export function AuthDivider({ label = "O continúa con tu correo" }: AuthDividerProps) {
  return (
    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className="w-full border-t border-[var(--border)]" />
      </div>
      <div className="relative flex justify-center text-xs uppercase text-slate-500">
        <span className="bg-[var(--card)] px-3">{label}</span>
      </div>
    </div>
  );
}

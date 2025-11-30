interface AuthDividerProps {
  label?: string;
}

export function AuthDivider({ label }: AuthDividerProps) {
  return (
    <div className="relative py-3">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className="w-full border-t border-[var(--border)]" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[var(--card)] px-4 text-[var(--text-muted)]">{label}</span>
      </div>
    </div>
  );
}

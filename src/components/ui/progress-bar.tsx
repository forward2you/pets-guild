interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
}

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  const percentage = Math.round((safeValue / safeMax) * 100);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-xs font-bold text-muted">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={safeValue}
        className="h-2 overflow-hidden rounded-full bg-line/80"
      >
        <div
          className="h-full rounded-full bg-coral transition-[width] duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

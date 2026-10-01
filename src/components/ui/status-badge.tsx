import type { ReactNode } from "react";

const toneClasses = {
  neutral: "bg-canvas text-ink-soft",
  success: "bg-sage-light text-ink",
  attention: "bg-sun-light text-ink",
  danger: "bg-coral-light text-coral",
};

export function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-extrabold ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

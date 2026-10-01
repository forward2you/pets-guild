import type { ComponentPropsWithoutRef } from "react";

interface FormFieldProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

export function FormField({
  id,
  label,
  hint,
  error,
  className = "",
  ...inputProps
}: FormFieldProps) {
  const descriptionId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-extrabold text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={descriptionId}
        aria-invalid={error ? true : undefined}
        className={`min-h-12 w-full rounded-2xl border bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/60 focus:border-coral focus:ring-3 focus:ring-coral-light ${error ? "border-coral" : "border-line"} ${className}`}
        {...inputProps}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-coral">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  showArrow?: boolean;
};

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  showArrow = true,
  ...props
}: ButtonLinkProps) {
  const variantClass = {
    primary: "bg-ink text-white shadow-[0_12px_32px_rgba(47,40,35,0.18)] hover:bg-ink-soft",
    secondary: "border border-line bg-white/70 text-ink hover:border-ink/20 hover:bg-white",
    light: "bg-white text-ink shadow-none hover:bg-apricot-light",
  }[variant];

  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral ${variantClass} ${className}`}
      {...props}
    >
      {children}
      {showArrow ? <ArrowRight aria-hidden="true" size={17} strokeWidth={2.2} /> : null}
    </Link>
  );
}

import { Heart, PawPrint } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white/65 py-10">
      <div className="page-shell flex flex-col gap-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-extrabold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
        >
          <PawPrint aria-hidden="true" size={18} />
          PawGuide
        </Link>
        <p className="inline-flex items-center gap-1.5">
          给第一次养宠的你，一份有温度的行动指南
          <Heart aria-hidden="true" className="text-coral" size={15} fill="currentColor" />
        </p>
      </div>
    </footer>
  );
}

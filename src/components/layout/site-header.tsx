import { PawPrint } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/match", label: "适宠测评" },
  { href: "/#pets", label: "养宠指南" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/85 backdrop-blur-xl">
      <div className="page-shell flex h-18 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full font-extrabold tracking-[-0.03em] text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
          aria-label="PawGuide 首页"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-coral text-white shadow-[0_8px_20px_rgba(218,104,76,0.25)]">
            <PawPrint aria-hidden="true" size={19} fill="currentColor" />
          </span>
          <span className="text-lg">PawGuide</span>
        </Link>

        <nav aria-label="主导航" className="flex items-center gap-1 sm:gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-muted transition hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:block"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="rounded-full border border-ink bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-ink-soft focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-coral sm:px-5"
          >
            我的宠物
          </Link>
        </nav>
      </div>
    </header>
  );
}

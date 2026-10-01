import { ArrowUpRight, Clock3 } from "lucide-react";
import Link from "next/link";

import type { PetTypeSummary } from "@/content/pet-types";

const tones: Record<PetTypeSummary["tone"], string> = {
  apricot: "bg-apricot-light group-hover:bg-apricot-light/75",
  rose: "bg-rose-light group-hover:bg-rose-light/75",
  sky: "bg-sky-light group-hover:bg-sky-light/75",
  sage: "bg-sage-light group-hover:bg-sage-light/75",
  sun: "bg-sun-light group-hover:bg-sun-light/75",
};

export function PetTypeCard({
  pet,
  featured = false,
}: {
  pet: PetTypeSummary;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/guides/${pet.kind}`}
      className={`group relative flex min-h-72 flex-col overflow-hidden rounded-[2rem] border border-line bg-white p-6 shadow-[0_18px_60px_rgba(86,68,54,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(86,68,54,0.13)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral ${featured ? "md:col-span-2 lg:col-span-1" : ""}`}
      aria-label={`了解${pet.name}是否适合你`}
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className={`grid size-20 place-items-center rounded-[1.65rem] text-5xl transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${tones[pet.tone]}`}
        >
          {pet.emoji}
        </span>
        <span className="grid size-10 place-items-center rounded-full border border-line text-ink-soft transition group-hover:border-ink/20 group-hover:bg-ink group-hover:text-white">
          <ArrowUpRight aria-hidden="true" size={18} />
        </span>
      </div>

      <p className="mb-2 text-xs font-bold tracking-[0.16em] text-coral uppercase">{pet.tagline}</p>
      <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-ink">{pet.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{pet.description}</p>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-line/80 pt-4 text-xs font-semibold text-ink-soft">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1.5">
          <Clock3 aria-hidden="true" size={14} />
          {pet.time}
        </span>
        <span className="rounded-full bg-canvas px-3 py-1.5">{pet.commitment}</span>
      </div>
    </Link>
  );
}

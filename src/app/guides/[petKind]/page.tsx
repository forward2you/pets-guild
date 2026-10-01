import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { getPetType, PET_KINDS } from "@/content/pet-types";

const stages = ["接宠前", "到家第一周", "幼年期", "成长期", "成年期", "老年期"];

export function generateStaticParams() {
  return PET_KINDS.map((petKind) => ({ petKind }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ petKind: string }>;
}): Promise<Metadata> {
  const { petKind } = await params;
  const pet = getPetType(petKind);
  return { title: pet ? `${pet.name}新手指南` : "宠物指南" };
}

export default async function PetGuidePage({ params }: { params: Promise<{ petKind: string }> }) {
  const { petKind } = await params;
  const pet = getPetType(petKind);

  if (!pet) notFound();

  const fullGuide = pet.kind === "dog" || pet.kind === "cat";

  return (
    <section className="page-shell min-h-[72vh] py-10 sm:py-16">
      <Link
        href="/#pets"
        className="inline-flex items-center gap-2 rounded-full text-sm font-bold text-muted transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        返回宠物选择
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
        <div>
          <span className="text-7xl" aria-hidden="true">
            {pet.emoji}
          </span>
          <p className="mt-6 text-xs font-black tracking-[0.16em] text-coral uppercase">
            {pet.tagline}
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-ink sm:text-6xl">
            新手养{pet.name}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted">{pet.description}</p>

          <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold text-ink-soft">
            <span className="rounded-full bg-white px-3.5 py-2 shadow-sm">{pet.time}</span>
            <span className="rounded-full bg-white px-3.5 py-2 shadow-sm">{pet.commitment}</span>
          </div>

          <div className="mt-8">
            <ButtonLink href="/dashboard">创建我的宠物档案</ButtonLink>
          </div>
        </div>

        <div className="rounded-[2rem] border border-line bg-white p-5 shadow-[0_18px_60px_rgba(86,68,54,0.08)] sm:p-8">
          <div className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.14em] text-coral uppercase">成长路线</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-ink">
                从准备到长期陪伴
              </h2>
            </div>
            <span className="text-xs font-bold text-muted">
              {fullGuide ? "狗猫完整内容将在 M3 完成" : "基础预览"}
            </span>
          </div>

          <ol className="mt-3" aria-label={`${pet.name}成长路线`}>
            {stages.map((stage, index) => (
              <li
                key={stage}
                className="group flex items-center gap-4 border-b border-line/70 py-4 last:border-0"
              >
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-black ${index === 0 ? "bg-coral text-white" : "bg-canvas text-muted"}`}
                >
                  {index === 0 ? <Check aria-hidden="true" size={15} strokeWidth={3} /> : index + 1}
                </span>
                <span className="flex-1 font-extrabold text-ink">{stage}</span>
                <ChevronRight aria-hidden="true" className="text-line" size={18} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

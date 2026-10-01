import {
  ArrowDown,
  BadgeCheck,
  CalendarCheck2,
  Check,
  ClipboardList,
  Compass,
  HeartPulse,
  Home,
  Sparkles,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { PetTypeCard } from "@/components/ui/pet-type-card";
import { petTypes } from "@/content/pet-types";

const journeySteps = [
  {
    number: "01",
    icon: Compass,
    title: "先选对",
    description: "从空间、时间与生活习惯出发，找到更适合彼此的伙伴。",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "准备好",
    description: "接宠用品、环境布置和第一周事项，一项项提前准备。",
  },
  {
    number: "03",
    icon: CalendarCheck2,
    title: "每天做",
    description: "按照年龄和健康情况，把复杂知识变成今天的小任务。",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pb-18 pt-10 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
        <div aria-hidden="true" className="paper-grid absolute inset-x-0 top-0 h-full opacity-70" />
        <div
          aria-hidden="true"
          className="absolute -top-24 right-[-7rem] size-80 rounded-full bg-apricot-light/65 blur-3xl sm:right-[-3rem] sm:size-[30rem]"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-[-8rem] size-72 rounded-full bg-sky-light/70 blur-3xl"
        />

        <div className="page-shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-18">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-coral/20 bg-white/75 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-coral shadow-sm backdrop-blur-sm">
              <Sparkles aria-hidden="true" size={15} fill="currentColor" />
              给第一次养宠的你
            </div>

            <h1 className="text-[clamp(2.55rem,6.3vw,4.9rem)] leading-[1.02] font-black tracking-[-0.065em] text-ink">
              <span className="block whitespace-nowrap">从选对伙伴开始</span>
              <span className="mt-2 block whitespace-nowrap text-coral">慢慢成为家人</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              不用先读完一本宠物百科。告诉我们你的生活方式，PawGuide
              会陪你完成选择、准备，再把每天的养护变成清楚的小事。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/match" className="sm:min-w-44">
                帮我选择
              </ButtonLink>
              <ButtonLink href="#pets" variant="secondary" className="sm:min-w-44">
                我已经决定了
              </ButtonLink>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-ink-soft">
              {["无需注册", "约 2 分钟", "结果有理由"].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5">
                  <span className="grid size-5 place-items-center rounded-full bg-sage-light text-ink">
                    <Check aria-hidden="true" size={12} strokeWidth={3} />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          <HeroPreview />
        </div>

        <a
          href="#pets"
          aria-label="向下查看宠物类型"
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-muted transition hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-coral lg:block"
        >
          <ArrowDown aria-hidden="true" size={20} />
        </a>
      </section>

      <section id="pets" className="scroll-mt-24 border-y border-line bg-white/55 py-20 sm:py-26">
        <div className="page-shell">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold tracking-[0.18em] text-coral uppercase">
              已经有想法了
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-ink sm:text-5xl">
              你准备和谁一起生活？
            </h2>
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              先了解真实的时间、空间和长期投入，再决定是不是彼此合适。
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {petTypes.map((pet, index) => (
              <PetTypeCard key={pet.kind} pet={pet} featured={index < 2} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-xs font-extrabold tracking-[0.18em] text-coral uppercase">
                不只是知识百科
              </p>
              <h2 className="mt-3 max-w-[10ch] text-3xl font-black tracking-[-0.045em] text-ink sm:text-5xl">
                把复杂养护变成下一步
              </h2>
              <p className="mt-5 max-w-md leading-7 text-muted">
                看懂只是开始。我们更关心你今天是否知道该做什么、为什么做，以及下一件事什么时候到来。
              </p>
            </div>

            <div className="divide-y divide-line overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_18px_60px_rgba(86,68,54,0.08)]">
              {journeySteps.map((step) => {
                const Icon = step.icon;
                return (
                  <article
                    key={step.number}
                    className="grid gap-4 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:p-8"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-coral-light text-coral">
                      <Icon aria-hidden="true" size={22} strokeWidth={2.1} />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold tracking-[-0.025em] text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted">{step.description}</p>
                    </div>
                    <span className="hidden text-sm font-black tracking-widest text-line sm:block">
                      {step.number}
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="page-shell">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-ink px-6 py-10 text-white shadow-[0_24px_80px_rgba(47,40,35,0.2)] sm:px-10 sm:py-14 lg:px-16">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-24 size-72 rounded-full bg-coral/40 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-28 left-1/3 size-64 rounded-full bg-sage-light/20 blur-3xl"
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-bold text-apricot-light">
                  <BadgeCheck aria-hidden="true" size={19} />
                  从生活出发，不从冲动出发
                </div>
                <h2 className="max-w-2xl text-3xl font-black tracking-[-0.045em] sm:text-4xl">
                  先花两分钟认识自己的养宠条件
                </h2>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-white/72">
                  {[
                    { icon: Home, label: "居住空间" },
                    { icon: HeartPulse, label: "陪伴方式" },
                    { icon: CalendarCheck2, label: "时间投入" },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2"
                    >
                      <Icon aria-hidden="true" size={14} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <ButtonLink href="/match" variant="light" className="lg:min-w-44">
                开始适宠测评
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[31rem] lg:mr-0">
      <div
        aria-hidden="true"
        className="float-slow absolute -left-4 top-14 z-10 grid size-17 place-items-center rounded-3xl border border-white/80 bg-rose-light text-4xl shadow-xl sm:-left-8"
      >
        🐱
      </div>
      <div
        aria-hidden="true"
        className="float-delay absolute -right-3 bottom-18 z-10 grid size-18 place-items-center rounded-3xl border border-white/80 bg-sky-light text-4xl shadow-xl sm:-right-7"
      >
        🐟
      </div>

      <div className="relative rotate-[1.5deg] rounded-[2.4rem] border border-white/90 bg-white/82 p-4 shadow-[0_32px_90px_rgba(86,68,54,0.18)] backdrop-blur-xl sm:p-5">
        <div className="rounded-[1.8rem] border border-line bg-canvas/85 p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-sage-light px-3 py-1.5 text-[0.68rem] font-extrabold tracking-[0.12em] text-ink-soft uppercase">
              你的起点
            </span>
            <span aria-hidden="true" className="text-3xl">
              🐾
            </span>
          </div>
          <h2 className="mt-8 max-w-[12ch] text-2xl font-black tracking-[-0.04em] text-ink sm:text-3xl">
            不是“我喜欢什么”这么简单
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            先看看你们的生活节奏，能不能舒服地走很久。
          </p>

          <ol className="mt-7 space-y-3" aria-label="选择宠物的三个考虑方向">
            {[
              ["生活空间", "小户型也有合适选择"],
              ["每天时间", "照护和陪伴都算进去"],
              ["长期承诺", "预算、出行与十几年以后"],
            ].map(([title, detail], index) => (
              <li
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-coral text-xs font-black text-white">
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-extrabold text-ink">{title}</span>
                  <span className="block truncate text-xs text-muted">{detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

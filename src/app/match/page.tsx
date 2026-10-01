import { Clock3, Coins, Home, Sparkles, Volume2 } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";

const dimensions = [
  { icon: Home, label: "居住空间", text: "租房规则、活动区域与家庭成员" },
  { icon: Clock3, label: "每天时间", text: "陪伴、运动和清洁能投入多久" },
  { icon: Coins, label: "长期预算", text: "日常用品、医疗与意外支出" },
  { icon: Volume2, label: "生活边界", text: "对声音、掉毛和气味的接受度" },
];

export default function MatchPage() {
  return (
    <section className="page-shell min-h-[72vh] py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-coral-light px-3.5 py-2 text-xs font-extrabold tracking-[0.1em] text-coral uppercase">
            <Sparkles aria-hidden="true" size={15} />
            适宠测评
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-ink sm:text-6xl">
            选择合适的伙伴，不靠猜
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            我们会从你的真实生活出发，给出多个候选、推荐理由和需要认真考虑的代价。
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {dimensions.map(({ icon: Icon, label, text }, index) => (
            <article
              key={label}
              className="rounded-3xl border border-line bg-white p-6 shadow-[0_14px_45px_rgba(86,68,54,0.07)]"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sage-light text-ink">
                  <Icon aria-hidden="true" size={20} />
                </span>
                <div>
                  <p className="text-xs font-black tracking-widest text-coral">0{index + 1}</p>
                  <h2 className="font-extrabold text-ink">{label}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed border-coral/35 bg-coral-light/35 px-6 py-7 text-center">
          <p className="font-extrabold text-ink">测评问卷将在 M2 开放</p>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
            当前 M1 已完成页面骨架。下一阶段将加入可返回、可保存并且结果可解释的完整问卷。
          </p>
          <ButtonLink href="/#pets" variant="secondary" className="mt-5">
            先浏览宠物类型
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

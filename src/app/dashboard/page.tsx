import { ClipboardPlus, Compass, PawPrint } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";

export const metadata = { title: "我的宠物" };

export default function DashboardPage() {
  return (
    <section className="page-shell grid min-h-[72vh] place-items-center py-16">
      <div className="w-full max-w-2xl rounded-[2.25rem] border border-line bg-white px-6 py-12 text-center shadow-[0_22px_70px_rgba(86,68,54,0.09)] sm:px-12 sm:py-16">
        <span className="relative mx-auto grid size-20 place-items-center rounded-[1.75rem] bg-apricot-light text-ink">
          <PawPrint aria-hidden="true" size={34} />
          <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-coral text-white ring-4 ring-white">
            <ClipboardPlus aria-hidden="true" size={14} />
          </span>
        </span>
        <p className="mt-7 text-xs font-black tracking-[0.16em] text-coral uppercase">我的宠物</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.045em] text-ink sm:text-5xl">
          这里还没有宠物档案
        </h1>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-muted">
          建档功能将在 M4 完成。现在可以先了解适合自己的宠物，或浏览五类宠物的新手路线预览。
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/match">
            <Compass aria-hidden="true" size={17} />
            先从选择开始
          </ButtonLink>
          <ButtonLink href="/#pets" variant="secondary">
            浏览宠物类型
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

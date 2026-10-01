import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <section className="page-shell grid min-h-[70vh] place-items-center py-16 text-center">
      <div className="max-w-lg">
        <span className="text-7xl" aria-hidden="true">
          🐕‍🦺
        </span>
        <p className="mt-6 text-xs font-black tracking-[0.16em] text-coral uppercase">404</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.045em] text-ink">
          这条路线还没有脚印
        </h1>
        <p className="mt-4 leading-7 text-muted">页面可能移动了，回到首页重新选择一个方向吧。</p>
        <ButtonLink href="/" className="mt-7">
          返回首页
        </ButtonLink>
      </div>
    </section>
  );
}

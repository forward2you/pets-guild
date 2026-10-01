"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="page-shell grid min-h-[70vh] place-items-center py-16 text-center">
      <div className="max-w-lg">
        <span className="text-6xl" aria-hidden="true">
          🐾
        </span>
        <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-ink">刚才没有顺利打开</h1>
        <p className="mt-4 leading-7 text-muted">
          你的操作不会因此被提交。可以再试一次，或稍后返回首页。
        </p>
        <button
          type="button"
          onClick={retry}
          className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-ink-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
        >
          <RotateCcw aria-hidden="true" size={17} />
          再试一次
        </button>
      </div>
    </section>
  );
}

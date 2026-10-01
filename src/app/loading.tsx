export default function Loading() {
  return (
    <div className="page-shell min-h-[70vh] py-16" aria-live="polite" aria-busy="true">
      <span className="sr-only">正在加载</span>
      <div className="mx-auto max-w-3xl animate-pulse space-y-5">
        <div className="h-8 w-28 rounded-full bg-line" />
        <div className="h-16 max-w-xl rounded-3xl bg-line/80" />
        <div className="h-5 max-w-2xl rounded-full bg-line/60" />
        <div className="grid gap-4 pt-8 sm:grid-cols-2">
          <div className="h-48 rounded-3xl bg-line/65" />
          <div className="h-48 rounded-3xl bg-line/65" />
        </div>
      </div>
    </div>
  );
}

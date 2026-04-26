function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="h-44 animate-pulse rounded-xl bg-slate-200" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <div className="h-4 w-52 animate-pulse rounded bg-slate-200" />
          <div className="h-10 w-96 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200" />
        </div>

        <div className="h-12 w-full animate-pulse rounded-lg bg-slate-200" />
        <div className="h-16 w-full animate-pulse rounded-2xl bg-slate-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </main>
    </div>
  );
}

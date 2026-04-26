export default function ProductDetailsLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="h-10 w-44 animate-pulse rounded-lg bg-slate-200" />
        <section className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="h-80 animate-pulse rounded-xl bg-slate-200 sm:h-[420px]" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-lg bg-slate-200"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
            <div className="h-16 w-full animate-pulse rounded bg-slate-200" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-lg bg-slate-200"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

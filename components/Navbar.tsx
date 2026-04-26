import Link from "next/link";

export function Navbar() {
  return (
    <header className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
        ShopNow Demo
      </p>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.25rem]">
            Product Listing Page
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            New products available now. Shop now!
          </p>
        </div>
        <Link
          href="/"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Reset Filters
        </Link>
      </div>
    </header>
  );
}

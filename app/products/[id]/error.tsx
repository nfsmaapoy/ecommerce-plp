"use client";

import Link from "next/link";

export default function ProductDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          Product load error
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          We could not load this product
        </h1>
        <p className="mt-3 max-w-md text-sm text-slate-600">
          {error.message ||
            "An unexpected error occurred while fetching product details."}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Products
          </Link>
        </div>
      </main>
    </div>
  );
}

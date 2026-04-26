import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Product not found
        </h1>
        <p className="mt-3 max-w-md text-sm text-slate-600">
          The product you are looking for does not exist or may have been
          removed.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to product listing
        </Link>
      </main>
    </div>
  );
}

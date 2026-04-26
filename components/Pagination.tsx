import Link from "next/link";
import { createQueryString } from "@/lib/helpers";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  q?: string;
  category?: string;
  sortBy?: string;
  order?: string;
}

export function Pagination({
  page,
  total,
  limit,
  q,
  category,
  sortBy,
  order,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const baseParams = { q, category, sortBy, order, limit };

  return (
    <nav className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <Link
        href={`/${createQueryString({
          ...baseParams,
          page: page - 1,
        })}`}
        aria-disabled={!hasPrev}
        className={`rounded-lg px-4 py-2 text-sm font-medium ${
          hasPrev
            ? "border border-slate-300 text-slate-700 hover:bg-slate-50"
            : "pointer-events-none border border-slate-200 text-slate-300"
        }`}
      >
        Previous
      </Link>
      <p className="text-sm text-slate-600">
        Page {page} of {totalPages}
      </p>
      <Link
        href={`/${createQueryString({
          ...baseParams,
          page: page + 1,
        })}`}
        aria-disabled={!hasNext}
        className={`rounded-lg px-4 py-2 text-sm font-medium ${
          hasNext
            ? "border border-slate-300 text-slate-700 hover:bg-slate-50"
            : "pointer-events-none border border-slate-200 text-slate-300"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}

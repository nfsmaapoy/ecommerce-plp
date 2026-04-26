import Link from "next/link";
import { createQueryString } from "@/lib/helpers";

interface FilterBarProps {
  categories: string[];
  activeCategory?: string;
  q?: string;
  sortBy?: string;
  order?: string;
}

function formatCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

export function FilterBar({
  categories,
  activeCategory,
  q,
  sortBy,
  order,
}: FilterBarProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-slate-600">Categories:</span>
        <Link
          href={`/${createQueryString({ q, sortBy, order, page: 1 })}`}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
            !activeCategory
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All
        </Link>
        {categories.slice(0, 12).map((category) => (
          <Link
            key={category}
            href={`/${createQueryString({
              q,
              category,
              sortBy,
              order,
              page: 1,
            })}`}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              activeCategory === category
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {formatCategoryLabel(category)}
          </Link>
        ))}
      </div>
    </section>
  );
}

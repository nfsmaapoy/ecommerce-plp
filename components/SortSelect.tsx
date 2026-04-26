interface SortSelectProps {
  q?: string;
  category?: string;
  sortBy?: string;
  order?: string;
}

export function SortSelect({ q, category, sortBy, order }: SortSelectProps) {
  return (
    <form
      method="GET"
      className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
    >
      {q ? <input type="hidden" name="q" value={q} /> : null}
      {category ? (
        <input type="hidden" name="category" value={category} />
      ) : null}

      <label className="text-sm font-medium text-slate-600" htmlFor="sortBy">
        Sort by
      </label>
      <select
        id="sortBy"
        name="sortBy"
        defaultValue={sortBy ?? ""}
        className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900"
      >
        <option value="">Default</option>
        <option value="title">Title</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>

      <select
        id="order"
        name="order"
        defaultValue={order ?? "asc"}
        className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button
        type="submit"
        className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        Apply
      </button>
    </form>
  );
}

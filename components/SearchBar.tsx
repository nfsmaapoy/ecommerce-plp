interface SearchBarProps {
  query?: string;
  category?: string;
  sortBy?: string;
  order?: string;
}

export function SearchBar({ query, category, sortBy, order }: SearchBarProps) {
  return (
    <form
      method="GET"
      className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
    >
      <input
        type="search"
        name="q"
        defaultValue={query}
        placeholder="Search products (e.g. phone, laptop)"
        className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
      {category ? (
        <input type="hidden" name="category" value={category} />
      ) : null}
      {sortBy ? <input type="hidden" name="sortBy" value={sortBy} /> : null}
      {order ? <input type="hidden" name="order" value={order} /> : null}
      <button
        type="submit"
        className="h-11 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Search
      </button>
    </form>
  );
}

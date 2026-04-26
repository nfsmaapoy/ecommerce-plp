import { FilterBar } from "@/components/FilterBar";
import { Navbar } from "@/components/Navbar";
import { Pagination } from "@/components/Pagination";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchBar } from "@/components/SearchBar";
import { SortSelect } from "@/components/SortSelect";
import { getProductCategories, getProducts } from "@/lib/api";
import { parseProductQueryParams } from "@/lib/helpers";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const params = parseProductQueryParams(resolvedSearchParams);

  const [productsData, categories] = await Promise.all([
    getProducts(params),
    getProductCategories(),
  ]);

  const activeCategory = params.category;
  const page = params.page ?? 1;
  const limit = params.limit ?? 12;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <Navbar />

        <SearchBar
          query={params.q}
          category={activeCategory}
          sortBy={params.sortBy}
          order={params.order}
        />

        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          q={params.q}
          sortBy={params.sortBy}
          order={params.order}
        />

        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Products ({productsData.total})
          </h2>
          <SortSelect
            q={params.q}
            category={activeCategory}
            sortBy={params.sortBy}
            order={params.order}
          />
        </section>

        <ProductGrid products={productsData.products} />

        <Pagination
          page={page}
          total={productsData.total}
          limit={limit}
          q={params.q}
          category={activeCategory}
          sortBy={params.sortBy}
          order={params.order}
        />
      </main>
    </div>
  );
}

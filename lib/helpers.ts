import type { Product, ProductQueryParams, SortBy, SortOrder } from "./types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;

export const SORT_BY_VALUES: SortBy[] = ["title", "price", "rating"];
export const SORT_ORDER_VALUES: SortOrder[] = ["asc", "desc"];

function isSortBy(value: string): value is SortBy {
  return SORT_BY_VALUES.includes(value as SortBy);
}

function isSortOrder(value: string): value is SortOrder {
  return SORT_ORDER_VALUES.includes(value as SortOrder);
}

export function parsePositiveInt(
  value: string | undefined,
  fallback: number,
): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) return fallback;
  return parsed;
}

export function getSkip(page: number, limit: number): number {
  return (page - 1) * limit;
}

export function parseProductQueryParams(searchParams?: {
  [key: string]: string | string[] | undefined;
}): ProductQueryParams {
  const rawQ = searchParams?.q;
  const rawCategory = searchParams?.category;
  const rawSortBy = searchParams?.sortBy;
  const rawOrder = searchParams?.order;
  const rawPage = searchParams?.page;
  const rawLimit = searchParams?.limit;

  const q = typeof rawQ === "string" ? rawQ.trim() : undefined;
  const category =
    typeof rawCategory === "string" ? rawCategory.trim() : undefined;

  const sortByValue = typeof rawSortBy === "string" ? rawSortBy : undefined;
  const orderValue = typeof rawOrder === "string" ? rawOrder : undefined;
  const pageValue = typeof rawPage === "string" ? rawPage : undefined;
  const limitValue = typeof rawLimit === "string" ? rawLimit : undefined;

  return {
    q: q || undefined,
    category: category || undefined,
    sortBy: sortByValue && isSortBy(sortByValue) ? sortByValue : undefined,
    order: orderValue && isSortOrder(orderValue) ? orderValue : undefined,
    page: parsePositiveInt(pageValue, DEFAULT_PAGE),
    limit: parsePositiveInt(limitValue, DEFAULT_LIMIT),
  };
}

export function sortProducts(
  products: Product[],
  sortBy?: SortBy,
  order: SortOrder = "asc",
): Product[] {
  if (!sortBy) return products;

  const sorted = [...products].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return aValue - bValue;
    }

    return 0;
  });

  return order === "desc" ? sorted.reverse() : sorted;
}

export const productQueryDefaults = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_LIMIT,
};

export function createQueryString(
  params: Record<string, string | number | undefined>,
): string {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "") return;
    search.set(key, String(value));
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}

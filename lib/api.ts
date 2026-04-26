import { getSkip, sortProducts } from "./helpers";
import type {
  ApiErrorShape,
  Product,
  ProductQueryParams,
  ProductsResponse,
} from "./types";

const DUMMY_JSON_BASE_URL = "https://dummyjson.com";

function normalizeApiError(
  error: unknown,
  fallbackMessage: string,
): ApiErrorShape {
  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: fallbackMessage };
}

async function fetchFromApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${DUMMY_JSON_BASE_URL}${path}`, {
    ...init,
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${path}`);
  }

  return (await response.json()) as T;
}

export async function getProducts(
  params: ProductQueryParams,
): Promise<ProductsResponse> {
  try {
    const page = params.page ?? 1;
    const limit = params.limit ?? 12;
    const skip = getSkip(page, limit);

    let path = `/products?limit=${limit}&skip=${skip}`;

    if (params.q) {
      path = `/products/search?q=${encodeURIComponent(params.q)}&limit=${limit}&skip=${skip}`;
    } else if (params.category) {
      path = `/products/category/${encodeURIComponent(params.category)}?limit=${limit}&skip=${skip}`;
    }

    const data = await fetchFromApi<ProductsResponse>(path);

    return {
      ...data,
      products: sortProducts(data.products, params.sortBy, params.order),
    };
  } catch (error) {
    const normalized = normalizeApiError(error, "Failed to load products.");
    throw new Error(normalized.message);
  }
}

export async function getProductById(id: number | string): Promise<Product> {
  const parsedId =
    typeof id === "string" ? Number.parseInt(id, 10) : Number(id);

  if (!Number.isFinite(parsedId) || parsedId < 1) {
    throw new Error("Invalid product id.");
  }

  try {
    return await fetchFromApi<Product>(`/products/${parsedId}`);
  } catch (error) {
    const normalized = normalizeApiError(error, "Failed to load product.");
    throw new Error(normalized.message);
  }
}

interface ProductCategoryResponse {
  slug: string;
  name: string;
  url: string;
}

export async function getProductCategories(): Promise<string[]> {
  try {
    const data = await fetchFromApi<ProductCategoryResponse[]>(
      "/products/categories",
    );
    return data.map((category) => category.slug);
  } catch (error) {
    const normalized = normalizeApiError(error, "Failed to load categories.");
    throw new Error(normalized.message);
  }
}

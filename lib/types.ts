export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  sku?: string;
  weight?: number;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type SortBy = "title" | "price" | "rating";
export type SortOrder = "asc" | "desc";

export interface ProductQueryParams {
  q?: string;
  category?: string;
  sortBy?: SortBy;
  order?: SortOrder;
  page?: number;
  limit?: number;
}

export interface ApiErrorShape {
  message: string;
  status?: number;
}

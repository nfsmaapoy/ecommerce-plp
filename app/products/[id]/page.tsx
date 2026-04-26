import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

function formatCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

function calculateOriginalPrice(
  price: number,
  discountPercentage: number,
): number {
  if (discountPercentage <= 0) return price;
  return Math.round((price / (1 - discountPercentage / 100)) * 100) / 100;
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await getProductById(id);

    return {
      title: product.title,
      description: product.description,
    };
  } catch {
    return {
      title: "Product Not Found",
      description: "The requested product could not be loaded.",
    };
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  let product;
  try {
    product = await getProductById(id);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (
      message.includes("(404)") ||
      message.toLowerCase().includes("invalid product id")
    ) {
      notFound();
    }
    throw error;
  }

  const originalPrice = calculateOriginalPrice(
    product.price,
    product.discountPercentage,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            ← Back to Products
          </Link>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
            {formatCategoryLabel(product.category)}
          </span>
        </div>

        <section className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative h-80 overflow-hidden rounded-xl bg-slate-100 sm:h-[420px]">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
            </div>

            {product.images.length > 1 ? (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((imageUrl) => (
                  <div
                    key={imageUrl}
                    className="relative h-20 overflow-hidden rounded-lg bg-slate-100"
                  >
                    <Image
                      src={imageUrl}
                      alt={`${product.title} preview`}
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-600">
                {product.brand ?? "Generic Brand"}
              </p>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900">
                {product.title}
              </h1>
              <p className="text-sm text-slate-600">{product.description}</p>
            </div>

            <div className="flex flex-wrap items-end gap-3 border-y border-slate-200 py-4">
              <p className="text-3xl font-bold text-slate-900">
                ${product.price}
              </p>
              {product.discountPercentage > 0 ? (
                <>
                  <p className="text-base text-slate-400 line-through">
                    ${originalPrice}
                  </p>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {product.discountPercentage.toFixed(1)}% OFF
                  </span>
                </>
              ) : null}
            </div>

            <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-slate-500">Rating</dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  ★ {product.rating.toFixed(1)} / 5
                </dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-slate-500">Stock</dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {product.stock} units
                </dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-slate-500">SKU</dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {product.sku ?? "N/A"}
                </dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <dt className="text-slate-500">Weight</dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {product.weight ? `${product.weight}g` : "N/A"}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
    </div>
  );
}

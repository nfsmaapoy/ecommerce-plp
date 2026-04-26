import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const brandOrCategory = product.brand ?? product.category;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative mb-4 h-44 overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {brandOrCategory}
          </p>
          <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
            {product.title}
          </h3>
          <p className="line-clamp-2 text-sm text-slate-600">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-slate-900">
              ${product.price}
            </span>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
              ★ {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

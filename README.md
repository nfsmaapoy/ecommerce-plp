# ShopNow ECommerce Demo (Next.js PLP)

A mini e-commerce Product Listing Page built with Next.js App Router, TypeScript, and TailwindCSS.

## Features

- Server-side data fetching with Server Components
- Search, filter, sort, and pagination with URL query params
- Dynamic product details route (`/products/[id]`)
- Reusable UI components

## Tech Stack

- Next.js
- TypeScript
- TailwindCSS
- DummyJSON API (`https://dummyjson.com`)

## Local Development

1. Install dependencies

```bash
npm install
```

1. Start the dev server

```bash
npm run dev
```

1. Run lint checks

```bash
npm run lint
```

1. Build for production

```bash
npm run build
```

The app runs at [http://localhost:3000](http://localhost:3000).
Vercel app link: [https://shopnow-ecommerce-plp.vercel.app](https://shopnow-ecommerce-plp.vercel.app)

## API Endpoints Used

- List products: `https://dummyjson.com/products`
- Product details: `https://dummyjson.com/products/:id`
- Search: `https://dummyjson.com/products/search?q=phone`
- Category: `https://dummyjson.com/products/category/smartphones`
- Categories: `https://dummyjson.com/products/categories`


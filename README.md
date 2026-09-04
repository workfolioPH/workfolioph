# WorkFolio PH

Marketing + order-capture website for **WorkFolio PH** — professional digital
portfolio websites for Filipino overseas and local workers (nurses, engineers,
seafarers, skilled trades, VAs, creatives).

Single-page Vite + React + Tailwind v4 site with Vercel serverless API routes
backed by Supabase (Postgres).

## Stack

| Layer     | Tech                                              |
|-----------|---------------------------------------------------|
| Frontend  | React 19, TypeScript, Vite 7, Tailwind CSS 4, framer-motion, lucide-react |
| API       | Vercel Serverless Functions (`/api/*.js`)         |
| Database  | Supabase Postgres (schema: `supabase/schema.sql`) |

## Repository layout

```
index.html            # Entry HTML (SEO meta, OG, JSON-LD)
src/                  # React app (App.tsx composes src/components/*)
api/                  # Vercel serverless endpoints:
  inquiries.js        #   POST public inquiries, GET status by ref / admin list, PUT admin update
  faqs.js             #   public FAQ rows (is_published only)
  reviews.js          #   public reviews list (admin-gated POST)
  samples.js          #   public portfolio samples list
  db-client.js        #   service-role Supabase client (throws if env missing)
supabase/schema.sql   # tables + RLS — run in the Supabase SQL editor
public/               # static assets (images, robots.txt, sitemap.xml, og-image.png)
```

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build  → dist/
npm run lint
```

## Required environment variables (Vercel → Settings → Environment Variables)

| Variable                    | Used by                | Notes |
|-----------------------------|------------------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL`  | `api/db-client.js`     | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `api/db-client.js`     | **Secret.** Server-side only; never exposed to the browser |
| `VITE_SUPABASE_URL`         | Admin portal login     | Same value as `NEXT_PUBLIC_SUPABASE_URL` |
| `VITE_SUPABASE_ANON_KEY`    | Admin portal login     | The public anon key |
| `ADMIN_EMAIL`               | `api/*.js` admin guard | Exact Supabase auth user email allowed to use the admin dashboard |
| `PUBLIC_SITE_ORIGIN`        | CORS on `/api/inquiries` | Optional; e.g. `https://workfolioph.vercel.app` |

If the Supabase vars are missing, API routes fail fast (500) and the admin
portal shows an explicit "not configured" error instead of a confusing login
failure.

## Setup checklist (first deploy)

1. Create a Supabase project and run `supabase/schema.sql` in the SQL editor.
2. Create an admin user (Authentication → Users) and set `ADMIN_EMAIL` to it.
3. Add the environment variables above in Vercel (Production **and** Preview).
4. `npm run build` must pass locally before pushing.
5. Seed `faqs` if you want FAQ content to override the built-in defaults
   (the site falls back to bundled FAQs when the table is empty/unreachable).
6. After launch: update `index.html` (canonical + OG URLs), `public/robots.txt`
   and `public/sitemap.xml` if you move off `workfolioph.vercel.app` to a
   custom domain.

## Deploy

Push to `main` → Vercel auto-builds (framework preset **Vite**). No `vercel.json`
is required: the app is a single page (in-page anchors, no client-side routes)
and `api/` functions are picked up automatically.

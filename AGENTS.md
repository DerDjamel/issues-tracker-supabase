# Repository Guide

- This is one npm package, not a monorepo. Use npm and keep `package-lock.json` in sync.
- This is a TanStack Start app built by Vite/Nitro. `npm run dev` serves on port 3000; `npm run build` writes the production server to `.output/`, run with `node .output/server/index.mjs`.
- Routes are file-based under `src/routes`; `src/routes/__root.tsx` owns the document shell and `src/router.tsx` registers the generated tree. After adding, removing, or renaming a route, run `npm run generate-routes`; never edit `src/routeTree.gen.ts` manually.
- For route changes, run `npx tsc --noEmit` and then `npm run build`. General checks are `npm run lint`, `npm run fmt:check`, and `npx tsc --noEmit`; there is no test runner or test script.
- Route loaders are isomorphic. Keep private/server-only Supabase work in `createServerFn`; the server and browser clients both require `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (normally in ignored `.env.local`).
- Tailwind CSS v4 is installed through the `@tailwindcss/vite` plugin and imported by `src/styles.css`. Shadcn aliases are defined in `components.json`; follow `.cursorrules` and add components with `pnpm dlx shadcn@latest add <component>`.
- The local Supabase CLI is `npx supabase` and uses `supabase/config.toml`. Use `npx supabase start`, `status`, or `stop`; local API, database, Studio, and mail UI ports are 54321, 54322, 54323, and 54324 respectively.

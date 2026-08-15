# Repository Guide

- This is a single npm package, not a monorepo. Use npm and keep `package-lock.json` in sync.
- `npm run dev` starts Vite on port 3000; `npm run build` emits the Nitro server to `.output/`, which runs with `node .output/server/index.mjs`.
- After adding, removing, or renaming a file in `src/routes`, run `npm run generate-routes`; never edit the generated `src/routeTree.gen.ts` manually. For route changes, verify with `npx tsc --noEmit` then `npm run build`.
- There are no test, lint, or formatter scripts in `package.json`; type checking is `npx tsc --noEmit`.
- TanStack Start uses file-based routes: `src/routes/__root.tsx` owns the document shell, `src/routes/index.tsx` is the home route, and `src/router.tsx` creates the router. Loaders are isomorphic, so private/server-only work belongs in `createServerFn`.
- Tailwind CSS v4 is wired through `@tailwindcss/vite`; shadcn uses `src/styles.css` and the aliases in `components.json`. Follow `.cursorrules` and add components with `pnpm dlx shadcn@latest add <component>`.
- The local Supabase CLI is available as `npx supabase` and reads `supabase/config.toml`; `npx supabase start`, `status`, and `stop` manage the local stack (API 54321, database 54322, Studio 54323, mail UI 54324).

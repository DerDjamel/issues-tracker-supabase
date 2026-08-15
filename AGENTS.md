# Repository Guide

- This is a single npm package, not a monorepo. Keep `package-lock.json` in sync and use npm for project commands.
- Run `npm run dev` to start Vite on port 3000.
- Run `npm run generate-routes` after adding, removing, or renaming files in `src/routes`; never edit `src/routeTree.gen.ts` manually.
- Run `npx tsc --noEmit` for type checking; there is no test, lint, or formatter script in `package.json`.
- Run `npm run build` for production verification. The Nitro node-server output is `.output/`; run it with `node .output/server/index.mjs`.
- The app uses TanStack Start with file-based routes: `src/routes/__root.tsx` owns the document shell, `src/routes/index.tsx` is the home route, and `src/router.tsx` creates the router.
- TanStack Start code is isomorphic by default, and loaders are not server-only; put private or server-only work in `createServerFn`.
- Tailwind CSS v4 is wired through `@tailwindcss/vite`; shadcn uses `src/styles.css` and the aliases in `components.json`.
- For new shadcn components, follow `.cursorrules` and use `pnpm dlx shadcn@latest add <component>`.

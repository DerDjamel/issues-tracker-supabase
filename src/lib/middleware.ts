import { createMiddleware } from "@tanstack/react-start";

export const authMiddleware = createMiddleware().server(async ({ next, context }) => {
  const user = (context as { user?: unknown } | undefined)?.user;
  if (!user) {
    throw new Error("Authentication required");
  }

  return next({ context });
});

import { createMiddleware, createStart } from "@tanstack/react-start";

import { createClient } from "./lib/supabase/server-client";

const supabaseAuthMiddleware = createMiddleware().server(async ({ next }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return next({ context: { user } });
});

export const startInstance = createStart(() => ({
  requestMiddleware: [supabaseAuthMiddleware],
}));

export default startInstance;

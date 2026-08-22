import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";

import { createClient } from "./supabase/server-client";

const redirectTo = "http://127.0.0.1:3000/auth/confirm";

export const login = createServerFn({ method: "POST" })
  .validator((input: { email: string; password: string }) => input)
  .handler(async ({ data }) => {
    const { error } = await createClient().auth.signInWithPassword(data);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const signup = createServerFn({ method: "POST" })
  .validator((input: { email: string; password: string }) => input)
  .handler(async ({ data }) => {
    const { data: result, error } = await createClient().auth.signUp(data);
    if (error) throw new Error(error.message);
    return { hasSession: Boolean(result.session) };
  });

export const requestMagicLink = createServerFn({ method: "POST" })
  .validator((input: { email: string }) => input)
  .handler(async ({ data }) => {
    const { error } = await createClient().auth.signInWithOtp({
      email: data.email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const { error } = await createClient().auth.signOut();
  if (error) throw new Error(error.message);
  throw redirect({ to: "/" });
});

import { createServerFn } from "@tanstack/react-start";
import { createClient } from "./server-client";

export const fetchData = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("test").select();

  if (error) {
    console.error(error);
    return { data: [], error: error.message };
  }

  return { data, error: null };
});

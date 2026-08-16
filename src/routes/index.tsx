import { fetchData } from "#/lib/supabase/fetch";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home, loader: async () => fetchData() });

function Home() {
  const { data, error } = Route.useLoaderData();
  console.log({
    data,
    error,
  });

  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
  );
}

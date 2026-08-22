import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/")({ component: Home });

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Issues tracker</h1>
      <p className="mt-4 text-lg">Your workspace is ready.</p>
    </div>
  );
}

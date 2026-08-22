import { LoginForm } from "#/components/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <LoginForm className="w-full max-w-md" />
    </div>
  );
}

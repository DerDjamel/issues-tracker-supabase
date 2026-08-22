import { createFileRoute } from "@tanstack/react-router";
import { logout } from "#/lib/auth";

export const Route = createFileRoute("/logout")({ loader: () => logout(), component: () => null });

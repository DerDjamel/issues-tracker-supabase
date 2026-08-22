import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";

import { signup } from "#/lib/auth";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setError("");
    setMessage("");
    try {
      const result = await signup({
        data: {
          email: String(formData.get("email")),
          password: String(formData.get("password")),
        },
      });
      if (result.hasSession) await navigate({ to: "/" });
      else setMessage("Check your email to confirm your account.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to sign up");
    }
  }

  return (
    <AuthCard title="Create an account" description="Start tracking issues with your team.">
      <form action={submit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" minLength={6} required />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
        <Button className="w-full" type="submit">
          Sign up
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link className="underline" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}

function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

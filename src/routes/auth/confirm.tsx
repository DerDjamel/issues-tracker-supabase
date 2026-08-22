import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createClient } from "#/lib/supabase/browser-client";

export const Route = createFileRoute("/auth/confirm")({ component: Confirm });

function Confirm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash");
    const type = params.get("type");
    const code = params.get("code");
    const supabase = createClient();

    async function verify() {
      const result = code
        ? await supabase.auth.exchangeCodeForSession(code)
        : tokenHash && type
          ? await supabase.auth.verifyOtp({ type: type as "magiclink", token_hash: tokenHash })
          : { error: new Error("Missing authentication token") };
      if (result.error) setError(result.error.message);
      else await navigate({ to: "/" });
    }
    void verify();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <p>{error || "Signing you in..."}</p>
    </div>
  );
}

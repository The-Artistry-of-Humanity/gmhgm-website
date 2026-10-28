import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/use-document-title";

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "success" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  useDocumentTitle("Unsubscribe — GMHGM");
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );
        const data = await res.json();
        if (!res.ok) return setState("invalid");
        if (data.valid === false && data.reason === "already_unsubscribed") return setState("already");
        if (data.valid === true) return setState("valid");
        setState("invalid");
      } catch {
        setState("invalid");
      }
    })();
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) return setState("error");
      if (data?.success) return setState("success");
      if (data?.reason === "already_unsubscribed") return setState("already");
      setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full text-center space-y-6 rounded-2xl border border-border-solid bg-surface p-8">
        <h1 className="text-2xl font-bold text-foreground">Email preferences</h1>

        {state === "loading" && <p className="text-muted-foreground">Checking your link…</p>}

        {state === "valid" && (
          <>
            <p className="text-muted-foreground">
              Confirm you'd like to unsubscribe from GMHGM emails. You can re-subscribe anytime.
            </p>
            <Button onClick={handleConfirm} className="w-full">Confirm unsubscribe</Button>
          </>
        )}

        {state === "submitting" && <p className="text-muted-foreground">Processing…</p>}

        {state === "success" && (
          <p className="text-foreground">You've been unsubscribed. We're sorry to see you go.</p>
        )}

        {state === "already" && (
          <p className="text-foreground">This email is already unsubscribed.</p>
        )}

        {state === "invalid" && (
          <p className="text-muted-foreground">This unsubscribe link is invalid or has expired.</p>
        )}

        {state === "error" && (
          <p className="text-destructive">Something went wrong. Please try again later.</p>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/use-document-title";

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "success" | "error";

const Unsubscribe = () => {
  useDocumentTitle("Unsubscribe — GMHGM");
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  // Links in emails sent before the move off Lovable carry a token. Any token is
  // accepted; the request is recorded with Netlify Forms ("unsubscribe") and the
  // address is suppressed by hand from there.
  useEffect(() => {
    setState(token ? "valid" : "invalid");
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "unsubscribe", token }).toString(),
      });
      setState(res.ok ? "success" : "error");
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
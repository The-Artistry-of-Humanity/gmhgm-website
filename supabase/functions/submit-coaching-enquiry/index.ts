import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Payload {
  name: string;
  email: string;
  location: string;
  reason: string;
  packageInterest: string;
  weeklyTime: string;
  notes?: string;
}

function isValid(p: any): p is Payload {
  return (
    p &&
    typeof p.name === "string" && p.name.trim().length >= 1 && p.name.length <= 100 &&
    typeof p.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) && p.email.length <= 255 &&
    typeof p.location === "string" && p.location.trim().length >= 2 && p.location.length <= 120 &&
    typeof p.reason === "string" && p.reason.trim().length >= 10 && p.reason.length <= 1500 &&
    typeof p.packageInterest === "string" && p.packageInterest.length >= 1 && p.packageInterest.length <= 100 &&
    typeof p.weeklyTime === "string" && p.weeklyTime.length >= 1 && p.weeklyTime.length <= 100 &&
    (p.notes === undefined || p.notes === null || (typeof p.notes === "string" && p.notes.length <= 1000))
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    if (!isValid(body)) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // 1. Save to DB
    const { data: inserted, error: insertError } = await supabase
      .from("coaching_enquiries")
      .insert({
        name: body.name.trim(),
        email: body.email.trim(),
        location: body.location.trim(),
        reason: body.reason.trim(),
        package_interest: body.packageInterest,
        weekly_time: body.weeklyTime,
        notes: body.notes?.trim() || null,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("DB insert error:", insertError);
      return new Response(JSON.stringify({ error: "Could not save enquiry" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Send notification email to Ian (best-effort — don't fail submission if email fails)
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "coaching-enquiry-notification",
          recipientEmail: "ian@gmhgm.com",
          idempotencyKey: `coaching-enquiry-${inserted.id}`,
          templateData: {
            name: body.name,
            email: body.email,
            location: body.location,
            reason: body.reason,
            packageInterest: body.packageInterest,
            weeklyTime: body.weeklyTime,
            notes: body.notes || "",
          },
        },
      });
    } catch (emailErr) {
      console.error("Email send failed (enquiry still saved):", emailErr);
    }

    // 3. Send confirmation email to the prospect (best-effort)
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "coaching-enquiry-confirmation",
          recipientEmail: body.email.trim(),
          idempotencyKey: `coaching-confirm-${inserted.id}`,
          templateData: { name: body.name },
        },
      });
    } catch (emailErr) {
      console.error("Confirmation email failed:", emailErr);
    }

    return new Response(JSON.stringify({ ok: true, id: inserted.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

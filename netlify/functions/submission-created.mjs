// Runs on every verified Netlify Forms submission. For coaching enquiries it
// sends the prospect the same confirmation Lovable used to send, once an email
// service is connected: set RESEND_API_KEY (and verify the sending domain in
// Resend). Without it this does nothing, and Ian's copy comes from Netlify's own
// form notification emails (Forms → Submission notifications in Netlify).
export const handler = async (event) => {
  const { payload } = JSON.parse(event.body || '{}');
  if (!payload || payload.form_name !== 'coaching-enquiry') return { statusCode: 200 };
  const key = process.env.RESEND_API_KEY;
  const d = payload.data || {};
  if (!key || !d.email) return { statusCode: 200 };
  const from = process.env.EMAIL_FROM || 'GMHGM <noreply@notify.gmhgm.com>';
  const esc = (t) => String(t || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const name = (d.name || '').trim();
  const html = `<div style="font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.6;color:#1a1a1a;max-width:520px">
    <h1 style="font-size:22px;margin:0 0 16px">${name ? `Thanks, ${esc(name)}.` : 'Thanks for reaching out.'}</h1>
    <p>We've received your coaching enquiry. Ian will review it personally and get back to you within a few days to see if it's the right fit.</p>
    <p>In the meantime, take a breath. Showing up here is already a step.</p>
    <p style="margin-top:24px">The GMHGM Team</p></div>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [d.email], subject: "We've received your coaching enquiry", html }),
  });
  if (!res.ok) console.error('Confirmation email failed', res.status, await res.text());
  return { statusCode: 200 };
};

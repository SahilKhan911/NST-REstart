import { Resend } from "resend";

let client: Resend | null = null;

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  if (!client) client = new Resend(key);
  return client;
}

const FROM = process.env.RESEND_FROM_EMAIL ?? "NST Restart <onboarding@resend.dev>";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendAnswerEmail(opts: {
  to: string;
  askerName: string;
  category: string;
  question: string;
  answer: string;
  answeredBy: string;
  whatsappUrl: string;
}) {
  const subject = `Your question about ${opts.category} — answered`;

  const text = [
    `Hi ${opts.askerName},`,
    "",
    `You asked on the NST Restart channel "${opts.category}":`,
    `> ${opts.question}`,
    "",
    `Answer (from ${opts.answeredBy}):`,
    opts.answer,
    "",
    `Want a real-time, unfiltered conversation with current NST students?`,
    `Join the WhatsApp Restart group: ${opts.whatsappUrl}`,
    "",
    "— Newton School of Technology · Restart",
  ].join("\n");

  const html = `
  <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0B1623;">
    <div style="background:#0B1623;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
      <div style="font-size:13px;opacity:.7;letter-spacing:.08em;text-transform:uppercase;">NST Restart · ${escapeHtml(opts.category)}</div>
      <div style="font-size:20px;font-weight:600;margin-top:4px;">Your question has been answered</div>
    </div>
    <div style="border:1px solid #E5E9EF;border-top:none;border-radius:0 0 12px 12px;padding:24px;background:#fff;">
      <p style="margin:0 0 12px;">Hi ${escapeHtml(opts.askerName)},</p>
      <p style="margin:0 0 8px;color:#4A5568;font-size:14px;">You asked:</p>
      <blockquote style="margin:0 0 16px;padding:12px 16px;background:#F5F7FA;border-left:3px solid #FF6B35;border-radius:6px;white-space:pre-wrap;">${escapeHtml(opts.question)}</blockquote>
      <p style="margin:0 0 8px;color:#4A5568;font-size:14px;">Answer (from <strong>${escapeHtml(opts.answeredBy)}</strong>):</p>
      <div style="margin:0 0 24px;padding:14px 16px;background:#0B1623;color:#E9EDEF;border-radius:8px;line-height:1.55;white-space:pre-wrap;">${escapeHtml(opts.answer)}</div>
      <a href="${escapeHtml(opts.whatsappUrl)}" style="display:inline-block;background:#00A884;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:600;">Join the WhatsApp Restart group →</a>
      <p style="margin:24px 0 0;color:#8696A0;font-size:12px;line-height:1.5;">Restart is a counselling community where prospective students and parents talk directly with current NST students. Live sessions are scheduled regularly.</p>
    </div>
  </div>
  `;

  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject,
    text,
    html,
  });
  if (error) throw error;
  return data;
}

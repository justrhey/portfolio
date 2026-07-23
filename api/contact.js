import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Per-IP sliding window: 3 submissions per minute. Only enabled when Upstash
// is configured; falls back to no limit locally so dev works without keys.
function getRatelimit() {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "60 s"),
    prefix: "contact",
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";

  // Rate limit first — cheapest rejection for spam bursts.
  const ratelimit = getRatelimit();
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return res
        .status(429)
        .json({ error: "Too many requests. Please try again in a minute." });
    }
  }

  const body = req.body ?? {};
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();
  // Honeypot: real users never fill this hidden field. Silently accept bots.
  const honeypot = String(body.website ?? "").trim();
  if (honeypot) return res.status(200).json({ ok: true });

  if (
    !name ||
    name.length > 100 ||
    !EMAIL_RE.test(email) ||
    email.length > 200 ||
    company.length > 120 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return res.status(400).json({
      error:
        "Please add your name, a valid email, and a message of at least 10 characters.",
    });
  }

  const to = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!to || !apiKey) {
    return res
      .status(503)
      .json({ error: "Contact form is not configured yet." });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Message from ${name}${company ? ` · ${company}` : ""}`,
      text:
        `New enquiry via the portfolio contact form\n\n` +
        `Name:    ${name}\n` +
        `Email:   ${email}\n` +
        `Company: ${company || "—"}\n\n` +
        `${message}\n`,
    });
    if (error) throw error;
  } catch {
    return res
      .status(502)
      .json({ error: "Could not send right now. Please try again later." });
  }

  return res.status(200).json({ ok: true });
}

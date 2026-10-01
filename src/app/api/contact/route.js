import nodemailer from "nodemailer";

// Sends the Contact and Request-a-Quote forms over SMTP on Node.js hosts
// (Vercel, and `npm run dev`). The static Hostinger build can't run this and
// uses public/contact-mail.php instead — keep the two in step.
// Credentials come from environment variables (see .env.example).
export const runtime = "nodejs";

const NAME = (v) => /^(?=.{2,40}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(v);
// last name may be just an initial, e.g. "S"
const LAST_NAME = (v) => /^(?=.{1,40}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(v);
const EMAIL = (v) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v);
const MESSAGE = (v) => v.length >= 10 && v.length <= 2000;

const FORMS = {
  contact: {
    subject: "New Trade Enquiry — Samrat Global India website",
    required: ["firstName", "lastName", "email", "phone", "subject", "message"],
    fields: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      subject: "Enquiry subject",
      message: "Message",
    },
    rules: {
      firstName: NAME,
      lastName: LAST_NAME,
      email: EMAIL,
      // 10-digit Indian mobile
      phone: (v) => /^[6-9]\d{9}$/.test(v),
      message: MESSAGE,
    },
  },
  quote: {
    subject: "New Quote Request — Samrat Global India website",
    required: ["name", "company", "email", "phone", "enquiry", "product", "quantity", "destination", "message"],
    fields: {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone / WhatsApp",
      enquiry: "Enquiry type",
      product: "Product",
      quantity: "Quantity",
      destination: "Destination",
      message: "Message",
    },
    rules: {
      name: NAME,
      email: EMAIL,
      // international: optional +, 7-15 digits with spaces/dashes/brackets
      phone: (v) => /^\+?[\d\s()-]+$/.test(v) && /^\d{7,15}$/.test(v.replace(/\D/g, "")),
      message: MESSAGE,
    },
  },
};

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Built per request (cheap) so changed credentials apply without a restart.
const getTransporter = () => {
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // 465 = implicit TLS; 587 upgrades with STARTTLS
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
};

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const form = FORMS[body?.form];
  if (!form) {
    return Response.json({ ok: false, error: "Unknown form." }, { status: 400 });
  }

  // Hidden honeypot field: people never fill it, bots usually do. Pretend success.
  if (body._honey) return Response.json({ ok: true });

  const values = {};
  for (const key of Object.keys(form.fields)) {
    const v = body[key];
    values[key] = typeof v === "string" ? v.trim().slice(0, 5000) : "";
  }

  const missing = form.required.find((key) => !values[key]);
  const invalid = Object.entries(form.rules).find(([key, isValid]) => values[key] && !isValid(values[key]));
  if (missing || invalid) {
    const label = form.fields[missing || invalid[0]];
    const error = missing ? `${label} is required.` : `Please check the ${label.toLowerCase()} field.`;
    return Response.json({ ok: false, error }, { status: 400 });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("Contact form: SMTP_HOST / SMTP_USER / SMTP_PASS are not set");
    return Response.json({ ok: false, error: "Email is not configured." }, { status: 500 });
  }

  const rows = Object.entries(form.fields).filter(([key]) => values[key]);
  const text = rows.map(([key, label]) => `${label}: ${values[key]}`).join("\n");
  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([key, label]) =>
        `<tr><th align="left" style="background:#EAF1FF;border:1px solid #d6e2f5;white-space:nowrap">${label}</th><td style="border:1px solid #d6e2f5;white-space:pre-wrap">${escapeHtml(values[key])}</td></tr>`
    )
    .join("")}</table>`;

  try {
    await getTransporter().sendMail({
      // Providers reject a From other than the login, so the visitor goes in Reply-To.
      from: `"Samrat Global India Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: values.email,
      subject: form.subject,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form: SMTP send failed:", err);
    return Response.json({ ok: false, error: "Could not send your message." }, { status: 502 });
  }
}

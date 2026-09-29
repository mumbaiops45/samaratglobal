"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,

  Globe2,
  Handshake,
  Hospital,
  IndianRupee,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Pill,
  Plus,
  ReceiptText,
  Scissors,
  Send,
  ShieldCheck,
  Ship,
  Store,
  Factory,
  UtensilsCrossed,
  Users,
  Warehouse,
  Truck,
  PackageCheck,
  Anchor,
  AlertCircle,
} from "lucide-react";
import { Reveal, cardReveal, ScrollZoom } from "./Reveal";
import { cards, faqs } from "../../data/data";
import { PRODUCT_CATEGORIES } from "@/data/productCategories";

// Home-page sections in the order the client asked for:
// About Us → … → Global Markets → Why Choose Us → Certifications &
// Compliance → Logistics & Supply Chain → Clients → Request a Quote.

const Eyebrow = ({ children, icon: Icon, dark = false }) => (
  <span
    className={`mb-4 inline-flex items-center gap-2 rounded-sm border px-3.5 py-1.5 text-xs font-mono uppercase ${
      dark ? "border-white/20 bg-white/5 text-secondary" : "border-primary/25 bg-primary/5 text-primary"
    }`}
  >
    {Icon && <Icon className="h-3.5 w-3.5" />}
    {children}
  </span>
);

const SectionHeader = ({ eyebrow, icon, title, accent, text, dark = false, center = true, accentClass = "grad-text", slide = 0 }) => (
  <div className={`mb-12 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
    <Reveal x={slide}>
      <Eyebrow icon={icon} dark={dark}>
        {eyebrow}
      </Eyebrow>
    </Reveal>
    <Reveal x={slide} as="h2" delay={0.08} className={`h2 ${dark ? "text-white" : "text-slate-900"}`}>
      {title} <span className={accentClass}>{accent}</span>
    </Reveal>
    {text && (
      <Reveal x={slide}
        as="p"
        delay={0.16}
        className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}
      >
        {text}
      </Reveal>
    )}
  </div>
);

/* ------------------------------------------------------------------ */
/* About Us                                                            */
/* ------------------------------------------------------------------ */

export const AboutUs = () => {
  const who = cards[1];
  return (
    <section className="relative overflow-hidden bg-[#F5F9FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative h-[280px] overflow-hidden rounded-sm border border-slate-200 shadow-xl sm:h-[360px] lg:h-[460px]">
            <ScrollZoom>
              <img
                src="/agriculture.webp"
                alt="Container ship loading at an Indian port"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </ScrollZoom>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F]/40 to-transparent" />
          </div>
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-sm bg-white px-4 py-3 shadow-xl sm:left-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-white">
              <Ship className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold leading-tight text-slate-900">
              Import · Export
              <span className="block text-xs font-medium text-slate-500">Sourcing from India</span>
            </span>
          </div>
        </motion.div>

        <div>
          <Reveal x={70}>
            <Eyebrow icon={Building2}>About Us</Eyebrow>
          </Reveal>
          <Reveal x={70} as="h2" delay={0.08} className="h2 mb-5 text-slate-900">
            Samrat Global India <span className="grad-text">Private Limited</span>
          </Reveal>
          <Reveal x={70} delay={0.16} className="text-base leading-relaxed text-slate-600 sm:text-lg">
            {who.body}
          </Reveal>
          <Reveal x={70} delay={0.22} className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {who.stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-primary">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">{s.label}</div>
              </div>
            ))}
          </Reveal>
          <Reveal x={70} delay={0.28} className="mt-8">
            <Link href="/about-us" className="btn btn-primary">
              More About Us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Global Markets                                                      */
/* ------------------------------------------------------------------ */

// Regions and what goes there, taken from the destinations already listed
// on the Products page.
const MARKETS = [
  { region: "Middle East", ships: "Basmati rice, spices, steel & equipment" },
  { region: "Europe", ships: "Rice, spices, tea, cotton & herbs" },
  { region: "United Kingdom", ships: "Premium tea & food products" },
  { region: "USA & Americas", ships: "Rice, spices, chillies & cotton" },
  { region: "Southeast Asia", ships: "Steel, tea, cotton & machinery" },
  { region: "Africa", ships: "Food commodities & equipment" },
];

export const GlobalMarkets = () => (
  <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
      <div className="relative order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.85, rotate: -8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-full shadow-[0_20px_80px_-10px_rgba(9,72,207,0.45)] ring-8 ring-[#EAF1FF]"
        >
          <img src="/about_vision.jpg" alt="Earth seen from space, centred on India" loading="lazy" className="h-full w-full scale-[1.2] object-cover" />
        </motion.div>
        <Reveal
          delay={0.3}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg"
        >
          <MapPin className="h-4 w-4" />
          Shipping from India to 6 regions
        </Reveal>
      </div>

      <div className="order-1 lg:order-2">
        <SectionHeader
          slide={70}
          center={false}
          icon={Globe2}
          eyebrow="Global Markets"
          title="Markets"
          accent="We Serve"
          text="From Indian ports to buyers across six regions — by sea or air, with the documents each market requires."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {MARKETS.map((m, i) => (
            <motion.div
              key={m.region}
              {...cardReveal(i, 2)}
              className="flex items-start gap-3 rounded-sm border border-slate-100 bg-[#F5F9FF] p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white hover:shadow-lg"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Globe2 className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">{m.region}</h3>
                <p className="mt-0.5 text-sm text-slate-600">{m.ships}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Why Choose Us                                                       */
/* ------------------------------------------------------------------ */

const REASONS = [
  { icon: ShieldCheck, title: "Verified Suppliers", body: "We work with manufacturers we have checked for capacity, quality and reliability." },
  { icon: ClipboardCheck, title: "Quality Checked", body: "Every order is inspected against your specifications before it is dispatched." },
  { icon: IndianRupee, title: "Competitive Pricing", body: "Direct sourcing from producers keeps costs down and pricing transparent." },
  { icon: Clock3, title: "On-Time Shipments", body: "Production follow-up and early freight booking to meet your delivery dates." },
  { icon: FileText, title: "Complete Documentation", body: "Invoices, packing lists, certificates and shipping papers prepared correctly." },
  { icon: Handshake, title: "One Point of Contact", body: "A single team handles your order from enquiry to delivery, with clear updates." },
];

export const WhyChooseUs = () => (
  <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <SectionHeader
        icon={BadgeCheck}
        eyebrow="Why Choose Us"
        title="Why Buyers Trust"
        accent="Samrat Global India"
        text="What you can expect on every import and export order."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            {...cardReveal(i, 3)}
            className="group relative overflow-hidden rounded-sm border border-slate-100 bg-[#F5F9FF] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl sm:p-7"
          >
            <span className="absolute right-5 top-4 text-5xl font-black text-primary/5 transition-colors group-hover:text-primary/10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-to-br from-primary to-[#0E7490] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-600">{body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Certifications & Compliance                                         */
/* ------------------------------------------------------------------ */

const COMPLIANCE = [
  {
    icon: Building2,
    title: "Registered Private Limited Company",
    detail: "CIN U52292MR2026PTC478348",
    body: "Incorporated in India under the Ministry of Corporate Affairs.",
  },
  {
    icon: ReceiptText,
    title: "GST Registered",
    detail: "GSTIN 27ABUCS3200J1Z3",
    body: "Registered for GST in Maharashtra for domestic and export invoicing.",
  },
  {
    icon: BadgeCheck,
    title: "Product Certificates",
    detail: "Supplied where applicable",
    body: "Supplier certificates such as FSSAI, ISO, GMP or organic, depending on the product.",
  },
  {
    icon: FileText,
    title: "Export Documentation",
    detail: "Prepared for every shipment",
    body: "Commercial invoice, packing list, certificate of origin and, for agro products, phytosanitary certificates.",
  },
];

export const Certifications = () => (
  <section className="relative overflow-hidden bg-[#EAF1FF] py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <SectionHeader
        icon={ShieldCheck}
        eyebrow="Certifications & Compliance"
        title="Registered, Compliant"
        accent="& Export Ready"
        text="A legally registered Indian company, with the paperwork your shipment and your customs broker need."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {COMPLIANCE.map(({ icon: Icon, title, detail, body }, i) => (
          <motion.div
            key={title}
            {...cardReveal(i, 4)}
            className="flex flex-col rounded-sm border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/5 text-primary">
              <Icon className="h-7 w-7" strokeWidth={1.7} />
            </div>
            <h3 className="font-bold text-slate-900">{title}</h3>
            <p className="mt-1 break-all text-xs font-semibold uppercase tracking-wider text-primary">{detail}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Logistics & Supply Chain                                            */
/* ------------------------------------------------------------------ */

const LOGISTICS = [
  { icon: Ship, image: "/commercial.jpg", title: "Sea Freight", body: "Full container (FCL) and shared container (LCL) shipments from Indian ports." },
  { icon: Anchor, image: "/service_delivery.jpg", title: "Port & Customs", body: "Customs clearance support, shipping documents and port coordination." },
  { icon: PackageCheck, image: "/service_wholesale.jpg", title: "Export Packing", body: "Export-grade cartons, palletising and labelling to protect goods in transit." },
  { icon: Truck, image: "/sourcetransport.jpg", title: "Warehousing & Transport", body: "Storage and inland transport from the supplier's factory to the port." },
];

export const Logistics = () => (
  <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <SectionHeader
        icon={Warehouse}
        eyebrow="Logistics & Supply Chain"
        title="From Factory Floor"
        accent="to Final Destination"
        text="We manage the supply chain behind every order — packing, transport, freight and paperwork — so your goods arrive safely and on time."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {LOGISTICS.map(({ icon: Icon, image, title, body }, i) => (
          <motion.div
            key={title}
            {...cardReveal(i, 4)}
            className="group overflow-hidden rounded-sm border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-44 overflow-hidden">
              <ScrollZoom delay={(i % 4) * 0.12}>
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </ScrollZoom>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F]/70 to-transparent" />
              <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-white shadow-lg">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Clients / Testimonials                                              */
/* ------------------------------------------------------------------ */

const INDUSTRIES = [
  { icon: Pill, label: "Pharma & Nutraceutical" },
  { icon: UtensilsCrossed, label: "Food & Beverage" },
  { icon: Hospital, label: "Hospitals & Laboratories" },
  { icon: Scissors, label: "Textile Mills" },
  { icon: Factory, label: "Manufacturing & Engineering" },
  { icon: Store, label: "Retail & Distribution" },
];

// Add real client reviews here ({ quote, name, company, country }). The
// testimonial cards appear automatically once this list has entries.
const TESTIMONIALS = [];

export const Clients = () => (
  <section className="relative overflow-hidden bg-[#F5F9FF] py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <SectionHeader
        icon={Users}
        eyebrow="Our Clients"
        title="Industries"
        accent="We Serve"
        text="We supply businesses across these sectors in India and overseas."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {INDUSTRIES.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            {...cardReveal(i, 6)}
            className="group flex flex-col items-center rounded-sm border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
          >
            <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              <Icon className="h-6 w-6" strokeWidth={1.7} />
            </span>
            <span className="text-sm font-semibold leading-snug text-slate-800">{label}</span>
          </motion.div>
        ))}
      </div>

      {TESTIMONIALS.length > 0 && (
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure key={t.name} {...cardReveal(i, 3)} className="rounded-sm border border-slate-100 bg-white p-6 shadow-sm">
              <blockquote className="text-sm leading-relaxed text-slate-600">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-bold text-slate-900">
                {t.name}
                <span className="block text-xs font-medium text-slate-500">
                  {t.company}, {t.country}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      )}
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Request a Quote                                                     */
/* ------------------------------------------------------------------ */

const field =
  "w-full rounded-sm border border-slate-200 bg-[#F4F9FF] px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 transition-colors focus:border-primary focus:bg-white focus:outline-none sm:text-sm";

// The server re-checks the same rules in src/app/api/contact/route.js.
const QUOTE_NAME_RE = /^(?=.{2,40}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/;
const QUOTE_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
// buyers are worldwide: optional +, then 7-15 digits with spaces/dashes/brackets
const QUOTE_PHONE_RE = /^\+?[\d\s()-]+$/;
const QUOTE_MESSAGE_MIN = 10;

const validateQuote = (d) => {
  const errors = {};
  if (!d.name) errors.name = "Name is required";
  else if (!QUOTE_NAME_RE.test(d.name)) errors.name = "Use letters only, at least 2";
  if (!d.company) errors.company = "Company name is required";
  else if (d.company.length < 2) errors.company = "Please enter your company name";
  if (!d.email) errors.email = "Email is required";
  else if (!QUOTE_EMAIL_RE.test(d.email)) errors.email = "Please enter a valid email address";
  const digits = d.phone.replace(/\D/g, "");
  if (!d.phone) errors.phone = "Phone / WhatsApp is required";
  else if (!QUOTE_PHONE_RE.test(d.phone) || digits.length < 7 || digits.length > 15)
    errors.phone = "Enter a valid number, e.g. +91 98765 43210";
  if (!d.enquiry) errors.enquiry = "Please choose an option";
  if (!d.product) errors.product = "Please choose a product category";
  if (!d.quantity) errors.quantity = "Quantity is required";
  if (!d.destination) errors.destination = "Destination is required";
  else if (d.destination.length < 2) errors.destination = "Please enter a country or port";
  if (!d.message) errors.message = "Message is required";
  else if (d.message.length < QUOTE_MESSAGE_MIN)
    errors.message = `Please add a little more detail (at least ${QUOTE_MESSAGE_MIN} characters)`;
  return errors;
};

// Filters an input as the visitor types, keeping the cursor where it was
// (overwriting .value on every keystroke otherwise throws it to the end).
const keepOnly = (clean) => (e) => {
  const el = e.currentTarget;
  const next = clean(el.value);
  if (next === el.value) return;
  const caret = Math.max(0, el.selectionStart - (el.value.length - next.length));
  el.value = next;
  el.setSelectionRange(caret, caret);
};

const FieldError = ({ msg }) =>
  msg ? (
    <p className="mt-1.5 flex items-start gap-1 text-xs font-semibold text-red-500">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>{msg}</span>
    </p>
  ) : null;

export const RequestQuote = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // swap (not add) the border colour, otherwise the grey one wins
  const fieldCls = (key) => (errors[key] ? field.replace("border-slate-200", "border-red-500") : field);
  const clearError = (e) => {
    const { name } = e.target;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(
      [...new FormData(form)].map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
    );
    const found = validateQuote(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      const el = form.querySelector(`[name="${first}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await axios.post("/api/contact", { form: "quote", ...data });
      if (!res.data.ok) throw new Error(res.data.error);
      setStatus("sent");
      form.reset();
    } catch (err) {
      // a 400 from the server carries a readable reason; anything else is a send failure
      setServerError(err.response?.status === 400 ? err.response.data?.error : "");
      setStatus("error");
    }
  };

  return (
    <section id="quote" className="relative overflow-hidden bg-[#EAF1FF] py-16 sm:py-20 lg:py-24">
      {/* soft light-blue glow shapes */}
      <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <SectionHeader
            slide={-70}
            center={false}
            icon={Send}
            eyebrow="Request a Quote"
            title="Tell Us What"
            accent="You Need"
            text="Share the product, quantity and destination — our trade team will reply with a quotation, usually within 24 hours."
          />
          <Reveal x={-70} delay={0.2} className="space-y-4">
            {[
              { icon: Phone, label: "Call / WhatsApp", value: "+91 98209 03853", href: "tel:+919820903853" },
              { icon: Mail, label: "Email", value: "info@samratglobalindia.com", href: "mailto:info@samratglobalindia.com" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="group flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-primary text-white shadow-md transition-transform group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-slate-500">{label}</span>
                  <span className="break-all font-semibold text-slate-900 group-hover:text-primary">{value}</span>
                </span>
              </a>
            ))}
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-sm border border-slate-100 bg-white p-6 shadow-xl sm:p-8"
        >
          {status === "sent" ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="mb-4 h-14 w-14 text-primary" />
              <h3 className="text-2xl font-bold text-slate-900">Thank you!</h3>
              <p className="mt-2 max-w-sm text-slate-600">
                Your quote request has been sent. Our team will get back to you shortly.
              </p>
              <button type="button" onClick={() => setStatus("idle")} className="btn btn-primary mt-6">
                Send another request
              </button>
            </div>
          ) : (
            // noValidate: our own inline messages replace the browser's pop-up bubbles
            <form onSubmit={handleSubmit} onChange={clearError} noValidate className="grid gap-4 sm:grid-cols-2">
              {/* spam trap for bots — hidden from people */}
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <div>
                <input
                  name="name"
                  placeholder="Your name *"
                  autoComplete="name"
                  maxLength={40}
                  aria-invalid={!!errors.name}
                  // letters and single spaces only, as the visitor types
                  onInput={keepOnly((v) =>
                    v.replace(/[^a-zA-Z\s]/g, "").replace(/^\s+/, "").replace(/\s{2,}/g, " ")
                  )}
                  className={fieldCls("name")}
                />
                <FieldError msg={errors.name} />
              </div>
              <div>
                <input
                  name="company"
                  placeholder="Company name *"
                  autoComplete="organization"
                  maxLength={80}
                  aria-invalid={!!errors.company}
                  className={fieldCls("company")}
                />
                <FieldError msg={errors.company} />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  aria-invalid={!!errors.email}
                  className={fieldCls("email")}
                />
                <FieldError msg={errors.email} />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone / WhatsApp *"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={20}
                  aria-invalid={!!errors.phone}
                  // digits, spaces, + - ( ) only
                  onInput={keepOnly((v) => v.replace(/[^\d\s()+-]/g, ""))}
                  className={fieldCls("phone")}
                />
                <FieldError msg={errors.phone} />
              </div>
              <div>
                <select name="enquiry" defaultValue="" aria-invalid={!!errors.enquiry} className={fieldCls("enquiry")}>
                  <option value="" disabled>
                    I want to… *
                  </option>
                  <option>Buy / Import from India</option>
                  <option>Import to India</option>
                  <option>Use a Sourcing Agent</option>
                </select>
                <FieldError msg={errors.enquiry} />
              </div>
              <div>
                <select name="product" defaultValue="" aria-invalid={!!errors.product} className={fieldCls("product")}>
                  <option value="" disabled>
                    Product category *
                  </option>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c.id}>{c.label}</option>
                  ))}
                  <option>Other</option>
                </select>
                <FieldError msg={errors.product} />
              </div>
              <div>
                <input
                  name="quantity"
                  placeholder="Quantity (e.g. 1 x 20ft container) *"
                  maxLength={100}
                  aria-invalid={!!errors.quantity}
                  className={fieldCls("quantity")}
                />
                <FieldError msg={errors.quantity} />
              </div>
              <div>
                <input
                  name="destination"
                  placeholder="Destination country / port *"
                  maxLength={100}
                  aria-invalid={!!errors.destination}
                  className={fieldCls("destination")}
                />
                <FieldError msg={errors.destination} />
              </div>
              <div className="sm:col-span-2">
                <textarea
                  name="message"
                  rows={4}
                  maxLength={2000}
                  placeholder="Product details, specifications, packing… *"
                  aria-invalid={!!errors.message}
                  className={fieldCls("message")}
                />
                <FieldError msg={errors.message} />
              </div>
              {status === "error" && (
                <p className="text-sm text-red-600 sm:col-span-2">
                  {serverError || "Something went wrong. Please try again or email us at globalhead29@gmail.com."}
                </p>
              )}
              <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60 sm:col-span-2">
                {status === "sending" ? "Sending…" : "Request a Quote"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* FAQs — moved from the home page to the Contact page                 */
/* ------------------------------------------------------------------ */

export const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  return (
    <section className="relative overflow-hidden bg-[#EAF1FF] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeader
            slide={-70}
            center={false}
            icon={Leaf}
            eyebrow="Frequently Asked Questions"
            title="Import & Export"
            accent="FAQs"
            text="Answers to common questions about our sourcing, import and export services."
          />
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div key={index} {...cardReveal(index, 1)}>
                <div
                  className={`overflow-hidden rounded-sm border bg-white transition-all duration-500 ${
                    isOpen ? "border-primary/40 shadow-lg" : "border-slate-200 hover:border-primary/25"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-sm font-bold transition-colors duration-300 ${
                        isOpen ? "bg-gradient-to-br from-primary to-[#0E7490] text-white" : "bg-primary/5 text-primary"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 pt-1.5 text-sm font-semibold text-slate-800 sm:text-base lg:text-lg">{faq.q}</span>
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-primary/30 text-primary transition-all duration-500 ${
                        isOpen ? "rotate-45 bg-primary/10" : "rotate-0"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <div className="border-t border-slate-100 py-4 pl-[4.25rem] pr-6 sm:pl-[4.75rem] sm:pr-14">
                          <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

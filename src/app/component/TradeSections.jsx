"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Ship,
  PackageOpen,
  SearchCheck,
  FileCheck2,
  MessageSquareText,
  Factory,
  ClipboardCheck,
  Package,
  Globe2,
} from "lucide-react";
import { PRODUCT_CATEGORIES, productCategoryHref } from "@/data/productCategories";
import { Reveal, Stagger, cardReveal, ScrollZoom } from "./Reveal";

// Home-page sections that make the import–export business explicit:
// what we do, what we export, and how an export order runs.

const Eyebrow = ({ children, dark = false }) => (
  <span
    className={`mb-4 inline-flex items-center gap-2 rounded-sm border px-3.5 py-1.5 text-xs font-mono uppercase ${
      dark ? "border-white/20 bg-white/5 text-secondary" : "border-primary/25 bg-primary/5 text-primary"
    }`}
  >
    {children}
  </span>
);

const SERVICES = [
  {
    icon: Ship,
    title: "Export from India",
    body: "We supply quality Indian products to buyers worldwide — sourced, inspected, packed and shipped to your port.",
  },
  {
    icon: PackageOpen,
    title: "Import to India",
    body: "We help Indian businesses import machinery, equipment and raw materials from trusted overseas suppliers.",
  },
  {
    icon: SearchCheck,
    title: "Sourcing Agent",
    body: "Your buying agent in India: we find verified manufacturers, compare quotes, arrange samples and follow up production.",
  },
  {
    icon: FileCheck2,
    title: "Logistics & Documentation",
    body: "Export packing, shipping documents, freight booking and delivery coordination — handled end to end.",
  },
];

export const WhatWeDo = () => (
  <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <Reveal>
          <Eyebrow>
            <Globe2 className="h-3.5 w-3.5" />
            Import / Export Overview
          </Eyebrow>
        </Reveal>
        <Reveal as="h2" delay={0.08} className="h2 text-slate-900">
          Your Import &amp; Export <span className="grad-text">Partner in India</span>
        </Reveal>
        <Reveal as="p" delay={0.16} className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          One partner for the whole trade — from finding the right supplier to delivering at your destination.
        </Reveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            {...cardReveal(i, 4)}
            className="group rounded-sm border border-slate-100 bg-[#F5F9FF] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-xl sm:p-7"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-primary text-white shadow-md transition-transform duration-300 group-hover:scale-105">
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

// Card image + one-line pitch for each product category.
const CATEGORY_CARDS = {
  medicinal: { image: "/productimages/lakadong-turmeric.jpg", blurb: "Pharma-grade herbs & extracts from North East India" },
  spices: { image: "/SpicesHerbs.jpg", blurb: "Cardamom, pepper, turmeric, chillies & more" },
  food: { image: "/basmatirice.jpg", blurb: "Basmati rice, premium tea & food commodities" },
  textiles: { image: "/cotton.webp", blurb: "Raw cotton for international textile mills" },
  process: { image: "/productimages/steel/ss-pipeline.jpg", blurb: "Blenders, reactors, tanks, filters & pipelines" },
  cleanroom: { image: "/productimages/steel/clean-room-panel-door.jpg", blurb: "Air showers, pass boxes, LAF & panel doors" },
  handling: { image: "/productimages/steel/heavy-duty-rack.jpg", blurb: "Conveyors, racks, trolleys, lockers & lifts" },
  lab: { image: "/productimages/steel/ss-containers.jpg", blurb: "Samplers, scoops, containers & QC tools" },
  fabrication: { image: "/productimages/steel/ss-automatic-sliding-gate.jpg", blurb: "SS furniture, gates, bins & custom fabrication" },
  metal: { image: "/metals.jpg", blurb: "Steel billets & industrial metals" },
  industrial: { image: "/heavymachine.webp", blurb: "Industrial machinery & equipment" },
};

// Two rows on the home page at every width (2x2 phone/tablet, 2x3 laptop,
// 2x4 desktop); the full range is one click away on the Products page.
const HOME_CATEGORY_ORDER = ["medicinal", "process", "spices", "cleanroom", "food", "handling", "lab", "textiles"];
const HOME_CATEGORIES = HOME_CATEGORY_ORDER.map((id) => PRODUCT_CATEGORIES.find((c) => c.id === id));

// What Indian businesses import through us. Photos are the client's own.
const IMPORT_CARDS = [
  {
    title: "Industrial Machinery",
    image: "/heavymachine.webp",
    blurb: "Production machinery & heavy equipment from global manufacturers",
    href: productCategoryHref("industrial"),
  },
  {
    title: "Process & Packaging Machines",
    image: "/packing.jpg",
    blurb: "Packaging lines, process machines & spare parts for Indian plants",
    href: "/contact",
  },
  {
    title: "Raw Materials & Components",
    image: "/service_product.jpg",
    blurb: "Industrial inputs & components sourced to your specification",
    href: "/contact",
  },
];

const TABS = [
  { id: "export", label: "Export Products", icon: Ship },
  { id: "import", label: "Import Products", icon: PackageOpen },
];

const ProductCard = ({ href, image, title, blurb, cta, index, className = "" }) => (
  <motion.div {...cardReveal(index, 4)} className={`flex ${className}`}>
    <Link
      href={href}
      className="group flex w-full flex-col overflow-hidden rounded-sm border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
    >
      <div className="relative h-32 overflow-hidden bg-white sm:h-48">
        <ScrollZoom delay={(index % 4) * 0.12}>
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </ScrollZoom>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary sm:text-lg">
          {title}
        </h3>
        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary sm:mt-4 sm:text-sm">
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  </motion.div>
);

export const WhatWeExport = () => {
  const [tab, setTab] = useState("export");
  return (
  <section className="relative overflow-hidden bg-[#EAF1FF] py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Reveal x={-70}>
            <Eyebrow>
              <Package className="h-3.5 w-3.5" />
              Our Products
            </Eyebrow>
          </Reveal>
          <Reveal x={-70} as="h2" delay={0.08} className="h2 text-slate-900">
            Import &amp; Export <span className="grad-text">Products</span>
          </Reveal>
          <Reveal x={-70} as="p" delay={0.16} className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Quality Indian products for buyers worldwide, and the machinery and materials Indian businesses need from abroad.
          </Reveal>
        </div>
        <Reveal x={70} delay={0.2} className="shrink-0">
          <div role="tablist" className="inline-flex rounded-sm border border-slate-200 bg-white p-1 shadow-sm">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`relative flex items-center gap-2 rounded-sm px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5 ${
                  tab === id ? "text-white" : "text-slate-600 hover:text-primary"
                }`}
              >
                {tab === id && (
                  <motion.span
                    layoutId="product-tab"
                    className="absolute inset-0 rounded-sm bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
        >
          {tab === "export"
            ? HOME_CATEGORIES.map((cat, i) => (
                <ProductCard
                  key={cat.id}
                  index={i}
                  href={productCategoryHref(cat.id)}
                  image={CATEGORY_CARDS[cat.id].image}
                  title={cat.label}
                  blurb={CATEGORY_CARDS[cat.id].blurb}
                  cta="View products"
                  className={i >= 6 ? "hidden xl:flex" : i >= 4 ? "hidden lg:flex" : ""}
                />
              ))
            : [
                ...IMPORT_CARDS.map((c, i) => (
                  <ProductCard key={c.title} index={i} {...c} cta="Enquire now" />
                )),
                <motion.div key="import-cta" {...cardReveal(3, 4)} className="flex">
                  <Link
                    href="/contact"
                    className="group flex w-full flex-col items-center justify-center rounded-sm border-2 border-dashed border-primary/30 bg-white/60 p-5 text-center transition-colors hover:border-primary hover:bg-white"
                  >
                    <PackageOpen className="mb-3 h-10 w-10 text-primary" strokeWidth={1.5} />
                    <h3 className="text-sm font-bold text-slate-900 sm:text-lg">Need something else?</h3>
                    <p className="mt-1.5 text-xs text-slate-600 sm:text-sm">Tell us what you want to import — we&apos;ll source it.</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary sm:text-sm">
                      Contact us <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </motion.div>,
              ]}
        </motion.div>
      </AnimatePresence>

      <Reveal className="mt-10 flex justify-center">
        <Link href="/product" className="btn btn-primary">
          View All Products &amp; Categories
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </div>
  </section>
  );
};

const STEPS = [
  { icon: MessageSquareText, title: "Enquiry & Requirements", body: "Share the product, specifications, quantity and destination port." },
  { icon: Factory, title: "Sourcing & Samples", body: "We shortlist verified suppliers, send quotations and arrange samples." },
  { icon: ClipboardCheck, title: "Quality Inspection", body: "Goods are checked against your specifications before dispatch." },
  { icon: Package, title: "Packing & Documentation", body: "Export-grade packing, invoices, packing lists and shipping documents." },
  { icon: Ship, title: "Shipping & Delivery", body: "Freight booked by sea or air and tracked through to your destination." },
];

const stepItem = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const ExportProcess = () => {

  return (
  <section className="relative overflow-hidden bg-[#F5F9FF] py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <Reveal>
          <Eyebrow>
            <Ship className="h-3.5 w-3.5" />
            How We Work
          </Eyebrow>
        </Reveal>
        <Reveal as="h2" delay={0.08} className="h2 text-slate-900">
          From Enquiry to <span className="grad-text">Your Port</span>
        </Reveal>
        <Reveal as="p" delay={0.16} className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          A simple, transparent process for every export order.
        </Reveal>
      </div>

      <Stagger as="ol" gap={0.18} className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {/* connecting line behind the step numbers on large screens — draws left to right */}
        <motion.span
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.4, ease: "easeInOut" } } }}
          style={{ originX: 0 }}
          className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 lg:block"
        />
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <motion.li key={title} variants={stepItem} className="relative flex flex-col items-center text-center">
            <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/20 bg-white text-primary shadow-lg">
              <Icon className="h-6 w-6" strokeWidth={1.8} />
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                {i + 1}
              </span>
            </div>
            <h3 className="mb-2 text-base font-bold text-slate-900">{title}</h3>
            <p className="max-w-xs text-sm leading-relaxed text-slate-600">{body}</p>
          </motion.li>
        ))}
      </Stagger>

      <Reveal delay={0.2} className="mt-14 flex justify-center">
        <Link href="#quote" className="btn btn-primary">
          Request an Export Quote
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </div>
  </section>
  );
};

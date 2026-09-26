"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight, Building2, ReceiptText } from "lucide-react";

const BRAND = {
  ink: "#0A1A3F",
  surface: "#0A1A2C",
  steel: "#15304A",
  cyan: "#0948CF",
  cyanDeep: "#0948CF",
  azure: "#0948CF",
  azureDeep: "#0948CF",
  mist: "#EAF1FF",
  slate: "#8FA6BE",
};

const GRAD_LOGO = "linear-gradient(90deg, #0948CF, #05FCFB)";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Services", href: "/service" },
  { name: "Product", href: "/product" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

const SERVICES = [
  { name: "Sourcing & Procurement", href: "/service#sourcing" },
  { name: "Global Fulfillment & Export", href: "/service#international-shipping" },
  { name: "Domestic Distribution", href: "/service#domestic-distribution" },
  { name: "Supplier Management", href: "/service#supplier-management" },
  { name: "Logistics Solutions", href: "/service#logistics" },
];

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    title: "Our Office",
    href: "https://www.google.com/maps/search/?api=1&query=Office+No+11+The+Signature+Ganesh+Mandir+Road+Dombivli+East+Maharashtra+421201",
    lines: [
      "Office No. 11, Ground Floor, The Signature Building",
      "Ganesh Mandir Road, Dombivli East",
      "Maharashtra 421201",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    href: "tel:+919920220309",
    lines: ["+91 99202 20309"],
  },
  {
    icon: Mail,
    title: "Email Us",
    href: "mailto:info@samratglobalindia.com",
    lines: ["info@samratglobalindia.com"],
  },
];

const REGISTRATIONS = [
  { icon: Building2, label: "CIN", value: "U52292MR2026PTC478348" },
  { icon: ReceiptText, label: "GSTIN", value: "27ABUCS3200J1Z3" },
];


const ColumnHeading = ({ children }) => (
  <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
    {children}
  </h4>
);

const NavList = ({ items, onItemClick }) => (
  <ul className="space-y-1">
    {items.map((item) => (
      <li key={item.name}>
        <Link
          href={item.href}
          onClick={onItemClick?.(item)}
          className="group inline-flex items-center py-1 text-sm text-slate-300 transition-all duration-300 hover:translate-x-1.5 hover:text-white"
        >
          <span
            className="mr-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:mr-3 group-hover:w-4"
            style={{ background: GRAD_LOGO }}
          />
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

const ContactCard = ({ item }) => {
  const Icon = item.icon;
  const isExternal = item.href.startsWith("http");

  return (
    <a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-start gap-3 rounded-xl border border-transparent p-1.5 transition-all duration-300 hover:border-white/[0.06] hover:bg-white/[0.025]"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
        style={{ borderColor: `${BRAND.cyan}30`, backgroundColor: `${BRAND.cyan}0b` }}
      >
        <Icon
          size={17}
          strokeWidth={1.7}
          style={{ color: BRAND.cyan }}
          className="transition-colors duration-300 group-hover:text-white"
        />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <p
          className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: `${BRAND.cyan}cc` }}
        >
          {item.title}
        </p>
        <div className="text-[13px] leading-5 text-slate-300 transition-colors duration-300 group-hover:text-white">
          {item.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </div>
      </div>

      <ArrowUpRight
        size={14}
        className="mt-1 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        style={{ color: BRAND.cyan }}
      />
    </a>
  );
};

const RegistrationItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Icon size={15} strokeWidth={1.7} className="shrink-0 text-slate-400" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        {item.label}
      </span>
      <span className="break-all text-[13px] font-medium text-slate-200">
        {item.value}
      </span>
    </div>
  );
};


const Footer = () => {
  const pathname = usePathname();

  const scrollToTop = (e) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


  const quickLinkHandler = (item) => (item.name === "Home" ? scrollToTop : undefined);

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: BRAND.ink }}>
      <div className="h-[2px] w-full" style={{ background: GRAD_LOGO }} />

      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-24 sm:px-8 sm:pt-11 lg:px-10 lg:py-12">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1.05fr_1.35fr] lg:gap-8 xl:gap-12"
        >
          <motion.div variants={fadeUp} className="self-start">
            <Link href="/" onClick={scrollToTop} className="group inline-flex items-center rounded-sm bg-white p-2.5 shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
              <img
                src="/logofinal.jpeg"
                alt="Samrat Global India Private Limited"
                width={280}
                height={115}
                className="h-[70px] w-auto max-w-full object-contain object-left sm:h-[80px]"
              />
            </Link>

            <p className="mt-5 max-w-sm text-xl font-bold leading-6 text-slate-300">
              Samrat Global India
            </p>
            <p className="mt-0.5 max-w-sm text-sm leading-6 text-slate-300">
              Trusted sourcing, procurement &amp; export partner helping businesses connect with
              global markets.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-[2px] w-10 rounded-full" style={{ background: GRAD_LOGO }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                Global • Reliable • Connected
              </span>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="self-start">
            <ColumnHeading>Quick Links</ColumnHeading>
            <NavList items={QUICK_LINKS} onItemClick={quickLinkHandler} />
          </motion.div>
          <motion.div variants={fadeUp} className="self-start">
            <ColumnHeading>Our Services</ColumnHeading>
            <NavList items={SERVICES} />
          </motion.div>
          <motion.div variants={fadeUp} className="self-start">
            <ColumnHeading>Contact Us</ColumnHeading>
            <div className="space-y-2">
              {CONTACT_ITEMS.map((item) => (
                <ContactCard key={item.title} item={item} />
              ))}
            </div>
          </motion.div>
        </motion.div>
        {/* Full-width row so the Contact column stays the same height as the
            others instead of leaving a large gap under them. */}
        <div
          className="mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3"
          style={{ borderColor: `${BRAND.mist}12` }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
            Company Registration
          </p>
          {REGISTRATIONS.map((item) => (
            <RegistrationItem key={item.label} item={item} />
          ))}
        </div>
        <div className="mt-7 border-t pt-5" style={{ borderColor: `${BRAND.mist}12` }}>
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:text-sm md:flex-row">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Samrat Global India Private Limited. All Rights Reserved.
            </p>
            <p className="text-center md:text-right">
              Developed by{" "}
              <a
                href="https://www.nakshatranamahacreations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="-my-2 inline-block py-2 font-semibold transition-colors duration-300 hover:text-white"
                style={{ color: BRAND.cyan }}
              >
                Nakshatra Namaha Creations
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client"
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight, Globe2 } from "lucide-react";
import { usePathname } from "next/navigation";

const BRAND = {
  ink: "#050B14",
  surface: "#0A1A2C",
  steel: "#15304A",
  cyan: "#22D3EE",
  cyanDeep: "#06B6D4",
  azure: "#2E6BFF",
  azureDeep: "#1E40AF",
  mist: "#F5F9FF",
  slate: "#8FA6BE",
};
const GRAD_LOGO = `linear-gradient(90deg, ${BRAND.azure}, ${BRAND.cyan})`;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const Footer = () => {
  const pathname = usePathname();
  const handleHomeClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();

      const hero = document.getElementById("hero");

      if (hero) {
        hero.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }
  const services = [
    { name: "Sourcing & Procurement", href: "/service#sourcing" },
    { name: "Global Fulfillment & Export", href: "/service#international-shipping" },
    { name: "Domestic Distribution", href: "/service#domestic-distribution" },
    { name: "Supplier Management", href: "/service#supplier-management" },
    { name: "Logistics Solutions", href: "/service#logistics" },
  ];

  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/service" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
  ];

  const contactItems = [
    {
      icon: MapPin,
      href: "https://www.google.com/maps/search/?api=1&query=3+B+Wing+Kurkeja+Complex+LBS+Marg+Bhandup+West+Mumbai+Maharashtra+400078",
      content: (
        <>
          3, B Wing, Kurkeja Complex,
          <br />
          L.B.S. Marg, Bhandup (West),
          <br />
          Mumbai, Maharashtra 400078
        </>
      ),
    },
    {
      icon: Phone,
      href: "tel:+919820423852",
      content: "+91 98204 23852",
    },
    {
      icon: Mail,
      href: "mailto:info@thesamratglobal.com",
      content: "info@thesamratglobal.com",
    },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: BRAND.ink }}>
      <div className="h-[2px] w-full" style={{ background: GRAD_LOGO }} />
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full blur-[140px]" style={{ backgroundColor: `${BRAND.azure}1a` }} />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full blur-[140px]" style={{ backgroundColor: `${BRAND.cyan}1a` }} />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.1fr_1.2fr]"
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo-.png"
                alt="Samrat Global"
                className="h-20 w-[180px]"
              />
            </div>

            <p className="text-sm leading-7" style={{ color: BRAND.slate }}>
              A trusted sourcing and export partner from India, connecting
              global markets with quality products, reliable solutions, and
              seamless supply chains.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-wider" style={{ borderColor: `${BRAND.cyan}40`, backgroundColor: `${BRAND.cyan}0f`, color: BRAND.cyan }}>
              <Globe2 size={14} />
              <span>Serving clients worldwide</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="mb-6 text-lg font-bold uppercase tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={item.name === "Home" ? handleHomeClick : undefined}
                    className="group flex items-center text-sm transition-all duration-300 hover:translate-x-1.5"
                    style={{ color: BRAND.slate }}
                  >
                    <span
                      className="mr-0 h-[2px] w-0 transition-all duration-300 group-hover:mr-3 group-hover:w-4"
                      style={{ background: GRAD_LOGO }}
                    />
                    <span className="transition-colors duration-300 group-hover:text-white">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="mb-6 text-lg font-bold uppercase tracking-wide text-white">
              Our Services
            </h4>
            <ul className="space-y-4">
              {services.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-sm transition-all duration-300 hover:translate-x-1.5"
                    style={{ color: BRAND.slate }}
                  >
                    <span
                      className="mr-0 h-[2px] w-0 transition-all duration-300 group-hover:mr-3 group-hover:w-4"
                      style={{ background: GRAD_LOGO }}
                    />
                    <span className="transition-colors duration-300 group-hover:text-white">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="mb-6 text-lg font-bold uppercase tracking-wide text-white">
              Contact Us
            </h4>
            <div className="space-y-5">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4"
                  >
                    <div
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110"
                      style={{ borderColor: `${BRAND.cyan}40`, backgroundColor: `${BRAND.cyan}12` }}
                    >
                      <Icon size={18} style={{ color: BRAND.cyan }} className="transition-colors group-hover:text-white" />
                    </div>
                    <p
                      className="text-sm leading-6 pt-2.5 transition-colors duration-300 group-hover:text-white"
                      style={{ color: BRAND.slate }}
                    >
                      {item.content}
                    </p>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
        <div className="mt-10 border-t pt-6" style={{ borderColor: `${BRAND.mist}14` }}>
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row" style={{ color: BRAND.slate }}>
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Samrat Global. All Rights Reserved.
            </p>
            <p className="text-center md:text-right">
              Developed by{" "}
              <a
                href="https://www.nakshatranamahacreations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors duration-300"
                style={{ color: BRAND.cyan }}
              >
                Nakshatra Namaha Creation
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
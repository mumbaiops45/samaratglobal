"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {MapPin,Phone,Mail,ArrowUpRight,ReceiptText,Building2} from "lucide-react";
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
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
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
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About Us",
      href: "/about-us",
    },
    {
      name: "Services",
      href: "/service",
    },
    {
      name: "Product",
      href: "/product",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];


  const services = [
    {
      name: "Sourcing & Procurement",
      href: "/service#sourcing",
    },
    {
      name: "Global Fulfillment & Export",
      href: "/service#international-shipping",
    },
    {
      name: "Domestic Distribution",
      href: "/service#domestic-distribution",
    },
    {
      name: "Supplier Management",
      href: "/service#supplier-management",
    },
    {
      name: "Logistics Solutions",
      href: "/service#logistics",
    },
  ];

 
  const contactItems = [
    {
      icon: MapPin,
      title: "Our Office",
      href: "https://www.google.com/maps/search/?api=1&query=Office+No+11+The+Signature+Ganesh+Mandir+Road+Dombivli+East+Maharashtra+421201",
      content: (
        <>
          <span className="block">Office No. 11, Ground Floor</span>
          <span className="block">
            Ganesh Mandir Road, Dombivli East,
          </span>
          <span className="block">Maharashtra 421201</span>
        </>
      ),
    },
    {
      icon: Phone,
      title: "Call Us",
      href: "tel:+919920220309",
      content: "+91 99202 20309",
    },
    {
      icon: Mail,
      title: "Email Us",
      href: "mailto:info@samratglobalindia.com",
      content: "info@samratglobalindia.com",
    },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: BRAND.ink,
      }}
    >
      <div
        className="h-[2px] w-full"
        style={{
          background: GRAD_LOGO,
        }}
      />

      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[320px] w-[320px] rounded-full blur-[120px]"
        style={{
          backgroundColor: `${BRAND.azure}18`,
        }}
      />

      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[320px] w-[320px] rounded-full blur-[120px]"
        style={{
          backgroundColor: `${BRAND.cyan}18`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-11 lg:px-10 lg:py-12">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            margin: "-10%",
          }}
          className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1.05fr_1.35fr] lg:gap-8 xl:gap-12"
        >
          <motion.div
            variants={fadeUp}
            className="self-start"
          >
            <Link
              href="/"
              onClick={handleHomeClick}
              className="group inline-flex items-center"
            >
              <img
                src="/logo-.png"
                alt="Samrat Global India Private Limited"
                className="h-[105px] w-auto max-w-full object-contain object-left transition-transform duration-500 group-hover:scale-[1.02] sm:h-[115px]"
              />
            </Link>

            <p className="mt-[-2px] max-w-sm text-sm leading-6 text-slate-300">
              A trusted sourcing and export partner from India,
              connecting global markets with quality products,
              reliable solutions, and seamless supply chains.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span
                className="h-[2px] w-10 rounded-full"
                style={{
                  background: GRAD_LOGO,
                }}
              />
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Global • Reliable • Connected
              </span>
            </div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="self-start"
          >
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={
                      item.name === "Home"
                        ? handleHomeClick
                        : undefined
                    }
                    className="group inline-flex items-center text-sm text-slate-300 transition-all duration-300 hover:translate-x-1.5 hover:text-white"
                  >
                    <span
                      className="mr-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:mr-3 group-hover:w-4"
                      style={{
                        background: GRAD_LOGO,
                      }}
                    />

                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="self-start"
          >
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Our Services
            </h4>

            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center text-sm text-slate-300 transition-all duration-300 hover:translate-x-1.5 hover:text-white"
                  >
                    <span
                      className="mr-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:mr-3 group-hover:w-4"
                      style={{
                        background: GRAD_LOGO,
                      }}
                    />

                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="self-start"
          >
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Contact Us
            </h4>
            <div className="space-y-2">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                const isExternal =
                  item.href.startsWith("http");

                return (
                  <a
                    key={index}
                    href={item.href}
                    target={
                      isExternal ? "_blank" : undefined
                    }
                    rel={
                      isExternal
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-start gap-3 rounded-xl border border-transparent p-1.5 transition-all duration-300 hover:border-white/[0.06] hover:bg-white/[0.025]"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105"
                      style={{
                        borderColor: `${BRAND.cyan}30`,
                        backgroundColor: `${BRAND.cyan}0b`,
                      }}
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.7}
                        style={{
                          color: BRAND.cyan,
                        }}
                        className="transition-colors duration-300 group-hover:text-white"
                      />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p
                        className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]"
                        style={{
                          color: `${BRAND.cyan}cc`,
                        }}
                      >
                        {item.title}
                      </p>
                      <div className="text-[13px] leading-5 text-slate-300 transition-colors duration-300 group-hover:text-white">
                        {item.content}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="mt-1 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      style={{
                        color: BRAND.cyan,
                      }}
                    />
                  </a>
                );
              })}
            </div>
            <div
              className="mt-5 border-t pt-4"
              style={{
                borderColor: `${BRAND.mist}10`,
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-px w-5 rounded-full"
                  style={{
                    background: GRAD_LOGO,
                  }}
                />

                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Company Registration
                </p>
              </div>

              <div className="space-y-2">
                {/* CIN */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: `${BRAND.cyan}20`,
                      backgroundColor: `${BRAND.cyan}07`,
                    }}
                  >
                    <Building2
                      size={13}
                      strokeWidth={1.7}
                      style={{
                        color: BRAND.cyan,
                      }}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-slate-500">
                      CIN
                    </p>

                    <p className="text-[11px] leading-4 text-slate-300">
                      U52292MR2026PTC478348
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: `${BRAND.cyan}20`,
                      backgroundColor: `${BRAND.cyan}07`,
                    }}
                  >
                    <ReceiptText
                      size={13}
                      strokeWidth={1.7}
                      style={{
                        color: BRAND.cyan,
                      }}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-slate-500">
                      GSTIN
                    </p>

                    <p className="text-[11px] leading-4 text-slate-300">
                      27ABUCS3200J1Z3
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <div
          className="mt-8 border-t pt-5"
          style={{
            borderColor: `${BRAND.mist}12`,
          }}
        >
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:text-sm md:flex-row">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Samrat Global India
              Private Limited. All Rights Reserved.
            </p>
            <p className="text-center md:text-right">
              Developed by{" "}
              <a
                href="https://www.nakshatranamahacreations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors duration-300 hover:text-white"
                style={{
                  color: BRAND.cyan,
                }}
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

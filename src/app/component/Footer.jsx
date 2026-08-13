"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
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
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
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
      }
    }
  };

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
      name: "Team",
      href: "/team",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  const contactItems = [
    {
      icon: MapPin,
      href: "https://www.google.com/maps?q=OFF+NO+11+THE+SIGNATURE+GANESH+MANDIR+Dombivli+Kalyan+Thane+421201+Maharashtra&output=embed",
      content: (
        <>
          <span className="block">OFF NO 11 THE SIGNATURE,</span>
          <span className="block">GANESH MANDIR, Dombivali, Kalyan,</span>
          <span className="block">Thane- 421201, Maharashtra</span>
        </>
      ),
    },
    {
      icon: Phone,
      href: "tel:+919920220309",
      content: "+91 9920220309",
    },
    {
      icon: Mail,
      href: "mailto:info@samratglobalindia.com",
      content: "info@samratglobalindia.com",
    },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: BRAND.ink }}
    >
      <div className="h-[2px] w-full" style={{ background: GRAD_LOGO }}/>
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full blur-[140px]"
        style={{ backgroundColor: `${BRAND.azure}1a` }}/>
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full blur-[140px" style={{ backgroundColor: `${BRAND.cyan}1a` }}/>
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 md:py-16 lg:px-10 lg:py-20">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            margin: "-10%",
          }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_1.15fr_1.35fr] lg:gap-10 xl:gap-16"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start"
          >
            <Link
              href="/"
              onClick={handleHomeClick}
              className="inline-flex items-center"
            >
              <img
                src="/logo-.png"
                alt="Samrat Global India Private Limited"
                className="h-[150px] w-auto max-w-full object-contain object-left"
              />
            </Link>
            <p className="mt-[-10px] max-w-sm text-md text-slate-100 leading-7" >
              A trusted sourcing and export partner from India, connecting
              global markets with quality products, reliable solutions, and
              seamless supply chains.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="eyebrow mb-2 text-lg text-bold text-white">
              Quick Links
            </h4>

            <ul className="space-y-4">
              {links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={
                      item.name === "Home"
                        ? handleHomeClick
                        : undefined
                    }
                    className="group inline-flex items-center text-sm text-slate-100 transition-all duration-300 hover:translate-x-1.5"
                  >
                    <span className="mr-0 h-[2px] w-0 transition-all duration-300 group-hover:mr-3 group-hover:w-4"
                      style={{ background: GRAD_LOGO }}
                    />
                    <span className="transition-colors duration-300 group-hover:text-slate-200">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="eyebrow mb-2 text-lg text-white">
              Our Services
            </h4>

            <ul className="space-y-4">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center text-sm text-slate-100 transition-all duration-300 hover:translate-x-1.5"
                   
                  >
                    <span className="mr-0 h-[2px] w-0 transition-all duration-300 group-hover:mr-3 group-hover:w-4"
                      style={{ background: GRAD_LOGO }}
                    />
                    <span className="transition-colors duration-300 group-hover:text-slate-200">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h4 className="eyebrow mb-2 text-lg text-white">
              Contact Us
            </h4>

            <div className="space-y-5">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                const isExternal = item.href.startsWith("http");
                return (
                  <a
                    key={index}
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={
                      isExternal
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-start gap-4"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105"
                      style={{
                        borderColor: `${BRAND.cyan}40`,
                        backgroundColor: `${BRAND.cyan}12`,
                      }}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        style={{ color: BRAND.cyan }}
                        className="transition-colors duration-300 group-hover:text-slate-100"
                      />
                    </div>
                    <p className="min-w-0 pt-1 text-sm leading-6 transition-colors text-slate-100 duration-300 group-hover:text-slate-200">
                      {item.content}
                    </p>

                    <ArrowUpRight
                      size={15}
                      className="ml-auto mt-1 flex-shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      style={{ color: BRAND.cyan }}
                    />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-4 border-t pt-6 md:mt-4"
          style={{
            borderColor: `${BRAND.mist}14`,
          }}
        >
          <div className="flex flex-col items-center justify-between gap-4 text-slate-100 text-xs sm:text-sm md:flex-row"
            
          >
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Samrat Global India Private Limited. All Rights Reserved.
            </p>

            <p className="text-center md:text-right">
              Developed by{" "}
              <a
                href="https://www.nakshatranamahacreations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors duration-300 hover:text-black"
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

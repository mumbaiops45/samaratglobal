"use client"
import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {

  const services = [
    {
      name: "Sourcing & Procurement",
      href: "/service",
    }, {
      name: "Global Fulfillment & Export",
      href: "/service",
    },
    {
      name: "Domestic Distribution",
      href: "/service",
    },
    {
      name: "Supplier Management",
      href: "/service",
    },
    {
      name: "Logistics Solutions",
      href: "/service"
    }
  ];


  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/service" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-black">
      <div className="relative mx-auto  max-w-7xl px-6 py-20">
        <div className="relative mb-20 overflow-hidden rounded-[36px] border border-white/10 bg-gray-50 px-8 py-12 lg:px-14">
          <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-gradient-to-r from-amber-400/15 to-yellow-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[4px] text-amber-300 backdrop-blur-xl">
                ✦ Let's Connect
              </span>
              <h2 className="mt-6 text-4xl font-bold leading-tight text-black md:text-5xl">
                Ready to grow your{" "}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                  global business?
                </span>
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-gray-950">
                Partner with Samrat Global for reliable sourcing,
                seamless exports and trusted business solutions
                connecting India with global markets.
              </p>
            </div>
            <Link
              href="/contact"
              className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500 px-8 py-4 font-semibold text-[#08111f] shadow-[0_15px_40px_rgba(249,115,22,0.45)] transition-all duration-300 hover:shadow-[0_20px_55px_rgba(249,115,22,0.6)]"
            >
              Get A Quote
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
        <div className="grid gap-12  md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-6 text-3xl text-white font-bold">
              SAMRAT
              <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                GLOBAL
              </span>
            </h3>
            <p className="leading-8 text-gray-300">
              A trusted sourcing and export partner from India,
              connecting global markets with quality products,
              reliable solutions and seamless supply chains.
            </p>
            <div className="mt-6 flex gap-4">
              {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <div
                  key={index}
                  className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:bg-gradient-to-r hover:from-orange-400 hover:to-yellow-500"
                >
                  <Icon
                    size={18}
                    className="text-white transition group-hover:text-[#08111f]"
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-6 text-xl font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-gray-300 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="mr-2 h-[2px] w-0 bg-gradient-to-r from-orange-400 to-yellow-500 transition-all duration-300 group-hover:w-5" />
                    <span className="transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xl font-semibold text-white">
              Our Services
            </h4>
            <ul className="space-y-4">
              {services.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-gray-300 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="mr-2 h-[2px] w-0 bg-gradient-to-r from-orange-400 to-yellow-500 transition-all duration-300 group-hover:w-5" />
                    <span className="transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-xl font-semibold text-white">
              Contact Us
            </h4>
            <div className="space-y-5">
              <a
                href="https://www.google.com/maps/search/?api=1&query=3+B+Wing+Kurkeja+Complex+LBS+Marg+Bhandup+West+Mumbai+Maharashtra+400078"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 rounded-xl transition-all duration-300"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10">
                  <MapPin
                    size={20}
                    className="text-orange-400 transition group-hover:text-yellow-400"
                  />
                </div>
                <p className="text-sm leading-6 text-gray-300 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">
                  3, B Wing, Kurkeja Complex,
                  L.B.S. Marg, Bhandup (West),
                  Mumbai, Maharashtra,
                  India - 400078
                </p>
              </a>
              <a
                href="tel:+919820423852"
                className="group flex items-center gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10">
                  <Phone
                    size={20}
                    className="text-orange-400 transition group-hover:text-yellow-400"
                  />
                </div>
                <span className="text-gray-300 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">
                  +91 98204 23852
                </span>
              </a>
              <a
                href="mailto:info@thesamratglobal.com"
                className="group flex items-center gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-orange-400/10">
                  <Mail
                    size={20}
                    className="text-orange-400 transition group-hover:text-yellow-400"
                  />
                </div>
                <span className="text-gray-300 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent">
                  info@thesamratglobal.com
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-300 md:flex-row">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Samrat Global. All Rights Reserved.
            </p>
            <p className="text-center md:text-right">
              Developed by{" "}
              <a
                href="https://www.nakshatranamahacreations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-orange-400 transition-all duration-300 hover:text-yellow-400"
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
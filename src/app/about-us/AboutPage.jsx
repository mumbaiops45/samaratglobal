"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGlobe,
  FaAward,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaBuilding,
  FaBullseye,
  FaEye,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";
import { TECH_SECTIONS, commitments, cards } from "../../data/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 500, suffix: "+", label: "Clients Served", icon: <FaUsers /> },
  { value: 50, suffix: "+", label: "Countries", icon: <FaGlobe /> },
  { value: 15, suffix: "+", label: "Years of Experience", icon: <FaAward /> },
  { value: 100, suffix: "%", label: "Customer Satisfaction", icon: <FaStar /> },
];

// Founder gets a full feature block; the rest of the leadership sits in a
// lighter grid below it — no full-bleed "poster" photos anywhere.
const founder = {
  name: "Arun Pandey",
  role: "Founder & Director",
  image: "/arun.jpeg",
  bio: "Arun Pandey founded Samrat Global India with a simple goal — make international sourcing dependable, transparent and easy to work with. He sets the company's direction across sourcing, procurement and export operations, with a strong personal focus on supplier relationships and quality-first processes.",
};

const leadership = [
  {
    name: "JayKumar Sinha",
    role: "Co-Founder & Director",
    image: "/JayKumar.jpeg",
    bio: "Drives brand strategy and market development, helping the company build long-term trade partnerships across international markets.",
  },
  {
    name: "Rajeev Paul",
    role: "Chief Executive Officer",
    image: "/rajiv.jpeg",
    bio: "Leads day-to-day business operations, turning strategic goals into consistent, dependable outcomes for clients worldwide.",
  },
  {
    name: "Lalita Pandey",
    role: "Co-Founder & Director",
    image: "/lalita.jpeg",
    bio: "Focuses on supplier coordination and operational excellence, ensuring the smooth movement of goods from source to destination.",
  },
];

// Mission / Vision / Quality / Supply Chain / Customer-First — same data
// the homepage scroll-spy uses, presented here as tabs for a different feel.
const pillarTabs = TECH_SECTIONS.slice(1);

const AboutPage = () => {
  const counterRefs = useRef([]);
  const lineRef = useRef(null);
  const processRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  counterRefs.current = [];

  const addCounterRef = (el) => {
    if (el && !counterRefs.current.includes(el)) counterRefs.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const suffix = stats[i].suffix;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val) + suffix;
          },
        });
      });

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: processRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const activePillar = pillarTabs[activeTab];
  const ActiveIcon = activePillar?.icon;

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-secondary/30">
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0A1A3F]">
        <div className="absolute inset-0 opacity-65">
          <img src="/about.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/40 to-[#0A1A3F]/15" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="h1 max-w-3xl text-white">
              A Global Sourcing &amp; <span className="grad-text">Export Partner</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg">
              Samrat Global India provides global sourcing and export solutions designed to
              help businesses source products, manage procurement, and access international
              markets with confidence — built around reliability, quality and long-term
              partnerships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-slate-100 bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-primary/5 text-lg text-primary">
                  {stat.icon}
                </div>
                <div ref={addCounterRef} className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  0{stat.suffix}
                </div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE — split image/text, real PDF content */}
      <section className="bg-[#EAF1FF] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-sm border border-slate-200 shadow-xl">
              <img
                src="/SamratGlobal.jpg"
                alt="Samrat Global India operations"
                className="h-[380px] w-full object-cover md:h-[440px]"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-sm bg-gradient-to-r from-primary to-secondary px-6 py-4 text-white shadow-lg sm:-right-6">
              <p className="text-2xl font-bold">15+</p>
              <p className="text-xs">Years of Experience</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Who We Are</p>
            <h2 className="h2 mb-6 text-slate-900">
              Samrat Global <span className="grad-text">India</span>
            </h2>
            <p className="text-base leading-relaxed text-slate-600 md:text-lg">
              Samrat Global India is a <strong className="text-slate-900">Sourcing and Export Company</strong> providing
              sourcing, procurement and international trade support. We connect businesses
              with suitable suppliers and products while coordinating the movement of goods
              from source to destination.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Our customer-first approach makes international sourcing simpler, transparent
              and dependable — built around three principles: reliability, quality, and
              long-term partnerships.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Global Trade", "Export & Sourcing", "Customer First"].map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  <FaCheckCircle className="text-primary" /> {b}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION / VISION / QUALITY / SUPPLY CHAIN / CUSTOMER-FIRST — tabbed */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 max-w-2xl"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">What Drives Us</p>
            <h2 className="h2 text-slate-900">
              Our <span className="grad-text">Purpose &amp; Principles</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
            {pillarTabs.map((tab, index) => {
              const isActive = index === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`rounded-sm px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center"
            >
              <div>
                <div className="mb-4 flex items-center gap-3">
                  {ActiveIcon && (
                    <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary/5 text-primary">
                      <ActiveIcon className="h-5 w-5" />
                    </div>
                  )}
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {activePillar?.subtitle}
                  </span>
                </div>
                <h3 className="h3 mb-4 text-slate-900">{activePillar?.title}</h3>
                <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                  {activePillar?.description}
                </p>

                {activePillar?.telemetry && (
                  <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6">
                    {Object.values(activePillar.telemetry).map((t, i) => (
                      <div key={i}>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          {t.label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-primary">{t.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative h-[300px] overflow-hidden rounded-sm border border-slate-200 shadow-lg md:h-[360px]">
                <img
                  src={activePillar?.image}
                  alt={activePillar?.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CORE COMMITMENTS — horizontal timeline, distinct from home's stacked list */}
      <section ref={processRef} className="relative overflow-hidden bg-[#0A1A3F] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Why Choose Us</p>
            <h2 className="h2 text-white">
              Core <span className="grad-text">Commitments</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute top-[26px] left-[8%] right-[8%] hidden h-[2px] bg-white/10 md:block">
              <div ref={lineRef} className="h-full w-full origin-left bg-gradient-to-r from-primary to-secondary" style={{ transform: "scaleX(0)" }} />
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {commitments.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white shadow-lg">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="h4 mt-5 text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER — proper editorial layout, no poster-style full-bleed image */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14 max-w-2xl"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Leadership</p>
            <h2 className="h2 text-slate-900">
              Meet Our <span className="grad-text">Founder &amp; Director</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid items-center gap-10 rounded-sm border border-slate-100 bg-[#EAF1FF] p-6 shadow-sm md:grid-cols-[380px_1fr] md:gap-12 md:p-10"
          >
            <div className="mx-auto aspect-[1402/1122] w-full overflow-hidden rounded-sm border-4 border-white shadow-lg">
              <img src={founder.image} alt={founder.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="h3 text-slate-900">{founder.name}</h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-wider text-primary">{founder.role}</p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                {founder.bio}
              </p>
            </div>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {leadership.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 rounded-sm border border-slate-100 bg-white p-5 shadow-sm"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-16 w-16 shrink-0 rounded-sm object-cover object-top"
                />
                <div className="min-w-0">
                  <h4 className="h5 text-slate-900">{member.name}</h4>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{member.role}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href="/team" className="btn btn-outline">
              View Full Team <FaArrowRight className="text-xs" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[#062A8F] py-20">
        <div className="absolute inset-0 opacity-15">
          <img src="/ship.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
          <h2 className="h2 mb-4 text-white">
            Ready to Build a <span className="text-secondary">Reliable Trade Partnership?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/80 md:text-lg">
            Partner with Samrat Global India for dependable sourcing, procurement and export
            solutions built around your business goals.
          </p>
          <a href="/contact" className="btn bg-white text-primary hover:-translate-y-0.5 transition-transform">
            Get In Touch <FaArrowRight className="text-xs" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

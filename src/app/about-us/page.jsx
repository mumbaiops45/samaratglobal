"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGlobe, FaShippingFast, FaHandshake, FaAward, FaUsers, FaRocket, FaCheckCircle, FaStar, FaBuilding, FaBullseye, FaEye, FaShieldAlt, FaHeart, FaCogs, FaQuoteLeft, FaArrowRight } from "react-icons/fa";
import { MdVerified, MdOutlineVerifiedUser } from "react-icons/md";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


const page = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const badgeRowRef = useRef(null);
  const counterRefs = useRef([]);

  counterRefs.current = [];

  const addCounterRef = (el) => {
    if (el && !counterRefs.current.includes(el)) {
      counterRefs.current.push(el);
    }
  };

  const teamMembers = [
    {
      name: "Arun Pandey",
      role: "Director",
      image: "/arnun.jpg",
      description: "Visionary leader with 20+ years of experience in global trade",
      expertise: "Strategic Planning",
    },
    {
      name: "Jay Kumar Sinha",
      role: "Marketing Head",
      image: "/jay.jpg",
      description: "Marketing expert driving brand excellence worldwide",
      expertise: "Brand Strategy",
    },
    {
      name: "Vibu Kumar Nair",
      role: "Overseas Head",
      image: "/vibu.jpg",
      description: "International trade specialist with global network",
      expertise: "Global Partnerships",
    },
    {
      name: "R R Mishra",
      role: "Logistics Head",
      image: "/rrmishra.jpg",
      description: "Supply chain expert ensuring seamless operations",
      expertise: "Logistics Management",
    },
  ];

  const stats = [
    { value: 500, suffix: "+", label: "Clients Served", icon: <FaUsers /> },
    { value: 50, suffix: "+", label: "Countries", icon: <FaGlobe /> },
    { value: 15, suffix: "+", label: "Years Excellence", icon: <FaAward /> },
    { value: 100, suffix: "%", label: "Client Satisfaction", icon: <FaStar /> },
  ];

  const coreValues = [
    {
      icon: <MdOutlineVerifiedUser className="text-4xl text-[#00D2FF]" />,
      title: "Quality You Can Trust",
      description:
        "Consistent, strict quality control across sourcing, inspection, and export.",
      gradient: "from-[#00D2FF]/20 to-[#0052D4]/10",
      borderColor: "hover:border-[#00D2FF]",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-[#0072FF]" />,
      title: "Reliable Supply Chain",
      description:
        "Processes designed for continuity, cost-effectiveness and customer satisfaction.",
      gradient: "from-[#0072FF]/20 to-[#0A2540]/10",
      borderColor: "hover:border-[#0072FF]",
    },
    {
      icon: <FaHeart className="text-4xl text-[#00D2FF]" />,
      title: "Customer First Policy",
      description:
        "Service that aims to exceed expectations and build long-term global partnerships.",
      gradient: "from-[#60EFFF]/20 to-[#0072FF]/10",
      borderColor: "hover:border-[#60EFFF]",
    },
  ];

  const services = [
    { icon: <FaGlobe />, title: "Global Sourcing", desc: "Premium products from trusted suppliers worldwide" },
    { icon: <FaShippingFast />, title: "Import/Export", desc: "Seamless cross-border trade solutions" },
    { icon: <FaHandshake />, title: "Procurement", desc: "Strategic procurement for your business" },
    { icon: <FaRocket />, title: "Trade Consulting", desc: "Expert guidance for international trade" },
    { icon: <FaCogs />, title: "Logistics", desc: "Efficient supply chain management" },
    { icon: <FaShieldAlt />, title: "Quality Assurance", desc: "Rigorous quality control processes" },
  ];

  const testimonials = [
    {
      quote:
        "Samrat Global has been an exceptional partner. Their commitment to quality and reliability is unmatched.",
      author: "John Smith",
      role: "CEO, Global Trading Co.",
    },
    {
      quote:
        "The professionalism and expertise of the Samrat Global team made our international expansion seamless.",
      author: "Sarah Johnson",
      role: "Director, International Foods",
    },
    {
      quote:
        "We trust Samrat Global for all our sourcing needs. They consistently deliver beyond expectations.",
      author: "Michael Chen",
      role: "VP Operations, Asia Imports",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(badgeRef.current, { opacity: 0, y: -20, duration: 0.6 })
        .from(headingRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=0.3")
        .from(paragraphRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(badgeRowRef.current?.children || [], { opacity: 0, y: 15, stagger: 0.1, duration: 0.5 }, "-=0.3");

      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const suffix = stats[i].suffix;
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val) + suffix;
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F9FF] text-[#0A2540] overflow-x-hidden font-sans selection:bg-[#00D2FF]/30">
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-[#0A2540] via-[#0D3156] to-[#0A2540] py-20 md:py-22">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00D2FF]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#0052D4]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(#0052D4 0.8px, transparent 0.8px), linear-gradient(90deg, #0052D4 0.8px, transparent 0.8px)`,
              backgroundSize: "60px 60px",
              opacity: 0.05,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:gap-16">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <div ref={badgeRef} className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md sm:gap-2.5 sm:px-5 sm:py-2.5"
              >
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#00D2FF] sm:h-2.5 sm:w-2.5" />
                <span className="truncate text-[10px] font-bold uppercase tracking-[1.5px] text-[#00D2FF] sm:text-xs sm:tracking-[2px] md:text-sm">
                  Welcome to Samrat Global
                </span>
              </div>

              <h1 ref={headingRef} className="mt-6 max-w-5xl text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:mt-7
          sm:text-4xl md:text-5xl lg:mt-8 lg:text-6xl xl:text-7xl">
                Vision,{" "}
                <span className="mt-1 block bg-gradient-to-r from-[#00D2FF] via-[#60EFFF] to-[#00D2FF] bg-clip-text text-transparent sm:mt-2">
                  Mission & Values
                </span>
              </h1>
              <p ref={paragraphRef} className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:mt-6 sm:text-base sm:leading-7 md:mt-7 md:text-lg md:leading-8 lg:text-xl">
                Learn about Samrat Global, an India-based sourcing and export company
                focused on premium quality, reliability, and customer-first trade
                partnerships worldwide.
              </p>

              <div ref={badgeRowRef} className="mt-7 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
                {[
                  {
                    icon: <MdVerified className="text-base text-[#00D2FF] sm:text-lg" />,
                    text: "ISO Certified",
                  },
                  {
                    icon: <FaGlobe className="text-base text-[#0072FF] sm:text-lg" />,
                    text: "Global Reach",
                  },
                  {
                    icon: <FaAward className="text-base text-[#0052D4] sm:text-lg" />,
                    text: "15+ Years",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -4,
                      scale: 1.03,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-[#00D2FF]/60 hover:shadow-[0_8px_30px_rgba(0,210,255,0.15)] sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:text-sm"
                  >
                    <span className="flex shrink-0 items-center justify-center">
                      {item.icon}
                    </span>

                    <span className="whitespace-nowrap">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="text-center group p-4 rounded-2xl transition-all duration-300 hover:bg-[#F4F9FF]"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#EBF4FF] to-white rounded-2xl flex items-center justify-center text-2xl text-[#0052D4] group-hover:text-[#00D2FF] group-hover:scale-110 transition-all duration-300 shadow-sm border border-slate-100">
                  {stat.icon}
                </div>
                <div
                  ref={addCounterRef}
                  className="text-3xl md:text-4xl font-extrabold text-[#0A2540] mt-4 tracking-tight"
                >
                  0{stat.suffix}
                </div>
                <div className="text-sm text-slate-500 font-semibold mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F4F9FF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-[36px] blur-xl opacity-30 bg-gradient-to-r from-[#00D2FF] to-[#0052D4]" />
              <div className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src="/globalwhare.jpg"
                  alt="Warehouse & Logistics Operations"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-[#0052D4] shadow-md border border-white">
                  ⚡ Operations & Quality Desk
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider text-[#0052D4] bg-white shadow-sm mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight leading-tight mb-6">
                Built on Trade Routes,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                  Built on Trust
                </span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-4">
                What began as a focused sourcing desk has grown into a full-stack import–export operation spanning warehousing, quality control, and last-mile distribution.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Every shipment that leaves our facility carries the same standard — checked, documented, and delivered on time, every time.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                {["End-to-End Fulfilment", "In-House QC", "Global Network"].map((b) => (
                  <span
                    key={b}
                    className="px-4 py-2 rounded-full text-sm font-semibold border border-slate-200 bg-white text-slate-700 shadow-sm flex items-center gap-2 hover:border-[#00D2FF] transition-colors"
                  >
                    <FaCheckCircle className="text-[#00D2FF] text-sm" /> {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider text-[#0052D4] bg-[#F4F9FF] shadow-sm mb-4">
              Your One Stop Solution
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight">
              One Umbrella for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Global Trade Solutions
              </span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-base md:text-lg">
              From sourcing to delivery, we handle everything under one roof with precision and reliability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative bg-[#F4F9FF] rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:bg-white hover:border-[#00D2FF]/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0052D4] to-[#00D2FF] text-white flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-[#0A2540] via-[#0D3156] to-[#0A2540] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D2FF]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0052D4]/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-[#00D2FF] mb-4">
              Company Snapshot
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#60EFFF] to-[#00D2FF]">
                Samrat Global
              </span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBuilding className="text-4xl text-[#00D2FF]" />,
                title: "Who We Are",
                description:
                  "Samrat Global is a sourcing and export company based in India offering strategic procurement solutions and worldwide export services.",
              },
              {
                icon: <FaEye className="text-4xl text-[#60EFFF]" />,
                title: "Our Vision",
                description:
                  "To enrich lives globally through authentic ingredients and empowering style, uniting quality, trust, and exceptional value.",
              },
              {
                icon: <FaBullseye className="text-4xl text-[#00D2FF]" />,
                title: "Our Mission",
                description:
                  "Connect the world with excellence by sourcing and delivering premium products that inspire trust and elevate everyday experiences.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-[#00D2FF]/50 transition-all duration-300 shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider text-[#0052D4] bg-[#F4F9FF] shadow-sm mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight">
              Core{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Commitments
              </span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className={`bg-gradient-to-b ${value.gradient} rounded-3xl p-8 border border-slate-200 transition-all duration-300 shadow-sm hover:shadow-xl ${value.borderColor}`}>
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A2540] mb-3">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                  <div className="mt-6 h-1 w-12 bg-[#00D2FF] rounded-full group-hover:w-24 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-gradient-to-r from-[#0052D4] via-[#0072FF] to-[#00D2FF] text-white overflow-hidden relative shadow-inner">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-bold tracking-[4px] text-white/80 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            End-To-End Capabilities
          </span>
        </div>
        <div className="flex overflow-hidden py-2 select-none">
          <div className="flex w-max animate-marquee space-x-4 hover:[animation-play-state:paused]">
            {[
              "Import & Export Solutions",
              "Global Sourcing",
              "Procurement Management",
              "Logistics & Supply Chain",
              "Quality Assurance",
              "Customs Clearance",
              "Warehousing & Distribution",
              "Trade Consulting",
              "Import & Export Solutions",
              "Global Sourcing",
              "Procurement Management",
              "Logistics & Supply Chain",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm whitespace-nowrap shadow-sm hover:bg-white hover:text-[#0052D4] transition-all"
              >
                <FaCheckCircle className="text-[#60EFFF]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex overflow-hidden py-2 select-none mt-2">
          <div className="flex w-max animate-marqueeReverse space-x-4 hover:[animation-play-state:paused]">
            {[
              "Supplier Verification",
              "Worldwide Shipping",
              "Packaging Solutions",
              "OEM Manufacturing",
              "Vendor Network",
              "Product Inspection",
              "Door-to-Door Delivery",
              "International Trade",
              "Supplier Verification",
              "Worldwide Shipping",
              "Packaging Solutions",
              "OEM Manufacturing",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm whitespace-nowrap shadow-sm hover:bg-white hover:text-[#0052D4] transition-all"
              >
                <FaCheckCircle className="text-[#60EFFF]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-[#F4F9FF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider text-[#0052D4] bg-white shadow-sm mb-4">
              Leadership Team
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Leadership
              </span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-base md:text-lg">
              Dedicated professionals committed to driving your business growth worldwide.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100">
                  <div className="relative overflow-hidden h-72">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/80 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-xs leading-relaxed mb-3">
                        {member.description}
                      </p>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#00D2FF] text-[#0A2540] text-xs font-bold w-fit">
                        {member.expertise}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-[#0A2540] group-hover:text-[#0052D4] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#0072FF] uppercase tracking-wider mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider text-[#0052D4] bg-[#F4F9FF] shadow-sm mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight">
              What Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Clients Say
              </span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-[#F4F9FF] rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <FaQuoteLeft className="text-3xl text-[#00D2FF] mb-4 opacity-70" />
                <p className="text-slate-600 text-sm md:text-base leading-relaxed italic mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0052D4] to-[#00D2FF] text-white font-bold flex items-center justify-center shadow-md">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2540]">{testimonial.author}</h4>
                    <p className="text-xs text-slate-500 font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-[#0052D4] to-[#0072FF] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#00D2FF]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Ready to Scale Your Global Trade Operations?
          </h2>
          <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Partner with Samrat Global today for seamless sourcing, quality assurance, and global export solutions.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#0052D4] font-bold px-8 py-4 rounded-full shadow-2xl hover:bg-[#60EFFF] hover:text-[#0A2540] transition-all"
          >
            <span>Get Started With Us</span>
            <FaArrowRight />
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default page;
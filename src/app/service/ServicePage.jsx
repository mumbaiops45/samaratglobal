"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaArrowRight,
  FaCheckCircle,
  FaGlobe,
  FaSearch,
  FaShoppingCart,
  FaHandshake,
  FaClipboardCheck,
  FaShippingFast,
  FaShieldAlt,
  FaBolt,
  FaHeadset,
  FaMapPin,
  FaUsers,
  FaAward,
  FaStar,
} from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The five services exactly as defined in the client's approved content
// (Sourcing & Procurement, from the homepage / brand PDF), each expanded
// with a fuller description and detail points.
const coreServices = [
  {
    id: 1,
    step: "01",
    title: "Product Development",
    image: "/service_product.jpg",
    description:
      "Support for developing and identifying products according to business requirements. We work closely with clients to translate a sourcing brief into a clear, workable product specification.",
    details: [
      "Requirement analysis & product specification",
      "Sample sourcing and evaluation",
      "Market and category research",
      "Feasibility and cost assessment",
    ],
  },
  {
    id: 2,
    step: "02",
    title: "Product Purchasing",
    image: "/service_wholesale.jpg",
    description:
      "Professional coordination for purchasing products from suitable suppliers, with pricing negotiation and terms management handled end-to-end on the client's behalf.",
    details: [
      "Verified supplier shortlisting",
      "Price and payment-term negotiation",
      "Purchase order management",
      "Transparent cost breakdowns",
    ],
  },
  {
    id: 3,
    step: "03",
    title: "Supplier Management",
    image: "/globalwhare.jpg",
    description:
      "Supplier coordination and communication to support reliable procurement — keeping every party aligned from the first conversation through to fulfilment.",
    details: [
      "Supplier vetting & relationship management",
      "Ongoing communication and coordination",
      "Performance and reliability tracking",
      "Dispute and issue resolution support",
    ],
  },
  {
    id: 4,
    step: "04",
    title: "Order Monitoring",
    image: "/service_ordermonitoring.jpg",
    description:
      "Ongoing coordination and monitoring of orders throughout the procurement process, with quality checkpoints before goods ever leave the supplier.",
    details: [
      "Production and timeline tracking",
      "Pre-shipment quality inspection",
      "Documentation & compliance checks",
      "Regular status updates to clients",
    ],
  },
  {
    id: 5,
    step: "05",
    title: "Delivery at Destination",
    image: "/service_delivery.jpg",
    description:
      "Support for coordinating shipment movement and delivery to the required destination, closing the loop from sourcing through to the client's door.",
    details: [
      "Shipment and route coordination",
      "Customs and documentation support",
      "Milestone tracking to destination",
      "Final delivery confirmation",
    ],
  },
];

const whyChooseUs = [
  {
    title: "Global Reach",
    description: "Active sourcing and trade connections across 50+ countries.",
    image: "/about_vision.jpg",
    icon: <FaGlobe className="text-2xl text-white" />,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Quality First",
    description: "Every order passes through structured quality checkpoints.",
    image: "/service_quality.jpg",
    icon: <FaShieldAlt className="text-xl text-white" />,
    span: "md:col-span-1",
  },
  {
    title: "Fast Turnaround",
    description: "Organised documentation and coordination reduce delays.",
    image: "/Optimizedroutes.webp",
    icon: <FaBolt className="text-xl text-white" />,
    span: "md:col-span-1",
  },
  {
    title: "Dedicated Support",
    description: "A responsive point of contact for every engagement.",
    image: "https://t3.ftcdn.net/jpg/10/43/42/06/360_F_1043420602_HhmKNYUQrQKmIsriU2W0u8ZWSLn7e9zs.jpg",
    icon: <FaHeadset className="text-xl text-white" />,
    span: "md:col-span-2",
  },
];

const workProcess = [
  {
    title: "Supplier Vetting & Sourcing",
    description: "We identify, vet and negotiate with suitable suppliers to secure the right product quality and pricing.",
    icon: <FaHandshake className="text-2xl text-primary" />,
  },
  {
    title: "Quality Check & Tracking",
    description: "End-to-end order monitoring with pre-shipment inspection and documentation review.",
    icon: <FaClipboardCheck className="text-2xl text-primary" />,
  },
  {
    title: "Global Delivery & Fulfilment",
    description: "Coordinated shipment and delivery to destination, closing the loop on every order.",
    icon: <FaShippingFast className="text-2xl text-primary" />,
  },
];

const stats = [
  { value: "500+", label: "Clients Served", icon: <FaUsers className="text-2xl" /> },
  { value: "50+", label: "Countries", icon: <FaGlobe className="text-2xl" /> },
  { value: "15+", label: "Years of Experience", icon: <FaAward className="text-2xl" /> },
  { value: "100%", label: "Customer Satisfaction", icon: <FaStar className="text-2xl" /> },
];

const additionalServices = [
  "Customs Clearance Support",
  "Warehousing & Storage Coordination",
  "Transit Cargo Insurance",
  "Supply Chain Consulting",
  "Export Documentation",
  "Risk Assessment & Compliance",
  "Quality Certification Support",
  "Trade Agreement Guidance",
];

const ServicePage = () => {
  const processRef = useRef(null);
  const lineRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );

      const track = marqueeRef.current;
      if (track) {
        const totalWidth = track.scrollWidth / 2;
        const tween = gsap.to(track, { x: -totalWidth, duration: 26, ease: "none", repeat: -1 });
        const pause = () => tween.pause();
        const resume = () => tween.play();
        track.addEventListener("mouseenter", pause);
        track.addEventListener("mouseleave", resume);
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0A1A3F]">
        <div className="absolute inset-0 opacity-65">
          <img src="/services.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/40 to-[#0A1A3F]/15" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <h1 className="h1 text-white">
              Smart <span className="grad-text">Sourcing &amp; Procurement</span> Solutions
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg">
              Our Sourcing and Procurement services help businesses identify products,
              coordinate with suppliers, manage purchasing requirements and support the
              movement of goods across markets — an integrated approach from product
              development to delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE SERVICES — alternating feature rows, numbered like the PDF */}
      <section className="bg-[#EAF1FF] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Sourcing &amp; Procurement</p>
            <h2 className="h2 text-slate-900">
              Our Core <span className="grad-text">Trade Services</span>
            </h2>
          </motion.div>

          <div className="space-y-14">
            {coreServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.05 }}
                viewport={{ once: true, margin: "-10%" }}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative h-[260px] overflow-hidden rounded-sm border border-slate-200 shadow-lg md:h-[340px]">
                  <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-sm bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-md">
                    {service.step}
                  </div>
                </div>
                <div>
                  <h3 className="h3 mb-4 text-slate-900">{service.title}</h3>
                  <p className="text-base leading-relaxed text-slate-600 md:text-lg">{service.description}</p>
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {service.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                        <FaCheckCircle className="shrink-0 text-primary" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — bento grid */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14 max-w-2xl"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Why Samrat Global India</p>
            <h2 className="h2 text-slate-900">
              Built Different, <span className="grad-text">Delivered Better</span>
            </h2>
          </motion.div>

          <div className="grid auto-rows-[180px] gap-5 md:auto-rows-[170px] md:grid-cols-4">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-sm shadow-md ${item.span}`}
              >
                <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/55 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm bg-gradient-to-br from-primary to-secondary shadow-md">
                    {item.icon}
                  </div>
                  <h3 className="h4 text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-200">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section ref={processRef} className="relative overflow-hidden bg-[#0A1A3F] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Our Process</p>
            <h2 className="h2 text-white">
              How We <span className="grad-text">Operate</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute top-[26px] left-[15%] right-[15%] hidden h-[2px] overflow-hidden rounded-full bg-white/10 md:block">
              <div ref={lineRef} className="h-full w-full origin-left bg-gradient-to-r from-primary to-secondary" style={{ transform: "scaleX(0)" }} />
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {workProcess.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-sm bg-white/5 border border-white/10">
                    {item.icon}
                  </div>
                  <h3 className="h4 mt-5 text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#EAF1FF] py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-sm border border-slate-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="mb-2 flex justify-center text-primary">{stat.icon}</div>
                <div className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH MARQUEE */}
      <section className="overflow-hidden bg-white py-16">
        <div className="mx-auto mb-10 max-w-7xl px-5 text-center sm:px-8 lg:px-12">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">Global Trade Corridors</p>
          <h2 className="h2 text-slate-900">Present Across The World</h2>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="overflow-hidden">
            <div ref={marqueeRef} className="flex w-max gap-4 px-4">
              {[...additionalServices, ...additionalServices].map((service, index) => (
                <div
                  key={`${service}-${index}`}
                  className="flex shrink-0 items-center gap-2 rounded-sm border border-slate-200 bg-[#EAF1FF] px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  <FaCheckCircle className="text-xs text-primary" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[#062A8F] py-20">
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
          <h2 className="h2 mb-4 text-white">
            Let&apos;s Simplify Your <span className="text-secondary">Sourcing &amp; Export</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/80 md:text-lg">
            Talk to our trade desk about your product requirements, supplier needs or
            export destination.
          </p>
          <a href="/contact" className="btn bg-white text-primary hover:-translate-y-0.5 transition-transform">
            Contact Our Trade Desk <FaArrowRight className="text-xs" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;

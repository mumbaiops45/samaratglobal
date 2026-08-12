"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {FaArrowRight,FaStar,FaShippingFast,FaGlobe,FaCheckCircle,FaTruck,FaShip,FaWarehouse,FaBoxes,FaClipboardCheck,FaClock,FaUsers,FaBuilding,FaRocket,FaShieldAlt,FaHandshake,FaSearch,FaRoad,FaMapPin,FaTelegram,FaTimes,FaBolt,FaHeadset,} from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { GiShipWheel } from "react-icons/gi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


const CYAN_PRIMARY = "#00D2FF";
const CYAN_LIGHT = "#60EFFF";
const BLUE_ROYAL = "#0052D4";
const BLUE_MID = "#0072FF";
const NAVY_DARK = "#0A2540";

const ServicePage = () => {
  const [activeService, setActiveService] = useState(null);
  const processRef = useRef(null);
  const lineRef = useRef(null);
  const marqueeRef = useRef(null);
  const counterRefs = useRef([]);
  counterRefs.current = [];

  const addCounterRef = (el) => {
    if (el && !counterRefs.current.includes(el)) counterRefs.current.push(el);
  };

  const mainServices = [
    {
      id: 1,
      slug: "sourcing-procurement",
      title: "Sourcing & Procurement",
      icon: <FaSearch className="text-4xl text-[#00D2FF]" />,
      image: "/exports.webp",
      description:
        "Global sourcing and strategic procurement solutions connecting you with verified suppliers worldwide.",
      details: [
        "Supplier identification & vetting",
        "Strict quality control & pre-shipment inspection",
        "Competitive pricing negotiation",
        "End-to-end procurement management",
      ],
      gradient: "from-[#0052D4] to-[#00D2FF]",
      badge: "Most Popular",
    },
    {
      id: 2,
      slug: "domestic-distribution",
      title: "Domestic Distribution",
      icon: <FaTruck className="text-4xl text-[#0072FF]" />,
      image: "/distrubution.avif",
      description:
        "PAN-India distribution network ensuring timely delivery across all states with unmatched reliability.",
      details: [
        "Pan-India transport coverage",
        "Fleet management & route optimization",
        "Last-mile door delivery",
        "Real-time GPS consignment tracking",
      ],
      gradient: "from-[#0A2540] to-[#0052D4]",
      badge: "Trusted",
    },
    {
      id: 3,
      slug: "packaging-solutions",
      title: "Packaging Solutions",
      icon: <FaBoxes className="text-4xl text-[#60EFFF]" />,
      image: "/packing.jpg",
      description:
        "Custom export packaging solutions designed to protect products during transit and enhance brand presentation.",
      details: [
        "Custom heavy-duty export packaging",
        "Shock & moisture protective materials",
        "Branding & customized labeling",
        "Sustainable eco-friendly options",
      ],
      gradient: "from-[#0072FF] to-[#00D2FF]",
      badge: "Innovative",
    },
    {
      id: 4,
      slug: "international-shipping",
      title: "International Shipping",
      icon: <FaShip className="text-4xl text-[#00D2FF]" />,
      image: "/international.jpg",
      description:
        "Global freight solutions connecting India to over 150+ countries via sea and air freight corridors.",
      details: [
        "Full Container Load (FCL) & LCL sea freight",
        "Express air freight options",
        "Hassle-free customs clearance",
        "Door-to-door international delivery",
      ],
      gradient: "from-[#0052D4] to-[#60EFFF]",
      badge: "Global Reach",
    },
  ];

  const whyChooseUs = [
    {
      title: "Global Reach",
      description:
        "Active trade lanes across 50+ countries with dependable freight partners on every route.",
      image:
        "https://images.pexels.com/photos/2231744/pexels-photo-2231744.jpeg?auto=compress&cs=tinysrgb&w=1200",
      icon: <FaGlobe className="text-3xl text-white" />,
      span: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Quality First",
      description:
        "Every shipment passes strict in-house QC before it leaves our facility.",
      image:
        "https://images.pexels.com/photos/4483941/pexels-photo-4483941.jpeg?auto=compress&cs=tinysrgb&w=1200",
      icon: <FaShieldAlt className="text-2xl text-white" />,
      span: "md:col-span-2",
    },
    {
      title: "Fast Turnaround",
      description:
        "Optimised documentation and routing cut delays at every checkpoint.",
      image:
        "https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=1200",
      icon: <FaBolt className="text-2xl text-white" />,
      span: "md:col-span-1",
    },
    {
      title: "Dedicated Support",
      description: "A named account manager for every client, every shipment.",
      image:
        "https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1200",
      icon: <FaHeadset className="text-2xl text-white" />,
      span: "md:col-span-1",
    },
  ];

  const shippingServices = [
    {
      icon: <FaBuilding className="text-3xl text-[#0052D4]" />,
      title: "Local Relocation",
      description:
        "Same-city commercial and office shifting within 24 hours. Full packing and transport included.",
      features: ["24-hour service", "Full packing", "Labor included", "Insurance covered"],
    },
    {
      icon: <FaGlobe className="text-3xl text-[#00D2FF]" />,
      title: "International Freight",
      description:
        "Door-to-door export relocation to 150+ countries by sea or air. We handle customs end-to-end.",
      features: ["150+ countries", "Customs clearance", "End-to-end service", "Safe delivery"],
    },
    {
      icon: <FaBuilding className="text-3xl text-[#0072FF]" />,
      title: "Corporate Logistics",
      description:
        "Office asset relocation with minimal downtime. Includes surveys, asset tagging, and dedicated manager.",
      features: ["Minimal downtime", "Asset tagging", "Weekend moves", "Dedicated manager"],
    },
    {
      icon: <FaRoad className="text-3xl text-[#0052D4]" />,
      title: "Long Distance Haulage",
      description:
        "Move full or part loads between Indian ports & inland destinations with GPS-tracked trucks.",
      features: ["GPS tracked", "Transit insurance", "On-time delivery", "Scheduled departures"],
    },
    {
      icon: <FaTelegram className="text-3xl text-[#60EFFF]" />,
      title: "Express Courier",
      description:
        "Urgent trade documents and samples delivered same-day across metros with live tracking.",
      features: ["Same-day delivery", "Live tracking", "Cold-chain options", "Instant POD"],
    },
    {
      icon: <FaMapPin className="text-3xl text-[#0A2540]" />,
      title: "Direct Door Delivery",
      description:
        "Direct shipments with no unnecessary trans-shipment. Fewer touchpoints mean zero damage risk.",
      features: ["No trans-shipment", "Faster delivery", "Lower damage risk", "Direct service"],
    },
    {
      icon: <MdOutlineLocalShipping className="text-3xl text-[#0072FF]" />,
      title: "Real-time Tracking",
      description:
        "24/7 GPS tracking and milestone alerts via our client portal. Live updates from origin to destination.",
      features: ["24/7 tracking", "Real-time updates", "Client portal", "Milestone alerts"],
    },
  ];

  const workProcess = [
    {
      step: "01",
      title: "Supplier Vetting & Sourcing",
      description:
        "We identify, audit, and negotiate with verified suppliers to ensure top product quality and pricing.",
      icon: <FaHandshake className="text-3xl text-[#00D2FF]" />,
    },
    {
      step: "02",
      title: "Quality Check & Tracking",
      description:
        "End-to-end order monitoring with strict pre-shipment inspections and documentation clearance.",
      icon: <FaClipboardCheck className="text-3xl text-[#60EFFF]" />,
    },
    {
      step: "03",
      title: "Global Delivery & Fulfilment",
      description:
        "Ensuring on-time delivery with ocean/air freight, customs clearance, and door delivery.",
      icon: <FaShippingFast className="text-3xl text-[#00D2FF]" />,
    },
  ];

  const globalNetwork = [
    {
      name: "United States",
      image:
        "https://images.pexels.com/photos/12171678/pexels-photo-12171678.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "United Kingdom",
      image:
        "https://images.pexels.com/photos/2561281/pexels-photo-2561281.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "UAE",
      image:
        "https://images.pexels.com/photos/33687795/pexels-photo-33687795.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Singapore",
      image:
        "https://images.pexels.com/photos/8482764/pexels-photo-8482764.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Germany",
      image:
        "https://images.pexels.com/photos/19012889/pexels-photo-19012889.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Australia",
      image:
        "https://images.pexels.com/photos/6233413/pexels-photo-6233413.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const stats = [
    { value: 132, suffix: "+", label: "Ocean Cargo Lanes", icon: <GiShipWheel className="text-3xl" /> },
    { value: 10, suffix: "K+", label: "Shipments Handled", icon: <FaUsers className="text-3xl" /> },
    { value: 99, suffix: "%", label: "Client Satisfaction", icon: <FaStar className="text-3xl" /> },
    { value: 102, suffix: "+", label: "Global Warehouses", icon: <FaWarehouse className="text-3xl" /> },
  ];

  const additionalServices = [
    "Customs Clearance",
    "Warehousing & Cold Storage",
    "Transit Cargo Insurance",
    "Supply Chain Consulting",
    "Export Documentation",
    "Risk Assessment & Compliance",
    "ISO Quality Certification",
    "Trade Agreement Guidance",
  ];

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
        const tween = gsap.to(track, {
          x: -totalWidth,
          duration: 22,
          ease: "none",
          repeat: -1,
        });

        const pause = () => tween.pause();
        const resume = () => tween.play();
        track.addEventListener("mouseenter", pause);
        track.addEventListener("mouseleave", resume);
      }

      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const suffix = stats[i].suffix;
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 1.8,
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
    <div className="min-h-screen bg-[#F4F9FF] text-[#0A2540] overflow-x-hidden  selection:bg-[#00D2FF]/30">
    
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0052D4] opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
            }}
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-[#0A2540] via-[#0D3156] to-[#0A2540] text-white">
        {/* <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Cargo port operations"
            className="w-full h-full object-cover"
          />
        </div> */}

        <div className="absolute top-10 right-10 w-96 h-96 bg-[#00D2FF]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0052D4]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-1 rounded-full border border-white/20 mb-6">
              <FaRocket className="text-[#00D2FF]" />
              <span className="text-xs sm:text-sm font-bold capitalize tracking-[2px] text-[#60EFFF]">
                Our Trade & Logistics services
              </span>
            </div>

            <h1 className="h2 text-white">
              Your Trusted Partner{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#60EFFF] to-[#00D2FF]">
                In International Trade
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mt-6 max-w-2xl">
              Comprehensive import, export, sourcing, and logistics solutions tailored to make your cross-border supply chain seamless and profitable.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {[
                { icon: <FaShip className="text-[#00D2FF]" />, text: "Global Reach" },
                { icon: <FaShieldAlt className="text-[#60EFFF]" />, text: "Quality Assured" },
                { icon: <FaClock className="text-[#00D2FF]" />, text: "24/7 Support" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 text-sm font-semibold text-white hover:border-[#00D2FF] transition-all"
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              What We Offer
            </span>
            <h2 className="h2 text-[#0A2540]">
              Our Core{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Trade Services
              </span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-base">
              End-to-end solutions designed to streamline procurement, packaging, distribution, and international shipping.
            </p>
          </motion.div>

          <div className="space-y-12">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`group grid lg:grid-cols-2 overflow-hidden rounded-[32px] bg-white shadow-lg border border-slate-100 hover:shadow-2xl hover:border-[#00D2FF]/50 transition-all duration-700 ${
                  index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative overflow-hidden h-[300px] lg:h-[450px]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-50`}
                  />
                  <span className="absolute top-6 left-6 rounded-full bg-white/95 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-[#0052D4] shadow-md border border-white">
                    {service.badge}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    {/* {service.icon} */}
                    <h3 className="h3 text-[#0A2540]">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                        <FaCheckCircle className="text-[#00D2FF] text-base shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveService(service)}
                    className="w-fit inline-flex items-center gap-2 bg-[#F4F9FF] border border-[#00D2FF]/40 text-[#0052D4] hover:bg-gradient-to-r hover:from-[#0052D4] hover:to-[#00D2FF] hover:text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-sm cursor-pointer"
                  >
                    <span>Enquire About Service</span>
                    <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2540]/75 backdrop-blur-md"
            onClick={() => setActiveService(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-slate-100"
            >
              <button
                onClick={() => setActiveService(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-slate-700 hover:bg-[#00D2FF] hover:text-[#0A2540] transition-colors"
              >
                <FaTimes />
              </button>

              <div className="relative h-48 overflow-hidden">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${activeService.gradient} opacity-60`}
                />
              </div>

              <div className="p-6 md:p-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EBF4FF] text-[#0052D4] mb-3">
                  {activeService.badge}
                </span>
                <h3 className="h3 text-[#0A2540] mb-2">
                  {activeService.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {activeService.description}
                </p>

                <div className="space-y-2 mb-6">
                  {activeService.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <FaCheckCircle className="text-[#00D2FF]" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="/contact"
                  className="w-full py-3.5 rounded-full font-bold text-center block text-white bg-gradient-to-r from-[#0052D4] to-[#00D2FF] hover:shadow-lg transition-all"
                >
                  Contact Trade Desk
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
              Why Samrat Global India Private Limited
            </span>
            <h2 className="h2 text-[#0A2540]">
              Built Different,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Delivered Better
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 auto-rows-[200px] md:auto-rows-[180px] gap-5">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ${item.span}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/60 to-transparent" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0052D4] to-[#00D2FF] flex items-center justify-center mb-3 shadow-md">
                    {item.icon}
                  </div>
                  <h3 className="h3 text-white">{item.title}</h3>
                  <p className="text-slate-200 text-xs mt-1 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>
              </motion.div>
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
              Shipping & Moving Services
            </span>
            <h2 className="h2 text-[#0A2540]">
              Customer Shipping{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Solutions
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shippingServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-[#00D2FF]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#EBF4FF] rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="h4 text-[#0A2540]">{service.title}</h3>
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {service.features.slice(0, 2).map((feature, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-[#F4F9FF] rounded-full text-[10px] font-semibold text-[#0052D4] border border-slate-200"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
      <section
        ref={processRef}
        className="py-20 md:py-28 bg-gradient-to-b from-[#0A2540] via-[#0D3156] to-[#0A2540] text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-[#00D2FF] mb-4">
              Our Process
            </span>
            <h2 className="h2">
              How We{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#60EFFF] to-[#00D2FF]">
                Operate
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-1 bg-white/10 overflow-hidden rounded-full">
              <div
                ref={lineRef}
                className="h-full w-full bg-gradient-to-r from-[#0052D4] via-[#0072FF] to-[#00D2FF]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {workProcess.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-[#00D2FF]/50 transition-all duration-300 h-full">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="h4 text-white mb-3">{item.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider text-[#0052D4] bg-[#F4F9FF] shadow-sm mb-2">
            Global Trade Corridors
          </span>
          <h2 className="h2 text-[#0A2540]">
            Present Across The World
          </h2>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

          <div className="overflow-hidden">
            <div ref={marqueeRef} className="flex gap-6 w-max px-4">
              {[...globalNetwork, ...globalNetwork].map((country, index) => (
                <div
                  key={`${country.name}-${index}`}
                  className="relative w-64 h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-md group cursor-pointer"
                >
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <FaMapPin className="text-[#00D2FF]" />
                    <span className="text-white font-bold text-sm">{country.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#F4F9FF] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="h2 text-[#0A2540]">
              Our Global Impact in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Numbers
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="text-center group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 hover:border-[#00D2FF]"
              >
                <div className="text-3xl text-[#0052D4] group-hover:text-[#00D2FF] mb-2 flex justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div
                  ref={addCounterRef}
                  className="text-3xl md:text-4xl font-extrabold text-[#0A2540] tracking-tight"
                >
                  0{stat.suffix}
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="h2 text-[#0A2540] mb-8">
            Additional Specialty Trade Services
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, y: -2 }}
                className="flex items-center gap-2 bg-[#F4F9FF] px-5 py-2.5 rounded-full shadow-2xs border border-slate-200 hover:border-[#00D2FF] transition-all cursor-pointer"
              >
                <FaCheckCircle className="text-[#00D2FF] text-xs" />
                <span className="text-slate-700 font-semibold text-xs">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicePage;
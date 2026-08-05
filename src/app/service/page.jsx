"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight, FaStar, FaShippingFast, FaGlobe, FaCheckCircle, FaTruck, FaShip, FaWarehouse, FaBoxes, FaClipboardCheck, FaClock, FaUsers, FaBuilding, FaRocket, FaShieldAlt, FaHandshake, FaSearch, FaRoad, FaMapPin, FaTelegram, FaTimes, FaBolt, FaHeadset } from 'react-icons/fa';
import { MdOutlineLocalShipping } from "react-icons/md";
import { GiShipWheel } from 'react-icons/gi';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const NAVY = '#0A1F44';
const NAVY_DEEP = '#081733';
const NAVY_MID = '#1B3A7A';
const ROYAL = '#1B4B91';
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F1D77E';
const GOLD_DARK = '#B8860B';

const page = () => {
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
            title: "Sourcing & Procurement",
            icon: <FaSearch className="text-5xl" />,
            image: "/exports.webp",
            description: "Global sourcing and strategic procurement solutions connecting you with the best suppliers worldwide.",
            details: [
                "Supplier identification and vetting",
                "Quality control and assurance",
                "Competitive pricing negotiation",
                "End-to-end procurement management"
            ],
            color: `from-[${ROYAL}] to-[#2F6FCB]`,
            badge: "Most Popular"
        },
        {
            id: 2,
            title: "Domestic Distribution",
            icon: <FaTruck className="text-5xl" />,
            image: "/distrubution.avif",
            description: "PAN-India distribution network ensuring timely delivery across all states with unmatched reliability.",
            details: [
                "Pan-India coverage",
                "Fleet management",
                "Last-mile delivery",
                "Real-time tracking"
            ],
            color: `from-[${NAVY}] to-[${ROYAL}]`,
            badge: "Trusted"
        },
        {
            id: 3,
            title: "Packaging Solutions",
            icon: <FaBoxes className="text-5xl" />,
            image: "/packing.jpg",
            description: "Custom packaging solutions designed to protect products during transit and enhance brand presentation.",
            details: [
                "Custom packaging design",
                "Protective materials",
                "Branding solutions",
                "Sustainable options"
            ],
            color: `from-[${GOLD}] to-[${GOLD_DARK}]`,
            badge: "Innovative"
        },
        {
            id: 4,
            title: "International Shipping",
            icon: <FaShip className="text-5xl" />,
            image: "/international.jpg",
            description: "Global shipping solutions connecting India to over 150+ countries via sea and air freight.",
            details: [
                "Sea freight services",
                "Air freight options",
                "Customs clearance",
                "Door-to-door delivery"
            ],
            color: `from-[${NAVY_DEEP}] to-[${NAVY_MID}]`,
            badge: "Global"
        }
    ];


    const whyChooseUs = [
        {
            title: "Global Reach",
            description: "Active trade lanes across 50+ countries with dependable freight partners on every route.",
            image: "https://images.pexels.com/photos/2231744/pexels-photo-2231744.jpeg?auto=compress&cs=tinysrgb&w=1200",
            icon: <FaGlobe className="text-3xl" />,
            span: "md:col-span-2 md:row-span-2"
        },
        {
            title: "Quality First",
            description: "Every shipment passes strict in-house QC before it leaves our facility.",
            image: "https://images.pexels.com/photos/4483941/pexels-photo-4483941.jpeg?auto=compress&cs=tinysrgb&w=1200",
            icon: <FaShieldAlt className="text-2xl" />,
            span: "md:col-span-2"
        },
        {
            title: "Fast Turnaround",
            description: "Optimised documentation and routing cut delays at every checkpoint.",
            image: "https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=1200",
            icon: <FaBolt className="text-2xl" />,
            span: "md:col-span-1"
        },
        {
            title: "Dedicated Support",
            description: "A named account manager for every client, every shipment.",
            image: "https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1200",
            icon: <FaHeadset className="text-2xl" />,
            span: "md:col-span-1"
        }
    ];


    const globalNetwork = [
        { name: "United States", image: "https://images.pexels.com/photos/12171678/pexels-photo-12171678.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { name: "United Kingdom", image: "https://images.pexels.com/photos/2561281/pexels-photo-2561281.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { name: "UAE", image: "https://images.pexels.com/photos/33687795/pexels-photo-33687795.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { name: "Singapore", image: "https://images.pexels.com/photos/8482764/pexels-photo-8482764.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { name: "Germany", image: "https://images.pexels.com/photos/19012889/pexels-photo-19012889.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { name: "Australia", image: "https://images.pexels.com/photos/6233413/pexels-photo-6233413.jpeg?auto=compress&cs=tinysrgb&w=800" }
    ];


    const shippingServices = [
        {
            icon: <FaBuilding className="text-3xl" style={{ color: ROYAL }} />,
            title: "Local Moving",
            description: "Same-city home and office shifting within 24 hours. Packing, labor, and transport included.",
            features: ["24-hour service", "Full packing", "Labor included", "Insurance covered"]
        },
        {
            icon: <FaGlobe className="text-3xl" style={{ color: GOLD_DARK }} />,
            title: "International Moving",
            description: "Door-to-door relocation to 150+ countries by sea or air. We handle packing, customs clearance, and safe delivery end-to-end.",
            features: ["150+ countries", "Customs clearance", "End-to-end service", "Safe delivery"]
        },
        {
            icon: <FaBuilding className="text-3xl" style={{ color: NAVY }} />,
            title: "Corporate Moving",
            description: "Office and asset relocation with minimal business downtime. Includes surveys, asset tagging, weekend moves, and dedicated manager.",
            features: ["Minimal downtime", "Asset tagging", "Weekend moves", "Dedicated manager"]
        },
        {
            icon: <FaRoad className="text-3xl" style={{ color: ROYAL }} />,
            title: "Long Distance",
            description: "Move full or part loads between Indian cities and countries with GPS-tracked trucks. Scheduled departures, transit insurance, and guaranteed on-time delivery.",
            features: ["GPS tracked", "Transit insurance", "On-time delivery", "Scheduled departures"]
        },
        {
            icon: <FaTelegram className="text-3xl" style={{ color: GOLD_DARK }} />,
            title: "Instant Courier",
            description: "Urgent documents and parcels delivered same-day across metros. Live tracking, instant POD, and cold-chain options available.",
            features: ["Same-day delivery", "Live tracking", "Cold-chain options", "Instant POD"]
        },
        {
            icon: <FaMapPin className="text-3xl" style={{ color: NAVY }} />,
            title: "Direct Delivery",
            description: "Part-to-door shipments with no middle or trans-shipment. Fewer touchpoints mean faster delivery and lower damage risk.",
            features: ["No trans-shipment", "Faster delivery", "Lower damage risk", "Direct service"]
        },
        {
            icon: <MdOutlineLocalShipping className="text-3xl" style={{ color: ROYAL }} />,
            title: "Track Monitoring",
            description: "24/7 GPS tracking and milestone alerts via our client portal. Get real-time updates from pickup to final delivery.",
            features: ["24/7 tracking", "Real-time updates", "Client portal", "Milestone alerts"]
        }
    ];

    const workProcess = [
        {
            step: "01",
            title: "Supplier Management",
            description: "We identify, vet, and manage relationships with the best suppliers to ensure quality and reliability.",
            icon: <FaHandshake className="text-3xl" />
        },
        {
            step: "02",
            title: "Order Monitoring",
            description: "End-to-end order tracking with real-time updates and quality checks at every stage.",
            icon: <FaClipboardCheck className="text-3xl" />
        },
        {
            step: "03",
            title: "Delivery at Destination",
            description: "Ensuring timely delivery with proper handling, customs clearance, and client satisfaction.",
            icon: <FaShippingFast className="text-3xl" />
        }
    ];

    const stats = [
        { value: 132, suffix: "+", label: "Ocean Cargo", icon: <GiShipWheel className="text-3xl" /> },
        { value: 10, suffix: "K", label: "Workers", icon: <FaUsers className="text-3xl" /> },
        { value: 230, suffix: "K", label: "Satisfied Clients", icon: <FaStar className="text-3xl" /> },
        { value: 102, suffix: "+", label: "Fleet Office", icon: <FaWarehouse className="text-3xl" /> }
    ];

    const additionalServices = [
        "Customs Clearance",
        "Warehousing & Storage",
        "Insurance Services",
        "Supply Chain Consulting",
        "Documentation Services",
        "Risk Assessment",
        "Quality Certification",
        "Trade Compliance"
    ];

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    };

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
                        start: "top 60%",
                        end: "bottom 70%",
                        scrub: true
                    }
                }
            );
        }, processRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = marqueeRef.current;
            if (!track) return;

            const totalWidth = track.scrollWidth / 2;

            const tween = gsap.to(track, {
                x: -totalWidth,
                duration: 25,
                ease: "none",
                repeat: -1
            });

            const pause = () => tween.pause();
            const resume = () => tween.play();
            track.addEventListener('mouseenter', pause);
            track.addEventListener('mouseleave', resume);

            return () => {
                track.removeEventListener('mouseenter', pause);
                track.removeEventListener('mouseleave', resume);
                tween.kill();
            };
        }, marqueeRef);

        return () => ctx.revert();
    }, []);


    useEffect(() => {
        const ctx = gsap.context(() => {
            counterRefs.current.forEach((el, i) => {
                const target = stats[i].value;
                const suffix = stats[i].suffix;
                const counter = { val: 0 };

                gsap.to(counter, {
                    val: target,
                    duration: 1.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        once: true
                    },
                    onUpdate: () => {
                        el.textContent = Math.floor(counter.val) + suffix;
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-x-hidden">

            <div className="fixed inset-0 pointer-events-none z-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full opacity-10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 6 + 3}px`,
                            height: `${Math.random() * 6 + 3}px`,
                            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`
                        }}
                        animate={{ y: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            <section className="relative overflow-hidden py-20 md:py-28">
                <div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg?auto=compress&cs=tinysrgb&w=1920"
                        alt="Aerial view of cargo port operations"
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(135deg, ${NAVY_DEEP}F2, ${NAVY_MID}E6, ${NAVY_DEEP}F5)` }}
                    />
                </div>

                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-20 right-20 w-72 h-72 rounded-full filter blur-3xl"
                        style={{ background: `${GOLD}1A` }}
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-20 left-20 w-96 h-96 rounded-full filter blur-3xl"
                        style={{ background: `${ROYAL}22` }}
                        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <div className=" px-4 sm:px-6 lg:px-10 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className=" max-w-4xl"
                    >
                        <motion.div
                            className="inline-block backdrop-blur-sm px-6 py-2.5 rounded-full border mb-6"
                            style={{ background: `${GOLD}1A`, borderColor: `${GOLD}44` }}
                        >
                            <span className="flex items-center gap-2 font-semibold text-sm uppercase tracking-wider" style={{ color: GOLD_LIGHT }}>
                                <FaRocket /> Our Services
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white leading-[1.1]"
                        >
                            Your Trusted Partner
                            <span
                                className="block text-transparent bg-clip-text"
                                style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})` }}
                            >
                                In International Trade
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-slate-300 leading-relaxed mt-6 max-w-2xl"
                        >
                            Comprehensive trade solutions from sourcing to delivery making global trade seamless and reliable
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap  gap-4 mt-8"
                        >
                            {[
                                { icon: <FaShip />, text: "Global Reach" },
                                { icon: <FaShieldAlt />, text: "Quality Assured" },
                                { icon: <FaClock />, text: "24/7 Support" }
                            ].map((badge, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300"
                                >
                                    <span style={{ color: GOLD }}>{badge.icon}</span>
                                    <span className="text-white text-sm font-medium">{badge.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>


            <section className="py-16 md:py-24">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-6 py-2 rounded-full border text-sm font-semibold uppercase tracking-wider mb-4" style={{ borderColor: `${GOLD}55`, color: GOLD_DARK, background: `${GOLD}11` }}>
                            What We Offer
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                            Our{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD_DARK})` }}>
                                Services
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                            Comprehensive solutions tailored to meet your global trade requirements
                        </p>
                    </motion.div>
                    <div className="max-w-7xl mx-auto space-y-12">
                        {mainServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.15,
                                }}
                                viewport={{ once: true }}
                                className={`group grid lg:grid-cols-2 overflow-hidden rounded-[32px] bg-white shadow-[0_20px_80px_rgba(15,23,42,.08)] hover:shadow-[0_30px_100px_rgba(0,0,0,.12)] transition-all duration-700 ${index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                                    }`}
                            >
                                <div className="relative overflow-hidden h-[320px] lg:h-[480px]">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`} />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                                    <span className="absolute top-6 left-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold backdrop-blur">
                                        {service.badge}
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center p-10 lg:p-14">
                                    <div>
                                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                                            {service.title}
                                        </h2>
                                        <p className="text-lg leading-8 text-slate-600">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="space-y-4 my-8">
                                        {service.details.map((detail, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                                                    <FaCheckCircle
                                                        className="text-sm"
                                                        style={{ color: GOLD_DARK }}
                                                    />
                                                </div>
                                                <span className="text-slate-700">
                                                    {detail}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setActiveService(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
                        >
                            <button
                                onClick={() => setActiveService(null)}
                                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-slate-700 hover:bg-white transition-colors"
                            >
                                <FaTimes />
                            </button>
                            <div className="relative h-56 overflow-hidden">
                                <img src={activeService.image} alt={activeService.title} className="w-full h-full object-cover" />
                                <div className={`absolute inset-0 bg-gradient-to-t ${activeService.color} opacity-60`}></div>
                            </div>
                            <div className="p-8">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: `${GOLD}1A`, color: GOLD_DARK }}>
                                    {activeService.badge}
                                </span>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{activeService.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-5">{activeService.description}</p>
                                <div className="space-y-2 mb-6">
                                    {activeService.details.map((detail, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                                            <FaCheckCircle style={{ color: GOLD_DARK }} />
                                            {detail}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setActiveService(null)}
                                    className="w-full py-3 rounded-full font-semibold text-[#0A1F44] transition-transform hover:scale-[1.02]"
                                    style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})` }}
                                >
                                    Enquire About This Service
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="py-16 md:py-24 bg-white">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-6 py-2 rounded-full border text-sm font-semibold uppercase tracking-wider mb-4" style={{ borderColor: `${ROYAL}44`, color: ROYAL, background: `${ROYAL}0D` }}>
                            Why Samrat Global
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                            Built Different,{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD_DARK})` }}>
                                Delivered Better
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-4 auto-rows-[180px] md:auto-rows-[160px] gap-4 max-w-7xl mx-auto">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, scale: 0.92 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 ${item.span}`}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: `linear-gradient(180deg, ${NAVY_DEEP}00 20%, ${NAVY_DEEP}E6 100%)` }}
                                />
                                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 text-[#0A1F44]"
                                        style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3 className="text-white font-bold text-lg md:text-xl">{item.title}</h3>
                                    <p className="text-slate-300 text-sm mt-1 leading-relaxed opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-6 py-2 rounded-full border text-sm font-semibold uppercase tracking-wider mb-4" style={{ borderColor: `${ROYAL}44`, color: ROYAL, background: `${ROYAL}0D` }}>
                            Shipping Services
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                            Samrat Global{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${ROYAL}, ${NAVY})` }}>
                                Customer
                            </span>
                            <span className="block">Shipping Services</span>
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {shippingServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {service.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900">{service.title}</h3>
                                        <p className="text-slate-500 text-sm mt-1 leading-relaxed">{service.description}</p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {service.features.slice(0, 2).map((feature, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-slate-100 rounded-full text-[10px] text-slate-600">
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

            <section ref={processRef} className="py-16 md:py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})` }}>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl" style={{ background: GOLD }}></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl" style={{ background: ROYAL }}></div>
                </div>

                <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center text-white mb-16"
                    >
                        <span className="inline-block backdrop-blur-sm px-6 py-2 rounded-full border font-semibold text-sm uppercase tracking-wider mb-4" style={{ background: `${GOLD}1A`, borderColor: `${GOLD}44`, color: GOLD_LIGHT }}>
                            Our Process
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold">
                            How We{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                                Work
                            </span>
                        </h2>
                        <p className="text-slate-300 max-w-2xl mx-auto mt-4">
                            At Samrat Global, we combine market intelligence, product quality, and sourcing expertise to elevate our brand globally.
                        </p>
                    </motion.div>

                    <div className="relative max-w-7xl mx-auto">
                        <div className="hidden md:block absolute top-[52px] left-[16.6%] right-[16.6%] h-0.5 bg-white/10 overflow-hidden">
                            <div
                                ref={lineRef}
                                className="h-full w-full"
                                style={{ background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`, transform: 'scaleX(0)' }}
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {workProcess.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                    className="relative group"
                                >
                                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/20 transition-all duration-300 h-full">
                                        <div
                                            className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-[#0A1F44] font-bold text-lg shadow-lg"
                                            style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` }}
                                        >
                                            {item.step}
                                        </div>
                                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" style={{ color: GOLD }}>
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                        <p className="text-slate-300 leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-6 py-2 rounded-full border text-sm font-semibold uppercase tracking-wider mb-4" style={{ borderColor: `${GOLD}55`, color: GOLD_DARK, background: `${GOLD}11` }}>
                            Our Global Network
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                            Present Across{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${NAVY}, ${ROYAL})` }}>
                                The World
                            </span>
                        </h2>
                    </motion.div>
                </div>

                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-50 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-50 to-transparent" />

                    <div className="overflow-hidden">
                        <div ref={marqueeRef} className="flex gap-6 w-max px-4">
                            {[...globalNetwork, ...globalNetwork].map((country, index) => (
                                <div
                                    key={`${country.name}-${index}`}
                                    className="relative w-72 h-44 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg group"
                                >
                                    <img
                                        src={country.image}
                                        alt={country.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${NAVY_DEEP}00 40%, ${NAVY_DEEP}CC 100%)` }} />
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                        <FaMapPin style={{ color: GOLD }} />
                                        <span className="text-white font-semibold">{country.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                            Our{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD_DARK})` }}>
                                Numbers
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                            Consistent, reliable performance across every market we serve
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="text-center group bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" style={{ color: GOLD_DARK }}>
                                    {stat.icon}
                                </div>
                                <div ref={addCounterRef} className="text-3xl md:text-4xl font-bold text-slate-900">
                                    0{stat.suffix}
                                </div>
                                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-16 bg-gradient-to-br from-slate-50 to-white border-t border-slate-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                            Additional{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD_DARK})` }}>
                                Services
                            </span>
                        </h2>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                        {additionalServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.03 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md border border-slate-200 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300 cursor-pointer">
                                    <FaCheckCircle className="text-sm" style={{ color: GOLD_DARK }} />
                                    <span className="text-slate-700 font-medium text-sm">{service}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default page;
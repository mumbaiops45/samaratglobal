"use client"
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGlobe, FaShippingFast, FaHandshake, FaAward, FaUsers, FaRocket, FaCheckCircle, FaStar, FaBuilding, FaBullseye, FaEye, FaGem, FaCrown, FaShieldAlt, FaHeart, FaCogs, FaQuoteLeft } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const NAVY = '#0A1F44';
const NAVY_MID = '#1B3A7A';
const ROYAL = '#1B4B91';
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F1D77E';

const page = () => {
    const heroRef = useRef(null);
    const bgImageRef = useRef(null);
    const badgeRef = useRef(null);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const badgeRowRef = useRef(null);
    const ctaRef = useRef(null);
    const statCardRefs = useRef([]);
    const logoRef = useRef(null);
    const counterRefs = useRef([]);

    statCardRefs.current = [];
    counterRefs.current = [];

    const addCounterRef = (el) => {
        if (el && !counterRefs.current.includes(el)) counterRefs.current.push(el);
    };


    const teamMembers = [
        {
            name: "Arun Pandey",
            role: "Director",
            image: "arnun.jpg",
            description: "Visionary leader with 20+ years of experience in global trade",
            expertise: "Strategic Planning",

        },
        {
            name: "Jay Kumar Sinha",
            role: "Marketing Head",
            image: "jay.jpg",
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
        }
    ];

    const stats = [
        { value: 500, suffix: "+", label: "Clients Served", icon: <FaUsers /> },
        { value: 50, suffix: "+", label: "Countries", icon: <FaGlobe /> },
        { value: 15, suffix: "+", label: "Years Excellence", icon: <FaAward /> },
        { value: 100, suffix: "%", label: "Client Satisfaction", icon: <FaStar /> }
    ];

    const coreValues = [
        {
            icon: <FaGem className="text-4xl" />,
            title: "Quality You Can Trust",
            description: "Consistent, strict quality control across sourcing and export.",
            color: `from-[${ROYAL}] to-[#2F6FCB]`
        },
        {
            icon: <FaShieldAlt className="text-4xl" />,
            title: "Reliable Supply Chain",
            description: "Processes designed for continuity, cost-effectiveness and customer satisfaction.",
            color: `from-[${NAVY}] to-[${ROYAL}]`
        },
        {
            icon: <FaHeart className="text-4xl" />,
            title: "Customer First Policy",
            description: "Service that aims to exceed expectations and build long-term partnerships.",
            color: `from-[${GOLD}] to-[#B8860B]`
        }
    ];

    const services = [
        { icon: <FaGlobe />, title: "Global Sourcing", desc: "Premium products from trusted suppliers worldwide" },
        { icon: <FaShippingFast />, title: "Import/Export", desc: "Seamless cross-border trade solutions" },
        { icon: <FaHandshake />, title: "Procurement", desc: "Strategic procurement for your business" },
        { icon: <FaRocket />, title: "Trade Consulting", desc: "Expert guidance for international trade" },
        { icon: <FaCogs />, title: "Logistics", desc: "Efficient supply chain management" },
        { icon: <FaShieldAlt />, title: "Quality Assurance", desc: "Rigorous quality control processes" }
    ];

    const testimonials = [
        {
            quote: "Samrat Global has been an exceptional partner. Their commitment to quality and reliability is unmatched.",
            author: "John Smith",
            role: "CEO, Global Trading Co."
        },
        {
            quote: "The professionalism and expertise of the Samrat Global team made our international expansion seamless.",
            author: "Sarah Johnson",
            role: "Director, International Foods"
        },
        {
            quote: "We trust Samrat Global for all our sourcing needs. They consistently deliver beyond expectations.",
            author: "Michael Chen",
            role: "VP Operations, Asia Imports"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.from(badgeRef.current, { opacity: 0, y: -16, duration: 0.6 })
                .from(
                    headingRef.current.querySelectorAll('.hero-line'),
                    { opacity: 0, y: 40, stagger: 0.15, duration: 0.8 },
                    "-=0.3"
                )
                .from(paragraphRef.current, { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
                .from(
                    badgeRowRef.current.children,
                    { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 },
                    "-=0.3"
                )
                .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.5 }, "-=0.2")
                .from(
                    statCardRefs.current,
                    { opacity: 0, scale: 0.85, stagger: 0.15, duration: 0.6 },
                    "-=0.3"
                )
                .from(logoRef.current, { opacity: 0, scale: 0.7, rotate: -20, duration: 0.7 }, "-=0.5");

            statCardRefs.current.forEach((card, i) => {
                gsap.to(card, {
                    y: -10,
                    duration: 2.5 + i * 0.3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.2
                });
            });
            gsap.to(logoRef.current, {
                rotate: 360,
                duration: 24,
                repeat: -1,
                ease: "none"
            });
            gsap.fromTo(
                bgImageRef.current,
                { scale: 1.1, yPercent: 0 },
                {
                    scale: 1.25,
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }, heroRef);

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
        <div className="min-h-screen bg-white overflow-x-hidden">
            <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-[#0A1F44] via-[#0F2B5C] to-[#0A1F44] py-20 md:py-28">

                <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage:
                                `
                    linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
                    `,
                            backgroundSize: "60px 60px"
                        }}
                    />
                </div>

                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/20 blur-[150px]" />

                <div className=" absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1B4B91]/30 blur-[150px]" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: -60
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            transition={{
                                duration: 0.9,
                                ease: "easeOut"
                            }}
                            viewport={{
                                once: true
                            }}

                        >
                            <div
                                ref={badgeRef}
                                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/20 mb-8"
                            >
                                <span className="w-2 h-2 rounded-full animate-pulse"
                                    style={{
                                        background: GOLD
                                    }}
                                />
                                <span className="text-xs sm:text-sm font-semibold uppercase tracking-[3px]"
                                    style={{
                                        color: GOLD
                                    }}
                                >
                                    Welcome to Samrat Global
                                </span>
                            </div>
                            <h1
                                ref={headingRef}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white">
                                <span className="block">
                                    Vision,
                                </span>
                                <span className="block text-transparent bg-clip-text"
                                    style={{
                                        backgroundImage:
                                            `linear-gradient(
                                90deg,
                                ${GOLD},
                                ${GOLD_LIGHT},
                                ${GOLD}
                            )`
                                    }}
                                >
                                    Mission & Values
                                </span>
                            </h1>
                            <p
                                ref={paragraphRef}
                                className="mt-7 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-slate-300"
                            >
                                Learn about Samrat Global, an India-based sourcing and
                                export company focused on quality, reliability, and
                                customer-first trade partnerships.
                            </p>
                            <div
                                ref={badgeRowRef}
                                className="flex flex-wrap gap-4 mt-8">
                                {[
                                    {
                                        icon: <MdVerified />,
                                        text: "ISO Certified"
                                    },
                                    {
                                        icon: <FaGlobe />,
                                        text: "Global Reach"
                                    },
                                    {
                                        icon: <FaAward />,
                                        text: "15+ Years"
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{
                                            y: -5
                                        }}
                                        className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 transition-all"
                                    >
                                        
                                    </motion.div>
                                ))}
                            </div>
                            
                        </motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: .9,
                                x: 60
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                x: 0
                            }}
                            transition={{
                                duration: 1
                            }}
                            viewport={{
                                once: true
                            }}
                            className="relative flex justify-center"
                        >
                            <div className="absolute w-[350px] h-[350px] rounded-full blur-[120px] opacity-50"
                                style={{
                                    background: GOLD
                                }}
                            />
                            <div className="relative z-10 rounded-[35px] overflow-hidden border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,.5)]">
                                <img
                                    src="/commercial.jpg"
                                    alt="Samrat Global"
                                    className="w-[340px] sm:w-[420px] lg:w-[480px] h-[420px] object-cover transition duration-700 hover:scale-110" />
                                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-4">
                                    <h3 className="text-white font-bold text-lg">
                                        Global Export Excellence
                                    </h3>
                                    <p className="text-slate-300 text-sm mt-1">
                                        Trusted sourcing partner from India
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            <section className="py-16 bg-gradient-to-br from-white to-slate-50 border-b border-slate-100">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="text-center group"
                            >
                                <div className="relative w-16 h-16 mx-auto bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg" style={{ color: ROYAL }}>
                                    {stat.icon}
                                </div>
                                <div ref={addCounterRef} className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
                                    0{stat.suffix}
                                </div>
                                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-white">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-20" style={{ background: `linear-gradient(135deg, ${GOLD}, ${ROYAL})` }}></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="/globalwhare.jpg"
                                    alt="Samrat Global warehouse and logistics operations"
                                    className="w-full h-[420px] object-cover"
                                />
                                <div className="absolute bottom-4 left-4 bg-[#0A1F44]/70 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-white border border-white/10">
                                    Our Operations Floor
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-6 py-2 rounded-full border text-sm font-semibold uppercase tracking-wider mb-4" style={{ borderColor: `${GOLD}55`, color: '#B8860B', background: `${GOLD}11` }}>
                                Our Story
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                                Built on Trade Routes,{' '}
                                <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${NAVY}, ${ROYAL})` }}>
                                    Built on Trust
                                </span>
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-4">
                                What began as a focused sourcing desk has grown into a full-stack import–export operation spanning warehousing, quality control, and last-mile distribution.
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Every shipment that leaves our facility carries the same standard — checked, documented, and delivered on time, every time.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-8">
                                {["End-to-End Fulfilment", "In-House QC", "PAN India Network"].map((b) => (
                                    <span key={b} className="px-4 py-2 rounded-full text-sm border text-slate-700 hover:border-[#D4AF37]/50 transition-colors" style={{ borderColor: '#E2E8F0' }}>
                                        <FaCheckCircle className="inline mr-2 text-xs" style={{ color: GOLD }} /> {b}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-white">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-6 py-2 rounded-full border text-sm font-semibold uppercase tracking-wider mb-4" style={{ borderColor: `${GOLD}55`, color: '#B8860B', background: `${GOLD}11` }}>
                            <FaCrown className="inline mr-2" /> Your One Stop Solution
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mt-2">
                            One Umbrella for
                            <span className="block text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${NAVY}, ${NAVY_MID})` }}>
                                Global Trade Solutions
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-lg">
                            From sourcing to delivery, we handle everything under one roof with excellence
                        </p>
                    </motion.div>

                    <div className="relative max-w-6xl mx-auto">


                        <div className="grid md:grid-cols-3 gap-6 pt-0 md:pt-16">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100"
                                >
                                    <div className="relative">
                                        <div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 mb-4"
                                            style={{ background: `${ROYAL}14`, color: ROYAL }}
                                        >
                                            {service.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})` }}>
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 rounded-full filter blur-3xl" style={{ background: GOLD }}></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl" style={{ background: ROYAL }}></div>
                </div>

                <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Company Snapshot
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white">
                            About{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                                Samrat Global
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: <FaBuilding className="text-5xl" />,
                                title: "Who We Are",
                                description: "Samrat Global is a sourcing and export company based in India offering procurement solutions and worldwide export services.",
                                gradient: `from-[${ROYAL}] to-[#2F6FCB]`
                            },
                            {
                                icon: <FaEye className="text-5xl" />,
                                title: "Our Vision",
                                description: "To enrich lives globally through authentic ingredients and empowering style, uniting quality, trust, and value.",
                                gradient: `from-[${GOLD}] to-[#B8860B]`
                            },
                            {
                                icon: <FaBullseye className="text-5xl" />,
                                title: "Our Mission",
                                description: "Connect the world with excellence by sourcing and delivering premium products that inspire trust and elevate everyday experiences.",
                                gradient: `from-[${NAVY}] to-[${ROYAL}]`
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -12 }}
                                className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/20 transition-all duration-500"
                            >
                                <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mt-6 mb-4">{item.title}</h3>
                                <p className="text-slate-300 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-white">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-6 py-2 rounded-full border text-sm font-semibold uppercase tracking-wider mb-4" style={{ borderColor: `${GOLD}55`, color: '#B8860B', background: `${GOLD}11` }}>
                            Why Choose Us
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900">
                            Core{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, #B8860B)` }}>
                                Commitments
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {coreValues.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="group relative"
                            >
                                <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-200 hover:border-[#D4AF37]/40 transition-all duration-300 shadow-xl hover:shadow-2xl">
                                    <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                                        {value.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-4">{value.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                                    <div className={`mt-6 h-1 w-12 bg-gradient-to-r ${value.color} rounded-full group-hover:w-24 transition-all duration-500`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            <section className="relative py-14 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">

                {/* Background Glow */}
                <div className="absolute inset-0 overflow-hidden">

                    <div className="absolute -top-40 left-0 w-[500px] h-[500px] bg-[#1B4B91]/10 rounded-full blur-[140px]" />

                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px]" />

                </div>

                <div className="relative z-10">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: .8 }}
                        className="text-center mb-16"
                    >

                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-lg border border-[#D4AF37]/20 mb-5">

                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>

                            <span className="text-[#D4AF37] uppercase tracking-[4px] text-xs font-semibold">
                                Premium Services
                            </span>

                        </span>

                        <h2 className="text-4xl md:text-6xl font-black text-[#1B365D]">

                            Our{" "}

                            <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD86F] to-[#D4AF37] bg-clip-text text-transparent">
                                Expertise
                            </span>

                        </h2>

                        <p className="mt-5 text-slate-600 text-lg max-w-2xl mx-auto">
                            Delivering trusted import, export and sourcing solutions across global markets.
                        </p>

                    </motion.div>



                    {/* FIRST ROW */}

                    <div className="overflow-hidden py-4">

                        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">

                            {[

                                "Import & Export Solutions",

                                "Global Sourcing",

                                "Procurement Management",

                                "Logistics & Supply Chain",

                                "Quality Assurance",

                                "Customs Clearance",

                                "Warehousing & Distribution",

                                "Trade Consulting",

                                "Market Research",

                                "Product Development",

                                "Import & Export Solutions",

                                "Global Sourcing",

                                "Procurement Management",

                                "Logistics & Supply Chain",

                                "Quality Assurance",

                                "Customs Clearance",

                                "Warehousing & Distribution",

                                "Trade Consulting",

                                "Market Research",

                                "Product Development",

                            ].map((item, i) => (

                                <div
                                    key={i}
                                    className="mx-3"
                                >

                                    <div
                                        className="
                            group

                            flex
                            items-center
                            gap-3

                            px-7
                            py-4

                            rounded-full

                            bg-white/80

                            backdrop-blur-xl

                            border
                            border-slate-200

                            shadow-lg

                            hover:shadow-2xl

                            hover:border-[#D4AF37]

                            transition-all

                            duration-300

                            hover:-translate-y-1
                            "
                                    >

                                        <FaCheckCircle
                                            className="text-[#D4AF37] group-hover:scale-125 transition"
                                        />

                                        <span className="font-semibold whitespace-nowrap text-slate-700">
                                            {item}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>



                    {/* SECOND ROW */}

                    <div className="overflow-hidden py-4">

                        <div className="flex w-max animate-marqueeReverse hover:[animation-play-state:paused]">

                            {[

                                "Supplier Verification",

                                "Worldwide Shipping",

                                "Packaging",

                                "OEM Manufacturing",

                                "Vendor Network",

                                "Product Inspection",

                                "Door-to-Door Delivery",

                                "International Trade",

                                "Export Documentation",

                                "Custom Procurement",

                                "Supplier Verification",

                                "Worldwide Shipping",

                                "Packaging",

                                "OEM Manufacturing",

                                "Vendor Network",

                                "Product Inspection",

                                "Door-to-Door Delivery",

                                "International Trade",

                                "Export Documentation",

                                "Custom Procurement",

                            ].map((item, i) => (

                                <div
                                    key={i}
                                    className="mx-3"
                                >

                                    <div
                                        className="
                            group

                            flex
                            items-center
                            gap-3

                            px-7
                            py-4

                            rounded-full

                            bg-gradient-to-r

                            from-white

                            to-slate-50

                            backdrop-blur-xl

                            border

                            border-slate-200

                            shadow-lg

                            hover:border-[#D4AF37]

                            hover:shadow-2xl

                            transition-all

                            duration-300

                            hover:-translate-y-1
                            "
                                    >

                                        <FaCheckCircle
                                            className="text-[#D4AF37] group-hover:rotate-12 transition"
                                        />

                                        <span className="font-semibold whitespace-nowrap text-slate-700">
                                            {item}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </section>


            <section className="py-20 md:py-28 bg-white">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-6 py-2 rounded-full border text-sm font-semibold uppercase tracking-wider mb-4" style={{ borderColor: `${GOLD}55`, color: '#B8860B', background: `${GOLD}11` }}>
                            Leadership Team
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900">
                            Meet Our{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${NAVY}, ${NAVY_MID})` }}>
                                Team
                            </span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-lg">
                            Dedicated professionals committed to your success
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -12 }}
                                className="group relative"
                            >
                                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-white p-6 transition-all duration-500 group-hover:translate-y-full">
                                            <h3 className="text-xl font-bold text-slate-900">
                                                {member.name}
                                            </h3>
                                            <p
                                                className="font-semibold text-sm uppercase tracking-wider mt-1"
                                                style={{ color: "#B8860B" }}
                                            >
                                                {member.role}
                                            </p>
                                        </div>
                                        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col justify-center items-center text-center px-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                            <p className="text-white leading-relaxed text-sm">
                                                {member.description}
                                            </p>

                                            <span
                                                className="mt-5 px-4 py-2 rounded-full bg-[#D4AF37] text-white text-sm font-semibold"
                                            >
                                                {member.expertise}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})` }}>
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block backdrop-blur-sm px-6 py-2 rounded-full border font-semibold text-sm uppercase tracking-wider mb-4" style={{ background: `${GOLD}22`, borderColor: `${GOLD}44`, color: GOLD_LIGHT }}>
                            Testimonials
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white">
                            What Our{' '}
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                                Clients Say
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/20 transition-all duration-300"
                            >
                                <FaQuoteLeft className="text-4xl mb-4 opacity-50" style={{ color: GOLD }} />
                                <p className="text-white text-lg leading-relaxed mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#0A1F44] font-bold text-lg" style={{ background: `linear-gradient(135deg, ${GOLD}, #B8860B)` }}>
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{testimonial.author}</h4>
                                        <p className="text-slate-400 text-sm">{testimonial.role}</p>
                                    </div>
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
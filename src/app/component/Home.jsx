"use client"
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from 'next/navigation';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const BRAND = {
    navyDeep: "#0A1F44",
    navy: "#123C73",
    navyMid: "#1B4B91",
    navyBright: "#244D88",
    gold: "#D4AF37",
    goldLight: "#F5D77A",
    mist: "#F8FAFC",
};


const cards1 = [
    { title: "Sourcing & Procurement", image: "/sourcetransport.jpg", icon: "📦" },
    { title: "Global Fulfillment & Export", image: "/International.jpg", icon: "🚢" },
    { title: "Domestic  Distribution ", image: "/domesticdistribution.jpg", icon: "🚚" },
];

const commitments = [
    { title: "QUALITY YOU CAN TRUST", description: "Consistent, strict quality control across sourcing and export." },
    { title: "RELIABLE SUPPLY CHAIN", description: "Processes designed for continuity, cost-effectiveness and customer satisfaction." },
    { title: "CUSTOMER FIRST POLICY", description: "Service that aims to exceed expectations and build long-term partnerships." },
];

const services = [
    "Product Development",
    "Product Purchasing",
    "Supplier Management",
    "Order Monitoring",
    "Delivery at Destination",
];

const aboutCards = [
    { title: "About Us", description: "The Samrat Global is a sourcing and export company based in India. Driven by innovation and a customer-centric , we serve as a strategic sourcing partner for businesses worldwide." },
    { title: "Mission", description: "To create lasting value for customers worldwide by delivering excellence through quality, innovation, and trust while building sustainable partnerships across global markets." },
    { title: "Vision", description: "To connect global markets through premium-quality products, fostering trust, reliability and long-term value with customer-focused service." },
    { title: "We Focus on Quality", description: "Consistency in quality is not just a standard—it's our commitment to excellence. At The Samrat Global, we strive to exceed expectations every time, ensuring our clients receive nothing but the best." },
    { title: "Reliable Supply Chain", description: "A strong and dependable supply chain, cost-effectiveness, and customer satisfaction. The Samrat Global remains dedicated to refining our operations to uphold reliability." },
    { title: "Our Customer-First Policy", description: "At The Samrat Global, we don't just meet customer expectations-we exceed them. Our Policy  to be continuously improve, ensuring lasting relationships and unmatched satisfaction." }
];

const content = [
    { blueTitle: "Sourcing", whiteTitle: "and Procurement", description: "Water transport is a cost effective logistic solution, ideal for moving large quantities across vast distances." },
    { blueTitle: "Global Fulfilment", whiteTitle: "& Exports", description: "At Samrat Global, we export a diverse range of high quality products to partners across the globe." },
    { blueTitle: "Domestic", whiteTitle: "Distribution", description: "We take pride in supplying and distributing our premium products and services to businesses across PAN India." }
];

const cards = [
    {
        tag: "Core Value",
        eyebrow: "Our Commitment",
        title: "Quality",
        image: "agriculture.webp",
        body: (
            <>
                <span className="font-semibold" style={{ color: BRAND.navyBright }}>Samrat Global Private Limited</span> — quality is not just a promise, it&apos;s the foundation of everything we do. As a trusted Indian sourcing and export company, we bring the richness of India&apos;s agricultural heritage to global markets with precision, consistency, and integrity.
            </>
        ),
        badges: ["ISO Certified", "Global Standards", "Sustainable Sourcing"]
    },
    {
        tag: "Trusted Partner",
        eyebrow: "Who We Are",
        title: "Samrat Global",
        image: "SamratGlobal.jpg",
        body: <>Samrat Global Private Limited is a trusted import–export and logistics company delivering complete end-to-end trade solutions across India.</>,
        stats: [
            { value: "500+", label: "Clients Served" },
            { value: "50+", label: "Countries" },
            { value: "15+", label: "Years" },
            { value: "100%", label: "Satisfaction" }
        ]
    }
];


const TiltCard = ({ children, className = "", tiltStrength = 10 }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltStrength, -tiltStrength]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltStrength, tiltStrength]), { stiffness: 200, damping: 20 });
    const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
            className={className}
        >
            <motion.div
                aria-hidden
                style={{
                    background: `radial-gradient(circle at ${glowX} ${glowY}, ${BRAND.gold}33, transparent 60%)`,
                }}
                className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[inherit]"
            />
            {children}
        </motion.div>
    );
};


const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);
    const router = useRouter();
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    cardRefs.current = [];

    const addCardRef = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % content.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const total = cardRefs.current.length;
            cardRefs.current.forEach((card, i) => {
                if (i === total - 1) return;
                const nextCard = cardRefs.current[i + 1];
                gsap.fromTo(
                    card,
                    { scale: 1, opacity: 1, filter: "brightness(1)", rotateX: 0 },
                    {
                        scale: 0.92,
                        opacity: 0.55,
                        filter: "brightness(0.55)",
                        rotateX: -4,
                        ease: "none",
                        immediateRender: false,
                        scrollTrigger: {
                            trigger: nextCard,
                            start: "top 82%",
                            end: "top 20%",
                            scrub: 1,
                        },
                    }
                );
            });
            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);


    return (
        <>
            <section id="hero" className="relative h-screen w-full overflow-hidden">
                <motion.video
                    ref={videoRef}
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 8, ease: "easeOut" }}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="/banner.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                <div
                    className="absolute inset-0 bg-black/35"
                    // style={{
                    //     background: `linear-gradient(to bottom, ${BRAND.navyDeep}99, ${BRAND.navyDeep}8c, ${BRAND.navyDeep}d9)`,
                    // }}
                />
                <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:px-10">
                    <div className="max-w-4xl lg:max-w-5xl text-center text-white">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={`title-${currentIndex}`}
                                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
                            >
                                <span
                                    className="bg-clip-text text-transparent"
                                    style={{ backgroundImage: `linear-gradient(90deg, ${BRAND.gold}, ${BRAND.goldLight})` }}
                                >
                                    {content[currentIndex].blueTitle}
                                </span>{" "}
                                <span className="text-white">{content[currentIndex].whiteTitle}</span>
                            </motion.h1>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={`desc-${currentIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2"
                            >
                                {content[currentIndex].description}
                            </motion.p>
                        </AnimatePresence>

                        <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-12">
                            {content.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Show slide ${index + 1}`}
                                    className="h-1 rounded-full transition-all duration-500"
                                    style={{
                                        width: index === currentIndex ? "3rem" : "1.5rem",
                                        backgroundColor: index === currentIndex ? BRAND.gold : "rgba(255,255,255,0.4)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span className="text-[10px] uppercase tracking-[3px]">
                        Scroll
                    </span>

                    <svg
                        width="18"
                        height="28"
                        viewBox="0 0 18 28"
                        fill="none"
                    >
                        <rect
                            x="1"
                            y="1"
                            width="16"
                            height="26"
                            rx="8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />

                        <motion.circle
                            cx="9"
                            cy="8"
                            r="2.5"
                            fill={BRAND.gold}
                            animate={{
                                y: [0, 10, 0],
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </svg>
                </motion.div>
            </section>

            <section className=" py-16 sm:py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: BRAND.mist }}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ backgroundColor: `${BRAND.navyMid}33` }} />
                    <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px]" style={{ backgroundColor: `${BRAND.gold}33` }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px]" style={{ backgroundColor: `${BRAND.navyBright}1a` }} />
                </div>
                <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-10 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.02 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 lg:mb-24"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-xl border shadow-lg mb-6" style={{ borderColor: `${BRAND.gold}4d`, boxShadow: `0 10px 30px ${BRAND.gold}1a` }}>
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: BRAND.gold }} />
                            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: BRAND.gold }}>
                                Our Expertise
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight" style={{ color: BRAND.navyBright }}>
                            Excellence in Every{" "}
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${BRAND.gold}, ${BRAND.goldLight}, ${BRAND.gold})` }}>
                                Step
                            </span>
                        </h2>
                        <p className="mt-5 text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
                            Delivering premium quality solutions with unmatched expertise, innovation and attention to detail.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {cards.map((card, i) => (
                            <div
                                key={card.title}
                                ref={addCardRef}
                                style={{ position: "sticky", top: "90px", zIndex: i + 1, perspective: "1200px" }}
                                className="group relative rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-2xl border border-white shadow-[0_25px_80px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-2"
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700"
                                    style={{ background: `linear-gradient(90deg, ${BRAND.gold}1a, transparent, ${BRAND.navyMid}1a)` }}
                                />
                                <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-14 p-5 sm:p-8 lg:p-12 items-center">
                                    <div className={`w-full lg:w-2/5 ${i % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                            <img src={card.image} alt={card.title} className="w-full h-[280px] sm:h-[350px] object-cover transition duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                            <div className="absolute top-5 left-5 px-4 py-2 rounded-full backdrop-blur-xl text-white text-xs border shadow-lg" style={{ backgroundColor: `${BRAND.navyDeep}cc`, borderColor: `${BRAND.gold}66` }}>
                                                {card.tag}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`w-full lg:w-3/5 ${i % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-14 h-[3px] rounded-full" style={{ background: `linear-gradient(90deg, ${BRAND.gold}, ${BRAND.navyMid})` }} />
                                            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold" style={{ color: BRAND.gold }}>
                                                {card.eyebrow}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 leading-tight" style={{ color: BRAND.navyBright }}>
                                            {card.title}
                                        </h3>
                                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{card.body}</p>
                                        {card.badges && (
                                            <div className="flex flex-wrap gap-3 mt-8">
                                                {card.badges.map((b) => (
                                                    <span key={b} className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm text-slate-700 shadow-sm transition hover:text-[#1B4B91]" style={{ borderColor: undefined }}>
                                                        ✓ {b}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {card.stats && (
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                                                {card.stats.map((s) => (
                                                    <motion.div
                                                        key={s.label}
                                                        whileHover={{ y: -4 }}
                                                        className="rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-4 text-center shadow-sm hover:shadow-xl transition"
                                                    >
                                                        <div className="text-2xl font-black" style={{ color: BRAND.navyBright }}>{s.value}</div>
                                                        <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28" >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }} />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 sm:mb-16 lg:mb-20 grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center">
                        <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                            <p className="mb-2 sm:mb-4 font-semibold uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm" style={{ color: BRAND.navyMid }}>
                                THE SAMRAT GLOBAL
                            </p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-black">
                                Connect The World<br />With Excellence
                            </h2>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
                            <p className="text-base sm:text-lg md:text-xl leading-7 sm:leading-9 text-gray-950">
                                We, <span className="font-bold" style={{ color: BRAND.navyMid }}>SAMRAT GLOBAL</span> are a sourcing & export company based in India, offering sourcing, procurement solutions and worldwide export services.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center">
                        {cards1.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true }}
                            >
                                <TiltCard
                                    tiltStrength={8}
                                    className="group relative overflow-hidden w-full sm:max-w-[340px] lg:max-w-[380px] h-[340px] lg:h-[380px] rounded-[32px] bg-white border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-shadow duration-700 hover:shadow-[0_40px_90px_rgba(0,0,0,0.30)]"
                                >
                                    <div className="relative w-[400px] h-[230px]  overflow-hidden">
                                        <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        <div className="absolute bottom-[-25px] left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-110" style={{ color: BRAND.navyBright }}>
                                            {card.icon}
                                        </div>
                                    </div>
                                    <div className="relative flex h-[120px] flex-col justify-between px-7 pt-10 pb-7">
                                        <div>
                                            <h3 className="text-2xl font-bold leading-tight transition-colors duration-500" style={{ color: "#1E3A5F" }}>
                                                {card.title}
                                            </h3>
                                        </div>
                                        <div className="h-[3px] w-14 rounded-full transition-all duration-700 group-hover:w-full" style={{ background: `linear-gradient(90deg, ${BRAND.navyBright}, ${BRAND.gold})` }} />
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28" style={{ backgroundColor: BRAND.mist }}>
                <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${BRAND.navyBright}1a` }} />
                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${BRAND.gold}1a` }} />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-16 lg:mb-24">
                        <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[4px]" style={{ color: BRAND.navyBright }}>WHY CHOOSE US</p>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                            Core
                            <span className="ml-3 bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${BRAND.navyBright}, ${BRAND.gold})` }}>Commitments</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-8">
                        {commitments.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 80 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 px-6 py-8 sm:px-10 sm:py-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_35px_80px_rgba(0,0,0,0.12)]"
                            >
                                <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100" style={{ background: `linear-gradient(90deg, ${BRAND.navyBright}0d, ${BRAND.gold}1a)` }} />
                                <div className="relative grid items-center gap-8 lg:grid-cols-12">
                                    <div className="lg:col-span-1 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg transition-all duration-500 group-hover:scale-110" style={{ backgroundColor: BRAND.navyBright }}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <motion.h2
                                        initial={{ x: -80 }} whileInView={{ x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}
                                        className="lg:col-span-7 text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 transition-colors duration-500 group-hover:text-[#123C73]"
                                    >
                                        {item.title}
                                    </motion.h2>
                                    <motion.div initial={{ x: 80, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="lg:col-span-4">
                                        <p className="text-base sm:text-lg leading-8 text-slate-600">{item.description}</p>
                                        <div className="mt-6 h-[3px] w-12 rounded-full transition-all duration-700 group-hover:w-full" style={{ background: `linear-gradient(90deg, ${BRAND.navyBright}, ${BRAND.gold})` }} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28"
                style={{
                    backgroundImage: "url('https://t3.ftcdn.net/jpg/02/34/00/96/360_F_234009633_da7XqdBPWmTBaTSkgCoVjI80Ws3PXyJ0.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="absolute inset-0" style={{ backgroundColor: `${BRAND.navyDeep}d9` }} />
                <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${BRAND.navyMid}4d` }} />
                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${BRAND.gold}33` }} />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        // initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                        className="mb-14 sm:mb-16 lg:mb-20 text-center"
                    >
                        <p className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[5px]" style={{ color: BRAND.gold }}>THE SAMRAT GLOBAL</p>
                        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white">
                            About <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${BRAND.gold}, ${BRAND.goldLight})` }}>Us</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-8 text-gray-300">
                            Building global partnerships through reliable sourcing, procurement and export solutions.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {aboutCards.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" }}
                                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <TiltCard
                                    tiltStrength={6}
                                    className="group relative overflow-hidden min-h-[380px] rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-2xl p-7 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition-colors duration-700 hover:border-white/40"
                                >
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                                    <div className="relative z-10">
                                        <motion.div
                                            animate={{ y: [0, -8, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className="mb-3 flex h-20 w-20 items-center justify-center rounded-3xl text-4xl shadow-xl"
                                            style={{ background: `linear-gradient(135deg, ${BRAND.navyBright}, ${BRAND.navyMid})` }}
                                        >
                                            {index === 0 ? "🏢" : index === 1 ? "🎯" : "🌍"}
                                        </motion.div>
                                        <h3 className="mb-2 text-2xl sm:text-3xl font-bold text-white transition-colors duration-500" style={{ color: undefined }}>
                                            {item.title}
                                        </h3>
                                        <p className="text-sm sm:text-base leading-8 text-gray-300">{item.description}</p>
                                        <motion.div
                                            initial={{ width: "40px" }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 1, delay: index * 0.2 + 0.4 }}
                                            viewport={{ once: true }}
                                            className="mt-8 h-[3px] rounded-full"
                                            style={{ background: `linear-gradient(90deg, ${BRAND.navyMid}, ${BRAND.gold})` }}
                                        />
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28" style={{ backgroundColor: "#020617" }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000')" }} />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-12 sm:mb-16 lg:mb-20 max-w-3xl">
                        <p className="mb-3 sm:mb-5 text-xs sm:text-sm font-semibold uppercase tracking-[3px] sm:tracking-[5px]" style={{ color: BRAND.navyMid }}>WHAT WE DO</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
                            Smart Sourcing & <span className="block" style={{ color: BRAND.navyMid }}>Procurement Solutions</span>
                        </h2>
                        <p className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300">
                            Secure storage and efficient cargo management are essential parts of the supply chain. We provide reliable sourcing, procurement and export solutions worldwide.
                        </p>
                    </motion.div>

                    <div className="grid items-center gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-2">
                        <motion.div initial={{ opacity: 0, x: -150 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="relative">
                            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1565619624098-cf4168a33f0a?q=80&w=1200" alt="Cargo management" className="h-[300px] sm:h-[400px] lg:h-[550px] w-full object-cover transition duration-700 hover:scale-110" />
                            </div>
                            <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 left-4 sm:left-6 lg:left-8 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 text-white shadow-xl" style={{ backgroundColor: BRAND.navyBright }}>
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">24/7</p>
                                <p className="text-xs sm:text-sm">Global Support</p>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="rounded-[30px] sm:rounded-[40px] border border-white/20 bg-white/10 p-6 sm:p-8 lg:p-10 backdrop-blur-xl">
                            <h3 className="mb-6 sm:mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Sourcing & Procurement</h3>
                            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                                {services.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 100 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.12, duration: 0.6 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 6 }}
                                        className="group flex items-center gap-3 sm:gap-4 lg:gap-5 rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 lg:p-5 text-white transition duration-500 hover:bg-white/10"
                                    >
                                        <span className="flex h-8 sm:h-10 w-8 sm:w-10 flex-shrink-0 items-center justify-center rounded-full text-sm sm:text-base text-white transition-colors duration-500" style={{ backgroundColor: BRAND.navyBright }}>
                                            {index + 1}
                                        </span>
                                        <p className="text-sm sm:text-base lg:text-lg">{service}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <button
                                className="mt-6 sm:mt-8 lg:mt-10 rounded-full px-6 sm:px-8 py-3 sm:py-4 font-semibold text-sm sm:text-base w-full sm:w-auto text-white shadow-lg cursor-pointer transition-shadow hover:shadow-2xl"
                                style={{ background: `linear-gradient(90deg, ${BRAND.navyDeep}, ${BRAND.navy})` }}
                                onClick={() => router.push("/service")}
                            >
                                Explore Services →
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
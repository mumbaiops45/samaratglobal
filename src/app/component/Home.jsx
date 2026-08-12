"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { Eye, Award, Truck, Handshake, Target,Building2 ,Sparkles , Globe2, ArrowUpRight } from "lucide-react";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const BRAND = {
    ink: "#050B14",
    surface: "#0A1A2C",
    surfaceAlt: "#0E2338",
    steel: "#15304A",
    cyan: "#22D3EE",
    cyanDeep: "#06B6D4",
    azure: "#2E6BFF",
    azureDeep: "#1E40AF",
    mist: "#F5F9FF",
    slate: "#8FA6BE",
};

const GRAD_LOGO = `linear-gradient(90deg, ${BRAND.azure}, ${BRAND.cyan})`;


const TECH_SECTIONS = [
    {
        id: "about-us",
        number: "01",
        title: "About Us",
        subtitle: "GLOBAL SOURCING & EXPORT PARTNER",
        badge: "Company",
        icon: Building2,
        images: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyY2RYj6GEWQiZxKknVPWGK6GtjC6BAT_O_EqCRnuFEy7o0ys3LeL5TVDP&s=10",
        paragraphs: [
            "The Samrat Global is a sourcing and export company based in India.",
            "Driven by innovation and a customer-centric approach, we serve as a strategic sourcing partner for businesses worldwide."
        ],
        cameraPos: [0, 85, 115],
        cameraTarget: [0, 75, -10],
        hotspot3D: [0, 75, -15],
        telemetry: {
            stat1: { label: "Industry", value: "Export" },
            stat2: { label: "Focus", value: "Global" },
            stat3: { label: "Approach", value: "Customer First" }
        }
    },
    {
        id: "mission",
        number: "02",
        title: "Mission",
        subtitle: "BUILDING VALUE THROUGH TRUST & QUALITY",
        badge: "Our Purpose",
        icon: Target,
        images: "https://intoindia.blog/wp-content/uploads/2021/07/india_office-1.jpg?w=1200",
        paragraphs: [
            "To create lasting value for customers worldwide by delivering excellence through quality, innovation, and trust.",
            "We build sustainable partnerships that help businesses grow across global markets."
        ],
        cameraPos: [-48, 6, 48],
        cameraTarget: [0, -1, 0],
        hotspot3D: [-14, -1, 5],
        telemetry: {
            stat1: { label: "Quality", value: "Premium" },
            stat2: { label: "Innovation", value: "Driven" },
            stat3: { label: "Partnerships", value: "Long-Term" }
        }
    },
    {
        id: "vision",
        number: "03",
        title: "Vision",
        subtitle: "CONNECTING GLOBAL MARKETS",
        badge: "Future",
        icon: Eye,
        images: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMVqiPm1Ov9L9-IMcuDP_uFgMBVkwVCtUbJDRZgsZMsNBr-kGkdGaeACR&s=10",
        paragraphs: [
            "To connect global markets through premium-quality products.",
            "We foster trust, reliability, and long-term value with customer-focused service."
        ],
        cameraPos: [34, 26, 40],
        cameraTarget: [0, 4, 0],
        hotspot3D: [0, 6, 2],
        telemetry: {
            stat1: { label: "Markets", value: "Global" },
            stat2: { label: "Trust", value: "Core Value" },
            stat3: { label: "Growth", value: "Sustainable" }
        }
    },
    {
        id: "quality",
        number: "04",
        title: "We Focus on Quality",
        subtitle: "EXCELLENCE IN EVERY SHIPMENT",
        badge: "Quality",
        icon: Award,
        images: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Ir96KElaEbdbxSTrZeN9mHZd4cdPqAsyMgIw5IOvjfXC_6vXH12id6Y&s=10",
        paragraphs: [
            "Consistency in quality is not just a standard  it's our commitment to excellence.",
            "Every product is carefully sourced and inspected to exceed customer expectations."
        ],
        cameraPos: [-22, -2, -48],
        cameraTarget: [0, -4, -22],
        hotspot3D: [0, -3, -22],
        telemetry: {
            stat1: { label: "Quality", value: "Consistent" },
            stat2: { label: "Inspection", value: "Strict" },
            stat3: { label: "Commitment", value: "Excellence" }
        }
    },
    {
        id: "supply-chain",
        number: "05",
        title: "Reliable Supply Chain",
        subtitle: "EFFICIENT & DEPENDABLE OPERATIONS",
        badge: "Logistics",
        icon: Truck,
        images: "https://varuna-media-prod.s3.ap-south-1.amazonaws.com/030725111210_supply_chain_management_6f0a642fa0.jpg",
        paragraphs: [
            "A strong and dependable supply chain ensures timely delivery and cost efficiency.",
            "We continuously refine our operations to maintain reliability and customer satisfaction."
        ],
        cameraPos: [18, 22, 22],
        cameraTarget: [0, 11, 4],
        hotspot3D: [0, 12, 6],
        telemetry: {
            stat1: { label: "Delivery", value: "Reliable" },
            stat2: { label: "Efficiency", value: "High" },
            stat3: { label: "Network", value: "Global" }
        }
    },
    {
        id: "customer-first",
        number: "06",
        title: "Customer-First Policy",
        subtitle: "EXCEEDING EXPECTATIONS",
        badge: "Service",
        icon: Handshake,
        images: "https://t3.ftcdn.net/jpg/10/43/42/06/360_F_1043420602_HhmKNYUQrQKmIsriU2W0u8ZWSLn7e9zs.jpg",
        paragraphs: [
            "At The Samrat Global, we don't just meet customer expectations — we exceed them.",
            "Continuous improvement allows us to build lasting relationships and deliver unmatched satisfaction."
        ],
        cameraPos: [65, 45, 65],
        cameraTarget: [0, 8, 0],
        hotspot3D: [0, 10, -5],
        telemetry: {
            stat1: { label: "Support", value: "Dedicated" },
            stat2: { label: "Relationships", value: "Long-Term" },
            stat3: { label: "Satisfaction", value: "Priority" }
        }
    }
];

const commitments = [
    { title: "Quality You Can Trust", description: "Consistent, strict quality control across sourcing and export." },
    { title: "Reliable Supply Chain", description: "Processes designed for continuity, cost-effectiveness and customer satisfaction." },
    { title: "Customer First Policy", description: "Service that aims to exceed expectations and build long-term partnerships." },
];

const services = [
    "Product Development",
    "Product Purchasing",
    "Supplier Management",
    "Order Monitoring",
    "Delivery at Destination",
];

const content = [
    { blueTitle: "Sourcing", whiteTitle: "and Procurement", description: "Water transport is a cost effective logistic solution, ideal for moving large quantities across vast distances." },
    { blueTitle: "Global Fulfilment", whiteTitle: "& Exports", description: "At Samrat Global, we export a diverse range of high quality products to partners across the globe." },
    { blueTitle: "Domestic", whiteTitle: "Distribution", description: "We take pride in supplying and distributing our premium products and services to businesses across PAN India." }
];

const cards = [
    {
        theme: "dark",
        tag: "Core Value",
        eyebrow: "Our Commitment",
        title: "Quality",
        image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1600&auto=format&fit=crop",
        body: (
            <>
                <span className="font-semibold" style={{ color: BRAND.cyan }}>Samrat Global Private Limited</span> — quality is not just a promise, it&apos;s the foundation of everything we do. As a trusted Indian sourcing and export company, we bring the richness of India&apos;s agricultural heritage to global markets with precision, consistency, and integrity.
            </>
        ),
        badges: ["ISO Certified", "Global Standards", "Sustainable Sourcing"]
    },
    {
        theme: "light",
        tag: "Trusted Partner",
        eyebrow: "Who We Are",
        title: "Samrat Global",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop",
        body: <>Samrat Global Private Limited is a trusted import–export and logistics company delivering complete end-to-end trade solutions across India.</>,
        stats: [
            { value: "500+", label: "Clients Served" },
            { value: "50+", label: "Countries" },
            { value: "15+", label: "Years" },
            { value: "100%", label: "Satisfaction" }
        ]
    },
    {
        theme: "dark",
        eyebrow: "Smart Forecasting",
        title: "Optimized routes,lower cost",
        body: "In-house route intelligence calculates the most efficient path for every shipment, factoring seasonality, fuel cost and customs turnaround.",
        image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1600&auto=format&fit=crop",
        stats: [
            { value: "18%", label: "Cost saved" },
            { value: "3.5x", label: "Faster ETA" },
        ],
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};



const CargoKiteTechSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionContainerRef = useRef(null);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-35% 0px -35% 0px",
            threshold: 0.25,
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const index = Number(
                    entry.target.getAttribute(
                        "data-index"
                    )
                );

                if (
                    !Number.isNaN(index) &&
                    index >= 0 &&
                    index < TECH_SECTIONS.length
                ) {
                    setActiveIndex(index);
                }
            });
        };

        const observer =
            new IntersectionObserver(
                handleIntersect,
                observerOptions
            );

        sectionRefs.current.forEach((el) => {
            if (el) {
                observer.observe(el);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const scrollToCard = (index) => {
        if (
            index < 0 ||
            index >= TECH_SECTIONS.length
        ) {
            return;
        }

        setActiveIndex(index);

        const targetEl =
            sectionRefs.current[index];

        if (targetEl) {
            targetEl.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };


    const currentSection =
        TECH_SECTIONS[activeIndex] ||
        TECH_SECTIONS[0];

    const currentImage =
        currentSection?.images || "";



    return (
        <section ref={sectionContainerRef} className="relative w-full text-slate-100  bg-white">

            <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-32">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{
                        once: true,
                        margin: "-10%",
                    }}
                    variants={fadeUp}
                    className="max-w-2xl mb-20 lg:mb-28"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase mb-4 border"
                        style={{
                            backgroundColor:
                                `${BRAND.cyan}14`,
                            borderColor:
                                `${BRAND.cyan}4d`,
                            color: BRAND.cyan,
                        }}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>The Samrat Global</span>
                    </div>

                    <h1 className="h1 text-black mb-5">
                        About{" "}
                        <span className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage:
                                    GRAD_LOGO,
                            }}
                        >
                            Us
                        </span>
                    </h1>
                    <p className="text-slate-700 text-sm lg:text-base leading-relaxed max-w-xl">
                        Building global partnerships through reliable sourcing, procurement and export solutions.
                    </p>

                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-stretch">

                    <div className="space-y-[55vh]">

                        {TECH_SECTIONS.map(
                            (sec, idx) => {
                                const IconComponent =
                                    sec.icon;

                                const isActive =
                                    activeIndex ===
                                    idx;

                                return (
                                    <div
                                        key={
                                            sec.id
                                        }
                                        ref={(el) => {
                                            sectionRefs.current[
                                                idx
                                            ] = el;
                                        }}
                                        data-index={
                                            idx
                                        }
                                        className="max-w-xl transition-all duration-700"
                                    >
                                        <motion.div
                                            initial={{
                                                opacity: 0.45,
                                                y: 30,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            viewport={{
                                                once: false,
                                                margin: "-20%",
                                            }}
                                            transition={{
                                                duration: 0.6,
                                            }}
                                            className="relative p-7 lg:p-10 md:h-[500px] rounded-3xl border shadow-xl transition-all duration-700 overflow-hidden"
                                            style={
                                                isActive
                                                    ? {
                                                        backgroundColor:
                                                            "#F3F4F6",

                                                        borderColor:
                                                            `${BRAND.cyan}cc`,

                                                        boxShadow:
                                                            `0 25px 70px -20px ${BRAND.cyan}33`,

                                                        transform:
                                                            "scale(1.03)",
                                                    }
                                                    : {
                                                        backgroundColor:
                                                            "#FFFFFF",

                                                        borderColor:
                                                            "#E2E8F0",

                                                        opacity: 0.72,
                                                    }
                                            }
                                        >
                                            <div className="absolute top-0 right-0 translate-x-3 -translate-y-3 px-4 py-1.5 rounded-xl font-black text-xs font-mono shadow-lg"
                                                style={{
                                                    background:
                                                        GRAD_LOGO,
                                                    color:
                                                        BRAND.ink,
                                                }}
                                            >
                                                {
                                                    sec.number
                                                }

                                                {" / "}

                                                {String(
                                                    TECH_SECTIONS.length
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </div>
                                            <div className="h-full flex flex-col">
                                                <div className="flex items-center gap-3 mb-3">
                                                    {IconComponent && (
                                                        <IconComponent
                                                            className="w-6 h-6"
                                                            style={{
                                                                color:
                                                                    BRAND.cyan,
                                                            }}
                                                        />
                                                    )}

                                                    <span className="text-xs font-mono font-bold uppercase tracking-widest"
                                                        style={{
                                                            color:
                                                                BRAND.cyan,
                                                        }}
                                                    >
                                                        {
                                                            sec.badge
                                                        }
                                                    </span>
                                                </div>
                                                <h2 className="h3 text-black mb-1"
                                                >{sec.title}</h2>
                                                <p className="text-[11px] font-mono uppercase tracking-wider mb-6"
                                                    style={{
                                                        color:
                                                            `${BRAND.cyan}cc`,
                                                    }}
                                                >{sec.subtitle}
                                                </p>
                                                <div className="space-y-4 mb-8">
                                                    {sec.paragraphs?.map(
                                                        (
                                                            p,
                                                            pIdx
                                                        ) => (
                                                            <p key={pIdx}
                                                                className="text-sm text-slate-700 leading-relaxed">
                                                                {p}</p>
                                                        )
                                                    )}
                                                </div>
                                                {sec.telemetry && (
                                                    <div className="grid grid-cols-3 gap-3 pt-4 border-t mb-6"
                                                        style={{ borderColor: "#CBD5E1" }}
                                                    >
                                                        {Object.values(sec.telemetry).map((t, tIdx) => (
                                                            <div key={tIdx}
                                                                className="p-3 rounded-2xl  border-slate-200 bg-white"
                                                            >

                                                                <div className="text-[10px] font-mono text-slate-500 uppercase truncate">
                                                                    {t.label}
                                                                </div>
                                                                <div className="text-sm font-bold font-mono mt-0.5"
                                                                    style={{color:BRAND.cyan,}}
                                                                >
                                                                    {t.value}
                                                                </div>
                                                            </div>
                                                        )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            }
                        )}

                    </div>
                    <div className="lg:sticky lg:top-22 lg:self-start flex items-start w-full">
                    <div className="w-full">
                            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[500px] rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl bg-slate-100">
                                <AnimatePresence mode="wait">
                                    {currentImage ? (
                                        <motion.img
                                            key={currentImage}
                                            src={currentImage}
                                            alt={currentSection?.title ||"The Samrat Global"}
                                            initial={{
                                                opacity: 0,
                                                scale: 1.05,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 1,
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                ease:"easeInOut",
                                            }}
                                            className="absolute inset-0 w-full h-full object-cover object-center"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                                            <span className="text-sm text-slate-400 font-mono">
                                                Image unavailable
                                            </span>
                                        </div>
                                    )}

                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none"/>
                                <div className="absolute-bottom-24-right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                                    style={{backgroundColor:BRAND.cyan}}
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] mb-2"
                                        style={{color:BRAND.cyan}}
                                    >
                                        {currentSection?.badge}
                                    </div>
                                    <h3 className="h3">
                                        {currentSection?.title}
                                    </h3>
                                    <p className="text-sm text-white/75 mt-2 max-w-md">
                                        {currentSection?.subtitle}
                                    </p>
                                </div>
                                <div className="absolute top-6 right-6">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black font-mono backdrop-blur-md border"
                                        style={{backgroundColor:`${BRAND.cyan}22`,borderColor:`${BRAND.cyan}66`,color: "#fff"}}
                                    >
                                        {String(activeIndex +1).padStart(2,"0")}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 mt-6">
                                {TECH_SECTIONS.map((sec,idx) => {
                                        const isActive =activeIndex === idx;
                                        return (
                                            <button key={sec.id}
                                                type="button"
                                                onClick={() =>
                                                    scrollToCard(
                                                        idx
                                                    )
                                                }
                                                aria-label={`Go to ${sec.title}`}
                                                className="group relative h-2 transition-all duration-500"
                                                style={{width:isActive? "36px": "10px"}}
                                            >
                                                <span className="absolute inset-0 rounded-full transition-all duration-500"
                                                    style={{backgroundColor:isActive? BRAND.cyan: "#CBD5E1"}}
                                                />
                                            </button>
                                        );
                                    }
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-4 px-1">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                                    Scroll to explore
                                </span>
                                <span className="text-[10px] font-mono uppercase tracking-widest"
                                    style={{color:BRAND.cyan}}
                                >
                                    {String(activeIndex +1).padStart(2,"0")}
                                    {" / "}
                                    {String(TECH_SECTIONS.length).padStart(2,"0")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);
    const router = useRouter();
    const wrapRef = useRef(null);
    const panelRefs = useRef([]);
    const progressRefs = useRef([]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = true;
        const playVideo = async () => {
            try {
                await video.play();
            } catch (err) {
                console.log("Autoplay retry failed:", err);
            }
        };
        if (video.readyState >= 2) {
            playVideo();
        } else {
            video.addEventListener("canplay", playVideo, { once: true });
        }
        return () => {
            if (video) video.removeEventListener("canplay", playVideo);
        };
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenis.on('scroll', ScrollTrigger.update);
        const raf = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        ScrollTrigger.refresh();
        return () => {
            gsap.ticker.remove(raf);
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
            const total = cards.length;
            panelRefs.current.forEach((el, i) => {
                if (el) gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
            });
            const st = ScrollTrigger.create({
                trigger: wrap,
                start: "top top",
                end: () => `+=${window.innerHeight * (total - 1) * 1.1}`,
                pin: true,
                pinSpacing: true,
                scrub: 0.4,
                onUpdate: (self) => {
                    const progress = self.progress * (total - 1);
                    const active = Math.round(progress);

                    panelRefs.current.forEach((el, i) => {
                        if (!el) return;
                        const dist = Math.abs(progress - i);
                        const visible = dist < 0.5;
                        gsap.to(el, {
                            autoAlpha: visible ? 1 - dist * 2 : 0,
                            y: visible ? dist * 60 : i < active ? -40 : 40,
                            duration: 0.3,
                            overwrite: "auto",
                        });
                    });

                    progressRefs.current.forEach((dot, i) => {
                        if (!dot) return;
                        dot.style.opacity = i === active ? 1 : 0.3;
                        dot.style.width = i === active ? "28px" : "8px";
                    });
                },
            });
            return () => st.kill();
        });

        mm.add("(max-width: 1023px)", () => {
            panelRefs.current.forEach((el) => {
                if (el) gsap.set(el, { autoAlpha: 1, y: 0, clearProps: "transform" });
            });
        });

        return () => mm.revert();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % content.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section id="hero" className="relative h-screen w-full overflow-hidden" style={{ backgroundColor: BRAND.ink }}>
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="/banner.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                />
                <div className='absolute inset-0 bg-black/15' />
                <div className="relative z-10 h-full flex items-center  px-4 sm:px-6 md:px-10">
                    <div className="max-w-4xl lg:max-w-5xl  text-white">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={`title-${currentIndex}`}
                                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="h1 mb-4 sm:mb-6"
                            >
                                <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRAD_LOGO }}>
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
                                className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-50 max-w-2xl lg:max-w-3xl leading-relaxed px-2"
                            >
                                {content[currentIndex].description}
                            </motion.p>
                        </AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="mt-9 flex items-center  gap-4 flex-wrap"
                        >
                            <Link
                                href="/service"
                                className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                                style={{ background: GRAD_LOGO, boxShadow: `0 10px 40px -10px ${BRAND.cyan}80` }}
                            >
                                Explore Services
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="rounded-full px-7 py-3.5 cursor-pointer font-semibold text-sm text-white border backdrop-blur-md transition-all hover:bg-white/10"
                                style={{ borderColor: `${BRAND.mist}33` }}
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                        <div className="flex gap-2 sm:gap-3 mt-8 sm:px-5 md:px-10 sm:mt-10">
                            {content.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Show slide ${index + 1}`}
                                    className="h-1 rounded-full transition-all duration-500"
                                    style={{
                                        width: index === currentIndex ? "3rem" : "1.5rem",
                                        background: index === currentIndex ? GRAD_LOGO : "rgba(255,255,255,0.3)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-[10px] uppercase tracking-[3px]">Scroll</span>
                    <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
                        <rect x="1" y="1" width="16" height="26" rx="8" stroke="currentColor" strokeWidth="1.5" />
                        <motion.circle
                            cx="9" cy="8" r="2.5" fill={BRAND.cyan}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </svg>
                </motion.div>
            </section>

            <section ref={wrapRef} className="relative w-full overflow-hidden h-auto lg:h-screen">
                <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
                    {cards.map((_, i) => (
                        <div
                            key={i}
                            ref={(el) => (progressRefs.current[i] = el)}
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ width: "8px", background: GRAD_LOGO, opacity: 0.3 }}
                        />
                    ))}
                </div>
                {cards.map((panel, i) => (
                    <div
                        key={i}
                        ref={(el) => (panelRefs.current[i] = el)}
                        className="relative lg:absolute lg:inset-0 flex items-center py-16 lg:py-0"
                        style={{
                            // backgroundColor: panel.theme === "dark" ? BRAND.ink : BRAND.mist,
                            backgroundColor: panel.theme === BRAND.mist ? BRAND.ink : BRAND.mist,
                            willChange: "transform, opacity",
                        }}
                    >
                        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.94 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-15%" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ scale: 1.02 }}
                                className={`relative rounded-3xl overflow-hidden shadow-2xl h-[300px] lg:h-[440px] ${i % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
                                style={{ boxShadow: `0 30px 70px -25px ${panel.theme === "dark" ? BRAND.cyan + "40" : "#0002"}` }}
                            >
                                <img
                                    src={panel.image}
                                    alt={panel.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0" style={{
                                    background:
                                        panel.theme === "dark"
                                            ? `linear-gradient(180deg, transparent 40%, ${BRAND.ink}99 100%)`
                                            : "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.15) 100%)",
                                }}
                                />
                                <div className="absolute inset-0 ring-1 ring-inset rounded-3xl pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px ${BRAND.cyan}26` }} />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 1 ? -60 : 60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-15%" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className={i % 2 === 1 ? "lg:order-1" : "lg:order-2"}
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-12 h-[3px] rounded-full" style={{ background: GRAD_LOGO }} />
                                    <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold" style={{ color: BRAND.cyanDeep }}>
                                        {panel.eyebrow}
                                    </span>
                                </div>
                                <h3 className="h3 mb-5 whitespace-pre-line" style={{ color: panel.theme === "dark" ? BRAND.azureDeep : BRAND.azureDeep }}>
                                    {panel.title}
                                </h3>
                                <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: panel.theme === "dark" ? "#475569" : "#475569" }}>
                                    {panel.body}
                                </p>
                                {panel.stats && (
                                    <div className="flex gap-8 flex-wrap">
                                        {panel.stats.map((s) => (
                                            <div key={s.label}>
                                                <div
                                                    className="text-3xl font-black"
                                                    style={{ color: panel.theme === "dark" ? BRAND.cyan : BRAND.azureDeep }}
                                                >
                                                    {s.value}
                                                </div>
                                                <div
                                                    className="text-xs mt-1 uppercase tracking-wide"
                                                    style={{ color: panel.theme === "dark" ? "#8FA6BE" : "#64748B" }}
                                                >
                                                    {s.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                ))}
            </section>

            <section className="relative overflow-hidden  py-16 sm:py-20 lg:py-28" style={{ backgroundColor: BRAND.ink }}>
                <div
                    className="absolute inset-0 bg-cover object-cover bg-center opacity-100"
                    style={{ backgroundImage: "url('https://images.pexels.com/photos/14810111/pexels-photo-14810111.jpeg?_gl=1*1j98rqm*_ga*MTIxODIyODUuMTc4NjUxNzE2NQ..*_ga_8JE65Q40S6*czE3ODY1MTcxNjQkbzEkZzEkdDE3ODY1MTczODUkajU5JGwwJGgw')" }}
                    
                />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 sm:mb-16 lg:mb-20 grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center">
                        <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                            <p className="mb-2 sm:mb-4 font-semibold uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm" style={{ color: BRAND.cyan }}>
                                THE SAMRAT GLOBAL
                            </p>
                            <h2 className="h2 text-white">
                                Connect The World<br />
                                <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRAD_LOGO }}>With Excellence</span>
                            </h2>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
                            <p className="text-base sm:text-lg md:text-xl leading-7 text-slate-50 sm:leading-9" >
                                We, <span className="font-bold" style={{ color: BRAND.cyan }}>SAMRAT GLOBAL</span> are a sourcing & export company based in India, offering sourcing, procurement solutions and worldwide export services.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28" style={{ backgroundColor: "#F5F9FF" }}>
                <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${BRAND.azure}1a` }} />
                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${BRAND.cyan}1a` }} />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-16 lg:mb-24">
                        <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[4px]" style={{ color: BRAND.azureDeep }}>WHY CHOOSE US</p>
                        <h2 className="h2 text-slate-900">
                            Core
                            <span className="ml-3 bg-clip-text text-transparent" style={{ backgroundImage: GRAD_LOGO }}>Commitments</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={staggerParent}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        className="space-y-8"
                    >
                        {commitments.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeUp}
                                whileHover={{ y: -6 }}
                                className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 px-6 py-8 sm:px-10 sm:py-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow duration-700 hover:shadow-[0_35px_80px_rgba(30,64,175,0.14)]"
                            >
                                {/* <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100" style={{ background: GRAD_LOGO_SOFT }} /> */}
                                <div className="relative grid items-center gap-8 lg:grid-cols-12">
                                    <div className="lg:col-span-1 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-black shadow-lg transition-all duration-500 group-hover:scale-110 bg-cyan-300"
                                    //  style={{ background: GRAD_LOGO }}
                                     >
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <h2 className="text-3xl font-bold lg:col-span-7 text-slate-900 transition-colors duration-500" style={{ "--hover-color": BRAND.azureDeep }}>
                                        {item.title}
                                    </h2>
                                    <div className="lg:col-span-4">
                                        <p className="text-base sm:text-lg leading-8 text-slate-600">{item.description}</p>
                                        <div className="mt-6 h-[3px] w-12 rounded-full transition-all duration-700 group-hover:w-full" style={{ background: GRAD_LOGO }} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <CargoKiteTechSection />


            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28" style={{ backgroundColor: BRAND.ink }}>
                <div className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: "url('ship.jpg')" }}
                />



                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-12 sm:mb-16 lg:mb-20 max-w-3xl">
                        <p className="mb-3 sm:mb-5 text-xs sm:text-sm font-semibold uppercase tracking-[3px] sm:tracking-[5px]" style={{ color: BRAND.cyan }}>WHAT WE DO</p>
                        <h2 className="h2 text-white">
                            Smart Sourcing & <span className="block bg-clip-text text-transparent" style={{ backgroundImage: GRAD_LOGO }}>Procurement Solutions</span>
                        </h2>
                        <p className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-lg leading-7 text-slate-50 sm:leading-8">
                            Secure storage and efficient cargo management are essential parts of the supply chain. We provide reliable sourcing, procurement and export solutions worldwide.
                        </p>
                    </motion.div>

                    <div className="grid items-center gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="relative"
                        >
                            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] shadow-2xl" style={{ boxShadow: `0 30px 80px -25px ${BRAND.cyan}40` }}>
                                {/* <img
                                    src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1400&auto=format&fit=crop"
                                    alt="Cargo management"
                                    className="h-[300px] sm:h-[400px] lg:h-[550px] w-full object-cover transition duration-700 hover:scale-110"
                                /> */}
                                <div className="absolute inset-0 ring-1 ring-inset rounded-[30px] sm:rounded-[40px]" style={{ boxShadow: `inset 0 0 0 1px ${BRAND.cyan}33` }} />
                            </div>
                            <div className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-8 left-4 sm:left-6 lg:left-8 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 text-white shadow-xl" style={{ background: GRAD_LOGO, boxShadow: `0 15px 40px -10px ${BRAND.cyan}80` }}>
                                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">24/7</p>
                                <p className="text-xs sm:text-sm">Global Support</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 200 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9 }}
                            viewport={{ once: true }}
                            className="rounded-[30px] sm:rounded-[40px] border p-6 sm:p-8 lg:p-10 backdrop-blur-xl"
                            style={{ borderColor: `${BRAND.mist}22`, backgroundColor: "#0E233833" }}
                        >
                            <h3 className="h3 mb-6 sm:mb-8 text-white">Sourcing & Procurement</h3>
                            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                                {services.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 100 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.12, duration: 0.6 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 6 }}
                                        className="group flex items-center gap-3 sm:gap-4 lg:gap-5 rounded-xl border p-3 sm:p-4 lg:p-5 text-white transition duration-500"
                                        style={{ borderColor: `${BRAND.mist}1a`, backgroundColor: `${BRAND.mist}0d` }}
                                    >
                                        <span className="flex h-8 sm:h-10 w-8 sm:w-10 flex-shrink-0 items-center justify-center rounded-full text-sm sm:text-base text-white transition-colors duration-500" style={{ background: GRAD_LOGO }}>
                                            {index + 1}
                                        </span>
                                        <p className="text-sm sm:text-base lg:text-lg">{service}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-6 sm:mt-8 lg:mt-10 inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3 sm:py-4 font-semibold text-sm sm:text-base w-full sm:w-auto text-white shadow-lg cursor-pointer transition-shadow hover:shadow-2xl"
                                style={{ background: GRAD_LOGO, boxShadow: `0 15px 40px -10px ${BRAND.cyan}80` }}
                                onClick={() => router.push("/service")}
                            >
                                Explore Services <ArrowUpRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
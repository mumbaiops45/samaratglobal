"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowUpRight, Plus, ShieldCheck, SearchCheck, Handshake } from "lucide-react";
import { faqs, TECH_SECTIONS, commitments, services, content, cards } from "../../data/data"

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}
const BRAND = {
    ink: "#0A1A3F",
    surface: "#0A1A2C",
    surfaceAlt: "#0E2338",
    steel: "#15304A",
    cyan: "#22D3EE",
    cyanDeep: "#06B6D4",
    azure: "#2E6BFF",
    azureDeep: "#1E40AF",
    mist: "#EAF1FF",
    slate: "#8FA6BE",
};
const GRAD_LOGO = `linear-gradient(90deg, ${BRAND.azure}, ${BRAND.cyan})`;
// Buttons carry white text over this fill, so it stays two stops of blue
// (never fading into the bright cyan GRAD_LOGO uses) to keep the label
// readable across the whole button.
const GRAD_BUTTON = `linear-gradient(90deg, ${BRAND.azure}, ${BRAND.azureDeep})`;
// Maps 1:1 to the `services` array order (Product Development → Delivery at
// Destination) — same imagery used on the Services page for consistency.
const SERVICE_MOSAIC_IMAGES = [
    "/agriculture.webp",
    "/commercial.jpg",
    "/globalwhare.jpg",
    "/packing.jpg",
    "/International.jpg",
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
    const trackRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".tech-slide").forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, x: 70 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        delay: (i % 3) * 0.07,
                        scrollTrigger: { trigger: el, start: "top 90%", containerAnimation: undefined },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const scrollByCard = (dir) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelector(".tech-slide");
        const step = card ? card.getBoundingClientRect().width + 20 : 320;
        track.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    return (
        <section ref={sectionRef} className="relative w-full bg-[#F5F9FF] py-20 lg:py-28">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={fadeUp}
                    className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16"
                >
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-mono uppercase text-primary">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Samrat Global India Private Limited</span>
                        </div>
                        <h1 className="h2 mb-4 text-black">
                            About <span className="grad-text">Us</span>
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                            Building global partnerships through reliable sourcing, procurement and export solutions.
                        </p>
                    </div>
                    <div className="hidden shrink-0 gap-2 sm:flex">
                        <button
                            type="button"
                            onClick={() => scrollByCard(-1)}
                            aria-label="Previous"
                            className="flex h-11 w-11 items-center justify-center rounded-sm border border-slate-200 text-slate-600 transition-colors hover:border-primary hover:text-primary"
                        >
                            <ArrowUpRight className="h-4 w-4 -rotate-135" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollByCard(1)}
                            aria-label="Next"
                            className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary text-white transition-colors hover:bg-primary/90"
                        >
                            <ArrowUpRight className="h-4 w-4 rotate-45" />
                        </button>
                    </div>
                </motion.div>
            </div>

            <div
                ref={trackRef}
                className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:px-12"
            >
                {TECH_SECTIONS.map((sec, idx) => {
                    const IconComponent = sec.icon;
                    return (
                        <div
                            key={sec.id}
                            className="tech-slide group relative h-[460px] w-[82%] shrink-0 snap-start overflow-hidden rounded-sm shadow-xl sm:w-[58%] lg:w-[31%]"
                        >
                            <img
                                src={sec.image}
                                alt={sec.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/55 to-[#0A1A3F]/10" />

                            <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-7">
                                <div className="flex items-center justify-between">
                                    {IconComponent && (
                                        <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/25 bg-white/10 backdrop-blur-md">
                                            <IconComponent className="h-5 w-5 text-secondary" />
                                        </span>
                                    )}
                                    <span className="rounded-sm border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-bold text-white backdrop-blur-md">
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div>
                                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-secondary">
                                        {sec.badge}
                                    </p>
                                    <h3 className="mb-2 text-2xl font-bold text-white lg:text-3xl">{sec.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-300">{sec.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mx-auto mt-4 flex max-w-7xl items-center gap-2 px-6 text-[10px] font-mono uppercase tracking-widest text-slate-500 lg:px-12">
                <ArrowUpRight className="h-3 w-3 rotate-45" /> Scroll to explore
            </div>
        </section>
    );
};

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);
    const router = useRouter();
    const overviewRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(-1);
    const [activeCommitment, setActiveCommitment] = useState(0);

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
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".overview-reveal");
            items.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 36 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        delay: (i % 3) * 0.08,
                        scrollTrigger: { trigger: el, start: "top 88%" },
                    }
                );
            });
        }, overviewRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % content.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* <section id="hero"
                className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-screen overflow-hidden"
                style={{ backgroundColor: BRAND.ink }}
            >
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full  object-cover"
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
                            <motion.p>
                                {content[currentIndex].heading}
                            </motion.p>
                            <motion.h1
                                key={`title-${currentIndex}`}
                                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="h2 mb-4 sm:mb-6"
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
                                className="text-base sm:text-lg md:text-xl lg:text-xl text-slate-50 max-w-2xl lg:max-w-3xl leading-relaxed px-2"
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
                                style={{ background: GRAD_BUTTON, boxShadow: `0 10px 40px -10px ${BRAND.cyan}80` }}
                            >
                                Explore Services
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="rounded-full px-7 py-3.5 cursor-pointer font-semibold text-sm text-white border backdrop-blur-md bg-white/15 transition-all hover:bg-white/10"
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
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-200"
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
            </section> */}
            <section
                id="hero"
                className="relative min-h-[560px] h-[100svh] max-h-[900px] overflow-hidden"
            // style={{ backgroundColor: BRAND.ink }}
            >
                <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/banner.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    aria-hidden="true"
                    tabIndex={-1}
                />

                {/* left-to-right scrim keeps text legible on wide screens without dimming the whole video */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />

                <div className="relative z-10 flex h-full items-center">
                    <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
                        <div className="max-w-2xl text-white lg:max-w-3xl">

                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={`eyebrow-${currentIndex}`}
                                    initial={{ opacity: 1, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200 sm:mb-4 sm:text-xs"
                                >
                                    {content[currentIndex].heading}
                                </motion.p>
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={`title-${currentIndex}`}
                                    initial={{ opacity: 1, y: 30, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    // fluid type: scales smoothly between breakpoints instead of jumping
                                    className="mb-4 text-[clamp(1.9rem,6vw,3rem)] font-bold leading-[1.1] tracking-tight sm:mb-6"
                                >
                                    <span
                                        className="bg-clip-text text-transparent"
                                        style={{ backgroundImage: GRAD_LOGO }}
                                    >
                                        {content[currentIndex].blueTitle}
                                    </span>{" "}
                                    <span className="text-white">
                                        {content[currentIndex].whiteTitle}
                                    </span>
                                </motion.h1>
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={`desc-${currentIndex}`}
                                    initial={{ opacity: 1, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="max-w-xl text-[clamp(0.95rem,2.2vw,1.2rem)] leading-relaxed text-slate-300 sm:max-w-2xl"
                                >
                                    {content[currentIndex].description}
                                </motion.p>
                            </AnimatePresence>

                            <motion.div
                                initial={{ opacity: 1, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
                            >
                                <Link
                                    href="/service"
                                    className="group inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 sm:px-7 sm:py-3.5"
                                    style={{
                                        background: GRAD_BUTTON,
                                        boxShadow: `0 10px 40px -10px ${BRAND.cyan}80`,
                                    }}
                                >
                                    Explore Services
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-sm border bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/25 sm:px-7 sm:py-3.5"
                                    style={{ borderColor: `${BRAND.mist}33` }}
                                >
                                    Contact Us
                                </Link>
                            </motion.div>

                            <div className="mt-8 flex gap-2 sm:mt-10 sm:gap-3">
                                {content.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        aria-label={`Show slide ${index + 1}`}
                                        aria-current={index === currentIndex}
                                        // py-2 gives a 40px tap target without changing the visual bar height
                                        className="group -my-2 py-2"
                                    >
                                        <span
                                            className="block h-1 rounded-full transition-all duration-500"
                                            style={{
                                                width: index === currentIndex ? "3rem" : "1.5rem",
                                                background:
                                                    index === currentIndex
                                                        ? GRAD_LOGO
                                                        : "rgba(255,255,255,0.35)",
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section ref={overviewRef} className="relative overflow-hidden bg-[#F5F9FF] py-20 sm:py-24 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                    {/* Our Commitment — intro */}
                    <div className="overview-reveal mx-auto mb-14 max-w-3xl text-center lg:mb-20">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-mono uppercase text-primary">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>Our Commitment</span>
                        </div>
                        <h2 className="h2 mb-5 text-slate-900">
                            Quality That Builds <span className="grad-text">Global Trust</span>
                        </h2>
                        <p className="text-base leading-relaxed text-slate-600 sm:text-lg">{cards[0].body}</p>
                    </div>

                    <div className="overview-reveal mb-20 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:mb-28">
                        {cards[0].stats.map((s, i) => {
                            const Icon = [ShieldCheck, SearchCheck, Handshake][i] || ShieldCheck;
                            return (
                                <div key={s.value} className="rounded-sm border border-slate-200 bg-[#EAF1FF] p-6">
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-gradient-to-br from-primary to-[#0E7490] text-white">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="h4 mb-1 text-slate-900">{s.value}</h3>
                                    <p className="text-sm text-slate-600">{s.label}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Who We Are */}
                    <div className="overview-reveal mb-20 grid items-center gap-10 lg:mb-28 lg:grid-cols-2 lg:gap-16">
                        <div className="relative h-[280px] overflow-hidden rounded-sm border border-slate-200 shadow-xl lg:h-[380px]">
                            <img src={cards[1].image} alt={cards[1].title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                        </div>
                        <div>
                            <div className="mb-4 flex items-center gap-3">
                                <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
                                    {cards[1].eyebrow}
                                </span>
                            </div>
                            <h3 className="h3 mb-4 text-slate-900">{cards[1].title}</h3>
                            <div className="text-base leading-relaxed text-slate-600 sm:text-lg">{cards[1].body}</div>
                            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                                {cards[1].stats.map((s) => (
                                    <div key={s.label}>
                                        <div className="text-3xl font-black text-primary">{s.value}</div>
                                        <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Smart Forecasting */}
                    <div className="overview-reveal grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        <div className="order-2 lg:order-1">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
                                    {cards[2].eyebrow}
                                </span>
                            </div>
                            <h3 className="h3 mb-4 text-slate-900">{cards[2].title}</h3>
                            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">{cards[2].body}</p>
                            <div className="mt-6 flex flex-wrap gap-10">
                                {cards[2].stats.map((s) => (
                                    <div key={s.label}>
                                        <div className="text-3xl font-black text-primary">{s.value}</div>
                                        <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative order-1 h-[280px] overflow-hidden rounded-sm border border-slate-200 shadow-xl lg:order-2 lg:h-[380px]">
                            <img src={cards[2].image} alt={cards[2].title} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#0A1A3F] py-16 sm:py-20 lg:py-28">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                            <p className="mb-3 font-semibold uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm text-secondary">
                                Company Positioning — The Samrat Global
                            </p>
                            <h2 className="h2 text-white mb-6">
                                Connect The World<br />
                                <span className="grad-text">With Excellence</span>
                            </h2>
                            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-slate-300">
                                We bring together sourcing, procurement and export expertise to help
                                businesses build dependable international supply networks.
                            </p>
                            <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-slate-300">
                                As a{" "}
                                <span className="font-bold text-secondary">global sourcing company,</span> Samrat
                                Global India connects businesses with sourcing opportunities, reliable
                                suppliers and efficient export solutions across global markets.
                            </p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }} viewport={{ once: true }}>
                            <div className="relative h-[280px] overflow-hidden rounded-sm border border-white/10 shadow-2xl sm:h-[340px] lg:h-[420px]">
                                <img src="/ship.jpg" alt="Cargo vessel at sea" className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F]/50 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28" style={{ backgroundColor: "#EAF1FF" }}>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-12 lg:mb-16">
                        <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[4px] text-primary">WHY CHOOSE US</p>
                        <h2 className="h2 text-slate-900">
                            Core <span className="grad-text">Commitments</span>
                        </h2>
                    </motion.div>

                    <div className="grid gap-4 lg:grid-cols-[28%_1fr] lg:gap-8">
                        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2 lg:h-full lg:flex-col lg:overflow-visible lg:pb-0">
                            {commitments.map((item, index) => {
                                const isActive = activeCommitment === index;
                                return (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => setActiveCommitment(index)}
                                        className={`shrink-0 rounded-sm px-4 py-3 text-left text-sm font-semibold transition-colors duration-300 lg:flex-1 lg:shrink lg:py-4 ${
                                            isActive ? "bg-primary text-white" : "bg-white text-slate-600 hover:bg-primary/5"
                                        }`}
                                    >
                                        <span className="mr-2 font-mono text-xs opacity-70">{String(index + 1).padStart(2, "0")}</span>
                                        {item.title}
                                    </button>
                                );
                            })}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCommitment}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35 }}
                                className="flex min-h-[220px] flex-col justify-center rounded-sm border border-slate-200 bg-white p-8 sm:p-10 lg:p-14"
                            >
                                <div className="mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-gradient-to-br from-primary to-[#0E7490] text-xl font-bold text-white">
                                    {String(activeCommitment + 1).padStart(2, "0")}
                                </div>
                                <h3 className="h3 mb-3 text-slate-900">{commitments[activeCommitment].title}</h3>
                                <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                                    {commitments[activeCommitment].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <CargoKiteTechSection />
            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28" style={{ backgroundColor: BRAND.ink }}>
                <div className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: "url('/ship.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/70 to-[#0A1A3F]/40" />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-12 sm:mb-16 lg:mb-20 max-w-3xl">
                        <p className="mb-3 sm:mb-5 text-xs sm:text-sm font-semibold uppercase tracking-[3px] sm:tracking-[5px] text-secondary">WHAT WE DO</p>
                        <h2 className="h2 text-white">
                            Smart Sourcing & <span className="grad-text block">Procurement Solutions</span>
                        </h2>
                        <p className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-lg leading-7 text-slate-300 sm:leading-8">
                            Our <span className='text-secondary'>Sourcing and Procurement</span> services help businesses identify products, coordinate with suppliers, manage purchasing requirements and support the movement of goods across markets.
                            <br />
                            From product development and supplier management to order monitoring and delivery coordination, we provide an integrated approach to international trade.
                        </p>
                    </motion.div>

                    {/* Bento mosaic — each of the five services gets its own image and
                        footprint instead of a repeated list row. */}
                    <div className="grid auto-rows-[170px] gap-4 sm:gap-5 md:auto-rows-[190px] md:grid-cols-4">
                        {services.map((service, index) => {
                            const image = SERVICE_MOSAIC_IMAGES[index] || SERVICE_MOSAIC_IMAGES[0];
                            const featured = index === 0;
                            return (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    viewport={{ once: true }}
                                    className={`group relative overflow-hidden rounded-sm shadow-lg ${featured ? "md:col-span-2 md:row-span-2" : "md:col-span-1"}`}
                                >
                                    <img
                                        src={image}
                                        alt={service.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/65 to-transparent" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                                        <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-sm bg-gradient-to-br from-primary to-[#0E7490] text-xs font-bold text-white">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className={`font-bold text-white ${featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}>
                                            {service.title}
                                        </h3>
                                        <p className={`mt-1 leading-relaxed text-slate-300 ${featured ? "block text-sm sm:text-base" : "hidden text-xs sm:block"}`}>
                                            {service.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-5 sm:mt-10">
                        <div className="flex items-center gap-3 rounded-sm border border-white/15 bg-white/5 px-5 py-3">
                            <span className="text-xl font-bold text-white">24/7</span>
                            <span className="text-xs uppercase tracking-wide text-slate-300">Global Support</span>
                        </div>
                        <button onClick={() => router.push("/service")} className="btn btn-primary">
                            Explore Services <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>
            <section className='relative overflow-hidden bg-[#EAF1FF] py-20 sm:py-24 lg:py-32'>
                <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="lg:sticky lg:top-24 lg:self-start"
                        >
                            <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-primary/25 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                Frequently Asked Questions
                            </div>
                            <h2 className='max-w-xl text-3xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl'>Global Sourcing <span className='grad-text block'>&amp; Export FAQs</span></h2>
                            <p className='mt-6 max-w-lg text-sm leading-7 text-slate-600 sm:text-base sm:leading-8'>
                                Find answers to common questions about our sourcing, procurement, supplier coordination and export services from India.
                            </p>

                            <div className='mt-8 flex items-center gap-3'>
                                <span className='h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary' />
                                <span className='text-xs tracking-widest text-slate-500'>Samrat Global India</span>
                            </div>
                        </motion.div>
                        <div className='space-y-4'>
                            {faqs.map((faq, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className={`overflow-hidden rounded-sm border bg-white transition-all duration-500 ${isOpen ? "border-primary/40 shadow-lg" : "border-slate-200 hover:border-primary/25"}`}>
                                            <button type='button'
                                                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                                className='flex w-full items-start gap-4 p-5 text-left sm:p-6'
                                                aria-expanded={isOpen}
                                            >
                                                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-sm font-bold transition-colors duration-300 ${isOpen ? "bg-gradient-to-br from-primary to-[#0E7490] text-white" : "bg-primary/5 text-primary"}`}>
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <span className="flex-1 pt-1.5 text-sm font-semibold text-slate-800 sm:text-base lg:text-lg">
                                                    {faq.q}
                                                </span>
                                                <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-primary/30 text-primary transition-all duration-500 ${isOpen ? "rotate-45 bg-primary/10" : "rotate-0"}`}>
                                                    <Plus className="h-4 w-4" />
                                                </span>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                                    >
                                                        <div className="border-t border-slate-100 py-4 pl-[4.25rem] pr-6 sm:pl-[4.75rem] sm:pr-14">
                                                            <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{faq.a}</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )
                            })}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-start gap-4 rounded-sm border border-primary/15 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Still have a question?</p>
                                    <p className="mt-0.5 text-sm text-slate-500">Our trade desk usually responds within 24 hours.</p>
                                </div>
                                <Link href="/contact" className="btn btn-primary shrink-0">
                                    Contact Us <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
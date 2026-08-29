"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowUpRight } from "lucide-react";
import { faqs, TECH_SECTIONS, commitments, services, content, cards } from "../../data/data"

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
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const staggerParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const renderWithHighlight = (text, highlight, color) => {
    if (!highlight) return text;

    const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx === -1) return text;

    return (
        <>
            {text.slice(0, idx)}
            <span className="font-semibold" style={{ color }}>
                {text.slice(idx, idx + highlight.length)}
            </span>
            {text.slice(idx + highlight.length)}
        </>
    );
};

const SectionParagraph = ({ para, accent }) => {
    if (para.heading) {
        return (
            <h3
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: accent }}
            >
                {para.heading}
            </h3>
        );
    }

    if (!para.text) return null;

    return (
        <p className="text-[15px] leading-relaxed text-slate-700">
            {renderWithHighlight(para.text, para.highlight, accent)}
        </p>
    );
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
                    entry.target.getAttribute("data-index")
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
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
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
        if (index < 0 || index >= TECH_SECTIONS.length) {
            return;
        }
        setActiveIndex(index);
        const targetEl = sectionRefs.current[index];
        if (targetEl) {
            targetEl.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };
    const currentSection = TECH_SECTIONS[activeIndex] || TECH_SECTIONS[0];
    const currentImage = currentSection?.image || "";
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
                            backgroundColor: `${BRAND.cyan}14`,
                            borderColor: `${BRAND.cyan}4d`,
                            color: BRAND.cyan,
                        }}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>The Samrat Global India Private Limited</span>
                    </div>
                    <h1 className="h2 text-black mb-5">
                        About{" "}
                        <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRAD_LOGO }}>
                            Us
                        </span>
                    </h1>
                    <p className="text-slate-700 text-xl leading-relaxed max-w-xl">
                        Building global partnerships through reliable sourcing, procurement and export solutions.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20 items-start">
                    <div className="space-y-10 sm:space-y-14 md:space-y-[55vh]">
                        {TECH_SECTIONS.map((sec, idx) => {
                            const IconComponent = sec.icon;
                            const isActive = activeIndex === idx;

                            return (
                                <div
                                    key={sec.id}
                                    ref={(el) => { sectionRefs.current[idx] = el; }}
                                    data-index={idx}
                                    className="max-w-xl"
                                >
                                    <motion.div
                                        initial={{ opacity: 0.45, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, margin: "-20%" }}
                                        transition={{ duration: 0.6 }}
                                        className="relative overflow-hidden rounded-3xl border p-7 shadow-xl transition-[background-color,border-color,box-shadow,transform] duration-700 lg:p-10 md:min-h-[600px]"
                                        style={
                                            isActive
                                                ? {
                                                    backgroundColor: "#F3F4F6",
                                                    borderColor: `${BRAND.cyan}cc`,
                                                    boxShadow: `0 25px 70px -20px ${BRAND.cyan}33`,
                                                    transform: "scale(1.03)",
                                                }
                                                : {
                                                    backgroundColor: "#FFFFFF",
                                                    borderColor: "#E2E8F0",
                                                    opacity: 0.72,
                                                }
                                        }
                                    >
                                        <div className="flex h-full flex-col">
                                            <div className="mb-3 flex items-center gap-3">
                                                {IconComponent && (
                                                    <IconComponent className="h-6 w-6" style={{ color: BRAND.cyan }} />
                                                )}
                                                <span
                                                    className="font-mono text-sm font-bold uppercase tracking-widest"
                                                    style={{ color: BRAND.cyan }}
                                                >
                                                    {sec.badge}
                                                </span>
                                            </div>

                                            <h2 className="mb-1 text-3xl font-bold text-black">{sec.title}</h2>

                                            <p
                                                className="mb-6 text-sm uppercase tracking-wider"
                                                style={{ color: `${BRAND.cyan}cc` }}
                                            >
                                                {sec.subtitle}
                                            </p>

                                            <div className="mb-8 space-y-4">
                                                {sec.paragraphs?.map((p, pIdx) => (
                                                    <SectionParagraph key={pIdx} para={p} accent={BRAND.cyan} />
                                                ))}
                                            </div>

                                            {sec.telemetry && (
                                                <div
                                                    className="mb-6 mt-auto grid grid-cols-3 gap-3 border-t pt-4"
                                                    style={{ borderColor: "#CBD5E1" }}
                                                >
                                                    {Object.values(sec.telemetry).map((t, tIdx) => (
                                                        <div
                                                            key={tIdx}
                                                            className="rounded-2xl border border-slate-200 bg-white p-3"
                                                        >
                                                            <div className="truncate font-mono text-[11px] uppercase tracking-wide text-slate-500">
                                                                {t.label}
                                                            </div>
                                                            <div
                                                                className="mt-1 font-mono text-sm font-bold leading-snug"
                                                                style={{ color: BRAND.cyan }}
                                                            >
                                                                {t.value}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}

                    </div>
                    <div className="lg:sticky lg:top-22 lg:self-start flex items-start w-full">
                        <div className="w-full">
                            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[500px] rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl bg-slate-100">
                                <AnimatePresence mode="wait">
                                    {currentImage ? (
                                        <motion.img
                                            key={currentImage}
                                            src={currentImage}
                                            alt={currentSection?.title || "The Samrat Global India Private Limited"}
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
                                                ease: "easeInOut",
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                                <div className="absolute-bottom-24-right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                                    style={{ backgroundColor: BRAND.cyan }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] mb-2" style={{ color: BRAND.cyan }}>
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
                                        style={{ backgroundColor: `${BRAND.cyan}22`, borderColor: `${BRAND.cyan}66`, color: "#fff" }}
                                    >
                                        {String(activeIndex + 1).padStart(2, "0")}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 mt-6">
                                {TECH_SECTIONS.map((sec, idx) => {
                                    const isActive = activeIndex === idx;
                                    return (
                                        <button key={sec.id}
                                            type="button"
                                            onClick={() =>
                                                scrollToCard(idx)
                                            }
                                            aria-label={`Go to ${sec.title}`}
                                            className="group relative h-2 transition-all duration-500"
                                            style={{ width: isActive ? "36px" : "10px" }}
                                        >
                                            <span className="absolute inset-0 rounded-full transition-all duration-500"
                                                style={{ backgroundColor: isActive ? BRAND.cyan : "#CBD5E1" }}
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
                                    style={{ color: BRAND.cyan }}
                                >
                                    {String(activeIndex + 1).padStart(2, "0")}
                                    {" / "}
                                    {String(TECH_SECTIONS.length).padStart(2, "0")}
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
    const [openIndex, setOpenIndex] = useState(0);

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
                                style={{ background: GRAD_LOGO, boxShadow: `0 10px 40px -10px ${BRAND.cyan}80` }}
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
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

    <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
            <div className="max-w-2xl text-white lg:max-w-3xl">

                <AnimatePresence mode="wait">
                    <motion.p
                        key={`eyebrow-${currentIndex}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:mb-4 sm:text-xs"
                    >
                        {content[currentIndex].heading}
                    </motion.p>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.h1
                        key={`title-${currentIndex}`}
                        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-xl text-[clamp(0.95rem,2.2vw,1.2rem)] leading-relaxed text-slate-100 sm:max-w-2xl"
                    >
                        {content[currentIndex].description}
                    </motion.p>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4"
                >
                    <Link
                        href="/service"
                        className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 sm:px-7 sm:py-3.5"
                        style={{
                            background: GRAD_LOGO,
                            boxShadow: `0 10px 40px -10px ${BRAND.cyan}80`,
                        }}
                    >
                        Explore Services
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border bg-white/15 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/25 sm:px-7 sm:py-3.5"
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

    <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 sm:bottom-8 sm:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
        <span className="text-[10px] uppercase tracking-[3px]">Scroll</span>
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden="true">
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
                                <h3 className="text-4xl font-bold mb-5 whitespace-pre-line" style={{ color: panel.theme === "dark" ? BRAND.azureDeep : BRAND.azureDeep }}>
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
                                COMPANY POSITIONING THE SAMRAT GLOBAL
                            </p>
                            <h2 className="h2 text-white">
                                Connect The World<br />
                                <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRAD_LOGO }}>With Excellence</span>
                            </h2>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
                            <p className="text-base sm:text-lg md:text-xl leading-7 text-slate-50 sm:leading-9" >
                                We,bring together sourcing, procurement and export expertise to help businesses build dependable international supply networks. <br />
                                As a {" "}
                                <span className="font-bold" style={{ color: BRAND.cyan }}>global sourcing company,</span> Samrat Global India connects businesses with sourcing opportunities, reliable suppliers and efficient export solutions across global markets.
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
                                <div className="relative grid items-center gap-8 lg:grid-cols-12">
                                    <div className="lg:col-span-1 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-black shadow-lg transition-all duration-500 group-hover:scale-110 bg-cyan-300"
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
                            Our <span className='text-cyan-300'>Sourcing and Procurement</span> services help businesses identify products, coordinate with suppliers, manage purchasing requirements and support the movement of goods across markets.
                            <br />
                            From product development and supplier management to order monitoring and delivery coordination, we provide an integrated approach to international trade.
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
                            <h3 className="sm:mb-8 text-white">Sourcing & Procurement</h3>
                            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                                {services.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 100 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: index * 0.12,
                                            duration: 0.6,
                                        }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 6 }}
                                        className='group flex items-start gap-3 sm:gap-4 lg:gap-5 rounded-xl border p-3 sm:p-4 lg:p-5 text-white transition duration-500'
                                        style={{
                                            borderColor: `${BRAND.mist}1a`,
                                            backgroundColor: `${BRAND.mist}od`,
                                        }}
                                    >
                                        <span className='flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full text-sm sm:text-base text-white'
                                            style={{ background: GRAD_LOGO }}
                                        >{index + 1}</span>
                                        <div className='min-w-0'>
                                            <h3 className='text-base font-semibold sm:text-lg lg:text-xl'>{service.title}</h3>
                                            <p className='mt-1 text-sm leading-relaxed text-white/70 sm:text-base'>{service.description}</p>
                                        </div>
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
            <section className='relative overflow-hidden py-20 sm:py-24 lg:py-32'>
                <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: GRAD_LOGO }} />
                <div className='pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full opacity-10 blur-3xl' style={{ backgroundColor: BRAND.mist }} />
                <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="lg:sticky lg:top-24 lg:self-start"
                        >
                            <div className='mb-5 flex items-center gap-3'>
                                <span className='h-px' style={{ background: BRAND.mist }} />
                                <p>FREQUENTLY ASKED QUESTIONS</p>
                            </div>
                            <h2 className='max-w-xl text-3xl font-semibold leading-[1.08] tracking-tight text-slate-800 sm:text-4xl lg:text-5xl xl:text-6xl'>GLOBAL SOURCING <span className='block text-slate-800'>& EXPORT FAQs</span></h2>
                            <p className='mt-6 max-w-lg text-sm leading-7 text-slate-800 sm:text-base sm:leading-8'>
                                Find answers to common questions bout our souring, procurement, supplier coordination and export services from India.
                            </p>

                            <div className='mt-8 flex items-center gap-3'>
                                <span className='h-1 w-12 rounded-full' style={{ background: GRAD_LOGO }} />
                                <span className='text-xs tracking-widest text-slate-800'>SAMRAT GLOBAL INDIA</span>
                            </div>
                        </motion.div>
                        <div className='space-y-3'>
                            {faqs.map((faq, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            y: 25,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.08,
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="overflow-hidden rounded-2xl border transition-all duration-500 bg-gray-300">
                                            <button type='button'
                                                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                                className='flex w-full items-center gap-4 p-4 text-left sm:p-5 lg:p-6'
                                                aria-expanded={isOpen}
                                            >
                                                <span className={`flex-1 pr-2 text-sm font-medium transition-colors duration-300 sm:text-base lg:text-lg ${isOpen ? "text-slate-800" : "text-slate-800"}`}>
                                                    {faq.q}
                                                </span>
                                                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-500 ${isOpen ? "rotate-45" : "rotate-0"}`}
                                                    style={{
                                                        borderColor: `${BRAND.mist}25`,
                                                        color: BRAND.mist,
                                                    }} >
                                                </span>

                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: "auto",
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.35,
                                                            ease: "easeInOut",
                                                        }}
                                                    >
                                                        <div className="px-4 pb-2 pr-5 sm:px-5 sm:pb-2  lg:px-6 lg:pb-2 ">
                                                            <p className="text-sm leading-7 text-slate-800 sm:text-base sm:leading-8">{faq.a}</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
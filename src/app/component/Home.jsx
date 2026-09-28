"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { content } from "../../data/data"
import { WhatWeDo, WhatWeExport, ExportProcess } from "./TradeSections";
import { AboutUs, GlobalMarkets, WhyChooseUs, Certifications, Logistics, Clients, RequestQuote } from "./HomeSections";

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

const EASE = [0.22, 1, 0.36, 1];
// Title lines start below their clipping box and slide up into view.
const lineReveal = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};


export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);

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
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % content.length);
        }, 6000);
        return () => clearInterval(interval);
        // restart the timer on every change so a manual pick gets a full 6s
    }, [currentIndex]);

    // Photo slides are busier than the video, so they get a heavier scrim.
    const hasImage = Boolean(content[currentIndex].image);

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
                                    // py-3 enlarges the tap target without changing the visual bar height
                                    className="-my-3 py-3"
                                >
                                    <span
                                        className="block h-1 rounded-full transition-all duration-500"
                                        style={{
                                            width: index === currentIndex ? "3rem" : "1.5rem",
                                            background: index === currentIndex ? GRAD_LOGO : "rgba(255,255,255,0.3)",
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-200"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-[11px] uppercase tracking-[3px]">Scroll</span>
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
                // fills the screen below the sticky navbar (72px / 80px on lg), capped on very
                // tall monitors; content-sized when that's taller, so short screens never clip
                className="relative flex min-h-[min(calc(100svh-72px),820px)] items-center overflow-hidden lg:min-h-[min(calc(100svh-80px),820px)]"
                style={{ backgroundColor: BRAND.ink }}
            >
                {/* the ship sails right of centre, so narrow screens crop toward it instead of the empty sea */}
                <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover object-[74%_center] md:object-center"
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

                {/* slides with an image crossfade over the video; slides without one reveal it.
                    Phones and portrait tablets get a portrait `mobileImage` when the slide has one — the wide
                    desktop banners only show a blurry sliver when cropped to a tall screen. */}
                <AnimatePresence>
                    {hasImage && (
                        <motion.div
                            key={`bg-${currentIndex}`}
                            aria-hidden="true"
                            initial={{ opacity: 0, scale: 1.06 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ opacity: { duration: 1 }, scale: { duration: 6, ease: "linear" } }}
                            className="absolute inset-0"
                        >
                            <picture>
                                {content[currentIndex].mobileImage && (
                                    <source media="(max-width: 767px), (orientation: portrait)" srcSet={content[currentIndex].mobileImage} />
                                )}
                                <img
                                    src={content[currentIndex].image}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </picture>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Wide screens: copy sits left, so the scrim fades left-to-right.
                    Phones: copy is centred, so the scrim is darkest through the middle band
                    and the top and bottom of the picture stay bright. */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/65 to-black/10 md:bg-gradient-to-r md:from-black/50 md:via-black/25 md:to-transparent" />
                {/* photos are busier than the video, so they get a heavier navy scrim on top */}
                <div
                    className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#0A1A3F]/65 to-transparent transition-opacity duration-1000 md:bg-gradient-to-r md:from-[#0A1A3F]/85 md:via-[#0A1A3F]/50 md:to-transparent ${hasImage ? "opacity-100" : "opacity-0"}`}
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />

                <div className="relative z-10 w-full">
                    <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 md:py-20 lg:px-10">
                        {/* centred on phones, left-aligned from md up */}
                        <div className="mx-auto max-w-2xl text-center text-white md:mx-0 md:text-left lg:max-w-3xl">

                            {/* one keyed group per slide so the whole block re-plays its entrance in sequence */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`copy-${currentIndex}`}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    variants={{
                                        hidden: {},
                                        show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
                                        exit: { opacity: 0, y: -16, filter: "blur(6px)", transition: { duration: 0.4, ease: EASE } },
                                    }}
                                >
                                    <motion.p
                                        variants={{
                                            hidden: { opacity: 0, x: -24 },
                                            show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
                                        }}
                                        className="mb-3 flex items-center justify-center gap-3 md:justify-start text-[11px] font-semibold uppercase tracking-[0.2em] sm:mb-4 sm:text-xs text-slate-200"
                                    >
                                        <motion.span
                                            aria-hidden="true"
                                            className="h-[2px] rounded-full"
                                            style={{ background: GRAD_LOGO }}
                                            variants={{
                                                hidden: { width: 0 },
                                                show: { width: 32, transition: { duration: 0.6, delay: 0.2, ease: EASE } },
                                            }}
                                        />
                                        {content[currentIndex].heading}
                                    </motion.p>

                                    {/* each line rises out of its own clipped box */}
                                    <h1 className="mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] md:drop-shadow-none text-[clamp(1.6rem,6.4vw,3rem)] font-bold leading-[1.1] tracking-tight sm:mb-6">
                                        <span className="block overflow-hidden pb-1">
                                            <motion.span
                                                variants={lineReveal}
                                                className="inline-block bg-clip-text text-transparent"
                                                style={{ backgroundImage: GRAD_LOGO }}
                                            >
                                                {content[currentIndex].blueTitle}
                                            </motion.span>
                                        </span>
                                        <span className="block overflow-hidden pb-1">
                                            <motion.span
                                                variants={lineReveal}
                                                className="inline-block"
                                                style={{ color: "#fff" }}
                                            >
                                                {content[currentIndex].whiteTitle}
                                            </motion.span>
                                        </span>
                                    </h1>

                                    <motion.p
                                        variants={{
                                            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                                            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
                                        }}
                                        className="mx-auto max-w-xl text-[clamp(0.95rem,2.2vw,1.2rem)] leading-relaxed sm:max-w-2xl md:mx-0 text-slate-300"
                                    >
                                        {content[currentIndex].description}
                                    </motion.p>
                                </motion.div>
                            </AnimatePresence>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
                                // small phones: equal full-width stacked buttons; wider: side by side
                                className="mx-auto mt-7 grid max-w-xs grid-cols-1 gap-3 min-[420px]:flex min-[420px]:max-w-none min-[420px]:flex-wrap min-[420px]:items-center min-[420px]:justify-center sm:mt-9 sm:gap-4 md:mx-0 md:justify-start"
                            >
                                <Link
                                    href="/product"
                                    className="group inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 sm:px-7 sm:py-3.5"
                                    style={{
                                        background: GRAD_BUTTON,
                                        boxShadow: `0 10px 40px -10px ${BRAND.cyan}80`,
                                    }}
                                >
                                    Explore Products
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </Link>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-sm border px-6 py-3 text-sm font-semibold backdrop-blur-md transition-colors sm:px-7 sm:py-3.5 bg-white/15 text-white hover:bg-white/25"
                                    style={{ borderColor: `${BRAND.mist}33` }}
                                >
                                    Get a Quote
                                </Link>
                            </motion.div>

                            <div className="mt-8 flex justify-center gap-2 sm:mt-10 sm:gap-3 md:justify-start">
                                {content.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        aria-label={`Show slide ${index + 1}`}
                                        aria-current={index === currentIndex}
                                        // py-3 gives a larger tap target without changing the visual bar height
                                        className="group -my-3 py-3"
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

            <AboutUs />
            <WhatWeDo />
            <WhatWeExport />
            <GlobalMarkets />
            <ExportProcess />
            <WhyChooseUs />
            <Certifications />
            <Logistics />
            <Clients />
            <RequestQuote />
        </>
    );
}
"use client";
import React, { useEffect, useState } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
  const phoneNumber = "919820903853";
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-dark text-white shadow-md ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:bg-primary sm:h-11 sm:w-11 ${
          showScrollTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp size={18} strokeWidth={2.2} />
      </button>

      <div className="flex flex-row-reverse items-center gap-3">
        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600 sm:h-14 sm:w-14"
        >
          <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7" />
        </a>
        <a
          href={`tel:+${phoneNumber}`}
          aria-label="Call us"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-105 sm:h-14 sm:w-14"
        >
          <Phone strokeWidth={2} className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
      </div>
    </div>
  );
};

export default WhatsApp;

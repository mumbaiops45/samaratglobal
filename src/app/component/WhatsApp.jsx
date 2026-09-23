"use client";
import React, { useEffect, useState } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
  const phoneNumber = "919920220309";
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6 sm:gap-2.5">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-dark text-white shadow-md ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:bg-primary sm:h-9 sm:w-9 ${
          showScrollTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp size={15} strokeWidth={2.2} />
      </button>

      <div className="flex flex-row-reverse items-center gap-2 sm:gap-2.5">
        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-green-600 sm:h-9 sm:w-9"
        >
          <FaWhatsapp size={15} className="sm:hidden" />
          <FaWhatsapp size={16} className="hidden sm:block" />
        </a>
        <a
          href={`tel:+${phoneNumber}`}
          aria-label="Call us"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-300 hover:scale-105 sm:h-9 sm:w-9"
        >
          <Phone size={14} strokeWidth={2} className="sm:hidden" />
          <Phone size={15} strokeWidth={2} className="hidden sm:block" />
        </a>
      </div>
    </div>
  );
};

export default WhatsApp;

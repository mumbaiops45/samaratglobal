"use client";
import React from "react";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
  const phoneNumber = "919920220309";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-row-reverse items-center gap-2 sm:bottom-6 sm:right-6 sm:gap-2.5">
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
  );
};

export default WhatsApp;

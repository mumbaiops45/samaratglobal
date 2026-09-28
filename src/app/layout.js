import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar"
import Footer from "./component/Footer";
import WhatsApp from "./component/WhatsApp";
import { MotionSettings } from "./component/Reveal";
import { Description } from "@headlessui/react";

export const metadata = {
  title: "Import Export Company in India | Samrat Global India",
  description: "Samrat Global India is an import-export company in India exporting medicinal plants, spices, food products and stainless steel equipment worldwide, with sourcing agent, logistics and export documentation services.",
  alternates: {
    canonical: "https://samratglobalindia.com/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" data-new-gr-c-s-check-loaded="14.1141.0"                      data-gr-ext-installed="">
        <MotionSettings>
        <Navbar/>
        {children}
        <WhatsApp/>
        <Footer/>
        </MotionSettings>
        </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar"
import Footer from "./component/Footer";
import WhatsApp from "./component/WhatsApp";
import { Description } from "@headlessui/react";

export const metadata = {
  title: "GLobal Sourcing Company in India | Samrat Global India",
  description: "Samrat Global India is a trusted global sourcing company in India offering sourcing, procurement, supplier management, and export solutions.",
  alternates: {
    canonical: "https://samratglobalindia.com/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" data-new-gr-c-s-check-loaded="14.1141.0"                      data-gr-ext-installed="">
        <Navbar/>
        {children}
        <WhatsApp/>
        <Footer/>
        </body>
    </html>
  );
}

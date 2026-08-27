import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar"
import Footer from "./component/Footer";
import WhatsApp from "./component/WhatsApp";



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

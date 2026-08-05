'use client'
import { useEffect, useState } from "react";
import {Disclosure,DisclosureButton,DisclosurePanel} from "@headlessui/react";
import {Bars3Icon,XMarkIcon} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Team", href: "/team" },
  { name: "Services", href: "/service" },
  { name: "Products", href: "/product" },
  { name: "Contact", href: "/contact" },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  },[]);

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 border-b border-white/10 bg-white backdrop-blur-xl shadow-lg"
    >
    
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-11 w-auto object-contain"
            />
            </a>
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-full px-5 py-2 text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-white hover:text-black"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex md:hidden">
            <DisclosureButton className="rounded-lg p-2 text-white hover:bg-white/10">
              <Bars3Icon className="block h-7 w-7 group-data-open:hidden" />
              <XMarkIcon className="hidden h-7 w-7 group-data-open:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>
      <DisclosurePanel className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
        <div className="space-y-2 px-5 py-5">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className="block rounded-xl px-4 py-3 text-white transition hover:bg-white hover:text-black"
            >
              {item.name}
            </DisclosureButton>

          ))}

          <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-5">
            <img
              src="/logo.png"
              alt="profile"
              className="h-12 w-12 rounded-full"
            />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
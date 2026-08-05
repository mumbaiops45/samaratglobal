'use client'
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Team", href: "/team" },
  { name: "Services", href: "/service" },
  { name: "Products", href: "/product" },
  { name: "Contact", href: "/contact" },
];


export default function Navbar() {
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-white shadow-md border-gray-200">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
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
              <div className="md:hidden">
                <DisclosureButton
                  className="group flex items-center justify-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 transition"
                >
                  {open ? (
                    <XMarkIcon className="h-8 w-8" />
                  ) : (
                    <Bars3Icon className="h-8 w-8" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-5 py-5 space-y-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-gray-900 font-medium hover:bg-black hover:text-white transition"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
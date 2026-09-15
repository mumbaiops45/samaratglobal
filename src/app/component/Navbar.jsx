"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowUpRight } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Services", href: "/service" },
  { name: "Products", href: "/product" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="flex h-[72px] items-center justify-between lg:h-20">
              <Link href="/" className="flex h-full shrink-0 items-center py-0">
                <img
                  src="/logofinal.jpeg"
                  alt="Samrat Global India"
                  className="h-full w-auto object-contain py-0"
                />
              </Link>

              <div className="hidden lg:flex lg:items-center lg:gap-1">
                {navigation.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative px-4 py-2 text-[14px] font-semibold tracking-wide transition-colors duration-300
                        ${active ? "text-primary" : "text-slate-700 hover:text-primary"}
                      `}
                    >
                      {item.name}
                      <span
                        className={`absolute inset-x-4 -bottom-[2px] h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300
                          ${active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
                        `}
                      />
                    </Link>
                  );
                })}
              </div>

              <div className="hidden lg:block">
                <Link href="/contact" className="btn btn-primary">
                  Get a Quote
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="lg:hidden">
                <DisclosureButton className="rounded-md p-2 text-slate-700 transition-colors hover:bg-slate-100">
                  {open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="border-t border-slate-100 bg-white lg:hidden">
            <div className="space-y-1 px-5 py-5">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`block rounded-md px-4 py-3 text-[15px] font-semibold transition-colors
                    ${active ? "bg-primary/5 text-primary" : "text-slate-700 hover:bg-slate-50 hover:text-primary"}`}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}
              <DisclosureButton
                as={Link}
                href="/contact"
                className="btn btn-primary mt-3 w-full"
              >
                Get a Quote
                <ArrowUpRight className="h-4 w-4" />
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

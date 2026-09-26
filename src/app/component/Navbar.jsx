"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowUpRight, ChevronDown, ChevronRight } from "lucide-react";
import { PRODUCT_CATEGORY_GROUPS, productCategoryHref } from "@/data/productCategories";

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
  // Set when a menu link is clicked so the hover menu closes right away;
  // cleared once the pointer leaves the Products item.
  const [menuDismissed, setMenuDismissed] = useState(false);
  // Which product group's categories the desktop menu is showing.
  const [activeGroup, setActiveGroup] = useState(0);
  const dismissMenu = (e) => {
    e.currentTarget.blur();
    setMenuDismissed(true);
  };
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-sm">
      {({ open, close }) => (
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
                  const hasMenu = item.href === "/product";
                  const link = (
                    <Link
                      href={item.href}
                      className={`relative inline-flex items-center gap-1 px-4 py-2 text-[14px] font-semibold tracking-wide transition-colors duration-300
                        ${active ? "text-primary" : "text-slate-700 hover:text-primary"}
                      `}
                    >
                      {item.name}
                      {hasMenu && (
                        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                      )}
                      <span
                        className={`absolute inset-x-4 -bottom-[2px] h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300
                          ${active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
                        `}
                      />
                    </Link>
                  );
                  if (!hasMenu) return <div key={item.name}>{link}</div>;
                  return (
                    <div
                      key={item.name}
                      className="group relative"
                      onMouseLeave={() => {
                        setMenuDismissed(false);
                        setActiveGroup(0);
                      }}
                    >
                      {link}
                      {/* Products menu — opens on hover or keyboard focus */}
                      {/* Cascading menu: product groups on the left, the
                          hovered group's categories fly out to the right. */}
                      <div
                        className={`invisible absolute -left-24 top-full z-50 pt-4 xl:left-0 opacity-0 transition-all duration-200 ${
                          menuDismissed
                            ? ""
                            : "group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
                        }`}
                      >
                        <div className="relative flex items-start gap-2">
                          <ul className="w-64 rounded-md border border-slate-100 bg-white py-2 shadow-xl">
                            {PRODUCT_CATEGORY_GROUPS.map((group, i) => {
                              const isActive = activeGroup === i;
                              return (
                                <li key={group.title}>
                                  <button
                                    type="button"
                                    onMouseEnter={() => setActiveGroup(i)}
                                    onFocus={() => setActiveGroup(i)}
                                    onClick={() => setActiveGroup(i)}
                                    aria-expanded={isActive}
                                    className={`flex w-full items-center justify-between gap-3 whitespace-nowrap px-5 py-3 text-left text-[15px] transition-colors ${
                                      isActive ? "text-primary" : "text-slate-700 hover:text-primary"
                                    }`}
                                  >
                                    {group.title}
                                    <ChevronRight className="h-4 w-4 shrink-0" />
                                  </button>
                                </li>
                              );
                            })}
                            <li className="mt-1 border-t border-slate-100 pt-1">
                              <Link
                                href="/product"
                                onClick={dismissMenu}
                                onMouseEnter={() => setActiveGroup(null)}
                                className="flex items-center gap-1 px-5 py-3 text-[15px] font-semibold text-primary hover:underline"
                              >
                                View all products
                                <ArrowUpRight className="h-4 w-4" />
                              </Link>
                            </li>
                          </ul>

                          {activeGroup !== null && (
                            <ul className="w-60 rounded-md border border-slate-100 bg-white py-2 shadow-xl">
                              {PRODUCT_CATEGORY_GROUPS[activeGroup].categories.map((cat) => (
                                <li key={cat.id}>
                                  <Link
                                    href={productCategoryHref(cat.id)}
                                    onClick={dismissMenu}
                                    className="block px-5 py-3 text-[15px] text-slate-700 transition-colors hover:bg-[#EAF1FF] hover:text-primary"
                                  >
                                    {cat.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
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
                if (item.href === "/product") {
                  return (
                    <Disclosure key={item.name}>
                      {({ open: productsOpen }) => (
                        <>
                          <div className="flex items-center">
                            <DisclosureButton
                              as={Link}
                              href={item.href}
                              className={`flex-1 rounded-md px-4 py-3 text-[15px] font-semibold transition-colors
                              ${active ? "bg-primary/5 text-primary" : "text-slate-700 hover:bg-slate-50 hover:text-primary"}`}
                            >
                              {item.name}
                            </DisclosureButton>
                            <DisclosureButton
                              aria-label="Show product categories"
                              className="rounded-md p-3 text-slate-600 hover:bg-slate-50"
                            >
                              <ChevronDown className={`h-5 w-5 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
                            </DisclosureButton>
                          </div>
                          <DisclosurePanel className="mb-2 ml-4 space-y-3 border-l border-slate-100 py-2 pl-3">
                            {PRODUCT_CATEGORY_GROUPS.map((group) => (
                              <div key={group.title}>
                                <p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                                  {group.title}
                                </p>
                                {group.categories.map((cat) => (
                                  <DisclosureButton
                                    key={cat.id}
                                    as={Link}
                                    href={productCategoryHref(cat.id)}
                                    onClick={() => close()}
                                    className="block rounded-md px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary"
                                  >
                                    {cat.label}
                                  </DisclosureButton>
                                ))}
                              </div>
                            ))}
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  );
                }
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

// 'use client'
// import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";

// const navigation = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "/about-us" },
//   { name: "Team", href: "/team" },
//   { name: "Services", href: "/service" },
//   { name: "Products", href: "/product" },
//   { name: "Contact", href: "/contact" },
// ];


// export default function Navbar() {
//   return (
//     <Disclosure as="nav" className="sticky top-0 z-50 bg-white shadow-md border-gray-200">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
//             <div className="flex h-20 items-center justify-between">
//               <a href="/">
//                 <img
//                   src="/logo.jpeg"
//                   alt="Logo"
//                   className="h-20 w-auto object-contain"
//                 />
//               </a>
//               <div className="hidden md:flex items-center space-x-2">
//                 {navigation.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="rounded-full px-5 py-2 text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-white hover:text-black"
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//               <div className="md:hidden">
//                 <DisclosureButton
//                   className="group flex items-center justify-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 transition"
//                 >
//                   {open ? (
//                     <XMarkIcon className="h-8 w-8" />
//                   ) : (
//                     <Bars3Icon className="h-8 w-8" />
//                   )}
//                 </DisclosureButton>
//               </div>
//             </div>
//           </div>

//           <DisclosurePanel className="md:hidden bg-white border-t border-gray-200 shadow-lg">
//             <div className="px-5 py-5 space-y-2">
//               {navigation.map((item) => (
//                 <DisclosureButton
//                   key={item.name}
//                   as={Link}
//                   href={item.href}
//                   className="block rounded-lg px-4 py-3 text-gray-900 font-medium hover:bg-black hover:text-white transition"
//                 >
//                   {item.name}
//                 </DisclosureButton>
//               ))}
//             </div>
//           </DisclosurePanel>
//         </>
//       )}
//     </Disclosure>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {Disclosure,DisclosureButton,DisclosurePanel} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Team", href: "/team" },
  { name: "Services", href: "/service" },
  { name: "Products", href: "/product" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur-lg shadow-xl border-b border-cyan-500/20"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex h-24 items-center justify-between">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.jpeg"
                  alt="Import Export Business World"
                  width={220}
                  height={90}
                  priority
                  className="h-20 md:h-24 w-auto object-contain"
                />
              </Link>
              <div className="hidden md:flex items-center gap-3">
                {navigation.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative px-4 py-2 text-[15px] font-semibold transition-all duration-300
                        ${
                          active
                            ? "text-cyan-400"
                            : "text-white hover:text-cyan-400"
                        } 
                        after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300
                        ${
                          active
                            ? "after:w-full"
                            : "after:w-0 hover:after:w-full"
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <div className="md:hidden">
                <DisclosureButton className="rounded-lg p-2 text-white hover:bg-white/10">
                  {open ? (
                    <XMarkIcon className="h-8 w-8" />
                  ) : (
                    <Bars3Icon className="h-8 w-8" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>
          <DisclosurePanel className="md:hidden bg-[#0F172A] border-t border-cyan-500/20">

            <div className="space-y-2 px-5 py-5">

              {navigation.map((item) => {
                const active = pathname === item.href;

                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`block rounded-lg px-4 py-3 font-medium transition
                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-white hover:bg-blue-600"
                    }`}
                  >
                    {item.name}
                  </DisclosureButton>
                );
              })}

            

            </div>

          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

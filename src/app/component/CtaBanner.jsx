"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

// Light call-to-action banner used at the bottom of the inner pages.
// A faint port photo sits behind a pale-blue wash so the section reads
// light and stays clearly separate from the dark navy footer below it.
const CtaBanner = ({ title, accent, text, buttonLabel, href = "/contact" }) => (
  <section className="relative overflow-hidden bg-[#EAF1FF] py-16 sm:py-20">
    <img
      src="/ship.jpg"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover opacity-[0.12] grayscale"
    />
    <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
    <div aria-hidden="true" className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />

    <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
      <Reveal as="h2" x={-80} className="h2 mb-4 text-slate-900">
        {title} <span className="grad-text">{accent}</span>
      </Reveal>
      <Reveal as="p" x={80} delay={0.1} className="mx-auto mb-8 max-w-2xl text-base text-slate-600 md:text-lg">
        {text}
      </Reveal>
      <Reveal delay={0.2}>
        <Link href={href} className="btn btn-primary">
          {buttonLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default CtaBanner;

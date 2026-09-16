"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUsers, FaGlobe, FaShieldAlt, FaStar, FaArrowRight, FaAward } from "react-icons/fa";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const founder = {
  name: "Arun Pandey",
  role: "Founder & Director",
  image: "/arun.jpeg",
  bio: "Arun Pandey founded Samrat Global India with a simple goal — make international sourcing dependable, transparent and easy to work with. He sets the company's direction across sourcing, procurement and export operations, with a strong personal focus on supplier relationships and quality-first processes.",
};

const leadership = [
  {
    name: "JayKumar Sinha",
    role: "Co-Founder & Director",
    image: "/JayKumar.jpeg",
    bio: "Drives brand strategy and market development, helping the company build long-term trade partnerships across international markets.",
  },
  {
    name: "Rajeev Paul",
    role: "Chief Executive Officer",
    image: "/rajiv.jpeg",
    bio: "Leads day-to-day business operations, turning strategic goals into consistent, dependable outcomes for clients worldwide.",
  },
  {
    name: "Lalita Pandey",
    role: "Co-Founder & Director",
    image: "/lalita.jpeg",
    bio: "Focuses on supplier coordination and operational excellence, ensuring the smooth movement of goods from source to destination.",
  },
];

const stats = [
  { number: "500+", label: "Clients Served", icon: <FaUsers className="text-2xl" /> },
  { number: "50+", label: "Countries", icon: <FaGlobe className="text-2xl" /> },
  { number: "15+", label: "Years of Experience", icon: <FaAward className="text-2xl" /> },
  { number: "100%", label: "Customer Satisfaction", icon: <FaStar className="text-2xl" /> },
];

const teamValues = [
  { icon: <FaShieldAlt className="text-2xl" />, title: "Integrity", description: "We act with honesty and transparency in everything we do." },
  { icon: <FaGlobe className="text-2xl" />, title: "Reliability", description: "Consistent sourcing and procurement standards, every time." },
  { icon: <FaUsers className="text-2xl" />, title: "Collaboration", description: "We believe in the power of teamwork and strong trade partnerships." },
  { icon: <FaStar className="text-2xl" />, title: "Excellence", description: "We strive for excellence in every export and procurement process." },
];

const TeamPage = () => {
  const router = useRouter();
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".gsap-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 90 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
      gsap.utils.toArray(".gsap-up").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: (i % 3) * 0.06, scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#F5F9FF] text-slate-900">
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0A1A3F]">
        <div className="absolute inset-0 opacity-65">
          <img src="/team.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/40 to-[#0A1A3F]/15" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 1, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <h1 className="h1 text-white">
              Meet Our <span className="grad-text">Core Leadership Team</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg">
              Dedicated professionals committed to your global trade success — bringing
              customer-first coordination to every sourcing, procurement and export
              engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-slate-100 bg-[#F5F9FF] py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-primary/5 text-primary">
                  {stat.icon}
                </div>
                <div className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{stat.number}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER — editorial layout, not a poster */}
      <section className="bg-[#EAF1FF] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="gsap-up mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Founder &amp; Director</p>
            <h2 className="h2 text-slate-900">
              Leading With <span className="grad-text">Vision</span>
            </h2>
          </div>

          <div className="gsap-right grid items-center gap-10 rounded-sm border border-slate-100 bg-white p-6 shadow-sm md:grid-cols-[380px_1fr] md:gap-12 md:p-10">
            <div className="mx-auto aspect-[1402/1122] w-full overflow-hidden rounded-sm border-4 border-[#EAF1FF] shadow-lg">
              <img src={founder.image} alt={founder.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="h3 text-slate-900">{founder.name}</h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-wider text-primary">{founder.role}</p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">{founder.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP GRID */}
      <section className="bg-[#F5F9FF] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14 max-w-2xl"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Meet The Team</p>
            <h2 className="h2 text-slate-900">
              Leadership <span className="grad-text">Team</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-3">
            {leadership.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-sm border border-slate-100 bg-[#EAF1FF] shadow-sm"
              >
                <img src={member.image} alt={member.name} className="h-80 w-full object-cover object-top" />
                <div className="p-6">
                  <h3 className="h4 text-slate-900">{member.name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#EAF1FF] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14 max-w-2xl"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Team Culture</p>
            <h2 className="h2 text-slate-900">
              Our Driven <span className="grad-text">Values</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-sm border border-slate-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm bg-gradient-to-br from-primary to-[#0E7490] text-white shadow-md">
                  {value.icon}
                </div>
                <h3 className="h4 mt-5 mb-2 text-slate-900">{value.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[#062A8F] py-20">
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
          <h2 className="h2 mb-4 text-white">
            Talk To Our <span className="text-secondary">Trade Team</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-slate-300 md:text-lg">
            Have a sourcing or export requirement? Our team is ready to help you move
            forward.
          </p>
          <button onClick={() => router.push("/contact")} className="btn bg-white text-primary hover:-translate-y-0.5 transition-transform">
            Contact Us <FaArrowRight className="text-xs" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;

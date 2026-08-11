"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaUserTie, FaBriefcase, FaStar, FaGlobe, FaShieldAlt, FaRocket, FaClock, FaCheckCircle, FaArrowRight, FaTimes } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Arun Pandey",
      role: "Founder and Director",
      image: "/arun.jpeg",
      description:
        "Visionary leader with 20+ years of experience in global trade, logistics, and business development.",
      expertise: ["Strategic Planning", "Business Development", "Global Trade"],
      experience: "20+ Years",
      education: "MBA, Harvard Business School",
      certifications: ["ISO 9001", "Six Sigma Black Belt"],
      achievements: [
        "Led expansion into 50+ countries",
        "Increased revenue by 300% in 5 years",
        "Built a team of 500+ professionals",
      ],
      gradient: "from-[#0052D4] to-[#00D2FF]",
    },
    {
      id: 2,
      name: "Jay Kumar Sinha",
      role: "C-founder and Director",
      image: "/jaykumar.jpeg",
      description:
        "Marketing strategist with expertise in brand building, digital marketing, and market expansion.",
      expertise: ["Brand Strategy", "Digital Marketing", "Market Research"],
      experience: "15+ Years",
      education: "MBA Marketing, IIM Ahmedabad",
      certifications: ["Google Certified", "HubSpot Certified"],
      achievements: [
        "Increased brand visibility by 200%",
        "Launched successful campaigns in 30+ countries",
        "Built a strong online presence",
      ],
      gradient: "from-[#0072FF] to-[#60EFFF]",
    },
    {
      id: 3,
      name: "R R Mishra",
      role: "Co-founder and Director",
      image: "/lalita.jpeg",
      description:
        "Logistics expert with extensive experience in supply chain management, warehousing, and distribution.",
      expertise: ["Supply Chain", "Warehousing", "Fleet Management"],
      experience: "18+ Years",
      education: "B.E. Logistics, MIT",
      certifications: ["CPIM", "CSCP"],
      achievements: [
        "Optimized supply chain reducing costs by 40%",
        "Managed fleet of 100+ vehicles",
        "Implemented real-time tracking systems",
      ],
      gradient: "from-[#0A2540] to-[#0052D4]",
    },
    {
      id: 4,
      name: "Vibu Kumar Nair",
      role: "Overseas Head",
      image: "/vibhk.jpg",
      description:
        "International trade specialist with expertise in global partnerships and overseas market expansion.",
      expertise: ["International Trade", "Global Partnerships", "Export Management"],
      experience: "12+ Years",
      education: "MBA International Business, ISB",
      certifications: ["Export Compliance", "International Trade Certified"],
      achievements: [
        "Established partnerships in 150+ countries",
        "Managed export operations worth $500M+",
        "Built a global network of suppliers",
      ],
      gradient: "from-[#0052D4] to-[#0072FF]",
    },
    {
      id: 5,
      name: "Giavana Jasper",
      role: "Manager",
      image: "/galena.jpg",
      description:
        "Operations manager with expertise in team leadership, process optimization, and client relationship management.",
      expertise: ["Operations", "Team Leadership", "Client Relations"],
      experience: "8+ Years",
      education: "BBA, Mumbai University",
      certifications: ["Six Sigma Green Belt", "PMP"],
      achievements: [
        "Optimized operations improving efficiency by 50%",
        "Led a team of 50+ professionals",
        "Maintained 98% client satisfaction rate",
      ],
      gradient: "from-[#00D2FF] to-[#0052D4]",
    },
    {
      id: 6,
      name: "Thodore Benjamin",
      role: "Senior Manager",
      image: "/theodore.jpg",
      description:
        "Senior manager with expertise in strategic planning, business operations, and organizational development.",
      expertise: ["Strategy", "Operations", "Business Development"],
      experience: "10+ Years",
      education: "MBA, London Business School",
      certifications: ["Six Sigma Black Belt", "Strategic Management"],
      achievements: [
        "Developed strategic plans for market expansion",
        "Increased operational efficiency by 45%",
        "Led key business initiatives across departments",
      ],
      gradient: "from-[#0072FF] to-[#00D2FF]",
    },
  ];

  const stats = [
    { number: "6", label: "Core Team Members", icon: <FaUsers className="text-3xl" /> },
    { number: "15+", label: "Average Experience", icon: <FaClock className="text-3xl" /> },
    { number: "200+", label: "Team Strength", icon: <FaUserTie className="text-3xl" /> },
    { number: "50+", label: "Countries Served", icon: <FaGlobe className="text-3xl" /> },
  ];

  const teamValues = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Integrity",
      description: "We act with honesty and transparency in everything we do",
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Innovation",
      description: "We constantly seek new ways to improve and grow globally",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and strong trade partnerships",
    },
    {
      icon: <FaStar className="text-3xl" />,
      title: "Excellence",
      description: "We strive for excellence in every export and procurement process",
    },
  ];

  const TeamMemberModal = ({ member, onClose }) => {
    if (!member) return null;
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0A2540]/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-2xl border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold shadow-md`}
                >
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2540]">
                    {member.name}
                  </h2>
                  <p className="text-[#0072FF] font-bold text-sm uppercase tracking-wider mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-[#00D2FF] hover:text-[#0A2540] transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F4F9FF] rounded-2xl p-3 border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500">Experience</p>
                    <p className="font-extrabold text-[#0A2540] text-sm mt-0.5">
                      {member.experience}
                    </p>
                  </div>
                  <div className="bg-[#F4F9FF] rounded-2xl p-3 border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500">Education</p>
                    <p className="font-extrabold text-[#0A2540] text-xs mt-0.5 leading-snug">
                      {member.education}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    About
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((exp, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#EBF4FF] text-[#0052D4] rounded-full text-xs font-semibold border border-[#00D2FF]/30"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200"
                      >
                        <MdVerified className="text-emerald-500" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {member.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-slate-700 text-xs font-medium leading-relaxed"
                      >
                        <FaCheckCircle className="text-[#00D2FF] text-sm shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className=" bg-[#F4F9FF] text-[#0A2540] overflow-x-hidden font-sans selection:bg-[#00D2FF]/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0052D4] opacity-15"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>


      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-gradient-to-b from-[#0A2540] via-[#0D3156] to-[#0A2540]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#00D2FF]/10 blur-[100px] sm:h-96 sm:w-96" />
          <div className="absolute left-1/2 top-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-[#60EFFF]/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
          <div className="max-w-4xl ">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 mb-6"
            >
              <FaUsers className="text-[#00D2FF]" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[2px] text-[#00D2FF]">
                Our Leadership & Team
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-50 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Meet Our{" "}
              <span className="mt-1 block bg-gradient-to-r from-[#00D2FF] via-[#60EFFF] to-[#00D2FF] bg-[length:200%_auto] bg-clip-text text-transparent sm:mt-2">
                Core Leadership Team
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className=" mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-6 sm:text-base sm:leading-7 md:mt-7 md:text-lg md:leading-8 lg:text-xl"
            >
              Dedicated professionals committed to your global trade success,
              bringing decades of combined operational excellence and strategic
              vision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mt-8 h-px w-20 origin-center bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent sm:mt-10 sm:w-24"
            />
          </div>
        </div>
      </section>





      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group p-5 rounded-2xl bg-[#F4F9FF] hover:bg-white border border-slate-100 hover:border-[#00D2FF]/50 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className="text-3xl text-[#0052D4] group-hover:text-[#00D2FF] mb-2 group-hover:scale-110 transition-all duration-300 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#0A2540] tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#F4F9FF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider text-[#0052D4] bg-white shadow-sm mb-4">
              Team Culture
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight">
              Our Driven{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Values
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-[#00D2FF]"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0052D4] to-[#00D2FF] rounded-2xl flex items-center justify-center text-white text-2xl mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mt-5 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider text-[#0052D4] bg-[#F4F9FF] shadow-sm mb-4">
              Meet The Team
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight">
              Leadership{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Team
              </span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-base">
              Click on any team member to view their complete background, certifications, and achievements.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedMember(member)}
                className="group relative bg-[#F4F9FF] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-[#00D2FF] cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[1.22/1] bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    // className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"


                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-white">
                    <span className="text-xs font-bold text-[#0052D4]">
                      {member.experience}
                    </span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#0A2540] group-hover:text-[#0052D4] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[#0072FF] font-bold text-xs uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                  <p className="text-slate-500 text-xs mt-3 line-clamp-2 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                    {member.expertise.slice(0, 2).map((exp, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-semibold text-slate-600 shadow-2xs"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-center gap-2 text-xs font-bold text-[#0052D4] group-hover:text-[#00D2FF] transition-colors">
                    <span>View Profile</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-[#0A2540] via-[#0D3156] to-[#0A2540] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Join Our Global <span className="text-[#60EFFF]">Team</span>
            </h2>
            <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Be part of a dynamic team that's shaping the future of global trade, supply chain management, and international sourcing.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/contact")}
              className="px-8 py-4 bg-white text-[#0052D4] hover:bg-[#60EFFF] hover:text-[#0A2540] rounded-full font-bold text-base shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer"
            >
              <FaBriefcase /> View Open Positions
            </motion.button>
          </motion.div>
        </div>
      </section>
      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

    </div>
  );
};

export default page;

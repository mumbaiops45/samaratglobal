"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {FaUsers,FaUserTie,FaBriefcase,FaAward,FaStar,FaGlobe,FaShieldAlt,FaRocket,FaClock,FaCheckCircle} from 'react-icons/fa';
import { MdVerified, } from 'react-icons/md';

const page = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Arun Pandey",
      role: "Director",
      image: "/arun.jpg",
      description: "Visionary leader with 20+ years of experience in global trade, logistics, and business development.",
      expertise: ["Strategic Planning", "Business Development", "Global Trade"],
      experience: "20+ Years",
      education: "MBA, Harvard Business School",
      certifications: ["ISO 9001", "Six Sigma Black Belt"],
      achievements: [
        "Led expansion into 50+ countries",
        "Increased revenue by 300% in 5 years",
        "Built a team of 500+ professionals"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Jay Kumar Sinha",
      role: "Marketing Head",
      image: "/jaikumar.jpg",
      description: "Marketing strategist with expertise in brand building, digital marketing, and market expansion.",
      expertise: ["Brand Strategy", "Digital Marketing", "Market Research"],
      experience: "15+ Years",
      education: "MBA Marketing, IIM Ahmedabad",
      certifications: ["Google Certified", "HubSpot Certified"],
      achievements: [
        "Increased brand visibility by 200%",
        "Launched successful campaigns in 30+ countries",
        "Built a strong online presence"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "R R Mishra",
      role: "Logistics Head",
      image: "/rrmishra1.jpg",
      description: "Logistics expert with extensive experience in supply chain management, warehousing, and distribution.",
      expertise: ["Supply Chain", "Warehousing", "Fleet Management"],
      experience: "18+ Years",
      education: "B.E. Logistics, MIT",
      certifications: ["CPIM", "CSCP"],
      achievements: [
        "Optimized supply chain reducing costs by 40%",
        "Managed fleet of 100+ vehicles",
        "Implemented real-time tracking systems"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Vibu Kumar Nair",
      role: "Overseas Head",
      image: "/vibhk.jpg",
      description: "International trade specialist with expertise in global partnerships and overseas market expansion.",
      expertise: ["International Trade", "Global Partnerships", "Export Management"],
      experience: "12+ Years",
      education: "MBA International Business, ISB",
      certifications: ["Export Compliance", "International Trade Certified"],
      achievements: [
        "Established partnerships in 150+ countries",
        "Managed export operations worth $500M+",
        "Built a global network of suppliers"
      ],
      color: "from-red-500 to-orange-500"
    },
    {
      id: 5,
      name: "Giavana Jasper",
      role: "Manager",
      image: "/galena.jpg",
      description: "Operations manager with expertise in team leadership, process optimization, and client relationship management.",
      expertise: ["Operations", "Team Leadership", "Client Relations"],
      experience: "8+ Years",
      education: "BBA, Mumbai University",
      certifications: ["Six Sigma Green Belt", "PMP"],
      achievements: [
        "Optimized operations improving efficiency by 50%",
        "Led a team of 50+ professionals",
        "Maintained 98% client satisfaction rate"
      ],
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 6,
      name: "Thodore Benjamin",
      role: "Senior Manager",
      image: "/theodore.jpg",
      description: "Senior manager with expertise in strategic planning, business operations, and organizational development.",
      expertise: ["Strategy", "Operations", "Business Development"],
      experience: "10+ Years",
      education: "MBA, London Business School",
      certifications: ["Six Sigma Black Belt", "Strategic Management"],
      achievements: [
        "Developed strategic plans for market expansion",
        "Increased operational efficiency by 45%",
        "Led key business initiatives across departments"
      ],
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const stats = [
    { number: "6", label: "Core Team Members", icon: <FaUsers className="text-3xl" /> },
    { number: "15+", label: "Average Experience", icon: <FaClock className="text-3xl" /> },
    { number: "200+", label: "Team Strength", icon: <FaUserTie className="text-3xl" /> },
    { number: "50+", label: "Countries Served", icon: <FaGlobe className="text-3xl" /> }
  ];

  const teamValues = [
    { 
      icon: <FaShieldAlt className="text-2xl" />, 
      title: "Integrity",
      description: "We act with honesty and transparency in everything we do"
    },
    { 
      icon: <FaRocket className="text-2xl" />, 
      title: "Innovation",
      description: "We constantly seek new ways to improve and grow"
    },
    { 
      icon: <FaUsers className="text-2xl" />, 
      title: "Collaboration",
      description: "We believe in the power of teamwork and partnership"
    },
    { 
      icon: <FaStar className="text-2xl" />, 
      title: "Excellence",
      description: "We strive for excellence in every aspect of our work"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const TeamMemberModal = ({ member, onClose }) => {
    if (!member) return null;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold`}>
                {member.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{member.name}</h2>
                <p className="text-orange-500 font-semibold">{member.role}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-auto object-cover" />
              </div>
              
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">{member.description}</p>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((exp, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="font-semibold">{member.experience}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Education</p>
                  <p className="font-semibold text-sm">{member.education}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {member.certifications.map((cert, i) => (
                    <span key={i} className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      <MdVerified className="text-green-500" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Key Achievements</h4>
                <ul className="space-y-1">
                  {member.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                      <FaCheckCircle className="text-orange-500" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1F44] via-[#0F2B5C] to-[#0A1F44] py-20 md:py-28">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-orange-500/10 rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              animate={floatingAnimation}
              className="inline-block bg-orange-500/20 backdrop-blur-sm px-6 py-2.5 rounded-full border border-orange-500/30 mb-6"
            >
              <span className="flex items-center gap-2 text-orange-400 font-semibold text-sm uppercase tracking-wider">
                <FaUsers /> Our Team
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
            >
              Meet Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                Core Team
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed mt-6 max-w-2xl"
            >
              Dedicated professionals committed to your success, bringing years of experience and expertise to every partnership
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap  gap-4 mt-8"
            >
              {[
                { icon: <FaBriefcase />, text: "100+ Combined Experience" },
                { icon: <FaGlobe />, text: "50+ Countries" },
                { icon: <FaAward />, text: "Global Expertise" }
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/10 hover:border-orange-400/50 transition-all duration-300"
                >
                  <span className="text-orange-400">{badge.icon}</span>
                  <span className="text-white text-sm font-medium">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-3xl text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900">{stat.number}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Values</span>
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
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-2xl flex items-center justify-center text-orange-500 text-3xl mx-auto group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-4">{value.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-orange-500/10 px-6 py-2 rounded-full border border-orange-500/20 text-orange-500 font-semibold text-sm uppercase tracking-wider mb-4">
              Meet The Team
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              Leadership <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Team</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Our experienced leaders are here to guide you every step of the way
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedMember(member)}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                </div>

                <div className="p-6 text-center">
                  
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-500 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                  <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {member.expertise.slice(0, 2).map((exp, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-[10px] text-gray-600">
                        {exp}
                      </span>
                    ))}
                  </div>
                  
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <span className="text-xs font-semibold text-slate-900">{member.experience}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"/>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"/>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Join Our <span className="text-yellow-300">Team</span>
            </h2>
            <p className="text-orange-100 text-lg mb-8">
              Be part of a dynamic team that's shaping the future of global trade
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <FaBriefcase /> View Openings
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

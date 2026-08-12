"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle, FaArrowRight,FaExclamationCircle, FaHandshake, FaRocket, } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import { IoMdCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validatePhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone) return { isValid: true, error: "" };
    if (!phoneRegex.test(cleanPhone)) {
      return {
        isValid: false,
        error: "Phone number must start with 6-9 and be 10 digits",
      };
    }
    return { isValid: true, error: "" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "firstName" || name === "lastName") {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData({ ...formData, [name]: lettersOnly });
      return;
    }

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData({ ...formData, [name]: digitsOnly });
      }
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    const phoneValidation = validatePhoneNumber(formData.phone);
    if (!phoneValidation.isValid) newErrors.phone = phoneValidation.error;
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.focus();
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      return;
    }

    setIsSubmitting(true);
    const formDataToSend = new FormData(e.target);
    formDataToSend.append("_subject", "New Samrat Global India Private Limited Trade Enquiry");
    formDataToSend.append("_template", "table");
    formDataToSend.append("_captcha", "false");

    try {
      const response = await axios.post(
        "https://formsubmit.co/ajax/info@thesamratglobal.com",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data", Accept: "application/json" } }
      );

      if (response.data.success === "true" || response.status === 200) {
        setIsSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          subject: "",
        });
        setErrors({});
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("FormSubmit Error:", error);
      alert("Something went wrong. Please try again or email info@thesamratglobal.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <HiOutlineMail className="text-xl sm:text-2xl text-[#0052D4]" />,
      title: "Email Us",
      value: "info@thesamratglobal.com",
      link: "mailto:info@thesamratglobal.com",
    },
    {
      icon: <IoMdCall className="text-xl sm:text-2xl text-[#00D2FF]" />,
      title: "Call Us Direct",
      value: "+91 9820423852",
      link: "tel:+919820423852",
    },
    {
      icon: <FaMapMarkerAlt className="text-xl sm:text-2xl text-[#0072FF]" />,
      title: "Corporate Office",
      value: "OFF NO 11, THE SIGNATURE, GANESH MANDIR, Dombivli, Kalyan, Thane - 421201, Maharashtra",
      link: "https://www.google.com/maps/search/?api=1&query=OFF+NO+11+THE+SIGNATURE+GANESH+MANDIR+Dombivli+Kalyan+Thane+421201+Maharashtra",
    },
    {
      icon: <FaClock className="text-xl sm:text-2xl text-[#60EFFF]" />,
      title: "Working Hours",
      value: "Mon - Sat: 9:00 AM - 6:00 PM (IST)",
      link: "#",
    },
  ];



const mapEmbedSrc ="https://www.google.com/maps?q=OFF+NO+11+THE+SIGNATURE+GANESH+MANDIR+Dombivli+Kalyan+Thane+421201+Maharashtra&output=embed";

  return (
    <div className="min-h-screen bg-[#F4F9FF] text-[#0A2540] overflow-x-hidden selection:bg-[#00D2FF]/30">


      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0052D4] opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2540] via-[#0D3156] to-[#0A2540] py-16 md:py-28 text-white">

        <div className="absolute top-10 right-10 w-80 h-80 bg-[#00D2FF]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0052D4]/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-1 rounded-full border border-white/20 mb-6">
              <FaPaperPlane className="text-[#00D2FF] text-xs sm:text-sm" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[2px] text-[#60EFFF]">
                Let's Connect
              </span>
            </div>

            <h1 className="h2 text-white">
              Let's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#60EFFF] to-[#00D2FF]">
                Connect
              </span>
              <span className="block text-white mt-1">For Global Trade Growth</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mt-4 sm:mt-6 max-w-2xl mx-auto lg:mx-0">
              Have questions or ready to initiate import-export partnerships? Our dedicated trade specialists are ready to help.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
              {[
                { icon: <MdOutlineSecurity className="text-[#00D2FF]" />, text: "Trusted Partner" },
                { icon: <FaHandshake className="text-[#60EFFF]" />, text: "100% Satisfaction" },
                { icon: <FaRocket className="text-[#00D2FF]" />, text: "Quick Response" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs sm:text-sm font-semibold text-white hover:border-[#00D2FF] transition-all"
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      <section className="py-16 md:py-24 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 border border-slate-100">
              <h3 className="h3 text-[#0A2540] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-gradient-to-b from-[#0052D4] to-[#00D2FF] rounded-full"></span>
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target={info.link !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-4 bg-[#F4F9FF] rounded-2xl border border-slate-100 hover:border-[#00D2FF] hover:bg-white transition-all group"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {info.title}
                      </p>
                      <p className="text-sm sm:text-base text-[#0A2540] font-bold truncate mt-0.5">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative w-full h-[260px] md:h-[300px] rounded-3xl overflow-hidden shadow-sm border border-slate-100"
            >
              <iframe
                src={mapEmbedSrc}
                title="Samrat Global India Private Limited Location"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 md:p-10 border border-slate-100"
          >
            <div className="mb-8">
              <h2 className="h3 text-[#0A2540]">
                Send Us a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                  Message
                </span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Our team responds to all trade enquiries within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#F4F9FF] border ${errors.firstName ? "border-red-500" : "border-slate-200"
                      } rounded-2xl focus:outline-none focus:border-[#00D2FF] focus:bg-white transition-all text-slate-700 text-sm`}
                  />
                  {errors.firstName && (
                    <div className="flex items-center gap-1 mt-1.5 text-red-500 text-xs font-semibold">
                      <FaExclamationCircle className="text-xs" />
                      <span>{errors.firstName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F4F9FF] border border-slate-200 rounded-2xl focus:outline-none focus:border-[#00D2FF] focus:bg-white transition-all text-slate-700 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F4F9FF] border ${errors.email ? "border-red-500" : "border-slate-200"
                    } rounded-2xl focus:outline-none focus:border-[#00D2FF] focus:bg-white transition-all text-slate-700 text-sm`}
                />
                {errors.email && (
                  <div className="flex items-center gap-1 mt-1.5 text-red-500 text-xs font-semibold">
                    <FaExclamationCircle className="text-xs" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Phone Number <span className="text-slate-400 font-normal text-xs">(10 Digits)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  className={`w-full px-4 py-3 bg-[#F4F9FF] border ${errors.phone ? "border-red-500" : "border-slate-200"
                    } rounded-2xl focus:outline-none focus:border-[#00D2FF] focus:bg-white transition-all text-slate-700 text-sm`}
                />
                {errors.phone && (
                  <div className="flex items-center gap-1 mt-1.5 text-red-500 text-xs font-semibold">
                    <FaExclamationCircle className="text-xs" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Inquiry Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F4F9FF] border border-slate-200 rounded-2xl focus:outline-none focus:border-[#00D2FF] focus:bg-white transition-all text-slate-700 text-sm appearance-none"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Trade Inquiry</option>
                  <option value="sourcing">Global Sourcing Services</option>
                  <option value="export">Export & Trade Solutions</option>
                  <option value="logistics">Logistics & Supply Chain</option>
                  <option value="partnership">Global Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={windowWidth < 640 ? 3 : 4}
                  placeholder="Describe your trade requirement, quantity, or questions..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#F4F9FF] border ${errors.message ? "border-red-500" : "border-slate-200"
                    } rounded-2xl focus:outline-none focus:border-[#00D2FF] focus:bg-white transition-all text-slate-700 text-sm resize-none`}
                />
                {errors.message && (
                  <div className="flex items-center gap-1 mt-1.5 text-red-500 text-xs font-semibold">
                    <FaExclamationCircle className="text-xs" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#0052D4] to-[#00D2FF] rounded-2xl font-bold text-white shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Sending Message...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <FaCheckCircle className="text-lg" />
                    <span>Message Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <BiSend className="text-xl" />
                    <span>Send Message</span>
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-sm font-semibold"
                  >
                    <FaCheckCircle className="text-emerald-500 text-lg shrink-0" />
                    <span>Thank you! Your message has been sent to our trade desk.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

        </div>
      </section>


    </div>
  );
};

export default ContactPage;
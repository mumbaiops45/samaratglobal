"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle, FaArrowRight, FaExclamationCircle, FaHandshake, FaRocket, FaChevronDown } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import { IoMdCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import axios from "axios";


const baseField =
  "w-full px-4 py-3 bg-[#F4F9FF] rounded-2xl border focus:outline-none focus:border-[#00D2FF] focus:bg-white transition-all text-slate-700 text-base sm:text-sm";
const fieldBorder = (hasError) =>
  hasError ? "border-red-500" : "border-slate-200";

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
  const [particles, setParticles] = useState([]);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setParticles(
      Array.from({ length: 10 }, () => ({
        left: Math.random() * 90,
        top: Math.random() * 90,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      }))
    );
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const hoverProps = (props) => (canHover ? { whileHover: props } : {});

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
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    const phoneValidation = validatePhoneNumber(formData.phone);
    if (!phoneValidation.isValid) newErrors.phone = phoneValidation.error;
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus({ preventScroll: true });
      }
      return;
    }

    setIsSubmitting(true);
    const formDataToSend = new FormData(e.target);
    formDataToSend.append(
      "_subject",
      "New Samrat Global India Private Limited Trade Enquiry"
    );
    formDataToSend.append("_template", "table");
    formDataToSend.append("_captcha", "false");

    try {
      const response = await axios.post(
        "https://formsubmit.co/ajax/info@samratglobal.com",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
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
      alert(
        "Something went wrong. Please try again or email info@thesamratglobal.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <HiOutlineMail className="text-xl sm:text-2xl text-[#0052D4]" />,
      title: "Email Us",
      value: "info@samratglobalindia.com",
      link: "mailto:info@samratglobalindia.com",
    },
    {
      icon: <IoMdCall className="text-xl sm:text-2xl text-[#00D2FF]" />,
      title: "Call Us Direct",
      value: "+91 9920220309",
      link: "tel:+919920220309",
    },
    // {
    //   icon: <FaMapMarkerAlt className="text-xl sm:text-2xl text-[#0072FF]" />,
    //   title: "Corporate Office",
    //   value:
    //     "OFF NO 11, THE SIGNATURE, GANESH MANDIR, Dombivli, Kalyan, Thane - 421201, Maharashtra",
    //   link: "https://www.google.com/maps/search/?api=1&query=OFF+NO+11+THE+SIGNATURE+GANESH+MANDIR+Dombivli+Kalyan+Thane+421201+Maharashtra",
    // },
    {
      icon: <FaMapMarkerAlt className="text-xl sm:text-2xl text-[#0072FF]" />,
      title: "Corporate Office",
      value: (
        <>
          The Signature Building,
          Office No. 11, Ground Floor,
          Ganesh Mandir Road, Dombivli East,
          <br />
          Maharashtra 421201
        </>
      ),
      link: "https://www.google.com/maps/search/?api=1&query=The+Signature+Building+Office+No+11+Ground+Floor+Ganesh+Mandir+Road+Dombivli+East+Maharashtra+421201",
    },

    {
      icon: <FaClock className="text-xl sm:text-2xl text-[#60EFFF]" />,
      title: "Working Hours",
      value: "Mon - Sat: 9:00 AM - 6:00 PM (IST)",
      link: null,
    },
  ];

  const mapEmbedSrc =
    "https://www.google.com/maps?q=OFF+NO+11+THE+SIGNATURE+GANESH+MANDIR+Dombivli+Kalyan+Thane+421201+Maharashtra&output=embed";

  return (
    <div className="min-h-screen bg-[#F4F9FF] text-[#0A2540] overflow-x-hidden selection:bg-[#00D2FF]/30">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden sm:block">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0052D4] opacity-10"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2540] via-[#0D3156] to-[#0A2540] py-14 sm:py-16 md:py-28 text-white">
        <div className="absolute top-10 right-0 sm:right-10 w-48 h-48 sm:w-80 sm:h-80 bg-[#00D2FF]/15 rounded-full blur-[70px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-0 sm:left-10 w-56 h-56 sm:w-96 sm:h-96 bg-[#0052D4]/20 rounded-full blur-[70px] sm:blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 sm:px-5 py-1 rounded-full border border-white/20 mb-5 sm:mb-6">
              <FaPaperPlane className="text-[#00D2FF] text-xs sm:text-sm" />
              <span className="text-[10px] sm:text-sm font-bold uppercase tracking-[1.5px] sm:tracking-[2px] text-[#60EFFF]">
                Let&apos;s Connect
              </span>
            </div>

            {/* clamp() overrides the global .h2 size so the headline can't
                overflow on 320-360px screens */}
            <h1 className="h2 text-white [font-size:clamp(1.875rem,7vw,3.75rem)] leading-[1.15] break-words">
              Let&apos;s{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#60EFFF] to-[#00D2FF]">
                Connect
              </span>
              <span className="block text-white mt-1">
                For Global Trade Growth
              </span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-slate-300 leading-relaxed mt-4 sm:mt-6 max-w-2xl mx-auto lg:mx-0">
              Have questions or ready to initiate import-export partnerships?
              Our dedicated trade specialists are ready to help.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-6 sm:mt-8">
              {[
                {
                  icon: <MdOutlineSecurity className="text-[#00D2FF]" />,
                  text: "Trusted Partner",
                },
                {
                  icon: <FaHandshake className="text-[#60EFFF]" />,
                  text: "100% Satisfaction",
                },
                {
                  icon: <FaRocket className="text-[#00D2FF]" />,
                  text: "Quick Response",
                },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  {...hoverProps({ scale: 1.03, y: -2 })}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-white/15 text-[11px] sm:text-sm font-semibold text-white transition-all"
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-24 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 sm:gap-8 w-full"
          >
            <div className="bg-white rounded-3xl shadow-sm p-5 sm:p-8 border border-slate-100">
              <h3 className="h3 text-[#0A2540] mb-5 sm:mb-6 flex items-center gap-3 [font-size:clamp(1.25rem,4.5vw,1.75rem)]">
                <span className="w-1.5 h-6 sm:h-7 bg-gradient-to-b from-[#0052D4] to-[#00D2FF] rounded-full shrink-0"></span>
                Contact Information
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => {
                  const Wrapper = info.link ? motion.a : motion.div;
                  const linkProps = info.link
                    ? {
                      href: info.link,
                      ...(info.link.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {}),
                    }
                    : {};

                  return (
                    <Wrapper
                      key={index}
                      {...linkProps}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      {...hoverProps({ x: 4 })}
                      className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 bg-[#F4F9FF] rounded-2xl border border-slate-100 hover:border-[#00D2FF] hover:bg-white transition-all group"
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {info.title}
                        </p>
                        {/* break-words, not truncate — the address is 3 lines on a phone */}
                        <p className="text-[13px] sm:text-base text-[#0A2540] font-bold mt-0.5 break-words leading-snug">
                          {info.value}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] rounded-3xl overflow-hidden shadow-sm border border-slate-100"
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
            className="bg-white rounded-3xl shadow-sm p-5 sm:p-8 md:p-10 border border-slate-100 w-full"
          >
            <div className="mb-6 sm:mb-8">
              <h2 className="h3 text-[#0A2540] [font-size:clamp(1.375rem,5vw,2rem)] leading-tight">
                Send Us a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                  Message
                </span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Our team responds to all trade enquiries within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`${baseField} ${fieldBorder(errors.firstName)}`}
                  />
                  {errors.firstName && (
                    <div className="flex items-start gap-1 mt-1.5 text-red-500 text-xs font-semibold">
                      <FaExclamationCircle className="text-xs mt-0.5 shrink-0" />
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
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`${baseField} border-slate-200`}
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
                  autoComplete="email"
                  inputMode="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${baseField} ${fieldBorder(errors.email)}`}
                />
                {errors.email && (
                  <div className="flex items-start gap-1 mt-1.5 text-red-500 text-xs font-semibold">
                    <FaExclamationCircle className="text-xs mt-0.5 shrink-0" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Phone Number{" "}
                  <span className="text-slate-400 font-normal text-xs">
                    (10 Digits)
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="9876543210"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${baseField} ${fieldBorder(errors.phone)}`}
                />
                {errors.phone && (
                  <div className="flex items-start gap-1 mt-1.5 text-red-500 text-xs font-semibold">
                    <FaExclamationCircle className="text-xs mt-0.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Inquiry Subject
                </label>
                {/* appearance-none strips the native arrow — without a chevron
                    the select reads as a plain text box on mobile */}
                <div className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${baseField} border-slate-200 pr-11 appearance-none cursor-pointer`}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Trade Inquiry</option>
                    <option value="sourcing">Global Sourcing Services</option>
                    <option value="export">Export &amp; Trade Solutions</option>
                    <option value="logistics">Logistics &amp; Supply Chain</option>
                    <option value="partnership">Global Partnership</option>
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Describe your trade requirement, quantity, or questions..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`${baseField} ${fieldBorder(
                    errors.message
                  )} resize-none min-h-[100px] sm:min-h-[130px]`}
                />
                {errors.message && (
                  <div className="flex items-start gap-1 mt-1.5 text-red-500 text-xs font-semibold">
                    <FaExclamationCircle className="text-xs mt-0.5 shrink-0" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                {...hoverProps({ scale: 1.02 })}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-5 sm:px-6 bg-gradient-to-r from-[#0052D4] to-[#00D2FF] rounded-2xl font-bold text-white text-sm sm:text-base shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
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
                    <BiSend className="text-lg sm:text-xl" />
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
                    className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-xs sm:text-sm font-semibold"
                  >
                    <FaCheckCircle className="text-emerald-500 text-lg shrink-0 mt-0.5" />
                    <span>
                      Thank you! Your message has been sent to our trade desk.
                    </span>
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
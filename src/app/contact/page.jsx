"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, 
  FaPaperPlane, FaCheckCircle, FaArrowRight, 
  FaStar, FaGlobe, FaShieldAlt, FaRegClock,
  FaExclamationCircle, FaWhatsapp, FaLinkedin,
  FaTwitter, FaInstagram, FaYoutube, FaFacebook
} from 'react-icons/fa';
import { MdOutlineSecurity } from 'react-icons/md';
import { BiSend } from 'react-icons/bi';
import { IoMdCall } from 'react-icons/io';
import { HiOutlineMail } from 'react-icons/hi';
import axios from 'axios';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        subject: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const validatePhoneNumber = (phone) => {
        const cleanPhone = phone.replace(/[\s\-()]/g, '');
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phone) return { isValid: true, error: '' };
        if (!phoneRegex.test(cleanPhone)) {
            return {
                isValid: false,
                error: 'Phone number must start with 6-9 and be 10 digits'
            };
        }
        return { isValid: true, error: '' };
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     if (errors[name]) {
    //         setErrors({ ...errors, [name]: '' });
    //     }
    //     if (name === 'phone') {
    //         const digitsOnly = value.replace(/\D/g, '');
    //         if (digitsOnly.length <= 10) {
    //             setFormData({ ...formData, [name]: digitsOnly });
    //         }
    //         return;
    //     }
    //     setFormData({ ...formData, [name]: value });
    // };
    
   const handleChange = (e) => {
    const {name, value} = e.target;
    if(errors[name]) {
        setErrors({...errors, [name]: ''});
    }

    if(name === 'firstName' || name === 'lastName') {
        const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
        setFormData({...formData, [name]: lettersOnly});
        return;
    }

    if (name === 'phone') {
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length <= 10) {
            setFormData({...formData, [name]: digitsOnly});
        }
        return;
    }
    setFormData({ ...formData, [name]: value });
   };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        const phoneValidation = validatePhoneNumber(formData.phone);
        if (!phoneValidation.isValid) newErrors.phone = phoneValidation.error;
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        
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
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            return;
        }

        setIsSubmitting(true);
        const formDataToSend = new FormData(e.target);
        formDataToSend.append("_subject", "New Website Enquiry");
        formDataToSend.append("_template", "table");
        formDataToSend.append("_captcha", "false");

        try {
            const response = await axios.post(
                "https://formsubmit.co/ajax/info@thesamratglobal.com",
                formDataToSend,
                { headers: { "Content-Type": "multipart/form-data", Accept: "application/json" } }
            );

            if (response.data.success === "true") {
                setIsSubmitted(true);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: '',
                    subject: ''
                });
                setErrors({});
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch (error) {
            console.error("FormSubmit Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <HiOutlineMail className="text-xl sm:text-2xl" />,
            title: "Email",
            value: "info@thesamratglobal.com",
            link: "mailto:info@thesamratglobal.com",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: <IoMdCall className="text-xl sm:text-2xl" />,
            title: "Call Us",
            value: "+91 9820423852",
            link: "tel:+919820423852",
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50"
        },
        {
            icon: <FaMapMarkerAlt className="text-xl sm:text-2xl" />,
            title: "Our Address",
            value: "Kurkeja Complex, L.B.S. Marg, Bhandup (West), Mumbai - 400078",
            link: "https://www.google.com/maps?q=Kurkeja+complex+L.B.S.+Marg+Bhandup+West+Mumbai+Maharashtra+400078",
            color: "from-red-500 to-red-600",
            bgColor: "bg-red-50"
        },
        {
            icon: <FaClock className="text-xl sm:text-2xl" />,
            title: "Working Hours",
            value: "Mon - Sat: 9:00 AM - 6:00 PM",
            link: "#",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50"
        }
    ];

    const stats = [
        { number: "500+", label: "Happy Clients", icon: <FaStar className="text-yellow-500 text-2xl sm:text-3xl" /> },
        { number: "50+", label: "Countries Served", icon: <FaGlobe className="text-blue-500 text-2xl sm:text-3xl" /> },
        { number: "15+", label: "Years Experience", icon: <FaShieldAlt className="text-green-500 text-2xl sm:text-3xl" /> },
        { number: "24/7", label: "Support Available", icon: <FaRegClock className="text-orange-500 text-2xl sm:text-3xl" /> }
    ];

    const socialIcons = [
        { icon: <FaFacebook />, link: "#", color: "hover:bg-blue-600" },
        { icon: <FaTwitter />, link: "#", color: "hover:bg-sky-500" },
        { icon: <FaLinkedin />, link: "#", color: "hover:bg-blue-700" },
        { icon: <FaInstagram />, link: "#", color: "hover:bg-pink-600" },
        { icon: <FaWhatsapp />, link: "#", color: "hover:bg-green-600" },
        { icon: <FaYoutube />, link: "#", color: "hover:bg-red-600" }
    ];

    const mapEmbedSrc = "https://www.google.com/maps?q=Kurkeja+complex+L.B.S.+Marg+Bhandup+West+Mumbai+Maharashtra+400078&output=embed";


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 4 + 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1F44] via-[#0F2B5C] to-[#0A1F44] py-12 sm:py-16 md:py-20 lg:py-28">
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-72 h-48 sm:h-72 bg-orange-500/10 rounded-full filter blur-3xl"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full filter blur-3xl"
                        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                </div>

                <div className=" mx-auto  sm:px-6 md:px-10 lg:px-10 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl  text-center lg:text-left"
                    >
                        <motion.div
                            className="inline-block bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-full border border-white/20 mb-4 sm:mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                        >
                            <span className="flex items-center gap-2 text-orange-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                                <FaPaperPlane className="text-sm" /> Let's Connect
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                        >
                            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Connect</span>
                            <span className="block text-white mt-1">For Better Results</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mt-4 sm:mt-6 max-w-2xl mx-auto lg:mx-0"
                        >
                            Have questions or ready to partner? Our team is here to help you achieve your global trade goals
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 mt-6 sm:mt-8"
                        >
                            {[
                                { icon: <MdOutlineSecurity />, text: "Trusted Partner" },
                                { icon: <FaHandshakeIcon />, text: "100% Satisfaction" },
                                { icon: <FaRocketIcon />, text: "Quick Response" }
                            ].map((badge, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/10 hover:border-orange-400/50 transition-all duration-300"
                                >
                                    <span className="text-orange-400 text-sm sm:text-base">{badge.icon}</span>
                                    <span className="text-white text-xs sm:text-sm font-medium">{badge.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6 sm:gap-8"
                        >
                            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-3">
                                    <span className="w-1 h-6 sm:h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></span>
                                    Contact Information
                                </h3>

                                <div className="space-y-3 sm:space-y-4">
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
                                            whileHover={{ x: 5, scale: 1.01 }}
                                            className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-all duration-300 group"
                                        >
                                            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center text-white text-base sm:text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                {info.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{info.title}</p>
                                                <p className="text-sm sm:text-base text-slate-700 font-medium truncate">{info.value}</p>
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
                                className="relative w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
                            >
                                <iframe
                                    src={mapEmbedSrc}
                                    title="Samrat Global location on Google Maps"
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
                            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-100"
                        >
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                                    Send Us a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Message</span>
                                </h2>
                                <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">We'll get back to you within 24 hours</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('firstName')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700 text-sm sm:text-base`}
                                        />
                                        {errors.firstName && (
                                            <div className="flex items-center gap-1.5 mt-1 text-red-500 text-xs sm:text-sm">
                                                <FaExclamationCircle className="text-xs" />
                                                <span>{errors.firstName}</span>
                                            </div>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700 text-sm sm:text-base"
                                        />
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700 text-sm sm:text-base`}
                                    />
                                    {errors.email && (
                                        <div className="flex items-center gap-1.5 mt-1 text-red-500 text-xs sm:text-sm">
                                            <FaExclamationCircle className="text-xs" />
                                            <span>{errors.email}</span>
                                        </div>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2">
                                        Phone Number <span className="text-orange-500 text-xs font-normal">(10 digits)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700 text-sm sm:text-base`}
                                        maxLength="10"
                                    />
                                    {errors.phone ? (
                                        <div className="flex items-center gap-1.5 mt-1 text-red-500 text-xs sm:text-sm">
                                            <FaExclamationCircle className="text-xs" />
                                            <span>{errors.phone}</span>
                                        </div>
                                    ) : (
                                        <div className="mt-1 text-xs text-gray-400 flex flex-wrap items-center gap-1">
                                            <span>✓ Must start with 6,7,8,9</span>
                                            <span className="hidden xs:inline">•</span>
                                            <span>10 digits only</span>
                                        </div>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2">
                                        Subject
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700 text-sm sm:text-base appearance-none"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="sourcing">Sourcing Services</option>
                                        <option value="export">Export Services</option>
                                        <option value="logistics">Logistics Solutions</option>
                                        <option value="partnership">Partnership Opportunities</option>
                                    </select>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 sm:mb-2">
                                        Your Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={windowWidth < 640 ? 3 : 4}
                                        placeholder="Write your message..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700 text-sm sm:text-base resize-none`}
                                    />
                                    {errors.message && (
                                        <div className="flex items-center gap-1.5 mt-1 text-red-500 text-xs sm:text-sm">
                                            <FaExclamationCircle className="text-xs" />
                                            <span>{errors.message}</span>
                                        </div>
                                    )}
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative w-full overflow-hidden group px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold text-white shadow-xl hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                                        {isSubmitting ? (
                                            <>
                                                <span className="animate-spin">⏳</span>
                                                Sending...
                                            </>
                                        ) : isSubmitted ? (
                                            <>
                                                <FaCheckCircle className="text-lg sm:text-xl" />
                                                Message Sent!
                                            </>
                                        ) : (
                                            <>
                                                <BiSend className="text-lg sm:text-xl" />
                                                Send Message
                                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                                </motion.button>

                                <AnimatePresence>
                                    {isSubmitted && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 text-green-700 text-sm sm:text-base"
                                        >
                                            <FaCheckCircle className="text-green-500 text-lg sm:text-xl flex-shrink-0" />
                                            <span>Thank you! We'll get back to you soon.</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
            <section className="py-10 sm:py-12 md:py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{stat.number}</div>
                                <div className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};


const FaHandshakeIcon = () => <span>🤝</span>;
const FaRocketIcon = () => <span>🚀</span>;

export default ContactPage;
"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {FaMapMarkerAlt,FaPhone,FaEnvelope,FaClock,FaFacebook,FaTwitter,FaLinkedin,FaInstagram,FaYoutube,FaPaperPlane,FaCheckCircle,FaArrowRight,FaWhatsapp,FaGlobe,FaRegClock,FaShieldAlt,FaHandshake,FaRocket,FaStar,FaExclamationCircle} from 'react-icons/fa';
import { MdOutlineSecurity } from 'react-icons/md';
import { BiSend } from 'react-icons/bi';
import axios from 'axios';

const page = () => {
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
    const validatePhoneNumber = (phone) => {
        const cleanPhone = phone.replace(/[\s\-()]/g, '');
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phone) {
            return { isValid: true, error: '' }; 
        }
        if (!phoneRegex.test(cleanPhone)) {
            return { 
                isValid: false, 
                error: 'Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits' 
            };
        }
        return { isValid: true, error: '' };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
        if (name === 'phone') {
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length <= 10) {
                setFormData({
                    ...formData,
                    [name]: digitsOnly
                });
            }
            return;
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
    
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        const phoneValidation = validatePhoneNumber(formData.phone);
        if (!phoneValidation.isValid) {
            newErrors.phone = phoneValidation.error;
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            // Scroll to first error
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
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                    },
                }
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

                setTimeout(() => {
                    setIsSubmitted(false);
                }, 5000);
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
            icon: <FaEnvelope className="text-2xl" />,
            title: "Email",
            value: "info@thesamratglobal.com",
            link: "mailto:info@thesamratglobal.com",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: <FaPhone className="text-2xl" />,
            title: "Call Us",
            value: "+91 9820423852",
            link: "tel:+919820423852",
            color: "from-green-500 to-green-600"
        },
        {
            icon: <FaMapMarkerAlt className="text-2xl" />,
            title: "Our Address",
            value: "3, Bwing, Kurkeja complex L.B.S. Marg Bhandup (west) Mumbai Maharashtra India Pin - 400078",
            link: "#",
            color: "from-red-500 to-red-600"
        },
        {
            icon: <FaClock className="text-2xl" />,
            title: "Working Hours",
            value: "Mon - Fri: 9:00 AM - 6:00 PM",
            link: "#",
            color: "from-purple-500 to-purple-600"
        }
    ];

    // Social Media Links
    const socialLinks = [
        { icon: <FaFacebook />, label: "Facebook", url: "#", color: "hover:bg-[#1877F2]" },
        { icon: <FaTwitter />, label: "Twitter", url: "#", color: "hover:bg-[#1DA1F2]" },
        { icon: <FaLinkedin />, label: "LinkedIn", url: "#", color: "hover:bg-[#0A66C2]" },
        { icon: <FaInstagram />, label: "Instagram", url: "#", color: "hover:bg-[#E4405F]" },
        { icon: <FaYoutube />, label: "YouTube", url: "#", color: "hover:bg-[#FF0000]" },
        { icon: <FaWhatsapp />, label: "WhatsApp", url: "#", color: "hover:bg-[#25D366]" }
    ];

    const businessHours = [
        { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
        { day: "Sunday", hours: "Closed" }
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

            <section className=" overflow-hidden bg-gradient-to-br from-[#0A1F44] via-[#0F2B5C] to-[#0A1F44] py-20 md:py-28">
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
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full filter blur-3xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />
                </div>

                <div className=" mx-auto px-4 sm:px-6 md:px-10 lg:px-10 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <motion.div
                            className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/20 mb-6"
                        >
                            <span className="flex items-center gap-2 text-orange-400 font-semibold text-sm uppercase tracking-wider">
                                <FaPaperPlane className="text-base" /> Let's Connect
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
                        >
                            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Connect</span>
                            <span className="block text-white">For Better Results</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-300 leading-relaxed mt-6 max-w-2xl"
                        >
                            Have questions or ready to partner? Our team is here to help you achieve your global trade goals
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-4 mt-8"
                        >
                            {[
                                { icon: <MdOutlineSecurity />, text: "Trusted Partner" },
                                { icon: <FaHandshake />, text: "100% Client Satisfaction" },
                                { icon: <FaRocket />, text: "Quick Response" }
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
            <section className="py-16 md:py-24">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-100"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                    Send Us a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Message</span>
                                </h2>
                                <p className="text-gray-500 mt-2">We'll get back to you within 24 hours</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className={`w-full pl-4 pr-4 py-3.5 bg-gray-50 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700`}
                                                required
                                            />
                                            {errors.firstName && (
                                                <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-sm">
                                                    <FaExclamationCircle className="text-xs" />
                                                    <span>{errors.firstName}</span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        viewport={{ once: true }}
                                        className="group"
                                    >
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700"
                                        />
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3.5 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700`}
                                        required
                                    />
                                    {errors.email && (
                                        <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-sm">
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
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Phone Number <span className="text-orange-500 text-xs font-normal">(Start with 6,7,8,9 | 10 digits)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3.5 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700`}
                                        maxLength="10"
                                    />
                                    {errors.phone ? (
                                        <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-sm">
                                            <FaExclamationCircle className="text-xs" />
                                            <span>{errors.phone}</span>
                                        </div>
                                    ) : (
                                        <div className="mt-1.5 text-xs text-gray-400 flex items-center gap-1">
                                            <span>✓ Must start with 6, 7, 8, or 9</span>
                                            <span>•</span>
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
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700"
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
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Your Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        placeholder="Write your message..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3.5 bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-slate-700 resize-none`}
                                        required
                                    />
                                    {errors.message && (
                                        <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-sm">
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
                                    className="relative w-full overflow-hidden group px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold text-white shadow-xl hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {isSubmitting ? (
                                            <>
                                                <span className="animate-spin">⏳</span>
                                                Sending...
                                            </>
                                        ) : isSubmitted ? (
                                            <>
                                                <FaCheckCircle className="text-xl" />
                                                Message Sent Successfully!
                                            </>
                                        ) : (
                                            <>
                                                <BiSend className="text-xl" />
                                                Send Message
                                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                                </motion.button>

                                {isSubmitted && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 text-green-700"
                                    >
                                        <FaCheckCircle className="text-green-500 text-xl" />
                                        <span>Thank you! We'll get back to you soon.</span>
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></span>
                                    Contact Information
                                </h3>

                                <div className="space-y-4">
                                    {contactInfo.map((info, index) => (
                                        <motion.a
                                            key={index}
                                            href={info.link}
                                            target={info.link !== "#" ? "_blank" : ""}
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ x: 5 }}
                                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-all duration-300 group"
                                        >
                                            <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{info.title}</p>
                                                <p className="text-slate-700 font-medium">{info.value}</p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-[#0A1F44] to-[#1B3A7A] rounded-3xl p-6 sm:p-8 shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <FaClock className="text-orange-400" />
                                    Business Hours
                                </h3>
                                <div className="space-y-3">
                                    {businessHours.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="flex justify-between items-center py-2 border-b border-white/10 last:border-0"
                                        >
                                            <span className="text-gray-300">{item.day}</span>
                                            <span className="text-white font-semibold">{item.hours}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        
            <section className="py-12 bg-white border-t border-gray-100">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { number: "500+", label: "Happy Clients", icon: <FaStar className="text-yellow-500" /> },
                            { number: "50+", label: "Countries Served", icon: <FaGlobe className="text-blue-500" /> },
                            { number: "15+", label: "Years Experience", icon: <FaShieldAlt className="text-green-500" /> },
                            { number: "24/7", label: "Support Available", icon: <FaRegClock className="text-orange-500" /> }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl md:text-3xl font-bold text-slate-900">{stat.number}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default page;
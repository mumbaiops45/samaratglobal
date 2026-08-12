"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {FaArrowRight,FaStar,FaShippingFast,FaGlobe,FaCheckCircle,FaTruck,FaShip,FaPlane,FaWarehouse,FaGem,FaCrown,FaEye,FaExchangeAlt,FaBoxes,FaThLarge,FaList,FaCogs,FaTimes,FaFilter,FaChevronLeft,FaChevronRight,} from "react-icons/fa";
import {MdOutlineAgriculture,MdOutlineFoodBank,MdOutlinePrecisionManufacturing,} from "react-icons/md";
import { GiWheat, GiChiliPepper, GiCoffeeBeans } from "react-icons/gi";
import { UtensilsCrossed } from "lucide-react";

const ProductPage = () => {
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const categories = [
    { id: "all", label: "All Products", icon: <FaThLarge /> },
    { id: "agriculture", label: "Agriculture", icon: <MdOutlineAgriculture /> },
    { id: "food", label: "Food & Beverages", icon: <MdOutlineFoodBank /> },
    { id: "metal", label: "Metals & Steel", icon: <FaGem /> },
    { id: "spices", label: "Spices & Herbs", icon: <UtensilsCrossed /> },
    { id: "textiles", label: "Textiles", icon: <FaBoxes /> },
    { id: "industrial", label: "Industrial Equipment", icon: <FaCogs /> },
  ];

  const products = [
    {
      id: 1,
      name: "Premium Wheat",
      category: "agriculture",
      type: "Export",
      origin: "India",
      destination: "Global Markets",
      image: "/premiumwheat.jpg",
      icon: <GiWheat className="text-4xl" />,
      description:
        "High-quality Indian wheat exported to Middle East, Africa, and Southeast Asian countries. Known for its excellent gluten content and baking properties.",
      details: [
        "High protein content (12-14%)",
        "Excellent baking quality",
        "Strict quality control",
        "Competitive global pricing",
      ],
      certifications: ["ISO 22000", "HACCP", "Non-GMO"],
      priceRange: "₹350-450 per MT",
      rating: 4.8,
      reviews: 125,
    },
    {
      id: 2,
      name: "Basmati Rice Premium",
      category: "food",
      type: "Export",
      origin: "India",
      destination: "Middle East, Europe, USA",
      image: "/basmatirice.jpg",
      icon: <MdOutlineFoodBank className="text-4xl" />,
      description:
        "Premium Indian Basmati rice with extra-long grains, distinct natural aroma, and superb cooking quality. Sourced directly from the Himalayan foothills.",
      details: [
        "Extra long grains (8.4mm+)",
        "Aged 1-2 years naturally",
        "Authentic rich aroma",
        "No artificial additives",
      ],
      certifications: ["USDA Organic", "Non-GMO", "Fair Trade"],
      priceRange: "₹800-1200 per MT",
      rating: 4.9,
      reviews: 234,
    },
    {
      id: 3,
      name: "Spices & Organic Herbs",
      category: "spices",
      type: "Export",
      origin: "India",
      destination: "Europe, USA, Middle East",
      image: "/SpicesHerbs.jpg",
      icon: <UtensilsCrossed className="text-4xl" />,
      description:
        "Authentic Indian spices including cardamom, black pepper, turmeric, and cumin. Grown in pristine agricultural regions for rich aroma and flavor.",
      details: [
        "Certified organic grade",
        "Rich flavor profile",
        "Grade-A quality selection",
        "Sustainable ethical sourcing",
      ],
      certifications: ["Organic Certified", "Fair Trade", "Spice Board Grade-A"],
      priceRange: "₹2000-5000 per MT",
      rating: 4.7,
      reviews: 178,
    },
    {
      id: 4,
      name: "Steel Billets & Metals",
      category: "metal",
      type: "Export",
      origin: "India",
      destination: "Southeast Asia, Middle East",
      image: "/metals.jpg",
      icon: <FaGem className="text-4xl" />,
      description:
        "High-grade industrial steel billets manufactured in India adhering to strict international standards. Ideal for construction, infrastructure, and automotive.",
      details: [
        "ASTM A615 / DIN standards",
        "Multiple structural grades",
        "Competitive bulk pricing",
        "Large-capacity supply chain",
      ],
      certifications: ["ISO 9001", "ASTM Certified"],
      priceRange: "₹500-700 per MT",
      rating: 4.6,
      reviews: 98,
    },
    {
      id: 5,
      name: "Premium CTC & Orthodox Tea",
      category: "food",
      type: "Export",
      origin: "India",
      destination: "UK, Europe, Asia",
      image: "/chaipatti.jpg",
      icon: <GiCoffeeBeans className="text-4xl" />,
      description:
        "Finest Indian teas from Assam, Darjeeling, and Nilgiri estates. Renowned worldwide for distinct liquor, rich taste, and invigorating aroma.",
      details: [
        "Pure single-origin leaves",
        "Export grade sorting",
        "Multiple blend variants",
        "Aromatic fresh packaging",
      ],
      certifications: ["FSSAI", "Export Quality", "Rainforest Alliance"],
      priceRange: "₹1500-3000 per MT",
      rating: 4.9,
      reviews: 312,
    },
    {
      id: 6,
      name: "Agricultural Machinery",
      category: "agriculture",
      type: "Import",
      origin: "Germany, USA",
      destination: "India",
      image: "/agricultureimg.jpg",
      icon: <MdOutlinePrecisionManufacturing className="text-4xl" />,
      description:
        "Advanced precision farming equipment imported from global technology leaders to empower Indian agricultural modernization.",
      details: [
        "Next-gen automated features",
        "High operational fuel efficiency",
        "Heavy-duty durable builds",
        "Full local maintenance support",
      ],
      certifications: ["CE Certified", "ISO 9001"],
      priceRange: "₹5000-50000 per unit",
      rating: 4.5,
      reviews: 67,
    },
    {
      id: 7,
      name: "Premium Raw Cotton",
      category: "textiles",
      type: "Export",
      origin: "India",
      destination: "Europe, USA, Asia",
      image: "/cotton.webp",
      icon: <FaBoxes className="text-4xl" />,
      description:
        "Top-tier Indian raw cotton valued for its staple length, tensile strength, and purity. Highly preferred by international textile mills.",
      details: [
        "Superior fiber length",
        "High tensile strength",
        "Low contamination rate",
        "Sustainable farming origin",
      ],
      certifications: ["Organic Certified", "Better Cotton Initiative (BCI)"],
      priceRange: "₹1500-2500 per MT",
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 8,
      name: "Red Chilies & Peppers",
      category: "spices",
      type: "Export",
      origin: "India",
      destination: "Europe, Americas, Asia",
      image: "/chili.webp",
      icon: <GiChiliPepper className="text-4xl" />,
      description:
        "Sun-dried Indian red chilies famous for vibrant natural red color, balanced pungency (ASTA standards), and rich flavor enhancement.",
      details: [
        "High ASTA color value",
        "Controlled pungency levels",
        "Stemmed & stemless grades",
        "Fresh seasonal harvest",
      ],
      certifications: ["Spice Board India", "FSSAI Certified"],
      priceRange: "₹1000-2000 per MT",
      rating: 4.7,
      reviews: 189,
    },
    {
      id: 9,
      name: "Heavy Industrial Machinery",
      category: "industrial",
      type: "Import",
      origin: "Germany, Japan",
      destination: "India",
      image: "/heavymachine.webp",
      icon: <FaCrown className="text-4xl" />,
      description:
        "High-precision manufacturing machinery imported from leading engineering hubs to accelerate Indian industrial infrastructure.",
      details: [
        "High-precision engineering",
        "Low energy consumption",
        "Certified international safety",
        "Operator training included",
      ],
      certifications: ["ISO 14001", "CE Certified"],
      priceRange: "₹20000-100000 per unit",
      rating: 4.4,
      reviews: 45,
    },
  ];

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) => product.category === filter);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryChange = (catId) => {
    setFilter(catId);
    setCurrentPage(1);
  };


  const ProductModal = ({ product, onClose }) => {
    if (!product) return null;
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0A2540]/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-2xl border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-5">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    product.type === "Export"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-cyan-100 text-[#0052D4] border border-[#00D2FF]/40"
                  }`}
                >
                  {product.type} Solution
                </span>
                <h2 className="h2 text-[#0A2540] mt-2">
                  {product.name}
                </h2>
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
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-xs font-bold text-[#0052D4]">
                    ⭐ {product.rating} / 5.0
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between px-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.floor(product.rating)
                            ? "text-amber-400"
                            : "text-slate-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    ({product.reviews} Verified Buyers)
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.description}
                </p>

                <div>
                  <h4 className="eyebrow text-slate-400 mb-2">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {product.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2.5 text-slate-700 text-xs font-medium"
                      >
                        <FaCheckCircle className="text-[#00D2FF] text-sm shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="eyebrow text-slate-400 mb-2">
                    Compliance & Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#F4F9FF] text-[#0052D4] rounded-full text-xs font-semibold border border-slate-200"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F4F9FF] rounded-2xl p-4 border border-slate-200/80">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400">Origin</p>
                      <p className="font-extrabold text-[#0A2540] text-xs mt-0.5">
                        {product.origin}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400">Destination</p>
                      <p className="font-extrabold text-[#0A2540] text-xs mt-0.5">
                        {product.destination}
                      </p>
                    </div>
                    {/* <div>
                      <p className="text-[11px] font-semibold text-slate-400">Price Est.</p>
                      <p className="font-extrabold text-[#0052D4] text-xs mt-0.5">
                        {product.priceRange}
                      </p>
                    </div> */}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#0052D4] to-[#00D2FF] rounded-full font-bold text-white shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <FaGlobe />
                  <span>Request Instant Quotation</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F9FF] text-[#0A2540] overflow-x-hidden selection:bg-[#00D2FF]/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#00D2FF] to-[#0052D4] opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
            }}
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2540] via-[#0D3156] to-[#0A2540] text-white py-20 md:py-28 border-b border-slate-800">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#00D2FF]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#0052D4]/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-1 rounded-full border border-white/20 mb-6">
              <FaGlobe className="text-[#00D2FF]" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[2px] text-[#60EFFF]">
                Global Trade Catalog
              </span>
            </div>

            <h1 className="h2 text-white">
              Your Trusted Partner{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#60EFFF] to-[#00D2FF]">
                In International Trade
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mt-6 max-w-2xl">
              Connecting India to world markets through premium exports and strategic, high-demand industrial imports.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {[
                { icon: <FaShip className="text-[#00D2FF]" />, text: "Export from India" },
                { icon: <FaPlane className="text-[#60EFFF]" />, text: "Import to India" },
                { icon: <FaWarehouse className="text-[#00D2FF]" />, text: "Global Logistics" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 text-sm font-semibold text-white hover:border-[#00D2FF] transition-all"
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

     
      <section className="py-16 md:py-24 bg-[#F4F9FF]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#00D2FF]/40 text-xs font-bold uppercase tracking-wider text-[#0052D4] bg-white shadow-sm mb-4">
              Our Products
            </span>
            <h2 className="h2 text-[#0A2540]">
              Premium Export & Import{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Products
              </span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-base">
              From India to the world - certified quality products that define global excellence.
            </p>
          </motion.div>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                    filter === cat.id
                      ? "bg-gradient-to-r from-[#0052D4] to-[#00D2FF] text-white shadow-md"
                      : "bg-[#F4F9FF] text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <span>{cat.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex gap-1.5 bg-[#F4F9FF] p-1.5 rounded-2xl border border-slate-200 shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-xl transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#0052D4] text-white shadow-sm"
                    : "text-slate-500 hover:text-[#0A2540]"
                }`}
                title="Grid View"
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-xl transition-colors ${
                  viewMode === "list"
                    ? "bg-[#0052D4] text-white shadow-sm"
                    : "text-slate-500 hover:text-[#0A2540]"
                }`}
                title="List View"
              >
                <FaList />
              </button>
            </div>
          </div>
          <div
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-8`}
          >
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-[#00D2FF] ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "md:w-1/3 h-64 md:h-auto" : "h-64"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                        product.type === "Export"
                          ? "bg-emerald-600"
                          : "bg-[#0052D4]"
                      }`}
                    >
                      {product.type}
                    </span>
                    {product.rating >= 4.8 && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-[#0A2540] shadow-md">
                        Premium
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute inset-0 bg-[#0A2540]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <span className="bg-white text-[#0A2540] px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-[#00D2FF] transition-colors shadow-lg">
                      <FaEye /> Quick View
                    </span>
                  </button>
                </div>
                <div
                  className={`p-6 flex flex-col justify-between ${
                    viewMode === "list" ? "md:w-2/3" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="h4 text-[#0A2540] group-hover:text-[#0052D4] transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-[#F4F9FF] px-2.5 py-1 rounded-full border border-slate-200">
                        <FaStar className="text-amber-400 text-xs" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                      <span>📍 {product.origin}</span>
                      <span className="text-[#00D2FF]">→</span>
                      <span>📍 {product.destination}</span>
                    </div>

                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.certifications.slice(0, 2).map((cert, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-[#F4F9FF] rounded-full text-[11px] font-semibold text-[#0052D4] border border-slate-200"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    {/* <span className="text-xs font-extrabold text-[#0052D4]">
                      {product.priceRange}
                    </span> */}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs text-[#0072FF] font-bold flex items-center gap-1 hover:gap-2 transition-all hover:text-[#00D2FF]"
                    >
                      <span>View Details</span>
                      <FaArrowRight className="text-[10px]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-14">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#00D2FF] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-2xl text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-gradient-to-r from-[#0052D4] to-[#00D2FF] text-white shadow-md"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-[#00D2FF]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-[#00D2FF] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronRight />
              </button>
            </div>
          )}

        </div>
      </section>
      <section className="py-20 bg-gradient-to-b from-[#0A2540] via-[#0D3156] to-[#0A2540] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-[#00D2FF] mb-4">
              Global Trade Flow
            </span>
            <h2 className="h2">
              Connecting <span className="text-[#60EFFF]">India</span> to the World
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaTruck className="text-4xl text-[#00D2FF]" />,
                title: "Export from India",
                description:
                  "Premium Indian commodities like wheat, rice, spices, steel, and textiles exported seamlessly to global trade partners.",
              },
              {
                icon: <FaExchangeAlt className="text-4xl text-[#60EFFF]" />,
                title: "Bilateral Trade",
                description:
                  "Strategic import-export corridors connecting India with over 50 countries across Asia, Europe, and America.",
              },
              {
                icon: <FaShip className="text-4xl text-[#00D2FF]" />,
                title: "Import to India",
                description:
                  "Advanced machinery, technology, and specialized industrial equipment imported to empower Indian enterprises.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-[#00D2FF]/50 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="h3 text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="h2 text-[#0A2540]">
              Browse By{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052D4] to-[#00D2FF]">
                Product Category
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {categories.slice(1).map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.03 }}
                onClick={() => handleCategoryChange(cat.id)}
                className="group cursor-pointer bg-[#F4F9FF] rounded-3xl p-6 text-center border border-slate-100 hover:border-[#00D2FF] hover:bg-white transition-all shadow-2xs hover:shadow-xl"
              >
                <div className="text-3xl text-[#0052D4] group-hover:text-[#00D2FF] group-hover:scale-110 transition-all flex justify-center">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mt-3">
                  {cat.label}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
};

export default ProductPage;
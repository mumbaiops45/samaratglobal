"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {FaArrowRight,FaStar,FaShippingFast,FaGlobe,FaCheckCircle,FaTruck,FaShip,FaPlane,FaWarehouse,FaGem,FaCrown,FaEye,FaExchangeAlt,FaBoxes,FaThLarge,FaList,FaCogs,FaTimes,FaFilter,FaChevronLeft,FaChevronRight,} from "react-icons/fa";
import {MdOutlineFoodBank,} from "react-icons/md";
import { GiChiliPepper, GiCoffeeBeans } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";
import { UtensilsCrossed } from "lucide-react";

// Medicinal plants & products sourced from North East India for the
// pharmaceutical sector. Mapped into the common product shape below.
const medicinalPlants = [
  { name: "Chirata", image: "/productimages/chirata.jpg", botanical: "Swertia chirayita", states: "Sikkim, Arunachal Pradesh, Darjeeling hills", part: "Whole plant", compounds: "Amarogentin, mangiferin", application: "Hepatoprotective; antipyretic; bitter digestive tonic", notes: "Dried herb; extract. High-altitude crop with strong existing pharma demand." },
  { name: "Lakadong Turmeric", image: "/productimages/lakadong-turmeric.jpg", botanical: "Curcuma longa – Meghalaya variety", states: "Meghalaya (Jaintia Hills)", part: "Rhizome", compounds: "Curcumin (up to 7–9%, among the world's highest)", application: "Anti-inflammatory; antioxidant", notes: "Dried rhizome; high-curcumin extract. GI-tagged and premium over standard turmeric." },
  { name: "NE Ginger", image: "/productimages/northeast-ginger.jpg", botanical: "Zingiber officinale", states: "Nagaland, Sikkim, Meghalaya, Manipur", part: "Rhizome", compounds: "Gingerols, shogaols", application: "Anti-inflammatory; anti-emetic; digestive", notes: "Dried/powder; oleoresin; oil. Established crop with GI-tagged varieties (e.g., Naga ginger)." },
  { name: "Citronella & Lemongrass", image: "/productimages/citronella-lemongrass.jpg", botanical: "Cymbopogon spp.", states: "Assam, Meghalaya", part: "Leaves", compounds: "Citral, geraniol", application: "Antimicrobial; excipient/fragrance carrier in pharma-cosmetic formulations", notes: "Steam-distilled essential oil. Established export; GI-tagged \"Assam Lemongrass Oil\"." },
  { name: "Buckwheat", image: "/productimages/buckwheat.jpg", botanical: "Fagopyrum esculentum / F. tataricum", states: "Sikkim, Arunachal Pradesh, Manipur", part: "Grain, leaves", compounds: "Rutin, quercetin", application: "Cardiovascular support; antioxidant (rutin source for pharma/nutraceutical)", notes: "Flour; leaf/grain extract. Backed by our existing NE buckwheat sourcing network." },
  { name: "Toningkhok / Fish Mint", image: "/productimages/toningkhok-fish-mint.jpg", botanical: "Houttuynia cordata", states: "Assam, Meghalaya, Manipur, Mizoram, Arunachal Pradesh, Nagaland, Sikkim", part: "Whole plant", compounds: "Quercetin, flavonoids, volatile oils", application: "Antiviral; anti-inflammatory; immune support", notes: "Dried herb; standardized extract. Widely distributed across most NE states." },
  { name: "Manimuni / Indian Pennywort", image: "/productimages/manimuni-indian-pennywort.jpg", botanical: "Centella asiatica", states: "Assam, Meghalaya, Manipur, Tripura, Nagaland", part: "Whole plant", compounds: "Asiaticoside, madecassoside", application: "Wound healing; cognitive support; dermaceutical", notes: "Dried herb; standardized extract. High demand from dermaceutical and cosmeceutical-pharma buyers." },
  { name: "Rajpatha", image: "/productimages/rajpatha.jpg", botanical: "Stephania japonica", states: "Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Tripura", part: "Root", compounds: "Isoquinoline alkaloids", application: "Antimalarial; antipyretic; hepatoprotective", notes: "Root; alkaloid extract. Moving from wild collection to cultivation." },
  { name: "Bor Thekera", image: "/productimages/bor-thekera.jpg", botanical: "Garcinia pedunculata / G. cowa", states: "Assam, Meghalaya", part: "Fruit rind", compounds: "Hydroxycitric acid (HCA), xanthones", application: "Anti-obesity; metabolic/lipid support", notes: "Dried rind; HCA extract. Endemic/near-endemic species with limited competing origin." },
  { name: "Timur", image: "/productimages/timur.jpg", botanical: "Zanthoxylum armatum", states: "Sikkim, Arunachal Pradesh, Meghalaya", part: "Fruit, seed", compounds: "Essential oil (linalool-rich)", application: "Analgesic; digestive; antimicrobial", notes: "Dried fruit; essential oil. Growing demand in pain-relief and oral-care formulations." },
  { name: "Patchouli", image: "/productimages/patchouli.jpg", botanical: "Pogostemon cablin", states: "Assam (cultivated)", part: "Leaves", compounds: "Patchoulol", application: "Antimicrobial; cosmeceutical-pharma carrier oil", notes: "Steam-distilled essential oil. Cultivation piloted in Assam (TERI-NE); scalable." },
  { name: "Satuwa", image: "/productimages/satuwa.jpg", botanical: "Paris polyphylla", states: "Manipur, Nagaland, Arunachal Pradesh, Meghalaya", part: "Rhizome/root", compounds: "Diosgenin, steroidal saponins", application: "Anticancer research compound; wound healing; anti-inflammatory", notes: "Dried root; extract. High value — supplied from cultivated sources only.", regulated: true },
  { name: "Himalayan Yew", image: "/productimages/himalayan-yew.jpg", botanical: "Taxus wallichiana", states: "Arunachal Pradesh, Sikkim", part: "Bark, leaves (needles)", compounds: "Taxanes (paclitaxel precursor compounds)", application: "Anticancer drug precursor (chemotherapy raw material)", notes: "Leaf biomass preferred over bark. Protected species — certified/cultivated, permit-based sourcing only.", regulated: true },
  { name: "Sarpagandha", image: "/productimages/sarpagandha.jpg", botanical: "Rauvolfia serpentina", states: "Assam foothills, Meghalaya", part: "Root", compounds: "Reserpine and related alkaloids", application: "Antihypertensive alkaloid source", notes: "Root; alkaloid extract. Cultivated/contract-farmed supply only.", regulated: true },
  { name: "Himalayan Ginseng", image: "/productimages/himalayan-ginseng.jpg", botanical: "Panax pseudoginseng", states: "Sikkim, Arunachal Pradesh", part: "Root", compounds: "Ginsenosides", application: "Adaptogen; general tonic", notes: "Root; extract. High-altitude with limited supply — premium niche." },
  { name: "Medicinal Orchids", image: "/productimages/medicinal-orchids.jpg", botanical: "Dendrobium spp.", states: "Manipur, Mizoram", part: "Pseudobulbs", compounds: "Alkaloids, polysaccharides", application: "Immunomodulatory (used in Chinese/Asian pharma formulations)", notes: "Dried pseudobulb. Supplied subject to forest/wildlife clearances.", regulated: true },
  { name: "Bikh / Aconite", image: "/productimages/bikh-aconite.jpg", botanical: "Aconitum spp.", states: "Sikkim, Arunachal Pradesh", part: "Root/tuber", compounds: "Aconitine-type alkaloids", application: "Analgesic; anti-inflammatory (processed/detoxified pharma forms only)", notes: "Processed root extract only. Strictly regulated; pharma-grade processing required.", regulated: true },
  { name: "Cordyceps", image: "/productimages/cordyceps.jpg", botanical: "Ophiocordyceps sinensis", states: "Sikkim, Arunachal Pradesh (high altitude)", part: "Whole fungus-larva complex", compounds: "Cordycepin, polysaccharides", application: "Immunomodulatory; adaptogen (high-value nutraceutical-pharma ingredient)", notes: "Whole dried specimen; extract. Very limited, seasonal supply — specialist niche." },
].map((plant, i) => ({
  id: 101 + i,
  name: plant.name,
  botanicalName: plant.botanical,
  image: plant.image,
  category: "medicinal",
  type: "Export",
  origin: "North East India",
  destination: "Global Pharma Buyers",
  icon: <FaLeaf className="text-4xl" />,
  description: `${plant.application}. ${plant.notes}`,
  details: [
    `Part used: ${plant.part}`,
    `Key compounds: ${plant.compounds}`,
    `Available in: ${plant.states}`,
    "Assay, heavy-metal & residue test reports",
  ],
  certifications: plant.regulated
    ? ["Permit-based Sourcing", "Cultivated Supply"]
    : ["Standardized Assay", "Pharma Grade"],
}));

// Shown in place of a photo for products that don't have one yet.
const ProductPlaceholder = ({ product, className = "" }) => (
  <div
    className={`w-full ${className} flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0A2540] via-[#0D3156] to-[#0E7490] text-white px-6 text-center`}
  >
    <FaLeaf className="text-5xl text-[#05FCFB]" />
    <p className="text-sm font-semibold italic text-white/85">
      {product.botanicalName || product.name}
    </p>
  </div>
);

const ProductPage = () => {
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const categories = [
    { id: "all", label: "All Products", icon: <FaThLarge /> },
    { id: "medicinal", label: "Medicinal Plants", icon: <FaLeaf /> },
    { id: "food", label: "Food & Beverages", icon: <MdOutlineFoodBank /> },
    { id: "metal", label: "Metals & Steel", icon: <FaGem /> },
    { id: "spices", label: "Spices & Herbs", icon: <UtensilsCrossed /> },
    { id: "textiles", label: "Textiles", icon: <FaBoxes /> },
    { id: "industrial", label: "Industrial Equipment", icon: <FaCogs /> },
  ];

  const products = [
    ...medicinalPlants,
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
                      : "bg-cyan-100 text-[#0948CF] border border-[#05FCFB]/40"
                  }`}
                >
                  {product.type} Solution
                </span>
                <h2 className="h2 text-[#0A2540] mt-2">
                  {product.name}
                </h2>
                {product.botanicalName && (
                  <p className="text-sm italic text-slate-500 mt-1">
                    {product.botanicalName}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-[#05FCFB] hover:text-[#0A2540] transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 relative group">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-72 object-cover"
                    />
                  ) : (
                    <ProductPlaceholder product={product} className="h-72" />
                  )}
                  {product.rating && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-xs font-bold text-[#0948CF]">
                      ⭐ {product.rating} / 5.0
                    </div>
                  )}
                </div>

                {product.rating && (
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
                )}
              </div>

              <div className="space-y-5">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.description}
                </p>

                <div>
                  <h4 className="eyebrow text-slate-500 mb-2">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {product.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2.5 text-slate-700 text-xs font-medium"
                      >
                        <FaCheckCircle className="text-[#05FCFB] text-sm shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="eyebrow text-slate-500 mb-2">
                    Compliance & Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#F4F9FF] text-[#0948CF] rounded-full text-xs font-semibold border border-slate-200"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F4F9FF] rounded-2xl p-4 border border-slate-200/80">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Origin</p>
                      <p className="font-extrabold text-[#0A2540] text-xs mt-0.5">
                        {product.origin}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500">Destination</p>
                      <p className="font-extrabold text-[#0A2540] text-xs mt-0.5">
                        {product.destination}
                      </p>
                    </div>
                    {/* <div>
                      <p className="text-[11px] font-semibold text-slate-500">Price Est.</p>
                      <p className="font-extrabold text-[#0948CF] text-xs mt-0.5">
                        {product.priceRange}
                      </p>
                    </div> */}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="btn btn-primary w-full"
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
    <div className="min-h-screen bg-[#F4F9FF] text-[#0A2540] overflow-x-hidden selection:bg-secondary/30">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#0A1A3F] text-white border-b border-slate-800">
        <div className="absolute inset-0 opacity-65">
          <img src="/products.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A3F] via-[#0A1A3F]/40 to-[#0A1A3F]/15" />

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="h2 text-white">
              Your Trusted Partner{" "}
              <span className="grad-text block">
                In International Trade
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mt-4 max-w-2xl">
              Connecting India to world markets through premium exports and strategic, high-demand industrial imports.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {[
                { icon: <FaShip className="text-[#05FCFB]" />, text: "Export from India" },
                { icon: <FaPlane className="text-[#05FCFB]" />, text: "Import to India" },
                { icon: <FaWarehouse className="text-[#05FCFB]" />, text: "Global Logistics" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15 text-sm font-semibold text-white hover:border-[#05FCFB] transition-all"
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
            <span className="inline-block px-4 py-1.5 rounded-sm border border-primary/25 text-xs font-bold uppercase tracking-wider text-primary bg-white shadow-sm mb-4">
              Our Products
            </span>
            <h2 className="h2 text-[#0A2540]">
              Premium Export &amp; Import <span className="grad-text">Products</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-base">
              From India to the world — certified quality products that define global excellence.
            </p>
          </motion.div>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-white p-3 rounded-sm shadow-sm border border-slate-100">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-sm text-xs md:text-sm font-semibold transition-colors cursor-pointer ${
                    filter === cat.id
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-600 hover:bg-[#EAF1FF]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 bg-[#EAF1FF] p-1.5 rounded-sm shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-sm transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-500 hover:text-[#0A2540]"
                }`}
                title="Grid View"
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-sm transition-colors ${
                  viewMode === "list"
                    ? "bg-primary text-white shadow-sm"
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
                className={`group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-primary/40 ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "md:w-1/3 h-64 md:h-auto" : "h-64"
                  }`}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <ProductPlaceholder product={product} className="h-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider text-white bg-[#0A2540]/80 backdrop-blur-sm">
                      {product.type}
                    </span>
                    {product.rating >= 4.8 && (
                      <span className="px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider text-[#0A2540] bg-secondary">
                        Premium
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute inset-0 bg-[#0A2540]/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <span className="bg-white text-[#0A2540] px-5 py-2.5 rounded-sm font-bold text-xs flex items-center gap-2 shadow-lg">
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
                      <div>
                        <h3 className="h4 text-[#0A2540] group-hover:text-[#0948CF] transition-colors">
                          {product.name}
                        </h3>
                        {product.botanicalName && (
                          <p className="text-xs italic text-slate-500 mt-0.5">
                            {product.botanicalName}
                          </p>
                        )}
                      </div>
                      {product.rating && (
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-[#EAF1FF] px-2.5 py-1 rounded-sm shrink-0">
                          <FaStar className="text-amber-400 text-xs" />
                          <span>{product.rating}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                      <span>{product.origin}</span>
                      <span className="text-primary">→</span>
                      <span>{product.destination}</span>
                    </div>

                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.certifications.slice(0, 2).map((cert, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-[#EAF1FF] rounded-sm text-[11px] font-semibold text-primary"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    {/* <span className="text-xs font-extrabold text-[#0948CF]">
                      {product.priceRange}
                    </span> */}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="-my-2 py-2 text-xs text-[#0948CF] font-bold flex items-center gap-1 hover:gap-2 transition-all hover:text-[#0E7490]"
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
                className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-sm text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-primary"
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
                className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-[#05FCFB] mb-4">
              Global Trade Flow
            </span>
            <h2 className="h2">
              Connecting <span className="text-[#05FCFB]">India</span> to the World
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaTruck className="text-4xl text-[#05FCFB]" />,
                title: "Export from India",
                description:
                  "Premium Indian commodities like North East medicinal plants, rice, spices, steel, and textiles exported seamlessly to global trade partners.",
              },
              {
                icon: <FaExchangeAlt className="text-4xl text-[#05FCFB]" />,
                title: "Bilateral Trade",
                description:
                  "Strategic import-export corridors connecting India with over 50 countries across Asia, Europe, and America.",
              },
              {
                icon: <FaShip className="text-4xl text-[#05FCFB]" />,
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
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-[#05FCFB]/50 transition-all duration-300 text-center"
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

      <section className="py-16 bg-[#F5F9FF]">
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0948CF] to-[#0E7490]">
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
                className="group cursor-pointer bg-[#F4F9FF] rounded-3xl p-6 text-center border border-slate-100 hover:border-[#05FCFB] hover:bg-white transition-all shadow-2xs hover:shadow-xl"
              >
                <div className="text-3xl text-[#0948CF] group-hover:text-[#0E7490] group-hover:scale-110 transition-all flex justify-center">
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
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { FaArrowRight, FaStar, FaShippingFast, FaGlobe, FaCheckCircle, FaTruck, FaShip, FaPlane, FaWarehouse, FaGem, FaCrown, FaEye, FaExchangeAlt, FaBoxes, FaThLarge, FaList, FaArrowRight as FaArrowRightIcon , FaCogs  } from 'react-icons/fa';
import { MdOutlineAgriculture, MdOutlineFoodBank, MdOutlinePrecisionManufacturing } from "react-icons/md";
import { GiWheat, GiChiliPepper, GiCoffeeBeans } from 'react-icons/gi';
import { UtensilsCrossed } from 'lucide-react';
import { FaArrowLeft } from 'react-icons/fa6';

const page = () => {
    const router = useRouter();
    const [filter, setFilter] = useState('all');
    const [viewMode, setViewMode] = useState("grid");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const categories = [
        { id: 'all', label: 'All Products', icon: <FaThLarge /> },
        { id: 'agriculture', label: 'Agriculture', icon: <MdOutlineAgriculture /> },
        { id: 'food', label: 'Food & Beverages', icon: <MdOutlineFoodBank /> },
        { id: 'metal', label: 'Metals & Steel', icon: <FaGem /> },
        { id: 'spices', label: 'Spices & Herbs', icon: <UtensilsCrossed /> },
        { id: 'textiles', label: 'Textiles', icon: <FaBoxes /> },
        { id: 'industrial', label: 'Industrial Equipment', icon: <FaCogs /> },
    ];

    const products = [
        {
            id: 1,
            name: "Premium Wheat",
            category: "agriculture",
            type: "Export",
            origin: "India",
            destination: "Global Markets",
            image: "wheat.png",
            origin: "India",
            destination: "Global Markets",
            image: "/premiumwheat.jpg",
            icon: <GiWheat className='text-4xl' />,
            description: "High-quality Indian wheat exported to Middle East, Africa, and Southeast Asian countries. Know for its, excellent gluten content and baking properties.",
            details: [
                "High protein content (12-14%)",
                "Excellent baking quality",
                "Strict quality control",
                "Competitive pricing"
            ],
            certifications: ["ISO 22000", "HACCP", "Non-GMO"],
            priceRange: "$350-450 per MT",
            rating: 4.8,
            reviews: 125
        },
        {
            id: 2,
            name: "Basmati Rice Premium",
            category: "food",
            type: "Export",
            origin: "India",
            destination: "Middle East , Europe , USA",
            image: "/basmatirice.jpg",
            icon: <MdOutlineFoodBank className='text-4xl' />,
            description: "Premium India Basmati rice with long grains, destinct aroma, and excellent cooking quality. Sourced from the foothills of Himalayas.",
            details: [
                "Extra long grains (8.4mm)",
                "Aged 1-2 years",
                "Authentic aroma",
                "No artificial colors"
            ],
            certifications: ["USDA Organic", "Non-GMO", "Fair Trade"],
            priceRange: "$8---12200 per MT",
            rating: 4.9,
            reviews: 234
        },
        {
            id: 3,
            name: "Spices & Herbs",
            category: "spices",
            type: "Export",
            origin: "India",
            destination: "Europer, USA , Middle East",
            image: "/SpicesHerbs.jpg",
            icon: <UtensilsCrossed className="text-4xl" />,
            description: "Authentic Indian spices including cardamom , pepper, turmeric, and chill. Grow in the finest regions of India with rich flavours.",
            details: [
                "Certified organic",
                "Rich flavor profile",
                "Premium quality",
                "Sustainable sourcing"
            ],
            certifications: ["Organic ertified", "Fair Trade", "Spice Grade-A"],
            priceRange: "$2000-5000 per MT",
            rating: 4.7,
            reviews: 178
        },
        {
            id: 4,
            name: "metal",
            type: "Export",
            origin: "India",
            destination: "Southeast Asia, Middle East",
            image: "/metals.jpg",
            icon: <FaGem className='text-4xl' />,
            description: "High-quality steel billents manufactured in India meeting international standards. Used in construction, automotive , and infrastructure.",
            details: [
                "ASTM A615 standards",
                "Multiple grades available",
                "Competitive pricing",
                "Bulk supply capacity"
            ],
            certifications: ["ISO 9001", "ASTM Certified"],
            priceRange: "$500-700 per MT",
            rating: 4.6,
            reviews: 98
        },
        {
            id: 5,
            name: "Premium Tea",
            category: "food",
            type: "Export",
            origin: "India",
            destination: "UK, Europe, Asia",
            image: "/chaipatti.jpg",
            icon: <GiCoffeeBeans className="text-4xl" />,
            description: "Finest Indian tea from Assam, Darjeeling, and Nilgiri regions. Known for rich flavors and premium quality.",
            details: [
                "Pure leaf tea",
                "Premium grade",
                "Multiple variants",
                "Aromatic experience"
            ],
            certifications: ["FSSAI", "Export Quality", "Organic"],
            priceRange: "$1500-3000 per MT",
            rating: 4.9,
            reviews: 312
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
            description: "Advanced agricultural machinery imported from global leaders to support Indian farming with modern technology.",
            details: [
                "Latest technology",
                "High efficiency",
                "Durable construction",
                "After-sales support"
            ],
            certifications: ["CE Certified", "ISO 9001"],
            priceRange: "$5000-50000 per unit",
            rating: 4.5,
            reviews: 67
        },
        {
            id: 7,
            name: "Premium Cotton",
            category: "textiles",
            type: "Export",
            origin: "India",
            destination: "Europe, USA, China",
            image: "/cotton.png",
            icon: <FaBoxes className="text-4xl" />,
            description: "Premium quality Indian cotton known for its length, strength, and purity. Trusted by textile mills worldwide.",
            details: [
                "Superior quality",
                "Long staple length",
                "High yield",
                "Sustainable farming"
            ],
            certifications: ["Organic Certified", "Better Cotton Initiative"],
            priceRange: "$1500-2500 per MT",
            rating: 4.8,
            reviews: 156
        },
        {
            id: 8,
            name: "Chilies & Peppers",
            category: "spices",
            type: "Export",
            origin: "India",
            destination: "Europe, Americas, Asia",
            image: "/chili.png",
            icon: <GiChiliPepper className="text-4xl" />,
            description: "Premium Indian chilies known for vibrant color, pungency, and rich flavor. Essential ingredient for global cuisine.",
            details: [
                "High pungency",
                "Vibrant color",
                "Premium grades",
                "Fresh harvest"
            ],
            certifications: ["Spice Board India", "FSSAI"],
            priceRange: "$1000-2000 per MT",
            rating: 4.7,
            reviews: 189
        },
        {
            id: 9,
            name: "Industrial Machinery",
            category: "metal",
            type: "Import",
            origin: "Germany, Japan",
            destination: "India",
            image: "/industrial.png",
            icon: <FaCrown className="text-4xl" />,
            description: "High-precision industrial machinery imported to support India's manufacturing growth and industrial development.",
            details: [
                "Precision engineering",
                "High efficiency",
                "Certified quality",
                "Training included"
            ],
            certifications: ["ISO 14001", "CE Certified"],
            priceRange: "$20000-100000 per unit",
            rating: 4.4,
            reviews: 45
        }
    ];

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(product => product.category === filter);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOffFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOffFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const ProductModal = ({ product, onClose }) => {
        if (!product) return null;
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
                    <div className='flex justify-between items-start mb-6'>
                        <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${product.type === 'Export' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {product.type}
                            </span>
                            <h2 className="text-3xl font-bold text-slate-900 mt-2">{product.name}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <div className='grid md:grid-cols-2 gap-8'>
                        <div>
                            <div className="bg-gray-100 rounded-2xl overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
                            </div>
                            <div className="mt-4 flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={`${i < product.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className='text-sm text-gray-500'>({product.reviews} reviews)</span>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <p className='text-gray-600 leading-relaxed'>{product.description}</p>
                            <div>
                                <h4 className='font-semibold text-slate-900 mb-2'>Key Features</h4>
                                <ul className='space-y-2'>
                                    {product.details.map((detail, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-600">
                                            <FaCheckCircle className='text-green-500' />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-2">Certifications</h4>
                                <div className='flex flex-wrap gap-2'>
                                    {product.certifications.map((cart, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{cart}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className='flex justify-between'>
                                    <div>
                                        <p className="text-sm text-gray-500">Origin</p>
                                        <p className="font-semibold">{product.origin}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Destination</p>
                                        <p className="font-semibold">{product.destination}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Price Range</p>
                                        <p className="font-semibold text-orange-600">{product.priceRange}</p>
                                    </div>
                                </div>
                            </div>
                            <Link  
                            href="/contact"className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold text-white hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-alia cursor-pointer">
                                <FaGlobe /> Inquire Now
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-x-hidden'>
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1F44] via-[#0F2B5C] to-[#0A1F44] py-20 md:py-28">
                <div className='absolute inset-0'>
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
                <div className="container  px-4 sm:px-6 lg:px-10 relative z-10">
                    <motion.div
                        transition={{ duration: 0.8 }}
                        className=" max-w-4xl "
                    >
                        <motion.div
                            className="inline-block bg-orange-500/20 backdrop-blur-sm px-6 py-2.5 rounded-full border border-orange-500/30 mb-6"
                        >
                            <span className="flex items-center gap-2 text-orange-400 font-semibold text-sm uppercase tracking-wider">
                                <FaGlobe /> Global Trade Solutions
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"> Your Trusted Partner
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500"> In International Trade</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-300 leading-relaxed mt-6 max-w-2xl "
                        >
                            Connecting India to the world through premium exports and strategic imports
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap  gap-4 mt-8"
                        >
                            {[
                                { icon: <FaShip />, text: "Export from India" },
                                { icon: <FaPlane />, text: "Import to India" },
                                { icon: <FaWarehouse />, text: "Global Logistics" }
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
                <div className=" mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { number: "100+", label: "Products", icon: <FaBoxes className="text-orange-500" /> },
                            { number: "50+", label: "Countries", icon: <FaGlobe className="text-blue-500" /> },
                            { number: "500+", label: "Happy Clients", icon: <FaStar className="text-yellow-500" /> },
                            { number: "15+", label: "Years Experience", icon: <FaShippingFast className="text-green-500" /> }
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
                                <div className='text-sm text-gray-500'>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block bg-orange-500/10 px-6 py-2 rounded-full border border-orange-500/20 text-orange-500 font-semibold text-sm uppercase tracking-wider mb-4">
                            Our Products
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Products</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                            From India to the world - quality products that define excellence
                        </p>
                    </motion.div>

                    
                    <div className="flex flex-wrap gap-3 justify-between items-center mb-8">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setFilter(cat.id);
                                        setCurrentPage(1);
                                    }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === cat.id
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                                        : 'bg-white text-slate-700 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {cat.icon}
                                    {cat.label}
                                </motion.button>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                            >
                                <FaThLarge />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                            >
                                <FaList />
                            </button>
                        </div>
                    </div>

                   
                    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                        {currentProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                                    }`}
                            >
                                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-1/3' : ''}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.type === 'Export'
                                            ? 'bg-green-500/90 text-white'
                                            : 'bg-blue-500/90 text-white'
                                            }`}>
                                            {product.type}
                                        </span>
                                        {product.rating >= 4.8 && (
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/90 text-white">
                                                Premium
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                    >
                                        <span className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-colors">
                                            <FaEye /> Quick View
                                        </span>
                                    </button>
                                </div>

                                <div className={`p-6 ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-500 transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                                            <FaStar />
                                            <span className="text-slate-600">{product.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <span>📍 {product.origin}</span>
                                        <span>→</span>
                                        <span>📍 {product.destination}</span>
                                    </div>

                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                        {product.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.certifications.slice(0, 2).map((cert, i) => (
                                            <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-orange-600">
                                            {product.priceRange}
                                        </span>
                                        <button
                                            onClick={() => setSelectedProduct(product)}
                                            className="text-sm text-orange-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all group-hover:text-orange-600"
                                        >
                                            View Details <FaArrowRight className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-gradient-to-br from-[#0A1F44] to-[#1B3A7A] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
                </div>

                <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center text-white mb-12"
                    >
                        <span className="inline-block bg-orange-500/20 backdrop-blur-sm px-6 py-2 rounded-full border border-orange-500/30 text-orange-400 font-semibold text-sm uppercase tracking-wider mb-4">
                            Global Trade Flow
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold">
                            Connecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">India</span> to the World
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                icon: <FaTruck className="text-5xl text-orange-400" />,
                                title: "Export from India",
                                description: "Premium Indian products like wheat, rice, spices, steel, and textiles exported to global markets.",
                                color: "border-orange-500/30"
                            },
                            {
                                icon: <FaExchangeAlt className="text-5xl text-blue-400" />,
                                title: "Bilateral Trade",
                                description: "Strategic import-export partnerships connecting India with over 50 countries worldwide.",
                                color: "border-blue-500/30"
                            },
                            {
                                icon: <FaShip className="text-5xl text-green-400" />,
                                title: "Import to India",
                                description: "Advanced machinery, technology, and specialized products imported to support Indian industries.",
                                color: "border-green-500/30"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 border ${item.color} hover:bg-white/20 transition-all duration-300 text-center`}
                            >
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

         
            <section className="py-16 bg-white">
                <div className=" mx-auto px-4 sm:px-6 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                            Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Categories</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                        {categories.slice(1).map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8, scale: 1.05 }}
                                onClick={() => {
                                    setFilter(cat.id);
                                    setCurrentPage(1);
                                }}
                                className="group cursor-pointer bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-100 hover:border-orange-500 transition-all duration-300 shadow-md hover:shadow-xl"
                            >
                                <div className="text-4xl text-orange-500 group-hover:scale-110 transition-transform duration-300">
                                    {cat.icon}
                                </div>
                                <h3 className="text-sm font-semibold text-slate-700 mt-3">{cat.label}</h3>
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
    )
}

export default page

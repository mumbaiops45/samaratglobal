
import { Eye, Award, Truck, Handshake, Target, Building2, Sparkles, Globe2, ArrowUpRight } from "lucide-react";


const BRAND = {
    ink: "#050B14",
    surface: "#0A1A2C",
    surfaceAlt: "#0E2338",
    steel: "#15304A",
    cyan: "#22D3EE",
    cyanDeep: "#06B6D4",
    azure: "#2E6BFF",
    azureDeep: "#1E40AF",
    mist: "#F5F9FF",
    slate: "#8FA6BE",
};

export const faqs = [
    {
        q: "What does Samrat Global India do?",
        a: "Samrat Global India provides sourcing, procurement and export support, coordinating with suppliers from product sourcing through delivery.",
    },
    {
        q: "Can you help me find suppliers in international markets?",
        a: "Yes. We help identify suitable suppliers based on your product requirements, specifications and purchasing needs.",
    },
    {
        q: "Do you provide sourcing and procurement services?",
        a: (
            <>
                Yes. Our <b>Global Procurement Solutions</b> include product
                sourcing, supplier coordination, purchasing support and order
                monitoring.
            </>
        ),
    },
    {
        q: "Do you provide export services from India?",
        a: (
            <>
                Yes. Our <b>Export Company in India</b> services support
                sourcing, procurement, shipment coordination and international
                trade requirements.
            </>
        ),
    },
    {
        q: "Why should I choose Samrat Global India?",
        a: "We combine sourcing expertise, procurement coordination, quality-focused processes and customer-first service to simplify global trade and build lasting partnerships.",
    },
];


export const TECH_SECTIONS = [
    {
        id: "about-us",
        number: "01",
        title: "About Us",
        subtitle: "GLOBAL SOURCING & EXPORT PARTNER",
        badge: "Company",
        icon: Building2,
        images:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyY2RYj6GEWQiZxKknVPWGK6GtjC6BAT_O_EqCRnuFEy7o0ys3LeL5TVDP&s=10",

        paragraphs: [
            'As a <span className="BRAND.cyan">global sourcing company</span>, we support businesses through supplier identification, product sourcing, procurement coordination and export assistance.',
            "Our customer-first approach is built around three principles.",
            "We work to create reliable business connections that support efficient sourcing and sustainable international growth.",
        ],

        cameraPos: [0, 85, 115],
        cameraTarget: [0, 75, -10],
        hotspot3D: [0, 75, -15],

        telemetry: {
            stat1: { label: "Industry", value: "Global Trade" },
            stat2: { label: "Focus", value: "Export & Sourcing" },
            stat3: { label: "Approach", value: "Customer First" },
        },
    },

    {
        id: "mission",
        number: "02",
        title: "Mission",
        subtitle: "BUILDING VALUE THROUGH TRUST & QUALITY",
        badge: "Our Purpose",
        icon: Target,
        images:
            "https://intoindia.blog/wp-content/uploads/2021/07/india_office-1.jpg?w=1200",

        paragraphs: [
            "<strong>Our Purpose</strong>",
            "<h3>Building Value Through Trust & Quality</h3>",
            'Our purpose is to simplify global trade by connecting businesses with dependable sourcing, procurement and export opportunities.',
            'Our mission is to deliver dependable <span className="BRAND.cyan">Sourcing & Procurement Solutions</span> that help businesses access quality products, reliable suppliers and efficient international trade support.',
        ],

        cameraPos: [-48, 6, 48],
        cameraTarget: [0, -1, 0],
        hotspot3D: [-14, -1, 5],

        telemetry: {
            stat1: { label: "Quality", value: "Premium Standards" },
            stat2: { label: "Innovation", value: "Driven Solutions" },
            stat3: { label: "Partnerships", value: "Long-Term Relationships" },
        },
    },

    {
        id: "vision",
        number: "03",
        title: "Vision",
        subtitle: "A GLOBAL PARTNER FOR SOURCING & TRADE",
        badge: "Future",
        icon: Eye,
        images:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMVqiPm1Ov9L9-IMcuDP_uFgMBVkwVCtUbJDRZgsZMsNBr-kGkdGaeACR&s=10",

        paragraphs: [
            "<h3>FUTURE</h3>",
            "<h2>CONNECTING GLOBAL MARKETS</h2>",
            "We envision a connected business ecosystem where companies can access reliable suppliers, quality products and international markets with greater confidence and efficiency.",
            'Our vision is to become a trusted <span className="BRAND.cyan">global sourcing company</span>,',
            "connecting businesses across markets through reliable sourcing, procurement and export solutions.",
        ],

        cameraPos: [34, 26, 40],
        cameraTarget: [0, 4, 0],
        hotspot3D: [0, 6, 2],

        telemetry: {
            stat1: { label: "Markets", value: "Global" },
            stat2: { label: "Trust", value: "Core Value" },
            stat3: { label: "Growth", value: "Sustainable" },
        },
    },

    {
        id: "quality",
        number: "04",
        title: "We Focus on Quality",
        subtitle: "EXCELLENCE IN EVERY SHIPMENT",
        badge: "Quality",
        icon: Award,
        images:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Ir96KElaEbdbxSTrZeN9mHZd4cdPqAsyMgIw5IOvjfXC_6vXH12id6Y&s=10",

        paragraphs: [
            "Quality is at the heart of our sourcing and export approach. We work to maintain consistent standards through supplier coordination, product evaluation and inspection support.",
            "Our commitment is to help businesses source with greater confidence while reducing avoidable quality concerns throughout the procurement process.",
        ],

        cameraPos: [-22, -2, -48],
        cameraTarget: [0, -4, -22],
        hotspot3D: [0, -3, -22],

        telemetry: {
            stat1: { label: "Quality", value: "Consistent Standards" },
            stat2: { label: "Inspection", value: "Strict Verification" },
            stat3: { label: "Commitment", value: "Excellence at Every Stage" },
        },
    },

    {
        id: "supply-chain",
        number: "05",
        title: "Reliable Supply Chain",
        subtitle: "EFFICIENT & DEPENDABLE OPERATIONS",
        badge: "Logistics",
        icon: Truck,
        images:
            "https://varuna-media-prod.s3.ap-south-1.amazonaws.com/030725111210_supply_chain_management_6f0a642fa0.jpg",

        paragraphs: [
            "A reliable supply chain is essential for successful international trade. Our team coordinates sourcing, procurement, shipment and delivery activities to support smooth movement from supplier to destination.",
            "Through organized logistics coordination and international trade support, we help businesses maintain greater efficiency and reliability across their supply operations.",
        ],

        cameraPos: [18, 22, 22],
        cameraTarget: [0, 11, 4],
        hotspot3D: [0, 12, 6],

        telemetry: {
            stat1: { label: "Delivery", value: "Reliable" },
            stat2: { label: "Efficiency", value: "High" },
            stat3: { label: "Network", value: "Global" },
        },
    },

    {
        id: "customer-first",
        number: "06",
        title: "Customer-First Policy",
        subtitle: "EXCEEDING EXPECTATIONS",
        badge: "Service",
        icon: Handshake,
        images:
            "https://t3.ftcdn.net/jpg/10/43/42/06/360_F_1043420602_HhmKNYUQrQKmIsriU2W0u8ZWSLn7e9zs.jpg",

        paragraphs: [
            "Our customers are at the center of every sourcing and export engagement. We focus on understanding individual requirements, maintaining clear communication and providing responsive support throughout the process.",
            'Whether you need supplier coordination, procurement assistance or <span className="BRAND.cyan">International Export Service</span>, we work to create a dependable experience built around your business needs.',
        ],

        cameraPos: [65, 45, 65],
        cameraTarget: [0, 8, 0],
        hotspot3D: [0, 10, -5],

        telemetry: {
            stat1: { label: "Support", value: "Dedicated" },
            stat2: { label: "Relationships", value: "Long-Term" },
            stat3: { label: "Satisfaction", value: "Priority" },
        },
    },
];


export const commitments = [
    { title: "Quality You Can Trust", description: "Quality-focused sourcing, supplier coordination and inspection support esnsure your requirements are handled with care." },
    { title: "Reliable Supply Chain", description: "We coordinate sourcing, procurement and logistics for efficenent, relaible movement of goods." },
    { title: "Customer First Policy", description: "We provide responsive communication and trasport coordination, building lasting relationships around your business goals." },
];


export const services = [
    {
        title: "Product Development",
        description: "Support for developing and identifying products accrding to business requirements.",
    },
    {
        title: "Product Purchasing",
        description: "Professional coordination for purchasing products from suitable suppliers.",
    },
    {
        title: "Supplier Management",
        description: "Supplier coordination and communication to support reliable procurement.",
    },
    {
        title: "Order Monitoring",
        description: "Ongoing coordination and monitoring of orders throughout the procurement process.",
    },
    {
        title: "Delivery at Destination",
        description: "Support for coordinating shipment movement and delivery to the required desctination."
    }
]

export const content = [
    {
        heading: "Sourcing & Procurement",
        blueTitle: (
            <>
                Your Trusted Global Sourcing <br />
            </>
        ),
        whiteTitle: " Company for Seamless Trade",
        description: (
            <>
                Samrat Global India is a trusted{" "}
                <span className="font-bold">global sourcing company</span>{" "}
                helping businesses source, procure and move quality products across
                international markets. From supplier coordination and product
                procurement to export support and delivery, we simplify the entire
                process through reliable and efficient solutions.
            </>
        ),
    },
];


export const cards = [
    {
        theme: "dark",
        tag: "Core Value",
        eyebrow: "Our Commitment",
        title: "Quality that Builds Global Trust",
        image:
            "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1600&auto=format&fit=crop",

        body: (
            <>
                <span>As a dependable </span>
                <span
                    className="font-semibold"
                    style={{ color: BRAND.cyan }}
                >
                    Samrat Global India Private Limited
                </span>
                <span>
                    , we make quality the foundation of every business relationship. We
                    focus on reliable sourcing, supplier coordination and product
                    verification to help clients purchase with confidence.
                </span>
            </>
        ),

        stats: [
            {
                value: "Quality",
                label: "Consistent sourcing and procurement standards.",
            },
            {
                value: "Inspection",
                label: "Product and supplier verification.",
            },
            {
                value: "Commitment",
                label: "Reliable service and lasting partnerships.",
            },
        ],
    },

    {
        theme: "light",
        tag: "Trusted Partner",
        eyebrow: "Who We Are",
        title: "Samrat Global India",
        image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop",

        body: (
            <>
                <span>Samrat Global India is a </span>
                <span
                    className="font-semibold"
                    style={{ color: BRAND.cyan }}
                >
                    Sourcing and Export Company
                </span>
                <span>
                    {" "}
                    providing sourcing, procurement and international trade support. We
                    connect businesses with suitable suppliers and products while
                    coordinating the movement of goods from source to destination.
                </span>

                <br />
                <br />

                <span>
                    Our customer-first approach makes international sourcing simpler,
                    transparent and dependable.
                </span>
            </>
        ),

        stats: [
            {
                value: "500+",
                label: "Clients Served",
            },
            {
                value: "50+",
                label: "Countries",
            },
            {
                value: "15+",
                label: "Years of Experience",
            },
            {
                value: "100%",
                label: "Customer Satisfaction",
            },
        ],
    },

    {
        theme: "dark",
        eyebrow: "Smart Forecasting",
        title: "Smarter Logistics. Better Global Movement.",
        image:
            "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1600&auto=format&fit=crop",

        body: (
            <>
                <span>Our </span>
                <span
                    className="font-semibold"
                    style={{ color: BRAND.cyan }}
                >
                    Global Export Services
                </span>
                <span>
                    {" "}
                    focus on efficient coordination, route planning and shipment
                    management. We help reduce delays and improve supply-chain visibility
                    from supplier coordination to final delivery.
                </span>
            </>
        ),

        stats: [
            {
                value: "18%",
                label: "Potential Cost Saved",
            },
            {
                value: "3.5x",
                label: "Faster ETA Planning",
            },
        ],
    },
];
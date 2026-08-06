"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {ArrowRight,Gauge,Sparkles,Building2,Eye,Award,Truck,Handshake,Target} from "lucide-react";

const BRAND = {
    navyDeep: "#0A1F44",
    navy: "#123C73",
    navyMid: "#1B4B91",
    navyBright: "#244D88",
    gold: "#D4AF37",
    goldLight: "#F5D77A",
    mist: "#F8FAFC",
};


const TECH_SECTIONS = [
  {
    id: "about-us",
    number: "01",
    title: "About Us",
    subtitle: "GLOBAL SOURCING & EXPORT PARTNER",
    badge: "Company",
    icon: Building2,
    paragraphs: [
     "The Samrat Global is a sourcing and export company based in India.",
      "Driven by innovation and a customer-centric approach, we serve as a strategic sourcing partner for businesses worldwide."
    ],
    cameraPos: [0, 85, 115],
    cameraTarget: [0, 75, -10],
    hotspot3D: [0, 75, -15],
    telemetry: {
      stat1: { label: "Industry", value: "Export" },
      stat2: { label: "Focus", value: "Global" },
      stat3: { label: "Approach", value: "Customer First" }
    }
  },
  {
    id: "mission",
    number: "02",
    title: "Mission",
    subtitle: "BUILDING VALUE THROUGH TRUST & QUALITY",
    badge: "Our Purpose",
    icon: Target,
    paragraphs: [
      "To create lasting value for customers worldwide by delivering excellence through quality, innovation, and trust.",
      "Webuild sustainable partnerships that help businesses grow across global markets."
    ],
    cameraPos: [-48, 6, 48],
    cameraTarget: [0, -1, 0],
    hotspot3D: [-14, -1, 5],
    telemetry: {
      stat1: { label: "Quality", value: "Premium" },
      stat2: { label: "Innovation", value: "Driven" },
      stat3: { label: "Partnerships", value: "Long-Term" }
    }
  },
  {
    id: "vision",
    number: "03",
    title: "Vision",
    subtitle: "CONNECTING GLOBAL MARKETS",
    badge: "Future",
    icon: Eye,
    paragraphs: [
      "To connect global markets through premium-quality products.",
      "We foster trust, reliability, and long-term value with customer-focused service."
    ],
    cameraPos: [34, 26, 40],
    cameraTarget: [0, 4, 0],
    hotspot3D: [0, 6, 2],
    telemetry: {
      stat1: { label: "Markets", value: "Global" },
      stat2: { label: "Trust", value: "Core Value" },
      stat3: { label: "Growth", value: "Sustainable" }
    }
  },
  {
    id: "quality",
    number: "04",
    title: "We Focus on Quality",
    subtitle: "EXCELLENCE IN EVERY SHIPMENT",
    badge: "Quality",
    icon: Award,
    paragraphs: [
      "Consistency in quality is not just a standard-it's our commitment to excellence.",
      "Every product is carefully sourced and inspected to exceed customer expectations."
    ],
    cameraPos: [-22, -2, -48],
    cameraTarget: [0, -4, -22],
    hotspot3D: [0, -3, -22],
    telemetry: {
      stat1: { label: "Quality", value: "Consistent" },
      stat2: { label: "Inspection", value: "Strict" },
      stat3: { label: "Commitment", value: "Excellence" }
    }
  },
  {
    id: "supply-chain",
    number: "05",
    title: "Reliable Supply Chain",
    subtitle: "EFFICIENT & DEPENDABLE OPERATIONS",
    badge: "Logistics",
    icon: Truck,
    paragraphs: [
      "A strong and dependable supply chain ensures timely delivery and cost efficiency.",
      "We continuously refine our operations to maintain reliability and customer satisfaction."
    ],
    cameraPos: [18, 22, 22],
    cameraTarget: [0, 11, 4],
    hotspot3D: [0, 12, 6],
    telemetry: {
      stat1: { label: "Delivery", value: "Reliable" },
      stat2: { label: "Efficiency", value: "High" },
      stat3: { label: "Network", value: "Global" }
    }
  },
  {
    id: "customer-first",
    number: "06",
    title: "Customer-First Policy",
    subtitle: "EXCEEDING EXPECTATIONS",
    badge: "Service",
    icon: Handshake,
    paragraphs: [
      "At The Samrat Global, we don't just meet customer expectations-we exceed them.",
      "Constinous improvement allows us to build lasting relationships and deliver unmatched satisfaction."
    ],
    cameraPos: [65, 45, 65],
    cameraTarget: [0, 8, 0],
    hotspot3D: [0, 10, -5],
    telemetry: {
      stat1: { label: "Support", value: "Dedicated" },
      stat2: { label: "Relationships", value: "Long-Term" },
      stat3: { label: "Satisfaction", value: "Priority" }
    }
  }
];
export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [hotspots2D, setHotspots2D] = useState([]);
  const [isCurrentlyScrolling, setIsCurrentlyScrolling] = useState(false);

  const sectionRefs = useRef([]);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  const shipGroupRef = useRef(null);
  const kiteMeshRef = useRef(null);
  const tetherLineRef = useRef(null);
  const oceanMeshRef = useRef(null);
  const digitalTwinWireRef = useRef(null);
  const craneContainerRef = useRef(null);

  const currentCamPos = useRef(new THREE.Vector3(0, 85, 115));
  const targetCamPos = useRef(new THREE.Vector3(0, 85, 115));
  const currentCamTarget = useRef(new THREE.Vector3(0, 75, -10));
  const targetCamTarget = useRef(new THREE.Vector3(0, 75, -10));

  
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const motionTimeRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      isScrollingRef.current = true;
      setIsCurrentlyScrolling(true);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        setIsCurrentlyScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -35% 0px",
      threshold: 0.25
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index) && index !== activeIndex) {
            setActiveIndex(index);
            const section = TECH_SECTIONS[index];
            targetCamPos.current.set(...section.cameraPos);
            targetCamTarget.current.set(...section.cameraTarget);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeIndex]);

 
  const scrollToCard = (index) => {
    setActiveIndex(index);
    const section = TECH_SECTIONS[index];
    targetCamPos.current.set(...section.cameraPos);
    targetCamTarget.current.set(...section.cameraTarget);

    const targetEl = sectionRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x030712);
    scene.fog = new THREE.FogExp2(0x030712, 0.004);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(...TECH_SECTIONS[0].cameraPos);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.0);
    sunLight.position.set(80, 140, 100);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const cyanGlow = new THREE.PointLight(0x06b6d4, 4.5, 130);
    cyanGlow.position.set(0, 14, 0);
    scene.add(cyanGlow);

    const deepWaterLight = new THREE.DirectionalLight(0x0284c7, 1.8);
    deepWaterLight.position.set(-30, -50, -30);
    scene.add(deepWaterLight);

    const oceanGeo = new THREE.PlaneGeometry(380, 380, 60, 60);
    oceanGeo.rotateX(-Math.PI / 2);
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x071c38,
      roughness: 0.15,
      metalness: 0.85,
      flatShading: true
    });
    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    oceanMesh.position.y = -6;
    scene.add(oceanMesh);
    oceanMeshRef.current = oceanMesh;

    const gridHelper = new THREE.GridHelper(380, 50, 0x0284c7, 0x0d2a4a);
    gridHelper.position.y = -5.9;
    scene.add(gridHelper);

    const shipGroup = new THREE.Group();
    shipGroupRef.current = shipGroup;
    scene.add(shipGroup);

    const hullMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.75, roughness: 0.2 });
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 0.8 });

    const createHull = (xOffset) => {
      const hGroup = new THREE.Group();
      const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(6.5, 4.8, 52), hullMat);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      hGroup.add(bodyMesh);

      const bowGeo = new THREE.ConeGeometry(3.25, 11, 4);
      bowGeo.rotateX(Math.PI / 2);
      bowGeo.rotateZ(Math.PI / 4);
      const bowMesh = new THREE.Mesh(bowGeo, hullMat);
      bowMesh.position.set(0, 0, 28);
      bowMesh.castShadow = true;
      hGroup.add(bowMesh);

      const stripeMesh = new THREE.Mesh(new THREE.BoxGeometry(6.7, 0.45, 50), stripeMat);
      stripeMesh.position.y = 0.5;
      hGroup.add(stripeMesh);

      hGroup.position.x = xOffset;
      return hGroup;
    };

    shipGroup.add(createHull(-11));
    shipGroup.add(createHull(11));

    const deckMesh = new THREE.Mesh(
      new THREE.BoxGeometry(28, 1.6, 48),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.4 })
    );
    deckMesh.position.set(0, 2.2, 0);
    deckMesh.castShadow = true;
    deckMesh.receiveShadow = true;
    shipGroup.add(deckMesh);

    const containerColors = [0x0284c7, 0x0d9488, 0xe11d48, 0x475569, 0xd97706, 0x2563eb, 0x059669];
    const containerGroup = new THREE.Group();

    for (let row = -3.5; row <= 3.5; row++) {
      for (let col = -1; col <= 1; col++) {
        for (let stack = 0; stack < 3; stack++) {
          const color = containerColors[(Math.abs(Math.floor(row)) + Math.abs(col) + stack) % containerColors.length];
          const cMat = new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.3 });
          const cMesh = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.2, 5.5), cMat);
          cMesh.position.set(col * 7.5, 4.5 + stack * 3.3, row * 5.8 - 2);
          cMesh.castShadow = true;
          cMesh.receiveShadow = true;
          containerGroup.add(cMesh);
        }
      }
    }
    shipGroup.add(containerGroup);

    const craneGroup = new THREE.Group();
    const craneMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });

    const leg1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 18, 1.2), craneMat);
    leg1.position.set(-13, 11, 2);
    const leg2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 18, 1.2), craneMat);
    leg2.position.set(13, 11, 2);

    const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(28, 1.5, 2), craneMat);
    crossBeam.position.set(0, 19, 2);

    const craneContainerMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 0.4 });
    const craneContainer = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.2, 5.5), craneContainerMat);
    craneContainer.position.set(0, 14, 2);
    craneContainerRef.current = craneContainer;

    const cableMat = new THREE.LineBasicMaterial({ color: 0x94a3b8 });
    const cable1 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3, 19, 2), new THREE.Vector3(-3, 14, 2)]),
      cableMat
    );
    const cable2 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(3, 19, 2), new THREE.Vector3(3, 14, 2)]),
      cableMat
    );

    craneGroup.add(leg1, leg2, crossBeam, craneContainer, cable1, cable2);
    shipGroup.add(craneGroup);

    const bridgeGroup = new THREE.Group();
    const bridgeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(18, 7, 9),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.15 })
    );
    bridgeMesh.position.set(0, 6.5, 18);
    bridgeGroup.add(bridgeMesh);

    const glassMesh = new THREE.Mesh(
      new THREE.BoxGeometry(18.2, 2.4, 4.5),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, transparent: true, opacity: 0.8 })
    );
    glassMesh.position.set(0, 7.8, 19.5);
    bridgeGroup.add(glassMesh);

    const domeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, emissive: 0x38bdf8, emissiveIntensity: 0.5 })
    );
    domeMesh.position.set(0, 15, 18);
    bridgeGroup.add(domeMesh);
    shipGroup.add(bridgeGroup);

    const propGroup = new THREE.Group();
    const propGeo = new THREE.CylinderGeometry(2, 2, 4.5, 16);
    propGeo.rotateX(Math.PI / 2);
    const propMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.95 });

    const portProp = new THREE.Mesh(propGeo, propMat);
    portProp.position.set(-11, -4, -24);
    const starboardProp = new THREE.Mesh(propGeo, propMat);
    starboardProp.position.set(11, -4, -24);
    propGroup.add(portProp, starboardProp);
    shipGroup.add(propGroup);

    const kiteGroup = new THREE.Group();
    kiteMeshRef.current = kiteGroup;

    const wingShape = new THREE.Shape();
    wingShape.moveTo(-18, 0);
    wingShape.quadraticCurveTo(0, 9, 18, 0);
    wingShape.quadraticCurveTo(0, 2, -18, 0);

    const kiteMesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(wingShape, { depth: 1.6, bevelEnabled: true }),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 0.65, metalness: 0.85 })
    );
    kiteMesh.rotation.x = Math.PI / 6;
    kiteGroup.add(kiteMesh);
    kiteGroup.position.set(0, 75, -15);
    scene.add(kiteGroup);

    const tetherMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
    const tetherLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 6, 22), new THREE.Vector3(0, 75, -15)]),
      tetherMat
    );
    scene.add(tetherLine);
    tetherLineRef.current = tetherLine;

    const digitalTwinGroup = new THREE.Group();
    digitalTwinWireRef.current = digitalTwinGroup;

    const wireMesh = new THREE.Mesh(
      new THREE.BoxGeometry(36, 32, 60),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.35 })
    );
    wireMesh.position.set(0, 8, 0);
    digitalTwinGroup.add(wireMesh);
    digitalTwinGroup.visible = false;
    scene.add(digitalTwinGroup);

    const pCount = 220;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 150;
      pPos[i * 3 + 1] = Math.random() * 110;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 150;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.95, transparent: true, opacity: 0.55 })
    );
    scene.add(particles);

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isScrollingRef.current) {
        motionTimeRef.current += 0.025;
      }

      const elapsed = motionTimeRef.current;

      if (oceanMeshRef.current) {
        const pos = oceanMeshRef.current.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const v = pos.getY(i);
          const z = Math.sin(u * 0.08 + elapsed * 1.6) * 0.6 + Math.cos(v * 0.08 + elapsed * 1.3) * 0.6;
          pos.setZ(i, z);
        }
        pos.needsUpdate = true;
      }

      if (shipGroupRef.current) {
        shipGroupRef.current.position.y = Math.sin(elapsed * 1.8) * 0.45;
        shipGroupRef.current.rotation.z = Math.sin(elapsed * 1.2) * 0.025;
        shipGroupRef.current.rotation.x = Math.cos(elapsed * 1.5) * 0.015;
      }

      if (craneContainerRef.current) {
        craneContainerRef.current.position.y = 14 + Math.sin(elapsed * 2) * 2;
      }

      if (kiteMeshRef.current && tetherLineRef.current) {
        const figX = Math.sin(elapsed * 1.2) * 15;
        const figY = Math.sin(elapsed * 2.4) * 4.8;
        kiteMeshRef.current.position.x = figX;
        kiteMeshRef.current.position.y = 75 + figY;
        kiteMeshRef.current.rotation.z = (Math.sin(elapsed * 1.2) * Math.PI) / 10;

        const tPos = tetherLineRef.current.geometry.attributes.position;
        tPos.setXYZ(0, 0, 6, 22);
        tPos.setXYZ(1, figX, 75 + figY, -15);
        tPos.needsUpdate = true;
      }

      if (isScrollingRef.current) {
        const pAttr = particles.geometry.attributes.position;
        for (let i = 0; i < pCount; i++) {
          let z = pAttr.getZ(i);
          z += 1.2;
          if (z > 75) z = -75;
          pAttr.setZ(i, z);
        }
        pAttr.needsUpdate = true;
      }

      currentCamPos.current.lerp(targetCamPos.current, 0.045);
      currentCamTarget.current.lerp(targetCamTarget.current, 0.045);

      if (cameraRef.current) {
        cameraRef.current.position.copy(currentCamPos.current);
        cameraRef.current.lookAt(currentCamTarget.current);
      }

      if (cameraRef.current && mountRef.current) {
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        const updatedHotspots = TECH_SECTIONS.map((sec) => {
          const vec = new THREE.Vector3(...sec.hotspot3D);
          vec.project(cameraRef.current);
          const x = (vec.x * 0.5 + 0.5) * w;
          const y = (-(vec.y * 0.5) + 0.5) * h;
          return { x, y, visible: vec.z < 1 };
        });
        setHotspots2D(updatedHotspots);
      }

      rendererRef.current?.render(scene, cameraRef.current);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (digitalTwinWireRef.current) {
      digitalTwinWireRef.current.visible = activeIndex === 5;
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      <section className="relative w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-auto">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          {hotspots2D.map((pos, idx) => {
            if (!pos.visible) return null;
            const isActive = activeIndex === idx;
            const sec = TECH_SECTIONS[idx];

            return (
              <button
                key={sec.id}
                onClick={() => scrollToCard(idx)}
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: "translate(-50%, -50%)"
                }}
                className={`absolute z-20 group transition-all duration-500 focus:outline-none ${
                  isActive ? "scale-125" : "scale-100 opacity-75 hover:opacity-100 hover:scale-110"
                }`}
              >
                <div className={`absolute -inset-2 rounded-full animate-ping ${isActive ? "bg-cyan-400/60" : "bg-slate-500/20"}`} />
                <div
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-black shadow-2xl backdrop-blur-md transition-colors ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/40"
                      : "bg-slate-900/90 text-white border border-slate-700 hover:border-cyan-400"
                  }`}
                >
                  {sec.number}
                </div>
              </button>
            );
          })}
          <div className="absolute top-24 right-8 z-20 pointer-events-none space-y-2 hidden sm:block text-right">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl backdrop-blur-md border text-xs font-mono transition-all duration-300 ${
                isCurrentlyScrolling
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900/80 border-slate-800 text-slate-400"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  isCurrentlyScrolling ? "bg-cyan-400 animate-ping" : "bg-slate-600"
                }`}
              />
              <span>{isCurrentlyScrolling ? "SCROLL MOTION: RUNNING" : "SCROLL MOTION: PAUSED"}</span>
            </div>

            {activeIndex === 5 && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/20 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-xl">
                <Gauge className="w-4 h-4" />
                <span>DIGITAL TWIN TELEMETRY LIVE</span>
              </div>
            )}
          </div>
        </div>


        <div className="relative z-10 -mt-[100vh] w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-48 pointer-events-none">
          <div className="max-w-xl mb-32 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#D4AF37] text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>The Samrat Global</span>
            </div>

            {/* <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-none mb-4">
              About 
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Us{" "}
              </span>
            </h1> */}
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white">
                            About <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${BRAND.gold}, ${BRAND.goldLight})` }}>Us</span>
                        </h2>

            <p className="text-slate-300 text-sm lg:text-base leading-relaxed backdrop-blur-md bg-slate-950/40 p-4 rounded-2xl border border-white/5">
              Building global partnerships through reliable sourcing, procurement and export solutions.
            </p>
          </div>

          <div className="space-y-[75vh]">
            {TECH_SECTIONS.map((sec, idx) => {
              const IconComponent = sec.icon;
              const isActive = activeIndex === idx;

              return (
                <div
                  key={sec.id}
                  ref={(el) => (sectionRefs.current[idx] = el)}
                  data-index={idx}
                  className="max-w-xl pointer-events-auto transition-all duration-700 transform"
                >
                  <div
                    className={`relative p-8 lg:p-10 rounded-3xl backdrop-blur-2xl border shadow-2xl transition-all duration-700 ${
                      isActive
                        ? "bg-slate-900/90 border-cyan-500/80 shadow-cyan-500/20 scale-105"
                        : "bg-slate-900/50 border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs font-mono shadow-lg shadow-cyan-500/30">
                      {sec.number} / 06
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      {IconComponent && <IconComponent className="w-6 h-6 text-cyan-400" />}
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                        {sec.badge}
                      </span>
                    </div>

                    <h2 className="text-3xl font-black text-white mb-1 tracking-tight">{sec.title}</h2>
                    <p className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider mb-6">{sec.subtitle}</p>

                    <div className="space-y-4 mb-8">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-sm text-slate-200 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 mb-6">
                      {Object.values(sec.telemetry).map((t, tIdx) => (
                        <div key={tIdx} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider truncate">
                            {t.label}
                          </div>
                          <div className="text-sm font-bold text-cyan-400 font-mono mt-0.5">{t.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono text-base">
                  {activeModal.number}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{activeModal.title}</h3>
                  <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{activeModal.badge}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed mb-8">
              {activeModal.paragraphs.map((p, i) => (
                <p key={i} className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                  {p}
                </p>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
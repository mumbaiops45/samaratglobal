"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Wind,
  Shield,
  Box,
  Zap,
  Cpu,
  Activity,
  ArrowRight,
  Gauge,
  Sparkles
} from "lucide-react";

// 6 Technology Sections Data
const TECH_SECTIONS = [
  {
    id: "awe-system",
    number: "01",
    title: "Airborne Wind Energy (AWE) System",
    subtitle: "HARVESTING HIGH-ALTITUDE OFFSHORE WINDS AT 300 METERS",
    badge: "Kite Propulsion Core",
    icon: Wind,
    paragraphs: [
      "The kite flies at an impressive altitude of 300 meters. It harvests strong and constant high-altitude winds that occur offshore on 95% of days around the world.",
      "The kite is sourced from external partners and integrated into the CargoKite vessel through joint collaboration."
    ],
    cameraPos: [0, 85, 115],
    cameraTarget: [0, 75, -10],
    hotspot3D: [0, 75, -15],
    telemetry: {
      stat1: { label: "Flight Altitude", value: "300 m" },
      stat2: { label: "Offshore Wind Availability", value: "95%" },
      stat3: { label: "Tether Force", value: "142 kN" }
    }
  },
  {
    id: "ship-hull",
    number: "02",
    title: "Ship hull",
    subtitle: "HIGH-STABILITY CATAMARAN HYDRODYNAMIC STRUCTURE",
    badge: "Naval Architecture",
    icon: Shield,
    paragraphs: [
      "Our vessel is designed with a modern catamaran hull form, carefully engineered to provide superior lateral stability. This design ensures smooth and secure sailing even under challenging cross-wind conditions.",
      "By minimizing roll and improving balance, the catamaran structure not only enhances safety but also contributes to more efficient kite-assisted propulsion, making every journey steadier, faster, and more energy-efficient."
    ],
    cameraPos: [-48, 6, 48],
    cameraTarget: [0, -1, 0],
    hotspot3D: [-14, -1, 5],
    telemetry: {
      stat1: { label: "Hull Configuration", value: "Twin Catamaran" },
      stat2: { label: "Roll Reduction", value: "-68%" },
      stat3: { label: "Hydrodrag", value: "Ultra Low" }
    }
  },
  {
    id: "containers",
    number: "03",
    title: "Containers & Automated Loading",
    subtitle: "321 TEU CAPACITY WITH INTEGRATED GANTRY CRANE LOADING",
    badge: "Cargo Logistics & Transport",
    icon: Box,
    paragraphs: [
      "With a nominal capacity of approximately 321 TEU, the ship offers ample room for cargo while remaining agile enough for feeder and shortsea routes.",
      "The container layout is fully customizable, allowing operators to adapt the vessel to specific trade needs—whether that's maximizing standard container loads, optimizing for regional feeder services, or handling specialized cargo types."
    ],
    cameraPos: [34, 26, 40],
    cameraTarget: [0, 4, 0],
    hotspot3D: [0, 6, 2],
    telemetry: {
      stat1: { label: "Max Capacity", value: "321 TEU" },
      stat2: { label: "Deck Area", value: "1,450 m²" },
      stat3: { label: "Loading Gantry", value: "Automated" }
    }
  },
  {
    id: "backup-propulsion",
    number: "04",
    title: "Back-up propulsion",
    subtitle: "BIO-DIESEL READY HYBRID DIESEL-ELECTRIC POWERPLANT",
    badge: "Power & Propulsion",
    icon: Zap,
    paragraphs: [
      "The vessel is equipped with a diesel-electric propulsion system, fully compatible with bio-diesel fuels.",
      "This hybrid approach guarantees operational reliability today while ensuring readiness for cleaner fuels and technologies tomorrow."
    ],
    cameraPos: [-22, -2, -48],
    cameraTarget: [0, -4, -22],
    hotspot3D: [0, -3, -22],
    telemetry: {
      stat1: { label: "Powerplant", value: "Diesel-Electric" },
      stat2: { label: "Fuel Flexibility", value: "Bio-Diesel" },
      stat3: { label: "Thruster Pods", value: "Dual Stern" }
    }
  },
  {
    id: "autonomy-software",
    number: "05",
    title: "Autonomy software",
    subtitle: "INTELLIGENT KITE CONTROL & UNCREWED REMOTE STEERING",
    badge: "Autonomous Command",
    icon: Cpu,
    paragraphs: [
      "At the core of the ship's smart operations lies a suite of autonomy software. This includes precision kite control algorithms, advanced remote steering systems, and intelligent energy management for both batteries and engines.",
      "Together, these systems make it possible to safely and efficiently operate the vessel without a permanent onboard crew."
    ],
    cameraPos: [18, 22, 22],
    cameraTarget: [0, 11, 4],
    hotspot3D: [0, 12, 6],
    telemetry: {
      stat1: { label: "Onboard Crew", value: "Uncrewed" },
      stat2: { label: "Nav Latency", value: "<10 ms" },
      stat3: { label: "Steering AI", value: "Full Auto" }
    }
  },
  {
    id: "digital-twin",
    number: "06",
    title: "Digital twin",
    subtitle: "CONTINUOUS REAL-TIME SHORE COMPUTING & PERFORMANCE MODEL",
    badge: "HPC Shore Cluster",
    icon: Activity,
    paragraphs: [
      "Every ship comes paired with a sophisticated digital twin—a dynamic virtual model that continuously predicts fuel consumption and optimizes sailing performance.",
      "Running on high-performance computers on shore, the system calculates in real time the ideal steering angles, optimal sail trim, and achievable speed under given wind and sea conditions."
    ],
    cameraPos: [65, 45, 65],
    cameraTarget: [0, 8, 0],
    hotspot3D: [0, 10, -5],
    telemetry: {
      stat1: { label: "Shore Compute", value: "HPC Grid" },
      stat2: { label: "Trim Optimizer", value: "Real-Time" },
      stat3: { label: "Fuel Savings", value: "Up to 28%" }
    }
  }
];

export default function page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [hotspots2D, setHotspots2D] = useState([]);
  const [isCurrentlyScrolling, setIsCurrentlyScrolling] = useState(false);

  const sectionRefs = useRef([]);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  // 3D Objects
  const shipGroupRef = useRef(null);
  const kiteMeshRef = useRef(null);
  const tetherLineRef = useRef(null);
  const oceanMeshRef = useRef(null);
  const digitalTwinWireRef = useRef(null);
  const craneContainerRef = useRef(null);

  // Camera interpolation targets
  const currentCamPos = useRef(new THREE.Vector3(0, 85, 115));
  const targetCamPos = useRef(new THREE.Vector3(0, 85, 115));
  const currentCamTarget = useRef(new THREE.Vector3(0, 75, -10));
  const targetCamTarget = useRef(new THREE.Vector3(0, 75, -10));

  // Scroll Motion Scrubbing State
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const motionTimeRef = useRef(0);

  // Scroll Event Listener
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

  // Intersection Observer for Left Cards Active Trigger
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

  // Jump to specific card
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

  // 3D Three.js Commercial Cargo Ship Engine
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x030712);
    scene.fog = new THREE.FogExp2(0x030712, 0.004);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(...TECH_SECTIONS[0].cameraPos);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Commercial Ship Lighting
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

    // 5. Procedural 3D Ocean Waves
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

    // Tactical Ocean Grid Lines
    const gridHelper = new THREE.GridHelper(380, 50, 0x0284c7, 0x0d2a4a);
    gridHelper.position.y = -5.9;
    scene.add(gridHelper);

    // 6. Build Commercial Container Transport Ship
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

    // Commercial Cargo Deck Platform
    const deckMesh = new THREE.Mesh(
      new THREE.BoxGeometry(28, 1.6, 48),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.4 })
    );
    deckMesh.position.set(0, 2.2, 0);
    deckMesh.castShadow = true;
    deckMesh.receiveShadow = true;
    shipGroup.add(deckMesh);

    // 321 TEU Commercial ISO Containers Stack
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

    // Automated Container Loading Gantry Crane
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

    // Navigation Bridge Command Center
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

    // Dual Commercial Pod Thrusters
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

    // Airborne Wind Energy (AWE) 300m Kite
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

    // Digital Twin Wireframe Matrix
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

    // Particles
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

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isScrollingRef.current) {
        motionTimeRef.current += 0.025;
      }

      const elapsed = motionTimeRef.current;

      // 1. Ocean Waves
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

      // 2. Ship Roll & Pitch
      if (shipGroupRef.current) {
        shipGroupRef.current.position.y = Math.sin(elapsed * 1.8) * 0.45;
        shipGroupRef.current.rotation.z = Math.sin(elapsed * 1.2) * 0.025;
        shipGroupRef.current.rotation.x = Math.cos(elapsed * 1.5) * 0.015;
      }

      // 3. Automated Crane Lifting Animation
      if (craneContainerRef.current) {
        craneContainerRef.current.position.y = 14 + Math.sin(elapsed * 2) * 2;
      }

      // 4. Kite Figure-8 Pattern
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

      // 5. Wind Particles
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

      // 6. Camera Lerp
      currentCamPos.current.lerp(targetCamPos.current, 0.045);
      currentCamTarget.current.lerp(targetCamTarget.current, 0.045);

      if (cameraRef.current) {
        cameraRef.current.position.copy(currentCamPos.current);
        cameraRef.current.lookAt(currentCamTarget.current);
      }

      // Project 3D Hotspots
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

  // Digital Twin state update
  useEffect(() => {
    if (digitalTwinWireRef.current) {
      digitalTwinWireRef.current.visible = activeIndex === 5;
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      <section className="relative w-full">
        
        {/* Sticky Background 3D Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-auto">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Dynamic 3D Hotspot Pins */}
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

          {/* Scroll Motion Status HUD */}
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Scroll Down to Trigger Commercial Cargo Animation</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-none mb-4">
              Powering the Future of{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Commercial Cargo Ships
              </span>
            </h1>

            <p className="text-slate-300 text-sm lg:text-base leading-relaxed backdrop-blur-md bg-slate-950/40 p-4 rounded-2xl border border-white/5">
              Join us on a journey into the future of maritime transportation, where sustainability, efficiency, and
              state-of-the-art technology converge to redefine the industry.
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

                    {/* Telemetry Grid */}
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

                    <button
                      onClick={() => setActiveModal(sec)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Read Technical Specification</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
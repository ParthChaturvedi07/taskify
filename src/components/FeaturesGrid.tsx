"use client";

import React, { useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

const IconUsers = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconClock = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconHeadset = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const leftCards = [
  {
    icon: <IconUsers />,
    title: "Easy to Use",
    desc: "Best-in-segment UX that makes every interaction feel effortless and intuitive.",
  },
  {
    icon: <IconShield />,
    title: "Secured",
    desc: "Industry-leading safety standards keep your data and transactions completely safe.",
  },
];
const rightCards = [
  {
    icon: <IconClock />,
    title: "Realtime Delivery",
    desc: "Near-instant payouts with a variety of withdrawal options at your fingertips.",
  },
  {
    icon: <IconHeadset />,
    title: "24-hour Support",
    desc: "Our dedicated team is here around the clock — every hour, every day.",
  },
];

function PhoneModel() {
  const { scene } = useGLTF("/3D/phone model increased brightness2 (1).glb");
  const ref = useRef<THREE.Group>(null);

  const baseRotationY = Math.PI * 0.0008;

  useFrame((state) => {
    if (!ref.current) return;
    const targetY = baseRotationY + state.pointer.x * 0.16;
    const targetX = -state.pointer.y * 0.16;

    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.1;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.1;
  });

  return (
    <group ref={ref} position={[0, -1.5, 0]} rotation={[0, baseRotationY, 0]}>
      <primitive object={scene} scale={15} />
    </group>
  );
}

function PhoneCard({ eventSource }: { eventSource?: React.RefObject<HTMLElement> }) {
  return (
    <div className="relative group w-full flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-full h-[450px]">
      <div className="absolute " />

      {/* inner glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/5 blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="absolute top-[-40px] bottom-[-40px] left-[-30%] right-[-30%] z-10 pointer-events-none">
        <Canvas
  camera={{ position: [0, 0, 5], fov: 45 }}
  className="w-full h-full"
  eventSource={eventSource as unknown as React.MutableRefObject<HTMLElement>}
  eventPrefix="client"
>
  {/* Very subtle global fill */}
  <ambientLight intensity={0.15} />

  {/* Main soft light */}
  <directionalLight
    position={[-3, 6, 5]}
    intensity={1.5}
  />

  {/* White front/side light */}
  <spotLight
    position={[-5, 4, 5]}
    angle={0.6}
    penumbra={1}
    intensity={1.5}
    color="#ffffff"
  />

  {/* Purple cinematic rim */}
  <spotLight
    position={[5, 2, -3]}
    angle={0.7}
    penumbra={1}
    intensity={2}
    color="#c77dff"
  />

  <Suspense fallback={null}>
    <PhoneModel />

    <Environment
      files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/ferndale_studio_07_4k.hdr"
      background={false}
    />
  </Suspense>
</Canvas>

        <div className="absolute bottom-[56px] left-1/2 -translate-x-1/2 w-[160px] h-[14px] mx-auto mt-[-4px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.05)_40%,transparent_75%)] blur-[6px] pointer-events-none" />
      </div>
    </div>
  );
}

export function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [particles] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: (i * 37 + 13) % 100,
      top: (i * 53 + 7) % 100,
      size: (i % 3) + 1,
      duration: (i % 4) + 4,
      delay: (i % 6) * 0.9,
    }))
  );

  return (
    <>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fgFloat {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-80px); opacity: 0; }
        }
        @keyframes fgBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .transform-style-3d { transform-style: preserve-3d; }
      `}} />

      <section ref={sectionRef} className="relative w-full px-4 md:px-6 lg:px-8 py-[80px] flex flex-col items-center">

        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white/30 pointer-events-none z-0 [animation:fgFloat_linear_infinite]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center mb-[50px] md:mb-[80px] w-full max-w-[1100px]"
        >
          <h2 className="font-pixel text-[clamp(30px,6vw,54px)] font-bold tracking-[0.02em] uppercase text-white m-0 leading-none [text-shadow:0_0_60px_rgba(255,255,255,0.12)]">
            Why Choose Us
          </h2>
          <p className="font-chakra text-[clamp(14px,1.2vw,16px)] font-normal text-[#6b6b6b] leading-[1.6] mt-4 max-w-[400px]">
            Everything you need, built specifically for players.
          </p>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1250px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">

          <div className="flex flex-col gap-6 md:gap-8 col-span-1">
            {leftCards.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                className="group relative flex flex-col p-8 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] h-full"
              >
                <div className="w-[52px] h-[52px] rounded-[14px] bg-white/10 border border-white/20 flex items-center justify-center text-white mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  {c.icon}
                </div>
                <h3 className="font-chakra text-[18px] md:text-[20px] font-bold text-white tracking-[0.02em] mb-2">{c.title}</h3>
                <p className="font-chakra text-[14px] md:text-[15px] text-[#888888] leading-[1.6] m-0">{c.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="order-first md:col-span-2 lg:col-span-1 lg:order-none w-full relative z-20"
          >
            <PhoneCard eventSource={sectionRef} />
          </motion.div>

          <div className="flex flex-col gap-6 md:gap-8 col-span-1">
            {rightCards.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                className="group relative flex flex-col p-8 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] h-full"
              >
                <div className="w-[52px] h-[52px] rounded-[14px] bg-white/10 border border-white/20 flex items-center justify-center text-white mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  {c.icon}
                </div>
                <h3 className="font-chakra text-[18px] md:text-[20px] font-bold text-white tracking-[0.02em] mb-2">{c.title}</h3>
                <p className="font-chakra text-[14px] md:text-[15px] text-[#888888] leading-[1.6] m-0">{c.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
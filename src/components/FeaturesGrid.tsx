"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   SVG icons — clean, white/gray glowing aesthetic
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Center phone card
───────────────────────────────────────────── */
function PhoneCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      target.current = { x: -ny * 15, y: nx * 15 };
    };
    const onLeave = () => { target.current = { x: 0, y: 0 }; };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.08);
      current.current.y = lerp(current.current.y, target.current.y, 0.08);
      if (phoneRef.current) {
        const { x, y } = current.current;
        phoneRef.current.style.transform =
          `perspective(900px) rotateX(${x}deg) rotateY(${y}deg) scale3d(1.03,1.03,1.03)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={cardRef} className="relative cursor-crosshair group w-full rounded-[24px] border border-white/5 bg-transparent p-4 sm:p-8 lg:p-4 flex items-center justify-center min-h-[350px] sm:min-h-[450px] lg:min-h-full h-full">
      <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.02] to-white/[0.08] backdrop-blur-[10px]" />
      
      {/* inner glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/5 blur-[80px] rounded-full pointer-events-none z-0" />

      <div ref={phoneRef} className="relative z-10 will-change-transform transform-style-3d drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] [animation:fgBob_5s_ease-in-out_infinite]">
        <Image
          src="/iphone-3d.png"
          alt="Taskify gaming app on iPhone"
          width={320}
          height={480}
          className="block w-full max-w-[220px] sm:max-w-[280px] md:max-w-[310px] h-auto select-none pointer-events-none"
          priority
          draggable={false}
        />
        {/* coloured floor shadow/reflection under phone */}
        <div className="w-[160px] h-[14px] mx-auto mt-[-4px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.05)_40%,transparent_75%)] blur-[6px]" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main FeaturesGrid
───────────────────────────────────────────── */
export function FeaturesGrid() {
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
      {/* Keeping just the custom keyframes for float/bob */}
      <style dangerouslySetInnerHTML={{ __html: `
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

      <section className="relative w-full px-4 md:px-6 lg:px-8 py-[80px] overflow-hidden flex flex-col items-center">
        
        {/* Ambient Glows */}
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-white/5 blur-[150px] rounded-full pointer-events-none z-0" /> */}

        {/* Ambient Particles */}
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

        {/* Section Header */}
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

        {/* Grid Container */}
        <div className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          
          {/* LEFT COLUMN */}
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

          {/* CENTRE COLUMN (Phone) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="order-first md:col-span-2 lg:col-span-1 lg:order-none w-full"
          >
             <PhoneCard />
          </motion.div>

          {/* RIGHT COLUMN */}
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
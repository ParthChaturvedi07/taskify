"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   App data
───────────────────────────────────────────── */
import Link from "next/link";
import appsData from "@/data/apps.json";

const apps = appsData;

/* ─────────────────────────────────────────────
   Single App Card
───────────────────────────────────────────── */
function AppCard({ app, index }: { app: (typeof apps)[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="group flex flex-col items-center w-full max-w-[280px]"
    >
      <Link href={`/apps/${app.slug}`} className="relative w-full transition-transform duration-[350ms] ease-out group-hover:-translate-y-2 flex flex-col items-center">
        {/* Gradient card with overflow:hidden — clips phone at the card bottom */}
        <div 
          className="relative w-full aspect-[9/13] rounded-[22px] sm:rounded-[28px] overflow-hidden z-[1] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_4px_16px_rgba(0,0,0,0.25)]" 
          style={{ background: app.cardBg }}
        >
          <div className="absolute top-[10px] sm:top-[14px] left-[12px] sm:left-[16px] right-[12px] sm:right-[16px]">
            <Image
              src={app.screen}
              alt={`${app.name} app screenshot`}
              width={260}
              height={520}
              className="block mt-[60px] rounded-[18px] sm:rounded-none"
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 280px"
            />
          </div>
        </div>

        {/* Logo badge — in flex flow, below the card */}
        <Image
          src={app.logo}
          alt={`${app.name} logo`}
          width={120}
          height={120}
          className="relative bottom-[50px] z-[2] w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-[350ms] ease-out group-hover:scale-[1.07] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.7)] object-cover block"
          sizes="(max-width: 520px) 90px, (max-width: 900px) 100px, 120px"
        />

        {/* App name */}
        <p className="font-chakra text-[clamp(22px,1.4vw,32px)] font-semibold text-[#e2e8f0] tracking-[0.05em] text-center m-0 -mt-[30px]">{app.name}</p>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export function Apps() {
  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-[60px] lg:py-[80px] pb-[80px] lg:pb-[100px] flex flex-col items-center gap-[48px] lg:gap-[64px]">
      
      {/* ── Portfolio Header ── */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 }
          }
        }}
        className="w-full max-w-[1100px] flex flex-col gap-[20px] lg:gap-[36px]"
      >
        
        {/* Hero Row: Title + Subtitle */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start justify-between gap-[20px] lg:gap-[40px]">
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="font-pixel text-[clamp(30px,6vw,62px)] font-bold tracking-[0.02em] uppercase text-white m-0 leading-none max-w-[580px] [text-shadow:0_0_60px_rgba(255,255,255,0.12)] text-center lg:text-left"
          >
            Apps That Reward Every Moment
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="font-chakra text-[clamp(13px,1.1vw,15.5px)] font-normal text-[#6b6b6b] leading-[1.65] text-center lg:text-right m-0 max-w-full lg:max-w-[260px] shrink-0 lg:pt-2 self-center lg:self-end"
          >
            Four live apps. Hundreds of thousands of players.<br />
            One mission: make free time count.
          </motion.p>
        </div>

        {/* Glassmorphism Stats Bar */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
          className="w-full flex flex-wrap lg:flex-nowrap items-center justify-between p-[16px] px-[20px] lg:py-[20px] lg:px-[28px] rounded-[16px] bg-white/5 backdrop-blur-[20px] border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(255,255,255,0.02)] gap-[14px] lg:gap-[12px]"
        >
          
          <div className="flex flex-wrap lg:flex-nowrap items-center flex-1 gap-y-[12px]">
            <div className="flex flex-col gap-[5px] pr-[14px] mr-[14px] md:pr-[20px] md:mr-[20px] lg:pr-[28px] lg:mr-[28px] border-r border-white/10">
              <span className="font-chakra text-[9px] font-semibold tracking-[0.22em] uppercase text-white/30 m-0">Live Apps</span>
              <span className="font-chakra text-[clamp(14px,1.3vw,18px)] font-bold text-white tracking-[0.04em] m-0">04</span>
            </div>
            <div className="flex flex-col gap-[5px] pr-[14px] mr-[14px] md:pr-[20px] md:mr-[20px] lg:pr-[28px] lg:mr-[28px] border-r border-white/10">
              <span className="font-chakra text-[9px] font-semibold tracking-[0.22em] uppercase text-white/30 m-0">Platform</span>
              <span className="font-chakra text-[clamp(14px,1.3vw,18px)] font-bold text-white tracking-[0.04em] m-0">Android</span>
            </div>
            <div className="flex flex-col gap-[5px] pr-[14px] mr-[14px] md:pr-[20px] md:mr-[20px] lg:pr-[28px] lg:mr-[28px] border-r border-white/10">
              <span className="font-chakra text-[9px] font-semibold tracking-[0.22em] uppercase text-white/30 m-0">Total Installs</span>
              <span className="font-chakra text-[clamp(14px,1.3vw,18px)] font-bold text-[#a3a3a3] tracking-[0.04em] m-0">801K+</span>
            </div>
            <div className="flex flex-col gap-[5px]">
              <span className="font-chakra text-[9px] font-semibold tracking-[0.22em] uppercase text-white/30 m-0">Avg Rating</span>
              <span className="font-chakra text-[clamp(14px,1.3vw,18px)] font-bold text-[#a3a3a3] tracking-[0.04em] m-0">4.8 ★</span>
            </div>
          </div>
          
          <div className="flex items-center gap-[8px] font-chakra text-[9px] font-bold tracking-[0.2em] uppercase text-white/55 whitespace-nowrap py-[8px] px-[16px] rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/10 w-full lg:w-auto justify-center lg:justify-start">
            <span className="w-[6px] h-[6px] rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80,0_0_12px_rgba(74,222,128,0.4)] animate-[apps-pulse_2.2s_ease-in-out_infinite] shrink-0" />
            All Systems Live
          </div>
          
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[40px] md:gap-y-[48px] md:gap-x-[24px] lg:gap-x-[32px] w-full max-w-[260px] md:max-w-[600px] lg:max-w-[960px] justify-items-center">
        {apps.map((app, index) => (
          <AppCard key={app.id} app={app} index={index} />
        ))}
      </div>
      
      <style>{`
        @keyframes apps-pulse {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 6px #4ade80, 0 0 12px rgba(74,222,128,0.4); }
          50% { opacity: 0.55; transform: scale(0.8); box-shadow: 0 0 3px #4ade80, 0 0 6px rgba(74,222,128,0.2); }
        }
      `}</style>
    </section>
  );
}

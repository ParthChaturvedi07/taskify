"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Install an App",
    desc: "Choose a TaskifyGames reward app from Google Play and create your account.",
  },
  {
    num: "02",
    title: "Pick Earning Modes",
    desc: "Explore games, Hot Offers, surveys, videos, referrals, and daily earning options.",
  },
  {
    num: "03",
    title: "Collect Coins",
    desc: "Eligible rewards move into your wallet after the task or partner milestone is confirmed.",
  },
  {
    num: "04",
    title: "Request Payout",
    desc: "Use supported withdrawal options when you reach the app’s payout requirement.",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  
  // Transform scroll progress to scaleY for the active line
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-[60px] lg:py-[80px] pb-[80px] lg:pb-[100px] flex flex-col items-center gap-[48px] lg:gap-[64px]">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } }
        }}
        className="w-full max-w-[1100px] flex flex-col gap-[20px] lg:gap-[36px]"
      >
        <div className="flex flex-col items-center lg:flex-row lg:items-start justify-between gap-[20px] lg:gap-[40px]">
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="font-pixel text-[clamp(30px,6vw,62px)] font-bold tracking-[0.02em] uppercase text-white m-0 leading-none max-w-[580px] [text-shadow:0_0_60px_rgba(255,255,255,0.12)] text-center lg:text-left"
          >
            How Rewards Work
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="font-chakra text-[clamp(13px,1.1vw,15.5px)] font-normal text-[#6b6b6b] leading-[1.65] text-center lg:text-right m-0 max-w-full lg:max-w-[260px] shrink-0 lg:pt-2 self-center lg:self-end"
          >
            Install. Complete. Track. Withdraw.
          </motion.p>
        </div>
      </motion.div>

      <div className="relative w-full max-w-[1100px] flex flex-col gap-[40px] lg:gap-[60px] mt-[20px] py-[20px]" ref={containerRef}>
        {/* Background line */}
        <div className="absolute top-0 bottom-0 left-[14px] md:left-[20px] lg:left-1/2 w-[2px] bg-white/5 -translate-x-1/2 rounded-sm" />
        
        {/* Animated Progress line */}
        <motion.div 
          className="absolute top-0 bottom-0 left-[14px] md:left-[20px] lg:left-1/2 w-[2px] bg-white -translate-x-1/2 rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" 
          style={{ scaleY, transformOrigin: "top" }} 
        />
        
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 40, x: isLeft ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className={`relative w-full lg:w-1/2 flex items-center pl-[48px] md:pl-[60px] lg:pl-0 lg:justify-${isLeft ? 'end' : 'start'} ${isLeft ? 'lg:pr-[60px] left-0' : 'lg:pl-[60px] left-0 lg:left-1/2'}`}
            >
              {/* Dot */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-[#070707] border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20 left-[8px] md:left-[14px] ${isLeft ? 'lg:left-auto lg:-right-[6px]' : 'lg:-left-[6px]'}`} />
              
              {/* Card */}
              <div className="w-full max-w-[440px] flex flex-col p-8 md:p-9 rounded-2xl bg-white/5 backdrop-blur-[20px] border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(255,255,255,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/10 text-left">
                <div className="font-chakra text-[32px] font-black text-white/15 mb-[24px] leading-none">
                  {step.num}
                </div>
                <h3 className="font-chakra text-[20px] font-bold text-white tracking-[0.04em] mb-[12px] uppercase">
                  {step.title}
                </h3>
                <p className="text-[15px] text-[#888888] leading-[1.6] m-0">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

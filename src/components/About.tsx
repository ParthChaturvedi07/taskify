"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, animate, useInView } from "framer-motion";
import Image from "next/image";

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1,
        delay: 0.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return <span ref={ref}>0</span>;
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yImage1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], [-50, 150]);
  const yImage3 = useTransform(scrollYProgress, [0, 1], [250, -150]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[120vh] px-4 md:px-6 lg:px-8 py-[100px] flex flex-col items-center justify-center overflow-hidden"
    >


      {/* Floating 3D Logo (Center-Right Anchor) */}
      <motion.div 
        style={{ y: yImage1 }}
        className="absolute top-[10%] right-[5%] md:right-[15%] w-[150px] md:w-[250px] opacity-60 z-0 drop-shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
      >
        <Image src="/images/logo_3d.png" alt="3D Logo" width={300} height={300} className="w-full h-auto" />
      </motion.div>

      {/* Floating Phone (Left) */}
      <motion.div 
        style={{ y: yImage2 }}
        className="absolute bottom-[10%] left-[-2%] md:left-[5%] w-[180px] md:w-[300px] z-10 opacity-50 drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] blur-[1px]"
      >
        <Image src="/images/cb_3d.png" alt="Cash Bunny App" width={300} height={600} className="w-full h-auto rotate-[-12deg]" />
      </motion.div>

      {/* Floating Phone (Right Edge) */}
      <motion.div 
        style={{ y: yImage3 }}
        className="absolute top-[40%] right-[-5%] md:right-[-5%] w-[160px] md:w-[300px] z-0 opacity-50 md:opacity-40 drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] blur-[2px]"
      >
        <Image src="/images/wc_3d.png" alt="Wow Cash App" width={300} height={600} className="w-full h-auto rotate-[15deg]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col justify-center">
        
        {/* Startup India Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 self-start lg:self-center"
        >
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
          <span className="font-chakra text-[11px] md:text-[13px] uppercase tracking-widest text-white/80 font-bold">Startup India Certified Studio</span>
        </motion.div>

        {/* Massive Headline */}
        <motion.div 
          style={{ y: yText }}
          className="w-full flex flex-col lg:items-center text-left lg:text-center z-20 mb-[120px]"
        >
          <h2 className="font-pixel text-[clamp(46px,9vw,140px)] font-bold text-white uppercase leading-[0.9] tracking-[-0.03em] [text-shadow:0_0_80px_rgba(255,255,255,0.15)]">
            Redefining<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/20">Rewards.</span>
          </h2>
        </motion.div>

        {/* Story / Mission Text (Staggered) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full z-20">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-6 lg:col-span-5 lg:col-start-2 flex flex-col"
          >
            <h3 className="font-chakra text-[clamp(20px,2.5vw,28px)] font-bold text-white leading-[1.3] mb-5 drop-shadow-lg">
              Your time is valuable. We turn everyday moments into tangible rewards.
            </h3>
            <p className="font-chakra text-[15px] md:text-[16px] text-gray-300 leading-[1.7] max-w-[420px] drop-shadow-md relative z-10">
              What started as a simple idea in Azamgarh has grown into a platform trusted by hundreds of thousands worldwide. No hidden rules. Just seamless, milestone-based earning that respects your schedule.
            </p>
          </motion.div>

          {/* Stats Anchor */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="md:col-span-6 lg:col-span-4 lg:col-start-9 flex flex-col justify-end items-start lg:items-end text-left lg:text-right mt-10 md:mt-0"
          >
            <span className="font-pixel text-[clamp(60px,7vw,110px)] font-bold text-white leading-[0.8] tracking-tight [text-shadow:0_0_60px_rgba(255,255,255,0.2)]">
              <AnimatedNumber value={801} />K+
            </span>
            <span className="font-chakra text-[13px] md:text-[15px] uppercase tracking-[0.2em] text-white/50 font-bold mb-8 mt-4">
              Global Downloads
            </span>
            
            <div className="flex items-center gap-5 border border-white/10 bg-white/5 backdrop-blur-[20px] rounded-[24px] pl-3 pr-8 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex -space-x-4">
                {[1,2,3,4].map((i) => (
                  <Image key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} alt="User" width={48} height={48} className="w-12 h-12 rounded-full border-2 border-[#0c0c0c] object-cover" />
                ))}
              </div>
              <div className="flex flex-col items-start">
                <span className="font-chakra text-[16px] text-white font-bold leading-none mb-1">4.8 Stars</span>
                <span className="font-chakra text-[12px] text-[#888888] font-medium tracking-wide">Community Rated</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
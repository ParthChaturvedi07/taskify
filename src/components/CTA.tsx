"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full px-4 md:px-6 lg:px-8 py-[80px] lg:py-[120px] flex justify-center overflow-hidden bg-transparent"
    >
      
      {/* Main Banner Card */}
      <div className="relative w-full max-w-[1100px] bg-gradient-to-br from-[#38168a] via-[#591ba8] to-[#2a0e6e] rounded-[40px] flex flex-col items-center justify-center py-[80px] px-6 shadow-[0_30px_80px_rgba(89,27,168,0.3),inset_0_2px_0_rgba(255,255,255,0.15)] overflow-hidden">
        
        {/* Subtle Background Glows Inside Card */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-white/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-white/10 blur-[120px] rounded-full pointer-events-none" />

        {/* --- Floating Decorative Elements (Parallax) --- */}
        {/* Left Side: Gift Cards */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute left-[-20px] md:left-[20px] top-[10%] md:top-[20%] w-[120px] md:w-[180px] pointer-events-none opacity-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-0 hidden sm:block"
        >
          <div className="w-[100px] md:w-[140px] transform -rotate-12 absolute top-0 left-0">
             <img src="/images/card1.png" alt="Gift Card" className="w-full h-auto object-contain" />
          </div>
          <div className="w-[100px] md:w-[140px] transform rotate-6 absolute top-[40px] left-[30px]">
             <img src="/images/card2.png" alt="Gift Card" className="w-full h-auto object-contain" />
          </div>
        </motion.div>

        {/* Right Side: Game Icons Placeholder */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute right-[-20px] md:right-[40px] top-[10%] w-[150px] md:w-[220px] pointer-events-none opacity-90 z-0 hidden sm:block"
        >
          <div className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] bg-white/10 backdrop-blur-md rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform rotate-6 absolute top-0 right-[20px] border border-white/20 flex items-center justify-center overflow-hidden">
             <img src="/images/hc_logo.png" alt="App Logo" className="w-[80%] h-[80%] object-contain drop-shadow-md" />
          </div>
          <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-white/10 backdrop-blur-md rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform -rotate-12 absolute top-[60px] right-[70px] border border-white/20 flex items-center justify-center overflow-hidden">
             <img src="/images/cb_logo.png" alt="App Logo" className="w-[80%] h-[80%] object-contain drop-shadow-md" />
          </div>
          <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-white/10 backdrop-blur-md rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] transform rotate-12 absolute top-[130px] right-0 border border-white/20 flex items-center justify-center overflow-hidden">
             <img src="/images/sc_logo.png" alt="App Logo" className="w-[80%] h-[80%] object-contain drop-shadow-md" />
          </div>
        </motion.div>

        {/* Content Wrapper */}
        <motion.div 
          style={{ y: y3 }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <span className="font-chakra text-[12px] md:text-[14px] uppercase tracking-[0.3em] text-white/60 font-bold mb-4 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            Ready to play?
          </span>
          <h2 className="font-pixel text-[clamp(40px,7vw,90px)] font-bold tracking-[-0.02em] uppercase text-white m-0 leading-[0.9] mb-8 [text-shadow:0_0_60px_rgba(255,255,255,0.2)]">
            Start<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50">Winning.</span>
          </h2>
          
          {/* Store Buttons */} 
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            {/* Google Play Button */}
            <button className="flex items-center justify-center gap-4 bg-white text-black hover:bg-white/90 px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.3)] group cursor-pointer">
              <img src="/images/playstore.png" alt="Google Play" className="w-7 h-7 object-contain filter invert" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase font-bold text-black/60 leading-none tracking-wider">Get it on</span>
                <span className="text-[16px] font-bold text-black leading-none mt-1 font-chakra">Google Play</span>
              </div>
            </button>
            
            {/* App Store Button (Stylized for future support) */}
            <button className="flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 text-white px-8 py-3.5 rounded-full transition-all duration-300 group cursor-not-allowed opacity-80">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.3653 14.1685C16.3312 11.238 18.7397 9.80786 18.847 9.74235C17.3879 7.60803 15.1118 7.2995 14.3644 7.2023C12.4419 7.00902 10.6015 8.33703 9.61748 8.33703C8.63342 8.33703 7.13524 7.23469 5.51347 7.2662C3.42767 7.29749 1.50367 8.48395 0.443315 10.3343C-1.71369 14.0763 0.999653 19.6105 3.10214 22.656C4.12932 24.145 5.3308 25.8205 6.9069 25.7533C8.42397 25.6881 9.00693 24.7702 10.8258 24.7702C12.6453 24.7702 13.1678 25.7533 14.7439 25.7208C16.3797 25.6881 17.4042 24.2125 18.4255 22.7212C19.6053 20.9859 20.0886 19.3087 20.1202 19.2222C20.0886 19.208 16.3986 17.7981 16.3653 14.1685ZM13.4309 4.90806C14.2693 3.89209 14.8329 2.47953 14.6791 1.05C13.4475 1.09941 11.9688 1.8703 11.1009 2.88562C10.3216 3.78508 9.64257 5.23437 9.82736 6.63462C11.1963 6.74088 12.5936 5.92348 13.4309 4.90806Z" />
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase font-bold text-white/60 leading-none tracking-wider">Coming soon</span>
                <span className="text-[16px] font-bold text-white leading-none mt-1 font-chakra">App Store</span>
              </div>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

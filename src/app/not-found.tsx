"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GridBackground } from "@/components/ui/GridBackground";
import { DotGrid } from "@/components/ui/DotGrid";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { TriangleAlert, Home } from "lucide-react";

const Spark = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <div className={`absolute rounded-full bg-white ${className}`} style={{
    width: '3px',
    height: '30px',
    boxShadow: '0 0 15px 4px rgba(200, 230, 255, 0.9), 0 0 6px 2px rgba(255, 255, 255, 1)',
    ...style
  }} />
);

export default function NotFound() {
  const leftPlugRef = useRef<HTMLDivElement>(null);
  const rightPlugRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state: plugs pushed together at center (overlapping), text/sparks hidden
    gsap.set(sparksRef.current, { opacity: 0, scale: 0 });
    gsap.set(textRef.current, { opacity: 0, scale: 0.5, filter: "blur(20px)" });

    // 1. Plugs start overlapping (attached) and separate to their natural positions
    // fromTo = explicit start + end, never confused by SSR/hydration state
    tl.fromTo(leftPlugRef.current,
      { xPercent: -10 },   // START: left plug pushed right (into center) by 75% of its width
      { xPercent: -35, duration: 2, ease: "power2.inOut", delay: 0.6 }
    )
      .fromTo(rightPlugRef.current,
        { xPercent: 10 },  // START: right plug pushed left (into center) by 75% of its width
        { xPercent: 45, duration: 2, ease: "power2.inOut" },
        "<"
      )
      // 2. 404 appears in the gap
      .to(textRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "back.out(1.5)"
      }, "<0.8")
      // 3. Sparks appear
      .to(sparksRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)"
      }, "<0.1");

    // // 4. Continuous idle breathing animation after separation
    // tl.to(leftPlugRef.current, {
    //   x: "-8px",
    //   duration: 2,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: "sine.inOut"
    // }, "+=0");

    // tl.to(rightPlugRef.current, {
    //   x: "8px",
    //   duration: 2.2,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: "sine.inOut"
    // }, "<");

    // Realistic electrical sparks shooting outward
    tl.add(() => {
      if (sparksRef.current) {
        const sparks = sparksRef.current.children;
        gsap.utils.toArray(sparks).forEach((spark: Element) => {
          const shootSpark = () => {
            // Randomize angle and distance for a burst effect
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            // Randomize streak rotation to match the trajectory
            const rot = (angle * 180) / Math.PI + 90;

            gsap.fromTo(spark,
              {
                x: 0,
                y: 0,
                rotation: rot,
                scaleY: "random(0.5, 1)",
                opacity: 1
              },
              {
                x: tx,
                y: ty,
                scaleY: 0.1,
                opacity: 0,
                duration: "random(0.15, 0.4)",
                ease: "power3.out",
                onComplete: () => {
                  gsap.delayedCall(Math.random() * 1.2, shootSpark);
                }
              }
            );
          };

          // Initial staggered bursts
          gsap.delayedCall(Math.random() * 1.5, shootSpark);
        });
      }
    }, "-=1.5");

    return () => {
      tl.kill();
    }
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden min-h-[100dvh] flex flex-col bg-black">
      <GridBackground />
      <DotGrid />
      <Navbar />

      {/* ── White radial glow ──
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1100px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      /> */}

      {/* ── Top-right white glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-15%",
          right: "-10%",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 35%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />


      <div className="z-10 flex w-full flex-1 flex-col items-center justify-center px-4 pt-32 pb-16">

        {/* Plugs and 404 Section */}
        <div className="relative w-full max-w-6xl h-64 sm:h-80 flex items-center justify-center">

          {/* 404 Text - Center */}
          <div ref={textRef} className="absolute z-20 flex flex-col items-center pointer-events-none">
            <h1
              className="text-white font-bold font-pixel text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-none tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}
            >
              404
            </h1>
            <h2 className="text-white text-2xl sm:text-3xl font-sans font-medium mt-2 tracking-wide">Error</h2>
          </div>

          {/* Sparks - Behind Text */}
          <div ref={sparksRef} className="absolute z-10 left-1/2 top-1/2 w-0 h-0 pointer-events-none flex items-center justify-center">
            {/* Generate several sparks that will be animated by GSAP from the center */}
            <Spark />
            <Spark />
            <Spark />
            <Spark />
            <Spark />
            <Spark />
            <Spark />
            <Spark />
          </div>

          {/* Plugs Container - Centered Anchor */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-0 h-full flex items-center justify-center">
              {/* Left Plug (Male) */}
              <div ref={leftPlugRef} className="absolute right-0 h-36 sm:h-46 md:h-56 lg:h-66 flex items-center justify-end z-30">
                <img src="/images/plugs/plug-left.png" alt="Left Plug" className="h-full w-auto max-w-none drop-shadow-2xl object-right object-contain" />
              </div>
              {/* Right Plug (Female) */}
              <div ref={rightPlugRef} className="absolute left-0 h-36 sm:h-46 md:h-56 lg:h-56 flex items-center justify-start z-30">
                <img src="/images/plugs/plug-right.png" alt="Right Plug" className="h-full w-auto max-w-none drop-shadow-2xl object-left object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Warning Section */}
        <div className="mt-4 flex flex-col items-center gap-6 relative z-40">
          <div className="flex flex-col items-center gap-2">
            <TriangleAlert className="text-[#ffdf00] w-7 h-7 drop-shadow-md" fill="#ffdf00" color="#000" strokeWidth={2} />
            <p className="text-white text-base tracking-wide font-sans">Page not found :-(</p>
          </div>

          <Link href="/" aria-label="Go back home">
            <button className="group relative flex items-center gap-3 bg-[#555] hover:bg-[#666] text-white px-2 py-2 pr-6 rounded-[14px] border-[2px] border-[#777] transition-all duration-300 font-pixel tracking-widest text-sm uppercase shadow-lg active:scale-95">
              <div className="bg-[#333] p-1.5 rounded-lg border border-[#555] group-hover:bg-[#444] transition-colors">
                <Home className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <span className="pt-0.5">BACK TO HOME</span>
            </button>
          </Link>
        </div>

        {/* Terminal UI */}
        <div className="mt-12 mb-8 bg-[#090f18] border border-[#162130] rounded-2xl w-full max-w-[500px] overflow-hidden text-left font-mono text-sm shadow-[0_0_40px_rgba(0,10,25,0.6)] relative z-40 mx-4">
          <div className="flex items-center px-4 py-2.5 bg-[#0d1520] border-b border-[#162130]">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="mx-auto text-xs text-[#596d82] font-sans tracking-wider">system.log</div>
            <div className="w-12"></div>
          </div>
          <div className="p-5 space-y-3.5 text-[#8a9db0] bg-[#090f18] text-xs sm:text-sm">
            <div className="flex gap-3">
              <span className="text-[#00ffd1] font-bold">$</span>
              <span>GET <span className="text-[#d1d5db]">/requested-page</span></span>
            </div>
            <div className="flex gap-3 items-center ml-2">
              <span className="bg-[#4d1619] text-[#ff5f56] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#6b1e22]">404</span>
              <span className="text-[#ff5f56]">Route not found - no match in registry</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#00ffd1] font-bold">$</span>
              <span>SUGGEST <span className="text-[#596d82] px-1">-&gt;</span> <Link href="/" className="text-white hover:underline">/home</Link></span>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}

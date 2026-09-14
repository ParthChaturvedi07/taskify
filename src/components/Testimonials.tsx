"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

const testimonials = [
  {
    quote: `"I've earned ₹450 this week alone just by playing games on my commute."`,
    name: "Rajesh K.",
    handle: "@rajesh_plays",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    quote: `"No confusing menus or hidden rules. The cash hits my wallet exactly when promised."`,
    name: "Priya S.",
    handle: "@priya_tasks",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    quote: `"The best reward platform I've used. Super Missions are incredibly lucrative."`,
    name: "Amit M.",
    handle: "@amit_gamer",
    avatar: "https://i.pravatar.cc/150?img=15",
  }
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // 300% scroll distance for 3 items
          pin: true,
          scrub: 1,
        }
      });

      // We have 3 items. 
      // 0 is visible initially. Fade 0 out, Fade 1 in. Fade 1 out, Fade 2 in.
      testimonials.forEach((_, i) => {
        if (i === 0) {
          // First item starts visible, fades out
          tl.to(textRefs.current[i], {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: "power2.inOut"
          }, i * 2);
        } else {
          // Subsequent items start hidden (opacity 0, y: 50 via css), fade in, then out if not the last
          tl.fromTo(textRefs.current[i], 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" },
            i * 2 - 0.5 // overlap slightly with previous fade out
          );
          
          if (i < testimonials.length - 1) {
            tl.to(textRefs.current[i], {
              opacity: 0,
              y: -50,
              duration: 1,
              ease: "power2.inOut"
            }, i * 2 + 1.5);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-transparent flex items-center justify-center overflow-hidden">
      
      {/* Subtle Background Elements */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-white/5 blur-[120px] pointer-events-none" />
       */}
      <div className="absolute top-10 left-10 md:left-20">
        <span className="font-pixel text-[12px] uppercase tracking-widest text-white/30">/ Community Voices</span>
      </div>

      {/* Container for absolute positioned quotes */}
      <div ref={containerRef} className="relative w-full max-w-[1200px] h-[60vh] flex items-center justify-center px-4 md:px-12">
        {testimonials.map((t, i) => (
          <div 
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            className={`absolute w-full flex flex-col items-center text-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
          >
            <h3 className="font-chakra text-[clamp(28px,5vw,70px)] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-12 [text-shadow:0_0_40px_rgba(255,255,255,0.2)]">
              {t.quote}
            </h3>
            
            <div className="flex items-center gap-4">
              <Image src={t.avatar} alt={t.name} width={64} height={64} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/20" />
              <div className="flex flex-col items-start">
                <span className="font-chakra text-[16px] md:text-[20px] font-bold text-white leading-none mb-1">{t.name}</span>
                <span className="font-chakra text-[13px] md:text-[15px] text-[#888888]">{t.handle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

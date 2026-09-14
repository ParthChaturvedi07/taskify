"use client";

import * as React from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const preloader = preloaderRef.current;
    
    // Check if already shown this session
    if (sessionStorage.getItem('taskify_preloader_shown')) {
      if (preloader) {
        gsap.set(preloader, { display: "none" });
      }
      onComplete?.();
      return;
    }
    
    sessionStorage.setItem('taskify_preloader_shown', 'true');

    const ctx = gsap.context(() => {
      const counterEl = counterRef.current;

      if (!preloader || !counterEl) {
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      gsap.set(preloader, { autoAlpha: 1 });
      
      const counter = { val: 0 };

      // Count from 0 to 100
      tl.to(counter, {
        val: 100,
        duration: 2.2,
        ease: "power3.inOut",
        onUpdate: () => {
          if (counterEl) {
            counterEl.textContent = Math.round(counter.val).toString();
          }
        },
      })
      
      // Slight pause at 100
      .to({}, { duration: 0.2 })

      // Fade out counter
      .to(counterEl, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      })

      // Pull screen upward
      .to(preloader, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.85,
        ease: "power4.inOut",
      })

      .set(preloader, {
        display: "none",
      });
    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="
        fixed inset-0
        z-[9999]
        flex items-center justify-center
        overflow-hidden
        bg-[#070707]
      "
      style={{
        clipPath: "inset(0 0 0 0)",
      }}
    >
      <div
        ref={counterRef}
        className="font-pixel text-[clamp(80px,15vw,200px)] leading-none text-center text-white tracking-widest drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
      >
        0
      </div>
    </div>
  );
}
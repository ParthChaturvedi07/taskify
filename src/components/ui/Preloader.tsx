"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const bootTextRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const introLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const preloader = preloaderRef.current;
      const bootText = bootTextRef.current;
      const scanline = scanlineRef.current;
      const introLine = introLineRef.current;

      if (!preloader || !bootText || !scanline || !introLine) {
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      /*
       * INITIAL STATE
       */

      gsap.set(preloader, {
        autoAlpha: 1,
      });

      gsap.set(bootText, {
        opacity: 0,
        y: 8,
      });

      gsap.set(scanline, {
        scaleY: 0,
        transformOrigin: "center",
      });

      gsap.set(introLine, {
        scaleX: 0,
        transformOrigin: "center",
      });

      /*
       * BOOT SEQUENCE
       */

      // System text appears
      tl.to(bootText, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      })

        // Cyan line expands from center
        .to(
          introLine,
          {
            scaleX: 1,
            duration: 0.65,
            ease: "power4.inOut",
          },
          "-=0.15"
        )

        // Scanline flashes through the screen
        .to(
          scanline,
          {
            scaleY: 1,
            duration: 0.15,
            ease: "power2.inOut",
          },
          "-=0.2"
        )

        .to(scanline, {
          scaleY: 0,
          duration: 0.2,
          ease: "power2.inOut",
        })

        // Tiny pause
        .to({}, {
          duration: 0.15,
        })

        /*
         * EXIT
         *
         * Instead of simply fading,
         * the entire screen gets pulled upward.
         */
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
        bg-black
      "
      style={{
        clipPath: "inset(0 0 0 0)",
      }}
    >
      {/* Ambient cyan glow */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-[30vh] w-[60vw]
          -translate-x-1/2
          -translate-y-1/2
          opacity-20
          blur-[100px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(61,213,243,0.8) 0%, rgba(61,213,243,0) 70%)",
        }}
      />

      {/* Horizontal scanline */}
      <div
        ref={scanlineRef}
        className="
          absolute left-0 right-0 top-1/2
          h-[2px]
          bg-[#3DD5F3]
          opacity-70
          shadow-[0_0_25px_#3DD5F3]
        "
      />

      {/* Center system content */}
      <div className="relative flex w-full max-w-[500px] flex-col items-center px-6">
        {/* Boot text */}
        <div
          ref={bootTextRef}
          className="
            mb-4
            font-mono
            text-[9px]
            uppercase
            tracking-[0.45em]
            text-[#3DD5F3]/70
          "
        >
          REWARD ENGINE // INITIALIZING
        </div>

        {/* Cyan line */}
        <div
          ref={introLineRef}
          className="
            h-px
            w-full
            bg-[#3DD5F3]
            shadow-[0_0_15px_rgba(61,213,243,0.8)]
          "
        />

        {/* Technical labels */}
        <div
          className="
            mt-4
            flex w-full
            justify-between
            font-mono
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/30
          "
        >
          <span>SYS_01</span>
          <span>ONLINE</span>
        </div>
      </div>

      {/* Bottom technical text */}
      <div
        className="
          absolute bottom-8 left-8
          font-mono
          text-[8px]
          uppercase
          tracking-[0.35em]
          text-white/20
        "
      >
        001 // 010 // 011
      </div>

      <div
        className="
          absolute bottom-8 right-8
          font-mono
          text-[8px]
          uppercase
          tracking-[0.35em]
          text-white/20
        "
      >
        2026
      </div>
    </div>
  );
}
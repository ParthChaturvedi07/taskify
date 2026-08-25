"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GridBackground } from "@/components/ui/GridBackground";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  const codeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  // Glitch layer refs for "404"
  const glitch1Ref = useRef<HTMLSpanElement>(null);
  const glitch2Ref = useRef<HTMLSpanElement>(null);
  const glitch3Ref = useRef<HTMLSpanElement>(null);

  /* ─────────────────────────────────────────────────
   * ENTRANCE ANIMATION
   * ───────────────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [codeRef.current, labelRef.current, subRef.current, buttonRef.current],
          { clearProps: "all" }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Initial hidden state
        gsap.set(codeRef.current, { y: 80, opacity: 0, filter: "blur(12px)" });
        gsap.set(labelRef.current, { y: 50, opacity: 0, filter: "blur(8px)" });
        gsap.set(subRef.current, { y: 40, opacity: 0 });
        gsap.set(buttonRef.current, { y: 30, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(codeRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1 })
          .to(labelRef.current, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 }, "-=0.6")
          .to(subRef.current, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
          .to(buttonRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, "-=0.3");
      });

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ─────────────────────────────────────────────────
   * GLITCH LOOP on "404"
   * ───────────────────────────────────────────────── */
  useEffect(() => {
    const layers = [glitch1Ref.current, glitch2Ref.current, glitch3Ref.current];
    if (!layers.every(Boolean)) return;

    const glitch = () => {
      const tl = gsap.timeline();

      tl.set(layers, { x: 0, skewX: 0, opacity: 1 });

      tl.to(glitch1Ref.current, { x: -14, skewX: -9, duration: 0.06, ease: "none" })
        .to(glitch2Ref.current, { x: 16, skewX: 7, duration: 0.05, ease: "none" }, "<")
        .to(glitch3Ref.current, { x: -8, skewX: -5, duration: 0.04, ease: "none" }, "<")
        .to(layers, { x: 0, skewX: 0, duration: 0.04, ease: "none" })
        .to(glitch1Ref.current, { x: 8, duration: 0.035, ease: "none" })
        .to(glitch2Ref.current, { x: -10, duration: 0.035, ease: "none" }, "<")
        .to(layers, { x: 0, duration: 0.04, ease: "none" });
    };

    const initialGlitch = gsap.delayedCall(1.8, glitch);
    const interval = window.setInterval(() => {
      if (Math.random() > 0.4) glitch();
    }, 1600);

    return () => {
      initialGlitch.kill();
      window.clearInterval(interval);
    };
  }, []);

  /* ─────────────────────────────────────────────────
   * SCAN-LINE DRIFT
   * ───────────────────────────────────────────────── */
  useEffect(() => {
    if (!scanRef.current) return;
    gsap.set(scanRef.current, { y: "-100%" });
    gsap.to(scanRef.current, {
      y: "200%",
      duration: 4,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden">
      <section className="relative min-h-[100dvh] w-full flex flex-col pt-24 sm:pt-28 md:pt-32 overflow-hidden">
        {/* Shared animated grid */}
        <GridBackground />

        {/* Navbar */}
        <Navbar />

        {/* Scanline overlay */}
        <div
          ref={scanRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 w-full z-10"
          style={{
            height: "60px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(61,213,243,0.04) 50%, transparent 100%)",
          }}
        />

        {/* Main content */}
        <div
          ref={containerRef}
          className="z-10 flex w-full flex-1 flex-col items-center justify-center gap-6 text-center px-4 pb-20"
        >
          {/* ── 404 PIXEL TEXT ── */}
          <div ref={codeRef} className="relative font-pixel leading-none text-[clamp(5rem,26vw,12rem)]">
            {/* Main text */}
            <h1
              className="relative z-10 text-[#3DD5F3] leading-none select-none"
              style={{
                textShadow: `
                  0 1px 0 #074254ff,
                  0 2px 0 #094253ff,
                  0 3px 0 #052731ff,
                  0 4px 0 #062d39ff,
                  0 5px 0 #08303dff,
                  0 6px 0 #08303dff,
                  0 8px 0 #062d39ff,
                  0 10px 0 #04222dff,
                  0 15px 30px rgba(61,213,243,0.5),
                  0 0 40px rgba(61,213,243,0.35)
                `,
                WebkitTextStroke: "1px #2a99afff",
              }}
            >
              404
            </h1>

            {/* Glitch layer 1 */}
            <span
              ref={glitch1Ref}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 text-[#3DD5F3] select-none"
              style={{ clipPath: "inset(18% 0 62% 0)", WebkitTextStroke: "1px #2a99afff" }}
            >
              404
            </span>

            {/* Glitch layer 2 */}
            <span
              ref={glitch2Ref}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 text-[#3DD5F3] select-none"
              style={{ clipPath: "inset(52% 0 28% 0)", WebkitTextStroke: "1px #2a99afff" }}
            >
              404
            </span>

            {/* Glitch layer 3 */}
            <span
              ref={glitch3Ref}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 text-[#3DD5F3] select-none"
              style={{ clipPath: "inset(76% 0 6% 0)", WebkitTextStroke: "1px #2a99afff" }}
            >
              404
            </span>
          </div>

          {/* ── LABEL ── */}
          <div ref={labelRef}>
            <p
              className="text-[clamp(1.25rem,5vw,2rem)] font-bold tracking-tight text-white uppercase"
              style={{
                fontFamily: '"Darker Grotesque", sans-serif',
                textShadow: "0px 4px 10px rgba(0,0,0,0.8)",
              }}
            >
              Page not found
            </p>
          </div>

          {/* ── SUBTITLE ── */}
          <div ref={subRef}>
            <p
              className="text-[clamp(0.9rem,2.5vw,1.1rem)] font-semibold text-white/80 max-w-sm leading-relaxed"
              style={{
                fontFamily: '"Darker Grotesque", sans-serif',
                textShadow: "0 1px 8px rgba(0,0,0,0.9)",
              }}
            >
              Looks like you&apos;ve wandered off the map. This level doesn&apos;t exist — yet.
            </p>
          </div>

          {/* ── CTA ── */}
          <div ref={buttonRef} className="mt-4">
            <Link href="/" aria-label="Go back home">
              <Button
                variant="glow-pill"
                className="h-[54px] w-[220px] sm:h-[46px] sm:w-[200px] md:h-[52px] md:w-[220px] lg:h-[56px] lg:w-[240px]"
              >
                GO HOME
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GridBackground } from "@/components/ui/GridBackground";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { IntroOverlay } from "@/components/IntroOverlay";

export default function Home() {
  // triggerReveal is registered by <Hero> and called by <IntroOverlay> onComplete
  const triggerRevealRef = useRef<(() => void) | null>(null);
  const triggerFlowerRef = useRef<(() => void) | null>(null);

  const handleRevealReady = useCallback((fn: () => void) => {
    triggerRevealRef.current = fn;
  }, []);

  const handleFlowerReady = useCallback((fn: () => void) => {
    triggerFlowerRef.current = fn;
  }, []);

  // Lock scroll while the intro overlay is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleIntroComplete = useCallback(() => {
    document.body.style.overflow = "";
    triggerRevealRef.current?.();
    triggerFlowerRef.current?.();
  }, []);

  return (
    <main
      className="relative w-full"
      style={{ background: "#070707", overflowX: "clip" }}
    >
      {/* Cinematic intro overlay — splits apart to reveal the hero */}
      <IntroOverlay onComplete={handleIntroComplete} />

      {/* Fixed background: void black + grain */}
      <GridBackground />

      {/* Fixed navbar */}
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[100dvh]">
        <Hero onRevealReady={handleRevealReady} onFlowerReady={handleFlowerReady} />
      </section>

      {/* ── CONTENT BELOW FOLD ── */}
      <section className="relative w-full pt-10 md:pt-15 pb-10 md:pb-15">
        <About />
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="relative w-full">
        <FeaturesGrid />
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  );
}
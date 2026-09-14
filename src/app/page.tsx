"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GridBackground } from "@/components/ui/GridBackground";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { IntroOverlay } from "@/components/IntroOverlay";
import { Apps } from "@/components/Apps";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

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
      style={{ background: "#000000", overflowX: "clip" }}
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
      <section id="about" className="relative w-full pt-10 md:pt-15 pb-10 md:pb-15">
        <About />
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="features" className="relative w-full">
        <FeaturesGrid />
      </section>

      {/* ── APPS SECTION ── */}
      <section id="apps" className="relative w-full">
        <Apps />
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section id="how-it-works" className="relative w-full">
        <HowItWorks />
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section id="reviews" className="relative w-full">
        <Testimonials />
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" className="relative w-full">
        <FAQ />
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative w-full z-10">
        <CTA />
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </main>
  );
}
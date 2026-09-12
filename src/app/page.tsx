"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GridBackground } from "@/components/ui/GridBackground";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { FeaturesGrid } from "@/components/FeaturesGrid";

export default function Home() {
  return (
    <main
      className="relative w-full"
      style={{ background: "#070707", overflowX: "clip" }}
    >
      {/* Fixed background: void black + grain */}
      <GridBackground />

      {/* Fixed navbar */}
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[100dvh]">
        <Hero />
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
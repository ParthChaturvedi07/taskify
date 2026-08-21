"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GridBackground } from "@/components/ui/GridBackground";
import { About } from "@/components/About";
// import { Preloader } from "@/components/ui/Preloader";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      {/* Preloader
      {isLoading && (
        <Preloader
          onComplete={() => setIsLoading(false)}
        />
      )} */}

      {/* ── HERO SECTION ── fills exactly one viewport height ── */}
      <section className="relative min-h-[100dvh] w-full flex flex-col pt-24 sm:pt-28 md:pt-32 overflow-hidden">
        <GridBackground />
        <Navbar />
        {/* Hero waits for Preloader */}
        <Hero/>
        {/* <Hero startAnimation={!isLoading} /> */}
      </section>

      {/* ── CONTENT BELOW FOLD ── */}
      <section className="relative w-full pt-10 md:pt-15">
        <About />
      </section>
    </main>
  );
}
"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { GridBackground } from "@/components/ui/GridBackground";
import { About } from "@/components/About";
// import { Preloader } from "@/components/ui/Preloader";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col pt-24 pb-10 sm:pt-28 sm:pb-14 md:pt-32 md:pb-20 overflow-hidden">
      {/* Preloader
      {isLoading && (
        <Preloader
          onComplete={() => setIsLoading(false)}
        />
      )} */}

      <GridBackground />

      <Navbar />

      {/* Hero waits for Preloader */}
      <Hero/>
      {/* <Hero startAnimation={!isLoading} /> */}

      <About />
    </main>
  );
}
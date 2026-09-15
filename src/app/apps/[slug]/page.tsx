"use client";

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { notFound } from 'next/navigation';
import appsData from '@/data/apps.json';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GridBackground } from '@/components/ui/GridBackground';
import { DotGrid } from '@/components/ui/DotGrid';
import { Carousel } from '@/components/ui/Carousel';
import { CTA } from '@/components/CTA';

export default function AppDetailsPage({ params }: { params: { slug: string } }) {
  const app = appsData.find((a) => a.slug === params.slug);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!app) return;

    const ctx = gsap.context(() => {
      // Content reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );
      }

      // Hero image float
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -20,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut"
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [app]);

  if (!app) {
    notFound();
  }

  return (
    <main className="relative w-full min-h-screen pt-24 md:pt-32 flex flex-col items-center overflow-x-hidden">
      <GridBackground />
      <DotGrid />
      <Navbar />

      {/* ── White radial glow ── */}
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
      />

      <div className="relative z-10 w-full max-w-[1200px] px-6 lg:px-12 flex flex-col items-center">

        {/* ── HERO SECTION ── */}
        <section ref={heroRef} className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8 pt-10 pb-20">

          {/* Left Content */}
          <div ref={contentRef} className="w-full lg:w-[50%] flex flex-col items-start text-left space-y-6">

            {/* Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="font-chakra text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white/70">
                ANDROID REWARD ARCADE
              </span>
            </div>

            {/* Title */}
            <h1 className="font-chakra text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-wide text-white">
              {app.title}
            </h1>

            {/* Description */}
            <p className="font-chakra text-sm md:text-base text-[#8a8a8a] max-w-[500px] leading-relaxed">
              {app.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-4">
              {/* Rating */}
              <div className="flex flex-col items-start justify-center p-4 rounded-xl bg-[#141414] border border-white/5 w-full">
                <svg className="w-4 h-4 text-white mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                <span className="font-chakra text-lg font-bold text-white">{app.stats.rating}</span>
                <span className="font-chakra text-[10px] uppercase text-[#6b6b6b] tracking-wider">Store Rating</span>
              </div>

              {/* Installs */}
              <div className="flex flex-col items-start justify-center p-4 rounded-xl bg-[#141414] border border-white/5 w-full">
                <svg className="w-4 h-4 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span className="font-chakra text-lg font-bold text-white">{app.stats.installs}</span>
                <span className="font-chakra text-[10px] uppercase text-[#6b6b6b] tracking-wider">Installs</span>
              </div>

              {/* Earn Modes */}
              <div className="flex flex-col items-start justify-center p-4 rounded-xl bg-[#141414] border border-white/5 w-full">
                <svg className="w-4 h-4 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span className="font-chakra text-lg font-bold text-white">{app.stats.earnModes}</span>
                <span className="font-chakra text-[10px] uppercase text-[#6b6b6b] tracking-wider">Earn Modes</span>
              </div>

              {/* App Access */}
              <div className="flex flex-col items-start justify-center p-4 rounded-xl bg-[#141414] border border-white/5 w-full">
                <svg className="w-4 h-4 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                <span className="font-chakra text-lg font-bold text-white">{app.stats.access}</span>
                <span className="font-chakra text-[10px] uppercase text-[#6b6b6b] tracking-wider">App Access</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <Link href={app.playstoreLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3.5 bg-white text-black rounded-full font-chakra font-semibold hover:bg-gray-200 transition-colors">
                Get it on Playstore
                <Image src="/images/playstore.png" alt="Playstore" width={20} height={20} />
              </Link>
              <Link href="#gameplay" className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3.5 bg-[#141414] border border-white/10 text-white rounded-full font-chakra font-semibold hover:bg-[#1a1a1a] transition-colors">
                Explore Gameplay
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </Link>
            </div>

          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[50%] flex justify-center lg:justify-end relative">
            {/* Glow effect behind image */}
            <div
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] opacity-40 blur-[120px] rounded-full pointer-events-none"
              style={{ backgroundColor: app.glowColor || '#3dd5f3' }}
            />
            <div ref={imageRef} className="relative z-10 w-full max-w-[400px]">
              <Image
                src={app.heroImage}
                alt={app.title}
                width={600}
                height={600}
                className="w-full object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                priority
              />
            </div>
          </div>

        </section>
      </div>

      {/* ── LIVE PREVIEW CAROUSEL ── */}
      <section className="relative z-10 w-full py-10 flex flex-col items-center overflow-hidden">
        <h2 className="font-pixel text-4xl md:text-6xl text-white tracking-widest text-center uppercase mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          LIVE PREVIEW
        </h2>
        <div className="w-full relative mt-8">
          {/* Left fade mask */}
          <div className="absolute top-0 left-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#070707] via-[#070707]/70 to-transparent z-10 pointer-events-none" />

          <Carousel
            items={(app.previews || []).map((src, idx) => ({
              id: `preview-${idx}`,
              src,
              alt: `${app.name} preview ${idx + 1}`,
              index: idx
            }))}
          />

          {/* Right fade mask */}
          <div className="absolute top-0 right-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#070707] via-[#070707]/70 to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      <div className="relative z-10 w-full max-w-[1200px] px-6 lg:px-12 flex flex-col items-center">
        {/* ── BUILD LIKE A REWARD GAME ── */}
        <section id="gameplay" className="w-full py-20 flex flex-col items-center">
          <h2 className="font-pixel text-4xl md:text-6xl text-white tracking-widest text-center uppercase mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            BUILD LIKE A REWARD GAME
          </h2>
          <p className="font-chakra text-sm md:text-base text-[#8a8a8a] text-center max-w-[600px] mb-12">
            {app.featuresDescription}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {app.features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-start p-6 rounded-2xl bg-[#141414] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-center w-full mb-6">
                  <span className="font-chakra text-[10px] text-[#6b6b6b] uppercase tracking-wider">{feature.id}</span>
                  <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
                <h3 className="font-chakra text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="font-chakra text-xs text-[#8a8a8a] leading-relaxed mb-8">
                  {feature.description}
                </p>
                <div className="mt-auto w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[40%] h-full bg-white/40 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FROM PLAY TO PAYOUT ── */}
        <section className="w-full py-20 pb-32 flex flex-col items-center border-t border-white/5">
          <h2 className="font-pixel text-4xl md:text-6xl text-white tracking-widest text-center uppercase mb-12 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            FROM PLAY TO PAYOUT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {app.steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-start p-6 rounded-2xl bg-[#141414] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-center w-full mb-6">
                  <span className="font-chakra text-[10px] text-[#6b6b6b] uppercase tracking-wider">{step.id}</span>
                  <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                </div>
                <h3 className="font-chakra text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="font-chakra text-xs text-[#8a8a8a] leading-relaxed mb-8">
                  {step.description}
                </p>
                <div className="mt-auto w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[60%] h-full bg-white/40 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <CTA />
      {/* ── FOOTER ── */}
      <Footer />
    </main>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface IntroOverlayProps {
  onComplete: () => void;
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.display = "none";
        }
        onComplete();
      },
    });

    // Phase 1: count 0 → 100 while bar fills
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate() {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counter.val)).padStart(3, "0");
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${counter.val / 100})`;
        }
      },
    });

    // Phase 2: wordmark slides up
    tl.fromTo(
      wordmarkRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
      "-=0.1"
    );

    // Phase 3: horizontal rule expands
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: "power2.inOut", transformOrigin: "left" },
      "-=0.3"
    );

    // Phase 4: tagline fades in
    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.2"
    );

    // Phase 5: hold
    tl.to({}, { duration: 0.55 });

    // Phase 6: content fades
    tl.to(
      [counterRef.current, barRef.current, wordmarkRef.current, lineRef.current, taglineRef.current],
      { opacity: 0, duration: 0.3, ease: "power2.in" }
    );

    // Phase 7: panels split apart
    tl.to(topPanelRef.current, { y: "-100%", duration: 0.9, ease: "expo.inOut" }, "-=0.05");
    tl.to(bottomPanelRef.current, { y: "100%", duration: 0.9, ease: "expo.inOut" }, "<");

    return () => { tl.kill(); };
  }, [mounted, onComplete]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}
    >
      {/* Top panel */}
      <div
        ref={topPanelRef}
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "50%",
          background: "#050505",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "48px",
          gap: "20px",
        }}
      >
        <div ref={wordmarkRef} style={{ opacity: 0 }}>
          <span style={{
            fontFamily: "var(--font-chakra), monospace",
            fontWeight: 700,
            fontSize: "clamp(28px, 5vw, 52px)",
            letterSpacing: "0.22em",
            color: "#fff",
            textTransform: "uppercase",
          }}>
            TASKIFY
          </span>
        </div>

        <div
          ref={lineRef}
          style={{
            width: "clamp(160px, 20vw, 320px)",
            height: "1px",
            background: "rgba(255,255,255,0.18)",
            transformOrigin: "left",
            transform: "scaleX(0)",
          }}
        />

        <div ref={taglineRef} style={{ opacity: 0 }}>
          <span style={{
            fontFamily: "var(--font-chakra), monospace",
            fontSize: "clamp(9px, 1.1vw, 12px)",
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
          }}>
            Turn free time into rewards
          </span>
        </div>
      </div>

      {/* Bottom panel */}
      <div
        ref={bottomPanelRef}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "50%",
          background: "#050505",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          paddingTop: "32px",
          paddingRight: "clamp(24px, 5vw, 80px)",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
          <span
            ref={counterRef}
            style={{
              fontFamily: "var(--font-chakra), monospace",
              fontWeight: 700,
              fontSize: "clamp(36px, 6vw, 72px)",
              color: "#fff",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
            }}
          >
            000
          </span>
          <span style={{
            fontFamily: "var(--font-chakra), monospace",
            fontSize: "clamp(14px, 2vw, 22px)",
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.04em",
          }}>
            %
          </span>
        </div>

        <div
          style={{
            width: "clamp(100px, 14vw, 200px)",
            height: "1.5px",
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden",
            borderRadius: "1px",
          }}
        >
          <div
            ref={barRef}
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(255,255,255,0.75)",
              transform: "scaleX(0)",
              transformOrigin: "left",
            }}
          />
        </div>
      </div>
    </div>
  );
}

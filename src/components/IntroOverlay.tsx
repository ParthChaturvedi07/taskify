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

    // Brief hold before sliding open
    tl.to({}, { duration: 0.5 });

    // Panels split apart
    tl.to(topPanelRef.current, { y: "-100%", duration: 0.9, ease: "expo.inOut" });
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
        }}
      />

      {/* Bottom panel */}
      <div
        ref={bottomPanelRef}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "50%",
          background: "#050505",
        }}
      />
    </div>
  );
}

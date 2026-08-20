/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GridBackground() {
  const grid1Ref = useRef<HTMLImageElement>(null);
  const grid2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const grid1 = grid1Ref.current;
    const grid2 = grid2Ref.current;

    if (!grid1 || !grid2) return;

    const ctx = gsap.context(() => {
      const duration = 6;

      // First layer
      gsap.set(grid1, {
        scale: 1,
        opacity: 0,
        transformOrigin: "center center",
      });

      // Second layer starts halfway through the tunnel
      gsap.set(grid2, {
        scale: 1.17,
        opacity: 0,
        transformOrigin: "center center",
      });

      /*
       * Infinite tunnel
       *
       * Each image:
       * 1. Appears from the center
       * 2. Expands toward the viewer
       * 3. Fades as it gets close
       * 4. Instantly resets while invisible
       */

      const createTunnel = (
        element: HTMLImageElement,
        delay: number
      ) => {
        const tl = gsap.timeline({
          repeat: -1,
          delay,
        });

        tl.set(element, {
          scale: 1,
          opacity: 0,
        });

        tl.to(element, {
          opacity: 0.9,
          duration: 0.8,
          ease: "power2.out",
        });

        tl.to(element, {
          scale: 1.45,
          opacity: 0,
          duration: duration - 0.8,
          ease: "none",
        });

        return tl;
      };

      createTunnel(grid1, 0);
      createTunnel(grid2, duration / 2);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[-1] flex items-center justify-center overflow-hidden bg-black pointer-events-none"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Tunnel layer 1 */}
      <img
        ref={grid1Ref}
        src="/images/bg_grid.png"
        alt=""
        aria-hidden="true"
        className="
          absolute
          h-full
          w-full
          max-w-none
          object-cover
          will-change-transform
        "
      />

      {/* Tunnel layer 2 */}
      <img
        ref={grid2Ref}
        src="/images/bg_grid.png"
        alt=""
        aria-hidden="true"
        className="
          absolute
          h-full
          w-full
          max-w-none
          object-cover
          will-change-transform
        "
      />

      {/* Dark vignette */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(
            ellipse_at_center,
            transparent_15%,
            rgba(0,0,0,0.15)_45%,
            rgba(0,0,0,0.75)_100%
          )]
        "
      />
    </div>
  );
}
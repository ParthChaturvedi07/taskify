"use client";

import * as React from "react";

/**
 * Full-page fixed background matching the taskify-games-redesign:
 *  • Void black base (#070707)
 *  • Subtle SVG grain overlay (opacity 0.035)
 *
 * The animated dot-field canvas is rendered inside Hero.tsx (also fixed)
 * and sits above this layer at z-index 0.
 */
export function GridBackground() {
  return (
    <>
      {/* Void black base */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          background: "#070707",
          pointerEvents: "none",
        }}
      />

      {/* SVG grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          opacity: 0.035,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
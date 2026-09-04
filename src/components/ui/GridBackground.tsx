"use client";

import * as React from "react";

export function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none">
      {/* Tunnel grid canvas animation via iframe */}
      <iframe
        src="/tunnel-grid.html"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full border-0"
        style={{ pointerEvents: "none" }}
      />

      {/* Dark vignette */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(
            ellipse_at_center,
            transparent_15%,
            rgba(0,0,0,0.15)_95%,
            rgba(0,0,0,0.75)_100%
          )]
        "
      />
    </div>
  );
}
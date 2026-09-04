"use client";

import * as React from "react";

export function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute h-full w-full object-cover"
        src="/videos/grid.mp4"
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
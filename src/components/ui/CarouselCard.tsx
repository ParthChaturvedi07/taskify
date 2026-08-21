import * as React from "react";

export interface CarouselCardProps {
  id: string;
  src: string;
  alt: string;
  index: number;
  setRef?: (el: HTMLDivElement | null) => void;
}

export function CarouselCard({ src, alt, setRef }: CarouselCardProps) {
  return (
    <div
      ref={setRef}
      className="absolute top-1/2 left-1/2 w-[clamp(200px,52vw,360px)] h-[clamp(300px,90vw,580px)] rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-opacity duration-100 ease-out"
      style={{
        backfaceVisibility: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none select-none"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
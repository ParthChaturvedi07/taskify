import * as React from "react";

export interface CarouselCardProps {
  id: string;
  src: string;
  alt: string;
  index: number;
  setRef?: (el: HTMLImageElement | null) => void;
}

export function CarouselCard({ src, alt, setRef }: CarouselCardProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={setRef}
      src={src}
      alt={alt}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(240px,38vw,460px)] h-[clamp(380px,38vw,800px)] object-cover pointer-events-none select-none drop-shadow-2xl transition-opacity duration-100 ease-out"
      style={{ backfaceVisibility: "hidden", borderRadius: "1.25rem", overflow: "hidden" }}
      draggable={false}
    />
  );
}